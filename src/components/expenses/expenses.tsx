import { Divider, Flex } from 'antd';
import '../../style/framework.css';
import AddExpense from './add-expense';
import ExpensesGrid from './expenses-grid';
import useData from '../../hooks/use-data';

function Expenses() {
    const { localExpenses, setLocalExpenses, updateData } = useData();
    const totalAmount = localExpenses.length > 0 ? localExpenses.map(x => x.amount).reduce((sum, num) => sum + num) : null; 

    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Expenses</Divider>
            <Flex gap="middle" justify="space-between">
                <ExpensesGrid localData={localExpenses} setLocalData={setLocalExpenses} keyLocalData='localExpenses' updateData={updateData}/>
                <AddExpense localData={localExpenses} setLocalData={setLocalExpenses} keyLocalData='localExpenses' updateData={updateData}/>
            </Flex>
            <Divider orientation="left">Total amount of expenses: {totalAmount ? totalAmount.toFixed(2) : '0.00'} €</Divider>
        </div>
    </>
    )
}

export default Expenses;