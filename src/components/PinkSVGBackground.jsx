// components/PinkSVGBackground.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './PinkSVGBackground.css';

const PinkSVGBackground = () => {
  const createFloatingElements = useMemo(() => {
    const createElements = (count, type) => {
      return Array.from({ length: count }, (_, i) => ({
        id: `${type}-${i}`,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 16, // Smaller, more elegant sizes
        delay: Math.random() * 3,
        duration: Math.random() * 8 + 15, // Slower, more graceful
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1, // Subtle opacity
        yRange: Math.random() * 25 + 15, // Reduced movement
        xRange: Math.random() * 8 - 4 // Minimal horizontal drift
      }));
    };

    return [
      ...createElements(6, 'flower'),
      ...createElements(6, 'heart'),
      ...createElements(7, 'sparkle')
    ];
  }, []);

  const getSVGShape = (type, size) => {
    const baseSize = size;
    
    switch(type) {
      case 'flower':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 24 24">
            <path
              d="M12 3C8.5 3 5 5.5 5 9c0 3.5 3 7 7 9 4-2 7-5.5 7-9 0-3.5-3.5-6-7-6zm0 2c2.5 0 5 2 5 5 0 2-2 4.5-5 6-3-1.5-5-4-5-6 0-3 2.5-5 5-5z"
              fill="currentColor"
            />
            <circle cx="12" cy="9" r="2" fill="currentColor" />
          </svg>
        );
      
      case 'heart':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        );
      
      case 'sparkle':
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 24 24">
            <path
              d="M12 2L9 12 2 12l7 8 2-10 2 10 7-8-7-2z"
              fill="currentColor"
            />
            <circle cx="18" cy="6" r="1.5" fill="currentColor" />
            <circle cx="6" cy="18" r="1.5" fill="currentColor" />
          </svg>
        );
      
      default:
        return (
          <svg width={baseSize} height={baseSize} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div className="pink-svg-background">
      {createFloatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`svg-element svg-${element.type}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            rotate: element.rotation,
            color: 'currentColor'
          }}
          animate={{
            y: [0, -element.yRange, 0],
            x: [0, element.xRange, 0],
            rotate: [element.rotation, element.rotation + 180, element.rotation + 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween"
          }}
          initial={false}
        >
          {getSVGShape(element.type, element.size)}
        </motion.div>
      ))}
    </div>
  );
};

export default PinkSVGBackground;