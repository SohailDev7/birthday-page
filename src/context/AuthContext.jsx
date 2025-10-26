import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedInitialAuth, setCheckedInitialAuth] = useState(false);

  // Cookie helper functions
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const clearAuthCookies = () => {
    document.cookie = 'prachi_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'prachi_auth_expiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const validateAuth = () => {
    const authCookie = getCookie('prachi_auth');
    const authExpiry = getCookie('prachi_auth_expiry');
    
    if (authCookie && authExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(authExpiry)) {
        return true;
      } else {
        // Token expired, clear cookies
        clearAuthCookies();
      }
    }
    return false;
  };

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const isValid = validateAuth();
      setIsAuthenticated(isValid);
      setCheckedInitialAuth(true);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    
    // Set auth cookie that expires in 30 days
    const expiryTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
    setCookie('prachi_auth', 'true', 30);
    setCookie('prachi_auth_expiry', expiryTime.toString(), 30);
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearAuthCookies();
  };

  const value = {
    isAuthenticated,
    isLoading: isLoading || !checkedInitialAuth,
    checkedInitialAuth,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;