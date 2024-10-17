import React, { useEffect } from 'react';
import './AutoCloseModal.css'; // Стиль для модального окна

const AutoCloseModal = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Закрываем модальное окно через 4 секунды
      }, 4000);

      return () => clearTimeout(timer); // Чистим таймер при размонтировании компонента
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Если окно не открыто, ничего не отображаем

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AutoCloseModal;
