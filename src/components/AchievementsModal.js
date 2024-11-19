import React from 'react';
import './AchievementsModal.css';

const achievements = [
    { id: 1, imgSrc: '/noob.png', label: 'Just a Beginner', description: 'Everyone starts somewhere.' },
    { id: 2, imgSrc: '/pro.png', label: 'Pro User', description: 'Welcome to the pro league!' },
    { id: 3, imgSrc: '/master.png', label: 'Usage Master', description: 'You’ve mastered it all!' },
    { id: 4, imgSrc: '/ClosedPig.png', label: 'Food Lover', description: 'Life tastes better with food.' },
    { id: 5, imgSrc: '/ClosedPig.png', label: 'Travel Buddy', description: 'Adventure is your middle name!' },
    { id: 6, imgSrc: '/ClosedPig.png', label: 'Card Traveler', description: 'Your card loves exploring too!' }
  ];
  

const AchievementsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((ach) => (
            <div key={ach.id} className="achievement-card">
              <img src={ach.imgSrc} alt={ach.label} />
              <p>{ach.label}</p>
              <div className="tooltip">{ach.description}</div> {/* Всплывающее описание */}
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AchievementsModal;
