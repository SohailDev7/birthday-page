import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Rocket } from 'lucide-react';
const TransportModel = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();

  // Define valid codes and their redirect paths
  const validCodes = {
    'canyouwinme': '/prachi/tictactoe',
    'prachisachor': '/prachi/chor',
    'soilchor': '/prachi/reviews',
    'prachi0614': '/prachi/diary',
    'pringlesxbjclm': '/prachi/poems',
    'prachi-cookie': '/prachi/watchlist'
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCode('');
      setMessage('');
      setIsUnlocked(false);
      
      // Focus input after animation
      setTimeout(() => {
        const input = document.getElementById('transport-input');
        if (input) input.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const enteredCode = code.toLowerCase().trim();
    
    if (validCodes[enteredCode]) {
      setIsUnlocked(true);
      setMessage('🎉 Access granted! Transporting...');
      
      // Redirect after delay
      setTimeout(() => {
        navigate(validCodes[enteredCode]);
        onClose();
      }, 1500);
    } else {
      setMessage('❌ Invalid code. Try again!');
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setMessage(''); // Clear message when typing
  };

  const clearCode = () => {
    setCode('');
    setMessage('');
    const input = document.getElementById('transport-input');
    if (input) input.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="transport-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
        >
          <motion.div
            className="transport-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--soft-card)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Rocket style={{ color: 'var(--soft-primary)' }} />
                <h2 style={{ 
                  margin: 0, 
                  color: 'var(--soft-primary)', 
                  fontFamily: 'var(--font-luxury)',
                  fontSize: '1.5rem'
                }}>
                  Secret Transport
                </h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--soft-text)'
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Instructions */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--soft-text)', marginBottom: '1rem' }}>
                Enter a secret code to unlock hidden features!
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--soft-text)',
                opacity: 0.7
              }}>
                <span>Valid codes: Canyouwinme, Prachisachor, SoilChor, Prachi0614, PringlesxBJCLM</span>
              </div>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleSubmit}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <input
                  id="transport-input"
                  type="text"
                  value={code}
                  onChange={handleChange}
                  placeholder="Enter secret code..."
                  disabled={isUnlocked}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '1rem',
                    color: 'var(--soft-text)',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </motion.div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      margin: '1rem 0',
                      fontWeight: '600',
                      background: isUnlocked 
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(74, 222, 128, 0.2))'
                        : 'rgba(236, 72, 153, 0.1)',
                      color: isUnlocked ? '#16a34a' : 'var(--soft-text)'
                    }}
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.button
                  type="button"
                  onClick={clearCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isUnlocked}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Clear
                </motion.button>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isUnlocked || !code.trim()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--soft-primary), var(--soft-secondary))',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  {isUnlocked ? 'Transporting...' : 'Unlock'}
                </motion.button>
              </div>
            </form>

            {/* Unlocked Animation */}
            <AnimatePresence>
              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '4rem',
                    zIndex: 10
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  >
                    🚀
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransportModel;