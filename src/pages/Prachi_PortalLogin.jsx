import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QRScanner from '../components/QRScanner';
import '../styles/PortalLogin.css';

const Prachi_PortalLogin = () => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const correctPassword = "pr1ngles";
  const hints = [
    "Hmm... what could the password be? 🤔",
    "Think like Prachi would think... 💭",
    "Hint: It's something tasty! 🍬",
    "Hint: Maybe something you'd find in a snack aisle? 🛒",
    "Oh, not that? Try thinking of a crunchy favorite! 😋",
    "Hint: I'm craving something with a 'P'... 🅿️",
    "LAST HINT: It's not food, but a food brand! 🏷️"
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#ff9eb5", "#ff85a2", "#ff6b8b", "#ff477e"]
      },
      shape: {
        type: ["circle", "heart"],
        options: {
          heart: {
            fill: true,
            particles: {
              size: {
                value: 10
              }
            }
          }
        }
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 8,
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      }
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      grantAccess();
    } else {
      setAttempts(prev => prev + 1);
      setHint(hints[Math.min(attempts, hints.length - 1)]);
      setPassword('');
    }
  };

  const grantAccess = () => {
    setIsAuthenticated(true);
    // Call the auth context login function to set cookies
    login();
    
    setTimeout(() => {
      navigate('/portal/prachi/home'); // Redirect to dashboard after successful login
    }, 2000);
  };

  const handleQRSuccess = () => {
    grantAccess();
  };

  const createHeart = (x, y) => {
    const heart = document.createElement('div');
    heart.innerHTML = `
      <svg viewBox="0 0 24 24" fill="#ff6b8b" width="30" height="30">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    heart.style.position = 'fixed';
    heart.style.left = `${x - 15}px`;
    heart.style.top = `${y - 15}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transform = 'scale(0)';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.style.transform = 'scale(1) translateY(-50px)';
      heart.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  };

  useEffect(() => {
    const handleClick = (e) => {
      createHeart(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="portal-login-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles-background"
      />
      
      <AnimatePresence>
        {isAuthenticated && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="success-overlay"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1 }}
              className="success-icon"
            >
              ✅
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Access Granted! 🎉
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-card"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          className="portal-icon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>

        <h1 className="portal-title">Prachi's Portal</h1>
        <p className="portal-subtitle">Enter the secret password to unlock magical content ✨</p>

        <form onSubmit={handlePasswordSubmit} className="password-form">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret password..."
              className="password-input"
            />
          </motion.div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`submit-button ${password === correctPassword ? 'success' : ''}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Unlock Portal
          </motion.button>
        </form>

        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hint-display"
          >
            {hint}
          </motion.div>
        )}

        <div className="qr-section">
          <motion.button
            onClick={() => setShowQRScanner(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="qr-button"
          >
            📱 Scan QR Code
          </motion.button>
        </div>

        <AnimatePresence>
          {showQRScanner && (
            <QRScanner
              onClose={() => setShowQRScanner(false)}
              onSuccess={handleQRSuccess}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="floating-hearts">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Prachi_PortalLogin;