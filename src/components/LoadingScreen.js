import React from 'react';
import './LoadingScreen.css'; // Подключаем стили для заглушки

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div> {/* Анимация загрузки */}
      <h2>Loading, please wait...</h2> {/* Сообщение */}
    </div>
  );
};

export default LoadingScreen;
