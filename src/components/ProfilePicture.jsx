// components/ProfilePicture.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import './ProfilePicture.css';
// Import images at the top
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
// Add more imports as needed

const ProfilePicture = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Array of imported images and emojis
  const profileImages = [
    image1, 
    image2,
    image3,
    image4,
    image5,
    '🦋', 
  ];

  const changeProfilePicture = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % profileImages.length);
      setIsRotating(false);
    }, 300);
  };

  const isEmoji = (item) => {
    return typeof item === 'string' && item.length <= 3;
  };

  return (
    <motion.div 
      className="profile-picture-container text-center mb-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <motion.div
        className="profile-picture-wrapper position-relative d-inline-block"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="profile-display display-1"
          animate={{ 
            rotate: isRotating ? 360 : 0,
            scale: isRotating ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
          style={{ 
            cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--soft-primary), var(--soft-secondary))',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3)',
            overflow: 'hidden'
          }}
          onClick={changeProfilePicture}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              className="w-100 h-100 d-flex align-items-center justify-content-center"
            >
              {isEmoji(profileImages[currentImage]) ? (
                <span style={{ fontSize: '3rem' }}>
                  {profileImages[currentImage]}
                </span>
              ) : (
                <img 
                  src={profileImages[currentImage]} 
                  alt="Profile" 
                  className="w-100 h-100 object-fit-cover"
                  style={{ borderRadius: '50%' }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <motion.div
          className="change-icon position-absolute"
          style={{
            bottom: '5px',
            right: '5px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            zIndex: 10
          }}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeProfilePicture}
        >
          <RefreshCw size={16} />
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="mt-2 text-muted small"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Click to change profile
      </motion.p>
    </motion.div>
  );
};

export default ProfilePicture;