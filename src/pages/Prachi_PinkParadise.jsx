// components/PinkParadise.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Home, GamepadIcon, User, Lock, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PinkSVGBackground from '../components/PinkSVGBackground';
import './css/Prachi_PinkParadise.css';

const Prachi_PinkParadise = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Two Truths and One Lie",
      description: "Classic game of 2 truths and one lie",
      icon: "🎭",
      available: true,
      link: "/prachi/lietruth",
      animation: "spin"
    },
    {
      id: 2,
      title: "Secret Game",
      description: "Something you really need!!",
      icon: "🔒",
      available: false,
      reason: "Not available rn (Photos pathaudai pathayenau)",
      animation: "heartBeat"
    },
  ];

  // Properly distributed floating elements with exact positions
  const floatingElements = [
    {
      icon: Heart,
      position: { top: '5%', left: '5%' },
      animation: "heartBeat",
      delay: 0,
      size: 56
    },
    {
      icon: Star,
      position: { top: '8%', right: '8%' },
      animation: "float",
      delay: 1,
      size: 48
    },
    {
      icon: Sparkles,
      position: { bottom: '15%', left: '10%' },
      animation: "bounce",
      delay: 2,
      size: 52
    },
    {
      icon: Star,
      position: { bottom: '12%', right: '12%' },
      animation: "spin",
      delay: 3,
      size: 44
    },
    {
      icon: Heart,
      position: { top: '35%', left: '3%' },
      animation: "float",
      delay: 0.5,
      size: 40
    },
    {
      icon: Sparkles,
      position: { top: '25%', right: '5%' },
      animation: "bounce",
      delay: 1.5,
      size: 36
    },
    {
      icon: Star,
      position: { top: '60%', left: '7%' },
      animation: "spin",
      delay: 2.5,
      size: 42
    },
    {
      icon: Heart,
      position: { bottom: '25%', right: '4%' },
      animation: "heartBeat",
      delay: 3.5,
      size: 38
    }
  ];

  // Properly distributed sparkle positions
  const sparklePositions = [
    { top: '20%', left: '15%' },
    { top: '15%', right: '20%' },
    { bottom: '30%', right: '25%' },
    { bottom: '20%', left: '18%' },
    { top: '45%', left: '8%' },
    { bottom: '40%', right: '8%' },
    { top: '70%', right: '15%' },
    { bottom: '10%', left: '25%' },
    { top: '85%', left: '12%' },
    { top: '55%', right: '22%' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleGameClick = (game) => {
    if (game.available && game.link) {
      navigate(game.link);
    }
  };

  return (
    <div className="pink-paradise-page">
      {/* Ultra Kawaii Pink SVG Background with 120 FPS Animations */}
      <PinkSVGBackground />


      {/* Main Content with proper spacing */}
      <motion.div
        className="paradise-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with proper spacing */}
        <motion.div
          className="paradise-header"
          variants={itemVariants}
        >
          <motion.h1
            className="paradise-title"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Pink Paradise🎀
          </motion.h1>
          <motion.p
            className="paradise-subtitle"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Choose your adventure!
          </motion.p>
          <motion.div
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        {/* Games Grid */}
        <motion.div
          className="games-grid"
          variants={containerVariants}
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              onClick={() => handleGameClick(game)}
            >
              {/* Game Icon */}
              <motion.div
                className="game-icon"
                animate={
                  game.animation === "float" ? {
                    y: [0, -20, 0]
                  } : game.animation === "bounce" ? {
                    y: [0, -25, 0]
                  } : game.animation === "spin" ? {
                    rotate: [0, 360]
                  } : game.animation === "wiggle" ? {
                    rotate: [-5, 5, -5]
                  } : game.animation === "heartBeat" ? {
                    scale: [1, 1.2, 1, 1.3, 1]
                  } : {
                    scale: [1, 1.15, 1]
                  }
                }
                transition={{
                  duration: game.animation === "spin" ? 8 : 3.5,
                  repeat: Infinity,
                  ease: game.animation === "spin" ? "linear" : "easeInOut"
                }}
              >
                <span className="icon-emoji">{game.icon}</span>
              </motion.div>

              {/* Game Content */}
              <div className="game-content">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-description">{game.description}</p>
              </div>

              {/* Action Button */}
              <div className="game-action">
                {game.available ? (
                  <Nav.Link
                    as="button"
                    className="play-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(game.link);
                    }}
                  >
                    <Play size={16} />
                    Play Now
                  </Nav.Link>
                ) : (
                  <motion.button
                    className="disabled-button"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Lock size={16} />
                    {game.reason}
                  </motion.button>
                )}
              </div>

              {/* Hover Effect */}
              <AnimatePresence>
                {hoveredGame === game.id && (
                  <motion.div
                    className="game-hover-effect"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Corner Decoration */}
              <motion.div
                className="corner-decoration"
                animate={{
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Star size={32} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="paradise-footer"
          variants={itemVariants}
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.p
            className="footer-text"
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Made with{" "}
            <motion.span
              animate={{
                scale: [1, 1.4, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💖
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Prachi_PinkParadise;