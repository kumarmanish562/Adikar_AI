import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Resources from './pages/Resources';
import Help from './pages/Help';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans overflow-x-hidden flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
