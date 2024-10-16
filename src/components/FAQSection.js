import React, { useState } from 'react'; // Импортируем useState для состояния
import './FAQSection.css';
import ContactModal from './ContactModal'; // Импортируем модальное окно контакта

const FAQSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Состояние для модального окна

  const handleContactClick = () => {
    setIsContactModalOpen(true); // Открываем модальное окно при клике
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false); // Закрываем модальное окно
  };

  return (
    <section className="faq-section">
      <div className="faq-left">
        <h1>FAQs</h1>
        <p>Find answers to your most common questions about our expense tracking and budgeting system.</p>
        <button className="contact-btn" onClick={handleContactClick}>Contact</button> {/* Открываем модальное окно */}
      </div>

      <div className="faq-right">
        <div className="faq-item">
          <h3>How does it work?</h3>
          <p>
            Our system allows you to manually input or scan receipts for your income and expenses. You can set budgets for different categories 
            and analyze your spending habits through detailed statistics and visual charts. Real-time alerts will notify you when you exceed 
            your budget.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is it user-friendly?</h3>
          <p>
            Absolutely! Our interface is designed to be intuitive and easy to navigate. Whether you are adding expenses or setting budgets, the 
            process is streamlined for your convenience. You’ll spend less time managing finances and more time enjoying life.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I track multiple budgets?</h3>
          <p>
            Yes, our system supports tracking multiple budgets for individuals, families, or businesses. You can easily switch between budgets 
            and monitor each one's performance. This flexibility helps you manage your finances more effectively.
          </p>
        </div>

        <div className="faq-item">
          <h3>What if I need help?</h3>
          <p>
            If you have any questions or need assistance, our support team is here to help. You can reach out through our contact page for prompt 
            responses. We’re committed to ensuring you have a seamless experience.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is my data secure?</h3>
          <p>
            Yes, we prioritize your data security. Our system employs advanced encryption and security measures to protect your information. 
            You can use our platform with confidence knowing your data is safe.
          </p>
        </div>
      </div>

      {/* Модальное окно контакта */}
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default FAQSection;
