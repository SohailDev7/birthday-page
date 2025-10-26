import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import FloatingElements from './components/FloatingElements';
import NowPlayingOverlay from './components/NowPlayingOverlay';
import Prachi_Home from './pages/Prachi_Home';
import Prachi_PortalLogin from './pages/Prachi_PortalLogin';
import Prachi_About from './pages/Prachi_About';
import Prachi_Tictactoe from './pages/Prachi_Tictactoe';
import Prachi_Diary from './pages/Prachi_Diary';
import Prachi_Poem from './pages/Prachi_Poem';
import Prachi_Chor from './pages/Prachi_Chor.jsx';
import Prachi_PinkParadise from './pages/Prachi_PinkParadise';
import Prachi_LieTruth from './pages/Prachi_LieTruth';
import Prachi_Reviews from './pages/Prachi_Reviews';
import Prachi_List from './pages/Prachi_List';
import './App.css';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

const SimpleLayout = ({ children }) => (
  <div className="app">
    <FloatingElements />
    <ScrollProgressBar />
    <main>{children}</main>
    <NowPlayingOverlay />
  </div>
);

const NavLayout = ({ children }) => (
  <div className="app">
    <FloatingElements />
    <ScrollProgressBar />
    <Navigation />
    <main>{children}</main>
    <NowPlayingOverlay />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner or nothing while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-color)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to="/prachi/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner or nothing while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-color)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/prachi/home" replace />;
  }

  // If not authenticated, render the public component
  return children;
};

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <SimpleLayout>
              <Home />
            </SimpleLayout>
          } />

          <Route path="/prachi/login" element={
            <PublicRoute>
              <SimpleLayout>
                <Prachi_PortalLogin />
              </SimpleLayout>
            </PublicRoute>
          } />

          {/* Protected routes */}
          <Route path="/prachi/home" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Home />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/about" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_About />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/tictactoe" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Tictactoe />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/diary" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Diary />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/poems" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Poem />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/chor" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Chor />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/games" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_PinkParadise />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/lietruth" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_LieTruth />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/reviews" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_Reviews />
              </NavLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/watchlist" element={
            <ProtectedRoute>
              <NavLayout>
                <Prachi_List />
              </NavLayout>
            </ProtectedRoute>
          } />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;