import React from 'react';
import './UserGuideModal.css'; // Подключите стили для модального окна

const UserGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Если окно не открыто, ничего не отображаем

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User Guide</h2>
        <p>
          Welcome to the PennyWise user guide! Here you will find detailed instructions on how to navigate
          and utilize our platform to its fullest potential.
        </p>
        <ul>
          <li><strong>Tracking Expenses:</strong> Learn how to scan receipts, input transactions manually, and categorize your expenses.</li>
          <li><strong>Budgeting:</strong> Set up budgets for different categories and track your progress with our intuitive tools.</li>
          <li><strong>Analytics:</strong> Analyze your spending habits through visual charts and real-time insights.</li>
          <li><strong>Notifications:</strong> Set alerts to notify you when you exceed your budget limits or reach your savings goals.</li>
        </ul>
        <p>
          For more detailed information and troubleshooting, feel free to contact our support team.
        </p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default UserGuideModal;
