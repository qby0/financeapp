import React from 'react';
import './FinanceOverview.css';

const FinanceOverview = () => {
  return (
    <section className="finance-overview">
      <div className="overview-header">
        <h2>Your Finances, Simplified and Organized</h2>
        <p>
          Our platform empowers you to take control of your finances with ease. From budgeting to
          expense analysis, we provide the tools you need to stay on track.
        </p>
      </div>
      
      

      <div className="overview-details">
        <div className="detail-item">
          <img src="/image1.jpg" alt="Total Sales" />
          <h3>Total View</h3>
          <p>
            The sum of all expenses and receipts displays the overall balance of your finances,
            allowing you to assess the ratio of income to spending.
          </p>
        </div>
        <div className="detail-item">
          <img src="/image3.jpg" alt="Cost Classification" />
          <h3>Cost Classification</h3>
          <p>
            Categorizing your expenses makes it easier to track your spending, helping you control
            your budget and make more informed financial decisions.
          </p>
        </div>
        <div className="detail-item">
          <img src="/image2.jpg" alt="Monthly Expense Schedule" />
          <h3>Monthly Expense Schedule</h3>
          <p>
            A graph of spending by month visualizes your spending patterns, helping you identify
            trends and plan your budget for the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinanceOverview;
