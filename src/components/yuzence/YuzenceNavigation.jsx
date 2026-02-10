import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Home, Image, User, Activity } from 'lucide-react';

const YuzenceNavigation = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { path: '/yuzence/home', label: 'HOME', icon: Home },
        { path: '/yuzence/memories', label: 'MEMORIES', icon: Image },
        { path: '/yuzence/about', label: 'ABOUT', icon: User }
    ];

    return (
        <>
            {}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                className="fixed top-8 left-1/2 -translate-x-1/2 z-100 hidden md:flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-blue-900/5"
            >
                {}
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center ml-1">
                    <Activity className="text-blue-500 w-4 h-4" />
                </div>

                {}
                <div className="flex items-center">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path} className="relative">
                                {isActive && (
                                    <motion.div
                                        layoutId="activePill"
                                        className="absolute inset-0 bg-slate-100 rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    className={`
                    px-6 py-2 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors relative z-10
                    ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}
                  `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <item.icon size={14} strokeWidth={2.5} />
                                    {item.label}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                {}
                <div className="w-px h-5 bg-slate-200 mx-2" />

                {}
                <motion.button
                    onClick={logout}
                    className="p-2.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors mr-1"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <LogOut size={16} strokeWidth={2.5} />
                </motion.button>
            </motion.nav>

            {}
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="fixed bottom-6 left-6 right-6 z-100 md:hidden bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl shadow-blue-900/10 flex items-center justify-around p-4"
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                className={`flex flex-col items-center gap-1 ${isActive ? 'text-blue-500' : 'text-slate-400'}`}
                                whileTap={{ scale: 0.8 }}
                            >
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="w-1 h-1 bg-blue-500 rounded-full mt-1"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
                <button onClick={logout} className="flex flex-col items-center gap-1 text-red-400">
                    <LogOut size={24} strokeWidth={2} />
                    <span className="text-[10px] font-bold tracking-wider">EXIT</span>
                </button>
            </motion.nav>
        </>
    );
};

export default YuzenceNavigation;
