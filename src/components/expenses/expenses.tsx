import { Divider, Flex } from 'antd';
import '../../style/framework.css';
import AddExpense from './add-expense';
import ExpensesGrid from './expenses-grid';

function Expenses() {

    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Expenses</Divider>
            <Flex gap="middle" justify="space-between">
                <ExpensesGrid />
                <AddExpense />
            </Flex>
        </div>
    </>
    )
}

export default Expenses;