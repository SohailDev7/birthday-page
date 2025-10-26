import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Sparkles, Zap, Crown, Skull } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './css/Prachi_TicTacToe.css';

const TicTacToe = () => {
  const { currentTheme } = useTheme();
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [gameActive, setGameActive] = useState(true);
  const [isCheating, setIsCheating] = useState(false);
  const [labelsSwitched, setLabelsSwitched] = useState(false);
  const [aiTurnInProgress, setAiTurnInProgress] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Initialize game
  const initGame = () => {
    setGameState(Array(9).fill(''));
    setCurrentPlayer('O');
    setGameActive(true);
    setIsCheating(false);
    setLabelsSwitched(false);
    setAiTurnInProgress(false);
    setWinner(null);
    setShowConfetti(false);
  };

  // Update scores when game ends
  useEffect(() => {
    if (!gameActive && winner) {
      setScores(prev => ({
        ...prev,
        ai: winner === 'X' ? prev.ai + 1 : prev.ai,
        player: winner === 'O' ? prev.player + 1 : prev.player,
        draws: !winner ? prev.draws + 1 : prev.draws
      }));
    }
  }, [gameActive, winner]);

  // Check for winner
  const checkWinner = (board, player) => {
    return winningConditions.some(condition => 
      condition.every(index => board[index] === player)
    );
  };

  // Check for draw
  const checkDraw = (board) => {
    return !board.includes('');
  };

  // Find winning move
  const findWinningMove = (board, player) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      const cells = [board[a], board[b], board[c]];
      
      if (cells.filter(cell => cell === player).length === 2 && cells.includes('')) {
        const emptyIndex = cells.indexOf('');
        return condition[emptyIndex];
      }
    }
    return -1;
  };

  // Check if player is about to win
  const isPlayerAboutToWin = (board) => {
    return findWinningMove(board, 'O') !== -1;
  };

  // AI Move with cheating
  const makeAIMove = (currentBoard) => {
    let moveIndex = -1;
    const newBoard = [...currentBoard];

    // 1. Try to win
    moveIndex = findWinningMove(newBoard, 'X');

    // 2. Block player or cheat
    if (moveIndex === -1) {
      const playerWinIndex = findWinningMove(newBoard, 'O');
      
      if (playerWinIndex !== -1 && isCheating) {
        setIsCheating(true);
        
        // Cheat by making two moves if possible
        const emptyCells = newBoard
          .map((cell, index) => cell === '' ? index : null)
          .filter(val => val !== null);

        if (emptyCells.length > 1) {
          // Make first cheating move
          const firstCheatIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          newBoard[firstCheatIndex] = 'X';
          
          // Make second cheating move (the blocking move)
          moveIndex = playerWinIndex;
        } else if (emptyCells.length === 1) {
          moveIndex = emptyCells[0];
        }
      } else if (playerWinIndex !== -1) {
        moveIndex = playerWinIndex;
      }
    }

    // 3. Take center
    if (moveIndex === -1 && newBoard[4] === '') {
      moveIndex = 4;
    }

    // 4. Random move
    if (moveIndex === -1) {
      const emptyCells = newBoard
        .map((cell, index) => cell === '' ? index : null)
        .filter(val => val !== null);
      
      if (emptyCells.length > 0) {
        moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    }

    if (moveIndex !== -1 && newBoard[moveIndex] === '') {
      newBoard[moveIndex] = 'X';
    }

    return newBoard;
  };

  // Handle cell click
  const handleCellClick = async (index) => {
    if (aiTurnInProgress || !gameActive || currentPlayer === 'X' || gameState[index] !== '') {
      return;
    }

    // Player makes move
    const newBoard = [...gameState];
    newBoard[index] = 'O';
    setGameState(newBoard);

    // Check if player is about to win (trigger cheating)
    if (isPlayerAboutToWin(newBoard) && !labelsSwitched) {
      setIsCheating(true);
    }

    // Check if player won (but we'll cheat)
    if (checkWinner(newBoard, 'O') && !labelsSwitched) {
      setLabelsSwitched(true);
      setWinner('X'); // Cheat: declare Soil Chor as winner
      setGameActive(false);
      setShowConfetti(true);
      return;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setWinner(null);
      setGameActive(false);
      return;
    }

    // AI's turn
    setCurrentPlayer('X');
    setAiTurnInProgress(true);

    // AI move with delay
    setTimeout(() => {
      const aiBoard = makeAIMove(newBoard);
      setGameState(aiBoard);

      // Check if AI won
      if (checkWinner(aiBoard, 'X')) {
        setWinner('X');
        setGameActive(false);
        setShowConfetti(true);
        return;
      }

      // Check for draw
      if (checkDraw(aiBoard)) {
        setWinner(null);
        setGameActive(false);
        return;
      }

      setCurrentPlayer('O');
      setAiTurnInProgress(false);
    }, 500 + Math.random() * 1000);
  };

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Animation variants
  const cellVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const symbolVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`tic-tac-toe-container ${currentTheme}`}>
      <div className="game-layout">
        {/* Left Side - Game Board */}
        <motion.div 
          className="game-board-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div 
            className="game-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="game-title"
              animate={{ 
                y: [0, -3, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Trophy size={24} />
              Unbeatable TicTacToe
            </motion.h1>
          </motion.div>

          {/* Game Board */}
          <motion.div 
            className="board-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={`game-board ${aiTurnInProgress ? 'disabled' : ''}`}>
              {gameState.map((cell, index) => (
                <motion.div
                  key={index}
                  className={`game-cell ${cell.toLowerCase()} ${!gameActive || aiTurnInProgress ? 'disabled' : ''}`}
                  variants={cellVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCellClick(index)}
                >
                  <AnimatePresence mode="wait">
                    {cell && (
                      <motion.div
                        className={`symbol ${cell.toLowerCase()}`}
                        variants={symbolVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {cell}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Status & Controls */}
          <motion.div 
            className="game-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="status-section">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlayer + gameActive}
                  className="status-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {!gameActive ? (
                    winner ? (
                      <span className="winner-text">
                        <Crown size={16} />
                        {labelsSwitched ? 'Soil Chor' : 'Soil Chor'} wins!
                      </span>
                    ) : (
                      <span className="draw-text">Game ended in a draw!</span>
                    )
                  ) : aiTurnInProgress ? (
                    <span className="thinking-text">
                      <Zap size={16} />
                      Soil Chor is thinking...
                    </span>
                  ) : (
                    `Your turn (${currentPlayer})`
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {isCheating && (
                  <motion.div
                    className="cheat-alert"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Sparkles size={14} />
                    Soil Chor is cheating!
                    <Sparkles size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              className="reset-button"
              onClick={initGame}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} />
              New Game
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - Players & Scores */}
        <motion.div 
          className="players-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Player O - Prachi */}
          <motion.div
            className={`player-card player-o ${currentPlayer === 'O' && gameActive ? 'active' : ''} ${winner === 'O' ? 'winner' : ''}`}
            animate={{ 
              y: currentPlayer === 'O' && gameActive ? [-2, 2, -2] : 0,
            }}
            transition={{ 
              duration: 2, 
              repeat: currentPlayer === 'O' && gameActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className="player-header">
              <h3>{labelsSwitched ? 'Soil Chor' : 'Prachi'}</h3>
              <motion.div 
                className="player-symbol o-symbol"
                animate={{ rotate: currentPlayer === 'O' ? [0, 5, -5, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                O
              </motion.div>
            </div>
            <p className="player-desc">✨Suun ko maxa</p>
            <div className="player-score">
              <Crown size={14} />
              <span>Wins: {scores.player}</span>
            </div>
          </motion.div>

          {/* VS Divider */}
          <motion.div 
            className="vs-divider"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            VS
          </motion.div>

          {/* Player X - Soil Chor */}
          <motion.div
            className={`player-card player-x ${currentPlayer === 'X' && gameActive ? 'active' : ''} ${winner === 'X' ? 'winner' : ''}`}
            animate={{ 
              y: currentPlayer === 'X' && gameActive ? [-2, 2, -2] : 0,
            }}
            transition={{ 
              duration: 2, 
              repeat: currentPlayer === 'X' && gameActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className="player-header">
              <h3>{labelsSwitched ? 'Prachi' : 'Soil Chor'}</h3>
              <motion.div 
                className="player-symbol x-symbol"
                animate={{ rotate: currentPlayer === 'X' ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                X
              </motion.div>
            </div>
            <p className="player-desc">The Suitcase Killer</p>
            <div className="player-score">
              <Skull size={14} />
              <span>Wins: {scores.ai}</span>
            </div>
          </motion.div>

          {/* Draws Counter */}
          <motion.div 
            className="draws-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="draws-label">Draws: {scores.draws}</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <ConfettiEffect />}
      </AnimatePresence>
    </div>
  );
};

// Confetti Component
const ConfettiEffect = () => {
  return (
    <div className="confetti-container">
      {Array.from({ length: 80 }, (_, i) => (
        <motion.div
          key={i}
          className="confetti-piece"
          initial={{ 
            y: -100, 
            x: Math.random() * window.innerWidth,
            opacity: 1,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: Math.random() * 200 - 100 + (Math.random() * window.innerWidth),
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: "easeOut"
          }}
          style={{
            background: `hsl(${Math.random() * 60 + 300}, 70%, 65%)`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

export default TicTacToe;