
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, RotateCcw, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Prachi_LieTruth.css';

const Prachi_LieTruth = () => {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [gamePhase, setGamePhase] = useState('truths'); 
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const questions = [
    {
      options: [
        "Prachi deserves to be called a 'chor'",
        "Prachi is one of the best best best friend anyone could ask for",
        "Prachi proves every day that she is dumb"
      ],
      lieIndex: 0
    },
    {
      options: [
        "I (soil) never thought I'd be close with you as we are right now",
        "I meant every inside jokes related of yours",
        "I think you are allergic to appreciation from someone"
      ],
      lieIndex: 1
    },
    {
      options: [
        "Its true that I mistook you as someone THRICE",
        "You have never annoyed me, not even once.",
        "I had never forgotten your name since our first conversation."
      ],
      lieIndex: 1
    },
    {
      options: [
        "I think you are a fair example of 'Light Triad'",
        "I doubted whether you're really this dumb.",
        "I HATE your recommendations (god i feel bad writing this)"
      ],
      lieIndex: 2
    },
    {
      options: [
        "You've made me question my sanity",
        "You are more dramatic than a K drama",
        "You love exaggerating things."
      ],
      lieIndex: 2
    },
    {
      options: [
        "We've had more than three inside jokes",
        "I have forgotten all of our inside jokes",
        "Some of our inside jokes is definitely true"
      ],
      lieIndex: 2
    },
    {
      options: [
        "You are lowkey my therapist",
        "You were the first person from trinity, I opened up to",
        "You give better practical advice than emotional advice"
      ],
      lieIndex: 2
    },
    {
      options: [
        "You have dodged my presence more than 10 times.",
        "I have never complimented you genuinely.",
        "You always know exactly what to say"
      ],
      lieIndex: 1
    },
    {
      options: [
        "I am batman",
        "Badzmaru > Kuromi",
        "Sometimes Prachi proves to be a genius somehow."
      ],
      lieIndex: 2
    },
    {
      options: [
        "You've had me laughing during serious talks.",
        "You are genuinely funnier when you're being random.",
        "You're more chaotic than me"
      ],
      lieIndex: 2
    },
    {
      options: [
        "I've lied to you more than twice.",
        "I have told you every secrets I have",
        "I have trusted you more than most people"
      ],
      lieIndex: 1
    },
    {
      options: [
        "Prachi passes the vibe check everytime",
        "You are not kind to everyone [Assuption???]",
        "You've seen me at my worst"
      ],
      lieIndex: 1
    },
    {
      options: [
        "I've reread our chats just to laugh again",
        "You always take accountability without hesitation",
        "You love calling an innocent person (soil) chor"
      ],
      lieIndex: 1
    },
    {
      options: [
        "I once screenshotted somethingdumb you said!",
        "I think your a hello kitty manipulator girl",
        "I love judging peoples, especially you."
      ],
      lieIndex: 2
    },
    {
      options: [
        "I love ranting to you",
        "You avoid drama frequently",
        "You once said something and I wrote it down"
      ],
      lieIndex: 2
    },
    {
      options: [
        "You have a good taste in music",
        "I love every song in our shared playlist",
        "Our shared playlist is the most repeated playlist streamed among my other"
      ],
      lieIndex: 1
    },
    {
      options: [
        "I still dont know how we became THIIS close",
        "I still dont know, what our first convo was",
        "You're the most predictable person ever"
      ],
      lieIndex: 2
    },
    {
      options: [
        "I would definitely kidnap you",
        "I will set you on fire if you unfriend me",
        "I will set you on fire if our tt streaks ends"
      ],
      lieIndex: 2
    },
    {
      options: [
        "You love doing drugs",
        "Metamphetamine is your favorite drug",
        "You once tried to buy drugs from other dealers 💔💔"
      ],
      lieIndex: 2
    },
    {
      options: [
        "i felt soo bad i couldnt recognize you pahilaa",
        "I remember seeing you in college, always in your own world like the rest of us were just background noise",
        "Prachi is not pringles (i am running out of truth and lies)"
      ],
      lieIndex: 2
    },
    {
      options: [
        "Doing drugs is bad",
        "Drugs is what made prachi's life more fruitful",
        "Prachi does drugs"
      ],
      lieIndex: 0
    },
    {
      options: [
        "I am scared of microwave",
        "I am scared of Prachi",
        "I am scared of a cat"
      ],
      lieIndex: 1
    },
    {
      options: [
        "Hometown cha cha cha",
        "meow meow meow",
        "bhou bhou bhou bhou"
      ],
      lieIndex: 2
    },
    {
      options: [
        "I'd love to see Prachi be a nurse in 10 years",
        "I'd love to see Prachi be a drug addict in 10 years",
        "I'd love to see Prachi achieving her goals and being what she want in 10 years"
      ],
      lieIndex: 1
    },
    {
      options: [
        "I secretly fw serial killers and murderers",
        "I have broken my bone once",
        "I once got lost in my own neighbourhood"
      ],
      lieIndex: 1
    }
  ];

  const jokeQuestions = [
    {
      question: "How I(soil) percieved you initially (btw think before opening the answer)",
      answer: "I AM NOT EVEN KIDDING!! i thought you were like tyo very genius manxe academically pani and normally pani but turns out you were just like me."
    },
    {
      question: "I hate 10 things about you, Do you know what are those?",
      answer: "Here are 10 things i hate about prachi:"
    },
    {
      question: "Whats the best thing about being your friend?",
      answer: "What's better than feeling comfortable enough to share anything that's troubling my mind?"
    },
    {
      question: "Do you know whats your superpower?",
      answer: "Making others feel seen!! (and also making me laugh) as well as forgetting things"
    },
    {
      question: "What makes you you?",
      answer: "Because no one else can play your role better. Coz noone else is dumber than you"
    },
    {
      question: "How much strawberries is Prachi worth? (seriously)",
      answer: "Ofc 16 strawberries!! You thought more? You know what i am having a second thought! 5 strawberries thats it."
    },
    {
      question: "What is the craziest discovery i found from you?",
      answer: "Tiktok Streaks (not crazy but sure)"
    },
    {
      question: "Will i ever tell my kids about you?",
      answer: "Hell nahh!! i dont want my kids to know that i had a friend who was a drug addict. Just kidding!!"
    }
  ];

  const floatingElements = [
    { icon: Heart, position: { top: '8%', left: '5%' }, animation: "heartBeat", delay: 0, size: 48 },
    { icon: Star, position: { top: '12%', right: '6%' }, animation: "float", delay: 1, size: 42 },
    { icon: Sparkles, position: { bottom: '15%', left: '8%' }, animation: "bounce", delay: 2, size: 44 },
    { icon: Star, position: { bottom: '20%', right: '10%' }, animation: "spin", delay: 3, size: 38 },
    { icon: Heart, position: { top: '40%', left: '3%' }, animation: "float", delay: 0.5, size: 36 },
    { icon: Sparkles, position: { top: '30%', right: '4%' }, animation: "bounce", delay: 1.5, size: 32 }
  ];

  const sparklePositions = [
    { top: '25%', left: '12%' },
    { top: '18%', right: '15%' },
    { bottom: '35%', right: '20%' },
    { bottom: '25%', left: '15%' },
    { top: '50%', left: '6%' },
    { bottom: '45%', right: '6%' }
  ];

  const currentQuestions = gamePhase === 'truths' ? questions : jokeQuestions;
  const totalRounds = currentQuestions.length;
  const currentQuestion = currentQuestions[currentRound];

  const getProgressPercentage = () => {
    const totalQuestions = questions.length + jokeQuestions.length;
    const completedQuestions = gamePhase === 'truths'
      ? currentRound
      : questions.length + currentRound;

    return (completedQuestions / totalQuestions) * 100;
  };

  const handleOptionSelect = (optionIndex) => {
    if (selectedOptions[currentRound] !== undefined) return;

    const isCorrect = gamePhase === 'truths' ? optionIndex === currentQuestion.lieIndex : false;
    setSelectedOptions(prev => ({ ...prev, [currentRound]: optionIndex }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleRevealAnswer = () => {
    if (gamePhase === 'jokes') {
      setRevealedAnswers(prev => ({ ...prev, [currentRound]: true }));
    }
  };

  const nextRound = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound(prev => prev + 1);
    } else if (gamePhase === 'truths') {
      
      setGamePhase('jokes');
      setCurrentRound(0);
    }
  };

  const prevRound = () => {
    if (currentRound > 0) {
      setCurrentRound(prev => prev - 1);
    } else if (gamePhase === 'jokes' && currentRound === 0) {
      
      setGamePhase('truths');
      setCurrentRound(questions.length - 1);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentRound(0);
    setSelectedOptions({});
    setRevealedAnswers({});
    setGamePhase('truths');
  };

  const isNextDisabled = () => {
    if (gamePhase === 'truths') {
      return selectedOptions[currentRound] === undefined;
    } else {
      return !revealedAnswers[currentRound];
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const handleNext = () => {
    setSlideDirection(1);
    nextRound();
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    prevRound();
  };

  return (
    <div className="truths-lie-page">
      {}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className="floating-element"
            style={element.position}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4 + index,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent size={element.size} />
          </motion.div>
        );
      })}

      {}
      {sparklePositions.map((position, index) => (
        <motion.div
          key={index}
          className="sparkle"
          style={position}
          animate={{
            scale: [0, 1.3, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: index * 0.7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        className="truths-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {}
        <motion.div className="truths-header" variants={itemVariants}>
          <motion.h1
            className="truths-title"
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {gamePhase === 'truths' ? '2 Truths & 1 Lie' : 'Bonus Questions'}
          </motion.h1>
          <motion.p
            className="truths-subtitle"
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {gamePhase === 'truths'
              ? 'Select the lie in each set of statements'
              : 'Discover more about our friendship'}
          </motion.p>

          {}
          <div className="progress-section">
            <div className="round-counter">
              {gamePhase === 'truths' ? 'Round' : 'Bonus'} {currentRound + 1}/{totalRounds}
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="phase-indicator">
              Phase: {gamePhase === 'truths' ? 'Truths & Lies' : 'Bonus Questions'}
            </div>
          </div>
        </motion.div>

        {}
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            className="round-content"
            key={`${gamePhase}-${currentRound}`}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {gamePhase === 'truths' ? (
              
              <motion.div className="question-card" variants={itemVariants}>
                <h3 className="question-number">Question {currentRound + 1}</h3>
                <div className="options-container">
                  {currentQuestion.options.map((option, optIndex) => {
                    const isSelected = selectedOptions[currentRound] === optIndex;
                    const isLie = optIndex === currentQuestion.lieIndex;
                    const isAnswered = selectedOptions[currentRound] !== undefined;

                    return (
                      <motion.div
                        key={optIndex}
                        className={`option ${isSelected ? (isLie ? 'correct' : 'incorrect') : ''} ${isAnswered ? (isLie ? 'lie' : 'truth') : ''}`}
                        onClick={() => handleOptionSelect(optIndex)}
                        whileHover={!isAnswered ? { scale: 1.05 } : {}}
                        whileTap={!isAnswered ? { scale: 0.95 } : {}}
                      >
                        <span className="option-text">{option}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              
              <motion.div className="joke-card" variants={itemVariants}>
                <h3 className="joke-number">Bonus Question {currentRound + 1}</h3>
                <p className="joke-question">{currentQuestion.question}</p>
                <motion.button
                  className="reveal-btn"
                  onClick={handleRevealAnswer}
                  disabled={revealedAnswers[currentRound]}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {revealedAnswers[currentRound] ? <EyeOff size={16} /> : <Eye size={16} />}
                  {revealedAnswers[currentRound] ? 'Answer Revealed' : 'Show Answer'}
                </motion.button>
                <AnimatePresence>
                  {revealedAnswers[currentRound] && (
                    <motion.p
                      className="joke-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentQuestion.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {}
        <motion.div className="navigation-controls" variants={itemVariants}>
          <motion.button
            className="nav-btn prev-btn"
            onClick={handlePrev}
            disabled={currentRound === 0 && gamePhase === 'truths'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Previous
          </motion.button>

          {gamePhase === 'truths' && (
            <div className="score-display">
              Score: {score}/{questions.length}
            </div>
          )}

          <motion.button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={isNextDisabled() || (currentRound === totalRounds - 1 && gamePhase === 'jokes')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentRound === totalRounds - 1 && gamePhase === 'truths' ? 'Continue to Bonus' : 'Next'}
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {}
        <motion.div className="game-controls" variants={itemVariants}>
          <motion.button
            className="reset-btn"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            Reset Game
          </motion.button>
        </motion.div>
      </motion.div>

      {}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 60, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Prachi_LieTruth;