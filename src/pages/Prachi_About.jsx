import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import PinkSVGBackground from '../components/PinkSVGBackground';
import { calculateAge, isBirthday } from '../utils/dateUtils';
import './css/Prachi_About.css';
import image3 from '../assets/images/image3.jpg';

const Prachi_About = () => {
  const { currentTheme } = useTheme();
  const age = calculateAge();
  const birthday = isBirthday();
  const [animatedValues, setAnimatedValues] = useState({});

  
  const personalityTraits = [
    { name: 'Dumbness Level', value: 130, color: 'var(--soft-primary)' },
    { name: 'Pretty Level', value: 101, color: 'var(--soft-secondary)' },
    { name: 'Careless', value: 60, color: 'var(--soft-accent)' },
    { name: 'Reliable', value: 70, color: 'var(--soft-primary)' },
    { name: 'Childish', value: 40, color: 'var(--soft-secondary)' },
    { name: 'Energy Level', value: 85, color: 'var(--soft-accent)' },
    { name: 'Forgetful', value: 90, color: 'var(--soft-primary)' },
    { name: 'Shy', value: 5, color: 'var(--soft-secondary)' },
    { name: 'Sleep Lover', value: 177, color: 'var(--soft-accent)' },
    { name: 'Chaos Level', value: 75, color: 'var(--soft-primary)' }
  ];

  const favoriteThings = [
    {
      icon: '🍓',
      title: 'Favorite Fruit',
      description: 'Strawberries! Obviously. Worth every bit of 16 strawberries.'
    },
    {
      icon: '🎨',
      title: 'Favorite Color',
      description: 'Pink, in all its glorious shades. Especially the cute pastel ones.'
    },
    {
      icon: '📞',
      title: 'Favorite Activity',
      description: 'Taking an afternoon nap even after sleeping EIGHT HOURS!! and watching slice of life kdramas'
    },
    {
      icon: '🐼',
      title: 'Favorite Animal',
      description: 'Pandas (but secretly all animals are amazing).'
    }
  ];

  const funFacts = [
    'Prachi has 1kb size for her brain',
    'Would sell her dearly friends for drugs',
    'Has a secret talent for forgetting things every three seconds',
    'Wouldn\'t feel 10 richter scale earthquake if she was walking and had company',
    'Shes a fawn',
    'She bullies kids and takes their lunch money'
  ];

  const dailyRoutine = {
    morning: [
      'Wake up at 4:30 (idk how she manages that)',
      'Breakfast (if she remembers)',
      'Go to CEE institute'
    ],
    afternoon: [
      'Nap time (sacred and non negotiable)',
      'Play with that cuteeee cousinnnn awwww',
      'Watch Kdramas'
    ],
    evening: [
      'Dinner (the most important meal)',
      'Jots a very dumb plan to rob a bank',
      'Plan to sleep early (preferably at 10:20 - 10:40)'
    ],
    night: [
      'Sleep',
      'Sleep',
      'Sleep'
    ]
  };

  const memories = [
    'That time we talked about those damn rats and adviced me',
    'All the random inside jokes',
    'Random Interactions'
  ];

  useEffect(() => {
    
    personalityTraits.forEach((trait, index) => {
      setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [trait.name]: trait.value
        }));
      }, index * 200);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <PinkSVGBackground />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="about-page pt-5"
      >
        <Container className="mt-5 pt-5">
          {}

          {}
          <motion.section 
            variants={itemVariants}
            className="profile-section py-5"
          >
            <Row className="align-items-center justify-content-center">
              <Col md={4} className="text-center mb-4">
                <motion.div
                  className="profile-image-container position-relative"
                  variants={floatingVariants}
                  animate="float"
                >
                  {}
                  <motion.div
                    className="profile-frame position-relative mx-auto"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="frame-layer frame-1"></div>
                    <div className="frame-layer frame-2"></div>
                    <div className="profile-image-wrapper">
                      <img 
                        src={image3}
                        alt="Prachi" 
                        className="profile-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="profile-emoji fallback display-1">
                        🎀
                      </div>
                    </div>

                    {}
                    <motion.div
                      className="floating-heart heart-1"
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 10, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ❤️
                    </motion.div>
                    <motion.div
                      className="floating-heart heart-2"
                      animate={{
                        y: [0, -40, 0],
                        x: [0, -15, 0],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    >
                      💖
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Col>

              <Col md={6}>
                <motion.div
                  className="basic-info-card glass-card p-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="display-5 fw-bold mb-4 luxury-font text-pink">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👤
                    </motion.span>
                    Basic Info
                  </h2>
                  
                  <div className="info-list">
                    {[
                      { icon: '🏷️', label: 'Name', value: 'Prachi Shahi' },
                      { icon: '🎂', label: 'Age', value: `${age} years young` },
                      { icon: '♊', label: 'Zodiac', value: 'Gemini' },
                      { icon: '🍓', label: 'Worth', value: '16 strawberries' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="info-item d-flex align-items-center mb-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        <span className="info-icon me-3 display-6">{item.icon}</span>
                        <div>
                          <strong className="d-block info-label">{item.label}:</strong>
                          <span className="info-value">{item.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="personality-section py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="display-4 fw-bold mb-5 luxury-font text-center text-pink">
                💫 Personality Traits
              </h2>

              <Row>
                {personalityTraits.map((trait, index) => (
                  <Col key={trait.name} md={6} className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="trait-name fw-medium">{trait.name}</span>
                        <motion.span 
                          className="trait-value fw-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 1 }}
                        >
                          {animatedValues[trait.name] || 0}%
                        </motion.span>
                      </div>
                      <div className="personality-bar-container">
                        <motion.div
                          className="personality-bar"
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.value}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: index * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                          style={{ backgroundColor: trait.color }}
                        />
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              <motion.div
                className="text-center mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p className="personality-quote elegant-font fs-4">
                  "A perfect blend of dumbness and charm - that's Prachi"
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="favorites-section py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="display-4 fw-bold mb-5 luxury-font text-center text-pink">
                ❤️ Favorite Things
              </h2>

              <Row className="g-4">
                {favoriteThings.map((item, index) => (
                  <Col key={item.title} md={6}>
                    <motion.div
                      className="favorite-card glass-card p-4 h-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: Math.random() > 0.5 ? 2 : -2
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <motion.span 
                          className="favorite-icon display-4 me-4"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        <div>
                          <h4 className="fw-bold mb-2">{item.title}</h4>
                          <p className="mb-0">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="fun-facts-section py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="display-4 fw-bold mb-5 luxury-font text-center text-pink">
                💡 Fun Facts
              </h2>

              <Row className="g-4">
                {funFacts.map((fact, index) => (
                  <Col key={fact} md={6}>
                    <motion.div
                      className="fun-fact-card glass-card p-3"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="d-flex align-items-center">
                        <motion.span
                          className="fact-icon me-3"
                          animate={{ 
                            scale: [1, 1.3, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          ✅
                        </motion.span>
                        <span className="fact-text">{fact}</span>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="friendship-section py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="display-4 fw-bold mb-5 luxury-font text-center text-pink">
                🤝 Friendship Level
              </h2>

              <div className="friendship-meter-container position-relative">
                <div className="friendship-track">
                  <motion.div
                    className="friendship-progress"
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                <motion.div
                  className="friendship-label text-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <span className="fw-bold fs-3">94% - Chor Besties Forever!</span>
                </motion.div>
              </div>

              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <p className="friendship-quote elegant-font fs-4">
                  "A friend like Prachi is worth more than 16 strawberries... maybe even 17!"
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="routine-section py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="display-4 fw-bold mb-5 luxury-font text-center text-pink">
                ⏰ Daily Routine
              </h2>

              <Row className="g-4">
                {Object.entries(dailyRoutine).map(([time, activities], index) => (
                  <Col key={time} md={6} lg={3}>
                    <motion.div
                      className="routine-card glass-card p-4 h-100"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4 className="fw-bold mb-3 text-capitalize">{time}</h4>
                      <ul className="list-unstyled">
                        {activities.map((activity, activityIndex) => (
                          <motion.li
                            key={activity}
                            className="mb-2 d-flex align-items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + activityIndex * 0.1 + 0.7 }}
                          >
                            <span className="routine-bullet me-2">•</span>
                            {activity}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.section>

          {}
          <motion.section 
            variants={itemVariants}
            className="iq-section py-5"
          >
            <IQGraph />
          </motion.section>

          {}
          <motion.footer
            variants={itemVariants}
            className="text-center py-5 mt-5"
          >
            <motion.p
              className="display-6 luxury-font mb-3"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Made with ❤️ for Prachi
            </motion.p>
            <p className="text-muted">
              © {new Date().getFullYear()} - Worth exactly 16 strawberries
            </p>
          </motion.footer>
        </Container>
      </motion.div>
    </>
  );
};


const IQGraph = () => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleResetIQ = () => {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
      alert("Failed to reset IQ - system cannot locate any intelligence to reset!");
    }, 800);
  };

  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <h2 className="display-4 fw-bold mb-2 luxury-font text-center text-pink">
        📉 Prachi's IQ Development
      </h2>
      <p className="text-center mb-4 fs-5">(According to highly scientific research)</p>

      <div className="graph-container position-relative h-200">
        <div className="graph-area">
          {}
          <div className="y-axis">
            <span className="y-label top">200 IQ</span>
            <span className="y-label bottom">0 IQ</span>
          </div>

          {}
          <div className="x-axis">
            {[2010, 2015, 2020, 2023].map((year, index) => (
              <div key={year} className="x-tick" style={{ left: `${index * 25}%` }}>
                <span className="x-label">{year}</span>
              </div>
            ))}
          </div>

          {}
          <motion.div
            className="iq-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5 }}
          />

          {}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                ERROR: IQ TOO LOW TO MEASURE
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="reset-iq-btn"
          onClick={handleResetIQ}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Reset IQ
        </motion.button>
      </div>

      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="iq-quote elegant-font fs-4">
          "Consistently dumb since 2007"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Prachi_About;