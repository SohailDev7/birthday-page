import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import PinkSVGBackground from '../../components/PinkSVGBackground';
import { calculateAge, isBirthday } from '../../utils/dateUtils';
import image3 from '../../assets/images/image3.jpg';

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
        className="min-h-screen pt-5"
      >
        <Container className="mt-5 pt-5">
          {}
          <motion.section
            variants={itemVariants}
            className="py-5"
          >
            <Row className="items-center justify-center">
              <Col md={4} className="text-center mb-4">
                <motion.div
                  className="relative"
                  variants={floatingVariants}
                  animate="float"
                >
                  {}
                  <motion.div
                    className="relative mx-auto w-[280px] h-[280px]"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-white/30 backdrop-blur-[10px] transition-all duration-300 rotate-6"></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-white/30 backdrop-blur-[10px] transition-all duration-300 -rotate-6"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-lg shadow-pink-500/30">
                      <img
                        src={image3}
                        alt="Prachi"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-to-br from-pink-500 to-pink-400 items-center justify-center text-6xl">
                        🎀
                      </div>
                    </div>

                    {}
                    <motion.div
                      className="absolute -top-5 -left-5 text-4xl z-10"
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
                      className="absolute -bottom-5 -right-5 text-4xl z-10"
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
                  className="glass-card p-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl font-bold mb-4 luxury-font text-[var(--soft-primary)]">
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👤
                    </motion.span>
                    {' '}Basic Info
                  </h2>

                  <div>
                    {[
                      { icon: '🏷️', label: 'Name', value: 'Prachi Shahi' },
                      { icon: '🎂', label: 'Age', value: `${age} years young` },
                      { icon: '♊', label: 'Zodiac', value: 'Gemini' },
                      { icon: '🍓', label: 'Worth', value: '16 strawberries' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="flex items-center mb-3 p-4 rounded-xl bg-white/50 transition-all hover:bg-white/80 hover:translate-x-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        <span className="mr-3 text-5xl drop-shadow-sm">{item.icon}</span>
                        <div>
                          <strong className="block text-sm text-[var(--soft-text)]">{item.label}:</strong>
                          <span className="text-[var(--soft-primary)] font-semibold text-lg">{item.value}</span>
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
            className="py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-5 luxury-font text-center text-[var(--soft-primary)]">
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
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-[var(--soft-text)]">{trait.name}</span>
                        <motion.span
                          className="font-bold text-[var(--soft-primary)]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 1 }}
                        >
                          {animatedValues[trait.name] || 0}%
                        </motion.span>
                      </div>
                      <div className="h-6 bg-white/30 rounded-xl overflow-hidden relative">
                        <motion.div
                          className="h-full rounded-xl relative overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.value}%` }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                          style={{ backgroundColor: trait.color }}
                        >
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
                        </motion.div>
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
                <p className="text-[var(--soft-primary)] italic elegant-font text-2xl">
                  "A perfect blend of dumbness and charm - that's Prachi"
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {}
          <motion.section
            variants={itemVariants}
            className="py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-5 luxury-font text-center text-[var(--soft-primary)]">
                ❤️ Favorite Things
              </h2>

              <Row className="g-4">
                {favoriteThings.map((item, index) => (
                  <Col key={item.title} md={6}>
                    <motion.div
                      className="glass-card p-4 h-full transition-all border border-white/20 hover:shadow-lg hover:shadow-pink-500/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        rotate: Math.random() > 0.5 ? 2 : -2
                      }}
                    >
                      <div className="flex items-start">
                        <motion.span
                          className="text-6xl mr-4 drop-shadow-sm"
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
                          <h4 className="font-bold mb-2">{item.title}</h4>
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
            className="py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-5 luxury-font text-center text-[var(--soft-primary)]">
                💡 Fun Facts
              </h2>

              <Row className="g-4">
                {funFacts.map((fact, index) => (
                  <Col key={fact} md={6}>
                    <motion.div
                      className="glass-card p-3 bg-white/70 border-l-4 border-[var(--soft-primary)] transition-all hover:translate-x-2 hover:bg-white/90"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center">
                        <motion.span
                          className="text-xl mr-3 drop-shadow-sm"
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
                        <span className="text-[var(--soft-text)] font-medium">{fact}</span>
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
            className="py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-5 luxury-font text-center text-[var(--soft-primary)]">
                🤝 Friendship Level
              </h2>

              <div className="max-w-2xl mx-auto relative">
                <div className="h-10 bg-white/30 rounded-2xl overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--soft-primary)] to-[var(--soft-secondary)] rounded-2xl relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine"></div>
                  </motion.div>
                </div>
                <motion.div
                  className="text-center mt-3 text-[var(--soft-primary)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <span className="font-bold text-3xl">94% - Chor Besties Forever!</span>
                </motion.div>
              </div>

              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <p className="text-[var(--soft-primary)] italic elegant-font text-2xl">
                  "A friend like Prachi is worth more than 16 strawberries... maybe even 17!"
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {}
          <motion.section
            variants={itemVariants}
            className="py-5"
          >
            <motion.div
              className="glass-card p-5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-5 luxury-font text-center text-[var(--soft-primary)]">
                ⏰ Daily Routine
              </h2>

              <Row className="g-4">
                {Object.entries(dailyRoutine).map(([time, activities], index) => (
                  <Col key={time} md={6} lg={3}>
                    <motion.div
                      className="glass-card p-4 h-full bg-white/80 border border-white/30 transition-all hover:bg-white/95 hover:shadow-lg hover:shadow-pink-500/15"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4 className="font-bold mb-3 capitalize">{time}</h4>
                      <ul className="list-none p-0">
                        {activities.map((activity, activityIndex) => (
                          <motion.li
                            key={activity}
                            className="mb-2 flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + activityIndex * 0.1 + 0.7 }}
                          >
                            <span className="text-[var(--soft-primary)] font-bold mr-2">•</span>
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
            className="py-5"
          >
            <IQGraph />
          </motion.section>

          {}
          <motion.footer
            variants={itemVariants}
            className="text-center py-5 mt-5"
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
              Made with ❤️ for Prachi
            </motion.p>
            <p className="text-gray-500">
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
      <h2 className="text-5xl font-bold mb-2 luxury-font text-center text-[var(--soft-primary)]">
        📉 Prachi's IQ Development
      </h2>
      <p className="text-center mb-4 text-xl">(According to highly scientific research)</p>

      <div className="max-w-3xl mx-auto relative h-[200px]">
        <div className="relative h-full bg-white/10 rounded-2xl p-5">
          {/* Y-Axis */}
          <div className="absolute left-0 top-0 bottom-0 w-10 border-r-2 border-[var(--soft-primary)] flex flex-col justify-between py-2.5 px-1">
            <span className="text-xs text-[var(--soft-text)] font-semibold">200 IQ</span>
            <span className="text-xs text-[var(--soft-text)] font-semibold">0 IQ</span>
          </div>

          {/* X-Axis */}
          <div className="absolute bottom-0 left-10 right-0 h-[30px] border-t-2 border-[var(--soft-primary)]">
            {[2010, 2015, 2020, 2023].map((year, index) => (
              <div key={year} className="absolute -top-5" style={{ left: `${index * 25}%`, transform: 'translateX(-50%)' }}>
                <span className="text-xs text-[var(--soft-text)] font-semibold">{year}</span>
              </div>
            ))}
          </div>

          {/* IQ Line */}
          <motion.div
            className="absolute bottom-[30px] left-10 right-0 h-0.5 bg-red-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Error Message */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-2xl text-center drop-shadow-sm"
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
          className="absolute bottom-2.5 right-2.5 bg-[var(--soft-primary)] text-white border-0 px-4 py-2 rounded-2xl text-sm cursor-pointer transition-all hover:bg-[var(--soft-secondary)]"
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
        <p className="text-[var(--soft-text)] italic elegant-font text-2xl">
          "Consistently dumb since 2007"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Prachi_About;