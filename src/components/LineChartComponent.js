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
                      />
                      <span style={{ color: 'white' }}>{entry.value}</span>
                  </div>
              ))}
          </div>
      );
    }

    const LineChartComponent = ({ costs, selectedYear, selectedMonth }) => {
        // Функція для отримання кількості днів у місяці
        const getDaysInMonth = (year, month) => {
            return new Date(year, month, 0).getDate();
        };

        // Ідентифікуємо обраний рік та місяць
        const year = parseInt(selectedYear, 10);
        const month = selectedMonth ? parseInt(selectedMonth, 10) : null;

        // Отримуємо кількість днів у обраному місяці
        const daysInMonth = month ? getDaysInMonth(year, month) : 31; // Якщо місяць не вибрано, використовуйте максимальну кількість днів

        // Ініціалізуємо об'єкт для зберігання сум доходів та витрат за кожним днем
        const dailyData = {};

        // Заповнюємо об'єкт початковими значеннями
        for (let day = 1; day <= daysInMonth; day++) {
            dailyData[day] = { day: day.toString(), income: 0, expenses: 0 };
        }

        // Агрегуємо доходи та витрати за кожним днем
        costs.forEach(cost => {
            const date = cost.date;
            const costYear = date.getFullYear();
            const costMonth = date.getMonth() + 1; // Місяці нумеруються з 0
            const costDay = date.getDate();

            if (
                (year && costYear === year) &&
                (month ? costMonth === month : true)
            ) {
                if (cost.type === 'income') {
                    dailyData[costDay].income += cost.cost;
                } else if (cost.type === 'expense') {
                    dailyData[costDay].expenses += Math.abs(cost.cost);
                }
            }
        });

        // Перетворюємо об'єкт у масив для Recharts
        const data = Object.values(dailyData);

        // Динамічний назва місяця для осі X
        const currentMonthName = month ? new Date(year, month - 1).toLocaleString('default', { month: 'long' }) : 'Month';

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: currentMonthName, position: 'insideBottomRight', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend content={<CustomLegend />} verticalAlign="bottom" align="left" />
                    <Line type="monotone" dataKey="income" stroke="#ff5588" strokeWidth={3} name="Income" />
                    <Line type="monotone" dataKey="expenses" stroke="#c10067" strokeWidth={3} name="Expenses" />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    export default LineChartComponent;
