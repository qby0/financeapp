import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const ExpensePieChart = () => {
  // Обновленные данные с более контрастными оттенками розового
  const data = [
    { name: 'Food', value: 400, fill: '#fe4384' }, // Темный розовый
    { name: 'Transport', value: 300, fill: '#A60000' }, // Светлый розовый
    { name: 'Housing', value: 500, fill: '#7b1594' }, // Глубокий розовый
    { name: 'Entertainment', value: 200, fill: '#ff85b1' }, // Нежный розовый
    { name: 'Others', value: 150, fill: '#85004B' }, // Очень светлый розовый
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Столбик с данными */}
      <div style={{ marginRight: '20px', fontFamily: 'Arial, sans-serif' }}>
        {data.map((entry, index) => (
          <div key={`data-${index}`} style={{ marginBottom: '10px' }}>
            <span style={{ color: entry.fill, fontWeight: 'bold' }}>
              ● {entry.name}
            </span>
          </div>
        ))}
      </div>

      {/* График */}
      <PieChart width={330} height={330}> {/* Уменьшенные размеры */}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}   // Для "donut" эффекта
          outerRadius={120}  // Радиус внешней части
          paddingAngle={5}   // Отступы между секторами
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
