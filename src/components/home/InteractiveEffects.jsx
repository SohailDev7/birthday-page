import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. Pixel Cursor Trail ---
export const PixelCursorTrail = () => {
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newSpark = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                color: Math.random() > 0.5 ? '#FFD700' : '#FFF', // Gold and White sparkles
            };

            setTrail((prev) => [...prev.slice(-15), newSpark]); // Keep last 15
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <AnimatePresence>
                {trail.map((spark) => (
                    <motion.div
                        key={spark.id}
                        initial={{ opacity: 1, scale: 1, x: spark.x, y: spark.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            y: spark.y + 20, // Fall down like dust
                            x: spark.x + (Math.random() - 0.5) * 20
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            width: '6px',
                            height: '6px',
                            backgroundColor: spark.color,
                            imageRendering: 'pixelated',
                            boxShadow: '2px 2px 0 #000' // Pixel border shadow
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};



// --- 3. Enchanted Glint Effect (CSS) ---
export const EnchantedGlint = () => (
    <motion.div
        className="absolute inset-0 pointer-events-none z-20 opacity-40 mix-blend-overlay"
        animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
        }}
        style={{
            background: 'linear-gradient(45deg, rgba(124, 58, 237, 0) 0%, rgba(124, 58, 237, 0.5) 50%, rgba(124, 58, 237, 0) 100%)',
            backgroundSize: '200% 200%'
        }}
    />
);
