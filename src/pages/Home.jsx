import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pixelated Sun Component
const PixelSun = () => (
  <div className="relative w-16 h-16 bg-yellow-400 border-4 border-yellow-600 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
    style={{ imageRendering: 'pixelated' }}>
    <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-300 opacity-80" />
  </div>
);

// Pixelated Moon Component
const PixelMoon = () => (
  <div className="relative w-14 h-14 bg-gray-200 border-4 border-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
    style={{ imageRendering: 'pixelated' }}>
    <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300" />
    <div className="absolute bottom-3 right-3 w-4 h-4 bg-gray-300" />
    <div className="absolute top-8 left-4 w-2 h-2 bg-gray-300" />
  </div>
);


// Pixelated Cloud Component - True Blocky
const PixelCloud = ({ delay = 0, yPosition = '15%', size = 1, speed = 30, timeOfDay = 'day' }) => {
  const p = 4;
  // Determine cloud colors based on time of day
  const getCloudColor = () => {
    switch (timeOfDay) {
      case 'sunset': return '#FFE4E1';
      case 'night': return '#2C3E50';
      case 'twilight': return '#4B0082';
      default: return '#fff';
    }
  };
  const c = getCloudColor();

  return (
    <motion.div
      className="absolute"
      style={{ top: yPosition, left: '-200px' }}
      animate={{ left: '110%' }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}
    >
      <div className="relative" style={{ transform: `scale(${size})` }}>
        {/* Simple Block Cloud 4x scale */}
        <div className="relative" style={{ width: p * 16, height: p * 8 }}>
          {/* Main block */}
          <div className="absolute" style={{ left: p * 2, top: p * 2, width: p * 12, height: p * 4, background: c }} />
          {/* Top bump */}
          <div className="absolute" style={{ left: p * 4, top: 0, width: p * 6, height: p * 2, background: c }} />
          {/* Bottom bump */}
          <div className="absolute" style={{ left: p * 3, top: p * 6, width: p * 8, height: p * 2, background: c }} />
        </div>
      </div>
    </motion.div>
  );
};

