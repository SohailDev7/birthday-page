
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const CuteHeart = ({ color = '#FF69B4' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CuteBow = ({ color = '#FF1493' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM6 16c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2H6v-2z" />
    <circle cx="6" cy="8" r="3" />
    <circle cx="18" cy="8" r="3" />
  </svg>
);

const CuteFlower = ({ color = '#FFB6C1' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <circle cx="12" cy="12" r="2.5" fill="#FFD700" />
    <circle cx="12" cy="7" r="3" />
    <circle cx="17" cy="12" r="3" />
    <circle cx="12" cy="17" r="3" />
    <circle cx="7" cy="12" r="3" />
    <circle cx="9" cy="9" r="2.5" />
    <circle cx="15" cy="9" r="2.5" />
    <circle cx="15" cy="15" r="2.5" />
    <circle cx="9" cy="15" r="2.5" />
  </svg>
);

const CuteStar = ({ color = '#FFD700' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CuteCloud = ({ color = '#E0F7FA' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

const CuteRibbon = ({ color = '#FF69B4' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 8l-6 6 1.5 1.5L12 11l4.5 4.5L18 14l-6-6zm0 12l-6-6 1.5-1.5L12 17l4.5-4.5L18 14l-6 6z" />
  </svg>
);

const CuteSparkle = ({ color = '#FFC0CB' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3z" />
    <circle cx="12" cy="12" r="2" fill="#FFE4E1" />
  </svg>
);

const CutePaw = ({ color = '#FFB6C1' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <ellipse cx="12" cy="15" rx="4" ry="3" />
    <circle cx="8" cy="10" r="2" />
    <circle cx="12" cy="8" r="2" />
    <circle cx="16" cy="10" r="2" />
    <circle cx="10" cy="12" r="1.5" />
    <circle cx="14" cy="12" r="1.5" />
  </svg>
);

const FloatingElements = () => {
  const shapes = [CuteHeart, CuteBow, CuteFlower, CuteStar, CuteCloud, CuteRibbon, CuteSparkle, CutePaw];
  const colors = [
    '#FF69B4', 
    '#FFB6C1', 
    '#FF1493', 
    '#FFC0CB', 
    '#FFD700', 
    '#FF6EB4', 
    '#E0BBE4', 
    '#FFDFF5', 
    '#FFE5EC', 
    '#FFF0F5', 
  ];

  const elements = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => {
      const ShapeComponent = shapes[i % shapes.length];
      const color = colors[i % colors.length];

      return {
        id: i,
        Shape: ShapeComponent,
        color,
        size: Math.random() * 30 + 20, 
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15, 
        opacity: Math.random() * 0.4 + 0.3, 
        yRange: Math.random() * 100 + 80, 
        xRange: Math.random() * 30 - 15, 
        rotationRange: Math.random() * 360, 
        scaleVariation: Math.random() * 0.3 + 0.85, 
      };
    }),
    []
  );

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="floating-element cute-element"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.left}%`,
            position: 'absolute',
            bottom: '-50px',
            willChange: 'transform',
          }}
          animate={{
            y: [-50, -element.yRange, -50],
            x: [0, element.xRange, 0],
            rotate: [0, element.rotationRange, element.rotationRange * 2],
            scale: [1, element.scaleVariation, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween",
            repeatType: "loop",
          }}
          initial={false}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              opacity: element.opacity,
            }}
            animate={{
              opacity: [element.opacity, element.opacity * 1.3, element.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <element.Shape color={element.color} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;