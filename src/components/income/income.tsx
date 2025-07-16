import { Divider, Flex } from 'antd';
import useData from '../../hooks/use-data';
import '../../style/framework.css';
import MainGrid from '../main-grid/main-grid';
import AddData from '../main-grid/add-to-grid';

function Income() {
    const { localIncome, setLocalIncome, updateData, categoriesIncome } = useData();
    const totalAmount = localIncome.length > 0 ? localIncome.map(x => x.amount).reduce((sum, num) => sum + num) : null; 

    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Income</Divider>
            <Flex gap="middle" justify="space-between">
                <MainGrid localData={localIncome} setLocalData={setLocalIncome} keyLocalData='localIncome' updateData={updateData} categoryData={categoriesIncome}/>
                <AddData localData={localIncome} setLocalData={setLocalIncome} keyLocalData='localIncome' updateData={updateData} categoryData={categoriesIncome}/>
            </Flex>
            <Divider orientation="left">Total amount of income: {totalAmount ? totalAmount.toFixed(2) : '0.00'} €</Divider>
        </div>
    </>
    )
}

export default Income;