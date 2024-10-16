import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FinanceSection from './components/FinanceSection';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import LearnMoreModal from './components/LearnMoreModal';
import UserGuideModal from './components/UserGuideModal';
import Footer from './components/Footer';
import FinanceOverview from './components/FinanceOverview';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Dashboard from './components/Dashboard';
import ContactModal from './components/ContactModal'; // Contact Modal
import { auth, readData } from './components/firebase'; // Firebase authentication и данные пользователя
import LoadingScreen from './components/LoadingScreen'; // Заглушка при загрузке

// Компонент домашней страницы
const HomePage = ({ onSignUpClick, onLearnMoreClick, onContactClick, onUserGuideClick }) => (
  <>
    <Hero />
    <FinanceSection onSignUpClick={onSignUpClick} onLearnMoreClick={onLearnMoreClick} />
    <FinanceOverview />
    <FeaturesSection />
    <FAQSection />
    <ContactSection />
    <Footer onSignUpClick={onSignUpClick} onContactClick={onContactClick} onUserGuideClick={onUserGuideClick} />
  </>
);

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Состояние для модального окна регистрации
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Состояние для модального окна входа
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false); // Состояние для Learn More
  const [isContactOpen, setIsContactOpen] = useState(false); // Состояние для ContactModal
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false); // Состояние для User Guide
  const [user, setUser] = useState(null); // Данные пользователя
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const navigate = useNavigate();

  // Эффект для проверки аутентификации при загрузке
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userData = await readData(authUser.uid); 
        setUser({ ...authUser, ...userData });
        navigate('/dashboard'); // Перенаправляем залогиненного пользователя на Dashboard
      } else {
        setUser(null);
      }
      setLoading(false); // Отключаем режим загрузки
    });
    return () => unsubscribe();
  }, [navigate]);

  // Функции для открытия модальных окон
  const handleSignUpClick = () => setIsSignUpOpen(true);
  const handleLoginClick = () => setIsLoginOpen(true);
  const handleLearnMoreClick = () => setIsLearnMoreOpen(true);
  const handleContactClick = () => setIsContactOpen(true);
  const handleUserGuideClick = () => setIsUserGuideOpen(true);

  // Функция для закрытия всех модальных окон
  const handleCloseModal = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(false);
    setIsLearnMoreOpen(false);
    setIsContactOpen(false);
    setIsUserGuideOpen(false);
  };

  // Логаут пользователя
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Обработка успешного входа пользователя
  const handleLoginSuccess = (userData) => setUser(userData);

  // Если идет проверка состояния пользователя, показываем экран загрузки
  if (loading) return <LoadingScreen />;

  return (
    <div className="App">
      <Navbar
        user={user}
        onSignUpClick={handleSignUpClick}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onSignUpClick={handleSignUpClick}
              onLearnMoreClick={handleLearnMoreClick}
              onContactClick={handleContactClick}
              onUserGuideClick={handleUserGuideClick}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>

      {/* Модальные окна */}
      <SignUpModal isOpen={isSignUpOpen} onClose={handleCloseModal} />
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={handleCloseModal} />
      <ContactModal isOpen={isContactOpen} onClose={handleCloseModal} />
      <UserGuideModal isOpen={isUserGuideOpen} onClose={handleCloseModal} />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
