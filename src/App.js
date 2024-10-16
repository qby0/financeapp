import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FinanceSection from './components/FinanceSection';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import LearnMoreModal from './components/LearnMoreModal'; // Импортируем модальное окно Learn More
import UserGuideModal from './components/UserGuideModal'; // Импортируем модальное окно User Guide
import Footer from './components/Footer';
import FinanceOverview from './components/FinanceOverview'; 
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Dashboard from './components/Dashboard';
import ContactModal from './components/ContactModal'; // Импортируем ContactModal
import { auth, readData } from './components/firebase'; // Firebase authentication и readData
import LoadingScreen from './components/LoadingScreen'; // Заглушка при загрузке

const HomePage = ({ onSignUpClick, onLearnMoreClick, onContactClick, onUserGuideClick }) => (
  <>
    <Hero />
    <FinanceSection onSignUpClick={onSignUpClick} onLearnMoreClick={onLearnMoreClick} />
    <FinanceOverview />
    <FeaturesSection />
    <FAQSection />
    <ContactSection /> 
    <Footer onSignUpClick={onSignUpClick} onContactClick={onContactClick} onUserGuideClick={onUserGuideClick} /> {/* Передаем функцию для открытия модальных окон */}
  </>
);

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false); // Состояние для Learn More
  const [isContactOpen, setIsContactOpen] = useState(false); // Состояние для ContactModal
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false); // Состояние для User Guide
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка состояния аутентификации при загрузке приложения
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Получаем данные пользователя из Firebase
        const userData = await readData(authUser.uid); 
        setUser({ ...authUser, ...userData }); // Объединяем данные Firebase auth и данные пользователя
        navigate('/dashboard'); // Перенаправляем на Dashboard, если пользователь залогинен
      } else {
        setUser(null); // Если пользователь не залогинен
      }
      setLoading(false); // Завершаем загрузку
    });

    return () => unsubscribe(); // Отписываемся от listener при размонтировании компонента
  }, [navigate]);

  const handleSignUpClick = () => {
    setIsSignUpOpen(true); // Открыть модальное окно регистрации
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true); // Открыть модальное окно входа
  };

  const handleLearnMoreClick = () => {
    setIsLearnMoreOpen(true); // Открыть модальное окно Learn More
  };

  const handleContactClick = () => {
    setIsContactOpen(true); // Открыть модальное окно контакта
  };

  const handleUserGuideClick = () => {
    setIsUserGuideOpen(true); // Открыть модальное окно User Guide
  };

  const handleCloseModal = () => {
    setIsSignUpOpen(false); // Закрыть модальное окно регистрации
    setIsLoginOpen(false); // Закрыть модальное окно входа
    setIsLearnMoreOpen(false); // Закрыть модальное окно Learn More
    setIsContactOpen(false); // Закрыть модальное окно контакта
    setIsUserGuideOpen(false); // Закрыть модальное окно User Guide
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Выход из Firebase
      setUser(null); // Очищаем данные пользователя
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Устанавливаем данные пользователя после успешного входа
  };

  // Если идет проверка состояния пользователя, отображаем заглушку
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onSignUpClick={handleSignUpClick} 
        onLoginClick={handleLoginClick} 
        onLogoutClick={handleLogout} 
      />
      <Routes>
        <Route path="/" element={<HomePage onSignUpClick={handleSignUpClick} onLearnMoreClick={handleLearnMoreClick} onContactClick={handleContactClick} onUserGuideClick={handleUserGuideClick} />} /> {/* Передаем функцию открытия окна Learn More и Contact */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
      <SignUpModal isOpen={isSignUpOpen} onClose={handleCloseModal} />
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={handleCloseModal} /> {/* Добавляем модальное окно Learn More */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseModal} /> {/* Добавляем модальное окно контакта */}
      <UserGuideModal isOpen={isUserGuideOpen} onClose={handleCloseModal} /> {/* Добавляем модальное окно User Guide */}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
