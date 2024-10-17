import React, { useState } from 'react';
import { signUp } from './firebaseAuth';  // Импорт функции регистрации
import { writeData } from './firebase';  // Импорт функции записи данных
import './SignUpModal.css';  // Файл CSS для стилизации

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess }) => { // Добавлен onSignUpSuccess
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');

    try {
      const user = await signUp(formData.email, formData.password);
      await writeData(user.uid, formData.firstName, formData.lastName, formData.email, formData.nickname, formData.phone);

      // Вызов onSignUpSuccess для показа модального окна успеха
      onSignUpSuccess();

     

      setFormData({
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

      // Закрываем окно через 5 секунд после успешной регистрации
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 5000);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        default:
          
          break;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <div className="buttons">
            <button type="submit">Sign Up</button>
            <button type="button" className="close-btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
