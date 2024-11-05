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
        <Legend content={<CustomLegend />} verticalAlign="bottom" align="right" />
            <Bar dataKey="income" fill="#ff5588" name="Income" /> {/* Light Pink */}
            <Bar dataKey="expenses" fill="#8e004c" name="Expenses" /> {/* Dark Pink */}
        <Legend content={<CustomLegend />} verticalAlign="bottom" align="right" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyIncomeExpensesChart;
