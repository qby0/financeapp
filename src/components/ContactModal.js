import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Импортируем новую версию EmailJS
import './ContactModal.css'; // Стили для модального окна

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null); // Для отображения статуса отправки

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Настроенные параметры для EmailJS
    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then(
        (response) => {
          setFormStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setFormStatus('Failed to send message.');
        }
      );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <div className="buttons">
            <button type="submit">Send Message</button>
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </form>
        {formStatus && <p>{formStatus}</p>}
      </div>
    </div>
  );
};

export default ContactModal;
