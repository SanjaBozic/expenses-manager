import { useState } from 'react';
import '../../style/framework.css';
import { Divider } from 'antd';
import CategoriesGrid from './categories-grid';

function Categories() {
    // Initialize categories from localStorage or set default values
    const [categoriesExpenses, setCategoriesExpenses] = useState( localStorage.getItem('categoriesExpenses') ? JSON.parse(localStorage.getItem('categoriesExpenses')!) :
        [{key: 1, category: 'bills', color: '#f56a00'},
        {key: 2, category: 'groceries', color: '#7265e6'},
        {key: 3, category: 'entertainment', color: '#ff4d4f'},
        {key: 4, category: 'transportation', color: '#00a2ae'},
        {key: 5, category: 'healthcare', color: '#87d068'},
        {key: 6, category: 'clothing', color: '#2db7f5'},
        {key: 7, category: 'education', color: '#f50'},
        {key: 8, category: 'other', color: '#108ee9'}
    ]);

    const [categoriesIncome, setCategoriesIncome] = useState( localStorage.getItem('categoriesIncome') ? JSON.parse(localStorage.getItem('categoriesIncome')!) :
        [{key: 1, category: 'salary', color: '#f56a00'},
        {key: 2, category: 'freelance', color: '#7265e6'},
        {key: 3, category: 'investments', color: '#ff4d4f'},
        {key: 4, category: 'gifts', color: '#00a2ae'},
        {key: 5, category: 'other', color: '#87d068'}
    ]);


    return (
    <>
        <div className="em-content-wrap">
            <Divider orientation="left">Expense Categories</Divider>
            <CategoriesGrid localData={categoriesExpenses} setLocalData={setCategoriesExpenses} keyLocalData='categoriesExpenses'/>
            <Divider orientation="left">Income Categories</Divider>
            <CategoriesGrid localData={categoriesIncome} setLocalData={setCategoriesIncome} keyLocalData='categoriesIncome'/>
        </div>
    </>
    )
}

export default Categories;