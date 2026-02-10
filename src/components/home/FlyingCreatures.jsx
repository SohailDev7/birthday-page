import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const PixelBird = ({ delay = 0, yPosition = '20%', duration = 15 }) => {
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
                    <div className="absolute bg-white" style={{ left: p * 2, top: p * 2, width: p * 4, height: p * 2 }} />
                    <div className="absolute bg-white" style={{ left: p * 5, top: p * 1, width: p * 2, height: p * 2 }} />
                    <div className="absolute bg-yellow-400" style={{ left: p * 7, top: p * 2, width: p * 1, height: p * 1 }} />
                    <motion.div
                        style={{ left: p * 3, top: p * 1, width: p * 4, height: p * 1, transformOrigin: 'bottom center' }}
                        className="absolute bg-gray-200"
                        animate={{ rotate: [0, -30, 0] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                    <div className="absolute bg-white" style={{ left: 0, top: p * 2, width: p * 2, height: p * 1 }} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export const PixelBee = ({ delay = 0, yPosition = '40%', duration = 15 }) => {
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
                    <div className="absolute bg-yellow-400" style={{ left: p * 1, top: p * 1, width: p * 1, height: p * 3 }} />
                    <div className="absolute bg-black" style={{ left: p * 2, top: p * 1, width: p * 1, height: p * 3 }} />
                    <div className="absolute bg-yellow-400" style={{ left: p * 3, top: p * 1, width: p * 1, height: p * 3 }} />
                    <div className="absolute bg-black" style={{ left: p * 4, top: p * 1, width: p * 1, height: p * 3 }} />

                    <div className="absolute bg-yellow-400" style={{ left: 0, top: p * 1, width: p * 1, height: p * 2 }} />
                    <div className="absolute bg-black" style={{ left: 0, top: p * 1, width: p * 1, height: p * 1 }} />

                    <div className="absolute bg-black" style={{ left: p * 5, top: p * 2, width: p * 1, height: p * 1 }} />

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

export const Fireflies = () => {
    const fireflies = useMemo(() => [...Array(20)].map((_, i) => ({
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
                    <div className="relative" style={{ imageRendering: 'pixelated' }}>
                        <div className="w-2 h-2 bg-yellow-300 border border-yellow-400"
                            style={{
                                boxShadow: '0 0 0 2px #FFD700, 0 0 0 4px rgba(255,215,0,0.7), 0 0 0 6px rgba(255,215,0,0.5), 0 0 0 8px rgba(255,215,0,0.3), 0 0 8px 4px rgba(255,215,0,0.8), 0 0 12px 6px rgba(255,215,0,0.6), 0 0 16px 8px rgba(255,215,0,0.4)',
                                imageRendering: 'pixelated'
                            }}
                        />
                        <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-100"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export const Butterflies = () => {
    const butterflies = useMemo(() => [...Array(8)].map((_, i) => {
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
                        <div className="relative" style={{ imageRendering: 'pixelated' }}>
                            <motion.div
                                animate={{ scaleX: [1, 0.8, 1] }}
                                transition={{ duration: 0.4, repeat: Infinity }}
                                style={{ transformOrigin: 'center' }}
                            >
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

export const PixelFlyingSohail = ({ delay = 0, yPosition = '15%', duration = 30 }) => {
    const p = 5; 
    return (
        <motion.div
            className="absolute z-50"
            style={{ top: yPosition, left: '-200px', pointerEvents: 'none' }}
            animate={{ left: '110%' }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'linear'
            }}
        >
            <motion.div
                className="relative"
                style={{ width: p * 16, height: p * 24 }}
                animate={{
                    y: [0, -40, 0],
                    rotate: [-5, 5, -5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {}
                <motion.div
                    className="absolute"
                    style={{
                        left: -p * 2,
                        top: p * 4,
                        width: p * 20,
                        height: p * 16,
                        background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
                        border: '3px solid #000',
                        clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                        zIndex: 1,
                        opacity: 0.9
                    }}
                    animate={{
                        scaleY: [1, 1.1, 1],
                        skewX: [-5, 5, -5]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />

                {}
                <div className="absolute" style={{ left: p * 4, top: p * 18, zIndex: 5, display: 'flex', gap: p }}>
                    {}
                    <motion.div
                        style={{ width: p * 4, height: p * 6, background: '#333', border: '3px solid #000' }}
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {}
                    <motion.div
                        style={{ width: p * 4, height: p * 6, background: '#333', border: '3px solid #000' }}
                        animate={{ rotate: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                {}
                <div
                    className="absolute"
                    style={{
                        left: p * 3,
                        top: p * 8,
                        width: p * 10,
                        height: p * 10,
                        background: '#FFD700',
                        border: '3px solid #000',
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {}
                    <div style={{ width: p * 4, height: p * 4, border: '2px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.2)' }} />
                </div>

                {}
                {}
                <div
                    className="absolute"
                    style={{
                        left: -p,
                        top: p * 8.5,
                        width: p * 4,
                        height: p * 8,
                        background: '#FFD700',
                        border: '3px solid #000',
                        zIndex: 15,
                        transformOrigin: 'top center'
                    }}
                />

                {}
                <motion.div
                    className="absolute"
                    style={{
                        right: -p,
                        top: p * 8.5,
                        width: p * 4,
                        height: p * 8,
                        background: '#FFD700',
                        border: '3px solid #000',
                        zIndex: 15,
                        transformOrigin: 'top center'
                    }}
                    animate={{ rotate: [0, -140, -110, -140, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.2, 0.4, 0.6, 1],
                        repeatDelay: 1
                    }}
                >
                    {}
                    <div style={{ width: p * 3, height: p * 3, background: '#D2B48C', border: '2px solid #000', position: 'absolute', bottom: -p, left: 0 }} />
                </motion.div>

                {}
                <div
                    className="absolute"
                    style={{
                        left: p * 4,
                        top: 0,
                        width: p * 8,
                        height: p * 8,
                        background: '#D2B48C',
                        border: '3px solid #000',
                        zIndex: 20
                    }}
                >
                    {}
                    <div className="absolute bg-[#1a1a1a]" style={{ left: 0, top: 0, width: p * 8, height: p * 2.5 }} />
                    <div className="absolute bg-[#1a1a1a]" style={{ left: 0, top: 0, width: p * 2, height: p * 4 }} />
                    <div className="absolute bg-[#1a1a1a]" style={{ left: p * 6, top: 0, width: p * 2, height: p * 4 }} />

                    {}
                    <div className="absolute bg-white" style={{ left: p, top: p * 4, width: p * 2, height: p, border: '1px solid #000' }} />
                    <div className="absolute bg-white" style={{ right: p, top: p * 4, width: p * 2, height: p, border: '1px solid #000' }} />
                    <div className="absolute bg-[#FFD700]" style={{ left: p + 0.5 * p, top: p * 4, width: p, height: p, boxShadow: '0 0 10px #FFD700' }} />
                    <div className="absolute bg-[#FFD700]" style={{ right: p + 0.5 * p, top: p * 4, width: p, height: p, boxShadow: '0 0 10px #FFD700' }} />

                    {}
                    <div className="absolute" style={{ left: p, top: -p * 4, width: p * 6, height: p * 4, zIndex: 25 }}>
                        {}
                        <div className="absolute bg-[#FFD700]" style={{ left: 0, top: p * 3, width: p * 6, height: p, border: '1px solid #000' }} />
                        {}
                        <div className="absolute bg-[#FFD700]" style={{ left: 0, top: p, width: p, height: p * 2, border: '1px solid #000' }} />
                        {}
                        <div className="absolute bg-[#FFD700]" style={{ left: p * 2, top: 0, width: p * 2, height: p * 3, border: '1px solid #000' }} />
                        {}
                        <div className="absolute bg-[#FFD700]" style={{ left: p * 5, top: p, width: p, height: p * 2, border: '1px solid #000' }} />
                        {}
                        <div className="absolute bg-red-600" style={{ left: p * 2.5, top: p * 1.5, width: p, height: p, boxShadow: '0 0 5px #ff0000' }} />
                    </div>
                </div>

                {}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white"
                        style={{
                            width: p / 2,
                            height: p / 2,
                            left: Math.random() * 100 - 50,
                            top: Math.random() * 100 - 50,
                            zIndex: 0
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};
