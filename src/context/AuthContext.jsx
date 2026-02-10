import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [checkedInitialAuth, setCheckedInitialAuth] = useState(false);

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

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const checkUserSession = (userKey) => {
    
    if (userKey === 'sohail') return false;

    const authCookie = getCookie(`${userKey}_auth`);
    const authExpiry = getCookie(`${userKey}_auth_expiry`);

    if (authCookie && authExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(authExpiry)) {
        return true;
      } else {

        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const initAuth = () => {
      
      const lastUser = getCookie('portal_last_user');

      if (lastUser && checkUserSession(lastUser)) {
        setUser(lastUser);
      }

      setCheckedInitialAuth(true);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userKey) => {
    setUser(userKey);

    if (userKey === 'sohail') return;

    const expiryTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
    setCookie(`${userKey}_auth`, 'true', 30);
    setCookie(`${userKey}_auth_expiry`, expiryTime.toString(), 30);
    setCookie('portal_last_user', userKey, 30);
  };

  const logout = () => {
    if (user) {
      removeCookie(`${user}_auth`);
      removeCookie(`${user}_auth_expiry`);
    }
    removeCookie('portal_last_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || !checkedInitialAuth,
    checkUserSession,
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