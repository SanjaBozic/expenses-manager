import { Button, Popconfirm, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import useSearchColumn from "../main-grid/search-hook";
import useEditMode from "./edit-mode";
import useExport from "./export-hook";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  description: string;
  date: Date;
  amount: number;
  categories: string[];
}

interface MainGridProps {
  localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
  setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
  keyLocalData: string;
  updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
  categoryData: { category: string; color: string }[];
}

function MainGrid(props: MainGridProps) {
    const data: DataType[] = props.localData;

    const handleDelete = (key: React.Key) => {
        const newData = props.localData.filter((item) => item.key !== key);
        props.updateData(newData, props.keyLocalData, props.setLocalData);
    };

    const renderColor = (categories: string[]) => {
        return categories.map((tag) => {
        const category = props.categoryData.find(c => c.category === tag);
        return (
            <Tag color={category?.color} key={tag}>
            {tag.toUpperCase()}
            </Tag>
        );
        });
    }
    
    const filterCategories  = () => {
        return props.categoryData.map((category) => ({
            text: category.category,
            value: category.category
        }))
    }

    const searchColumn = useSearchColumn();
    const defaultColumns: (ColumnsType<DataType>[number] & { editable?: boolean })[] = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...searchColumn("description"),
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
            render: (_, record) => ( props.localData.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
                ) : null
            )
        }
    ]

    const {components, columns} = useEditMode({
        localData: props.localData,
        setLocalData: props.setLocalData,
        keyLocalData: props.keyLocalData,
        updateData: props.updateData,
        defaultColumns
    });

    const exportColumns = (columns as ColumnsType<DataType>).map(col => {
        // Remove custom properties and ensure title is a string
        const { editable, onCell, ...rest } = col as any;
        return {
            ...rest,
            title: typeof col.title === "string" ? col.title : "",
        };
    });

    const exportData = useExport({columns: exportColumns, data: data, fileName: props.keyLocalData.replace('local','')});

    return (
    <>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '100%'}}>
            <div style={{display: 'inline-flex', gap: '10px'}}>
                <Button onClick={exportData.onExcelPrint}><FileExcelOutlined />Export to Excel</Button>
                <Button onClick={exportData.onPdfPrint}><FilePdfOutlined />Export to PDF</Button>
            </div>
            <div style={{ minWidth: 600}}>
                <Table<DataType> dataSource={data} components={components} pagination={{ pageSize: 10 }} columns={columns as ColumnsType<DataType>}></Table>
            </div>
        </div>
    </>
    )
}
export default MainGrid;