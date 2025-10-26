// pages/Review.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Form, Button, Modal, Tab, Tabs, Spinner } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { 
  Star, 
  Heart, 
  Send, 
  Bug, 
  Palette, 
  Sparkles, 
  Trophy, 
  Smile,
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageCircle,
  Zap,
  Crown,
  Download,
  Trash2,
  Eye,
  Settings,
  User,
  Clock,
  Flag,
  Music,
  Camera,
  Gift,
  FileText,
  Database,
  Loader,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import './css/Prachi_Reviews.css';

const Prachi_Reviews = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    likes: '',
    preferredTheme: '',
    bugsFound: '',
    improvements: '',
    cutenessRating: 50,
    chorPercentage: 0,
    overallExperience: '',
    wouldRecommend: '',
    favoriteFeature: '',
    musicTaste: '',
    memoryRating: 5,
    designRating: 5,
    surpriseReaction: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [serverConnected, setServerConnected] = useState(false);
  const [showFullReview, setShowFullReview] = useState(null);
  const [serverLoading, setServerLoading] = useState(true);
  const [showServerWakeModal, setShowServerWakeModal] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'sleeping', 'active'
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [wakingServer, setWakingServer] = useState(false);

  // Server configuration
  const API_BASE_URL = 'https://express-umdy.onrender.com/api';
  const SERVER_URL = 'https://express-umdy.onrender.com';

  useEffect(() => {
    initializeServerConnection();
  }, []);

  // Enhanced server status check with timeout
  const checkServerConnection = async (timeout = 10000) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const connected = data.success && data.database === 'connected';
      setServerConnected(connected);
      return connected;
    } catch (error) {
      console.error('Server connection failed:', error);
      setServerConnected(false);
      return false;
    }
  };

  // Enhanced wake up server with better feedback
  const wakeUpServer = async () => {
    setWakingServer(true);
    setServerStatus('checking');
    
    try {
      // First, ping the server directly to wake it up
      console.log('Pinging server to wake it up...');
      await fetch(SERVER_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {}); // Ignore errors for the initial ping

      // Try to ping the server multiple times with better feedback
      let attempts = 0;
      const maxAttempts = 12; // 60 seconds total (12 * 5s)
      
      const attemptWakeUp = async () => {
        attempts++;
        console.log(`Wake-up attempt ${attempts}/${maxAttempts}`);
        
        const isServerUp = await checkServerConnection(5000);
        
        if (isServerUp) {
          setServerStatus('active');
          setServerConnected(true);
          setWakingServer(false);
          
          // Small delay to show "active" status
          setTimeout(() => {
            setShowServerWakeModal(false);
            // Reload reviews after server is up
            loadReviewsFromServer();
          }, 1500);
          
          return;
        }
        
        if (attempts < maxAttempts) {
          setServerStatus('waking');
          // Wait 5 seconds before next attempt
          setTimeout(attemptWakeUp, 5000);
        } else {
          setServerStatus('sleeping');
          setWakingServer(false);
          alert('Server is taking longer than expected to wake up. Please try again in a moment.');
        }
      };
      
      // Start attempting to wake up
      setTimeout(attemptWakeUp, 3000);
      
    } catch (error) {
      console.error('Error waking server:', error);
      setServerStatus('sleeping');
      setWakingServer(false);
      alert('Error trying to wake server. Please try again.');
    }
  };

  const initializeServerConnection = async () => {
    setServerStatus('checking');
    setServerLoading(true);
    
    try {
      const isConnected = await checkServerConnection();
      
      if (isConnected) {
        await loadReviewsFromServer();
        setServerStatus('active');
      } else {
        setServerStatus('sleeping');
        setShowServerWakeModal(true);
      }
    } catch (error) {
      console.error('Server initialization failed:', error);
      setServerStatus('sleeping');
      setShowServerWakeModal(true);
    } finally {
      setServerLoading(false);
    }
  };

  const loadReviewsFromServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setReviews(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error loading reviews from server:', error);
      throw error;
    }
  };

  const saveReviewToServer = async (review) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setReviews(prev => [result.data, ...prev]);
        return true;
      } else {
        throw new Error(result.message || 'Unknown server error');
      }
    } catch (error) {
      console.error('Error saving review:', error);
      throw new Error(`Failed to submit review: ${error.message}`);
    }
  };

  const deleteReviewFromServer = async (reviewId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setReviews(prev => prev.filter(review => review._id !== reviewId));
        return true;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };

  const deleteAllReviewsFromServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setReviews([]);
        return true;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error deleting reviews:', error);
      throw error;
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setDeletingReviewId(reviewId);
    
    try {
      await deleteReviewFromServer(reviewId);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review from server.');
    } finally {
      setDeletingReviewId(null);
    }
  };

  const retryServerConnection = async () => {
    setServerLoading(true);
    setShowServerWakeModal(false);
    
    try {
      const isConnected = await checkServerConnection();
      
      if (isConnected) {
        await loadReviewsFromServer();
        setServerStatus('active');
      } else {
        setServerStatus('sleeping');
        setShowServerWakeModal(true);
      }
    } catch (error) {
      console.error('Retry failed:', error);
      setServerStatus('sleeping');
      setShowServerWakeModal(true);
    } finally {
      setServerLoading(false);
    }
  };

  const questions = [
    {
      icon: Calendar,
      title: "📅 Today's Date",
      field: 'date',
      type: 'date'
    },
    {
      icon: Heart,
      title: "💖 What made you smile after browsing the whole page?",
      field: 'likes',
      type: 'textarea',
      placeholder: "Share what you loved about this experience... ✨"
    },
    {
      icon: Palette,
      title: "🎨 Theme Preference",
      field: 'preferredTheme',
      type: 'radio',
      options: [
        { value: 'luxury', label: 'Luxury Theme 👑', emoji: '👑' },
        { value: 'soft', label: 'Soft Theme 🌸', emoji: '🌸' },
        { value: 'both', label: 'Both Themes! 💫', emoji: '💫' }
      ]
    },
    {
      icon: Bug,
      title: "🐛 Bug Report Station",
      field: 'bugsFound',
      type: 'textarea',
      placeholder: "Found any glitches? Report them here... 🔍"
    },
    {
      icon: Zap,
      title: "⚡ Improvement Ideas",
      field: 'improvements',
      type: 'textarea',
      placeholder: "How can I level up? Share your ideas... 💡"
    },
    {
      icon: Smile,
      title: "😊 Cuteness Meter",
      field: 'cutenessRating',
      type: 'slider',
      min: 0,
      max: 100,
      step: 1
    },
    {
      icon: Trophy,
      title: "🏆 Soil Chor Percentage Calculator",
      field: 'chorPercentage',
      type: 'chorSlider',
      min: 0,
      max: 100,
      step: 1
    },
    {
      icon: MessageCircle,
      title: "💭 Overall Experience",
      field: 'overallExperience',
      type: 'textarea',
      placeholder: "Tell me about your experience... 🌟"
    },
    {
      icon: CheckCircle,
      title: "✅ Recommendation Status",
      field: 'wouldRecommend',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Absolutely! 🎉', emoji: '🎉' },
        { value: 'maybe', label: 'Maybe 🤔', emoji: '🤔' },
        { value: 'no', label: 'Probably not 😢', emoji: '😢' }
      ]
    },
    {
      icon: Star,
      title: "⭐ Favorite Feature",
      field: 'favoriteFeature',
      type: 'radio',
      options: [
        { value: 'animations', label: 'Animations 🎬', emoji: '🎬' },
        { value: 'design', label: 'Design 🎨', emoji: '🎨' },
        { value: 'interactivity', label: 'Interactivity 🎮', emoji: '🎮' },
        { value: 'content', label: 'Content 📝', emoji: '📝' }
      ]
    },
    {
      icon: Music,
      title: "🎵 What Music Taste will this website matc?h",
      field: 'musicTaste',
      type: 'radio',
      options: [
        { value: 'bollywood', label: 'Bollywood 🎭', emoji: '🎭' },
        { value: 'english', label: 'English 🎸', emoji: '🎸' },
        { value: 'kpop', label: 'K-Pop 💃', emoji: '💃' },
        { value: 'mixed', label: 'Mixed 🌈', emoji: '🌈' }
      ]
    },
    {
      icon: Clock,
      title: "⏰ Experience Rating",
      field: 'memoryRating',
      type: 'starRating',
      max: 5
    },
    {
      icon: Camera,
      title: "📸 Design Appeal",
      field: 'designRating',
      type: 'starRating',
      max: 5
    },
    {
      icon: Gift,
      title: "🎁 Surprise Reaction",
      field: 'surpriseReaction',
      type: 'textarea',
      placeholder: "What surprised you the most? Share your reaction... 🤯"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!serverConnected) {
      alert('Server is not connected. Please wait for the server to wake up or try again.');
      return;
    }

    setLoading(true);

    try {
      const review = {
        ...formData,
        reviewer: 'Prachi',
        theme: currentTheme
      };

      const success = await saveReviewToServer(review);
      
      if (success) {
        setSubmitted(true);
        setFormData({
          date: new Date().toISOString().split('T')[0],
          likes: '',
          preferredTheme: '',
          bugsFound: '',
          improvements: '',
          cutenessRating: 50,
          chorPercentage: 0,
          overallExperience: '',
          wouldRecommend: '',
          favoriteFeature: '',
          musicTaste: '',
          memoryRating: 5,
          designRating: 5,
          surpriseReaction: ''
        });
        setCurrentStep(0);
      } else {
        throw new Error('Failed to save review');
      }
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`Failed to submit review: ${error.message}\n\nPlease check server connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const exportReviews = () => {
    try {
      const data = JSON.stringify(reviews, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prachi-reviews-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting reviews:', error);
    }
  };

  const clearAllReviews = async () => {
    if (window.confirm('Are you sure you want to delete all reviews? This action cannot be undone.')) {
      try {
        await deleteAllReviewsFromServer();
      } catch (error) {
        console.error('Error deleting reviews:', error);
        alert('Failed to delete reviews from server.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      likes: '',
      preferredTheme: '',
      bugsFound: '',
      improvements: '',
      cutenessRating: 50,
      chorPercentage: 0,
      overallExperience: '',
      wouldRecommend: '',
      favoriteFeature: '',
      musicTaste: '',
      memoryRating: 5,
      designRating: 5,
      surpriseReaction: ''
    });
    setCurrentStep(0);
    setSubmitted(false);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getEmojiForRating = (rating) => {
    if (rating >= 80) return { emoji: '🥰', color: '#10B981' };
    if (rating >= 60) return { emoji: '😊', color: '#8B5CF6' };
    if (rating >= 40) return { emoji: '🙂', color: '#F59E0B' };
    if (rating >= 20) return { emoji: '😐', color: '#EF4444' };
    return { emoji: '😢', color: '#DC2626' };
  };

  const getChorEmoji = (percentage) => {
    if (percentage === 0) return { emoji: '👑', text: 'King of Honesty!' };
    if (percentage <= 20) return { emoji: '🌟', text: 'Almost Perfect!' };
    if (percentage <= 50) return { emoji: '😊', text: 'Moderately Chor!' };
    if (percentage <= 80) return { emoji: '🦹‍♀️', text: 'Professional Chor!' };
    return { emoji: '🏆', text: 'Ultimate Chor Champion!' };
  };

  const renderStarRating = (field, value, max) => {
    return (
      <div className="star-rating">
        {Array.from({ length: max }, (_, index) => (
          <motion.span
            key={index}
            className={`star ${index < value ? 'filled' : ''}`}
            onClick={() => handleInputChange(field, index + 1)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            ⭐
          </motion.span>
        ))}
        <div className="rating-text">
          <motion.span
            key={value}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rating-value"
          >
            {value}/5
          </motion.span>
        </div>
      </div>
    );
  };

  const currentQuestion = questions[currentStep];

  const FullReviewModal = ({ review, onClose }) => (
    <Modal show={!!review} onHide={onClose} size="lg" className="full-review-modal">
      <Modal.Header closeButton className="windows-modal-header">
        <Modal.Title>📋 Full Review Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="windows-modal-body">
        {review && (
          <div className="full-review-content">
            <div className="review-meta">
              <div className="meta-item">
                <strong>📅 Date:</strong> {review.date}
              </div>
              <div className="meta-item">
                <strong>🆔 Review ID:</strong> {review._id || review.id}
              </div>
              <div className="meta-item">
                <strong>⏰ Submitted:</strong> {new Date(review.submittedAt).toLocaleString()}
              </div>
            </div>

            <div className="review-sections">
              <div className="review-section">
                <h4>💖 Likes & Feedback</h4>
                <p>{review.likes || 'No feedback provided'}</p>
              </div>

              <div className="review-section">
                <h4>🎨 Theme Preference</h4>
                <p>{review.preferredTheme ? review.preferredTheme.charAt(0).toUpperCase() + review.preferredTheme.slice(1) : 'Not specified'}</p>
              </div>

              <div className="review-section">
                <h4>🐛 Bug Reports</h4>
                <p>{review.bugsFound || 'No bugs reported'}</p>
              </div>

              <div className="review-section">
                <h4>⚡ Improvements</h4>
                <p>{review.improvements || 'No suggestions provided'}</p>
              </div>

              <div className="review-section">
                <h4>💭 Overall Experience</h4>
                <p>{review.overallExperience || 'No overall experience shared'}</p>
              </div>

              <div className="review-section">
                <h4>🎁 Surprise Reaction</h4>
                <p>{review.surpriseReaction || 'No surprise reaction shared'}</p>
              </div>

              <div className="review-stats-grid">
                <div className="stat-item">
                  <span className="stat-label">😊 Cuteness</span>
                  <span className="stat-value">{review.cutenessRating}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">🏆 Chor Level</span>
                  <span className="stat-value">{review.chorPercentage}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">⭐ Experience Rating</span>
                  <span className="stat-value">{'⭐'.repeat(review.memoryRating)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">📸 Design Rating</span>
                  <span className="stat-value">{'⭐'.repeat(review.designRating)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">✅ Recommendation</span>
                  <span className="stat-value">
                    {review.wouldRecommend === 'yes' ? 'Absolutely! 🎉' : 
                     review.wouldRecommend === 'maybe' ? 'Maybe 🤔' : 
                     review.wouldRecommend === 'no' ? 'Probably not 😢' : 'Not specified'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">⭐ Favorite Feature</span>
                  <span className="stat-value">
                    {review.favoriteFeature ? review.favoriteFeature.charAt(0).toUpperCase() + review.favoriteFeature.slice(1) : 'Not specified'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">🎵 Music Taste</span>
                  <span className="stat-value">
                    {review.musicTaste ? review.musicTaste.charAt(0).toUpperCase() + review.musicTaste.slice(1) : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} className="windows-btn">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const ServerWakeModal = () => {
    return (
      <Modal 
        show={showServerWakeModal} 
        onHide={() => setShowServerWakeModal(false)} 
        backdrop="static" 
        keyboard={false} 
        className="server-wake-modal"
        centered
      >
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>
            <AlertTriangle size={24} className="me-2" />
            Server Asleep 😴
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="display-1 mb-3">🌙</div>
            <h5 className="mb-3">Free Server Hosting Limitations</h5>
            <p className="text-muted mb-4">
              I didn't have money to buy a server, so I'm using a free server hoster that goes down every 20 minutes if unused.
            </p>
            <div className="alert alert-info">
              <strong>Click the "Wake Up Server" button and wait for it to become active.</strong>
              <br />
              This usually takes 30-60 seconds.
            </div>
            
            {/* Server Status Display */}
            {serverStatus === 'checking' && (
              <div className="mt-3">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Checking server status...</span>
              </div>
            )}
            
            {serverStatus === 'waking' && (
              <div className="mt-3 text-warning">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Waking up server... This can take up to 60 seconds</span>
              </div>
            )}
            
            {serverStatus === 'active' && (
              <div className="mt-3 text-success">
                <strong>✅ Server Active!</strong>
                <br />
                <small>You can now submit reviews and access all features.</small>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="warning" 
            onClick={wakeUpServer}
            disabled={wakingServer || serverStatus === 'active'}
            className="w-100 py-2 fw-bold"
          >
            {wakingServer ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {serverStatus === 'waking' ? 'Waking Server...' : 'Starting...'}
              </>
            ) : serverStatus === 'active' ? (
              '✅ Server Ready!'
            ) : (
              <>
                <Loader size={16} className="me-2" />
                Wake Up Server
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (serverLoading && reviews.length === 0) {
    return (
      <div className="review-page windows-98-style">
        <Container className="py-5 mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="windows-content">
                <div className="loading-screen">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={60} />
                  </motion.div>
                  <h3>Connecting to Server...</h3>
                  <p>Please wait while we establish connection</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <ServerWakeModal />
      </div>
    );
  }

  return (
    <div className="review-page windows-98-style">
      {/* Admin Overlay Button */}
      <motion.button
        className="admin-overlay-btn"
        onClick={() => setShowAdmin(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings size={20} />
      </motion.button>

      {/* Server Status Indicator */}
      <div className={`server-status-indicator ${serverConnected ? 'connected' : 'disconnected'}`}>
        {serverConnected ? '🟢 Server Connected' : '🔴 Server Offline'}
        {!serverConnected && (
          <button onClick={() => setShowServerWakeModal(true)} className="windows-btn small ms-2">
            Wake Up
          </button>
        )}
      </div>

      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            {/* Windows 98 Style Title Bar */}
            <motion.div 
              className="windows-title-bar"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="title-bar-left">
                <div className="window-icon">💾</div>
                <h1 className="window-title">Prachi's Review Center.exe</h1>
              </div>
              <div className="title-bar-right">
                <button className="window-btn">_</button>
                <button className="window-btn">□</button>
                <button className="window-btn">×</button>
              </div>
            </motion.div>

            {/* Windows 98 Style Content */}
            <div className="windows-content">
              <Tabs activeKey={activeTab} onSelect={setActiveTab} className="windows-tabs">
                {/* Form Tab */}
                <Tab eventKey="form" title={
                  <span className="tab-title">
                    <FileText size={14} className="tab-icon" />
                    Review Form
                  </span>
                } className="windows-tab">
                  {!serverConnected && (
                    <div className="server-warning">
                      <div className="warning-icon">⚠️</div>
                      <div className="warning-text">
                        <strong>Server is offline.</strong> You can fill the form but won't be able to submit until the server is connected.
                        <button onClick={() => setShowServerWakeModal(true)} className="windows-btn small">
                          Wake Up Server
                        </button>
                      </div>
                    </div>
                  )}

                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="success-screen"
                    >
                      <div className="success-content">
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ duration: 2 }}
                        >
                          <CheckCircle size={80} />
                        </motion.div>
                        <h2>Review Submitted! 🎉</h2>
                        <p>Thank you for your feedback, Prachi chor daka fata! 💖</p>
                        <div className="success-buttons">
                          <button onClick={resetForm} className="windows-btn primary">
                            Submit Another Review
                          </button>
                          <button onClick={() => setActiveTab('reviews')} className="windows-btn">
                            View All Reviews
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <Form onSubmit={handleSubmit} className="windows-form">
                      <div className="form-header">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Crown size={40} />
                        </motion.div>
                        <h2>Review Wizard 🧙‍♀️</h2>
                        <div className="progress-display">
                          Step {currentStep + 1} of {questions.length}
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ x: 300, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{ type: "spring", duration: 0.8 }}
                          className="question-container"
                        >
                          <div className="question-header">
                            <currentQuestion.icon size={24} />
                            <h3>{currentQuestion.title}</h3>
                          </div>

                          <div className="question-content">
                            {currentQuestion.type === 'date' && (
                              <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                className="windows-input"
                              />
                            )}

                            {currentQuestion.type === 'textarea' && (
                              <textarea
                                value={formData[currentQuestion.field]}
                                onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                                placeholder={currentQuestion.placeholder}
                                className="windows-textarea"
                                rows="4"
                              />
                            )}

                            {currentQuestion.type === 'radio' && (
                              <div className="radio-group">
                                {currentQuestion.options.map((option, index) => (
                                  <motion.label
                                    key={option.value}
                                    className="radio-option"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <input
                                      type="radio"
                                      name={currentQuestion.field}
                                      value={option.value}
                                      checked={formData[currentQuestion.field] === option.value}
                                      onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                                    />
                                    <span className="radio-label">
                                      <span className="emoji">{option.emoji}</span>
                                      {option.label}
                                    </span>
                                  </motion.label>
                                ))}
                              </div>
                            )}

                            {currentQuestion.type === 'slider' && (
                              <div className="slider-container">
                                <div className="slider-header">
                                  <span className="slider-value">{formData.cutenessRating}%</span>
                                  <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  >
                                    {getEmojiForRating(formData.cutenessRating).emoji}
                                  </motion.span>
                                </div>
                                <input
                                  type="range"
                                  min={currentQuestion.min}
                                  max={currentQuestion.max}
                                  value={formData.cutenessRating}
                                  onChange={(e) => handleInputChange('cutenessRating', parseInt(e.target.value))}
                                  className="windows-slider"
                                />
                                <div className="slider-labels">
                                  <span>Not Cute 😢</span>
                                  <span>Super Cute 🥰</span>
                                </div>
                              </div>
                            )}

                            {currentQuestion.type === 'chorSlider' && (
                              <div className="slider-container">
                                <div className="slider-header">
                                  <span className="slider-value">{formData.chorPercentage}%</span>
                                  <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    {getChorEmoji(formData.chorPercentage).emoji}
                                  </motion.span>
                                </div>
                                <input
                                  type="range"
                                  min={currentQuestion.min}
                                  max={currentQuestion.max}
                                  value={formData.chorPercentage}
                                  onChange={(e) => handleInputChange('chorPercentage', parseInt(e.target.value))}
                                  className="windows-slider chor"
                                />
                                <div className="chor-text">
                                  <motion.span
                                    key={formData.chorPercentage}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    {getChorEmoji(formData.chorPercentage).text}
                                  </motion.span>
                                </div>
                              </div>
                            )}

                            {currentQuestion.type === 'starRating' && (
                              <div className="star-rating-container">
                                {renderStarRating(currentQuestion.field, formData[currentQuestion.field], currentQuestion.max)}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="form-navigation">
                        <button
                          type="button"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className="windows-btn"
                        >
                          ← Previous
                        </button>

                        {currentStep === questions.length - 1 ? (
                          <motion.button
                            type="submit"
                            disabled={loading || !serverConnected}
                            className="windows-btn primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {loading ? (
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                ⏳
                              </motion.span>
                            ) : (
                              'Submit Review 🚀'
                            )}
                          </motion.button>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={nextStep}
                            className="windows-btn primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Next →
                          </motion.button>
                        )}
                      </div>
                    </Form>
                  )}
                </Tab>

                {/* Reviews Tab */}
                <Tab eventKey="reviews" title={
                  <span className="tab-title">
                    <Database size={14} className="tab-icon" />
                    All Reviews
                  </span>
                } className="windows-tab">
                  <div className="reviews-tab">
                    <div className="reviews-header">
                      <h3>📊 Review Database</h3>
                      <div className="reviews-stats">
                        <span>Total Reviews: {reviews.length}</span>
                        <button onClick={exportReviews} className="windows-btn small" disabled={reviews.length === 0}>
                          <Download size={14} /> Export
                        </button>
                        <button onClick={clearAllReviews} className="windows-btn small danger" disabled={reviews.length === 0}>
                          <Trash2 size={14} /> Clear All
                        </button>
                        <button onClick={retryServerConnection} className="windows-btn small">
                          <Loader size={14} /> Refresh
                        </button>
                      </div>
                    </div>

                    {reviews.length === 0 ? (
                      <div className="no-reviews">
                        <motion.div
                          animate={{ bounce: true }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📝
                        </motion.div>
                        <p>No reviews yet! Be the first to submit one! 🎀</p>
                        {!serverConnected && (
                          <div className="server-warning">
                            <p>Make sure server is connected to submit reviews.</p>
                            <button onClick={() => setShowServerWakeModal(true)} className="windows-btn">
                              Wake Up Server
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="reviews-grid">
                        {reviews.map((review, index) => (
                          <motion.div
                            key={review._id || review.id}
                            className="review-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="review-header">
                              <span className="review-number">#{reviews.length - index}</span>
                              <span className="review-date">
                                {new Date(review.submittedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="review-stats">
                              <div className="stat">
                                <span className="label">Cuteness:</span>
                                <span className="value">{review.cutenessRating}%</span>
                              </div>
                              <div className="stat">
                                <span className="label">Chor Level:</span>
                                <span className="value">{review.chorPercentage}%</span>
                              </div>
                              <div className="stat">
                                <span className="label">Memory:</span>
                                <span className="value">{'⭐'.repeat(review.memoryRating)}</span>
                              </div>
                              <div className="stat">
                                <span className="label">Design:</span>
                                <span className="value">{'⭐'.repeat(review.designRating)}</span>
                              </div>
                            </div>
                            {review.likes && (
                              <div className="review-comment">
                                <strong>Likes:</strong> {review.likes.substring(0, 100)}...
                              </div>
                            )}
                            <div className="review-actions">
                              <button 
                                onClick={() => setShowFullReview(review)}
                                className="windows-btn small view-full-btn"
                              >
                                <Eye size={12} /> View Full Review
                              </button>
                              <button 
                                onClick={() => handleDeleteReview(review._id || review.id)}
                                disabled={deletingReviewId === (review._id || review.id)}
                                className="windows-btn small danger delete-btn"
                              >
                                {deletingReviewId === (review._id || review.id) ? (
                                  <Loader size={12} />
                                ) : (
                                  <Trash2 size={12} />
                                )}
                                Delete Review
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Admin Overlay Modal */}
      <Modal show={showAdmin} onHide={() => setShowAdmin(false)} size="lg" className="admin-modal">
        <Modal.Header closeButton className="windows-modal-header">
          <Modal.Title>🛠️ Admin Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="windows-modal-body">
          <div className="admin-stats">
            <div className="stat-card">
              <h4>Total Reviews</h4>
              <div className="stat-value">{reviews.length}</div>
            </div>
            <div className="stat-card">
              <h4>Server Status</h4>
              <div className="stat-value">{serverConnected ? '🟢 Connected' : '🔴 Offline'}</div>
            </div>
            <div className="stat-card">
              <h4>Avg Cuteness</h4>
              <div className="stat-value">
                {reviews.length > 0 
                  ? Math.round(reviews.reduce((acc, r) => acc + r.cutenessRating, 0) / reviews.length) + '%'
                  : 'N/A'
                }
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <h5>Quick Actions</h5>
            <div className="action-buttons">
              <button onClick={exportReviews} className="windows-btn" disabled={reviews.length === 0}>
                <Download size={16} /> Export JSON
              </button>
              <button onClick={clearAllReviews} className="windows-btn danger" disabled={reviews.length === 0}>
                <Trash2 size={16} /> Clear All Data
              </button>
              <button onClick={() => setActiveTab('reviews')} className="windows-btn">
                <Eye size={16} /> View Reviews
              </button>
              <button onClick={retryServerConnection} className="windows-btn">
                <Loader size={16} /> Refresh Server
              </button>
            </div>
          </div>

          <div className="raw-data">
            <h5>Raw Data Preview</h5>
            <pre className="data-preview">
              {JSON.stringify(reviews.slice(0, 3), null, 2)}
            </pre>
          </div>
        </Modal.Body>
      </Modal>

      {/* Full Review Modal */}
      <FullReviewModal 
        review={showFullReview} 
        onClose={() => setShowFullReview(null)} 
      />

      {/* Server Wake Modal */}
      <ServerWakeModal />
    </div>
  );
};

export default Prachi_Reviews;