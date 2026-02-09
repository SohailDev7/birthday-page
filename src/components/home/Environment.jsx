import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const PixelSun = React.memo(() => (
    <div className="relative w-16 h-16 bg-yellow-400 border-4 border-yellow-600 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
        style={{ imageRendering: 'pixelated', willChange: 'transform' }}>
        <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-300 opacity-80" />
    </div>
));

export const PixelMoon = React.memo(() => (
    <div className="relative w-14 h-14 bg-gray-200 border-4 border-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        style={{ imageRendering: 'pixelated', willChange: 'transform' }}>
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300" />
        <div className="absolute bottom-3 right-3 w-4 h-4 bg-gray-300" />
        <div className="absolute top-8 left-4 w-2 h-2 bg-gray-300" />
    </div>
));

export const PixelCloud = React.memo(({ delay = 0, yPosition = '15%', size = 1, speed = 30, timeOfDay = 'day' }) => {
    const p = 4;
    const getCloudColor = () => {
        switch (timeOfDay) {
            case 'sunset': return '#FFE4E1';
            case 'night': return '#2C3E50';
            case 'twilight': return '#4B0082';
            default: return '#fff';
        }
    };
    const c = getCloudColor();

    return (
        <motion.div
            className="absolute"
            style={{ top: yPosition, left: '-200px', willChange: 'left' }}
            animate={{ left: '110%' }}
            transition={{
                duration: speed,
                repeat: Infinity,
                delay,
                ease: 'linear'
            }}
        >
            <div className="relative" style={{ transform: `scale(${size})` }}>
                <div className="relative" style={{ width: p * 16, height: p * 8 }}>
                    <div className="absolute" style={{ left: p * 2, top: p * 2, width: p * 12, height: p * 4, background: c }} />
                    <div className="absolute" style={{ left: p * 4, top: 0, width: p * 6, height: p * 2, background: c }} />
                    <div className="absolute" style={{ left: p * 3, top: p * 6, width: p * 8, height: p * 2, background: c }} />
                </div>
            </div>
        </motion.div>
    );
});
