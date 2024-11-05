import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


function CustomLegend(props) {
  const { payload } = props;
  return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', paddingLeft: '10px' }}>
          {payload.map((entry, index) => (
              <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
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

// Get the current month dynamically
const getCurrentMonthName = () => {
  const date = new Date();
  return date.toLocaleString('en-US', { month: 'long' });
};

const MonthlyIncomeExpensesLineChart = () => {
  const currentMonth = getCurrentMonthName(); // Get the current month name

  // Example data: income and expenses per day for the current month
  const data = [
    { day: '1', income: 500, expenses: 300 },
    { day: '2', income: 700, expenses: 200 },
    { day: '3', income: 600, expenses: 400 },
    { day: '4', income: 800, expenses: 500 },
    { day: '5', income: 900, expenses: 300 },
    { day: '6', income: 1000, expenses: 600 },
    { day: '7', income: 750, expenses: 450 },
    { day: '8', income: 650, expenses: 300 },
    { day: '9', income: 700, expenses: 350 },
    { day: '10', income: 800, expenses: 400 },
    { day: '11', income: 600, expenses: 200 },
    { day: '12', income: 500, expenses: 300 },
    { day: '13', income: 700, expenses: 400 },
    { day: '14', income: 850, expenses: 350 },
    { day: '15', income: 950, expenses: 600 },
    { day: '16', income: 720, expenses: 380 },
    { day: '17', income: 800, expenses: 420 },
    { day: '18', income: 900, expenses: 500 },
    { day: '19', income: 600, expenses: 250 },
    { day: '20', income: 700, expenses: 300 },
    { day: '21', income: 850, expenses: 450 },
    { day: '22', income: 900, expenses: 600 },
    { day: '23', income: 780, expenses: 420 },
    { day: '24', income: 820, expenses: 500 },
    { day: '25', income: 650, expenses: 350 },
    { day: '26', income: 700, expenses: 400 },
    { day: '27', income: 900, expenses: 500 },
    { day: '28', income: 1000, expenses: 550 },
    { day: '29', income: 950, expenses: 600 },
    { day: '30', income: 800, expenses: 400 },
    { day: '31', income: 850, expenses: 450 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* Display the current month name dynamically on the X-axis */}
        <XAxis dataKey="day" label={{ value: `${currentMonth}`, position: 'insideBottomRight', offset: -5 }} />
        <YAxis />
        <Tooltip />
        <Legend content={<CustomLegend />} verticalAlign="bottom" align="left" />
            <Line type="monotone" dataKey="income" stroke="#ff5588" strokeWidth={3} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#c10067" strokeWidth={3} name="Expenses" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyIncomeExpensesLineChart;
