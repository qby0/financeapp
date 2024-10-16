import React from 'react';
import './Footer.css';

const Footer = ({ onSignUpClick, onContactClick, onUserGuideClick }) => { // Передаем функцию для открытия модального окна User Guide
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Логотип */}
        <div className="footer-logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>

        {/* Навигационные ссылки */}
        <nav className="footer-links">
          <a href="#" onClick={onSignUpClick}>Get Started</a> {/* Открываем модальное окно регистрации */}
          <a href="#" onClick={onContactClick}>Contact Us</a> {/* Открываем модальное окно контакта */}
          <a href="#" onClick={onUserGuideClick}>User Guide</a> {/* Открываем модальное окно User Guide */}
        </nav>

        {/* Социальные иконки */}
      </div>

      <div className="footer-bottom">
        <p>© 2024 Powered by PennyWise team.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/tuke.sk/"><img src="/facebook.png" alt="Facebook" /></a>
          <a href="https://www.instagram.com/tuke.sk/"><img src="/instagram.png" alt="Instagram" /></a>
          <a href="https://x.com/i/flow/login?redirect_after_login=%2Ftuke_sk%2F"><img src="/twitter.png" alt="Twitter" /></a>
          <a href="https://www.linkedin.com/school/tuke/"><img src="/linkedin.png" alt="LinkedIn" /></a>
          <a href="https://www.youtube.com/c/TechnicalUniversityofKosice"><img src="/youtube.png" alt="YouTube" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
