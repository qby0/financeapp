import React from 'react';
import './FinanceSection.css';

const FinanceSection = ({ onSignUpClick, onLearnMoreClick }) => {
  return (
    <section className="finance-section">
      <div className="finance-content">
        <h2>Take Control of Your Finances Today</h2>
        <p>
          Our online expense tracking and budgeting system empowers you to manage your finances
          effortlessly. With features like receipt scanning, budget setting, and real-time alerts,
          you can stay on top of your spending and achieve your financial goals.
        </p>
        <div className="finance-buttons">
          <button className="signup-btn" onClick={onSignUpClick}>Sign Up</button> {/* Открываем модальное окно Sign Up */}
          <button className="learn-more-btn" onClick={onLearnMoreClick}>Learn More</button> {/* Открываем модальное окно Learn More */}
        </div>
      </div>
      <div className="finance-image">
        <img src="/main1.png" alt="Finances" />
      </div>
    </section>
  );
};

export default FinanceSection;
