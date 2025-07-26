import { Waterfall } from '@ant-design/charts';
import { useTheme } from 'antd-style';

interface WaterfallChartProps {
    dataExpenses: localDataType[];
    dataIncome: localDataType[];
}

interface localDataType {
    key: string;
    date: Date;
    description: string;
    amount: number;
    categories: string[];
}

function WaterfallChart(props: WaterfallChartProps) {
    const themeSwitch = useTheme().appearance;

    const prepareData = () => {
        if (props.dataExpenses.length > 0 || props.dataIncome.length > 0 ){
            const dataExpenses = props.dataExpenses.map(({date, amount}) => ({x: new Date(date).toLocaleString(), value: amount}));
            const dataExpensesNegative = dataExpenses.map(item => ({...item, value: -Math.abs(item.value)}));
            const dataIncome = props.dataIncome.map(({date, amount}) => ({x: new Date(date).toLocaleString(), value: amount}));
            const mergedData = [...dataExpensesNegative, ...dataIncome];
            const sortedData = mergedData.sort((a, b) => Date.parse(a.x) - Date.parse(b.x));
            sortedData[0].x = 'Start';
            sortedData[sortedData.length - 1].x = 'End';
            return sortedData;
        }
        return [{x: 'Start', value: 0}, {x: 'End', value: 0}]
    }

    const config = {
        theme: themeSwitch == 'light' ? 'classic' : 'classicDark',
        data: prepareData(),
            xField: 'x',
            yField: 'value',
            linkStyle: {
            lineDash: [4, 2],
            stroke: '#ccc',
        },
        style: {
            maxWidth: 25,
            stroke: '#ccc',
            fill: (d:any, idx:any) => {
                return idx === 0 || d.isTotal ? '#16446cff' : d.value > 0 ? '#0c7536ff' : '#8e2607ff';
            },
        },
        label: {
            text: 'value',
            formatter: '~s',
            position: (d:any) => (d.value > 0 ? 'top' : 'bottom'),
            textBaseline: (d:any) => (d.value > 0 ? 'bottom' : 'top'),
            fontSize: 10,
            dy: (d:any) => (d.value > 0 ? -4 : 4),
        },
        connector: {
            reverse: true,
            style: { stroke: '#697474', offset: 16 },
        },
  };
  
  return <Waterfall {...config} />;
}

export default WaterfallChart;