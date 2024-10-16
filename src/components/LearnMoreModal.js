import React from 'react';
import './LearnMoreModal.css'; // Ваш файл стилей

const LearnMoreModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Discover How PennyWise Can Help You</h2>
        <p>
          PennyWise is designed to help individuals and businesses manage their finances with ease and efficiency. 
          Here’s how PennyWise can benefit you:
        </p>
        <ul>
          <li><strong>Track Your Expenses Effortlessly:</strong> With our easy-to-use receipt scanning feature, you can quickly record your expenses in real-time. Just snap a picture of your receipt, and we’ll do the rest!</li>
          <li><strong>Create and Stick to Budgets:</strong> Our budget-setting tools allow you to plan your finances with clear goals in mind. Receive real-time alerts when you exceed your budget limits.</li>
          <li><strong>Analyze Your Spending Habits:</strong> Our platform offers detailed analytics, showing you where your money is going. With personalized reports, you can identify spending patterns and make informed decisions to improve your financial health.</li>
          <li><strong>Organize Your Finances in One Place:</strong> Keep all your financial data — from multiple bank accounts to credit cards — in one dashboard for easy management.</li>
          <li><strong>Set Goals and Save More:</strong> With our goal-setting feature, you can define personal or business savings targets and track your progress, ensuring you reach your financial milestones.</li>
        </ul>
        <p>
          Whether you're an individual looking to organize personal finances, or a business aiming to optimize your budgeting, PennyWise has the tools to make financial management simple and effective. Take control of your finances today and start building a brighter financial future!
        </p>
        <div className="buttons">
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
