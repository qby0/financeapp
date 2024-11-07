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
                <Tooltip formatter={(value) => [`${value}€`, 'Сума']} />
                <Legend verticalAlign='bottom' align="right" />
                <Bar dataKey="income" fill="#82ca9d" name="Income" barSize={15} />
                <Bar dataKey="expense" fill="#8884d8" name="Expense" barSize={15} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
