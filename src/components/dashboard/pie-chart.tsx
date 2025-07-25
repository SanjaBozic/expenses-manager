
import { Pie } from '@ant-design/plots';
import { useTheme } from 'antd-style';
import React from 'react';

interface PieChartProps {
    data: localDataType[];
    categories: { key: string; category: string; color: string }[];
}

interface localDataType {
    key: string;
    date: Date;
    description: string;
    amount: number;
    categories: string[];
}

function PieChart(props: PieChartProps) {
    const themeSwitch = useTheme().appearance;

    const prepareData = () => {
        const data = props.data;
        const grouped = data.reduce<Record<string, number>>((acc, item) => {
            const key = item.categories.toString();
            acc[key] = (acc[key] || 0) + item.amount;
            return acc;
        }, {});
        const result = Object.keys(grouped).map(type => ({
             type: type,
             value: grouped[type]
        }));
        return result;
    }

    const averageHexColor = (hexColors: string[]) => {
        if (!hexColors || hexColors.length === 0) {
            return null;
        }

        let redSum = 0;
        let greenSum = 0;
        let blueSum = 0;

        for (const hexColor of hexColors) {
            const hex = hexColor.replace("#", "");
            const red = parseInt(hex.substring(0, 2), 16);
            const green = parseInt(hex.substring(2, 4), 16);
            const blue = parseInt(hex.substring(4, 6), 16);

            redSum += red;
            greenSum += green;
            blueSum += blue;
        }

        const avgRed = Math.round(redSum / hexColors.length);
        const avgGreen = Math.round(greenSum / hexColors.length);
        const avgBlue = Math.round(blueSum / hexColors.length);

        const avgHexRed = avgRed.toString(16).padStart(2, '0');
        const avgHexGreen = avgGreen.toString(16).padStart(2, '0');
        const avgHexBlue = avgBlue.toString(16).padStart(2, '0');

        return `#${avgHexRed}${avgHexGreen}${avgHexBlue}`;
    }

    const getColorRelation = () => {
        let colorRelation = [];
        let types = prepareData().map( item => item.type);
        for (let type of types){
            let catRows = [];
            let catColors = [];
            let avgColor = '';
            const typesSplit = type.split(',');
            if (typesSplit.length > 1){
                catRows = props.categories.filter(x => typesSplit.includes(x.category));
                catColors = catRows.map(x => x.color);
                avgColor = averageHexColor(catColors) || '#000';
            } else {
                catRows = props.categories.filter(x => type.includes(x.category));
                avgColor = catRows.map(x => x.color)[0];
            }
            colorRelation.push([type, avgColor || '#000'])
        }
        return colorRelation;
    }


    const config = {
        theme: themeSwitch == 'light' ? 'classic' : 'classicDark',
        data: prepareData(),
        angleField: 'value',
        colorField: 'type',

        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'top',
                rowPadding: 15,
            },
        },
        scale:{
            color:{
                relations: getColorRelation()
            }
        },
        tooltip: ({ value, type }:{ value: number; type: string }) => {
            // Extra fields
            return { type, value };
        },
        interaction: {
            tooltip: {
                render: (_: any, { items }: { items: Array<{ type: string; value: number; }> }) => {
                return (
                        <React.Fragment>
                        {items.map((item) => {
                            const { type, value } = item;
                            const colorRelation = getColorRelation().find(a => a[0] == type)!;
                            return (
                            <div key={type} style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                <span
                                    style={{
                                    display: 'inline-block',
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: colorRelation[1] || '#000',
                                    marginRight: 6,
                                    }}
                                ></span>
                                <span style={{paddingRight: '15px'}}>{type}</span>
                                </div>
                                <b>{value}</b>
                            </div>
                            );
                        })}
                        </React.Fragment>
                    );
                },
            },
        },
        style: {
            padding: 10,
            fill: ({ type }: { type: string }) => {
                const colorRelation = getColorRelation().find(a => a[0] == type)!;
                return colorRelation[1] || '#000';
            },
        },
    };

    return <Pie {...config} />;

}

export default PieChart;