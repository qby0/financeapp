import React, { useState, useEffect } from 'react';
import Costs from "./Costs";
import NewCost from "./NewCost/NewCost";
import QrScanner from "./QrScanner";
import Footer from './Footer';
import './Dashboard.css';
import ExpensePieChart from './PieChartComponent';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const Dashboard = ({ user }) => {
    const [showScanner, setShowScanner] = useState(false);
    const [costs, setCosts] = useState([]);
    const [selectedYear, setSelectedYear] = useState("2024");
    const [selectedMonth, setSelectedMonth] = useState(""); // Стан для місяця

    // Завантаження даних з Firebase при завантаженні компонента
    useEffect(() => {
        if (!user) return;

        const userCostsRef = ref(database, `users/${user.uid}/purchases`);
        const unsubscribe = onValue(userCostsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedCosts = [];

            for (let key in data) {
                // Розбиваємо дату на рік, місяць, день
                const dateString = data[key].date;
                const [year, month, day] = dateString.split('-').map(Number);
                const date = new Date(year, month - 1, day); // Місяць від 0 до 11

                loadedCosts.push({
                    id: data[key].id,
                    description: data[key].description,
                    cost: parseFloat(data[key].cost), // Перетворюємо на число
                    date: date,
                    type: data[key].type,
                });
            }

            setCosts(loadedCosts);
        });

        return () => unsubscribe();
    }, [user]);

    const yearChangeHandler = (year) => {
        setSelectedYear(year);
    };

    const monthChangeHandler = (month) => {
        setSelectedMonth(month);
    };

    // Фільтрація за роком та місяцем для графіків
    const pieChartCosts = costs.filter(cost => {
        const costYear = cost.date.getFullYear().toString();
        const costMonth = ("0" + (cost.date.getMonth() + 1)).slice(-2);

        const yearMatch = costYear === selectedYear;
        const monthMatch = selectedMonth ? costMonth === selectedMonth : true;

        return cost.type === 'expense' && yearMatch && monthMatch;
    });

    // Виправлення: фільтруємо дані для BarChartComponent, включаючи всі транзакції за рік
    const barChartCosts = costs.filter(cost => {
        const costYear = cost.date.getFullYear().toString();

        const yearMatch = costYear === selectedYear;

        return yearMatch; // Повертаємо всі транзакції за обраний рік
    });

    // Фільтрація для LineChartComponent (можете залишити як є)
    const lineChartCosts = costs.filter(cost => {
        const costYear = cost.date.getFullYear().toString();
        const costMonth = ("0" + (cost.date.getMonth() + 1)).slice(-2);

        const yearMatch = costYear === selectedYear;
        const monthMatch = selectedMonth ? costMonth === selectedMonth : true;

        return (cost.type === 'income' || cost.type === 'expense') && yearMatch && monthMatch;
    });

    // Додамо консольні логи для перевірки
    useEffect(() => {
        console.log("All Costs:", costs);
        console.log("Pie Chart Costs:", pieChartCosts);
        console.log("Bar Chart Costs:", barChartCosts);
        console.log("Line Chart Costs:", lineChartCosts);
    }, [costs, pieChartCosts, barChartCosts, lineChartCosts]);

    // Обчислення загальних доходів та витрат
    const totalIncome = costs
        .filter(cost => cost.type === 'income' && cost.date.getFullYear().toString() === selectedYear)
        .reduce((acc, curr) => acc + curr.cost, 0);
        const totalExpenses = costs
        .filter(cost => cost.type === 'expense' && cost.date.getFullYear().toString() === selectedYear)
        .reduce((acc, curr) => acc + Math.abs(curr.cost), 0);

    const difference = totalIncome - totalExpenses;

    // Визначаємо filteredCosts для компонента Costs
    const filteredCosts = costs.filter(cost => {
        const costYear = cost.date.getFullYear().toString();
        const costMonth = ("0" + (cost.date.getMonth() + 1)).slice(-2);

        const yearMatch = costYear === selectedYear;
        const monthMatch = selectedMonth ? costMonth === selectedMonth : true;

        return (cost.type === 'income' || cost.type === 'expense') && yearMatch && monthMatch;
    });

    return (
        <>
            {/* Відео на фоні */}
            <video className="video-background" autoPlay loop muted>
                <source src="/1v_1.mp4" type="video/mp4" />
                Ваш браузер не підтримує відео.
            </video>

            <h1>Expense and budget tracking</h1>

            <div className="dashboard-container">
                <div className="dashboard-difference">
                    <strong>Difference</strong>
                    <br />
                    <span>{difference}€</span>
                </div>

                <div className="dashboard-row">
                    <div className="dashboard-income">
                        <span>Income</span>
                        <span>{totalIncome}€</span>
                    </div>
                    <div className="dashboard-spendings">
                        <span>Expenses</span>
                        <span>{totalExpenses}€</span>
                    </div>
                </div>
            </div>

            <div className="dashboard">
                <button onClick={() => setShowScanner(true)}>Use QR</button>

                {showScanner && (
                    <QrScanner onCancel={() => setShowScanner(false)} />
                )}
            </div>

            <NewCost /> {/* Без пропса onAddCost */}

            <br />
            <div className="table-container">
                <table className="chart-table">
                    <tbody>
                        <tr>
                            <td className="chart-cell" colSpan={2}>
                                <ExpensePieChart costs={pieChartCosts} />
                            </td>
                        </tr>
                        <tr>
                            <td className="chart-cell" colSpan={2}>
                                <BarChartComponent costs={barChartCosts} /> {/* Передаємо всі транзакції за рік */}
                            </td>
                        </tr>
                        <tr>
                            <td className="chart-cell" colSpan={2}>
                                <LineChartComponent costs={lineChartCosts} selectedYear={selectedYear} selectedMonth={selectedMonth} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Costs
                costs={filteredCosts} // Передаємо відфільтровані витрати
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onChangeYear={yearChangeHandler}
                onChangeMonth={monthChangeHandler}
            />
            <Footer />
        </>
    );
}

export default Dashboard;
