import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ onSignUpClick, onContactClick, onUserGuideClick }) => {
  const [isImageBackground, setIsImageBackground] = useState(false); // Состояние для переключения фона

  // Функция для переключения фона
  const toggleBackground = () => {
    const newBackgroundState = !isImageBackground;
    setIsImageBackground(newBackgroundState);
    updateBackground(newBackgroundState);

    // Сохраняем состояние в localStorage
    localStorage.setItem('isImageBackground', JSON.stringify(newBackgroundState));
  };

  // Функция для применения фона
  const updateBackground = (useImage) => {
    if (useImage) {
      document.body.style.background = "url('/pigpig.png') no-repeat center center fixed";
      document.body.style.backgroundSize = 'cover'; // Растягиваем изображение на весь экран
    } else {
      document.body.style.background = '#111010'; // Устанавливаем цвет фона
    }
  };

  // Используем эффект, чтобы применить сохранённое состояние при загрузке
  useEffect(() => {
    const savedBackgroundState = JSON.parse(localStorage.getItem('isImageBackground'));
    if (savedBackgroundState !== null) {
      setIsImageBackground(savedBackgroundState);
      updateBackground(savedBackgroundState);
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Логотип */}
        <div className="footer-logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>

        {/* Навигационные ссылки */}
        <nav className="footer-links">
          <a href="#" onClick={onSignUpClick}>Get Started</a>
          <a href="#" onClick={onContactClick}>Contact Us</a>
          <a href="#" onClick={onUserGuideClick}>User Guide</a>
          <a href="#" onClick={toggleBackground}>{isImageBackground ? 'Dark theme' : 'Light theme'}</a>
        </nav>
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
