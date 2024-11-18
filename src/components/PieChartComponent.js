// ExpensePieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const ExpensePieChart = ({ costs }) => {
    // Групуємо витрати за категоріями, з категорією "Others" для невизначених
    const groupedData = costs.reduce((acc, curr) => {
        let category = curr.category;
        const predefinedCategories = ["Food", "Transport", "Housing", "Entertainment"];

        if (!predefinedCategories.includes(category)) {
            category = "Others";
        }

        if (acc[category]) {
            acc[category] += Math.abs(curr.cost);
        } else {
            acc[category] = Math.abs(curr.cost);
        }
        return acc;
    }, {});

    const data = Object.keys(groupedData).map(key => ({
        name: key,
        value: groupedData[key],
    }));

    const COLORS = ['#fe4384', '#A60000', '#7b1594', '#ff85b1', '#85004B', '#00C49F', '#FFBB28'];

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Легенда */}
            <div style={{ marginRight: '20px', fontFamily: 'Arial, sans-serif' }}>
                {data.map((entry, index) => (
                    <div key={`data-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: COLORS[index % COLORS.length],
                                borderRadius: '50%',
                                marginRight: 8,
                            }}
                        />
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{entry.name}</span>
                        <span style={{ color: 'white', marginLeft: '5px' }}>{entry.value}€</span>
                    </div>
                ))}
            </div>
            {/* Кругова діаграма */}
            <PieChart width={330} height={330}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}   // Ефект Донату
                    outerRadius={120}  // Зовнішній радіус
                    paddingAngle={5}   // Простір між сегментами
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default ExpensePieChart;
