// components/PinkSVGBackground.jsx - Ultra Cute Kawaii 120 FPS Background
import React, { useMemo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useTrail } from 'react-spring';
import './PinkSVGBackground.css';

// Adorable Kawaii SVG Shapes
const KawaiiHeart = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 85C30 70 10 50 10 30C10 15 20 5 35 5C42 5 47 8 50 13C53 8 58 5 65 5C80 5 90 15 90 30C90 50 70 70 50 85Z"
      fill="url(#heart-gradient)"
      stroke="#FF1493"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF69B4" />
        <stop offset="100%" stopColor="#FF1493" />
      </linearGradient>
    </defs>
    {/* Cute shine */}
    <ellipse cx="35" cy="25" rx="8" ry="12" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const KawaiiBow = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <g>
      {/* Left bow */}
      <ellipse cx="30" cy="50" rx="20" ry="25" fill="url(#bow-gradient)" stroke="#FF1493" strokeWidth="2" />
      {/* Right bow */}
      <ellipse cx="70" cy="50" rx="20" ry="25" fill="url(#bow-gradient)" stroke="#FF1493" strokeWidth="2" />
      {/* Center knot */}
      <circle cx="50" cy="50" r="12" fill="#FFB6C1" stroke="#FF1493" strokeWidth="2" />
      {/* Ribbons */}
      <path d="M45 60 L35 85" stroke="#FF1493" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 60 L65 85" stroke="#FF1493" strokeWidth="3" strokeLinecap="round" />
    </g>
    <defs>
      <linearGradient id="bow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6C1" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
    </defs>
  </svg>
);

const KawaiiStar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 10 L60 40 L90 45 L65 65 L72 95 L50 80 L28 95 L35 65 L10 45 L40 40 Z"
      fill="url(#star-gradient)"
      stroke="#FFD700"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    {/* Cute sparkles */}
    <circle cx="30" cy="25" r="3" fill="white" opacity="0.8" />
    <circle cx="70" cy="30" r="2" fill="white" opacity="0.8" />
  </svg>
);

const KawaiiFlower = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Petals */}
    <circle cx="50" cy="25" r="15" fill="#FFB6C1" />
    <circle cx="75" cy="50" r="15" fill="#FFC0CB" />
    <circle cx="50" cy="75" r="15" fill="#FFB6C1" />
    <circle cx="25" cy="50" r="15" fill="#FFC0CB" />
    {/* Center */}
    <circle cx="50" cy="50" r="18" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
    {/* Cute face */}
    <circle cx="43" cy="47" r="2" fill="#000" />
    <circle cx="57" cy="47" r="2" fill="#000" />
    <path d="M43 55 Q50 58 57 55" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const KawaiiCloud = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="30" cy="60" rx="20" ry="18" fill="white" opacity="0.9" />
    <ellipse cx="50" cy="55" rx="22" ry="20" fill="white" opacity="0.9" />
    <ellipse cx="70" cy="60" rx="20" ry="18" fill="white" opacity="0.9" />
    {/* Cute face */}
    <circle cx="42" cy="55" r="2" fill="#FF69B4" />
    <circle cx="58" cy="55" r="2" fill="#FF69B4" />
    <ellipse cx="50" cy="62" rx="3" ry="2" fill="#FFB6C1" />
  </svg>
);

const KawaiiButterfly = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Left wings */}
    <ellipse cx="35" cy="40" rx="18" ry="25" fill="url(#butterfly-gradient)" stroke="#FF1493" strokeWidth="1.5" />
    <ellipse cx="30" cy="60" rx="12" ry="18" fill="url(#butterfly-gradient2)" stroke="#FF1493" strokeWidth="1.5" />
    {/* Right wings */}
    <ellipse cx="65" cy="40" rx="18" ry="25" fill="url(#butterfly-gradient)" stroke="#FF1493" strokeWidth="1.5" />
    <ellipse cx="70" cy="60" rx="12" ry="18" fill="url(#butterfly-gradient2)" stroke="#FF1493" strokeWidth="1.5" />
    {/* Body */}
    <ellipse cx="50" cy="50" rx="4" ry="20" fill="#FFB6C1" stroke="#FF1493" strokeWidth="1" />
    {/* Antennae */}
    <path d="M48 32 Q45 25 42 20" stroke="#FF1493" strokeWidth="1.5" fill="none" />
    <path d="M52 32 Q55 25 58 20" stroke="#FF1493" strokeWidth="1.5" fill="none" />
    <circle cx="42" cy="20" r="2" fill="#FF69B4" />
    <circle cx="58" cy="20" r="2" fill="#FF69B4" />
    <defs>
      <linearGradient id="butterfly-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6C1" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
      <linearGradient id="butterfly-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFC0CB" />
        <stop offset="100%" stopColor="#FFB6C1" />
      </linearGradient>
    </defs>
  </svg>
);

// Animated element with react-spring for 120 FPS
const FloatingElement = ({ element, index }) => {
  const shapes = {
    heart: KawaiiHeart,
    bow: KawaiiBow,
    star: KawaiiStar,
    flower: KawaiiFlower,
    cloud: KawaiiCloud,
    butterfly: KawaiiButterfly,
  };

  const ShapeComponent = shapes[element.type];

  // Ultra smooth spring animations - 120 FPS
  const springProps = useSpring({
    from: {
      transform: `translate(0px, 0px) rotate(0deg) scale(1)`,
      opacity: element.opacity
    },
    to: async (next) => {
      while (true) {
        await next({
          transform: `translate(${element.xRange}px, ${-element.yRange}px) rotate(${element.rotation}deg) scale(1.15)`,
          opacity: element.opacity * 1.3
        });
        await next({
          transform: `translate(0px, 0px) rotate(${element.rotation * 2}deg) scale(1)`,
          opacity: element.opacity
        });
      }
    },
    config: { ...config.molasses, tension: 50, friction: 25 }, // Smooth like butter
    delay: element.delay * 1000,
  });

  return (
    <animated.div
      className={`kawaii-element kawaii-${element.type}`}
      style={{
        position: 'absolute',
        left: `${element.x}%`,
        top: `${element.y}%`,
        ...springProps,
      }}
    >
      <ShapeComponent size={element.size} />
    </animated.div>
  );
};

const PinkSVGBackground = () => {
  const elements = useMemo(() => {
    const types = ['heart', 'bow', 'star', 'flower', 'cloud', 'butterfly'];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 30, // 30-70px
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
      yRange: Math.random() * 60 + 40, // 40-100px movement
      xRange: Math.random() * 40 - 20, // -20 to 20px
    }));
  }, []);

  return (
    <div className="pink-svg-background kawaii-background">
      {elements.map((element, index) => (
        <FloatingElement key={element.id} element={element} index={index} />
      ))}
    </div>
  );
};

export default PinkSVGBackground;