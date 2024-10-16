import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onSignUpClick, onLoginClick, onLogoutClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
                <div>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
      </div>
      <ul className="navbar-links">
        <li><Link to="/about"></Link></li>
        <li><Link to="/features"></Link></li>
      </ul>
      <div className="navbar-buttons">
        {user ? (
          <>
            <span className="navbar-nickname">Welcome: {user.nickname || user.email}</span>
            <button className="logout-btn" onClick={onLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <button className="signup-btn" onClick={onSignUpClick}>Sign Up</button>
            <button className="login-btn" onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
