import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import './categories.css'
import { v4 as uuidv4 } from 'uuid';

interface CategoriesGridProps {
    localData: { key: string; category: string; color: string }[];
    setLocalData: React.Dispatch<React.SetStateAction<{ key: string; category: string; color: string }[]>>;
    keyLocalData: string;
    updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
}

interface Item {
  key: string;
  category: string;
  color: string;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

interface DataType {
  key: string;
  category: string;
  color: string;
}

function CategoriesGrid(props: CategoriesGridProps) {

    /* Edit mode */
    type FormInstance<T> = GetRef<typeof Form<T>>;
    const EditableContext = React.createContext<FormInstance<any> | null>(null);

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

    const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
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

        const save = async () => {
            try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
            } catch (errInfo) {
            console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

    /* Read-only mode */
    type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

    const handleDelete = (key: React.Key) => {
        const newData = props.localData.filter((item) => item.key !== key);
        props.updateData(newData, props.keyLocalData, props.setLocalData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
        title: 'Category',
        dataIndex: 'category',
        editable: true,
        },{
        title: 'Color',
        width: '30%',
        dataIndex: 'color',
        editable: true,
        render: (_, record) => (
            <div className='categories__color-input' style={{ backgroundColor: record.color }}></div>
        ),
        },{
        title: 'Action',
        width: '50px',
        dataIndex: 'operation',
        render: (_, record) =>
            props.localData.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
            </Popconfirm>
            ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
        key: uuidv4(),
        category: `Click to edit category`,
        color: '#332200',
        };
        props.updateData([...props.localData, newData], props.keyLocalData, props.setLocalData);
    };

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

    const components = {
        body: {
        row: EditableRow,
        cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
        return col;
        }
        return {
        ...col,
        onCell: (record: DataType) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
        }),
        };
    });

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add a row
            </Button>
            <Table<DataType>
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={props.localData}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default CategoriesGrid;