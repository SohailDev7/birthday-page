// components/NowPlayingOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Music,
  X,
  ListMusic,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './NowPlayingOverlay.css';

// Import all your music files
import noonenoticed from '../assets/songs/noonenoticed.mp3';
import aboutyou from '../assets/songs/aboutyou.mp3';

const NowPlayingOverlay = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('full'); // 'closed', 'compact', 'full'
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const { currentTheme } = useTheme();

  // Music library with imported files
  const musicLibrary = [
    {
      id: 1,
      title: "No One Noticed",
      artist: "The Marias",
      album: "Submarine",
      duration: 214,
      url: noonenoticed,
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqi7ZwiwgyfC1aabsiwxO7DIPrSlTAT3ds7w&s"
    },
    {
      id: 2,
      title: "About You",
      artist: "The 1975",
      album: "Being Funny in a Foreign Language",
      duration: 326,
      url: aboutyou,
      cover: "data:image/jpeg;base64,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"
    }
  ];

  // Cookie helper functions
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Load playback state and view mode from cookies
  useEffect(() => {
    const savedViewMode = getCookie('nowPlayingViewMode');
    const savedState = localStorage.getItem('nowPlayingState');
    
    // Set view mode from cookie
    if (savedViewMode && ['closed', 'compact', 'full'].includes(savedViewMode)) {
      setViewMode(savedViewMode);
    }

    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.currentSong) {
        const savedSong = musicLibrary.find(song => song.id === state.currentSong.id);
        if (savedSong) {
          setCurrentSong(savedSong);
          setCurrentTime(state.currentTime || 0);
          setProgress(state.progress || 0);
          setIsPlaying(state.isPlaying || false);
        }
      }
    } else {
      playSong(musicLibrary[0]);
    }
  }, []);

  // Save view mode to cookie
  useEffect(() => {
    setCookie('nowPlayingViewMode', viewMode, 365);
  }, [viewMode]);

  // Save playback state to localStorage
  useEffect(() => {
    if (currentSong) {
      const state = {
        currentSong: {
          id: currentSong.id,
          title: currentSong.title,
          artist: currentSong.artist,
          album: currentSong.album,
          duration: currentSong.duration,
          cover: currentSong.cover
        },
        currentTime,
        progress,
        isPlaying,
        timestamp: Date.now()
      };
      localStorage.setItem('nowPlayingState', JSON.stringify(state));
    }
  }, [currentSong, currentTime, progress, isPlaying]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      if (currentTime > 0 && !isDragging) {
        audio.currentTime = currentTime;
      }
      if (isPlaying && !isDragging) {
        audio.play().catch(error => {
          console.log('Auto-play prevented:', error);
          setIsPlaying(false);
        });
      }
    };

    const handleError = (error) => {
      console.error('Audio error:', error);
      setIsPlaying(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTime, isPlaying, isDragging]);

  // Audio time update handler
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setCurrentTime(current);
      setProgress(duration ? (current / duration) * 100 : 0);
    }
  };

  // Play/pause toggle
  const togglePlayPause = async () => {
    if (!audioRef.current || !currentSong) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Play/pause error:', error);
      setIsPlaying(false);
    }
  };

  // Select and play a song
  const playSong = async (song, resetTime = true) => {
    const wasPlaying = isPlaying;
    setCurrentSong(song);
    if (resetTime) {
      setCurrentTime(0);
      setProgress(0);
    }
    setIsPlaying(true);
    if (viewMode === 'closed') {
      setViewMode('compact');
    }
    
    setTimeout(async () => {
      if (audioRef.current) {
        try {
          if (resetTime) {
            audioRef.current.currentTime = 0;
          }
          if (wasPlaying) {
            await audioRef.current.play();
          }
        } catch (error) {
          console.error('Play error:', error);
          setIsPlaying(false);
        }
      }
    }, 100);
  };

  // Skip to next song
  const nextSong = () => {
    if (currentSong) {
      const currentIndex = musicLibrary.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % musicLibrary.length;
      playSong(musicLibrary[nextIndex], true);
    }
  };

  // Skip to previous song
  const prevSong = () => {
    if (currentSong) {
      const currentIndex = musicLibrary.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + musicLibrary.length) % musicLibrary.length;
      playSong(musicLibrary[prevIndex], true);
    }
  };

  // Change view mode
  const setViewModeWithSave = (mode) => {
    setViewMode(mode);
    setCookie('nowPlayingViewMode', mode, 365);
  };

  // Progress bar drag handlers
  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e);
    document.addEventListener('mousemove', handleProgressMouseMove);
    document.addEventListener('mouseup', handleProgressMouseUp);
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleProgressMouseMove);
    document.removeEventListener('mouseup', handleProgressMouseUp);
    
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (progress / 100) * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Touch handlers for mobile
  const handleProgressTouchStart = (e) => {
    setIsDragging(true);
    updateProgress(e.touches[0]);
    document.addEventListener('touchmove', handleProgressTouchMove);
    document.addEventListener('touchend', handleProgressTouchEnd);
  };

  const handleProgressTouchMove = (e) => {
    if (isDragging) {
      updateProgress(e.touches[0]);
    }
  };

  const handleProgressTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener('touchmove', handleProgressTouchMove);
    document.removeEventListener('touchend', handleProgressTouchEnd);
    
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (progress / 100) * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateProgress = (event) => {
    if (!progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (event.clientX - rect.left) / progressBar.offsetWidth));
    const newProgress = clickPosition * 100;
    
    setProgress(newProgress);
    
    if (audioRef.current && audioRef.current.duration) {
      const newTime = clickPosition * audioRef.current.duration;
      setCurrentTime(newTime);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
        onError={(e) => console.error('Audio element error:', e)}
      />

      {/* Closed State - Small Music Button */}
      <AnimatePresence>
        {viewMode === 'closed' && (
          <motion.button
            className="music-launcher-btn"
            onClick={() => setViewModeWithSave('compact')}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Music size={20} />
            {isPlaying && (
              <motion.div
                className="playing-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Compact Player */}
      <AnimatePresence>
        {viewMode === 'compact' && (
          <motion.div
            className="now-playing-compact"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Song Info in Compact Mode */}
            {currentSong && (
              <div className="compact-song-info">
                <div className="compact-album-art">
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.album}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRjNCN0ZGIi8+CjxwYXRoIGQ9Ik0xNSA3QzEyLjIzOSA3IDEwIDkuMjM5IDEwIDEyQzEwIDE0Ljc2MSAxMi4yMzkgMTcgMTUgMTdDMTcuNzYxIDE3IDIwIDE0Ljc2MSAyMCAxMkMyMCA5LjIzOSAxNy43NjEgNyAxNSA3WiIgZmlsbD0iI0VCNDg5OSIvPgo8cGF0aCBkPSJNMTMgMTFIMTdWMTVIMTNWMTFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <div className="compact-song-details">
                  <div className="compact-song-title">{currentSong.title}</div>
                  <div className="compact-song-artist">{currentSong.artist}</div>
                </div>
              </div>
            )}

            <div className="compact-controls">
              <button 
                className="control-btn-compact"
                onClick={prevSong}
                disabled={!currentSong}
              >
                <SkipBack size={16} />
              </button>
              
              <button 
                className="play-pause-btn-compact"
                onClick={togglePlayPause}
                disabled={!currentSong}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button 
                className="control-btn-compact"
                onClick={nextSong}
                disabled={!currentSong}
              >
                <SkipForward size={16} />
              </button>
            </div>

            <div className="compact-actions">
              <button 
                className="action-btn-compact"
                onClick={() => setViewModeWithSave('full')}
                title="Expand"
              >
                <Maximize2 size={14} />
              </button>
              <button 
                className="action-btn-compact"
                onClick={() => setViewModeWithSave('closed')}
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Player */}
      <AnimatePresence>
        {viewMode === 'full' && (
          <motion.div
            className="now-playing-player"
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Header with controls */}
            <div className="player-header">
              <div className="player-title">
                <Music size={16} />
                <span>Now Playing</span>
              </div>
              <div className="player-header-actions">
                <button 
                  className="header-action-btn"
                  onClick={() => setViewModeWithSave('compact')}
                  title="Minimize"
                >
                  <Minimize2 size={14} />
                </button>
                <button 
                  className="header-action-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title="Library"
                >
                  <ListMusic size={14} />
                </button>
                <button 
                  className="header-action-btn"
                  onClick={() => setViewModeWithSave('closed')}
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Current Song Info */}
            {currentSong && (
              <div className="player-current-info">
                <div className="player-album-art">
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.album}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNCN0ZGIi8+CjxwYXRoIGQ9Ik0yMCAxMEMxNi40MzMgMTAgMTQgMTIuNDMzIDE0IDE2QzE0IDE5LjU2NyAxNi40MzMgMjIgMjAgMjJDMjMuNTY3IDIyIDI2IDE5LjU2cyAyNiAxNkMyNiAxMi40MzMgMjMuNTY3IDEwIDIwIDEwWiIgZmlsbD0iI0VCNDg5OSIvPgo8cGF0aCBkPSJNMTcgMTRIMjNWMThIMTdWMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <div className="player-song-details">
                  <div className="player-song-title">{currentSong.title}</div>
                  <div className="player-song-artist">{currentSong.artist}</div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="player-controls-main">
              <button 
                className="control-btn"
                onClick={prevSong}
                disabled={!currentSong}
              >
                <SkipBack size={20} />
              </button>
              
              <button 
                className="play-pause-btn-main"
                onClick={togglePlayPause}
                disabled={!currentSong}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button 
                className="control-btn"
                onClick={nextSong}
                disabled={!currentSong}
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            {currentSong && (
              <div className="player-progress-section">
                <div className="player-time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
                <div 
                  ref={progressBarRef}
                  className="player-progress-bar"
                  onMouseDown={handleProgressMouseDown}
                  onTouchStart={handleProgressTouchStart}
                >
                  <div 
                    className="player-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="player-progress-thumb"
                    style={{ left: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Library Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="library-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            
            <motion.div
              className="library-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="library-header">
                <h3 className="library-title">
                  <Music className="me-2" size={20} />
                  Music Library
                </h3>
                <button
                  className="library-close-btn"
                  onClick={() => setIsExpanded(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="library-content">
                <div className="library-info">
                  <p>{musicLibrary.length} songs in library</p>
                </div>
                
                <div className="song-list-main">
                  {musicLibrary.map((song) => (
                    <div
                      key={song.id}
                      className={`song-item-main ${currentSong?.id === song.id ? 'active' : ''}`}
                      onClick={() => playSong(song, true)}
                    >
                      <div className="song-item-art-main">
                        <img 
                          src={song.cover} 
                          alt={song.album}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNCN0ZGIi8+CjxwYXRoIGQ9Ik0yMCAxMEMxNi40MzMgMTAgMTQgMTIuNDMzIDE0IDE2QzE0IDE5LjU2NyAxNi40MzMgMjIgMjAgMjJDMjMuNTY3IDIyIDI2IDE5LjU2cyAyNiAxNkMyNiAxMi40MzMgMjMuNTY3IDEwIDIwIDEwWiIgZmlsbD0iI0VCNDg5OSIvPgo8cGF0aCBkPSJNMTcgMTRIMjNWMThIMTdWMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                      <div className="song-item-info-main">
                        <div className="song-item-title-main">{song.title}</div>
                        <div className="song-item-artist-main">{song.artist}</div>
                        <div className="song-item-album-main">{song.album}</div>
                      </div>
                      <div className="song-item-duration-main">
                        {formatTime(song.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NowPlayingOverlay;