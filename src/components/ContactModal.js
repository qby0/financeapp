import React, { useState, useEffect } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState(null); // Status of the form submission

  // Clear form fields when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setMessage('');
      setFormStatus(null); // Reset status when modal is opened
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basin form endpoint
    const formEndpoint = 'https://usebasin.com/f/41da43d0729f'; // Используйте ваш уникальный Basin endpoint

    // Отправка данных на Basin через fetch
    fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus('Message sent successfully!');
          setName('');  // Clear name input
          setEmail(''); // Clear email input
          setMessage(''); // Clear message input
        } else {
          setFormStatus('Failed to send message.');
        }
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setFormStatus('Failed to send message.');
      });
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className="buttons">
            <button type="submit">Send Message</button>
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </form>
        {formStatus && <p>{formStatus}</p>} {/* Display success/error message */}
      </div>
    </div>
  );
};

export default ContactModal;
