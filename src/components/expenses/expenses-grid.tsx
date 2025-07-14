import { Button, Input, Popconfirm, Space, Table, Tag, type InputRef, type TableColumnsType, type TableColumnType } from "antd";
import useData from "../../hooks/use-data";
import { useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
// @ts-ignore
import Highlighter from 'react-highlight-words'

interface DataType {
  key: string;
  date: Date;
  description: string;
  amount: number;
  categories: string[];
}
interface ExpensesGridProps {
  localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
  setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
  keyLocalData: string;
  updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
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

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Description',
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description")
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
            sorter: (a, b) => a.amount - b.amount
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

    return (
    <>
        <Table<DataType> dataSource={data} pagination={{ pageSize: 10 }} columns={columns} style={{ minWidth: 600, width: '100%' }} ></Table>
    </>
    )
}

export default ExpensesGrid;