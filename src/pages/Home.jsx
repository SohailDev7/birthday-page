import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // User data
  const users = {
    yuzence: { color: '#007AFF', bgClass: 'bg-yuzence', displayName: 'Yuzence' },
    prachi: { color: '#FF2D92', bgClass: 'bg-prachi', displayName: 'Prachi' },
    manash: { color: '#1D1D1F', bgClass: 'bg-manash', displayName: 'Manash' },
    sameer: { color: '#FF9F0A', bgClass: 'bg-sameer', displayName: 'Sameer' }
  };

  const names = ['yuzence', 'prachi', 'manash', 'sameer'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('yuzence');
  const nameIntervalRef = useRef(null);

  const totalCycles = 16; // 4 names × 4 cycles each

  const cycleNames = () => {
    setCycleCount(prev => prev + 1);
    const nextIndex = (currentIndex + 1) % names.length;
    setCurrentIndex(nextIndex);
    setCurrentBackground(names[nextIndex]);
  };

  useEffect(() => {
    if (cycleCount >= totalCycles) {
      clearInterval(nameIntervalRef.current);
      setTimeout(() => {
        setShowLoginDialog(true);
        setCurrentBackground('default');
      }, 1000);
    }
  }, [cycleCount]);

  useEffect(() => {
    // Only start interval if not showing dialog
    if (!showLoginDialog) {
      nameIntervalRef.current = setInterval(cycleNames, 200);
    }
    
    return () => {
      if (nameIntervalRef.current) {
        clearInterval(nameIntervalRef.current);
      }
    };
  }, [showLoginDialog, currentIndex]); // Added showLoginDialog to dependencies

  const handleUserSelect = (event) => {
    const user = event.target.value;
    setSelectedUser(user);
    if (user) {
      setCurrentBackground(user);
    } else {
      setCurrentBackground('default');
    }
  };

  const handleLogin = () => {
    if (selectedUser) {
      setIsLoading(true);
      setTimeout(() => {
        // Navigate to user dashboard
        navigate(`/${selectedUser}/login`);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setShowLoginDialog(false);
    setSelectedUser('');
    setCurrentIndex(0);
    setCycleCount(0);
    setIsLoading(false);
    setCurrentBackground(names[0]);
    
    // Clear any existing interval
    if (nameIntervalRef.current) {
      clearInterval(nameIntervalRef.current);
    }
    
    // Restart the animation
    setTimeout(() => {
      nameIntervalRef.current = setInterval(cycleNames, 200);
    }, 300);
  };

  const getCurrentBackgroundClass = () => {
    if (currentBackground === 'default') return 'bg-default';
    return users[currentBackground]?.bgClass || 'bg-default';
  };

  const getCurrentSvgBackground = () => {
    if (currentBackground === 'default') return 'defaultBg';
    return `${currentBackground}Bg`;
  };

  const getButtonStyle = () => {
    if (!selectedUser) return {};
    return {
      background: `linear-gradient(135deg, ${users[selectedUser].color} 0%, ${darkenColor(users[selectedUser].color, 20)} 100%)`,
      boxShadow: `0 4px 14px ${hexToRGBA(users[selectedUser].color, 0.3)}`
    };
  };

  // Helper function to darken color
  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  };

  // Helper function to convert hex to RGBA
  const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className={`home-container ${getCurrentBackgroundClass()}`}>
      {/* SVG Backgrounds */}
      <div id="defaultBg" className={`svg-bg ${getCurrentSvgBackground() === 'defaultBg' ? 'active' : ''}`}>
        <svg className="floating-svg" style={{ top: '5%', left: '5%', width: '60px', height: '60px' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="#E5E7EB" opacity="0.3"/>
          <circle cx="50" cy="50" r="15" fill="#9CA3AF" opacity="0.4"/>
        </svg>
        <svg className="floating-svg" style={{ top: '15%', right: '8%', width: '45px', height: '45px' }} viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" rx="10" fill="#D1D5DB" opacity="0.3"/>
        </svg>
        <svg className="floating-svg" style={{ top: '75%', left: '8%', width: '55px', height: '55px' }} viewBox="0 0 100 100">
          <polygon points="50,20 70,70 30,70" fill="#F3F4F6" opacity="0.4"/>
        </svg>
        <svg className="floating-svg" style={{ top: '85%', right: '12%', width: '40px', height: '40px' }} viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="25" ry="15" fill="#E5E7EB" opacity="0.3"/>
        </svg>
        <svg className="floating-svg" style={{ top: '45%', left: '3%', width: '35px', height: '35px' }} viewBox="0 0 100 100">
          <path d="M50 10 L60 40 L90 40 L70 60 L80 90 L50 70 L20 90 L30 60 L10 40 L40 40 Z" fill="#9CA3AF" opacity="0.2"/>
        </svg>
        <svg className="floating-svg" style={{ top: '25%', right: '25%', width: '50px', height: '50px' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="none" stroke="#D1D5DB" strokeWidth="3" opacity="0.3"/>
        </svg>
      </div>

      {/* User-specific SVG backgrounds */}
      {names.map(userKey => (
        <div 
          key={userKey}
          id={`${userKey}Bg`} 
          className={`svg-bg ${getCurrentSvgBackground() === `${userKey}Bg` ? 'active' : ''}`}
        >
          {/* Yuzence Background */}
          {userKey === 'yuzence' && (
            <>
              <svg className="floating-svg" style={{ top: '8%', left: '12%', width: '90px', height: '90px' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#007AFF" opacity="0.12"/>
                <path d="M30 45 L45 35 L70 50 L45 65 Z" fill="#007AFF" opacity="0.25"/>
              </svg>
              <svg className="floating-svg" style={{ top: '12%', right: '15%', width: '70px', height: '70px' }} viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" rx="15" fill="#007AFF" opacity="0.18"/>
                <circle cx="35" cy="35" r="8" fill="#007AFF" opacity="0.3"/>
                <circle cx="65" cy="65" r="8" fill="#007AFF" opacity="0.3"/>
              </svg>
              <svg className="floating-svg" style={{ top: '78%', left: '8%', width: '85px', height: '85px' }} viewBox="0 0 100 100">
                <path d="M20 50 Q50 20 80 50 Q50 80 20 50" fill="#007AFF" opacity="0.15"/>
                <circle cx="50" cy="50" r="12" fill="#007AFF" opacity="0.2"/>
              </svg>
            </>
          )}
          
          {/* Prachi Background */}
          {userKey === 'prachi' && (
            <>
              <svg className="floating-svg" style={{ top: '10%', left: '15%', width: '85px', height: '85px' }} viewBox="0 0 100 100">
                <path d="M50 10 L60 40 L90 40 L70 60 L80 90 L50 70 L20 90 L30 60 L10 40 L40 40 Z" fill="#FF2D92" opacity="0.18"/>
              </svg>
              <svg className="floating-svg" style={{ top: '15%', right: '12%', width: '75px', height: '75px' }} viewBox="0 0 100 100">
                <circle cx="50" cy="30" r="20" fill="#FF2D92" opacity="0.12"/>
                <path d="M30 50 Q50 70 70 50 Q50 30 30 50" fill="#FF2D92" opacity="0.2"/>
              </svg>
              <svg className="floating-svg" style={{ top: '75%', left: '10%', width: '95px', height: '95px' }} viewBox="0 0 100 100">
                <path d="M50 20 C70 20 80 40 60 60 C80 80 70 100 50 80 C30 100 20 80 40 60 C20 40 30 20 50 20" fill="#FF2D92" opacity="0.1"/>
              </svg>
            </>
          )}
          
          {/* Manash Background */}
          {userKey === 'manash' && (
            <>
              <svg className="floating-svg" style={{ top: '8%', left: '18%', width: '80px', height: '80px' }} viewBox="0 0 100 100">
                <rect x="25" y="25" width="50" height="50" fill="#1D1D1F" opacity="0.08"/>
                <rect x="35" y="35" width="30" height="30" fill="#1D1D1F" opacity="0.12"/>
                <rect x="42" y="42" width="16" height="16" fill="#1D1D1F" opacity="0.15"/>
              </svg>
              <svg className="floating-svg" style={{ top: '12%', right: '15%', width: '70px', height: '70px' }} viewBox="0 0 100 100">
                <polygon points="50,15 65,35 85,35 70,50 75,70 50,60 25,70 30,50 15,35 35,35" fill="#1D1D1F" opacity="0.06"/>
              </svg>
              <svg className="floating-svg" style={{ top: '75%', left: '12%', width: '90px', height: '90px' }} viewBox="0 0 100 100">
                <path d="M20 80 L50 20 L80 80 Z" fill="none" stroke="#1D1D1F" strokeWidth="3" opacity="0.1"/>
                <circle cx="50" cy="60" r="8" fill="#1D1D1F" opacity="0.08"/>
              </svg>
            </>
          )}
          
          {/* Sameer Background */}
          {userKey === 'sameer' && (
            <>
              <svg className="floating-svg" style={{ top: '10%', left: '18%', width: '85px', height: '85px' }} viewBox="0 0 100 100">
                <circle cx="50" cy="35" r="18" fill="#FF9F0A" opacity="0.15"/>
                <rect x="38" y="50" width="24" height="35" rx="12" fill="#FF9F0A" opacity="0.12"/>
                <circle cx="50" cy="25" r="6" fill="#FF9F0A" opacity="0.2"/>
              </svg>
              <svg className="floating-svg" style={{ top: '15%', right: '15%', width: '75px', height: '75px' }} viewBox="0 0 100 100">
                <path d="M50 20 L65 45 L90 45 L72 62 L78 87 L50 75 L22 87 L28 62 L10 45 L35 45 Z" fill="#FF9F0A" opacity="0.15"/>
              </svg>
              <svg className="floating-svg" style={{ top: '78%', left: '15%', width: '90px', height: '90px' }} viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" rx="35" ry="40" fill="#FF9F0A" opacity="0.08"/>
                <ellipse cx="50" cy="50" rx="20" ry="25" fill="#FF9F0A" opacity="0.12"/>
              </svg>
            </>
          )}
        </div>
      ))}

      {/* Welcome Screen */}
      {!showLoginDialog && (
        <div className="welcome-screen">
          <div className="name-container">
            {names.map((name, index) => (
              <div
                key={name}
                className={`name-item ${name} ${
                  index === currentIndex ? 'active' : ''
                } ${
                  index === (currentIndex - 1 + names.length) % names.length ? 'exiting' : ''
                }`}
              >
                {users[name].displayName}
              </div>
            ))}
          </div>
          <div className="chor-text">chor</div>
        </div>
      )}

      {/* Login Dialog */}
      <div className={`apple-dialog ${showLoginDialog ? 'visible' : ''}`}>
        <div className="dialog-header">
          <h2 
            id="dialogTitle" 
            className="dialog-title" 
            style={{ color: selectedUser ? users[selectedUser]?.color : '#9CA3AF' }}
          >
            {selectedUser ? `Welcome, ${users[selectedUser]?.displayName}` : 'Select User'}
          </h2>
          <p className="dialog-subtitle">
            {selectedUser ? 'Ready to continue?' : 'Choose your account to continue'}
          </p>
        </div>

        <div className="dialog-body">
          <select 
            id="userSelect" 
            className="custom-select"
            value={selectedUser}
            onChange={handleUserSelect}
          >
            <option value="" disabled>Select a user...</option>
            {Object.keys(users).map(userKey => (
              <option key={userKey} value={userKey}>
                {users[userKey].displayName}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button 
              className="apple-btn apple-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="apple-btn apple-btn-primary dynamic-primary-btn"
              onClick={handleLogin}
              disabled={!selectedUser || isLoading}
              style={getButtonStyle()}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Redirecting to {users[selectedUser]?.displayName}'s dashboard
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add dynamic hover styles */}
      <style jsx>{`
        .dynamic-primary-btn:hover:not(:disabled) {
          ${selectedUser ? `
            background: linear-gradient(135deg, ${darkenColor(users[selectedUser].color, 20)} 0%, ${darkenColor(users[selectedUser].color, 40)} 100%) !important;
            box-shadow: 0 6px 20px ${hexToRGBA(users[selectedUser].color, 0.4)} !important;
            transform: translateY(-1px);
          ` : ''}
        }
      `}</style>
    </div>
  );
};

export default Home;