// Pixelated Bird Component - True Blocky
const PixelBird = ({ delay = 0, yPosition = '20%', duration = 15 }) => {
  const p = 4;
  return (
    <motion.div
      className="absolute"
      style={{ top: yPosition, left: '-100px' }}
      animate={{ left: '110%' }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}
    >
      <motion.div
        animate={{
          y: [0, -4, 0, -4, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="relative" style={{ width: p * 8, height: p * 6 }}>
          {/* Body */}
          <div className="absolute bg-white" style={{ left: p * 2, top: p * 2, width: p * 4, height: p * 2 }} />
          {/* Head */}
          <div className="absolute bg-white" style={{ left: p * 5, top: p * 1, width: p * 2, height: p * 2 }} />
          {/* Beak */}
          <div className="absolute bg-yellow-400" style={{ left: p * 7, top: p * 2, width: p * 1, height: p * 1 }} />
          {/* Wing Flap */}
          <motion.div
            style={{ left: p * 3, top: p * 1, width: p * 4, height: p * 1, transformOrigin: 'bottom center' }}
            className="absolute bg-gray-200"
            animate={{ rotate: [0, -30, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          {/* Tail */}
          <div className="absolute bg-white" style={{ left: 0, top: p * 2, width: p * 2, height: p * 1 }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pixelated Bee Component - True Blocky
const PixelBee = ({ delay = 0, yPosition = '40%', duration = 15 }) => {
  const p = 4;
  return (
    <motion.div
      className="absolute"
      style={{ top: yPosition, left: '-100px' }}
      animate={{ left: '110%' }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="relative" style={{ width: p * 6, height: p * 5 }}>
          {/* Body Stripes */}
          <div className="absolute bg-yellow-400" style={{ left: p * 1, top: p * 1, width: p * 1, height: p * 3 }} />
          <div className="absolute bg-black" style={{ left: p * 2, top: p * 1, width: p * 1, height: p * 3 }} />
          <div className="absolute bg-yellow-400" style={{ left: p * 3, top: p * 1, width: p * 1, height: p * 3 }} />
          <div className="absolute bg-black" style={{ left: p * 4, top: p * 1, width: p * 1, height: p * 3 }} />

          {/* Head */}
          <div className="absolute bg-yellow-400" style={{ left: 0, top: p * 1, width: p * 1, height: p * 2 }} />
          <div className="absolute bg-black" style={{ left: 0, top: p * 1, width: p * 1, height: p * 1 }} /> {/* Eye */}

          {/* Stinger */}
          <div className="absolute bg-black" style={{ left: p * 5, top: p * 2, width: p * 1, height: p * 1 }} />

          {/* Wings */}
          <motion.div
            style={{ left: p * 2, top: -p * 1, width: p * 2, height: p * 2, transformOrigin: 'bottom center' }}
            className="absolute bg-white opacity-80"
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Advanced Pixelated Pig Component with Grazing & Complex Animations
// Helper for consistent keyframes
const generateWalkKeyframes = (p) => {
  const times = [], legRot = [], legRotOpp = [], body = [], tail = [];
  const steps = 200; // Higher resolution for smooth movement

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    times.push(t);

    // Walking phases: 0-0.4 (move right) and 0.5-0.9 (move left)
    // Stop phases: 0.4-0.5 and 0.9-1.0
    const isWalking = (t >= 0 && t <= 0.4) || (t >= 0.5 && t <= 0.9);

    if (isWalking) {
      // Speed factor: how fast legs move
      const speed = 50;
      const angle = Math.sin(t * speed) * 25;
      legRot.push(angle);
      legRotOpp.push(-angle);
      // Bounce logic
      body.push(Math.abs(Math.sin(t * speed)) * -p);
      // Tail wag
      tail.push(Math.cos(t * speed) * 20);
    } else {
      legRot.push(0);
      legRotOpp.push(0);
      body.push(0);
      tail.push(0);
    }
  }
  return { times, legRot, legRotOpp, body, tail };
};

// Advanced Pixelated Pig - PATROL MODE
const PixelPig = ({ delay = 0, duration = 25, yOffset = 0, scale = 1, startPos = '10%', endPos = '60%' }) => {
  const p = 4;
  const { times, legRot, legRotOpp, body, tail } = generateWalkKeyframes(p);
  const startOffset = -delay;

  return (
    <motion.div
      className="absolute"
      style={{ bottom: '80px', marginBottom: yOffset, zIndex: 10 }}
      initial={{ left: startPos }}
      animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
      transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
    >
      <motion.div
        animate={{ scaleX: [-scale, -scale, scale, scale] }}
        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
      >
        <motion.div
          animate={{ y: body }}
          transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          className="relative"
          style={{ width: p * 18, height: p * 12 }}
        >
          <LegsPig times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

          {/* Body - BLOCKY */}
          <div className="absolute bg-pink-400" style={{ left: p * 4, top: p * 3, width: p * 12, height: p * 7 }} />
          <div className="absolute bg-pink-300" style={{ left: p * 5, top: p * 4, width: p * 10, height: p * 5 }} /> {/* Belly highlight */}

          {/* Curly Tail - BLOCKY */}
          <motion.div
            className="absolute"
            style={{ left: p * 15, top: p * 5, originX: 0, originY: 0.5 }}
            animate={{ rotate: tail }}
            transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          >
            <div className="absolute bg-pink-500" style={{ width: p, height: p, left: 0, top: 0 }} />
            <div className="absolute bg-pink-500" style={{ width: p, height: p, left: p, top: -p }} />
            <div className="absolute bg-pink-500" style={{ width: p, height: p, left: p * 2, top: 0 }} />
          </motion.div>

          {/* Head - BLOCKY with eating animation */}
          <motion.div
            className="absolute bg-pink-400"
            style={{ left: 0, top: p * 1, width: p * 8, height: p * 8 }}
            animate={{ y: [0, 0, p * 2, 0, 0, 0, p * 2, 0, 0], rotate: [0, 0, 5, 0, 0, 0, 5, 0, 0] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
          >
            {/* Ears - BLOCKY */}
            <div className="absolute bg-pink-500" style={{ left: p * 0.5, top: 0, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-pink-500" style={{ right: p * 0.5, top: 0, width: p * 2, height: p * 2 }} />

            {/* Eyes - BLOCKY */}
            <div className="absolute bg-black" style={{ left: p * 1.5, top: p * 3, width: p, height: p }} />
            <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 3, width: p, height: p }} />

            {/* Snout - BLOCKY PROMINENT */}
            <div className="absolute bg-pink-500" style={{ left: p * 1.5, top: p * 5, width: p * 5, height: p * 3 }} />
            <div className="absolute bg-pink-300" style={{ left: p * 2, top: p * 5.5, width: p * 4, height: p * 2 }} />

            {/* Nostrils - BLOCKY */}
            <div className="absolute bg-pink-700" style={{ left: p * 2.5, top: p * 6.5, width: p, height: p }} />
            <div className="absolute bg-pink-700" style={{ left: p * 4.5, top: p * 6.5, width: p, height: p }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LegsPig = ({ times, rotate, rotateOpp, duration, p, delay }) => (
  <>
    <motion.div style={{ left: p * 11, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-700"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 5, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-700"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 12, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-600"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 6, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-600"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
  </>
);

// Advanced Pixelated Cow - PATROL MODE
const PixelCow = ({ delay = 0, duration = 30, yOffset = 0, scale = 1, startPos = '20%', endPos = '80%' }) => {
  const p = 4;
  const { times, legRot, legRotOpp, body, tail } = generateWalkKeyframes(p);
  const startOffset = -delay;

  return (
    <motion.div
      className="absolute"
      style={{ bottom: '80px', marginBottom: yOffset, zIndex: 11 }} // Fixed floating
      initial={{ left: startPos }}
      animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
      transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
    >
      <motion.div
        animate={{ scaleX: [-scale, -scale, scale, scale] }}
        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
      >
        <motion.div
          animate={{ y: body }}
          transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          className="relative"
          style={{ width: p * 18, height: p * 12 }}
        >
          <LegsCow times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />
          <div className="absolute bg-white" style={{ left: p * 5, top: p * 2, width: p * 12, height: p * 7 }} />
          <div className="absolute bg-black" style={{ left: p * 7, top: p * 3, width: p * 3, height: p * 2 }} />
          <div className="absolute bg-black" style={{ left: p * 13, top: p * 5, width: p * 2, height: p * 3 }} />
          <motion.div
            className="absolute"
            style={{ left: p * 16, top: p * 3, originX: 0, originY: 0 }}
            animate={{ rotate: tail }}
            transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          >
            <div className="absolute bg-gray-300" style={{ width: p, height: p * 4, left: 0, top: 0 }} />
            <div className="absolute bg-black" style={{ width: p, height: p, left: 0, top: p * 4 }} />
          </motion.div>
          <motion.div
            className="absolute bg-gray-200"
            style={{ left: p * 0, top: p * 0, width: p * 7, height: p * 7 }}
            animate={{ y: [0, 0, p * 3, 0, 0, 0, p * 3, 0, 0] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
          >
            <div className="absolute bg-white" style={{ left: p * 1, top: p * 1, width: p * 5, height: p * 5 }} />
            <div className="absolute bg-gray-400" style={{ left: p * 1, top: 0, width: p * 1, height: p * 2 }} />
            <div className="absolute bg-gray-400" style={{ left: p * 5, top: 0, width: p * 1, height: p * 2 }} />
            <div className="absolute bg-black" style={{ left: p * 1, top: p * 3, width: p * 1, height: p * 1 }} />
            <div className="absolute bg-black" style={{ left: p * 5, top: p * 3, width: p * 1, height: p * 1 }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LegsCow = ({ times, rotate, rotateOpp, duration, p, delay }) => (
  <>
    <motion.div style={{ left: p * 13, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-gray-400"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 6, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-gray-400"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 14, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-white"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }}>
      <div className="absolute bottom-0 w-full h-2 bg-black" />
    </motion.div>
    <motion.div style={{ left: p * 7, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-white"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }}>
      <div className="absolute bottom-0 w-full h-2 bg-black" />
    </motion.div>
  </>
);

// Advanced Pixelated Panda - PATROL MODE (LOOKS LIKE REAL PANDA)
const PixelPanda = ({ delay = 0, duration = 28, yOffset = 0, scale = 1, startPos = '15%', endPos = '50%' }) => {
  const p = 4;
  const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
  const startOffset = -delay;

  return (
    <motion.div
      className="absolute"
      style={{ bottom: '80px', marginBottom: yOffset, zIndex: 12 }}
      initial={{ left: startPos }}
      animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
      transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.3, 0.5, 0.8, 1], ease: 'linear' }}
    >
      <motion.div
        animate={{ scaleX: [-scale, -scale, scale, scale] }}
        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
      >
        <motion.div
          animate={{ y: body }}
          transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          className="relative"
          style={{ width: p * 16, height: p * 14 }}
        >
          <LegsPanda times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

          {/* White Body */}
          <div className="absolute bg-white" style={{ left: p * 3, top: p * 4, width: p * 12, height: p * 8 }} />
          <div className="absolute bg-gray-100" style={{ left: p * 4, top: p * 5, width: p * 10, height: p * 6 }} /> {/* Belly */}

          {/* Black shoulder patches */}
          <div className="absolute bg-black" style={{ left: p * 3, top: p * 6, width: p * 3, height: p * 4 }} />
          <div className="absolute bg-black" style={{ left: p * 12, top: p * 6, width: p * 3, height: p * 4 }} />

          {/* Head - Eating/Looking animation */}
          <motion.div
            className="absolute bg-white"
            style={{ left: 0, top: 0, width: p * 8, height: p * 8 }}
            animate={{ y: [0, 0, p * 2, 0, 0, 0, p * 2, 0, 0], rotate: [0, 0, 8, 0, 0, 0, 8, 0, 0] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.3, 0.32, 0.38, 0.4, 0.8, 0.82, 0.88, 0.9] }}
          >
            {/* Black rounded ears - BLOCKY */}
            <div className="absolute bg-black" style={{ left: p * 0.5, top: p * 0.5, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 0.5, width: p * 2, height: p * 2 }} />

            {/* Black eye patches - PANDA SIGNATURE */}
            <div className="absolute bg-black" style={{ left: p * 1, top: p * 3, width: p * 2.5, height: p * 3 }} />
            <div className="absolute bg-black" style={{ left: p * 4.5, top: p * 3, width: p * 2.5, height: p * 3 }} />

            {/* White eyes inside black patches */}
            <div className="absolute bg-white" style={{ left: p * 1.5, top: p * 4, width: p * 1.5, height: p * 1.5 }} />
            <div className="absolute bg-white" style={{ left: p * 5, top: p * 4, width: p * 1.5, height: p * 1.5 }} />

            {/* Black pupils */}
            <div className="absolute bg-black" style={{ left: p * 2, top: p * 4.5, width: p * 0.5, height: p * 0.5 }} />
            <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 4.5, width: p * 0.5, height: p * 0.5 }} />

            {/* Black nose */}
            <div className="absolute bg-black" style={{ left: p * 3.5, top: p * 6, width: p, height: p }} />

            {/* Bamboo - appears when eating */}
            <motion.div
              className="absolute bg-green-600"
              style={{ left: -p * 3, top: p * 5, width: p * 1, height: p * 6 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0] }}
              transition={{ duration, repeat: Infinity, times: [0, 0.3, 0.31, 0.39, 0.4, 0.8, 0.81, 0.89, 0.9], delay: startOffset }}
            >
              <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 1 }} />
              <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 3 }} />
              <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 5 }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LegsPanda = ({ times, rotate, rotateOpp, duration, p, delay }) => (
  <>
    <motion.div style={{ left: p * 10, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 4, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 11, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 5, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
  </>
);

// Just keep animals - no human characters or events needed

// Fireflies (for night/twilight) - PIXELATED MINECRAFT STYLE
const Fireflies = () => {
  const fireflies = React.useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 40 + Math.random() * 50,
    moveX: Math.random() * 100 - 50,
    moveY: Math.random() * 100 - 50,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 3
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
            imageRendering: 'pixelated'
          }}
          animate={{
            x: [0, fly.moveX, 0],
            y: [0, fly.moveY, 0],
            opacity: [0.3, 1, 1, 0.3],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            delay: fly.delay,
            ease: 'easeInOut'
          }}
        >
          {/* Pixelated firefly - blocky Minecraft style */}
          <div className="relative" style={{ imageRendering: 'pixelated' }}>
            {/* Glowing center pixel */}
            <div className="w-2 h-2 bg-yellow-300 border border-yellow-400"
              style={{
                boxShadow: '0 0 0 2px #FFD700, 0 0 0 4px rgba(255,215,0,0.7), 0 0 0 6px rgba(255,215,0,0.5), 0 0 0 8px rgba(255,215,0,0.3), 0 0 8px 4px rgba(255,215,0,0.8), 0 0 12px 6px rgba(255,215,0,0.6), 0 0 16px 8px rgba(255,215,0,0.4)',
                imageRendering: 'pixelated'
              }}
            />
            {/* Bright core */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-100"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Cute Pixelated Deer - Only for Prachi
const PixelDeer = ({ delay = 0, duration = 28, yOffset = 0, scale = 1, startPos = '5%', endPos = '45%' }) => {
  const p = 4;
  const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
  const startOffset = -delay;

  return (
    <motion.div
      className="absolute"
      style={{ bottom: '70px', marginBottom: yOffset, zIndex: 12 }}
      initial={{ left: startPos }}
      animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
      transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
    >
      <motion.div
        animate={{ scaleX: [-scale, -scale, scale, scale] }}
        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
      >
        <motion.div
          animate={{ y: body }}
          transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          className="relative"
          style={{ width: p * 20, height: p * 20 }}
        >
          {/* Legs - Thin deer legs */}
          <LegsDeer times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

          {/* Body - Sleek brown body */}
          <div className="absolute bg-amber-700" style={{ left: p * 6, top: p * 8, width: p * 10, height: p * 6 }} />
          <div className="absolute bg-amber-600" style={{ left: p * 7, top: p * 9, width: p * 8, height: p * 4 }} /> {/* Belly highlight */}

          {/* Neck */}
          <div className="absolute bg-amber-700" style={{ left: p * 4, top: p * 6, width: p * 4, height: p * 6 }} />

          {/* Cute tail with pink */}
          <motion.div
            className="absolute"
            style={{ left: p * 15, top: p * 10, originX: 0, originY: 0.5 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute bg-amber-800" style={{ width: p, height: p * 3, left: 0, top: 0 }} />
            <div className="absolute bg-pink-300" style={{ width: p, height: p, left: 0, top: 0 }} /> {/* Pink tip */}
          </motion.div>

          {/* Head - Cute deer head */}
          <motion.div
            className="absolute bg-amber-700"
            style={{ left: 0, top: p * 2, width: p * 7, height: p * 7 }}
            animate={{ y: [0, 0, p, 0, 0, 0, p, 0, 0] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
          >
            {/* Adorable antlers - Pink tips for cuteness */}
            <div className="absolute bg-amber-900" style={{ left: p * 1, top: -p * 2, width: p, height: p * 3 }} />
            <div className="absolute bg-pink-400" style={{ left: p, top: -p * 3, width: p, height: p * 2 }} /> {/* Left antler pink */}
            <div className="absolute bg-amber-900" style={{ right: p, top: -p * 2, width: p, height: p * 3 }} />
            <div className="absolute bg-pink-400" style={{ right: p, top: -p * 3, width: p, height: p * 2 }} /> {/* Right antler pink */}

            {/* Cute big eyes */}
            <div className="absolute bg-white" style={{ left: p * 1.5, top: p * 2.5, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-black" style={{ left: p * 2, top: p * 3, width: p, height: p }} />
            <div className="absolute bg-white" style={{ right: p * 1.5, top: p * 2.5, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-black" style={{ right: p * 2, top: p * 3, width: p, height: p }} />

            {/* Cute pink nose */}
            <div className="absolute bg-pink-400" style={{ left: p * 2.5, top: p * 5, width: p * 2, height: p }} />

            {/* Ears - Pointy */}
            <div className="absolute bg-amber-700" style={{ left: p, top: 0, width: p * 1.5, height: p * 2 }} />
            <div className="absolute bg-pink-200" style={{ left: p * 1.2, top: p * 0.5, width: p, height: p }} /> {/* Pink inner ear */}
            <div className="absolute bg-amber-700" style={{ right: p, top: 0, width: p * 1.5, height: p * 2 }} />
            <div className="absolute bg-pink-200" style={{ right: p * 1.2, top: p * 0.5, width: p, height: p }} /> {/* Pink inner ear */}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LegsDeer = ({ times, rotate, rotateOpp, duration, p, delay }) => (
  <>
    {/* Back legs - thinner */}
    <motion.div style={{ left: p * 12, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 14, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    {/* Front legs */}
    <motion.div style={{ left: p * 7, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 9, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    {/* Hooves - black */}
    <motion.div style={{ left: p * 12, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 14, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 7, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 9, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
  </>
);

// Adorable Baby Fawn - Smaller companion
const PixelFawn = ({ delay = 0, duration = 28, yOffset = 0, scale = 0.7, startPos = '8%', endPos = '48%' }) => {
  const p = 3; // Smaller pixel size for baby
  const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
  const startOffset = -delay;

  return (
    <motion.div
      className="absolute"
      style={{ bottom: '70px', marginBottom: yOffset, zIndex: 13 }}
      initial={{ left: startPos }}
      animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
      transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
    >
      <motion.div
        animate={{ scaleX: [-scale, -scale, scale, scale] }}
        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
      >
        <motion.div
          animate={{ y: body }}
          transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
          className="relative"
          style={{ width: p * 16, height: p * 16 }}
        >
          {/* Baby legs - even thinner */}
          <LegsFawn times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

          {/* Small body with spots */}
          <div className="absolute bg-amber-600" style={{ left: p * 5, top: p * 7, width: p * 8, height: p * 5 }} />
          <div className="absolute bg-amber-500" style={{ left: p * 6, top: p * 8, width: p * 6, height: p * 3 }} /> {/* Belly */}
          {/* Cute spots */}
          <div className="absolute bg-white" style={{ left: p * 7, top: p * 8, width: p, height: p }} />
          <div className="absolute bg-white" style={{ left: p * 10, top: p * 9, width: p, height: p }} />

          {/* Short neck */}
          <div className="absolute bg-amber-600" style={{ left: p * 3, top: p * 5, width: p * 3, height: p * 5 }} />

          {/* Tiny tail with pink */}
          <motion.div
            className="absolute"
            style={{ left: p * 12, top: p * 8, originX: 0, originY: 0.5 }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute bg-amber-700" style={{ width: p, height: p * 2, left: 0, top: 0 }} />
            <div className="absolute bg-pink-300" style={{ width: p, height: p * 0.5, left: 0, top: 0 }} />
          </motion.div>

          {/* Adorable baby head - bigger eyes */}
          <motion.div
            className="absolute bg-amber-600"
            style={{ left: 0, top: p * 2, width: p * 6, height: p * 6 }}
            animate={{ y: [0, 0, p * 0.5, 0, 0, 0, p * 0.5, 0, 0] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
          >
            {/* Tiny antler buds - pink */}
            <div className="absolute bg-pink-400" style={{ left: p * 1.5, top: -p, width: p * 0.5, height: p }} />
            <div className="absolute bg-pink-400" style={{ right: p * 1.5, top: -p, width: p * 0.5, height: p }} />

            {/* HUGE cute baby eyes */}
            <div className="absolute bg-white" style={{ left: p, top: p * 2, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-black" style={{ left: p * 1.2, top: p * 2.5, width: p * 1.2, height: p * 1.2 }} />
            <div className="absolute bg-white" style={{ right: p, top: p * 2, width: p * 2, height: p * 2 }} />
            <div className="absolute bg-black" style={{ right: p * 1.2, top: p * 2.5, width: p * 1.2, height: p * 1.2 }} />
            {/* Eye sparkles */}
            <div className="absolute bg-white" style={{ left: p * 1.8, top: p * 2.7, width: p * 0.4, height: p * 0.4 }} />
            <div className="absolute bg-white" style={{ right: p * 1.8, top: p * 2.7, width: p * 0.4, height: p * 0.4 }} />

            {/* Tiny pink nose */}
            <div className="absolute bg-pink-400" style={{ left: p * 2, top: p * 4.5, width: p * 2, height: p * 0.5 }} />

            {/* Small ears */}
            <div className="absolute bg-amber-600" style={{ left: p * 0.5, top: p * 0.5, width: p, height: p * 1.5 }} />
            <div className="absolute bg-pink-200" style={{ left: p * 0.7, top: p, width: p * 0.6, height: p * 0.8 }} />
            <div className="absolute bg-amber-600" style={{ right: p * 0.5, top: p * 0.5, width: p, height: p * 1.5 }} />
            <div className="absolute bg-pink-200" style={{ right: p * 0.7, top: p, width: p * 0.6, height: p * 0.8 }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LegsFawn = ({ times, rotate, rotateOpp, duration, p, delay }) => (
  <>
    {/* Back legs - tiny */}
    <motion.div style={{ left: p * 9.5, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 11, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    {/* Front legs */}
    <motion.div style={{ left: p * 6, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 7.5, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    {/* Tiny hooves */}
    <motion.div style={{ left: p * 9.5, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 11, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 6, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    <motion.div style={{ left: p * 7.5, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
      animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
  </>
);

// Butterflies (for day/sunset) - PIXELATED MINECRAFT STYLE
const Butterflies = () => {
  const butterflies = React.useMemo(() => [...Array(8)].map((_, i) => {
    const colors = ['#FF69B4', '#FFA500', '#9370DB', '#FFD700', '#FF1493'];
    const color = colors[i % colors.length];
    const darkColor = i % 5 === 0 ? '#C71585' : i % 5 === 1 ? '#CC8400' : i % 5 === 2 ? '#6B46A1' : i % 5 === 3 ? '#CCB700' : '#B8005D';

    return {
      id: i,
      color,
      darkColor,
      left: Math.random() * 100,
      top: 20 + Math.random() * 40,
      moveX: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
      moveY: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 4
    };
  }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {butterflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
          }}
          animate={{
            x: fly.moveX,
            y: fly.moveY,
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            delay: fly.delay,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            animate={{ scaleX: [1, -1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ imageRendering: 'pixelated' }}
          >
            {/* Pixelated blocky butterfly */}
            <div className="relative" style={{ imageRendering: 'pixelated' }}>
              <motion.div
                animate={{ scaleX: [1, 0.8, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                style={{ transformOrigin: 'center' }}
              >
                {/* Left wing - blocky pixels */}
                <div className="absolute" style={{ left: '-6px', top: '0px' }}>
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '0px', left: '2px' }} />
                  <div className="w-2 h-2 absolute" style={{ top: '0px', left: '4px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', left: '0px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', left: '2px', background: fly.darkColor }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', left: '4px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '4px', left: '2px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '4px', left: '4px', background: fly.darkColor }} />
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '6px', left: '2px' }} />
                </div>

                {/* Right wing - blocky pixels */}
                <div className="absolute" style={{ right: '-6px', top: '0px' }}>
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '0px', right: '2px' }} />
                  <div className="w-2 h-2 absolute" style={{ top: '0px', right: '4px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', right: '0px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', right: '2px', background: fly.darkColor }} />
                  <div className="w-2 h-2 absolute" style={{ top: '2px', right: '4px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '4px', right: '2px', background: fly.color }} />
                  <div className="w-2 h-2 absolute" style={{ top: '4px', right: '4px', background: fly.darkColor }} />
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '6px', right: '2px' }} />
                </div>

                {/* Body - pixelated */}
                <div className="relative">
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '0px', left: '0px' }} />
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '2px', left: '0px' }} />
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '4px', left: '0px' }} />
                  <div className="w-2 h-2 bg-black absolute" style={{ top: '6px', left: '0px' }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Stars for night/twilight
const Stars = () => {
  const stars = React.useMemo(() => [...Array(30)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 60,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            imageRendering: 'pixelated',
            boxShadow: '0 0 3px #fff'
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay
          }}
        />
      ))}
    </div>
  );
};

// Pixelated Tree Component - Grows from Sapling to Tree in 3 mins
const PixelTree = () => {
  const [stage, setStage] = React.useState(0);
  const p = 4; // pixel scale

  React.useEffect(() => {
    // 0 -> 1 (Sapling -> Small): 60s
    // 1 -> 2 (Small -> Medium): 120s
    // 2 -> 3 (Medium -> Large): 180s
    const interval = setInterval(() => {
      setStage(s => Math.min(s + 1, 3));
    }, 60000); // Check every minute (adjust for smoother if needed, but per request 3 mins)

    return () => clearInterval(interval);
  }, []);

  // Terraria Tree Colors
  const trunkColor = '#5C3C24'; // Dark brown
  const darkTrunk = '#3E2723';
  const leafColor = '#38B44A'; // Forest green
  const darkLeaf = '#2E7D32';

  return (
    <div className="absolute" style={{ bottom: '80px', left: '80%', zIndex: 9 }}>
      {/* Stage 0: Sapling (0-60s) */}
      {stage === 0 && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="relative"
          style={{ width: p * 4, height: p * 6 }}
        >
          {/* Stem */}
          <div className="absolute" style={{ left: p * 1.5, top: p * 4, width: p, height: p * 2, background: trunkColor }} />
          {/* Leaves */}
          <div className="absolute" style={{ left: p * 1, top: p * 2, width: p * 2, height: p * 2, background: leafColor }} />
          <div className="absolute" style={{ left: p * 0.5, top: p * 3, width: p * 3, height: p, background: darkLeaf }} />
        </motion.div>
      )}

      {/* Stage 1: Small Tree (60-120s) */}
      {stage === 1 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
          style={{ width: p * 8, height: p * 12 }}
        >
          {/* Trunk */}
          <div className="absolute" style={{ left: p * 3, top: p * 6, width: p * 2, height: p * 6, background: trunkColor }} />
          <div className="absolute" style={{ left: p * 3, top: p * 11, width: p * 2, height: p, background: darkTrunk }} />
          {/* Canopy */}
          <div className="absolute" style={{ left: p * 1, top: p * 2, width: p * 6, height: p * 4, background: leafColor }} />
          <div className="absolute" style={{ left: 0, top: p * 3, width: p * 8, height: p * 2, background: darkLeaf, opacity: 0.3 }} />
          <div className="absolute" style={{ left: p * 2, top: 0, width: p * 4, height: p * 2, background: leafColor }} />
        </motion.div>
      )}

      {/* Stage 2: Medium Tree (120-180s) */}
      {stage === 2 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
          style={{ width: p * 12, height: p * 20 }}
        >
          {/* Trunk */}
          <div className="absolute" style={{ left: p * 5, top: p * 8, width: p * 2, height: p * 12, background: trunkColor }} />
          <div className="absolute" style={{ left: p * 5, top: p * 19, width: p * 2, height: p, background: darkTrunk }} />
          {/* Branch left */}
          <div className="absolute" style={{ left: p * 3, top: p * 10, width: p * 2, height: p, background: trunkColor }} />

          {/* Canopy */}
          <div className="absolute" style={{ left: p * 2, top: p * 2, width: p * 8, height: p * 6, background: leafColor }} />
          <div className="absolute" style={{ left: 0, top: p * 4, width: p * 12, height: p * 4, background: leafColor }} />
          <div className="absolute" style={{ left: p * 3, top: 0, width: p * 6, height: p * 2, background: leafColor }} />
          {/* Detail pixels */}
          <div className="absolute" style={{ left: p * 2, top: p * 4, width: p, height: p, background: darkLeaf }} />
          <div className="absolute" style={{ left: p * 9, top: p * 3, width: p, height: p, background: darkLeaf }} />
        </motion.div>
      )}

      {/* Stage 3: Large Tree (180s+) */}
      {stage === 3 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
          style={{ width: p * 16, height: p * 30 }}
        >
          {/* Trunk */}
          <div className="absolute" style={{ left: p * 7, top: p * 10, width: p * 2, height: p * 20, background: trunkColor }} />
          <div className="absolute" style={{ left: p * 6, top: p * 28, width: p * 4, height: p * 2, background: darkTrunk }} /> {/* Base */}

          {/* Branches */}
          <div className="absolute" style={{ left: p * 4, top: p * 14, width: p * 3, height: p, background: trunkColor }} />
          <div className="absolute" style={{ left: p * 9, top: p * 12, width: p * 3, height: p, background: trunkColor }} />

          {/* Main Canopy */}
          <div className="absolute" style={{ left: p * 3, top: p * 2, width: p * 10, height: p * 8, background: leafColor }} />
          <div className="absolute" style={{ left: p * 1, top: p * 5, width: p * 14, height: p * 6, background: leafColor }} />
          <div className="absolute" style={{ left: p * 5, top: 0, width: p * 6, height: p * 3, background: leafColor }} />

          {/* Side leaf puffs */}
          <div className="absolute" style={{ left: 0, top: p * 6, width: p * 2, height: p * 2, background: leafColor }} />
          <div className="absolute" style={{ left: p * 14, top: p * 6, width: p * 2, height: p * 2, background: leafColor }} />

          {/* Shadow/Detail */}
          <div className="absolute" style={{ left: p * 4, top: p * 8, width: p * 2, height: p * 2, background: darkLeaf }} />
          <div className="absolute" style={{ left: p * 10, top: p * 4, width: p * 2, height: p * 2, background: darkLeaf }} />
        </motion.div>
      )}
    </div>
  );
};

const CharacterHead = ({ userKey, userData, isSelected }) => {
  const Pixel = ({ x, y, color, size = 5 }) => (
    <div
      className="absolute"
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        imageRendering: 'pixelated'
      }}
    />
  );

  const getAnimation = () => {
    const animations = {
      wave: {
        rotateZ: [0, -5, 5, -5, 0],
        rotateY: [0, 10, -10, 10, 0],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      },
      spin: {
        rotateY: isSelected ? [0, 360] : [0, 15, -15, 0],
        y: [0, -5, 0],
        transition: {
          rotateY: isSelected ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 3, repeat: Infinity },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }
      },
      tilt: {
        rotateX: [-5, 5, -5],
        rotateZ: [-3, 3, -3],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      },
      bounce: {
        y: [0, -15, 0, -8, 0],
        scale: [1, 0.95, 1, 0.98, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: 'easeOut' }
      },
      jump: {
        y: [0, -20, -5, -12, 0],
        rotateZ: [0, -10, 5, -5, 0],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      },
      float: {
        y: [0, -10, 0],
        rotateY: [0, 180, 360],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      },
      shake: {
        x: [0, -2, 2, -2, 2, 0],
        rotateZ: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
      }
    };
    return animations[userData.animation] || animations.wave;
  };

  const renderCharacter = () => {
    if (userKey === 'prachi') {
      return (
        <>
          {[...Array(8)].map((_, i) => <Pixel key={`hair-back-${i}`} x={8 + i} y={6} color="#8B1538" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-l1-${i}`} x={7 + i} y={7} color="#A0153E" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-l2-${i}`} x={7 + i} y={8} color="#C7253E" />)}
          {[...Array(12)].map((_, i) => <Pixel key={`hair-l3-${i}`} x={6 + i} y={9} color="#D91B7A" />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={10} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-6-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          {[...Array(6)].map((_, i) => <Pixel key={`bangs-${i}`} x={9 + i} y={8} color="#FF2D92" />)}
          <Pixel x={8} y={9} color="#FF2D92" />
          <Pixel x={9} y={9} color="#FF2D92" />
          <Pixel x={14} y={9} color="#FF2D92" />
          <Pixel x={15} y={9} color="#FF2D92" />
          <Pixel x={7} y={10} color="#D91B7A" />
          <Pixel x={7} y={11} color="#D91B7A" />
          <Pixel x={7} y={12} color="#D91B7A" />
          <Pixel x={7} y={13} color="#D91B7A" />
          <Pixel x={7} y={14} color="#D91B7A" />
          <Pixel x={16} y={10} color="#D91B7A" />
          <Pixel x={16} y={11} color="#D91B7A" />
          <Pixel x={16} y={12} color="#D91B7A" />
          <Pixel x={16} y={13} color="#D91B7A" />
          <Pixel x={16} y={14} color="#D91B7A" />
          <Pixel x={9} y={11} color="#FFF" />
          <Pixel x={10} y={11} color="#FFF" />
          <Pixel x={13} y={11} color="#FFF" />
          <Pixel x={14} y={11} color="#FFF" />
          <Pixel x={9} y={12} color="#FFF" />
          <Pixel x={10} y={12} color="#FFF" />
          <Pixel x={13} y={12} color="#FFF" />
          <Pixel x={14} y={12} color="#FFF" />
          <Pixel x={10} y={11} color="#FF2D92" />
          <Pixel x={10} y={12} color="#FF2D92" />
          <Pixel x={14} y={11} color="#FF2D92" />
          <Pixel x={14} y={12} color="#FF2D92" />
          <Pixel x={9} y={11} color="#FFB3D9" size={2} />
          <Pixel x={13} y={11} color="#FFB3D9" size={2} />
          <Pixel x={11} y={14} color="#FF69B4" />
          <Pixel x={12} y={14} color="#FF69B4" />
          <Pixel x={10} y={14} color="#FFB6C1" />
          <Pixel x={13} y={14} color="#FFB6C1" />
        </>
      );
    }

    if (userKey === 'yuzence') {
      return (
        <>
          {[...Array(10)].map((_, i) => <Pixel key={`cap-1-${i}`} x={7 + i} y={7} color="#003D82" />)}
          {[...Array(8)].map((_, i) => <Pixel key={`cap-2-${i}`} x={8 + i} y={8} color="#0052A3" />)}
          {[...Array(6)].map((_, i) => <Pixel key={`cap-3-${i}`} x={9 + i} y={9} color="#007AFF" />)}
          {[...Array(6)].map((_, i) => <Pixel key={`visor-${i}`} x={6 + i} y={10} color="#001F3F" />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          <Pixel x={10} y={12} color="#FFF" />
          <Pixel x={11} y={12} color="#FFF" />
          <Pixel x={13} y={12} color="#FFF" />
          <Pixel x={14} y={12} color="#FFF" />
          <Pixel x={10} y={13} color="#007AFF" />
          <Pixel x={14} y={13} color="#007AFF" />
          <Pixel x={10} y={15} color="#8B4513" />
          <Pixel x={11} y={15} color="#8B4513" />
          <Pixel x={12} y={15} color="#8B4513" />
          <Pixel x={13} y={15} color="#8B4513" />
        </>
      );
    }

    if (userKey === 'manash') {
      return (
        <>
          {[...Array(10)].map((_, i) => <Pixel key={`hair-1-${i}`} x={7 + i} y={7} color="#1a1a1a" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-2-${i}`} x={7 + i} y={8} color="#2d2d2d" />)}
          {[...Array(2)].map((_, i) => <Pixel key={`hair-side-l-${i}`} x={7} y={9 + i} color="#1a1a1a" />)}
          {[...Array(2)].map((_, i) => <Pixel key={`hair-side-r-${i}`} x={16} y={9 + i} color="#1a1a1a" />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={9} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={10} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-6-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-7-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          {[...Array(3)].map((_, i) => <Pixel key={`glass-l-top-${i}`} x={9 + i} y={11} color="#000" />)}
          {[...Array(3)].map((_, i) => <Pixel key={`glass-r-top-${i}`} x={13 + i} y={11} color="#000" />)}
          <Pixel x={9} y={12} color="#000" />
          <Pixel x={11} y={12} color="#000" />
          <Pixel x={13} y={12} color="#000" />
          <Pixel x={15} y={12} color="#000" />
          {[...Array(3)].map((_, i) => <Pixel key={`glass-l-bot-${i}`} x={9 + i} y={13} color="#000" />)}
          {[...Array(3)].map((_, i) => <Pixel key={`glass-r-bot-${i}`} x={13 + i} y={13} color="#000" />)}
          <Pixel x={12} y={12} color="#000" />
          <Pixel x={10} y={12} color="#4A4A4C" />
          <Pixel x={14} y={12} color="#4A4A4C" />
          {[...Array(4)].map((_, i) => <Pixel key={`mouth-${i}`} x={11 + i} y={15} color="#000" />)}
        </>
      );
    }

    if (userKey === 'sameer') {
      return (
        <>
          <Pixel x={8} y={6} color="#FF6B00" />
          <Pixel x={10} y={6} color="#FF6B00" />
          <Pixel x={12} y={6} color="#FF6B00" />
          <Pixel x={14} y={6} color="#FF6B00" />
          {[...Array(8)].map((_, i) => <Pixel key={`hair-${i}`} x={8 + i} y={7} color="#FF8C00" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`band-1-${i}`} x={7 + i} y={9} color="#FF9F0A" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`band-2-${i}`} x={7 + i} y={10} color="#FFB84D" />)}
          <Pixel x={17} y={9} color="#FF9F0A" />
          <Pixel x={18} y={10} color="#FF9F0A" />
          <Pixel x={19} y={11} color="#FF9F0A" />
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          <Pixel x={10} y={12} color="#FFF" />
          <Pixel x={10} y={13} color="#FFF" />
          <Pixel x={14} y={12} color="#FFF" />
          <Pixel x={14} y={13} color="#FFF" />
          <Pixel x={10} y={13} color="#FF9F0A" />
          <Pixel x={14} y={13} color="#FF9F0A" />
          {[...Array(6)].map((_, i) => <Pixel key={`smile-${i}`} x={9 + i} y={15} color="#000" />)}
          <Pixel x={9} y={14} color="#000" />
          <Pixel x={14} y={14} color="#000" />
        </>
      );
    }

    if (userKey === 'saurav') {
      return (
        <>
          {[...Array(10)].map((_, i) => <Pixel key={`hair-1-${i}`} x={7 + i} y={7} color="#654321" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-2-${i}`} x={7 + i} y={8} color="#8B4513" />)}
          <Pixel x={10} y={7} color="#10B981" />
          <Pixel x={11} y={7} color="#10B981" />
          <Pixel x={10} y={8} color="#34D399" />
          <Pixel x={11} y={8} color="#34D399" />
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={9} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={10} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-6-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-7-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          <Pixel x={10} y={11} color="#FFF" />
          <Pixel x={11} y={11} color="#FFF" />
          <Pixel x={13} y={11} color="#FFF" />
          <Pixel x={14} y={11} color="#FFF" />
          <Pixel x={11} y={12} color="#10B981" />
          <Pixel x={14} y={12} color="#10B981" />
          {[...Array(4)].map((_, i) => <Pixel key={`smile-${i}`} x={10 + i} y={14} color="#654321" />)}
          <Pixel x={10} y={13} color="#654321" />
          <Pixel x={13} y={13} color="#654321" />
        </>
      );
    }

    if (userKey === 'sama') {
      return (
        <>
          {[...Array(10)].map((_, i) => <Pixel key={`hair-1-${i}`} x={7 + i} y={6} color="#6D28D9" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-2-${i}`} x={7 + i} y={7} color="#7C3AED" />)}
          {[...Array(10)].map((_, i) => <Pixel key={`hair-3-${i}`} x={7 + i} y={8} color="#8B5CF6" />)}
          <Pixel x={7} y={9} color="#8B5CF6" />
          <Pixel x={7} y={10} color="#8B5CF6" />
          <Pixel x={16} y={9} color="#8B5CF6" />
          <Pixel x={16} y={10} color="#8B5CF6" />
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={9} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={10} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-6-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-7-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          <Pixel x={10} y={11} color="#FFF" />
          <Pixel x={11} y={11} color="#FFF" />
          <Pixel x={13} y={11} color="#FFF" />
          <Pixel x={14} y={11} color="#FFF" />
          <Pixel x={10} y={12} color="#8B5CF6" />
          <Pixel x={11} y={12} color="#8B5CF6" />
          <Pixel x={13} y={12} color="#8B5CF6" />
          <Pixel x={14} y={12} color="#8B5CF6" />
          {[...Array(4)].map((_, i) => <Pixel key={`smile-${i}`} x={11 + i} y={14} color="#8B5CF6" />)}
        </>
      );
    }

    if (userKey === 'aaditya') {
      return (
        <>
          {[...Array(10)].map((_, i) => <Pixel key={`hair-1-${i}`} x={7 + i} y={6} color="#D97706" />)}
          <Pixel x={8} y={7} color="#F59E0B" />
          <Pixel x={10} y={7} color="#F59E0B" />
          <Pixel x={12} y={7} color="#F59E0B" />
          <Pixel x={14} y={7} color="#F59E0B" />
          <Pixel x={15} y={7} color="#F59E0B" />
          {[...Array(8)].map((_, i) => <Pixel key={`hair-2-${i}`} x={8 + i} y={8} color="#FBBF24" />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-1-${i}`} x={8 + i} y={9} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-2-${i}`} x={8 + i} y={10} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-3-${i}`} x={8 + i} y={11} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-4-${i}`} x={8 + i} y={12} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-5-${i}`} x={8 + i} y={13} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-6-${i}`} x={8 + i} y={14} color={userData.skinColor} />)}
          {[...Array(8)].map((_, i) => <Pixel key={`face-7-${i}`} x={8 + i} y={15} color={userData.skinColor} />)}
          <Pixel x={10} y={11} color="#000" />
          <Pixel x={14} y={11} color="#000" />
          <Pixel x={9} y={11} color="#F59E0B" />
          <Pixel x={11} y={11} color="#F59E0B" />
          <Pixel x={13} y={11} color="#F59E0B" />
          <Pixel x={15} y={11} color="#F59E0B" />
          {[...Array(6)].map((_, i) => <Pixel key={`smile-${i}`} x={9 + i} y={14} color="#000" />)}
          <Pixel x={9} y={13} color="#000" />
          <Pixel x={14} y={13} color="#000" />
        </>
      );
    }
  };

  const animation = getAnimation();

  return (
    <motion.div
      className="relative"
      style={{
        width: '96px',
        height: '96px',
        imageRendering: 'pixelated',
        transformStyle: 'preserve-3d'
      }}
      animate={animation}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className="relative w-full h-full"
        style={{
          imageRendering: 'pixelated',
          background: 'transparent'
        }}
      >
        {renderCharacter()}
      </div>
    </motion.div>
  );
};


const Home = () => {
  const navigate = useNavigate();

  const users = {
    yuzence: {
      color: '#007AFF',
      displayName: 'Yuzence',
      skinColor: '#D4A574',
      accent: '#1E5A9E',
      animation: 'wave',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #4A90E2 0%, #7CB9E8 50%, #B8E6F5 100%)'
    },
    prachi: {
      color: '#FF2D92',
      displayName: 'Prachi',
      skinColor: '#FDBCB4',
      accent: '#D91B7A',
      animation: 'spin',
      timeOfDay: 'sunset',
      skyGradient: 'linear-gradient(to bottom, #FF6B9D 0%, #FFB3D9 50%, #FFDAF0 100%)'
    },
    manash: {
      color: '#1D1D1F',
      displayName: 'Manash',
      skinColor: '#C68642',
      accent: '#000000',
      animation: 'tilt',
      timeOfDay: 'night',
      skyGradient: 'linear-gradient(to bottom, #0f1419 0%, #1a2332 50%, #2d3e50 100%)'
    },
    sameer: {
      color: '#FF9F0A',
      displayName: 'Sameer',
      skinColor: '#E6AC7D',
      accent: '#E68900',
      animation: 'bounce',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #FFA500 0%, #FFD27F 50%, #FFE7B8 100%)'
    },
    saurav: {
      color: '#10B981',
      displayName: 'Saurav',
      skinColor: '#CCA373',
      accent: '#059669',
      animation: 'jump',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #10B981 0%, #6EE7B7 50%, #D1FAE5 100%)'
    },
    sama: {
      color: '#8B5CF6',
      displayName: 'Sama',
      skinColor: '#E4B899',
      accent: '#7C3AED',
      animation: 'float',
      timeOfDay: 'twilight',
      skyGradient: 'linear-gradient(to bottom, #5B21B6 0%, #8B5CF6 50%, #C4B5FD 100%)'
    },
    aaditya: {
      color: '#06B6D4',
      displayName: 'Aaditya',
      skinColor: '#D9A066',
      accent: '#0891B2',
      animation: 'shake',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #06B6D4 0%, #67E8F9 50%, #CFFAFE 100%)'
    }
  };

  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(4); // Responsive users per page

  // Responsive users per page based on screen size
  React.useEffect(() => {
    const updateUsersPerPage = () => {
      if (window.innerWidth < 640) {
        setUsersPerPage(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setUsersPerPage(2); // Tablet: 2 cards
      } else {
        setUsersPerPage(4); // Desktop: 4 cards
      }
    };

    updateUsersPerPage();
    window.addEventListener('resize', updateUsersPerPage);
    return () => window.removeEventListener('resize', updateUsersPerPage);
  }, []);

  const userEntries = Object.entries(users);
  const totalPages = Math.ceil(userEntries.length / usersPerPage);
  const currentUsers = userEntries.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  const currentSky = selectedUser && users[selectedUser]
    ? users[selectedUser].skyGradient
    : 'linear-gradient(to bottom, #87CEEB 0%, #B8E6F5 50%, #E8F4F8 100%)';

  const currentTimeOfDay = selectedUser && users[selectedUser]
    ? users[selectedUser].timeOfDay
    : 'day';

  const handleUserSelect = (userKey) => {
    setSelectedUser(userKey);
  };

  const handleLogin = () => {
    if (selectedUser) {
      navigate(`/${selectedUser}/login`);
    }
  };

  const handleCancel = () => {
    setSelectedUser('');
    setIsLoading(false);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      // Auto-select first user on new page
      const newUsers = userEntries.slice(
        newPage * usersPerPage,
        (newPage + 1) * usersPerPage
      );
      if (newUsers.length > 0) {
        setSelectedUser(newUsers[0][0]); // Select first user's key
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      // Auto-select first user on new page
      const newUsers = userEntries.slice(
        newPage * usersPerPage,
        (newPage + 1) * usersPerPage
      );
      if (newUsers.length > 0) {
        setSelectedUser(newUsers[0][0]); // Select first user's key
      }
    }
  };



  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      animate={{
        background: currentSky
      }}
      transition={{
        duration: 4,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      style={{
        imageRendering: 'pixelated'
      }}
    >
      {/* Stars (fade in for night/twilight) */}
      <AnimatePresence>
        {(currentTimeOfDay === 'night' || currentTimeOfDay === 'twilight') && (
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          >
            <Stars />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sun or Moon with sunset/moonrise animation */}
      <AnimatePresence mode="wait">
        {(currentTimeOfDay === 'day' || currentTimeOfDay === 'sunset') && (
          <motion.div
            key="sun"
            className="absolute top-8 left-1/2 -translate-x-1/2"
            initial={{
              opacity: 0,
              y: 150,  // Sun starts below horizon
              scale: 0.6
            }}
            animate={{
              opacity: 1,
              y: 0,  // Sun rises
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 200,  // Sun sets downward
              scale: 0.8
            }}
            transition={{
              duration: 4,
              ease: [0.4, 0.0, 0.2, 1]  // Smooth deceleration
            }}
          >
            <PixelSun />
          </motion.div>
        )}
        {(currentTimeOfDay === 'night' || currentTimeOfDay === 'twilight') && (
          <motion.div
            key="moon"
            className="absolute top-8 left-1/2 -translate-x-1/2"
            initial={{
              opacity: 0,
              y: -150,  // Moon starts below horizon
              scale: 0.6
            }}
            animate={{
              opacity: 1,
              y: 0,  // Moon rises slowly
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -200,
              scale: 0.8
            }}
            transition={{
              duration: 4.5,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <PixelMoon />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Living Layer (Birds, Bees, Butterflies, Animals) */}
      {/* We use opacity here instead of AnimatePresence for the grouping so they don't RESTART their walk/flight cycles when switching users */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: (currentTimeOfDay === 'night') ? 0 : 1,
          pointerEvents: currentTimeOfDay === 'night' ? 'none' : 'auto'
        }}
        transition={{ duration: 2 }}
      >
        {/* Flying Creatures Layer (Day/Sunset/Twilight) */}
        <motion.div
          animate={{ opacity: (currentTimeOfDay === 'day' || currentTimeOfDay === 'sunset' || currentTimeOfDay === 'twilight') ? 1 : 0 }}
          transition={{ duration: 2 }}
        >
          <PixelBird delay={0} yPosition="15%" duration={20} />
          <PixelBird delay={8} yPosition="25%" duration={25} />

          <PixelBee delay={2} yPosition="45%" duration={12} />

          <Butterflies />
        </motion.div>

        {/* Animals Layer - Reduced count to avoid congestion */}
        <div className="animals-container">
          {/* Single Pig - Patrol */}
          <PixelPig delay={0} duration={25} startPos="10%" endPos="50%" />

          {/* Single Cow - Grazing */}
          <PixelCow delay={5} duration={30} startPos="30%" endPos="70%" />

          {/* Single Panda - Wandering */}
          <PixelPanda delay={10} duration={28} startPos="50%" endPos="85%" />

          {/* Cute Deer - Only for Prachi */}
          <AnimatePresence>
            {selectedUser === 'prachi' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <PixelDeer delay={3} duration={30} startPos="60%" endPos="95%" />
                {/* Adorable Baby Fawn companion */}
                <PixelFawn delay={3.2} duration={30} startPos="64%" endPos="99%" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      {/* Trees Layer - Always visible, persistent */}
      <PixelTree />

      {/* Fireflies Layer - Only for Night/Twilight */}
      <AnimatePresence>
        {(currentTimeOfDay === 'night' || currentTimeOfDay === 'twilight') && (
          <motion.div
            key="fireflies"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentTimeOfDay === 'night' ? 1 : 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <Fireflies />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pixelated Clouds Layer */}
      <div className="clouds-container">
        <PixelCloud delay={0} yPosition="10%" size={1.2} speed={40} timeOfDay={currentTimeOfDay} />
        <PixelCloud delay={10} yPosition="25%" size={0.9} speed={50} timeOfDay={currentTimeOfDay} />
        <PixelCloud delay={20} yPosition="15%" size={1.1} speed={45} timeOfDay={currentTimeOfDay} />
        <PixelCloud delay={15} yPosition="35%" size={0.8} speed={55} timeOfDay={currentTimeOfDay} />
        <PixelCloud delay={5} yPosition="20%" size={1} speed={48} timeOfDay={currentTimeOfDay} />
      </div>

      {/* Main Content - Increased z-index to prevent animal overlap */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Minecraft-style Title */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: 'spring',
            stiffness: 100
          }}
          className="mb-16 text-center"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-6xl mb-4 text-white px-4"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.3)',
              letterSpacing: '2px',
              imageRendering: 'pixelated'
            }}
          >
            SELECT USER
          </h1>
        </motion.div>

        {/* User Selection Carousel with Arrows */}
        <div className="relative w-full max-w-7xl mb-12">
          {/* Left Arrow - Minecraft Stone Button Style - Mobile Responsive */}
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 0}
            whileHover={currentPage !== 0 ? { scale: 1.1, x: -8 } : {}}
            whileTap={currentPage !== 0 ? { scale: 0.9 } : {}}
            className={`absolute left-1 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            style={{
              background: currentPage === 0
                ? 'linear-gradient(135deg, #555 0%, #333 100%)'
                : 'linear-gradient(135deg, #999 0%, #666 100%)',
              border: '4px solid #000',
              boxShadow: currentPage === 0
                ? '0 4px 0 #222, 0 8px 0 #000'
                : '0 6px 0 #444, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
              imageRendering: 'pixelated'
            }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(2px 2px 0 #000)' }}>
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Right Arrow - Minecraft Stone Button Style - Mobile Responsive */}
          <motion.button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            whileHover={currentPage !== totalPages - 1 ? { scale: 1.1, x: 8 } : {}}
            whileTap={currentPage !== totalPages - 1 ? { scale: 0.9 } : {}}
            className={`absolute right-1 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            style={{
              background: currentPage === totalPages - 1
                ? 'linear-gradient(135deg, #555 0%, #333 100%)'
                : 'linear-gradient(135deg, #999 0%, #666 100%)',
              border: '4px solid #000',
              boxShadow: currentPage === totalPages - 1
                ? '0 4px 0 #222, 0 8px 0 #000'
                : '0 6px 0 #444, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
              imageRendering: 'pixelated'
            }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(2px 2px 0 #000)' }}>
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* User Cards - Minecraft Wooden Panel Style - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-12 md:px-24">
            <AnimatePresence mode="wait">
              {currentUsers.map(([userKey, userData], index) => (
                <motion.div
                  key={`${userKey}-${currentPage}`}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 200
                  }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  onClick={() => handleUserSelect(userKey)}
                  className="cursor-pointer"
                >
                  <div
                    className="p-6 relative"
                    style={{
                      background: selectedUser === userKey
                        ? `linear-gradient(135deg, ${userData.color} 0%, ${userData.accent} 100%)`
                        : 'repeating-linear-gradient(0deg, #8B7355 0px, #8B7355 4px, #A0826D 4px, #A0826D 8px)',
                      border: '6px solid #000',
                      boxShadow: selectedUser === userKey
                        ? `0 8px 0 ${userData.accent}, 0 12px 0 #000, inset 0 4px 0 rgba(255,255,255,0.3), 0 0 30px ${userData.color}`
                        : '0 8px 0 #6B5A45, 0 12px 0 #000, inset 0 4px 0 rgba(255,255,255,0.2)',
                      transition: 'all 0.2s',
                      imageRendering: 'pixelated'
                    }}
                  >
                    {/* Character Head */}
                    <div className="mb-4 mx-auto w-24 h-24 relative">
                      <CharacterHead userKey={userKey} userData={userData} isSelected={selectedUser === userKey} />
                    </div>

                    {/* Name - Minecraft Font Style */}
                    <div
                      className="text-center text-white text-sm mb-2 uppercase"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        textShadow: '3px 3px 0 #000',
                        letterSpacing: '1px',
                        imageRendering: 'pixelated'
                      }}
                    >
                      {userData.displayName}
                    </div>

                    {/* Selection Indicator - Minecraft Checkmark */}
                    {selectedUser === userKey && (
                      <>
                        <motion.div
                          className="absolute -top-3 -right-3 w-12 h-12 flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #55FF55 0%, #00AA00 100%)',
                            border: '4px solid #000',
                            boxShadow: '0 4px 0 #006600, 0 6px 0 #000, inset 0 2px 0 rgba(255,255,255,0.4)',
                            imageRendering: 'pixelated'
                          }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                        >
                          <span className="text-white text-2xl font-bold" style={{ textShadow: '2px 2px 0 #000' }}>✓</span>
                        </motion.div>

                        {/* Minecraft Particle Effects */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2"
                            style={{
                              background: userData.color,
                              border: '1px solid #000',
                              imageRendering: 'pixelated',
                              left: `${20 + (i % 4) * 20}%`,
                              top: `${20 + Math.floor(i / 4) * 60}%`
                            }}
                            animate={{
                              y: [-10, -30, -10],
                              x: [0, (i % 2 === 0 ? 10 : -10), 0],
                              opacity: [0, 1, 0],
                              scale: [1, 1.5, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: 'linear'
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Page Indicators - Minecraft Style */}
          <div className="flex justify-center gap-4 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '16px',
                  height: '16px',
                  background: currentPage === i ? '#55FF55' : '#666',
                  border: '3px solid #000',
                  boxShadow: currentPage === i
                    ? '0 3px 0 #00AA00, 0 5px 0 #000'
                    : '0 3px 0 #333, 0 5px 0 #000',
                  imageRendering: 'pixelated'
                }}
              />
            ))}
          </div>
        </div>

        {/* Minecraft-style Action Buttons - Mobile Responsive */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4"
            >
              {/* Cancel Button - Minecraft Red Stone Style */}
              <motion.button
                onClick={handleCancel}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ y: 2, boxShadow: '0 2px 0 #660000, 0 4px 0 #000' }}
                className="px-6 sm:px-10 py-3 sm:py-5 text-white uppercase text-xs sm:text-sm"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
                  border: '4px solid #000',
                  boxShadow: '0 6px 0 #660000, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
                  letterSpacing: '2px',
                  imageRendering: 'pixelated'
                }}
                disabled={isLoading}
              >
                CANCEL
              </motion.button>

              {/* Login Button - Minecraft Diamond Style */}
              <motion.button
                onClick={handleLogin}
                disabled={isLoading}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ y: 2, boxShadow: '0 2px 0 #0066AA, 0 4px 0 #000' }}
                className="px-6 sm:px-10 py-3 sm:py-5 text-white uppercase text-xs sm:text-sm"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  background: isLoading
                    ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                    : 'linear-gradient(135deg, #00AAFF 0%, #0088CC 100%)',
                  border: '4px solid #000',
                  boxShadow: isLoading
                    ? '0 6px 0 #333, 0 10px 0 #000'
                    : '0 6px 0 #0066AA, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
                  letterSpacing: '2px',
                  imageRendering: 'pixelated'
                }}
              >
                {isLoading ? 'LOADING...' : 'LOGIN'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pixelated Ground/Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex" style={{ imageRendering: 'pixelated' }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              background: i % 3 === 0 ? '#68A032' : '#7CB342',
              borderTop: '4px solid #8BD44F',
              borderRight: '1px solid #5A8C2A',
              boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>

      {/* Load Minecraft Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </motion.div >
  );
};

export default Home;
