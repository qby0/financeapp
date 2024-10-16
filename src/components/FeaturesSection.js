import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-header">
       
        <h2>Your Finances Made Simple and Effective</h2>
        <p>
          Our system offers a seamless way to manage your expenses and budgets. With intuitive features, 
          you can easily stay on top of your financial goals.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <h3>Add Your Receipts Effortlessly</h3>
          <p>
            Scan your receipts to quickly record your spending. Simply click the 'Scan Check' button on our website 
            and the purchase information will automatically be added to the spreadsheet, making tracking your 
            spending even more convenient and efficient.
          </p>
        </div>

        <div className="feature-item">
          <h3>Add Product Manually</h3>
          <p>
            You can manually enter your income and expenditure data for accurate accounting. Just click on the 'Enter Data' button, 
            and fill in the required fields with the amount, category and description of the transaction. 
            This will allow you to easily track your finances and analyze your spending and receipts at any time.
          </p>
        </div>

        <div className="feature-item">
          <h3>Analyze Your Spending Habits</h3>
          <p>
            The Purchases & Charges list displays all your transactions, including expenses and income, providing 
            convenient tracking of your financial activity. Each entry includes date, category, amount, and description 
            information, allowing you to easily analyze your financial habits. You can quickly find specific transactions 
            and track changes to your budget, helping you make more informed financial decisions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
