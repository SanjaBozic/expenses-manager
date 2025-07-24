import { Segmented } from 'antd';
import '../../style/framework.css';
import { useState } from 'react';

interface DashboardFiltersProps {
    localExpenses: localDataType[];
    localIncome: localDataType[];
    setExpenses: React.Dispatch<React.SetStateAction<localDataType[]>>;
    setIncome: React.Dispatch<React.SetStateAction<localDataType[]>>;
}

interface localDataType {
    key: string;
    date: Date;
    description: string;
    amount: number;
    categories: string[];
}

function DashboardFilters(props: DashboardFiltersProps) {
    const [filter, setFilter] = useState<string>('Yearly');
    const todaysDate = new Date();
    const monthDate = new Date().getMonth();

    const getFirstAndLastDayOfTheWeek = (date: Date) => {
        let day = date.getDay(),
            firstday = date.getDate() - day + (day == 0 ? -6 : 1),
            lastday = date.getDate() - (day - 1) + 6
        return {firstday, lastday};
    }

    const getDailyFilter = (value: string) => {
        let dailyExpenses = props.localExpenses.filter(x => new Date(x.date).toISOString().split('T')[0] === todaysDate.toISOString().split('T')[0] ) 
        let dailyIncome = props.localIncome.filter(x => new Date(x.date).toISOString().split('T')[0] === todaysDate.toISOString().split('T')[0] ) 
        setExpensesIncomeFilter(dailyExpenses, dailyIncome, value);
    }

    const getWeeklyFilter = (value: string) => {
        let monday = getFirstAndLastDayOfTheWeek(todaysDate).firstday;
        let sunday = getFirstAndLastDayOfTheWeek(todaysDate).lastday;
        let firstDate = new Date(todaysDate.setDate(monday));
        let lastDate = new Date(todaysDate.setDate(sunday));
        let weeklyExpenses = props.localExpenses.filter(x => new Date(x.date).toISOString().split('T')[0] >= firstDate.toISOString().split('T')[0] && new Date(x.date).toISOString().split('T')[0] <= lastDate.toISOString().split('T')[0] ) 
        let weeklyIncome = props.localIncome.filter(x => new Date(x.date).toISOString().split('T')[0] >= firstDate.toISOString().split('T')[0] && new Date(x.date).toISOString().split('T')[0] <= lastDate.toISOString().split('T')[0] ) 
        setExpensesIncomeFilter(weeklyExpenses, weeklyIncome, value);
    }

    const getMonthlyFilter = (value: string) => {
        let monthlyExpenses = props.localExpenses.filter(x => new Date(x.date).getMonth() === monthDate ) 
        let monthlyIncome = props.localIncome.filter(x => new Date(x.date).getMonth() === monthDate ) 
        setExpensesIncomeFilter(monthlyExpenses, monthlyIncome, value);
    }

    const getQuarterlyFilter = (value: string) => {
        let todaysQuarter = Math.floor((todaysDate.getMonth() + 3) / 3);
        let baseMonthNumber = (todaysQuarter - 1) * 3;
        let monthNumbers = [1,2,3].map(x => baseMonthNumber + x); //[baseMonthNumber + 1, baseMonthNumber + 2, baseMonthNumber + 3];
        let quarterlyExpenses = props.localExpenses.filter(x => monthNumbers.includes(new Date(x.date).getMonth()+1)); //getMonth counts from 0
        let quarterlyIncome = props.localIncome.filter(x => monthNumbers.includes(new Date(x.date).getMonth()+1)); 
        setExpensesIncomeFilter(quarterlyExpenses, quarterlyIncome, value);

    }

    const getYearlyFilter = (value: string) => {
        let yearDate = new Date().getFullYear();
        let yearlyExpenses = props.localExpenses.filter(x => new Date(x.date).getFullYear() === yearDate ) 
        let yearlyIncome = props.localIncome.filter(x => new Date(x.date).getFullYear() === yearDate ) 
        setExpensesIncomeFilter(yearlyExpenses, yearlyIncome, value);
    }

    const setExpensesIncomeFilter = (expense: localDataType[], income: localDataType[], value: string) => {
        props.setExpenses(expense);
        props.setIncome(income);
        setFilter(value);
    }

    return (
    <>
        <Segmented<string>
            options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
            value={filter}
            style={{marginBottom: '20px'}}
            onChange={(value) => {
                switch(value) {
                    case 'Daily':
                        getDailyFilter(value);
                        break;
                    case 'Weekly':
                        getWeeklyFilter(value);
                        break;
                    case 'Monthly':
                        getMonthlyFilter(value);
                        break;
                    case 'Quarterly':
                        getQuarterlyFilter(value);
                        break;
                    case 'Yearly':
                    default:
                        getYearlyFilter(value);
                        break;
                    }
                }}
        />
    </>
    )
}

export default DashboardFilters;