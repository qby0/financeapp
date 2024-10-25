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

const MonthlyIncomeExpensesChart = () => {
  // Пример данных о доходах и расходах
  const data = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 2210 },
    { month: 'Mar', income: 2000, expenses: 2290 },
    { month: 'Apr', income: 2780, expenses: 2000 },
    { month: 'May', income: 1890, expenses: 2181 },
    { month: 'Jun', income: 2390, expenses: 2500 },
    { month: 'Jul', income: 3490, expenses: 2100 },
    { month: 'Aug', income: 4000, expenses: 2400 },
    { month: 'Sep', income: 3000, expenses: 2210 },
    { month: 'Oct', income: 2000, expenses: 2290 },
    { month: 'Nov', income: 2780, expenses: 2000 },
    { month: 'Dec', income: 1890, expenses: 2181 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        {/* Изменение позиции легенды */}
        <Legend verticalAlign='bottom' align="right" />
        <Bar dataKey="income" fill="#ff5588" name="Income" /> {/* Светлый розовый */}
        <Bar dataKey="expenses" fill="#8e004c" name="Expenses" /> {/* Темный розовый */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyIncomeExpensesChart;
