import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { v4 as uuidv4 } from 'uuid';

interface DataType {
  key: string;
  date: Date;
  description: string;
  amount: number;
  categories: string[];
}

interface AddDataProps {
    localData: { key: string; date: Date; description: string; amount: number; categories: string[] }[];
    setLocalData: React.Dispatch<React.SetStateAction<DataType[]>>;
    keyLocalData: string;
    updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
    categoryData: { category: string; color: string }[];
}

function AddData(props: AddDataProps) {
    const [form] = Form.useForm();

    const getValues = (values: any) => {
        const newRow: DataType = {
            key: uuidv4(),
            date: new Date(),
            description: values.description || '',
            amount: values.amount || 0,
            categories: values.category || []
        };
        props.updateData([...props.localData, newRow], props.keyLocalData, props.setLocalData);
    };

    return (
    <>
        <Card title="Add" variant="borderless" className="main-grid__add">
             <Form
            layout='vertical'
            form={form}
            onFinish={getValues} >
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please choose at least one category.', type: 'array' }]} >
                    <Select mode="multiple" placeholder="Please select one or more categories">
                        {props.categoryData.map((category: any) => (
                            <Select.Option key={category.key} value={category.category}>{category.category}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="amount" label="Amount"  rules={[
                    { required: true, message: 'Please input a value.' },
                    () => ({
                        validator(_rule, value, _callback) {
                            if(!value){
                                return Promise.resolve();
                            }
                            if (value <= 0.01){
                                return Promise.reject("The value must be at least 0.01 or higher.");
                            }
                            return Promise.resolve();
                        },
                    })
                    ]} >
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

export default AddData;