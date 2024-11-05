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
import ContactModal from './components/ContactModal';
import AutoCloseModal from './components/AutoCloseModal'; // Добавляем AutoCloseModal для невидимого уведомления
import { auth, readData } from './components/firebase';
import LoadingScreen from './components/LoadingScreen';

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
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const [isAutoCloseModalOpen, setIsAutoCloseModalOpen] = useState(false); // Состояние для AutoCloseModal
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoCloseMessage, setAutoCloseMessage] = useState(''); // Сообщение для AutoCloseModal
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        if (!authUser.emailVerified) {
          setAutoCloseMessage('Please verify your email before accessing the PennyWise project');
          setIsAutoCloseModalOpen(true); // Показываем сообщение на 4 секунды
          await auth.signOut();
          setUser(null);
          navigate('/');
          return;
        }
        const userData = await readData(authUser.uid);
        setUser({ ...authUser, ...userData });
        navigate('/dashboard');
      } else {
        setUser(null);
        navigate('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignUpClick = () => setIsSignUpOpen(true);
  const handleLoginClick = () => setIsLoginOpen(true);
  const handleLearnMoreClick = () => setIsLearnMoreOpen(true);
  const handleContactClick = () => setIsContactOpen(true);
  const handleUserGuideClick = () => setIsUserGuideOpen(true); // Убедись, что эта функция используется

  const handleCloseModal = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(false);
    setIsLearnMoreOpen(false);
    setIsContactOpen(false);
    setIsUserGuideOpen(false);
    setIsAutoCloseModalOpen(false); // Закрываем AutoCloseModal
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoginSuccess = (userData) => setUser(userData);

  if (loading) return <LoadingScreen />;

  return (
    <><video className="video-background" autoPlay loop muted>
      <source src="/BLACK1.mp4" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
    <div className="App">
        <Navbar
          user={user}
          onSignUpClick={handleSignUpClick}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<HomePage
              onSignUpClick={handleSignUpClick}
              onLearnMoreClick={handleLearnMoreClick}
              onContactClick={handleContactClick}
              onUserGuideClick={handleUserGuideClick} // Исправлено использование этой функции
            />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>

        <SignUpModal isOpen={isSignUpOpen} onClose={handleCloseModal} />
        <LoginModal isOpen={isLoginOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
        <LearnMoreModal isOpen={isLearnMoreOpen} onClose={handleCloseModal} />
        <ContactModal isOpen={isContactOpen} onClose={handleCloseModal} />
        <UserGuideModal isOpen={isUserGuideOpen} onClose={handleCloseModal} />

        <AutoCloseModal
          message={autoCloseMessage}
          isOpen={isAutoCloseModalOpen}
          onClose={handleCloseModal} /> {/* Добавляем AutoCloseModal для временного сообщения */}
      </div></>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
