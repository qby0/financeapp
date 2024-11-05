import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const ExpensePieChart = () => {
  // Updated data with contrasting shades of pink
  const data = [
    { name: 'Food', value: 400, fill: '#fe4384' }, // Dark pink
    { name: 'Transport', value: 300, fill: '#A60000' }, // Light pink
    { name: 'Housing', value: 500, fill: '#7b1594' }, // Deep pink
    { name: 'Entertainment', value: 200, fill: '#ff85b1' }, // Soft pink
    { name: 'Others', value: 150, fill: '#85004B' }, // Very light pink
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Custom Legend */}
      <div style={{ marginRight: '20px', fontFamily: 'Arial, sans-serif' }}>
        {data.map((entry, index) => (
          <div key={`data-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            {/* Color dot */}
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor: entry.fill,
                borderRadius: '50%',
                marginRight: 8,
              }}
            />
            {/* White text */}
            <span style={{ color: 'white', fontWeight: 'bold' }}>{entry.name}</span>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <PieChart width={330} height={330}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}   // Donut effect
          outerRadius={120}  // Outer radius
          paddingAngle={5}   // Space between segments
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
