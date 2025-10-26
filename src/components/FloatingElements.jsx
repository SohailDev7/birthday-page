// components/FloatingElements.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements = () => {
  // Memoize elements array to prevent recalculation on every render
  const elements = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 15 + 8, // Smaller size range for better performance
      left: Math.random() * 100,
      delay: Math.random() * 3, // Shorter delays
      duration: Math.random() * 8 + 12, // Adjusted duration range
      opacity: Math.random() * 0.2 + 0.1, // Lower opacity range
      yRange: Math.random() * 80 + 40, // Reduced movement range
      xRange: Math.random() * 15 - 7.5 // Reduced horizontal movement
    })),
    [] // Empty dependency array - only calculate once
  );

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.left}%`,
            opacity: element.opacity,
            // Pre-calculate transform values
            transform: 'translateZ(0)' // Force GPU layer
          }}
          animate={{
            y: [0, -element.yRange, 0],
            x: [0, element.xRange, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            // Optimize for performance
            type: "tween",
            repeatType: "loop"
          }}
          // Performance optimizations
          initial={false}
        />
      ))}
    </div>
  );
};

export default FloatingElements;