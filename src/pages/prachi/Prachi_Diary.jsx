
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaHeart, FaStar, FaLaughBeam, FaGift, FaCalendarAlt, FaPenFancy } from 'react-icons/fa';
import { GiPartyPopper, GiCakeSlice } from 'react-icons/gi';
import { useTheme } from '../../context/ThemeContext';
import '../css/Prachi_Diary.css';

const DiaryPage = () => {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [showConfetti, setShowConfetti] = useState(true);
    const { currentTheme, toggleTheme } = useTheme();

    const birthdayWishes = {
        2025: {
            text: "Congratulations for turning 18, Prachi. It's been my pleasure knowing you for two years and now I want it to be many more. Despite constantly bullying you online, know that you are not dumb at all... you're still dumb, just not dumb dumb. You're the kind of person who could trip over the ground and still blame gravity personally. But you're still the kind who listens, comes to support people, and loves loudly. You are sweet, occasionally confusing, and weirdly wise at times. Growing older doesn't mean growing too much. OK? Stay this charming, cute and ridiculous. Here's to more years of laughter, roasts, inside jokes and pretending to be seen together. You're finally legal and still just as cute.",
            date: "June 14, 2025"
        },
        2026: {
            text: "Coming soon... Check back next year for your special birthday message! 🎉",
            date: "Coming soon..."
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="diary-app">
            {}
            <Navbar fixed="top" className="custom-navbar diary-navbar">
                <Container>
                    <Navbar.Brand className="navbar-brand-custom">
                        📓
                        Prachi's Diary
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <button
                            className="theme-toggle btn btn-outline-primary btn-sm"
                            onClick={toggleTheme}
                        >
                            {currentTheme === 'soft' ? '🌙 Luxury' : '🌞 Soft'}
                        </button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container fluid className="diary-container">
                {/* Animated Background Elements */}
                <div className="diary-background-elements">
                    <motion.div
                        className="floating-element element-1"
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        ✨
                    </motion.div>
                    <motion.div
                        className="floating-element element-2"
                        animate={{
                            y: [0, -40, 0],
                            rotate: [0, -15, 15, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        🌟
                    </motion.div>
                    <motion.div
                        className="floating-element element-3"
                        animate={{
                            y: [0, -25, 0],
                            rotate: [0, 20, -20, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        💫
                    </motion.div>
                </div>

                {/* Confetti */}
                <AnimatePresence>
                    {showConfetti && (
                        <div className="confetti-container">
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="confetti-piece"
                                    initial={{
                                        x: Math.random() * window.innerWidth,
                                        y: -20,
                                        rotate: 0
                                    }}
                                    animate={{
                                        y: window.innerHeight + 50,
                                        rotate: 360,
                                        x: Math.random() * 100 - 50
                                    }}
                                    transition={{
                                        duration: Math.random() * 2 + 1,
                                        repeat: Infinity,
                                        delay: Math.random() * 1
                                    }}
                                    style={{
                                        background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                                        left: `${Math.random() * 100}%`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="diary-content-wrapper"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="diary-header-section text-center mb-4">
                        <motion.div
                            className="main-icon"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <GiCakeSlice />
                        </motion.div>
                        <motion.h1
                            className="diary-main-title"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Birthday Notes
                        </motion.h1>
                        <motion.p
                            className="diary-subtitle"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            For the amazing Prachi 🎀 (please use Soft theme for this page for now)
                        </motion.p>
                    </motion.div>

                    {/* Year Selection */}
                    <motion.div variants={itemVariants} className="year-selection-section mb-4">
                        <div className="year-buttons-wrapper">
                            {[2025, 2026].map((year) => (
                                <motion.button
                                    key={year}
                                    className={`year-select-btn ${selectedYear === year ? 'active' : ''} ${year === 2026 ? 'future' : ''}`}
                                    onClick={() => year !== 2026 && setSelectedYear(year)}
                                    whileHover={year !== 2026 ? { scale: 1.05 } : {}}
                                    whileTap={year !== 2026 ? { scale: 0.95 } : {}}
                                    animate={{
                                        y: selectedYear === year ? [0, -3, 0] : 0
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: selectedYear === year ? Infinity : 0
                                    }}
                                >
                                    <FaCalendarAlt className="btn-icon" />
                                    {year}
                                    {year === 2026 && <span className="badge">Soon!</span>}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Diary Paper */}
                    <motion.div variants={itemVariants} className="diary-paper-container">
                        <div className="diary-paper">
                            {/* Paper Header */}
                            <div className="paper-header">
                                <motion.div
                                    className="paper-title"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <FaPenFancy className="pen-icon" />
                                    <h2>Birthday Note | 2025</h2>
                                    <div className="paper-date">{birthdayWishes[selectedYear].date}</div>
                                </motion.div>
                                <motion.div
                                    className="decoration-icons"
                                    animate={{
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity
                                    }}
                                >
                                    <GiPartyPopper />
                                </motion.div>
                            </div>

                            {/* Lined Paper Content */}
                            <div className="lined-paper">
                                <div className="paper-margin">
                                    <div className="margin-line"></div>
                                </div>
                                <div className="paper-content">
                                    <motion.div
                                        className="diary-text-content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 1 }}
                                    >
                                        {birthdayWishes[selectedYear].text.split('. ').map((sentence, index, array) => (
                                            <motion.div
                                                key={index}
                                                className="text-line"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                            >
                                                <span className="line-number">{index + 1}</span>
                                                <span className="sentence-text">
                                                    {sentence.trim()}
                                                    {index < array.length - 1 ? '.' : ''}
                                                </span>
                                                {index % 4 === 0 && (
                                                    <motion.span
                                                        className="inline-emoji"
                                                        animate={{ scale: [1, 1.3, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        {index % 8 === 0 ? ' 💖' : ' 🌸'}
                                                    </motion.span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Paper Footer */}
                            <div className="paper-footer">
                                <motion.div
                                    className="footer-icons"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -8, 0],
                                            rotate: [0, 360]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity
                                        }}
                                    >
                                        <FaHeart className="footer-icon heart" />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity
                                        }}
                                    >
                                        <FaBirthdayCake className="footer-icon cake" />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            y: [0, -12, 0],
                                            rotate: [0, -360]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity
                                        }}
                                    >
                                        <FaStar className="footer-icon star" />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            y: [0, -9, 0],
                                            scale: [1, 1.3, 1]
                                        }}
                                        transition={{
                                            duration: 3.5,
                                            repeat: Infinity
                                        }}
                                    >
                                        <FaLaughBeam className="footer-icon laugh" />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            y: [0, -11, 0],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 3.2,
                                            repeat: Infinity
                                        }}
                                    >
                                        <FaGift className="footer-icon gift" />
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="signature"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                >
                                    With love 💕
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Celebration Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="celebration-footer text-center mt-4"
                    >
                        <motion.p
                            animate={{
                                scale: [1, 1.05, 1],
                                color: ['#ff6b6b', '#4ecdc4', '#45b7d1']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="celebration-message"
                        >
                            🎂 Happy 18th Birthday, Prachi! May your day be as wonderful as you are! 🎂
                        </motion.p>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    );
};

export default DiaryPage;