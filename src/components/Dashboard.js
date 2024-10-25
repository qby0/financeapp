import Costs from "./Costs";
import NewCost from "./NewCost/NewCost";
import QrScanner from "./QrScanner";
import React, { useState } from "react";
import Footer from './Footer';
import './Dashboard.css';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';

const INITIAL_COSTS = [
  {
    date: new Date(2020, 6, 25),
    description: 'iPhone',
    cost: 999
  },
];

function App() {
  const [showScanner, setShowScanner] = useState(false);
  const [costs, setCosts] = useState(INITIAL_COSTS);

  const addCostHandler = (cost) => {
    setCosts(prevCosts => {
      return [cost, ...prevCosts];
    });
  };

  return (
    <>
      {/* Видео на фоне */}
      <video className="video-background" autoPlay loop muted>
        <source src="/1v_1.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <h1>Expense and budget tracking</h1>

      <div className="dashboard-container">
        <div className="dashboard-difference">
          <strong>Difference</strong>
          <br />
          <span>+1000€</span>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-income">
            <span>Income</span>
            <span>3000€</span>
          </div>
          <div className="dashboard-spendings">
            <span>Expenses</span>
            <span>2000€</span>
          </div>
        </div>
      </div>

      <div className="dashboard">
        <button onClick={() => setShowScanner(true)}>Use QR</button>

        {showScanner && (
          <QrScanner onCancel={() => setShowScanner(false)} />
        )}
      </div>

      <NewCost onAddCost={addCostHandler} />

      <br />
      <div className="table-container">
        <table className="chart-table">
          <tbody>
            <tr>
              <td className="chart-cell" colSpan={2}>
                <PieChartComponent />
              </td>
            </tr>
            <tr>
              <td className="chart-cell" colSpan={2}>
                <LineChartComponent />
              </td>
            </tr>
            <tr>
              <td className="chart-cell" colSpan={2}>
                <BarChartComponent />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Costs costs={costs} />
      <Footer />
    </>
  );
}

export default App;
