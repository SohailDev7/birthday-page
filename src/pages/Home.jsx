import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PixelSun, PixelMoon, PixelCloud } from '../components/home/Environment';
import { PixelBird, PixelBee, Fireflies, Butterflies, PixelFlyingSohail } from '../components/home/FlyingCreatures';
import { PixelPig, PixelCow, PixelPanda, PixelDeer, PixelFawn } from '../components/home/LandAnimals';
import { Stars, PixelTree, PixelGrass, PixelWildflowers, FloatingPollen } from '../components/home/NatureDetails';
import Tilt from 'react-parallax-tilt';
import { TypeAnimation } from 'react-type-animation';
import { PixelCursorTrail, EnchantedGlint } from '../components/home/InteractiveEffects'; // Import Effects
import { ShaderOverlay } from '../components/home/ShaderOverlay'; // Import Shader
import { CharacterHead, FullBodyCharacter } from '../components/home/Characters';
import gsap from 'gsap';
import LoginOverlay from '../components/home/LoginOverlay';
import UserGallery from '../components/home/UserGallery';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { Music } from 'lucide-react';

// Music tracks - Audio files should be in public/audio/ folder
const musicTracks = [
  {
    name: "C418 - Chirp",
    url: "/audio/chirp.mp3"
  },
  {
    name: "C418 - Wet Hands",
    url: "/audio/wethands.mp3"
  },
];

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Locally defined PixelBurst to prevent ReferenceError
const PixelBurst = ({ color }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2"
        style={{
          background: color,
          border: '1px solid #000',
          left: '50%',
          top: '50%'
        }}
        animate={{
          x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
          y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
          opacity: [1, 0],
          scale: [1, 2, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 0.1
        }}
      />
    ))}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { user, login: authLogin, checkUserSession } = useAuth();
  // Renamed login to avoid conflict if needed, though handleLogin is the local function name

  const users = {
    yuzence: {
      color: '#007AFF',
      displayName: 'Yuzence',
      skinColor: '#F4C2A0',
      accent: '#1E5A9E',
      animation: 'wave',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #4A90E2 0%, #7CB9E8 50%, #B8E6F5 100%)',
      dob: '2000-01-01'
    },
    prachi: {
      color: '#FF2D92',
      displayName: 'Prachi',
      skinColor: '#FDBCB4',
      accent: '#D91B7A',
      animation: 'spin',
      timeOfDay: 'sunset',
      skyGradient: 'linear-gradient(to bottom, #FF6B9D 0%, #FFB3D9 50%, #FFDAF0 100%)',
      dob: '2007-06-14'
    },
    manash: {
      color: '#1D1D1F',
      displayName: 'Manash',
      skinColor: '#C68642',
      accent: '#000000',
      animation: 'tilt',
      timeOfDay: 'night',
      skyGradient: 'linear-gradient(to bottom, #0f1419 0%, #1a2332 50%, #2d3e50 100%)',
      dob: '2000-01-01'
    },
    sameer: {
      color: '#FF9F0A',
      displayName: 'Sameer',
      skinColor: '#E6AC7D',
      accent: '#E68900',
      animation: 'bounce',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #FFA500 0%, #FFD27F 50%, #FFE7B8 100%)',
      dob: '2000-01-01'
    },
    saurav: {
      color: '#10B981',
      displayName: 'Saurav',
      skinColor: '#CCA373',
      accent: '#059669',
      animation: 'jump',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #10B981 0%, #6EE7B7 50%, #D1FAE5 100%)',
      dob: '2000-01-01'
    },
    sama: {
      color: '#8B5CF6',
      displayName: 'Sama',
      skinColor: '#E4B899',
      accent: '#7C3AED',
      animation: 'float',
      timeOfDay: 'twilight',
      skyGradient: 'linear-gradient(to bottom, #5B21B6 0%, #8B5CF6 50%, #C4B5FD 100%)',
      dob: '2000-01-01'
    },
    aaditya: {
      color: '#06B6D4',
      displayName: 'Aaditya',
      skinColor: '#D9A066',
      accent: '#0891B2',
      animation: 'shake',
      timeOfDay: 'day',
      skyGradient: 'linear-gradient(to bottom, #06B6D4 0%, #67E8F9 50%, #CFFAFE 100%)',
      dob: '2000-01-01'
    },
    sohail: {
      color: '#FFD700',
      displayName: 'Sohail',
      skinColor: '#D2B48C',
      accent: '#FFA500',
      animation: 'float',
      timeOfDay: 'sunset',
      skyGradient: 'linear-gradient(to bottom, #FF8C00 0%, #FF4500 50%, #4B0082 100%)',
      isSpecial: true,
      auraColor: '#FFD700',
      dob: '2000-01-01'
    }
  };

  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(4); // Responsive users per page
  const [hoveredUser, setHoveredUser] = useState(null); // Focus Mode State

  // Music player expansion state
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  // Login overlay state
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Intro firecracker animation state
  const [showIntroFirecracker, setShowIntroFirecracker] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [isGeneratingWorld, setIsGeneratingWorld] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('GENERATING TERRAIN...');

  // Background music state
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showCards, setShowCards] = useState(true); // New state for toggling cards
  const [waitingForEntry, setWaitingForEntry] = useState(false); // State for explicit user entry
  const [cameraPosition, setCameraPosition] = useState('center'); // 'center' | 'left'
  const audioRef = React.useRef(null);
  const audioLoadedRef = useRef(false); // Track audio loading state across re-renders

  const [isMobile, setIsMobile] = useState(false);
  // Handle initial hydration/mount to prevent flash
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Update usersPerPage based on screen width
      if (window.innerWidth < 640) setUsersPerPage(2);
      else if (window.innerWidth < 1024) setUsersPerPage(3);
      else setUsersPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize audio and handle auto-play
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('❌ Audio element not found');
      return;
    }

    console.log('🎵 Loading track:', musicTracks[currentTrack].name);
    console.log('🎵 Audio URL:', musicTracks[currentTrack].url);

    // Set volume
    audio.volume = 0.5; // 50% volume

    // Handle track ended - play next track
    const handleTrackEnd = () => {
      console.log('✅ Track ended, playing next...');
      setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    };

    // Handle errors
    const handleError = (e) => {
      console.error('❌ Audio error:', e);
      console.error('❌ Error details:', audio.error);
    };

    // Handle successful load
    const handleCanPlay = () => {
      console.log('✅ Audio loaded and ready to play');
    };

    audio.addEventListener('ended', handleTrackEnd);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('ended', handleTrackEnd);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack]);

  // Handle track changing auto-play
  useEffect(() => {
    if (isMounted && !isGeneratingWorld && audioRef.current) {
      // Ensure the audio actually plays when switching tracks
      audioRef.current.play().catch(error => {
        console.warn('⚠️ Track change playback blocked:', error.message);
      });
    }
  }, [currentTrack, isGeneratingWorld]);

  // Handle initial hydration/mount and world generation
  useEffect(() => {
    // Reset ref on mount
    audioLoadedRef.current = false;

    // Async Audio Preloading with Timeout
    const preloadAudio = async () => {
      try {
        const track = musicTracks[currentTrack];
        if (!track) {
          console.warn("No track found, skipping audio load");
          audioLoadedRef.current = true;
          return;
        }

        setLoadingText(`LOADING AUDIO: ${track.name.toUpperCase()}...`);

        // Race between load and timeout
        await Promise.race([
          new Promise((resolve) => {
            const audio = new Audio();
            audio.src = track.url;
            // 'canplay' is often enough/safer than 'canplaythrough' for short clips or initial load
            audio.oncanplay = () => resolve();
            audio.oncanplaythrough = () => resolve();
            audio.onerror = (e) => {
              console.warn(`Failed to preload ${track.name}`, e);
              resolve();
            };
            audio.load();
          }),
          new Promise(resolve => setTimeout(resolve, 3000)) // 3s Timeout max
        ]);

        audioLoadedRef.current = true;
        setLoadingText('FINALIZING WORLD...');
      } catch (e) {
        console.error("Audio loading error", e);
        audioLoadedRef.current = true; // Proceed anyway
      }
    };

    preloadAudio();

    // Simulator for Chunks + Wait for Audio
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const isAudioReady = audioLoadedRef.current;

        // If we are finished loading standard progress...
        if (prev >= 100) {
          if (isAudioReady) {
            clearInterval(interval);
            setLoadingText('READY TO ENTER');
            setWaitingForEntry(true);
            return 100;
          } else {
            // Wait for audio, maybe cap at 99% visually or just wait
            // Force finish if it's been too long (handled by timeout above setting ref to true)
            return 100;
          }
        }

        // If audio not ready yet, slow down near the end
        if (!isAudioReady && prev >= 90) {
          // Creep forward slowly up to 95
          return Math.min(prev + 0.5, 95);
        }

        // Normal progress
        // Ensure at least some progress is made
        const increment = isAudioReady ? 15 : (2 + Math.random() * 8);
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleEnterWorld = async () => {
    setIsGeneratingWorld(false);
    setShowIntroFirecracker(true); // Firecrackers!

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log('✅ Audio started on interactions');
      } catch (error) {
        console.error('❌ Play failed:', error);
      }
    }
  };


  // GSAP Entrance Animations when world is ready (delay to account for firecrackers)
  useEffect(() => {
    if (!isGeneratingWorld) {
      gsap.fromTo(".main-title",
        { y: -100, opacity: 0, scale: 0.8 },
        { duration: 1.2, y: 0, opacity: 1, scale: 1, ease: "back.out(1.7)", delay: 1.5 }
      );
      gsap.fromTo(".carousel-container",
        { scale: 0.9, opacity: 0 },
        { duration: 1.0, scale: 1, opacity: 1, ease: "power2.out", delay: 1.8 }
      );
      gsap.fromTo(".action-button",
        { y: 50, opacity: 0 },
        { duration: 0.6, stagger: 0.15, y: 0, opacity: 1, ease: "power2.out", delay: 2.1 }
      );
    }
  }, [isGeneratingWorld]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      console.log(newMutedState ? '🔇 Muted' : '🔊 Unmuted');

      // If unmuting and audio is paused, try to play
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log('Play on unmute failed:', e));
      }
    }
  };

  // Intro firecracker animation sequence - triggers after world generation
  React.useEffect(() => {
    if (showIntroFirecracker && !hasPlayedIntro) {
      // Show firecracker for 3.5 seconds then hide
      const timer = setTimeout(() => {
        setShowIntroFirecracker(false);
        setHasPlayedIntro(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [showIntroFirecracker, hasPlayedIntro]);

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

  const userEntries = useMemo(() => Object.entries(users), [users]);
  const totalPages = useMemo(() => Math.ceil(userEntries.length / usersPerPage), [userEntries, usersPerPage]);
  const currentUsers = useMemo(() => userEntries.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  ), [userEntries, currentPage, usersPerPage]);

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
      // Trigger Confetti Celebration - "Golden Apple Reached" style
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFFFFF', users[selectedUser]?.color || '#00FF00'], // Gold, Orange, White, User Color
        shapes: ['square'], // Minecraft style
        scalar: 1.2,
        disableForReducedMotion: true
      });

      // Check if this specific user has a valid session cookie
      if (checkUserSession(selectedUser)) {
        // Restore session for this user and navigate
        authLogin(selectedUser);

        setTimeout(() => {
          if (selectedUser === 'prachi') {
            navigate('/prachi/home');
          } else {
            navigate(`/${selectedUser}/home`);
          }
        }, 800); // Slight delay to enjoy confetti
      } else {
        // Not authenticated as this user, show login overlay
        setShowLoginOverlay(true);
      }
    }
  };

  const handleCancel = () => {
    setSelectedUser('');
    setShowLoginOverlay(false);
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
      {/* MINECRAFT WORLD LOADING OVERLAY */}
      <AnimatePresence>
        {isGeneratingWorld && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#1a1a1a]"
            exit={{
              clipPath: 'inset(50% 50% 50% 50%)',
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            style={{ imageRendering: 'pixelated' }}
          >
            {/* Minecraft Dirt Texture Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")',
                backgroundColor: '#3D2B1F'
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <h2
                className="text-xl md:text-2xl text-[#55FF55] mb-8 text-center px-4 leading-relaxed"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: '4px 4px 0 #000'
                }}
              >
                {loadingText}
              </h2>

              {!waitingForEntry ? (
                <>
                  {/* Minecraft Progress Bar */}
                  <div
                    className="w-64 md:w-96 h-8 bg-[#444] relative"
                    style={{
                      border: '4px solid #000',
                      boxShadow: '4px 4px 0 #000'
                    }}
                  >
                    <motion.div
                      className="h-full bg-[#55FF55]"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      style={{
                        boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.4)'
                      }}
                    />
                  </div>

                  <p
                    className="mt-6 text-white text-[10px] uppercase font-mono tracking-widest opacity-60"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Progress: {Math.floor(loadingProgress)}%
                  </p>
                </>
              ) : (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnterWorld}
                  className="px-8 py-4 text-white text-xl md:text-2xl cursor-pointer"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    background: '#55FF55',
                    color: '#000',
                    border: '4px solid #000',
                    boxShadow: '0 6px 0 #008800, 0 10px 0 #000',
                    textShadow: 'none',
                    imageRendering: 'pixelated'
                  }}
                >
                  ENTER WORLD
                </motion.button>
              )}
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >

      {/* Global Interactive FX */}
      < PixelCursorTrail />

      {/* Global Interactive FX */}
      < PixelCursorTrail />

      {/* Screen Shader Overlay */}
      < ShaderOverlay timeOfDay={currentTimeOfDay} />

      <motion.div
        className="relative min-h-screen"
        initial={false}
        animate={{ opacity: 1 }}
      >
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={musicTracks[currentTrack].url}
          loop={false}
          preload="auto"
        />

        {/* INTRO SKY FIREWORKS ANIMATION */}
        <AnimatePresence>
          {showIntroFirecracker && (
            <>
              {/* Night Sky that morphs to day */}
              <motion.div
                className="fixed inset-0 z-100 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 50%, #2a2a3e 100%)'
                }}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 1, 0],
                  background: [
                    'linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 50%, #2a2a3e 100%)',
                    'linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 50%, #2a2a3e 100%)',
                    'linear-gradient(to bottom, #4A90E2 0%, #7CB9E8 50%, #B8E6F5 100%)'
                  ]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut'
                }}
              />

              {/* Multiple Fireworks in Sky */}
              {[
                { x: '30%', y: '20%', delay: 0.3, color: '#FFD700' },
                { x: '50%', y: '25%', delay: 0.6, color: '#FF4500' },
                { x: '70%', y: '22%', delay: 0.9, color: '#FF1493' }
              ].map((firework, idx) => (
                <motion.div
                  key={idx}
                  className="fixed z-101 pointer-events-none"
                  style={{
                    left: firework.x,
                    top: firework.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 2, 2.5] }}
                  transition={{
                    duration: 1.5,
                    delay: firework.delay,
                    times: [0, 0.2, 0.6, 1]
                  }}
                >
                  {/* Explosion particles in all directions - BLOCKY */}
                  {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i / 20) * Math.PI * 2;
                    const distance = 80 + Math.random() * 80;
                    const size = 10 + Math.random() * 16;
                    const particleColors = [
                      firework.color,
                      '#FFD700',
                      '#FFA500',
                      '#FFFF00',
                      '#FF6347',
                      '#FF1493'
                    ];
                    const color = particleColors[i % particleColors.length];

                    return (
                      <motion.div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: `${size}px`,
                          height: `${size}px`,
                          background: color,
                          border: '3px solid #000',
                          boxShadow: `0 0 ${size * 2}px ${color}, 3px 3px 0 #000`,
                          left: '0',
                          top: '0',
                          imageRendering: 'pixelated',
                          clipPath: 'polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)'
                        }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance + 40, // Slight gravity
                          opacity: [0, 1, 1, 0],
                          scale: [0.5, 1.5, 1, 0.3],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          ease: 'easeOut'
                        }}
                      />
                    );
                  })}

                  {/* Center flash burst - BLOCKY */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle, #FFFFFF, ${firework.color}, transparent)`,
                      border: `6px solid ${firework.color}`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 100px ${firework.color}`,
                      imageRendering: 'pixelated',
                      clipPath: 'polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)'
                    }}
                    animate={{
                      scale: [0, 3, 1.5, 0],
                      opacity: [1, 0.9, 0.5, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Trailing sparks - BLOCKY */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const sparkDist = 40 + Math.random() * 30;

                    return (
                      <motion.div
                        key={`spark-${i}`}
                        style={{
                          position: 'absolute',
                          width: '6px',
                          height: '6px',
                          background: '#FFFF00',
                          border: '2px solid #000',
                          boxShadow: '0 0 12px #FFFF00',
                          left: '0',
                          top: '0',
                          imageRendering: 'pixelated'
                        }}
                        animate={{
                          x: Math.cos(angle) * sparkDist,
                          y: Math.sin(angle) * sparkDist,
                          opacity: [0, 1, 0],
                          scale: [1, 2, 0]
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: 'easeOut'
                        }}
                      />
                    );
                  })}
                </motion.div>
              ))}

              {/* Stars twinkling in night sky before dawn */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="fixed z-100 pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                    width: '4px',
                    height: '4px',
                    background: '#FFF',
                    border: '1px solid #CCC',
                    boxShadow: '0 0 8px #FFF',
                    imageRendering: 'pixelated'
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3, 0],
                    scale: [1, 1.5, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 0.5,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Expandable Music Player - Top Left - TRULY BLOCKY */}
        {!isMobile && (
          <div
            className="fixed top-4 left-4 z-50 group/player"
            onMouseEnter={() => setIsPlayerExpanded(true)}
            onMouseLeave={() => setIsPlayerExpanded(false)}
          >
            {/* Compact Player - Always Visible */}
            <motion.div
              className="px-4 py-3 text-white font-bold cursor-pointer select-none relative"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                backgroundColor: '#4e4e4e',
                backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-matter.png")`,
                border: '6px solid #000',
                imageRendering: 'pixelated',
                boxShadow: `
                inset 3px 3px 0 rgba(255, 255, 255, 0.4),
                inset -3px -3px 0 rgba(0, 0, 0, 0.6),
                4px 4px 12px rgba(0,0,0,0.5)
              `,
                minWidth: '220px',
                maxWidth: '300px'
              }}
            >
              {/* Corner Details to make it look more like a block */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-black/40" />

              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#8b8b8b]"
                  style={{
                    border: '3px solid #000',
                    boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.4)'
                  }}
                >
                  <Music size={20} className="text-[#3f3f3f]" />
                </div>

                <div className="flex-1 overflow-hidden">
                  <div
                    className="text-[10px] text-[#AAAAAA] mb-1"
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    NOW PLAYING
                  </div>
                  <motion.div
                    key={currentTrack}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-white whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      textShadow: '2px 2px 0 #000'
                    }}
                  >
                    {musicTracks[currentTrack].name}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {isPlayerExpanded && (
                <motion.div
                  className="absolute top-full left-0 mt-3"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ imageRendering: 'pixelated' }}
                >
                  <div
                    className="px-4 py-4"
                    style={{
                      backgroundColor: '#4e4e4e',
                      backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-matter.png")`,
                      border: '6px solid #000',
                      boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.4), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 8px 8px 0 rgba(0,0,0,0.3)',
                      minWidth: '240px'
                    }}
                  >
                    {/* Track Controls - AUTHENTIC BLOCKY BUTTONS */}
                    <div className="flex justify-between gap-3 mb-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
                        }}
                        className="flex-1 py-3 bg-[#bebebe] hover:bg-[#c6c6c6] text-black active:translate-y-1 active:shadow-none"
                        style={{
                          border: '4px solid #000',
                          boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.6), inset -3px -3px 0 rgba(0,0,0,0.4), 0 4px 0 #000',
                          fontFamily: "'Press Start 2P', cursive",
                          fontSize: '10px'
                        }}
                      >
                        PREV
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
                        }}
                        className="flex-1 py-3 bg-[#bebebe] hover:bg-[#c6c6c6] text-black active:translate-y-1 active:shadow-none"
                        style={{
                          border: '4px solid #000',
                          boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.6), inset -3px -3px 0 rgba(0,0,0,0.4), 0 4px 0 #000',
                          fontFamily: "'Press Start 2P', cursive",
                          fontSize: '10px'
                        }}
                      >
                        NEXT
                      </button>
                    </div>

                    {/* Volume/Mute Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="w-full py-3 bg-[#8b8b8b] hover:bg-[#969696] text-white flex items-center justify-center gap-3 active:translate-y-1 active:shadow-none"
                      style={{
                        border: '4px solid #000',
                        boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.4), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 4px 0 #000',
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: '10px',
                        textShadow: '2px 2px 0 #000'
                      }}
                    >
                      {isMuted ? '🔇 MUTED' : '🔊 PLAYING'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile: Compact Controls */}
            <div className="md:hidden mt-3">
              <div
                className="px-3 py-2 text-white flex items-center gap-3"
                style={{
                  backgroundColor: '#4e4e4e',
                  backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-matter.png")`,
                  border: '4px solid #000',
                  boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.6), 4px 4px 0 rgba(0,0,0,0.3)',
                  imageRendering: 'pixelated'
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
                  }}
                  className="p-2 bg-[#bebebe] border-2 border-black active:translate-y-0.5"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', color: '#000' }}
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="flex-1 py-1 bg-[#8b8b8b] border-2 border-black"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', textShadow: '1px 1px 0 #000' }}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
                  }}
                  className="p-2 bg-[#bebebe] border-2 border-black active:translate-y-0.5"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', color: '#000' }}
                >
                  ▶
                </button>
              </div>
            </div>
        )}

            {/* Top Right Control Buttons Container */}
            <div className="fixed top-4 right-4 z-50 flex gap-4">
              {/* Pixelated Eye Button - Toggle Visibility */}
              <motion.button
                onClick={() => setShowCards(!showCards)}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '56px' : '80px',
                  height: isMobile ? '56px' : '80px',
                  background: !showCards
                    ? 'linear-gradient(180deg, #FF4444 0%, #CC0000 100%)' // Red when hidden
                    : 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)', // Green when visible
                  border: isMobile ? '4px solid #000' : '6px solid #000',
                  boxShadow: `
              6px 0 0 #000,
              -6px 0 0 #000,
              0 6px 0 #000,
              0 -6px 0 #000,
              6px 6px 0 #000,
              -6px 6px 0 #000,
              6px -6px 0 #000,
              -6px -6px 0 #000,
              inset 4px 4px 0 rgba(255, 255, 255, 0.3),
              inset -4px -4px 0 rgba(0, 0, 0, 0.3)
            `,
                  cursor: 'pointer',
                  imageRendering: 'pixelated',
                  clipPath: `polygon(
              12px 0, calc(100% - 12px) 0,
              100% 12px, 100% calc(100% - 12px),
              calc(100% - 12px) 100%, 12px 100%,
              0 calc(100% - 12px), 0 12px
            )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px'
                }}
              >
                {/* Blocky Eye Icon */}
                <div style={{ position: 'relative', width: '40px', height: '40px', transform: isMobile ? 'scale(0.7)' : 'none' }}>
                  {/* Eye White */}
                  <div style={{
                    position: 'absolute',
                    left: '4px', top: '12px',
                    width: '32px', height: '16px',
                    background: '#FFF',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                  }} />
                  {/* Pupil */}
                  <div style={{
                    position: 'absolute',
                    left: !showCards ? '18px' : '14px', // Shift pupil when closed/hidden
                    top: '12px',
                    width: '12px', height: '16px',
                    background: '#000'
                  }} />

                  {!showCards && (
                    /* Red Cross / Slash - True Pixelated Staircase */
                    <>
                      {/* Diagonal 1: Top-Left to Bottom-Right */}
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={`d1-${i}`} style={{
                          position: 'absolute',
                          left: `${8 + i * 4}px`,
                          top: `${8 + i * 4}px`,
                          width: '4px', height: '4px',
                          background: '#FF0000',
                          boxShadow: '1px 1px 0 #000'
                        }} />
                      ))}

                      {/* Diagonal 2: Top-Right to Bottom-Left */}
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={`d2-${i}`} style={{
                          position: 'absolute',
                          right: `${8 + i * 4}px`,
                          top: `${8 + i * 4}px`,
                          width: '4px', height: '4px',
                          background: '#FF0000',
                          boxShadow: '-1px 1px 0 #000'
                        }} />
                      ))}
                    </>
                  )}
                </div>
              </motion.button>

              {/* Pixelated Mute Button */}
              <motion.button
                onClick={toggleMute}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '56px' : '80px',
                  height: isMobile ? '56px' : '80px',
                  background: isMuted
                    ? 'linear-gradient(180deg, #FF4444 0%, #CC0000 100%)'
                    : 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)',
                  border: isMobile ? '4px solid #000' : '6px solid #000',
                  boxShadow: `
              6px 0 0 #000,
              -6px 0 0 #000,
              0 6px 0 #000,
              0 -6px 0 #000,
              6px 6px 0 #000,
              -6px 6px 0 #000,
              6px -6px 0 #000,
              -6px -6px 0 #000,
              inset 4px 4px 0 rgba(255, 255, 255, 0.3),
              inset -4px -4px 0 rgba(0, 0, 0, 0.3)
            `,
                  cursor: 'pointer',
                  imageRendering: 'pixelated',
                  clipPath: `polygon(
              12px 0, calc(100% - 12px) 0,
              100% 12px, 100% calc(100% - 12px),
              calc(100% - 12px) 100%, 12px 100%,
              0 calc(100% - 12px), 0 12px
            )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  transition: 'none',
                  filter: 'contrast(1.1) saturate(1.2)',
                  padding: '12px'
                }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {/* Blocky Pixelated Speaker Icon */}
                <div style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  imageRendering: 'pixelated',
                  transform: isMobile ? 'scale(0.7)' : 'none'
                }}>
                  {/* Speaker body */}
                  <div style={{
                    position: 'absolute',
                    left: '0px',
                    top: '12px',
                    width: '12px',
                    height: '16px',
                    background: '#FFF',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                  }} />
                  {/* Speaker cone */}
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '8px',
                    width: '8px',
                    height: '8px',
                    background: '#FFF',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '24px',
                    width: '8px',
                    height: '8px',
                    background: '#FFF',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                  }} />

                  {isMuted ? (
                    // X mark for muted
                    <>
                      <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '8px',
                        width: '4px',
                        height: '24px',
                        background: '#FFF',
                        transform: 'rotate(45deg)',
                        transformOrigin: 'center',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '8px',
                        width: '4px',
                        height: '24px',
                        background: '#FFF',
                        transform: 'rotate(-45deg)',
                        transformOrigin: 'center',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                      }} />
                    </>
                  ) : (
                    // Sound waves for unmuted
                    <>
                      <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '14px',
                        width: '4px',
                        height: '12px',
                        background: '#FFF',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: '30px',
                        top: '10px',
                        width: '4px',
                        height: '20px',
                        background: '#FFF',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: '36px',
                        top: '6px',
                        width: '4px',
                        height: '28px',
                        background: '#FFF',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                      }} />
                    </>
                  )}
                </div>
              </motion.button>
            </div>

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 2.0 }}
            >
              {/* CAMERA WRAPPER: Shifts everything when cameraPosition changes */}
              <motion.div
                className="absolute inset-0 min-h-screen w-full"
                animate={{
                  x: cameraPosition === 'left' ? '100vw' : '0vw'
                }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 15,
                  mass: 1.2
                }}
              >
                {/* Pixelated Arrow Sign - Bottom Left */}
                <motion.div
                  className="absolute bottom-[60px] left-[5%] z-40 cursor-pointer group"
                  onClick={() => {
                    setCameraPosition('left');
                    // Trigger confetti
                    confetti({
                      particleCount: 50,
                      spread: 60,
                      origin: { x: 0.1, y: 0.8 }
                    });
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    imageRendering: 'pixelated',
                    display: cameraPosition === 'left' ? 'none' : 'block'
                  }}
                >
                  {/* Wooden Post */}
                  <div style={{
                    width: '12px',
                    height: '40px',
                    background: '#5D4037',
                    margin: '0 auto',
                    border: '2px solid #3E2723',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.4)'
                  }} />

                  {/* Arrow Board */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '30px',
                    background: '#8D6E63',
                    clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 0 50%)', // Arrow shape pointing left
                    border: '2px solid #5D4037',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Text on sign */}
                    <span style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '8px',
                      color: '#3E2723',
                      marginLeft: '10px'
                    }}>
                      MAP
                    </span>
                  </div>
                </motion.div>

                {/* Pixelated Arrow Sign - Bottom Right of the LEFT MAP (Visible only when on LEFT view, to go back) */}
                <motion.div
                  className="absolute bottom-[60px] left-[-5%] z-40 cursor-pointer group"
                  onClick={() => setCameraPosition('center')}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    imageRendering: 'pixelated',
                    display: cameraPosition === 'left' ? 'block' : 'none',
                  }}
                >
                  {/* Wooden Post */}
                  <div style={{
                    width: '12px',
                    height: '40px',
                    background: '#5D4037',
                    margin: '0 auto',
                    border: '2px solid #3E2723',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.4)'
                  }} />
                  {/* Arrow Board - Pointing Right */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '30px',
                    background: '#8D6E63',
                    clipPath: 'polygon(0 0, 60% 0, 100% 50%, 60% 100%, 0 100%)', // Arrow shape pointing right
                    border: '2px solid #5D4037',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Text on sign */}
                    <span style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '8px',
                      color: '#3E2723',
                      marginLeft: '4px'
                    }}>
                      HOME
                    </span>
                  </div>
                </motion.div>

                {/* THE LEFT SIDE OF THE MAP (Hidden by default, shifts into view) */}
                <div className="absolute top-0 left-[-100vw] w-full h-full z-0">

                  {/* User Gallery Overlay - Scrollable & Interactive */}
                  <div className="absolute inset-0 z-30 pointer-events-auto">
                    <UserGallery users={users} />
                  </div>

                  {/* Ground for Left Side */}
                  <div className="absolute bottom-0 w-full pointer-events-none z-10">
                    <PixelGrass />
                  </div>

                  {/* Clouds for Left Side */}
                  <div className="clouds-container pointer-events-none z-10">
                    <PixelCloud delay={2} yPosition="12%" size={1.1} speed={42} timeOfDay={currentTimeOfDay} />
                    <PixelCloud delay={12} yPosition="22%" size={0.95} speed={48} timeOfDay={currentTimeOfDay} />
                    <PixelCloud delay={7} yPosition="18%" size={1.05} speed={46} timeOfDay={currentTimeOfDay} />
                  </div>

                  {/* Birds for Left Side */}
                  <motion.div
                    className="pointer-events-none z-10"
                    animate={{ opacity: (currentTimeOfDay === 'day' || currentTimeOfDay === 'sunset' || currentTimeOfDay === 'twilight') ? 1 : 0 }}
                    transition={{ duration: 2 }}
                  >
                    <PixelBird delay={3} yPosition="18%" duration={22} />
                    <PixelBird delay={15} yPosition="28%" duration={26} />
                  </motion.div>
                </div>


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

                    {/* Sohail Exclusive background: Flying Divine Body */}
                    <AnimatePresence>
                      {selectedUser === 'sohail' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <PixelFlyingSohail delay={0} yPosition="20%" duration={40} />
                        </motion.div>
                      )}
                    </AnimatePresence>
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

                {/* Wildflowers and Pollen Layer */}
                <PixelWildflowers />
                <FloatingPollen timeOfDay={currentTimeOfDay} />

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

                {/* Main Content - Toggleable Visibility (Opacity Only for Performance) */}
                <motion.div
                  className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 py-8"
                  animate={{
                    opacity: showCards ? 1 : 0,
                    scale: showCards ? 1 : 0.95,
                    pointerEvents: showCards ? 'auto' : 'none',
                    filter: showCards ? 'blur(0px)' : 'blur(0px)' // Removed blur for performance
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
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
                    className="mb-16 text-center main-title"
                  >
                    <TypeAnimation
                      sequence={[
                        'SELECT A CHoR',
                        2000,
                        'CHOOSE YOUR HERO',
                        2000,
                        'START ADVENTURE',
                        2000,
                        'PICK YOUR AVATAR',
                        2000
                      ]}
                      wrapper="h1"
                      speed={50}
                      repeat={Infinity}
                      className="text-2xl sm:text-4xl md:text-6xl mb-4 text-white px-4 block"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        textShadow: '4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.3)',
                        letterSpacing: '2px',
                        imageRendering: 'pixelated'
                      }}
                    />
                  </motion.div>

                  {/* User Selection Carousel with Arrows */}
                  <div className="relative w-full max-w-7xl mb-12">
                    {/* Left Arrow - Minecraft Stone Button Style */}
                    {currentPage > 0 && (
                      <motion.button
                        onClick={prevPage}
                        whileHover={{ scale: 1.1, x: -8 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-1 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #999 0%, #666 100%)',
                          border: '5px solid #000',
                          boxShadow: '0 8px 0 #444, 0 12px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
                          imageRendering: 'pixelated',
                          clipPath: `polygon(
                      8px 0, calc(100% - 8px) 0,
                      100% 8px, 100% calc(100% - 8px),
                      calc(100% - 8px) 100%, 8px 100%,
                      0 calc(100% - 8px), 0 8px
                    )`
                        }}
                      >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(2px 2px 0 #000)' }}>
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                    )}

                    {/* Right Arrow - Minecraft Stone Button Style */}
                    {currentPage < totalPages - 1 && (
                      <motion.button
                        onClick={nextPage}
                        whileHover={{ scale: 1.1, x: 8 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-1 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #999 0%, #666 100%)',
                          border: '5px solid #000',
                          boxShadow: '0 8px 0 #444, 0 12px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
                          imageRendering: 'pixelated',
                          clipPath: `polygon(
                      8px 0, calc(100% - 8px) 0,
                      100% 8px, 100% calc(100% - 8px),
                      calc(100% - 8px) 100%, 8px 100%,
                      0 calc(100% - 8px), 0 8px
                    )`
                        }}
                      >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(2px 2px 0 #000)' }}>
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    )}

                    {/* User Cards - Minecraft Wooden Panel Style - Mobile Responsive */}
                    <div className="overflow-hidden w-full px-4 sm:px-12 md:px-24 mb-8 carousel-container">
                      <motion.div
                        className="flex"
                        animate={{ x: `-${currentPage * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {userEntries.map(([userKey, userData], index) => (
                          <motion.div
                            key={userKey}
                            className="flex-shrink-0 px-2 sm:px-3 box-border"
                            style={{
                              width: `${100 / usersPerPage}%`,
                              zIndex: selectedUser === userKey ? 10 : 1,
                              willChange: 'transform, opacity',
                              opacity: hoveredUser && hoveredUser !== userKey && selectedUser !== userKey ? 0.6 : 1,
                              filter: hoveredUser && hoveredUser !== userKey && selectedUser !== userKey ? 'grayscale(80%)' : 'none',
                              transition: 'opacity 0.3s ease, filter 0.3s ease'
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -12, scale: 1.05 }}
                            onClick={() => handleUserSelect(userKey)}
                            onMouseEnter={() => setHoveredUser(userKey)}
                            onMouseLeave={() => setHoveredUser(null)}
                          >
                            <Tilt
                              tiltMaxAngleX={15}
                              tiltMaxAngleY={15}
                              perspective={1000}
                              scale={1.05}
                              transitionSpeed={1500}
                              glareEnable={true}
                              glareMaxOpacity={0.45}
                              glareColor={selectedUser === userKey ? userData.accent : "#ffffff"}
                              glarePosition="all"
                              glareBorderRadius="0px" // Square corners for Minecraft style
                              className="h-full"
                            >
                              <div
                                className="p-6 relative h-full"
                                style={{
                                  backgroundColor: userData.isSpecial ? '#1D1D1F' : '#8B7355',
                                  background: userData.isSpecial
                                    ? `url("https://www.transparenttextures.com/patterns/dark-matter.png"), radial-gradient(circle at center, ${userData.color}33 0%, #000 100%)`
                                    : selectedUser === userKey
                                      ? `linear-gradient(135deg, ${userData.color}, ${userData.accent})`
                                      : 'repeating-linear-gradient(0deg, #8B7355, #8B7355 4px, #A0826D 4px, #A0826D 8px)',
                                  border: userData.isSpecial ? `6px solid ${userData.color}` : '6px solid #000',
                                  boxShadow: userData.isSpecial
                                    ? `0 0 40px ${userData.color}66, inset 0 0 20px ${userData.color}33`
                                    : selectedUser === userKey
                                      ? `0 8px 0 ${userData.accent}, 0 12px 0 #000, inset 0 4px 0 rgba(255,255,255,0.3), 0 0 30px ${userData.color}`
                                      : '0 8px 0 #6B5A45, 0 12px 0 #000, inset 0 4px 0 rgba(255,255,255,0.2)',
                                  transition: 'all 0.3s ease',
                                  imageRendering: 'pixelated',
                                  opacity: 1
                                }}
                              >
                                {/* Character Aura - Glow Effect */}
                                {userData.isSpecial && (
                                  <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                      boxShadow: `0 0 60px ${userData.color}44`,
                                      borderRadius: '0px'
                                    }}
                                    animate={{
                                      opacity: [0.4, 0.8, 0.4],
                                      scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  />
                                )}

                                {/* Floating Aura Particles for special users */}
                                {userData.isSpecial && [...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={`aura-${i}`}
                                    className="absolute w-1.5 h-1.5 pointer-events-none"
                                    style={{
                                      background: userData.color,
                                      left: '50%',
                                      top: '50%',
                                      boxShadow: `0 0 8px ${userData.color}`
                                    }}
                                    animate={{
                                      x: [
                                        Math.cos(i * 30 * Math.PI / 180) * 80,
                                        Math.cos((i * 30 + 180) * Math.PI / 180) * 100,
                                        Math.cos(i * 30 * Math.PI / 180) * 80
                                      ],
                                      y: [
                                        Math.sin(i * 30 * Math.PI / 180) * 120,
                                        Math.sin((i * 30 + 180) * Math.PI / 180) * 140,
                                        Math.sin(i * 30 * Math.PI / 180) * 120
                                      ],
                                      opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                      duration: 4 + Math.random() * 2,
                                      repeat: Infinity,
                                      delay: i * 0.3
                                    }}
                                  />
                                ))}

                                {/* Special Label */}
                                {userData.specialText && (
                                  <div
                                    className="absolute top-4 left-4 z-10 px-2 py-1 text-[8px] text-white font-bold"
                                    style={{
                                      fontFamily: "'Press Start 2P', cursive",
                                      background: userData.color,
                                      border: '2px solid #000',
                                      boxShadow: '2px 2px 0 #000'
                                    }}
                                  >
                                    {userData.specialText}
                                  </div>
                                )}
                                {/* Character Full Body */}
                                <div
                                  className="mb-4 mx-auto w-full h-48 relative pointer-events-none"
                                  style={userData.isSpecial ? { transform: 'translateY(0px)' } : {}}
                                >
                                  <FullBodyCharacter
                                    userKey={userKey}
                                    userData={userData}
                                    isSelected={selectedUser === userKey}
                                    animationState={selectedUser === userKey && userData.isSpecial ? 'levitate' : (selectedUser === userKey ? 'wave' : 'idle')}
                                  />
                                </div>

                                {/* Name - Minecraft Font Style */}
                                <div
                                  className="text-center text-white text-sm mb-2 uppercase pointer-events-none"
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
                                      className="absolute -top-3 -right-3 w-12 h-12 flex items-center justify-center pointer-events-none"
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
                                        className="absolute w-2 h-2 pointer-events-none"
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
                                    <PixelBurst color={userData.color} />
                                    {/* Enchanted Item Glint Overlay */}
                                    <EnchantedGlint />
                                  </>
                                )}
                              </div>
                            </Tilt>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Page Indicators - Minecraft Style */}
                    <div className="flex justify-center gap-4 mt-10 relative z-50">
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
                        className="flex flex-col gap-4 sm:gap-6 px-4 action-button items-center justify-center"
                      >
                        {/* Mobile Music Player - Only shows when character is tapped */}
                        {isMobile && (
                          <div
                            className="w-full max-w-[280px] p-3 mb-2"
                            style={{
                              backgroundColor: '#4e4e4e',
                              backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-matter.png")`,
                              border: '4px solid #000',
                              boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.6), 4px 4px 0 rgba(0,0,0,0.3)',
                              imageRendering: 'pixelated'
                            }}
                          >
                            <div className="text-[8px] text-[#AAAAAA] mb-2 font-['Press_Start_2P']">CHANGE MUSIC</div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
                                }}
                                className="p-2 bg-[#bebebe] border-2 border-black active:translate-y-0.5"
                                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', color: '#000' }}
                              >
                                ◀
                              </button>
                              <div className="flex-1 text-[8px] text-white text-center font-['Press_Start_2P'] truncate">
                                {musicTracks[currentTrack].name.split('-')[1]?.trim() || musicTracks[currentTrack].name}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
                                }}
                                className="p-2 bg-[#bebebe] border-2 border-black active:translate-y-0.5"
                                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', color: '#000' }}
                              >
                                ▶
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-row gap-4 sm:gap-6 w-full justify-center">
                          {/* Cancel Button - Magnetic & Minecraft Red Stone Style */}
                          <MagneticButton
                            onClick={handleCancel}
                            className="cursor-pointer"
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95, boxShadow: '0 2px 0 #660000, 0 4px 0 #000' }}
                              className="px-4 sm:px-10 py-2 sm:py-5 text-white uppercase text-[10px] sm:text-sm"
                              style={{
                                fontFamily: "'Press Start 2P', monospace",
                                background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
                                border: isMobile ? '2px solid #000' : '4px solid #000',
                                boxShadow: isMobile ? '0 4px 0 #660000, 0 6px 0 #000' : '0 6px 0 #660000, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
                                letterSpacing: isMobile ? '1px' : '2px',
                                imageRendering: 'pixelated'
                              }}
                              disabled={isLoading}
                            >
                              CANCEL
                            </motion.button>
                          </MagneticButton>

                          {/* Login Button - Magnetic & Minecraft Diamond Style */}
                          <MagneticButton
                            onClick={handleLogin}
                            className="cursor-pointer"
                          >
                            <motion.button
                              disabled={isLoading}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95, boxShadow: '0 2px 0 #0066AA, 0 4px 0 #000' }}
                              className="px-4 sm:px-10 py-2 sm:py-5 text-white uppercase text-[10px] sm:text-sm"
                              style={{
                                fontFamily: "'Press Start 2P', monospace",
                                background: isLoading
                                  ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                                  : 'linear-gradient(135deg, #00AAFF 0%, #0088CC 100%)',
                                border: isMobile ? '2px solid #000' : '4px solid #000',
                                boxShadow: isLoading
                                  ? (isMobile ? '0 4px 0 #333, 0 6px 0 #000' : '0 6px 0 #333, 0 10px 0 #000')
                                  : (isMobile ? '0 4px 0 #0066AA, 0 6px 0 #000' : '0 6px 0 #0066AA, 0 10px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)'),
                                letterSpacing: isMobile ? '1px' : '2px',
                                imageRendering: 'pixelated'
                              }}
                            >
                              {isLoading ? 'LOADING...' : 'LOGIN'}
                            </motion.button>
                          </MagneticButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>

                {/* Pixelated Ground/Grass at bottom */}
                <PixelGrass />
              </motion.div>
            </motion.div>


            {/* Login Overlay - Minecraft Style */}
            < AnimatePresence >
              {showLoginOverlay && selectedUser && (
                <LoginOverlay
                  userKey={selectedUser}
                  userData={users[selectedUser]}
                  onClose={() => setShowLoginOverlay(false)}
                />
              )}
            </AnimatePresence >


          </motion.div>
    </motion.div >
      );
};

      export default Home;
