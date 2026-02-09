// PoemPage.js
import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaHeart, FaStar, FaCalendarAlt, FaFilePdf, FaArrowLeft, FaDownload } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';
import { useTheme } from '../../context/ThemeContext';

// Import your PDF file
import SkyRemembersPDF from '../../assets/poetry01.pdf';
import '../css/Prachi_Poetry.css';

const PoemPage = () => {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedPoem, setSelectedPoem] = useState(null);
    const { currentTheme, toggleTheme } = useTheme();

    const poemsByYear = {
        2025: {
            title: "The Sky Remembers Her Walk",
            date: "March 9, 2025",
            pdf: "https://drive.google.com/file/d/1xBhgp28KnGHGZWS9Ev2Ze30ekzBKC-pI/preview",
            description: "A celestial journey through memories and dreams",
            icon: "🌌",
            color: "#8B5CF6"
        },
        2026: {
            title: "Next Chapter",
            date: "Coming 2026",
            pdf: null,
            description: "Another beautiful story awaits...",
            icon: "📖",
            color: "#6B7280"
        }
    };

    const handlePoemSelect = (year) => {
        setSelectedYear(year);
        if (year === 2025) {
            setSelectedPoem(poemsByYear[2025]);
        }
    };

    const handleBackToSelection = () => {
        setSelectedPoem(null);
    };

    return (
        <div className="poetry-app">
            {/* Navigation */}
            <Navbar fixed="top" className="poetry-navbar">
                <Container>
                    <Navbar.Brand className="poetry-brand">
                        <GiFeather className="feather-icon" />
                        Poetry Collection
                    </Navbar.Brand>
                    <Nav>
                        <button
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                        >
                            {currentTheme === 'soft' ? '🌙' : '🌞'}
                        </button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="poetry-container">
                <AnimatePresence mode="wait">
                    {!selectedPoem ? (
                        // Poem Selection View
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="selection-view"
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="poetry-header"
                            >
                                <h1 className="main-title">Poetic Journeys</h1>
                                <p className="subtitle">For Prachi, with words from the heart</p>
                            </motion.div>

                            {/* Year Selection */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="year-selection"
                            >
                                <h3 className="section-title">Select Year</h3>
                                <div className="year-grid">
                                    {[2025, 2026].map((year) => (
                                        <motion.div
                                            key={year}
                                            className={`year-card ${selectedYear === year ? 'active' : ''}`}
                                            onClick={() => handlePoemSelect(year)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            layout
                                        >
                                            <div className="year-icon" style={{ color: poemsByYear[year].color }}>
                                                {poemsByYear[year].icon}
                                            </div>
                                            <h4 className="year-title">{year}</h4>
                                            <p className="year-subtitle">{poemsByYear[year].title}</p>
                                            <div className="year-badge">{poemsByYear[year].date}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Selected Poem Preview */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="preview-section"
                            >
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="poem-icon-large" style={{ color: poemsByYear[selectedYear].color }}>
                                            {poemsByYear[selectedYear].icon}
                                        </div>
                                        <div className="preview-info">
                                            <h3 className="poem-title">{poemsByYear[selectedYear].title}</h3>
                                            <p className="poem-description">{poemsByYear[selectedYear].description}</p>
                                        </div>
                                    </div>
                                    {selectedYear === 2025 && (
                                        <motion.button
                                            className="view-poem-btn"
                                            onClick={() => setSelectedPoem(poemsByYear[2025])}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ background: poemsByYear[2025].color }}
                                        >
                                            <FaBook className="btn-icon" />
                                            Read Full Poem
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        // PDF View
                        <motion.div
                            key="pdf"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="pdf-view"
                        >
                            {/* PDF Header */}
                            <div className="pdf-header">
                                <button
                                    className="back-btn"
                                    onClick={handleBackToSelection}
                                >
                                    <FaArrowLeft />
                                    Back to Collection
                                </button>
                                <div className="pdf-title-section">
                                    <h2 className="pdf-title">
                                        <FaBook className="title-icon" />
                                        {selectedPoem.title}
                                    </h2>
                                    <p className="pdf-date">{selectedPoem.date}</p>
                                </div>
                                <a
                                    href={selectedPoem.pdf}
                                    download
                                    className="download-btn"
                                >
                                    <FaDownload />
                                    Download
                                </a>
                            </div>

                            {/* PDF Embed */}
                            <div className="pdf-embed-wrapper">
                                <iframe
                                    src={selectedPoem.pdf}
                                    className="pdf-frame"
                                    title={selectedPoem.title}
                                    width="100%"
                                    height="600"
                                >
                                    <p>Your browser doesn't support PDF viewing.
                                        <a href={selectedPoem.pdf} download>Download the poem</a> instead.
                                    </p>
                                </iframe>
                            </div>

                            {/* PDF Footer */}
                            <div className="pdf-footer">
                                <div className="footer-note">
                                    <FaHeart className="heart-icon" />
                                    <span>Made with love for Prachi</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    );
};

export default PoemPage;