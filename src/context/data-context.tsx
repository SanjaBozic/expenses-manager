import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface categoriesType {
    key: string;
    category: string;
    color: string;
}

interface localDataType {
    key: string;
    date: Date;
    description: string;
    amount: number;
    categories: string[];
}

type themeAppearance = 'light' | 'dark';

interface IDataContext {
    theme: themeAppearance;
    setTheme: React.Dispatch<React.SetStateAction<themeAppearance>>;
    updateTheme: (newData: string) => void;
    categoriesExpenses: categoriesType[];
    categoriesIncome: categoriesType[];
    localExpenses: localDataType[];
    localIncome: localDataType[];
    updateData: (newData: any[], keyLocalData: string, setLocalData: React.Dispatch<any>) => void;
    setCategoriesExpenses: React.Dispatch<React.SetStateAction<categoriesType[]>>;
    setCategoriesIncome: React.Dispatch<React.SetStateAction<categoriesType[]>>;
    setLocalExpenses: React.Dispatch<React.SetStateAction<localDataType[]>>;
    setLocalIncome: React.Dispatch<React.SetStateAction<localDataType[]>>;
}

// Initialize categories from localStorage or set default values
export const DataContext = createContext<IDataContext | null>(null);

export const useCreateDataCtx = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')!) : 'light');

    const [categoriesExpenses, setCategoriesExpenses] = useState( localStorage.getItem('categoriesExpenses') ? JSON.parse(localStorage.getItem('categoriesExpenses')!) :
        [{key: uuidv4(), category: 'bills', color: '#f56a00'},
        {key: uuidv4(), category: 'groceries', color: '#7265e6'},
        {key: uuidv4(), category: 'entertainment', color: '#ff4d4f'},
        {key: uuidv4(), category: 'transportation', color: '#00a2ae'},
        {key: uuidv4(), category: 'healthcare', color: '#87d068'},
        {key: uuidv4(), category: 'clothing', color: '#2db7f5'},
        {key: uuidv4(), category: 'education', color: '#f50'},
        {key: uuidv4(), category: 'other', color: '#108ee9'}
    ]);

    const [categoriesIncome, setCategoriesIncome] = useState( localStorage.getItem('categoriesIncome') ? JSON.parse(localStorage.getItem('categoriesIncome')!) :
        [{key: uuidv4(), category: 'salary', color: '#f56a00'},
        {key: uuidv4(), category: 'freelance', color: '#7265e6'},
        {key: uuidv4(), category: 'investments', color: '#ff4d4f'},
        {key: uuidv4(), category: 'gifts', color: '#00a2ae'},
        {key: uuidv4(), category: 'other', color: '#87d068'}
    ]);

    const [localExpenses, setLocalExpenses] = useState( localStorage.getItem('localExpenses') ? JSON.parse(localStorage.getItem('localExpenses')!) : []);
    const [localIncome, setLocalIncome] = useState( localStorage.getItem('localIncome') ? JSON.parse(localStorage.getItem('localIncome')!) : []);

    const updateData = (newData: { key: string; date: Date; description: string; amount: number; categories: string[] }[], keyLocalData: string, setLocalData: React.Dispatch<any>) => {
        localStorage.setItem(keyLocalData, JSON.stringify(newData));
        setLocalData(newData);
    };

    const updateTheme = (newData: string) => {
        localStorage.setItem('theme', JSON.stringify(newData));
        setTheme(newData);
    };

    return {theme, setTheme, updateTheme ,categoriesExpenses, categoriesIncome, localExpenses, localIncome, updateData, setCategoriesExpenses, setCategoriesIncome, setLocalExpenses, setLocalIncome} as IDataContext;
};