import '../../style/framework.css';
import { Divider } from 'antd';
import CategoriesGrid from './categories-grid';
import useData from '../../hooks/use-data'

function Categories() {
    const { categoriesExpenses, setCategoriesExpenses, categoriesIncome, setCategoriesIncome, updateData } = useData();

    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Expense Categories</Divider>
            <CategoriesGrid localData={categoriesExpenses} setLocalData={setCategoriesExpenses} keyLocalData='categoriesExpenses' updateData={updateData}/>
            <Divider orientation="left">Income Categories</Divider>
            <CategoriesGrid localData={categoriesIncome} setLocalData={setCategoriesIncome} keyLocalData='categoriesIncome' updateData={updateData}/>
        </div>
    </>
    )
}

export default Categories;