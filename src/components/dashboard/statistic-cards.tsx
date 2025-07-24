import { Card, Col, Row, Statistic, theme } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

interface StatisticCardsProps {
    expenses: localDataType[];
    income: localDataType[];
}

interface localDataType {
    key: string;
    date: Date;
    description: string;
    amount: number;
    categories: string[];
}

function StatisticCards(props: StatisticCardsProps) {
    const totalExpenses = props.expenses.length > 0 ? props.expenses.map(x => x.amount).reduce((sum, num) => sum + num) : 0; 
    const totalIncome = props.income.length > 0 ? props.income.map(x => x.amount).reduce((sum, num) => sum + num) : 0; 
    const balance = totalIncome - totalExpenses;
    const getTheme = theme.useToken().token;
    const colorRed = getTheme.colorErrorText;
    const colorGreen = getTheme.colorSuccessText;
    
    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card variant="borderless">
                    <Statistic
                        title="Income"
                        value={totalIncome}
                        precision={2}
                        valueStyle={{ color: colorGreen }}
                        prefix={<ArrowUpOutlined />}
                        suffix="€"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card variant="borderless">
                    <Statistic
                        title="Balance"
                        value={balance}
                        precision={2}
                        prefix={balance < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                        suffix="€"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card variant="borderless">
                    <Statistic
                        title="Expenses"
                        value={totalExpenses}
                        precision={2}
                        valueStyle={{ color: colorRed }}
                        prefix={<ArrowDownOutlined />}
                        suffix="€"
                    />
                </Card>
            </Col>
        </Row>
    );
}

export default StatisticCards;