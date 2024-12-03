import React, { useState } from 'react';
import './Navbar.css';
import AchievementsModal from './AchievementsModal'; // Импорт нового модального окна

const Navbar = ({ user, onSignUpClick, onLoginClick, onLogoutClick }) => {
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const handleAchievementsClick = () => {
    setIsAchievementsOpen(true);
  };

  const handleCloseAchievements = () => {
    setIsAchievementsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
      </div>
      <div className="navbar-buttons">
        {user ? (
          <>
            <img src="/avatar.png" alt="lvl" className="avatar-image" style={{ border: "2px solid yellow" }} />
            <img src="/avatar.png" alt="ava" className="avatar-image" />
            <div className="navbar-nickname" onClick={handleAchievementsClick}>
              {user.nickname || user.email}
            </div>
            <button className="logout-btn" onClick={onLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <button className="signup-btn" onClick={onSignUpClick}>Sign Up</button>
            <button className="login-btn" onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
      <AchievementsModal isOpen={isAchievementsOpen} onClose={handleCloseAchievements} />
    </nav>
  );
};

export default Navbar;
