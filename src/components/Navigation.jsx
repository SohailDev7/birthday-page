import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Palette, Sparkles, LogOut } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { currentTheme, toggleTheme, isTransitioning } = useTheme();
  const { logout, isAuthenticated } = useAuth();
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    // Update CSS variable with navbar height
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
      const height = navbar.offsetHeight;
      setNavbarHeight(height);
      document.documentElement.style.setProperty('--navbar-height', `${height}px`);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="theme-transition-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed-navbar-wrapper"
      >
        <Navbar expand="lg" className="custom-navbar" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/prachi/home" className="navbar-brand-custom luxury-font">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="me-2" size={20} />
              </motion.span>
              Prachi's Portal
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Nav.Link 
                  as={Link} 
                  to="/prachi/home" 
                  className={location.pathname === '/prachi/home' ? 'nav-link-active' : ''}
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/prachi/games" 
                  className={location.pathname === '/prachi/games' ? 'nav-link-active' : ''}
                >
                  Games
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/prachi/about"
                  className={location.pathname === '/prachi/about' ? 'nav-link-active' : ''}
                >
                  About
                </Nav.Link>
                
                {/* Theme Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Nav.Link 
                    onClick={toggleTheme}
                    className="theme-toggle"
                    style={{ cursor: 'pointer' }}
                  >
                    <motion.div
                      animate={{ rotate: currentTheme === 'luxury' ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Palette size={20} />
                    </motion.div>
                  </Nav.Link>
                </motion.div>

                {/* Logout Button */}
                {isAuthenticated && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Nav.Link 
                      onClick={logout}
                      className="logout-toggle"
                      style={{ cursor: 'pointer' }}
                    >
                      <LogOut size={20} />
                    </Nav.Link>
                  </motion.div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>
    </>
  );
};

export default Navigation;