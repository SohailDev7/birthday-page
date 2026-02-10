import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('soft');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const savedTheme = getCookie('prachi_theme');
    console.log('Loaded theme from cookie:', savedTheme); 
    if (savedTheme && (savedTheme === 'soft' || savedTheme === 'luxury')) {
      setCurrentTheme(savedTheme);
    } else {
      
      setCookie('prachi_theme', 'soft', 365);
    }
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const newTheme = currentTheme === 'soft' ? 'luxury' : 'soft';
      console.log('Changing theme to:', newTheme); 
      setCurrentTheme(newTheme);
      
      setCookie('prachi_theme', newTheme, 365);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 200);
  };

  useEffect(() => {
    console.log('Applying theme to body:', currentTheme); 
    document.body.setAttribute('data-theme', currentTheme);

    const themeColor = currentTheme === 'soft' ? '#fdf2f8' : '#9d174d';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      toggleTheme, 
      isTransitioning 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};