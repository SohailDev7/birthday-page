import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import FloatingElements from './components/FloatingElements';
import NowPlayingOverlay from './components/NowPlayingOverlay';
import Navigation from './components/Navigation';
import Prachi_Home from './pages/prachi/Prachi_Home.jsx';

import Prachi_About from './pages/prachi/Prachi_About.jsx';
import Prachi_Tictactoe from './pages/prachi/Prachi_Tictactoe.jsx';
import Prachi_Diary from './pages/prachi/Prachi_Diary.jsx';
import Prachi_Poem from './pages/prachi/Prachi_Poem.jsx';
import Prachi_Chor from './pages/prachi/Prachi_Chor.jsx';
import Prachi_PinkParadise from './pages/prachi/Prachi_PinkParadise.jsx';
import Prachi_LieTruth from './pages/prachi/Prachi_LieTruth.jsx';
import Prachi_Reviews from './pages/prachi/Prachi_Reviews.jsx';
import Prachi_List from './pages/prachi/Prachi_List.jsx';
import Yuzence_Home from './pages/Yuzence_Home';
import MemoriesPage from './pages/MemoriesPage';
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

// Page transition wrapper with 3D effects
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateY: 90,
        scale: 0.8,
        z: -100
      }}
      animate={{
        opacity: 1,
        rotateY: 0,
        scale: 1,
        z: 0
      }}
      exit={{
        opacity: 0,
        rotateY: -90,
        scale: 0.8,
        z: -100
      }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transformOrigin: 'center center'
      }}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for animated routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Routes will be defined in the parent */}
      </Routes>
    </AnimatePresence>
  );
};

const SimpleLayout = ({ children }) => (
  <div className="app">
    <FloatingElements />
    <ScrollProgressBar />
    <main>{children}</main>
  </div>
);

const NavLayout = ({ children }) => (
  <div className="app">
    <FloatingElements />
    <ScrollProgressBar />
    <Navigation />
    <main>{children}</main>
  </div>
);

// Prachi Layout - includes NowPlayingOverlay only for Prachi pages
const PrachiLayout = ({ children }) => (
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
    return <Navigate to="/" state={{ from: location }} replace />;
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

          <Route path="/" element={
            <SimpleLayout>
              <Home />
            </SimpleLayout>
          } />

          {/* Protected routes */}
          <Route path="/prachi/home" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Home />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/about" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_About />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/tictactoe" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Tictactoe />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/diary" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Diary />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/poems" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Poem />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/chor" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Chor />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/games" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_PinkParadise />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/lietruth" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_LieTruth />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/reviews" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_Reviews />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          <Route path="/prachi/watchlist" element={
            <ProtectedRoute>
              <PrachiLayout>
                <Prachi_List />
              </PrachiLayout>
            </ProtectedRoute>
          } />

          {/* Yuzence Routes */}
          <Route path="/yuzence/home" element={
            <ProtectedRoute>
              <Yuzence_Home />
            </ProtectedRoute>
          } />

          <Route path="/yuzence/memories" element={
            <ProtectedRoute>
              <MemoriesPage />
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