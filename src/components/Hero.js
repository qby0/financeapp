import React from 'react';
import './Hero.css'; // Подключаем стили для компонента

const Hero = () => {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Master Your Budget</h1>
        <p>Take control of your finances with our intuitive expense tracking and budgeting solution.</p>
      </div>
    </section>
  );
}

export default Hero;
