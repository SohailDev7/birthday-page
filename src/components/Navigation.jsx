import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Palette, Sparkles, LogOut } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { currentTheme, toggleTheme, isTransitioning } = useTheme();
  const { logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '/prachi/home', label: 'Home' },
    { path: '/prachi/games', label: 'Games' },
    { path: '/prachi/about', label: 'About' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isPinkTheme = currentTheme === 'soft';

  return (
    <>
      {/* Theme Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none bg-pink-500/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-[1030]
          transition-all duration-500
          ${isScrolled ? 'py-3' : 'py-4'}
        `}
        style={{
          background: isPinkTheme
            ? 'rgba(253, 242, 248, 0.9)'
            : 'rgba(157, 23, 77, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: isPinkTheme
            ? '1px solid rgba(236, 72, 153, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isScrolled
            ? '0 10px 30px rgba(236, 72, 153, 0.15)'
            : '0 4px 15px rgba(236, 72, 153, 0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/prachi/home"
              className="flex items-center gap-2 group"
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles
                  className={isPinkTheme ? 'text-pink-500' : 'text-pink-200'}
                  size={24}
                />
              </motion.div>
              <span
                className={`
                  text-xl md:text-2xl font-bold luxury-font
                  ${isPinkTheme ? 'text-pink-600' : 'text-white'}
                  transition-colors duration-300
                `}
              >
                Prachi's Portal
              </span>
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative"
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.div
                      className={`
                        px-4 md:px-6 py-2 rounded-full
                        font-medium elegant-font
                        transition-all duration-300
                        ${isActive
                          ? isPinkTheme
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                            : 'bg-white/20 text-white shadow-lg shadow-white/10'
                          : isPinkTheme
                            ? 'text-pink-700 hover:bg-pink-100'
                            : 'text-pink-100 hover:bg-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`
                  p-2.5 rounded-full
                  transition-all duration-300
                  ${isPinkTheme
                    ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                    : 'bg-white/10 text-pink-100 hover:bg-white/20'
                  }
                `}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Palette size={20} />
              </motion.button>

              {/* Logout */}
              {isAuthenticated && (
                <motion.button
                  onClick={logout}
                  className={`
                    p-2.5 rounded-full
                    transition-all duration-300
                    ${isPinkTheme
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-white/10 text-red-100 hover:bg-white/20'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogOut size={20} />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navigation;