import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Tag, type GetRef, type InputRef, type TableColumnType } from "antd";
import useData from "../../hooks/use-data";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ColumnsType, FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
// @ts-ignore
import Highlighter from 'react-highlight-words'

interface DataType {
  key: string;
  description: string;
  date: Date;
  amount: number;
  categories: string[];
}
interface ExpensesGridProps {
  localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
  setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
  keyLocalData: string;
  updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
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

function ExpensesGrid(props: ExpensesGridProps) {
    const data: DataType[] = props.localData;
    const categoriesExpenses = useData().categoriesExpenses;

    const handleDelete = (key: React.Key) => {
        const newData = props.localData.filter((item) => item.key !== key);
        props.updateData(newData, props.keyLocalData, props.setLocalData);
    };

    const renderColor = (categories: string[]) => {
        return categories.map((tag) => {
        const category = categoriesExpenses.find(c => c.category === tag);
        return (
            <Tag color={category?.color} key={tag}>
            {tag.toUpperCase()}
            </Tag>
        );
        });
    }
    
    const filterCategories  = () => {
        return categoriesExpenses.map((category) => ({
            text: category.category,
            value: category.category
        }))
    }

    //START OF SEARCH FILTER

    type DataIndex = keyof DataType;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
                }}
            >
                Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        filterDropdownProps: {
        onOpenChange(open) {
            if (open) {
            setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    });

    //END OF SEARCH FILTER

    const defaultColumns: (ColumnsType<DataType>[number] & { editable?: boolean })[] = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
            editable: true
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (date: Date) => new Date(date).toLocaleDateString()
        },
        {
            title: "Amount (EUR)",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
            editable: true
        },
        {
            title: "Categories",
            dataIndex: "categories",
            key: "categories",
            filters: filterCategories(),
            onFilter: (value, record) => record.categories.some((cat:string) => cat === value as string),
            filterSearch: true,
            render: (categories: string[]) => (<> {renderColor(categories)} </>)
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 50,
            key: "action",
            render: (_: any) => ( props.localData.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(_.key)}>
                    <a>Delete</a>
                </Popconfirm>
                ) : null
            )
        }
    ]

    //START OF EDIT MODE

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
            const inputNode = inputType === 'number' ? <InputNumber onPressEnter={save} onBlur={save}/> : <Input ref={inputRef} onPressEnter={save} onBlur={save}/>;
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

    const columns = defaultColumns.map((col) => {
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

    //END OF EDIT MODE

    return (
    <>
        <Table<DataType> dataSource={data} components={components} pagination={{ pageSize: 10 }} columns={columns as ColumnsType<DataType>} style={{ minWidth: 600, width: '100%' }} ></Table>
    </>
    )
}

export default ExpensesGrid;