import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('landing-theme');
    return savedTheme || 'color';
  });

  useEffect(() => {
    localStorage.setItem('landing-theme', theme);
    
    if (theme === 'white') {
      document.documentElement.classList.add('white-theme');
    } else {
      document.documentElement.classList.remove('white-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'color' ? 'white' : 'color');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
