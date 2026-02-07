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
        className="pt-5"
      >
        <Container className="mt-5 pt-5">
          {/* Hero Section */}
          <motion.section
            className="text-center py-5 my-5 relative"
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
                  className="text-6xl md:text-7xl font-bold mb-4 luxury-font"
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
                  className="text-2xl mb-4 elegant-font"
                  variants={itemVariants}
                >
                  Every year, this page updates with something new for you. Don't forget to check back!
                </motion.p>

                {!birthday && (
                  <motion.div
                    className="flex justify-center"
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
                className="fixed inset-0 pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
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
            className="py-5"
            variants={itemVariants}
          >
            <Row className="justify-content-center">
              <Col lg={8}>
                <motion.h2
                  className="text-center text-5xl font-bold mb-5 luxury-font"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Gift className="me-3 inline" />
                  Memory Archives
                  <Gift className="ms-3 inline" />
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Card className="mb-4 border-0 bg-[var(--soft-card)] backdrop-blur-[10px] rounded-3xl border border-pink-500/10 shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-1">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 text-lg px-3 py-2">2024</Badge>
                      <Card.Text className="text-xl mb-0 elegant-font flex items-center">
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
                  <Card className="mb-4 border-0 bg-[var(--soft-card)] backdrop-blur-[10px] rounded-3xl border border-pink-500/10 shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-1">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 text-lg px-3 py-2">2025</Badge>
                      {birthday ? (
                        <Card.Link
                          href="https://drive.google.com/drive/folders/12vdV4VylQwi0pp87myVLsCjSifptWX61"
                          className="text-3xl flex items-center no-underline hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Sparkles className="me-2" />
                          Prachi's Archive 2025
                        </Card.Link>
                      ) : (
                        <Card.Text className="text-xl text-gray-500 mb-0 elegant-font flex items-center">
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
                  <Card className="border-0 bg-[var(--soft-card)] backdrop-blur-[10px] rounded-3xl border border-pink-500/10 shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-1">
                    <Card.Body className="p-4">
                      <Badge bg="primary" className="mb-3 text-lg px-3 py-2">2026</Badge>
                      <Card.Text className="text-xl mb-0 elegant-font flex items-center">
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
            className="py-5 text-center"
            variants={itemVariants}
          >
            <Row className="justify-content-center">
              <Col lg={8}>
                <motion.h2
                  className="text-5xl font-bold mb-4 luxury-font"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 1.8 }}
                >
                  <Rocket className="me-3 inline" />
                  Secret Transport Codes
                  <Rocket className="ms-3 inline" />
                </motion.h2>

                <motion.p
                  className="text-2xl mb-4 elegant-font"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Unlock hidden features with secret codes! Try them in the transport model.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-3 mb-5">
                  {['Canyouwinme', 'Prachisachor', 'SoilChor', 'Prachi0614', 'PringlesxBJCLM'].map((code, index) => (
                    <motion.span
                      key={code}
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
                      <Badge bg="light" text="dark" className="text-xl px-4 py-3 luxury-font cursor-pointer">
                        {code}
                      </Badge>
                    </motion.span>
                  ))}
                </div>

                {/* Transport Model Button */}
                <motion.button
                  className="px-10 py-4 text-xl font-semibold border-0 rounded-full cursor-pointer inline-flex items-center transition-all duration-500 shadow-lg backdrop-blur-[10px] bg-gradient-to-br from-pink-500/90 to-pink-400/80 text-white border-2 border-white/30 hover:from-pink-600/95 hover:to-pink-500/90 hover:shadow-2xl hover:shadow-pink-500/50 hover:border-white/40"
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
              className="text-3xl luxury-font mb-3"
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
            <p className="text-gray-500 elegant-font">
              Made with 💖 for Prachi - Your digital sanctuary
            </p>
          </motion.footer>
        </Container>

        {/* Transport Model Button (Floating) */}
        <motion.button
          className="fixed bottom-8 right-8 w-[70px] h-[70px] rounded-full border-0 cursor-pointer flex items-center justify-center text-3xl z-[1000] shadow-2xl transition-all duration-500 backdrop-blur-[10px] bg-gradient-to-br from-pink-500/90 to-pink-400/80 text-white border-2 border-white/30 hover:from-pink-600/95 hover:to-pink-500/90 hover:shadow-pink-500/40"
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