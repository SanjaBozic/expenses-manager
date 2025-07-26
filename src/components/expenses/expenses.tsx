import { Divider, Flex } from 'antd';
import '../../style/framework.css';
import useData from '../../hooks/use-data';
import AddData from '../main-grid/add-to-grid';
import MainGrid from '../main-grid/main-grid';

function Expenses() {
    const { localExpenses, setLocalExpenses, updateData, categoriesExpenses } = useData();
    const totalAmount = localExpenses.length > 0 ? localExpenses.map(x => x.amount).reduce((sum, num) => sum + num) : null; 

    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Expenses</Divider>
            <Flex gap="middle" justify="space-evenly" wrap={true}>
                <MainGrid localData={localExpenses} setLocalData={setLocalExpenses} keyLocalData='localExpenses' updateData={updateData} categoryData={categoriesExpenses}/>
                <AddData localData={localExpenses} setLocalData={setLocalExpenses} keyLocalData='localExpenses' updateData={updateData} categoryData={categoriesExpenses}/>
            </Flex>
            <Divider orientation="left">Total amount of expenses: {totalAmount ? totalAmount.toFixed(2) : '0.00'} €</Divider>
        </div>
    </>
    )
}

export default Expenses;