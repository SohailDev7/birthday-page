import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const generateWalkKeyframes = (p) => {
    const times = [], legRot = [], legRotOpp = [], body = [], tail = [];
    const steps = 200; 

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        times.push(t);
        const isWalking = (t >= 0 && t <= 0.4) || (t >= 0.5 && t <= 0.9);

        if (isWalking) {
            const speed = 50;
            const angle = Math.sin(t * speed) * 25;
            legRot.push(angle);
            legRotOpp.push(-angle);
            // Bounce logic
            body.push(Math.abs(Math.sin(t * speed)) * -p);
            // Tail wag
            tail.push(Math.cos(t * speed) * 20);
        } else {
            legRot.push(0);
            legRotOpp.push(0);
            body.push(0);
            tail.push(0);
        }
    }
    return { times, legRot, legRotOpp, body, tail };
};

export const PixelPig = ({ delay = 0, duration = 25, yOffset = 0, scale = 1, startPos = '10%', endPos = '60%' }) => {
    const p = 4;
    const { times, legRot, legRotOpp, body, tail } = generateWalkKeyframes(p);
    const startOffset = -delay;

    return (
        <motion.div
            className="absolute"
            style={{ bottom: '80px', marginBottom: yOffset, zIndex: 10 }}
            initial={{ left: startPos }}
            animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
        >
            <motion.div
                animate={{ scaleX: [-scale, -scale, scale, scale] }}
                transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
            >
                <motion.div
                    animate={{ y: body }}
                    transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    className="relative"
                    style={{ width: p * 18, height: p * 12 }}
                >
                    <LegsPig times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

                    {/* Body - BLOCKY */}
                    <div className="absolute bg-pink-400" style={{ left: p * 4, top: p * 3, width: p * 12, height: p * 7 }} />
                    <div className="absolute bg-pink-300" style={{ left: p * 5, top: p * 4, width: p * 10, height: p * 5 }} /> {/* Belly highlight */}

                    {/* Curly Tail - BLOCKY */}
                    <motion.div
                        className="absolute"
                        style={{ left: p * 15, top: p * 5, originX: 0, originY: 0.5 }}
                        animate={{ rotate: tail }}
                        transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    >
                        <div className="absolute bg-pink-500" style={{ width: p, height: p, left: 0, top: 0 }} />
                        <div className="absolute bg-pink-500" style={{ width: p, height: p, left: p, top: -p }} />
                        <div className="absolute bg-pink-500" style={{ width: p, height: p, left: p * 2, top: 0 }} />
                    </motion.div>

                    {/* Head - BLOCKY with eating animation */}
                    <motion.div
                        className="absolute bg-pink-400"
                        style={{ left: 0, top: p * 1, width: p * 8, height: p * 8 }}
                        animate={{ y: [0, 0, p * 2, 0, 0, 0, p * 2, 0, 0], rotate: [0, 0, 5, 0, 0, 0, 5, 0, 0] }}
                        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
                    >
                        {/* Ears - BLOCKY */}
                        <div className="absolute bg-pink-500" style={{ left: p * 0.5, top: 0, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-pink-500" style={{ right: p * 0.5, top: 0, width: p * 2, height: p * 2 }} />

                        {/* Eyes - BLOCKY */}
                        <div className="absolute bg-black" style={{ left: p * 1.5, top: p * 3, width: p, height: p }} />
                        <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 3, width: p, height: p }} />

                        {/* Snout - BLOCKY PROMINENT */}
                        <div className="absolute bg-pink-500" style={{ left: p * 1.5, top: p * 5, width: p * 5, height: p * 3 }} />
                        <div className="absolute bg-pink-300" style={{ left: p * 2, top: p * 5.5, width: p * 4, height: p * 2 }} />

                        {/* Nostrils - BLOCKY */}
                        <div className="absolute bg-pink-700" style={{ left: p * 2.5, top: p * 6.5, width: p, height: p }} />
                        <div className="absolute bg-pink-700" style={{ left: p * 4.5, top: p * 6.5, width: p, height: p }} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const LegsPig = ({ times, rotate, rotateOpp, duration, p, delay }) => (
    <>
        <motion.div style={{ left: p * 11, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-700"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 5, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-700"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 12, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-600"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 6, top: p * 6, width: p * 2, height: p * 4, transformOrigin: 'top center' }} className="absolute bg-pink-600"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    </>
);

export const PixelCow = ({ delay = 0, duration = 30, yOffset = 0, scale = 1, startPos = '20%', endPos = '80%' }) => {
    const p = 4;
    const { times, legRot, legRotOpp, body, tail } = generateWalkKeyframes(p);
    const startOffset = -delay;

    return (
        <motion.div
            className="absolute"
            style={{ bottom: '80px', marginBottom: yOffset, zIndex: 11 }} // Fixed floating
            initial={{ left: startPos }}
            animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
        >
            <motion.div
                animate={{ scaleX: [-scale, -scale, scale, scale] }}
                transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
            >
                <motion.div
                    animate={{ y: body }}
                    transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    className="relative"
                    style={{ width: p * 18, height: p * 12 }}
                >
                    <LegsCow times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />
                    <div className="absolute bg-white" style={{ left: p * 5, top: p * 2, width: p * 12, height: p * 7 }} />
                    <div className="absolute bg-black" style={{ left: p * 7, top: p * 3, width: p * 3, height: p * 2 }} />
                    <div className="absolute bg-black" style={{ left: p * 13, top: p * 5, width: p * 2, height: p * 3 }} />
                    <motion.div
                        className="absolute"
                        style={{ left: p * 16, top: p * 3, originX: 0, originY: 0 }}
                        animate={{ rotate: tail }}
                        transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    >
                        <div className="absolute bg-gray-300" style={{ width: p, height: p * 4, left: 0, top: 0 }} />
                        <div className="absolute bg-black" style={{ width: p, height: p, left: 0, top: p * 4 }} />
                    </motion.div>
                    <motion.div
                        className="absolute bg-gray-200"
                        style={{ left: p * 0, top: p * 0, width: p * 7, height: p * 7 }}
                        animate={{ y: [0, 0, p * 3, 0, 0, 0, p * 3, 0, 0] }}
                        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
                    >
                        <div className="absolute bg-white" style={{ left: p * 1, top: p * 1, width: p * 5, height: p * 5 }} />
                        <div className="absolute bg-gray-400" style={{ left: p * 1, top: 0, width: p * 1, height: p * 2 }} />
                        <div className="absolute bg-gray-400" style={{ left: p * 5, top: 0, width: p * 1, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ left: p * 1, top: p * 3, width: p * 1, height: p * 1 }} />
                        <div className="absolute bg-black" style={{ left: p * 5, top: p * 3, width: p * 1, height: p * 1 }} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const LegsCow = ({ times, rotate, rotateOpp, duration, p, delay }) => (
    <>
        <motion.div style={{ left: p * 13, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-gray-400"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 6, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-gray-400"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 14, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-white"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }}>
            <div className="absolute bottom-0 w-full h-2 bg-black" />
        </motion.div>
        <motion.div style={{ left: p * 7, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-white"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }}>
            <div className="absolute bottom-0 w-full h-2 bg-black" />
        </motion.div>
    </>
);

export const PixelPanda = ({ delay = 0, duration = 28, yOffset = 0, scale = 1, startPos = '15%', endPos = '50%' }) => {
    const p = 4;
    const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
    const startOffset = -delay;

    return (
        <motion.div
            className="absolute"
            style={{ bottom: '80px', marginBottom: yOffset, zIndex: 12 }}
            initial={{ left: startPos }}
            animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.3, 0.5, 0.8, 1], ease: 'linear' }}
        >
            <motion.div
                animate={{ scaleX: [-scale, -scale, scale, scale] }}
                transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
            >
                <motion.div
                    animate={{ y: body }}
                    transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    className="relative"
                    style={{ width: p * 16, height: p * 14 }}
                >
                    <LegsPanda times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

                    {/* White Body */}
                    <div className="absolute bg-white" style={{ left: p * 3, top: p * 4, width: p * 12, height: p * 8 }} />
                    <div className="absolute bg-gray-100" style={{ left: p * 4, top: p * 5, width: p * 10, height: p * 6 }} /> {/* Belly */}

                    {/* Black shoulder patches */}
                    <div className="absolute bg-black" style={{ left: p * 3, top: p * 6, width: p * 3, height: p * 4 }} />
                    <div className="absolute bg-black" style={{ left: p * 12, top: p * 6, width: p * 3, height: p * 4 }} />

                    {/* Head - Eating/Looking animation */}
                    <motion.div
                        className="absolute bg-white"
                        style={{ left: 0, top: 0, width: p * 8, height: p * 8 }}
                        animate={{ y: [0, 0, p * 2, 0, 0, 0, p * 2, 0, 0], rotate: [0, 0, 8, 0, 0, 0, 8, 0, 0] }}
                        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.3, 0.32, 0.38, 0.4, 0.8, 0.82, 0.88, 0.9] }}
                    >
                        {/* Black rounded ears - BLOCKY */}
                        <div className="absolute bg-black" style={{ left: p * 0.5, top: p * 0.5, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 0.5, width: p * 2, height: p * 2 }} />

                        {/* Black eye patches - PANDA SIGNATURE */}
                        <div className="absolute bg-black" style={{ left: p * 1, top: p * 3, width: p * 2.5, height: p * 3 }} />
                        <div className="absolute bg-black" style={{ left: p * 4.5, top: p * 3, width: p * 2.5, height: p * 3 }} />

                        {/* White eyes inside black patches */}
                        <div className="absolute bg-white" style={{ left: p * 1.5, top: p * 4, width: p * 1.5, height: p * 1.5 }} />
                        <div className="absolute bg-white" style={{ left: p * 5, top: p * 4, width: p * 1.5, height: p * 1.5 }} />

                        {/* Black pupils */}
                        <div className="absolute bg-black" style={{ left: p * 2, top: p * 4.5, width: p * 0.5, height: p * 0.5 }} />
                        <div className="absolute bg-black" style={{ left: p * 5.5, top: p * 4.5, width: p * 0.5, height: p * 0.5 }} />

                        {/* Black nose */}
                        <div className="absolute bg-black" style={{ left: p * 3.5, top: p * 6, width: p, height: p }} />

                        {/* Bamboo - appears when eating */}
                        <motion.div
                            className="absolute bg-green-600"
                            style={{ left: -p * 3, top: p * 5, width: p * 1, height: p * 6 }}
                            animate={{ opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0] }}
                            transition={{ duration, repeat: Infinity, times: [0, 0.3, 0.31, 0.39, 0.4, 0.8, 0.81, 0.89, 0.9], delay: startOffset }}
                        >
                            <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 1 }} />
                            <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 3 }} />
                            <div className="absolute bg-green-700 w-full" style={{ height: p * 0.5, top: p * 5 }} />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const LegsPanda = ({ times, rotate, rotateOpp, duration, p, delay }) => (
    <>
        <motion.div style={{ left: p * 10, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 4, top: p * 7, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 11, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 5, top: p * 8, width: p * 3, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    </>
);

export const PixelDeer = ({ delay = 0, duration = 28, yOffset = 0, scale = 1, startPos = '5%', endPos = '45%' }) => {
    const p = 4;
    const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
    const startOffset = -delay;

    return (
        <motion.div
            className="absolute"
            style={{ bottom: '70px', marginBottom: yOffset, zIndex: 12 }}
            initial={{ left: startPos }}
            animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
        >
            <motion.div
                animate={{ scaleX: [-scale, -scale, scale, scale] }}
                transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
            >
                <motion.div
                    animate={{ y: body }}
                    transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    className="relative"
                    style={{ width: p * 20, height: p * 20 }}
                >
                    {/* Legs - Thin deer legs */}
                    <LegsDeer times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

                    {/* Body - Sleek brown body */}
                    <div className="absolute bg-amber-700" style={{ left: p * 6, top: p * 8, width: p * 10, height: p * 6 }} />
                    <div className="absolute bg-amber-600" style={{ left: p * 7, top: p * 9, width: p * 8, height: p * 4 }} /> {/* Belly highlight */}

                    {/* Neck */}
                    <div className="absolute bg-amber-700" style={{ left: p * 4, top: p * 6, width: p * 4, height: p * 6 }} />

                    {/* Cute tail with pink */}
                    <motion.div
                        className="absolute"
                        style={{ left: p * 15, top: p * 10, originX: 0, originY: 0.5 }}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute bg-amber-800" style={{ width: p, height: p * 3, left: 0, top: 0 }} />
                        <div className="absolute bg-pink-300" style={{ width: p, height: p, left: 0, top: 0 }} /> {/* Pink tip */}
                    </motion.div>

                    {/* Head - Cute deer head */}
                    <motion.div
                        className="absolute bg-amber-700"
                        style={{ left: 0, top: p * 2, width: p * 7, height: p * 7 }}
                        animate={{ y: [0, 0, p, 0, 0, 0, p, 0, 0] }}
                        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
                    >
                        {/* Adorable antlers - Pink tips for cuteness */}
                        <div className="absolute bg-amber-900" style={{ left: p * 1, top: -p * 2, width: p, height: p * 3 }} />
                        <div className="absolute bg-pink-400" style={{ left: p, top: -p * 3, width: p, height: p * 2 }} /> {/* Left antler pink */}
                        <div className="absolute bg-amber-900" style={{ right: p, top: -p * 2, width: p, height: p * 3 }} />
                        <div className="absolute bg-pink-400" style={{ right: p, top: -p * 3, width: p, height: p * 2 }} /> {/* Right antler pink */}

                        {/* Cute big eyes */}
                        <div className="absolute bg-white" style={{ left: p * 1.5, top: p * 2.5, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ left: p * 2, top: p * 3, width: p, height: p }} />
                        <div className="absolute bg-white" style={{ right: p * 1.5, top: p * 2.5, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ right: p * 2, top: p * 3, width: p, height: p }} />

                        {/* Cute pink nose */}
                        <div className="absolute bg-pink-400" style={{ left: p * 2.5, top: p * 5, width: p * 2, height: p }} />

                        {/* Ears - Pointy */}
                        <div className="absolute bg-amber-700" style={{ left: p, top: 0, width: p * 1.5, height: p * 2 }} />
                        <div className="absolute bg-pink-200" style={{ left: p * 1.2, top: p * 0.5, width: p, height: p }} /> {/* Pink inner ear */}
                        <div className="absolute bg-amber-700" style={{ right: p, top: 0, width: p * 1.5, height: p * 2 }} />
                        <div className="absolute bg-pink-200" style={{ right: p * 1.2, top: p * 0.5, width: p, height: p }} /> {/* Pink inner ear */}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const LegsDeer = ({ times, rotate, rotateOpp, duration, p, delay }) => (
    <>
        {/* Back legs - thinner */}
        <motion.div style={{ left: p * 12, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 14, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        {/* Front legs */}
        <motion.div style={{ left: p * 7, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 9, top: p * 11, width: p * 1.5, height: p * 7, transformOrigin: 'top center' }} className="absolute bg-amber-800"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        {/* Hooves - black */}
        <motion.div style={{ left: p * 12, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 14, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 7, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 9, top: p * 16.5, width: p * 1.5, height: p * 1.5, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    </>
);

export const PixelFawn = ({ delay = 0, duration = 28, yOffset = 0, scale = 0.7, startPos = '8%', endPos = '48%' }) => {
    const p = 3; // Smaller pixel size for baby
    const { times, legRot, legRotOpp, body } = generateWalkKeyframes(p);
    const startOffset = -delay;

    return (
        <motion.div
            className="absolute"
            style={{ bottom: '70px', marginBottom: yOffset, zIndex: 13 }}
            initial={{ left: startPos }}
            animate={{ left: [startPos, endPos, endPos, startPos, startPos] }}
            transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.5, 0.9, 1], ease: 'linear' }}
        >
            <motion.div
                animate={{ scaleX: [-scale, -scale, scale, scale] }}
                transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.5, 0.501, 1], ease: "linear" }}
            >
                <motion.div
                    animate={{ y: body }}
                    transition={{ duration, repeat: Infinity, times, ease: "linear", delay: startOffset }}
                    className="relative"
                    style={{ width: p * 16, height: p * 16 }}
                >
                    {/* Baby legs - even thinner */}
                    <LegsFawn times={times} rotate={legRot} rotateOpp={legRotOpp} duration={duration} p={p} delay={startOffset} />

                    {/* Small body with spots */}
                    <div className="absolute bg-amber-600" style={{ left: p * 5, top: p * 7, width: p * 8, height: p * 5 }} />
                    <div className="absolute bg-amber-500" style={{ left: p * 6, top: p * 8, width: p * 6, height: p * 3 }} /> {/* Belly */}
                    {/* Cute spots */}
                    <div className="absolute bg-white" style={{ left: p * 7, top: p * 8, width: p, height: p }} />
                    <div className="absolute bg-white" style={{ left: p * 10, top: p * 9, width: p, height: p }} />

                    {/* Short neck */}
                    <div className="absolute bg-amber-600" style={{ left: p * 3, top: p * 5, width: p * 3, height: p * 5 }} />

                    {/* Tiny tail with pink */}
                    <motion.div
                        className="absolute"
                        style={{ left: p * 12, top: p * 8, originX: 0, originY: 0.5 }}
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute bg-amber-700" style={{ width: p, height: p * 2, left: 0, top: 0 }} />
                        <div className="absolute bg-pink-300" style={{ width: p, height: p * 0.5, left: 0, top: 0 }} />
                    </motion.div>

                    {/* Adorable baby head - bigger eyes */}
                    <motion.div
                        className="absolute bg-amber-600"
                        style={{ left: 0, top: p * 2, width: p * 6, height: p * 6 }}
                        animate={{ y: [0, 0, p * 0.5, 0, 0, 0, p * 0.5, 0, 0] }}
                        transition={{ duration, repeat: Infinity, delay: startOffset, times: [0, 0.4, 0.42, 0.48, 0.5, 0.9, 0.92, 0.98, 1] }}
                    >
                        {/* Tiny antler buds - pink */}
                        <div className="absolute bg-pink-400" style={{ left: p * 1.5, top: -p, width: p * 0.5, height: p }} />
                        <div className="absolute bg-pink-400" style={{ right: p * 1.5, top: -p, width: p * 0.5, height: p }} />

                        {/* HUGE cute baby eyes */}
                        <div className="absolute bg-white" style={{ left: p, top: p * 2, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ left: p * 1.2, top: p * 2.5, width: p * 1.2, height: p * 1.2 }} />
                        <div className="absolute bg-white" style={{ right: p, top: p * 2, width: p * 2, height: p * 2 }} />
                        <div className="absolute bg-black" style={{ right: p * 1.2, top: p * 2.5, width: p * 1.2, height: p * 1.2 }} />
                        {/* Eye sparkles */}
                        <div className="absolute bg-white" style={{ left: p * 1.8, top: p * 2.7, width: p * 0.4, height: p * 0.4 }} />
                        <div className="absolute bg-white" style={{ right: p * 1.8, top: p * 2.7, width: p * 0.4, height: p * 0.4 }} />

                        {/* Tiny pink nose */}
                        <div className="absolute bg-pink-400" style={{ left: p * 2, top: p * 4.5, width: p * 2, height: p * 0.5 }} />

                        {/* Small ears */}
                        <div className="absolute bg-amber-600" style={{ left: p * 0.5, top: p * 0.5, width: p, height: p * 1.5 }} />
                        <div className="absolute bg-pink-200" style={{ left: p * 0.7, top: p, width: p * 0.6, height: p * 0.8 }} />
                        <div className="absolute bg-amber-600" style={{ right: p * 0.5, top: p * 0.5, width: p, height: p * 1.5 }} />
                        <div className="absolute bg-pink-200" style={{ right: p * 0.7, top: p, width: p * 0.6, height: p * 0.8 }} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const LegsFawn = ({ times, rotate, rotateOpp, duration, p, delay }) => (
    <>
        {/* Back legs - tiny */}
        <motion.div style={{ left: p * 9.5, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 11, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        {/* Front legs */}
        <motion.div style={{ left: p * 6, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 7.5, top: p * 10, width: p, height: p * 5, transformOrigin: 'top center' }} className="absolute bg-amber-700"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        {/* Tiny hooves */}
        <motion.div style={{ left: p * 9.5, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 11, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 6, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotate }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
        <motion.div style={{ left: p * 7.5, top: p * 14, width: p, height: p, transformOrigin: 'top center' }} className="absolute bg-black"
            animate={{ rotate: rotateOpp }} transition={{ duration, repeat: Infinity, times, ease: "linear", delay }} />
    </>
);
