import { Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";

interface DataType {
  key: string;
  date: Date;
  description: string;
  amount: number;
  categories: string[];
}

function ExpensesGrid() {

  const data: DataType[] = [
  {
    key: '1',
    date: new Date(),
    description: 'John',
    amount: 32,
    categories: ['nice', 'developer'],
  },
  {
    key: '2',
    date: new Date(),
    description: 'Jim',
    amount: 42,
    categories: ['loser'],
  },
  {
    key: '3',
    date: new Date(),
    description: 'Joe',
    amount: 32,
    categories: ['cool', 'teacher'],
  },
];

    return (
    <>
        <Table<DataType> dataSource={data} style={{ minWidth: 600, width: '100%' }}>
            <Column title="Description" dataIndex="description" key="description" />
            <Column title="Date" dataIndex="date" key="date" render={(date: Date) => date.toLocaleDateString()} />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column
                title="Categories"
                dataIndex="categories"
                key="categories"
                render={(categories: string[]) => (
                    <>
                    {categories.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                        color = 'volcano';
                        }
                        return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                        );
                    })}
                    </>
                )}
                />
            <Column
            title="Action"
            key="action"
            render={(_: any) => (
                <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
                </Space>
            )}
            />
        </Table>
    </>
    )
}

export default ExpensesGrid;