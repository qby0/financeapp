import React, { useState } from 'react';
import { logIn } from './firebaseAuth';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate для редиректа
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Используем useNavigate для редиректа

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
  
    setError('');
  
    try {
      const userData = await logIn(formData.email, formData.password);
      console.log('User logged in successfully', userData);
      onLoginSuccess(userData);
      setFormData({ email: '', password: '' }); // Сброс полей формы
      onClose();
      
      // Перенаправляем на страницу Dashboard
      navigate('/dashboard');
    } catch (error) {
      // Обработка ошибок
      switch (error.code) {
        case 'auth/invalid-email':
          setError('The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          setError('There is no user with this email. Please check the email or sign up.');
          break;
        case 'auth/wrong-password':
          setError('The password is incorrect. Please try again.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credentials. Please try again.');
          break;
        default:
          setError('Login failed: ' + error.message);
          break;
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          {/* Отображение ошибки, если есть */}
          {error && <p className="error">{error}</p>}
          <div className="buttons">
            <button type="submit">Login</button>
            <button type="button" className="close-btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
