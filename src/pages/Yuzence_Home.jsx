import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import YuzenceNavigation from '../components/yuzence/YuzenceNavigation';

// Fluid Mesh Background
const MeshGradient = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-sky-50">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
        >
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply filter"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.9, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-200/40 rounded-full blur-[100px] mix-blend-multiply filter"
                animate={{
                    x: [0, -70, 30, 0],
                    y: [0, 60, -20, 0],
                    scale: [0.9, 1.1, 1, 0.9]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-indigo-200/40 rounded-full blur-[140px] mix-blend-multiply filter"
                animate={{
                    x: [0, 40, -40, 0],
                    y: [0, -30, 20, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
            />
        </motion.div>
    </div>
);

// Minimalist Card Component
const FeatureCard = ({ title, description, delay, to }) => {
    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            className="group relative h-full p-8 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white/50 hover:bg-white/80 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
            <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
                <h3 className="text-xl font-light tracking-wide text-slate-800 mb-2 relative z-10">{title}</h3>
                <p className="text-sm font-light text-slate-500 leading-relaxed relative z-10">{description}</p>
            </div>

            {/* Hover arrow */}
            <div className="self-end mt-8 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:bg-blue-50 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </div>
        </motion.div>
    );

    return to ? <Link to={to} className="block h-full">{CardContent}</Link> : CardContent;
};

const Yuzence_Home = () => {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <YuzenceNavigation />
            <MeshGradient />

            {/* Hero Section */}
            <motion.section
                style={{ y: yHero, opacity: opacityHero }}
                className="h-screen flex flex-col items-center justify-center relative z-10 px-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                >
                    <h1 className="text-[12vw] md:text-[10rem] font-medium tracking-tighter leading-[0.85] text-slate-900/90 mix-blend-darken">
                        yuzence
                    </h1>
                    <div className="overflow-hidden mt-8">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-blue-500/80 font-mono text-xs md:text-sm tracking-[0.4em] uppercase"
                        >
                            Digital Excellence
                        </motion.p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-px h-16 bg-slate-200 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1/2 bg-blue-400"
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </motion.section>

            {/* Content Section */}
            <section className="relative z-10 min-h-screen py-32 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 mb-12 md:mb-0">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl font-light mb-6 text-slate-800"
                        >
                            Focus. Flow.<br />Create.
                        </motion.h2>
                        <p className="text-slate-500 font-light text-sm max-w-xs leading-relaxed">
                            A curated space for digital exploration. Access your games, manage your profile, and experience the next generation of web interfaces.
                        </p>
                    </div>

                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FeatureCard
                            title="Memories Gallery"
                            description="A visual timeline of our journey since 2020."
                            to="/yuzence/memories"
                            delay={0.1}
                        />
                        <FeatureCard
                            title="System Status"
                            description="Monitor core parameters and synchronization logs in real-time."
                            delay={0.2}
                        />
                        <FeatureCard
                            title="Profile Identity"
                            description="Customize your digital avatar and security preferences."
                            delay={0.3}
                        />
                        <FeatureCard
                            title="Neural Feed"
                            description="Connect with the global network. Updates coming soon."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 text-center text-slate-400 text-[10px] font-mono tracking-widest uppercase">
                <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent mb-8 opacity-50" />
                <p>Yuzence Systems © 2026</p>
            </footer>
        </div>
    );
};

export default Yuzence_Home;
