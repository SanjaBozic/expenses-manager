import { Form, Input, InputNumber, type GetRef, type InputRef } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createContext, useContext, useEffect, useRef, useState } from "react";


interface DataType {
  key: string;
  description: string;
  date: Date;
  amount: number;
  categories: string[];
}

interface EditModeProps {
    localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
    setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
    keyLocalData: string;
    updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
    defaultColumns: (ColumnsType<DataType>[number] & { editable?: boolean })[]
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof DataType;
  record: DataType;
  inputType: 'number' | 'text' | 'date';
  handleSave: (record: DataType) => void;
}

function useEditMode(props: EditModeProps) {
    type FormInstance<T> = GetRef<typeof Form<T>>;
    const EditableContext = createContext<FormInstance<any> | null>(null);

    const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({ title, editable, children, inputType, dataIndex, record, handleSave, ...restProps }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<InputRef>(null);
        const form = useContext(EditableContext)!;

        useEffect(() => {
            if (editing) {
            inputRef.current?.focus();
            }
        }, [editing]);

        const toggleEdit = () => {props.localData.length + 1,
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };

        const saveEdit = async () => {
            try {
            const date = new Date();
            const values = {date, ...await form.validateFields()};

            toggleEdit();
            
            handleSave({ ...record, ...values });
            } catch (errInfo) {
            console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            const inputNode = inputType === 'number' ? <InputNumber onPressEnter={saveEdit} onBlur={saveEdit} suffix="€"/> : <Input ref={inputRef} onPressEnter={saveEdit} onBlur={saveEdit}/>;
            childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                {inputNode}
            </Form.Item>
            ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
        row: EditableRow,
        cell: EditableCell,
        },
    };

    const columns = props.defaultColumns.map((col) => {
        if (!col.editable) {
        return col;
        }

        if ('dataIndex' in col) {
            return {
                ...col,
                onCell: (record: DataType) => ({
                    record,
                    inputType: col.dataIndex === 'amount' ? 'number' : 'text',
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                }),
            };
        }

        return col;
    });

    const handleSave = (row: DataType) => {
        const newData = [...props.localData];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
        ...item,
        ...row,
        });
        props.updateData(newData, props.keyLocalData, props.setLocalData);
    };

    return {components, columns}
}

export default useEditMode;