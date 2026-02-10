
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';
const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, 5, 14); 
    
    if (now > nextBirthday) {
      nextBirthday = new Date(currentYear + 1, 5, 14);
    }
    
    const difference = nextBirthday - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days || 0 },
    { label: 'Hours', value: timeLeft.hours || 0 },
    { label: 'Minutes', value: timeLeft.minutes || 0 },
    { label: 'Seconds', value: timeLeft.seconds || 0 }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.6, type: "spring" }}
      className="countdown-section py-5"
    >
      <Row className="justify-content-center">
        <Col lg={10}>
          <motion.h2 
            className="text-center display-4 fw-bold mb-5 luxury-font"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
          >
            🎂 Countdown to Next Birthday 🎂
          </motion.h2>
          
          <Row className="g-4 justify-content-center">
            {countdownItems.map((item, index) => (
              <Col key={item.label} xs={6} sm={3} lg={3}>
                <motion.div
                  className="countdown-item text-center"
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={isVisible ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    delay: index * 0.15 + 1 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <div className="countdown-value">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="display-4 fw-bold"
                      >
                        {item.value.toString().padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <motion.div 
                    className="countdown-label small text-uppercase mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 1.5 }}
                  >
                    {item.label}
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </motion.section>
  );
};

export default BirthdayCountdown;