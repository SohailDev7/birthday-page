import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Stars = React.memo(() => {
    
    const stars = useMemo(() => [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60,
        duration: 3 + Math.random() * 3, 
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
                        boxShadow: '0 0 3px #fff',
                        willChange: 'opacity, transform' 
                    }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3], 
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "linear" 
                    }}
                />
            ))}
        </div>
    );
});

export const PixelTree = () => {
    const [stage, setStage] = useState(0);
    const p = 4; 

    useEffect(() => {

        const interval = setInterval(() => {
            setStage(s => Math.min(s + 1, 3));
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    const trunkColor = '#5C3C24'; 
    const darkTrunk = '#3E2723';
    const leafColor = '#38B44A'; 
    const darkLeaf = '#2E7D32';

    return (
        <div className="absolute" style={{ bottom: '80px', left: '80%', zIndex: 9 }}>
            {}
            {stage === 0 && (
                <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative"
                    style={{ width: p * 4, height: p * 6 }}
                >
                    {}
                    <div className="absolute" style={{ left: p * 1.5, top: p * 4, width: p, height: p * 2, background: trunkColor }} />
                    {}
                    <div className="absolute" style={{ left: p * 1, top: p * 2, width: p * 2, height: p * 2, background: leafColor }} />
                    <div className="absolute" style={{ left: p * 0.5, top: p * 3, width: p * 3, height: p, background: darkLeaf }} />
                </motion.div>
            )}

            {}
            {stage === 1 && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                    style={{ width: p * 8, height: p * 12 }}
                >
                    {}
                    <div className="absolute" style={{ left: p * 3, top: p * 6, width: p * 2, height: p * 6, background: trunkColor }} />
                    <div className="absolute" style={{ left: p * 3, top: p * 11, width: p * 2, height: p, background: darkTrunk }} />
                    {}
                    <div className="absolute" style={{ left: p * 1, top: p * 2, width: p * 6, height: p * 4, background: leafColor }} />
                    <div className="absolute" style={{ left: 0, top: p * 3, width: p * 8, height: p * 2, background: darkLeaf, opacity: 0.3 }} />
                    <div className="absolute" style={{ left: p * 2, top: 0, width: p * 4, height: p * 2, background: leafColor }} />
                </motion.div>
            )}

            {}
            {stage === 2 && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                    style={{ width: p * 12, height: p * 20 }}
                >
                    {}
                    <div className="absolute" style={{ left: p * 5, top: p * 8, width: p * 2, height: p * 12, background: trunkColor }} />
                    <div className="absolute" style={{ left: p * 5, top: p * 19, width: p * 2, height: p, background: darkTrunk }} />
                    {}
                    <div className="absolute" style={{ left: p * 3, top: p * 10, width: p * 2, height: p, background: trunkColor }} />

                    {}
                    <div className="absolute" style={{ left: p * 2, top: p * 2, width: p * 8, height: p * 6, background: leafColor }} />
                    <div className="absolute" style={{ left: 0, top: p * 4, width: p * 12, height: p * 4, background: leafColor }} />
                    <div className="absolute" style={{ left: p * 3, top: 0, width: p * 6, height: p * 2, background: leafColor }} />
                    {}
                    <div className="absolute" style={{ left: p * 2, top: p * 4, width: p, height: p, background: darkLeaf }} />
                    <div className="absolute" style={{ left: p * 9, top: p * 3, width: p, height: p, background: darkLeaf }} />
                </motion.div>
            )}

            {}
            {stage === 3 && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                    style={{ width: p * 16, height: p * 30 }}
                >
                    {}
                    <div className="absolute" style={{ left: p * 7, top: p * 10, width: p * 2, height: p * 20, background: trunkColor }} />
                    <div className="absolute" style={{ left: p * 6, top: p * 28, width: p * 4, height: p * 2, background: darkTrunk }} /> {}

                    {}
                    <div className="absolute" style={{ left: p * 4, top: p * 14, width: p * 3, height: p, background: trunkColor }} />
                    <div className="absolute" style={{ left: p * 9, top: p * 12, width: p * 3, height: p, background: trunkColor }} />

                    {}
                    <div className="absolute" style={{ left: p * 3, top: p * 2, width: p * 10, height: p * 8, background: leafColor }} />
                    <div className="absolute" style={{ left: p * 1, top: p * 5, width: p * 14, height: p * 6, background: leafColor }} />
                    <div className="absolute" style={{ left: p * 5, top: 0, width: p * 6, height: p * 3, background: leafColor }} />

                    {}
                    <div className="absolute" style={{ left: 0, top: p * 6, width: p * 2, height: p * 2, background: leafColor }} />
                    <div className="absolute" style={{ left: p * 14, top: p * 6, width: p * 2, height: p * 2, background: leafColor }} />

                    {}
                    <div className="absolute" style={{ left: p * 4, top: p * 8, width: p * 2, height: p * 2, background: darkLeaf }} />
                    <div className="absolute" style={{ left: p * 10, top: p * 4, width: p * 2, height: p * 2, background: darkLeaf }} />
                </motion.div>
            )}
        </div>
    );
};

export const PixelGrass = () => {
    const p = 4; 
    const blocksCount = 50;

    return (
        <div className="absolute bottom-0 left-0 right-0 h-20 flex pointer-events-none" style={{ imageRendering: 'pixelated' }}>
            {[...Array(blocksCount)].map((_, i) => {
                const grassColor = i % 3 === 0 ? '#7DB342' : '#6FA032';
                const darkGrass = '#5A8C2A';
                const lightGrass = '#8BD44F';
                const dirtColor = '#795548';
                const darkDirt = '#5D4037';

                return (
                    <div key={i} className="flex-1 relative h-full">
                        {}
                        <div className="absolute top-0 left-0 w-full h-[25%]" style={{ background: grassColor }}>
                            {}
                            <div className="absolute top-0 left-0 w-1/2 h-[33%]" style={{ background: lightGrass, opacity: 0.3 }} />
                            <div className="absolute top-[33%] right-0 w-[40%] h-[33%]" style={{ background: lightGrass, opacity: 0.2 }} />
                            {}
                            <div className="absolute bottom-0 left-0 w-full h-[25%]" style={{ background: darkGrass, opacity: 0.4 }} />

                            {}
                            {i % 2 === 0 && <div className="absolute top-[20%] left-[10%] w-[15%] h-[15%]" style={{ background: lightGrass }} />}
                            {i % 5 === 0 && <div className="absolute top-[40%] right-[20%] w-[10%] h-[10%]" style={{ background: lightGrass, opacity: 0.5 }} />}
                        </div>

                        {}
                        <div className="absolute top-[25%] left-0 w-full h-[75%]" style={{ background: dirtColor }}>
                            {}
                            {i % 2 === 0 && <div className="absolute top-[20%] left-[30%] w-[15%] h-[15%]" style={{ background: darkDirt }} />}
                            {i % 3 === 0 && <div className="absolute top-[50%] right-[10%] w-[10%] h-[12%]" style={{ background: darkDirt }} />}
                            {i % 4 === 0 && <div className="absolute top-[70%] left-[60%] w-[12%] h-[10%]" style={{ background: darkDirt }} />}

                            {}
                            <div className="absolute inset-0" style={{
                                background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 8px)'
                            }} />
                        </div>

                        {}
                        <div className="absolute top-[25%] left-0 w-[20%] h-[15%]" style={{ background: grassColor }} />
                        <div className="absolute top-[25%] left-[40%] w-[25%] h-[25%]" style={{ background: grassColor }} />
                        <div className="absolute top-[25%] right-0 w-[15%] h-[10%]" style={{ background: grassColor }} />
                        <div className="absolute top-[35%] left-[10%] w-[10%] h-[10%]" style={{ background: darkGrass, opacity: 0.5 }} />
                        <div className="absolute top-[45%] left-[45%] w-[15%] h-[12%]" style={{ background: darkGrass, opacity: 0.4 }} />

                        {}
                        {i % 6 === 0 && (
                            <div className="absolute bottom-full left-[20%] w-[8px] h-[12px] bg-[#7DB342]" style={{
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                            }} />
                        )}
                        {i % 10 === 0 && (
                            <div className="absolute bottom-full right-[30%] w-[6px] h-[16px] bg-[#8BD44F]" style={{
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const PixelWildflowers = React.memo(() => {
    
    const flowers = useMemo(() => [...Array(10)].map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        color: ['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF', '#55FFFF'][i % 6],
        delay: Math.random() * 5,
        scale: 0.8 + Math.random() * 0.4
    })), []);

    return (
        <div className="absolute bottom-20 left-0 right-0 h-8 pointer-events-none overflow-hidden">
            {flowers.map((f) => (
                <motion.div
                    key={f.id}
                    className="absolute bottom-0"
                    style={{ left: `${f.left}%`, scale: f.scale, willChange: 'transform' }}
                    animate={{ rotate: [-3, 3, -3] }} 
                    transition={{ duration: 4, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
                >
                    {}
                    <div className="absolute bottom-0 left-1 w-1 h-4 bg-green-700" />
                    {}
                    <div className="absolute bottom-3 left-0 w-3 h-3" style={{ background: f.color, imageRendering: 'pixelated', clipPath: 'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)' }}>
                        <div className="absolute inset-1 bg-white opacity-40" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
});

export const FloatingPollen = React.memo(({ timeOfDay }) => {
    
    const particles = useMemo(() => [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 60 + Math.random() * 30,
        size: 2 + Math.random() * 3,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 10
    })), []);

    const color = timeOfDay === 'night' ? '#FFF' : '#FFEB3B';

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: p.size,
                        height: p.size,
                        background: color,
                        opacity: 0.4,
                        filter: 'blur(1px)',
                        willChange: 'transform, opacity'
                    }}
                    animate={{
                        x: [0, 50, 0], 
                        y: [0, -20, 0],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
});
