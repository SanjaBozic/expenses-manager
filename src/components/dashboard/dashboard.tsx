import { Divider, theme } from 'antd';
import '../../style/framework.css';
import './dashboard.css'
import useData from '../../hooks/use-data';
import { useState } from 'react';
import StatisticCards from './statistic-cards';
import DashboardFilters from './dashboard-filters';
import PieChart from './pie-chart';
import WaterfallChart from './waterfall-chart';

function Dashboard() {
    const { localExpenses, localIncome, categoriesExpenses, categoriesIncome } = useData();
    const [expenses, setExpenses] = useState(localExpenses);
    const [income, setIncome] = useState(localIncome);
    const colorBg = theme.useToken().token.colorInfoBg;

    return (
    <>
        <div>
            <div className='dashboard__statistics-wrap' style={{backgroundColor: colorBg}}>
                <Divider orientation="left">Filters & Statistics</Divider>
                <DashboardFilters localExpenses={localExpenses} localIncome={localIncome} setExpenses={setExpenses} setIncome={setIncome} />
                <StatisticCards expenses={expenses} income={income} />
            </div>
            <div className="em-content-wrap dashboard__charts">
                <div  className='dashboard__waterfall-wrap'>
                    <Divider orientation="left">Income vs Expense over time</Divider>
                    <div className='dashboard__waterfall'>
                        <WaterfallChart dataExpenses={expenses} dataIncome={income}/>
                    </div>
                </div>

                <div className="dashboard__pies">
                    <div className='dashboard__pie-wrap'>
                        <Divider orientation="left">Expense</Divider>
                        <PieChart data={expenses} categories={categoriesExpenses}/>
                    </div>
                    <div className='dashboard__pie-wrap'>
                        <Divider orientation="left">Income</Divider>
                        <PieChart data={income} categories={categoriesIncome}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard;