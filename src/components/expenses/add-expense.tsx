import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import useData from "../../hooks/use-data";
import { v4 as uuidv4 } from 'uuid';

interface DataType {
  key: string;
  date: Date;
  description: string;
  amount: number;
  categories: string[];
}

interface AddExpenseProps {
    localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
    setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
    keyLocalData: string;
    updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
}

function AddExpense(props: AddExpenseProps) {
    const [form] = Form.useForm();
    const categoriesExpenses = useData().categoriesExpenses;

    const getValues = (values: any) => {
        const newExpense: DataType = {
            key: uuidv4(),
            date: new Date(),
            description: values.description || '',
            amount: values.amount || 0,
            categories: values.category || []
        };
        props.updateData([...props.localData, newExpense], props.keyLocalData, props.setLocalData);
    };

    return (
    <>
        <Card title="Add new cost" variant="borderless" style={{ width: 600 }}>
             <Form
            layout='vertical'
            form={form}
            onFinish={getValues} >
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please choose at least one category.', type: 'array' }]} >
                    <Select mode="multiple" placeholder="Please select one or more categories">
                        {categoriesExpenses.map((category: any) => (
                            <Select.Option key={category.key} value={category.category}>{category.category}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input a price.' }]} >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="description" label="Description"  rules={[{ required: true, message: 'Please input a description.' }]}>
                    <Input showCount maxLength={50} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    </>
    )
}

export default AddExpense;