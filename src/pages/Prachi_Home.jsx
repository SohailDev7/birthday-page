// pages/Prachi_Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ProfilePicture from '../components/ProfilePicture';
import BirthdayCountdown from '../components/BirthdayCountdown';
import PinkSVGBackground from '../components/PinkSVGBackground';
import AnimatedCounter from '../components/AnimatedCounter';
import TransportModel from '../components/TransportModel';
import { Rocket, Sparkles, Gift, Heart, Lock } from 'lucide-react';
import { calculateAge, isBirthday } from '../utils/dateUtils';
import './css/Prachi_Home.css';

const Prachi_Home = () => {
  const age = calculateAge();
  const birthday = isBirthday();
  const { currentTheme } = useTheme();
  const [isTransportOpen, setIsTransportOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.8 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
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

  const quickLinks = [
    {
      icon: '🎮',
      title: 'Games & Fun',
      description: 'Discover interactive games and entertainment',
      path: '/portal/prachi/games',
      color: 'var(--soft-primary)'
    },
    {
      icon: '📖',
      title: 'About Prachi',
      description: 'Learn more about Prachi\'s journey and memories',
      path: '/portal/prachi/about',
      color: 'var(--soft-secondary)'
    },
    {
      icon: '🎁',
      title: 'Special Surprises',
      description: 'Hidden treasures and secret content',
      path: '/portal/prachi/surprises',
      color: 'var(--soft-accent)'
    }
  ];

  return (
    <>
      <PinkSVGBackground />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="prachi-home-page pt-5"
      >
        <Container className="mt-5 pt-5">
          {/* Hero Section */}
          <motion.section 
            className="hero-section text-center py-5 my-5 position-relative"
            variants={itemVariants}
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
            >
              <ProfilePicture />
            </motion.div>

            <Row className="justify-content-center">
              <Col lg={10}>
                <motion.h1 
                  className="display-2 fw-bold mb-4 luxury-font"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1, 
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {birthday ? (
                    <>
                      🎀 Happy Birthday, <span className="gradient-text">Prachi chor</span>! 🎀
                    </>
                  ) : (
                    <>
                      Welcome back, <span className="gradient-text elegant-font">Prachi</span>!
                    </>
                  )}
                </motion.h1>
                
                <motion.p 
                  className="lead mb-4 fs-3 elegant-font" 
                  variants={itemVariants}
                >
                  Every year, this page updates with something new for you. Don't forget to check back!
                </motion.p>

                {!birthday && (
                  <motion.div 
                    className="d-flex justify-content-center"
                    variants={itemVariants}
                  >
                    <AnimatedCounter 
                      value={age} 
                      duration={3} 
                      label="Years of Elegance" 
                    />
                  </motion.div>
                )}
              </Col>
            </Row>

            {/* Birthday Confetti Effect */}
            {birthday && (
              <motion.div
                className="birthday-confetti"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                    animate={{
                      y: [0, -1000],
                      x: [0, Math.random() * 200 - 100],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    {['🎉', '🎊', '🎀', '✨', '🌟'][i % 5]}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Birthday Countdown */}
          <BirthdayCountdown />

          {/* Archives Section */}
          <motion.section 
            className="archives-section py-5"
            variants={itemVariants}
          >
            <Row className="justify-content-center">
              <Col lg={8}>
                <motion.h2 
                  className="text-center display-4 fw-bold mb-5 luxury-font"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Gift className="me-3" />
                  Memory Archives
                  <Gift className="ms-3" />
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Card className="archive-item mb-4 border-0">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 fs-6">2024</Badge>
                      <Card.Text className="fs-5 mb-0 elegant-font">
                        <Heart className="me-2" size={20} />
                        Wish we got close earlier
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Card className="archive-item mb-4 border-0">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 fs-6">2025</Badge>
                      {birthday ? (
                        <Card.Link 
                          href="https://drive.google.com/drive/folders/12vdV4VylQwi0pp87myVLsCjSifptWX61"
                          className="archive-link display-6 d-flex align-items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Sparkles className="me-2" />
                          Prachi's Archive 2025
                        </Card.Link>
                      ) : (
                        <Card.Text className="fs-5 text-muted mb-0 elegant-font d-flex align-items-center">
                          {/* Fixed Lock icon usage */}
                          <Lock className="me-2" size={20} />
                          2025 Prachi's Archive (Locked until birthday)
                        </Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Card className="archive-item border-0">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 fs-6">2026</Badge>
                      <Card.Text className="fs-5 mb-0 elegant-font d-flex align-items-center">
                        <Sparkles className="me-2" />
                        Check Next Year
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </motion.section>

          {/* Secret Codes Section */}
          <motion.section 
            className="secret-codes-section py-5 text-center"
            variants={itemVariants}
          >
            <Row className="justify-content-center">
              <Col lg={8}>
                <motion.h2 
                  className="display-4 fw-bold mb-4 luxury-font"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 1.8 }}
                >
                  <Rocket className="me-3" />
                  Secret Transport Codes
                  <Rocket className="ms-3" />
                </motion.h2>
                
                <motion.p 
                  className="lead mb-4 fs-4 elegant-font"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Unlock hidden features with secret codes! Try them in the transport model.
                </motion.p>
                
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                  {['Canyouwinme', 'Prachisachor', 'SoilChor', 'Prachi0614', 'PringlesxBJCLM'].map((code, index) => (
                    <motion.span 
                      key={code}
                      className="code-badge"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100,
                        delay: index * 0.2 + 2.2 
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        y: -5
                      }}
                    >
                      <Badge bg="light" text="dark" className="fs-5 p-3 luxury-font">
                        {code}
                      </Badge>
                    </motion.span>
                  ))}
                </div>

                {/* Transport Model Button */}
                <motion.button
                  className="transport-activate-btn"
                  onClick={() => setIsTransportOpen(true)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Rocket className="me-2" />
                  Activate Transport Model
                  <Sparkles className="ms-2" />
                </motion.button>
              </Col>
            </Row>
          </motion.section>

          {/* Footer */}
          <motion.footer 
            className="text-center py-5 mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 }}
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
              Save this link and visit again next year! 🎀
            </motion.p>
            <p className="text-muted elegant-font">
              Made with 💖 for Prachi - Your digital sanctuary
            </p>
          </motion.footer>
        </Container>

        {/* Transport Model Button (Floating) */}
        <motion.button
          className="transport-floating-btn"
          onClick={() => setIsTransportOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4 }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0]
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Rocket size={24} />
        </motion.button>

        {/* Transport Model Component */}
        <TransportModel 
          isOpen={isTransportOpen}
          onClose={() => setIsTransportOpen(false)}
        />
      </motion.div>
    </>
  );
};

export default Prachi_Home;