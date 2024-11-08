import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

function CustomLegend(props) {
    const { payload } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {payload.map((entry, index) => (
                <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 10,
                            height: 10,
                            backgroundColor: entry.color,
                            borderRadius: '50%',
                            marginRight: 5,
                        }}
                    ></span>
                    <span style={{ color: 'white' }}>{entry.value}</span>
                </div>
            ))}
        </div>
    );
  }

const BarChartComponent = ({ costs }) => {
    const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyData = monthsOrder.map((month) => ({
        month,
        income: 0,
        expense: 0,
    }));

    costs.forEach(cost => {
        const date = cost.date;
        const monthIndex = date.getMonth(); // 0-based index
        if (monthIndex >= 0 && monthIndex < 12) {
            if (cost.type === 'income') {
                monthlyData[monthIndex].income += parseFloat(cost.cost);
            } else if (cost.type === 'expense') {
                monthlyData[monthIndex].expense += Math.abs(parseFloat(cost.cost));
            }
        }
    });

    console.log("Bar Chart Data:", monthlyData);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend content={<CustomLegend />} verticalAlign='bottom' align="right" />
                <Bar dataKey="income" fill="#ff5588" name="Income" barSize={15} />
                <Bar dataKey="expense" fill="#c10067" name="Expenses" barSize={15} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
