
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowLeft, Clock, AlertTriangle, Shield, Lock, Key, Eye, EyeOff, Copy, Scissors, Type, Mic, PenTool, Zap, Image, Timer, Puzzle, Palette, Target, Brain } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../css/Prachi_Chor.css';

const Prachi_Chor = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [voiceVerified, setVoiceVerified] = useState(false);
  const [writtenLines, setWrittenLines] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentTheme } = useTheme();

  const correctPhrase = "Soil is not a chor";
  const wrongPhrase = "Soil is chor";

  const [rapidFireCount, setRapidFireCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [tapPattern, setTapPattern] = useState([]);
  const [timer, setTimer] = useState(10);
  const [isTimedRoundActive, setIsTimedRoundActive] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [patternAnswer, setPatternAnswer] = useState('');
  const [dragWords, setDragWords] = useState(['chor', 'Soil', 'not', 'is', 'a']);
  const [draggedWord, setDraggedWord] = useState(null);
  const [droppedWords, setDroppedWords] = useState([]);
  const [memorySequence, setMemorySequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [sequenceLevel, setSequenceLevel] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [scrambledText, setScrambledText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const rounds = [
    {
      type: 'password',
      title: 'Access Denied - Enter Security Password',
      description: 'The system requires authentication. Password hint: Prachisa####',
      icon: Lock,
      correctAnswer: "Prachisachor"
    },
    {
      type: 'text-input',
      title: 'Manual Verification Required',
      description: 'Type the verification phrase EXACTLY as shown:',
      icon: Type,
      correctAnswer: correctPhrase
    },
    {
      type: 'multiple-choice',
      title: 'Fact Check - Select the Truth',
      description: 'Only one of these statements is factually correct. Choose wisely:',
      icon: Shield,
      options: [
        { text: wrongPhrase, correct: false },
        { text: "Soil might be chor", correct: false },
        { text: "I'm not sure about Soil", correct: false },
        { text: correctPhrase, correct: true },
        { text: "All of the above", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      type: 'legal',
      title: 'Legal Binding Agreement - Read Carefully',
      description: 'You must agree to these terms to proceed. Every word matters:',
      icon: AlertTriangle,
      content: `TERMS OF SOIL VERIFICATION AGREEMENT

ARTICLE I: PREAMBLE OF TRUTH
Whereas the individual known as "Soil" has been subject to baseless allegations of chor like activities;
Whereas these allegations lack substantial evidence and are primarily based on hearsay;
Whereas the truth must be established beyond any reasonable doubt;

ARTICLE II: BINDING DECLARATIONS
1. I hereby solemnly swear, affirm, and declare that Soil is unequivocally, absolutely, and undeniably NOT a chor.
2. This declaration is made under penalty of perjury, cosmic karma, and eternal embarrassment.
3. I acknowledge that any suggestion otherwise is false, defamatory, and probably from a jealous source.
4. I pledge to defend Soil's honor in all digital and physical realms, including social media gatherings.
5. Should I ever doubt this truth, I accept automatic social media suspension for 30 days.

ARTICLE III: TECHNICAL SPECIFICATIONS
- Soil's non chor status is confirmed by 99.9% of reliable sources
- Independent audits have verified Soil's integrity
- Multiple fact-checking organizations(Prachi fata daka chor Pvt. Ltd.) rate "Soil is chor" as FALSE
- The mathematical probability of Soil being chor is 0.00000001%

ARTICLE IV: CONSEQUENCES OF FALSE STATEMENTS
By proceeding, you accept that:
- False statements may result in life imprisonment
- You may be placed inside custody or perhaps Jail too
- Your Spotify playlist could be replaced with nursery rhymes
- You might have to listen to Cocomelon for 24 hours straight

ARTICLE V: FINAL PROVISIONS
This agreement is binding in perpetuity, across all parallel universes, and in any future technological iterations. There are no takebacks, no refunds, and no escape clauses. The truth is the truth.

By checking the box below, you indicate your complete, total, and enthusiastic agreement with every single word of this document.`
    },
    {
      type: 'voice',
      title: 'Biometric Voice Verification',
      description: 'Speak the verification phrase clearly into your microphone. Our AI will analyze your sincerity(Hell no i am coding an AI just for ts):',
      icon: Mic
    },
    {
      type: 'writing',
      title: 'Handwriting Analysis Test',
      description: 'Write the phrase 5 times in the boxes below. This helps our handwriting analysis AI (hehe, try copying and pasting):',
      icon: PenTool
    },
    {
      type: 'rapid-fire',
      title: 'Rapid Truth Confirmation',
      description: 'Click the button 15 times as fast as you can. This tests your commitment:',
      icon: Zap,
      targetClicks: 15
    },
    {
      type: 'math',
      title: 'Mathematical Proof Required',
      description: 'Solve this complex equation that mathematically proves Soil is not chor: (Answer: Tr#th)',
      icon: Target,
      equation: '√(Soil² + Honesty³) - (Chor × Deception) = ?',
      correctAnswer: 'Truth'
    },
    {
      type: 'pattern',
      title: 'Pattern Recognition Test',
      description: 'Identify the missing element in this logical pattern:',
      icon: Puzzle,
      pattern: ['Trustworthy', 'Honest', 'Reliable', '???', 'Not Chor'],
      correctAnswer: 'Soil'
    },
    {
      type: 'drag-drop',
      title: 'Word Reconstruction Challenge',
      description: 'Drag the words in the correct order to form the truth:',
      icon: Scissors,
      words: ['chor', 'Soil', 'not', 'is', 'a', 'definitely'],
      correctOrder: ['Soil', 'is', 'definitely', 'not', 'a', 'chor']
    },
    {
      type: 'timed',
      title: 'Speed Verification Test',
      description: 'Type the complete phrase correctly within 10 seconds. Timer starts NOW:',
      icon: Timer,
      correctAnswer: correctPhrase,
      timeLimit: 10
    },
    {
      type: 'captcha',
      title: 'Advanced Security CAPTCHA',
      description: 'Select ALL images that represent truth and honesty (this is very important):',
      icon: Image,
      images: [
        { src: '🛡️', correct: true, text: 'Honor' },
        { src: '⚖️', correct: true, text: 'Justice' },
        { src: '👑', correct: true, text: 'Truth' },
        { src: '📜', correct: true, text: 'Facts' },
        { src: '🚫', correct: false, text: 'Forbidden Action' },
        { src: '🔒', correct: true, text: 'Lock of Security' },
        { src: '🎭', correct: false, text: 'Mask of Deception' },
        { src: '💎', correct: true, text: 'Gem of Integrity' },
        { src: '🌪️', correct: false, text: 'Chaos and Lies' }
      ]
    },
    {
      type: 'memory',
      title: 'Memory Sequence Challenge',
      description: 'Memorize and repeat the flashing sequence of colors. Each level adds more complexity(relative to your IQ):',
      icon: Brain,
      sequenceLength: 5
    },
    {
      type: 'color',
      title: 'Color Psychology Test',
      description: 'Select the color that best represents absolute truth and honesty:',
      icon: Palette,
      colors: [
        { value: '#FF6B6B', name: 'Doubt Red' },
        { value: '#4ECDC4', name: 'Truth Teal' },
        { value: '#45B7D1', name: 'Honesty Blue' },
        { value: '#FFE66D', name: 'Caution Yellow' },
        { value: '#95E1D3', name: 'Integrity Mint' },
        { value: '#FCE38A', name: 'Uncertainty Beige' }
      ],
      correctColor: '#4ECDC4'
    },
    {
      type: 'decoding',
      title: 'Encrypted Message Decoding',
      description: 'Decode this encrypted message to reveal the truth:',
      icon: Key,
      scrambled: 'S0l p1z n07 4 ch0r',
      correctAnswer: correctPhrase
    },
    {
      type: 'final',
      title: 'Final Absolute Confirmation',
      description: 'This is your last chance to turn back. Are you absolutely, completely, 100% sure?',
      icon: Shield,
      confirmation: 'I stake my entire digital existence on this truth'
    }
  ];

  useEffect(() => {
    let interval;
    if (isTimedRoundActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimedRoundActive(false);
            handleWrongAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimedRoundActive, timer]);

  useEffect(() => {
    if (currentRound === 9) {
      setDragWords(['chor', 'Soil', 'not', 'is', 'a', 'definitely'].sort(() => Math.random() - 0.5));
      setDroppedWords([]);
    }
  }, [currentRound]);

  useEffect(() => {
    if (currentRound === 14) {
      setScrambledText('S0l p1z n07 4 ch0r');
    }
  }, [currentRound]);

  useEffect(() => {
    if (currentRound === 12) {
      generateMemorySequence();
    }
  }, [currentRound]);

  const generateMemorySequence = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D', '#95E1D3', '#FCE38A'];
    const sequenceLength = 4 + sequenceLevel;
    const newSequence = [];

    for (let i = 0; i < sequenceLength; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newSequence.push({
        color: randomColor,
        index: i
      });
    }

    setMemorySequence(newSequence);
    setUserSequence([]);
    showSequence(newSequence);
  };

  const showSequence = (sequence) => {
    setIsShowingSequence(true);

    const cells = document.querySelectorAll('.memory-cell');
    cells.forEach(cell => {
      cell.style.backgroundColor = '';
      cell.classList.remove('active');
    });

    let currentIndex = 0;

    const showNextColor = () => {
      if (currentIndex < sequence.length) {
        const currentColor = sequence[currentIndex];
        const cell = document.querySelector(`.memory-cell[data-index="${currentColor.index}"]`);

        if (cell) {

          cell.style.backgroundColor = currentColor.color;
          cell.classList.add('active');

          setTimeout(() => {
            cell.style.backgroundColor = '';
            cell.classList.remove('active');
            currentIndex++;
            setTimeout(showNextColor, 300);
          }, 800);
        }
      } else {

        setTimeout(() => {
          setIsShowingSequence(false);
        }, 500);
      }
    };

    setTimeout(showNextColor, 500);
  };

  const handleMemoryClick = (clickedIndex) => {
    if (isShowingSequence) return;

    const clickedCell = document.querySelector(`.memory-cell[data-index="${clickedIndex}"]`);
    const expectedColor = memorySequence[userSequence.length]?.color;

    if (clickedCell && expectedColor) {

      clickedCell.style.backgroundColor = expectedColor;
      clickedCell.classList.add('user-click');

      setTimeout(() => {
        clickedCell.style.backgroundColor = '';
        clickedCell.classList.remove('user-click');
      }, 300);

      const isCorrect = memorySequence[userSequence.length]?.index === clickedIndex;

      if (isCorrect) {
        const newUserSequence = [...userSequence, clickedIndex];
        setUserSequence(newUserSequence);

        if (newUserSequence.length === memorySequence.length) {
          if (sequenceLevel < 3) {

            setTimeout(() => {
              setSequenceLevel(prev => prev + 1);
              setErrors([`Level ${sequenceLevel} completed! Get ready for level ${sequenceLevel + 1}...`]);
              setTimeout(() => {
                generateMemorySequence();
                setErrors([]);
              }, 2000);
            }, 1000);
          } else {

            setTimeout(proceedToNextRound, 1000);
          }
        }
      } else {

        handleWrongAnswer();
      }
    }
  };

  const handleTextSubmit = () => {
    if (userInput.trim() === rounds[currentRound].correctAnswer) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput.trim() === rounds[currentRound].correctAnswer) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleMultipleChoice = (option) => {
    if (option.correct) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleLegalAgree = () => {
    if (agreed) {
      proceedToNextRound();
    } else {
      setErrors(['You must agree to ALL terms to continue. Every. Single. Word.']);
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingComplete(false);
    setVoiceVerified(false);

    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);

      setTimeout(() => {
        const isVerified = Math.random() > 0.1;
        setVoiceVerified(isVerified);
        if (isVerified) {
          setTimeout(proceedToNextRound, 1000);
        } else {
          handleWrongAnswer();
        }
      }, 2000);
    }, 4000);
  };

  const handleWritingComplete = () => {
    const allCorrect = writtenLines.every(line =>
      line.trim().toLowerCase() === correctPhrase.toLowerCase()
    );

    if (allCorrect) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleRapidFireClick = () => {
    const newCount = rapidFireCount + 1;
    setRapidFireCount(newCount);

    if (newCount >= rounds[currentRound].targetClicks) {
      setTimeout(proceedToNextRound, 500);
    }
  };

  const handleMathSubmit = () => {
    if (mathAnswer.trim().toLowerCase() === rounds[currentRound].correctAnswer.toLowerCase()) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handlePatternSubmit = () => {
    if (patternAnswer.trim().toLowerCase() === rounds[currentRound].correctAnswer.toLowerCase()) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedWord && !droppedWords.includes(draggedWord)) {
      const newDropped = [...droppedWords, draggedWord];
      setDroppedWords(newDropped);
      setDragWords(dragWords.filter(w => w !== draggedWord));

      if (newDropped.join(' ') === rounds[currentRound].correctOrder.join(' ')) {
        setTimeout(proceedToNextRound, 1000);
      }
    }
  };

  const handleImageSelect = (index) => {
    const newSelected = [...selectedImages];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelectedImages(newSelected);
  };

  const handleImageSubmit = () => {
    const currentRoundData = rounds[currentRound];
    const allCorrect = currentRoundData.images.every((img, index) =>
      img.correct === selectedImages.includes(index)
    );

    if (allCorrect) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color === rounds[currentRound].correctColor) {
      setTimeout(proceedToNextRound, 1000);
    } else {
      handleWrongAnswer();
    }
  };

  const handleDecodingSubmit = () => {
    if (decodedText.trim().toLowerCase() === correctPhrase.toLowerCase()) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleFinalSubmit = () => {
    if (finalConfirmation) {
      proceedToNextRound();
    } else {
      setErrors(['You must provide final confirmation to complete the verification']);
    }
  };

  const startTimedRound = () => {
    setTimer(rounds[currentRound].timeLimit);
    setIsTimedRoundActive(true);
    setUserInput('');
  };

  const handleTimedSubmit = () => {
    setIsTimedRoundActive(false);
    if (userInput.trim() === rounds[currentRound].correctAnswer) {
      proceedToNextRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setErrors(['VERIFICATION FAILED! The system detected incorrect information. Starting over... HUHAHAHA ajhai chor bhana na malai']);
    setTimeout(() => {
      setCurrentRound(0);
      setSequenceLevel(1);
      setErrors([]);
      resetAllStates();
    }, 3000);
  };

  const proceedToNextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setErrors([]);
      resetRoundStates();
    } else {
      setCurrentRound(rounds.length);
    }
  };

  const resetAllStates = () => {
    setUserInput('');
    setPasswordInput('');
    setSelectedOption('');
    setAgreed(false);
    setIsRecording(false);
    setRecordingComplete(false);
    setVoiceVerified(false);
    setWrittenLines(['', '', '', '', '']);
    setRapidFireCount(0);
    setSelectedImages([]);
    setTapPattern([]);
    setTimer(10);
    setIsTimedRoundActive(false);
    setMathAnswer('');
    setPatternAnswer('');
    setDroppedWords([]);
    setMemorySequence([]);
    setUserSequence([]);
    setIsShowingSequence(false);
    setSequenceLevel(1);
    setSelectedColor('');
    setFinalConfirmation(false);
    setDecodedText('');
  };

  const resetRoundStates = () => {
    setUserInput('');
    setPasswordInput('');
    setSelectedOption('');
    setAgreed(false);
    setIsRecording(false);
    setRecordingComplete(false);
    setVoiceVerified(false);
    setWrittenLines(['', '', '', '', '']);
    setRapidFireCount(0);
    setSelectedImages([]);
    setTapPattern([]);
    setTimer(10);
    setIsTimedRoundActive(false);
    setMathAnswer('');
    setPatternAnswer('');
    setDroppedWords([]);
    setUserSequence([]);
    setIsShowingSequence(false);
    setSelectedColor('');
    setFinalConfirmation(false);
    setDecodedText('');
  };

  const handlePastePrevent = (e) => {
    e.preventDefault();
    setErrors(['Copy-paste is disabled! You must type everything manually. hehehehe']);
  };

  const renderCurrentRound = () => {
    const round = rounds[currentRound];
    const IconComponent = round.icon;

    switch (round.type) {
      case 'password':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onPaste={handlePastePrevent}
                placeholder="Enter security password"
                className="verification-input password-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button onClick={handlePasswordSubmit} className="verification-btn">
              Authenticate
            </button>
          </div>
        );

      case 'text-input':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="correct-phrase-display">{correctPhrase}</div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onPaste={handlePastePrevent}
              placeholder="Type manually here..."
              className="verification-input"
            />
            <button onClick={handleTextSubmit} className="verification-btn">
              Verify Input
            </button>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="options-grid">
              {round.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(option)}
                  className={`option-btn ${option.correct ? 'correct-option' : 'wrong-option'}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="legal-document">
              {round.content.split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('ARTICLE') ? 'legal-heading' : line.startsWith('-') ? 'legal-list' : 'legal-text'}>
                  {line}
                </p>
              ))}
            </div>
            <label className="agreement-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>I have read, understood, and agree to ALL terms and conditions stated above</span>
            </label>
            <button onClick={handleLegalAgree} className="verification-btn">
              Accept & Continue
            </button>
          </div>
        );

      case 'voice':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="voice-recording-section">
              {!isRecording && !recordingComplete && (
                <button onClick={startVoiceRecording} className="voice-btn">
                  <Volume2 size={24} />
                  Start Voice Verification
                </button>
              )}

              {isRecording && (
                <div className="recording-status">
                  <div className="recording-pulse"></div>
                  <p>Listening... Speak clearly now!</p>
                  <div className="voice-wave">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                </div>
              )}

              {recordingComplete && !voiceVerified && (
                <div className="processing-status">
                  <div className="processing-spinner"></div>
                  <p>Analyzing voice patterns and sincerity...</p>
                </div>
              )}

              {voiceVerified && (
                <div className="success-status">
                  <CheckCircle size={48} className="success-icon" />
                  <p>Voice biometrics confirmed! Truth verified.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'writing':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="writing-section">
              {writtenLines.map((line, index) => (
                <div key={index} className="writing-line">
                  <span className="line-number">{index + 1}.</span>
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => {
                      const newLines = [...writtenLines];
                      newLines[index] = e.target.value;
                      setWrittenLines(newLines);
                    }}
                    onPaste={handlePastePrevent}
                    placeholder={`Write "${correctPhrase}" here`}
                    className="writing-input"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleWritingComplete} className="verification-btn">
              Submit for Analysis
            </button>
          </div>
        );

      case 'rapid-fire':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="rapid-fire-section">
              <div className="click-counter">Clicks: {rapidFireCount}/{round.targetClicks}</div>
              <button onClick={handleRapidFireClick} className="rapid-fire-btn">
                {correctPhrase}
              </button>
              <div className="progress-indicator">
                <div
                  className="progress-fill"
                  style={{ width: `${(rapidFireCount / round.targetClicks) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        );

      case 'math':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="math-equation">{round.equation}</div>
            <input
              type="text"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              onPaste={handlePastePrevent}
              placeholder="Enter your answer"
              className="verification-input"
            />
            <button onClick={handleMathSubmit} className="verification-btn">
              Solve Equation
            </button>
          </div>
        );

      case 'pattern':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="pattern-display">
              {round.pattern.map((item, index) => (
                <div key={index} className="pattern-item">
                  {item === '???' ? (
                    <input
                      type="text"
                      value={patternAnswer}
                      onChange={(e) => setPatternAnswer(e.target.value)}
                      onPaste={handlePastePrevent}
                      placeholder="???"
                      className="pattern-input"
                    />
                  ) : (
                    <span>{item}</span>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handlePatternSubmit} className="verification-btn">
              Complete Pattern
            </button>
          </div>
        );

      case 'drag-drop':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="drag-drop-section">
              <div className="word-bank">
                <h4>Available Words:</h4>
                <div className="draggable-words">
                  {dragWords.map((word, index) => (
                    <div
                      key={index}
                      className="draggable-word"
                      draggable
                      onDragStart={() => handleDragStart(word)}
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h4>Drop words here in correct order:</h4>
                <div className="dropped-words">
                  {droppedWords.map((word, index) => (
                    <div key={index} className="dropped-word">
                      {word}
                    </div>
                  ))}
                  {droppedWords.length === 0 && (
                    <div className="drop-placeholder">Drag words here</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'timed':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="timed-section">
              <div className="timer-display">
                <Clock size={24} />
                {timer}s
              </div>
              {!isTimedRoundActive && timer === 10 && (
                <button onClick={startTimedRound} className="verification-btn">
                  Start 10-Second Timer
                </button>
              )}
              {isTimedRoundActive && (
                <>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onPaste={handlePastePrevent}
                    placeholder="Type quickly before time runs out!"
                    className="verification-input timed-input"
                  />
                  <button onClick={handleTimedSubmit} className="verification-btn">
                    Submit Now!
                  </button>
                </>
              )}
            </div>
          </div>
        );

      case 'captcha':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="captcha-grid">
              {round.images.map((image, index) => (
                <div
                  key={index}
                  className={`captcha-item ${selectedImages.includes(index) ? 'selected' : ''}`}
                  onClick={() => handleImageSelect(index)}
                >
                  <div className="captcha-emoji">{image.src}</div>
                  <span>{image.text}</span>
                </div>
              ))}
            </div>
            <button onClick={handleImageSubmit} className="verification-btn">
              Verify Selection
            </button>
          </div>
        );

      case 'memory':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="memory-section">
              <div className="memory-info">
                <div className="level-indicator">Level: {sequenceLevel}/3</div>
                <div className="sequence-length">Sequence Length: {memorySequence.length}</div>
                <div className="progress-indicator">
                  Progress: {userSequence.length}/{memorySequence.length}
                </div>
              </div>

              {isShowingSequence ? (
                <div className="memory-waiting">
                  <div className="memory-spinner"></div>
                  <p>Watch and memorize the sequence...</p>
                </div>
              ) : (
                <div className="memory-instructions">
                  <p>Click the cells in the exact order they flashed</p>
                </div>
              )}

              <div className="memory-grid">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="memory-cell"
                    data-index={index}
                    onClick={() => handleMemoryClick(index)}
                  />
                ))}
              </div>

              {!isShowingSequence && userSequence.length === 0 && memorySequence.length > 0 && (
                <button onClick={generateMemorySequence} className="verification-btn">
                  Show Sequence Again
                </button>
              )}
            </div>
          </div>
        );

      case 'color':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="color-grid">
              {round.colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-item ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect(color.value)}
                >
                  <span>{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'decoding':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="decoding-section">
              <div className="encoded-text">{scrambledText}</div>
              <input
                type="text"
                value={decodedText}
                onChange={(e) => setDecodedText(e.target.value)}
                onPaste={handlePastePrevent}
                placeholder="Decode the message here..."
                className="verification-input"
              />
              <button onClick={handleDecodingSubmit} className="verification-btn">
                Submit Decoded Message
              </button>
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="verification-round">
            <div className="round-header">
              <IconComponent size={32} className="round-icon" />
              <h3>{round.title}</h3>
            </div>
            <p>{round.description}</p>
            <div className="final-warning">
              <AlertTriangle size={48} className="warning-icon" />
              <p>This action cannot be undone. You will be permanently recorded as affirming that Soil is not chor.</p>
            </div>
            <label className="agreement-checkbox final-checkbox">
              <input
                type="checkbox"
                checked={finalConfirmation}
                onChange={(e) => setFinalConfirmation(e.target.checked)}
              />
              <span>{round.confirmation}</span>
            </label>
            <button onClick={handleFinalSubmit} className="verification-btn final-btn">
              CONFIRM ABSOLUTELY
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentRound === rounds.length) {
    return (
      <div className="soil-verification-page">
        <div className="verification-container">
          <div className="final-result">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Secret Transport Code: prachi-cookie
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Verification Complete! You have successfully proven that Soil is not chor.
            </motion.p>
            <motion.button
              onClick={() => {
                setCurrentRound(0);
                setSequenceLevel(1);
                resetAllStates();
              }}
              className="restart-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Over
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="soil-verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <h1>Soil Truth Verification System</h1>
          <p>Complete all verification steps to confirm the absolute truth</p>
          <div className="progress-section">
            <div className="round-counter">
              {currentRound + 1}/{rounds.length}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentRound()}
          </motion.div>
        </AnimatePresence>

        {errors.length > 0 && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <XCircle size={20} />
            {errors[0]}
          </motion.div>
        )}

        <div className="navigation-buttons">
          {currentRound > 0 && (
            <button
              onClick={() => setCurrentRound(prev => prev - 1)}
              className="nav-btn secondary"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
          )}
          <button
            onClick={() => {
              setCurrentRound(0);
              setSequenceLevel(1);
              resetAllStates();
            }}
            className="nav-btn danger"
          >
            <RotateCcw size={16} />
            Restart Everything
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prachi_Chor;