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
import ForgotPassword from './pages/ForgotPassword';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import AskQuestion from './pages/Dashboard/AskQuestion';
import ScanDocument from './pages/Dashboard/ScanDocument';
import VoiceAssistant from './pages/Dashboard/VoiceAssistant';
import MyQueries from './pages/Dashboard/MyQueries';
import ResourcesPage from './pages/Dashboard/ResourcesPage';
import HelpCenter from './pages/Dashboard/HelpCenter';
import Profile from './pages/Dashboard/Profile';
import Settings from './pages/Dashboard/Settings';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const hideChrome = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/verify' || location.pathname === '/forgot-password';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden flex flex-col">
      {!hideChrome && !isDashboard && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ask-question" element={<AskQuestion />} />
            <Route path="scan-document" element={<ScanDocument />} />
            <Route path="voice-assistant" element={<VoiceAssistant />} />
            <Route path="my-queries" element={<MyQueries />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>

      {!hideChrome && !isDashboard && <Footer />}
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
