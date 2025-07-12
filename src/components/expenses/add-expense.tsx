import { Button, Card, Form, Input, InputNumber, Select } from "antd";

function AddExpense() {
    const [form] = Form.useForm();
    const localCatExpeneses = JSON.parse(localStorage.getItem('categoriesExpenses') || '{}');

    const getValues = (values: any) => {
        console.log('Received values of form: ', values);
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
                        {localCatExpeneses.map((category: any) => (
                            <Select.Option key={category.key} value={category.category}>{category.category}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input a price.' }]} >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="description" label="Description">
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