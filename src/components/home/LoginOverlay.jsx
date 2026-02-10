import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginOverlay = ({ userKey, userData, onClose }) => {
    const [password, setPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [hint, setHint] = useState('');
    const [shake, setShake] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const getPasswordConfig = (key) => {
        const configs = {
            yuzence: {
                correct: "yuz_blue",
                hints: ["The color of your ocean... 🌊", "Yuz + a color! 🎨", "Think Blue! 💙"]
            },
            prachi: {
                correct: "pr1ngles",
                hints: [
                    "Hmm... what could the password be? 🤔",
                    "Think like Prachi would think... 💭",
                    "Hint: It's something tasty! 🍬",
                    "Hint: Maybe something you'd find in a snack aisle? 🛒",
                    "Hint: It's not food, but a food brand! 🏷️"
                ]
            },
            manash: {
                correct: "man_dark",
                hints: ["Welcome to the shadows... 🌑", "Man + his favorite theme! 🖤", "Opposite of light! 💡"]
            },
            sameer: {
                correct: "sam_sun",
                hints: ["Golden rays... ☀️", "Sam + a celestial body! ⭐", "The center of the solar system! 🌞"]
            },
            saurav: {
                correct: "sau_green",
                hints: ["The nature's favorite color... 🌿", "Sau + a color! 🍏", "Think Emerald! 💚"]
            },
            sama: {
                correct: "sama_vibe",
                hints: ["It's all about the energy... ✨", "Sama + something you feel! 🎶", "Good vibes only! 🌈"]
            },
            aaditya: {
                correct: "adi_kale",
                hints: ["Uta ja kale hapsi", "Adi + a kale! ⚙️", "The artificial intelligence! 💻"]
            }
        };

        return configs[key] || {
            correct: "password",
            hints: [
                "ask soil' 😉",
                "no hints for u peasant",
                "yuh huh huh"
            ]
        };
    };

    const config = getPasswordConfig(userKey);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userKey === 'sohail') {
            if (isAgreed) {
                login(userKey);
                setTimeout(() => navigate(`/${userKey}/home`), 500);
            } else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
            }
            return;
        }

        if (password === config.correct) {
            
            login(userKey); 

            setTimeout(() => {
                if (userKey === 'prachi') {
                    navigate('/prachi/home');
                } else {
                    navigate(`/${userKey}/home`);
                }
            }, 500);

        } else {
            
            setShake(true);
            setTimeout(() => setShake(false), 500);

            setAttempts(prev => prev + 1);
            if (config.hints.length > 0) {
                setHint(config.hints[Math.min(attempts, config.hints.length - 1)]);
            }
            setPassword('');
        }
    };

    const getUsername = (key) => {
        switch (key) {
            case 'yuzence': return 'zuyzence';
            case 'prachi': return 'peachiii';
            case 'manash': return 'manash_v1';
            case 'sameer': return 'sameer_07';
            case 'saurav': return 'saurav_exe';
            case 'sama': return 'sama_chan';
            case 'aaditya': return 'aaditya_bot';
            default: return key;
        }
    };

    const displayUsername = getUsername(userKey);

    return (
        <motion.div
            className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-lg"
                initial={{ scale: 0.8, y: 50 }}
                animate={{
                    scale: 1,
                    y: 0,
                    x: shake ? [-10, 10, -10, 10, 0] : 0
                }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    
                    background: userKey === 'sohail'
                        ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://www.transparenttextures.com/patterns/dark-matter.png"), repeating-linear-gradient(45deg, #1a1a1a 0px, #1a1a1a 4px, #2a2a2a 4px, #2a2a2a 8px)`
                        : `repeating-linear-gradient(45deg, #7d7d7d 0px, #7d7d7d 4px, #8a8a8a 4px, #8a8a8a 8px)`,
                    border: userKey === 'sohail' ? `5px solid ${userData.color}` : '4px solid #000',
                    boxShadow: userKey === 'sohail'
                        ? `0 0 50px ${userData.color}aa, inset 0 0 30px ${userData.color}44`
                        : `8px 8px 0 #000, inset 4px 4px 0 #a0a0a0, inset -4px -4px 0 #555`,
                    imageRendering: 'pixelated',
                    fontFamily: "'Press Start 2P', monospace"
                }}
            >
                {}
                {userKey === 'sohail' && (
                    <>
                        <motion.div
                            className="absolute inset-0 z-[-1]"
                            animate={{
                                boxShadow: [
                                    `0 0 40px ${userData.color}44`,
                                    `0 0 80px ${userData.color}88`,
                                    `0 0 40px ${userData.color}44`
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`divine-p-${i}`}
                                className="absolute pointer-events-none"
                                initial={{
                                    x: Math.random() * 600 - 300,
                                    y: Math.random() * 400 - 200,
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    y: [null, -100 - Math.random() * 200],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    background: userData.color,
                                    boxShadow: `0 0 10px ${userData.color}`,
                                    zIndex: 10
                                }}
                            >
                                {['✨', '👑', '⭐', '💫'][i % 4]}
                            </motion.div>
                        ))}
                    </>
                )}
                {}
                <div
                    className="flex justify-between items-center p-4 border-b-4 border-black bg-[#C6C6C6]"
                    style={{
                        boxShadow: 'inset 2px 2px 0 #fff, inset -2px -2px 0 #555'
                    }}
                >
                    <span className="text-black text-xs md:text-sm truncate">
                        {displayUsername.toUpperCase()}_LOGIN.EXE
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-[#C6C6C6] hover:bg-[#aa0000] group"
                        style={{
                            border: '2px solid #000',
                            boxShadow: 'inset 2px 2px 0 #fff, inset -2px -2px 0 #555'
                        }}
                    >
                        <span className="text-black group-hover:text-white font-bold">X</span>
                    </button>
                </div>

                {}
                <div className="p-8 flex flex-col items-center">

                    {}
                    <div
                        className="w-24 h-24 mb-6 relative"
                        style={{
                            background: userData.color,
                            border: '4px solid #000',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
                        }}
                    >
                        {}
                        {userKey === 'sohail' && (
                            <motion.div
                                className="absolute inset-0 z-[-1]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{
                                    border: `4px dashed ${userData.color}`,
                                    scale: 1.4,
                                    opacity: 0.6
                                }}
                            />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center text-4xl text-white drop-shadow-md">
                            {userData.displayName[0]}
                        </div>
                        {}
                        <div className="absolute top-0 left-0 w-2 h-2 bg-white opacity-50"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black opacity-20"></div>
                    </div>

                    <h2
                        className="text-center text-white mb-6 text-xl"
                        style={{
                            textShadow: '4px 4px 0 #000',
                            color: userKey === 'sohail' ? userData.color : 'white'
                        }}
                    >
                        {userKey === 'sohail' ? 'DIVINE VERIFICATION' : 'ENTER PASSWORD'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        {}
                        <div>
                            <label className="block text-[#C6C6C6] text-xs mb-2 pl-1" style={{ textShadow: '2px 2px 0 #000' }}>USERNAME</label>
                            <input
                                type="text"
                                value={displayUsername}
                                readOnly
                                className="w-full px-4 py-4 bg-[#333] text-[#AAAAAA] outline-none text-center text-lg cursor-not-allowed"
                                style={{
                                    border: '4px solid #222',
                                    boxShadow: 'inset 4px 4px 0 #000',
                                    fontFamily: "'Press Start 2P', monospace"
                                }}
                                autoComplete="username"
                            />
                        </div>

                        {}
                        {userKey === 'sohail' ? (
                            <div
                                className="p-6 bg-black/40 border-4 border-dashed mb-8 text-center"
                                style={{ borderColor: userData.color }}
                            >
                                <label className="flex items-center justify-center gap-4 cursor-pointer group select-none">
                                    <div className="shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={isAgreed}
                                            onChange={(e) => setIsAgreed(e.target.checked)}
                                            className="sr-only"
                                            required
                                        />
                                        <div
                                            className="w-8 h-8 flex items-center justify-center"
                                            style={{
                                                background: isAgreed ? userData.color : '#333',
                                                border: '4px solid #000',
                                                boxShadow: 'inset 4px 4px 0 rgba(255,255,255,0.2)'
                                            }}
                                        >
                                            {isAgreed && <span className="text-black text-xl font-bold" style={{ transform: 'translateY(-1px)' }}>✓</span>}
                                        </div>
                                    </div>
                                    <span
                                        className="text-[10px] md:text-xs text-left text-white transition-colors group-hover:text-[#FFD700]"
                                        style={{
                                            fontFamily: "'Press Start 2P', cursive",
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        I AGREE THAT SOHAIL IS A GOD
                                    </span>
                                </label>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-[#C6C6C6] text-xs mb-2 pl-1" style={{ textShadow: '2px 2px 0 #000' }}>PASSWORD</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="***"
                                    autoFocus
                                    className="w-full px-4 py-4 bg-black text-[#00AA00] outline-none text-center text-lg"
                                    style={{
                                        border: '4px solid #555',
                                        boxShadow: 'inset 4px 4px 0 #000',
                                        fontFamily: "'Press Start 2P', monospace"
                                    }}
                                    autoComplete="current-password"
                                />
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={userKey === 'sohail' && !isAgreed}
                            className={`w-full py-4 text-white font-bold uppercase tracking-widest relative overflow-hidden transition-opacity ${userKey === 'sohail' && !isAgreed ? 'opacity-50 grayscale' : ''}`}
                            style={{
                                background: userKey === 'sohail' ? userData.color : '#333',
                                border: '4px solid #000',
                                boxShadow: userKey === 'sohail'
                                    ? `inset 4px 4px 0 rgba(255,255,255,0.4), 0 8px 0 #000`
                                    : 'inset 4px 4px 0 #555, inset -4px -4px 0 #222, 6px 6px 0 #000',
                                color: userKey === 'sohail' ? '#000' : '#fff'
                            }}
                        >
                            <span className="relative z-10">{userKey === 'sohail' ? 'ASCEND' : 'UNLOCK'}</span>
                            {}
                            <div
                                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                                style={{ background: userData.color }}
                            />
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {hint && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-6 p-4 text-xs leading-5 text-center"
                                style={{
                                    background: '#FFFF55',
                                    color: '#000',
                                    border: '4px solid #000',
                                    boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
                                }}
                            >
                                <span className="block mb-2 font-bold">⚠️ HINT:</span>
                                {hint}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoginOverlay;
