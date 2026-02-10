import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const MinecraftLoot = () => {
    
    const items = useMemo(() => [
        { name: 'Diamond', color: '#b9f2ff', pos: { left: '10%', top: '20%' }, delay: 0 },
        { name: 'Emerald', color: '#50fa7b', pos: { left: '85%', top: '15%' }, delay: 2 },
        { name: 'Heart', color: '#ff5555', pos: { left: '5%', top: '60%' }, delay: 4 },
        { name: 'Cake Slice', color: '#ffb86c', pos: { left: '90%', top: '70%' }, delay: 6 },
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute w-8 h-8 flex items-center justify-center"
                    style={{ ...item.pos, imageRendering: 'pixelated' }}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0, 1.2, 1, 1, 0],
                        y: [50, -20, -50, -80, -150],
                        rotate: [0, 15, -15, 10, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear"
                    }}
                >
                    {}
                    <div className="relative w-6 h-6" style={{ background: item.color, boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(255,255,255,0.4)', border: '1px solid #000' }}>
                        {}
                        <div className="absolute top-0 left-0 w-2 h-2 bg-white/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black/20" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
