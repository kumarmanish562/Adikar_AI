import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Resources from './pages/Resources';
import Help from './pages/Help';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import VerifyOtp from './pages/VerifyOtp';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const hideChrome = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/verify';

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden flex flex-col">
      {!hideChrome && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/verify" element={<VerifyOtp />} />
        </Routes>
      </div>

      {!hideChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
