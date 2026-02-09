import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Plus, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import YuzenceNavigation from '../components/yuzence/YuzenceNavigation';

const MemoriesPage = () => {
    const [memories, setMemories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
        day: new Date().getDate().toString().padStart(2, '0'),
        description: '',
        image: null
    });

    const fileInputRef = useRef(null);

    // Fetch Memories
    const fetchMemories = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/memories');
            const result = await response.json();
            if (result.success) {
                setMemories(result.data);
            }
        } catch (error) {
            console.error('Error fetching memories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMemories();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!formData.image) return alert('Please select an image');

        setUploading(true);
        const data = new FormData();
        data.append('image', formData.image);
        data.append('title', formData.title || 'Untitled Memory');
        data.append('year', formData.year);
        data.append('month', formData.month);
        data.append('day', formData.day);
        data.append('description', formData.description);

        try {
            const response = await fetch('http://localhost:3000/api/memories', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (result.success) {
                setMemories([result.data, ...memories]);
                setIsModalOpen(false);
                setFormData({ ...formData, title: '', description: '', image: null });
            }
        } catch (error) {
            alert('Upload failed. Is the server running?');
        } finally {
            setUploading(false);
        }
    };

    // Group memories by year
    const groupedMemories = memories.reduce((acc, memory) => {
        if (!acc[memory.year]) acc[memory.year] = [];
        acc[memory.year].push(memory);
        return acc;
    }, {});

    // Sorted years
    const sortedYears = Object.keys(groupedMemories).sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20 overflow-x-hidden">
            <YuzenceNavigation />

            {/* Soft Background */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-sky-50" />
            <div className="fixed inset-0 pointer-events-none -z-10 bg-linear-to-b from-white to-transparent opacity-80" />

            <header className="pt-40 pb-20 px-6 text-center relative">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-7xl md:text-9xl font-thin tracking-tighter text-slate-900 mb-6"
                >
                    Chronicles
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase mb-12"
                >
                    A visual archive · Since 2020
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-white border border-slate-200 rounded-full shadow-xl shadow-blue-500/5 text-sm font-medium text-blue-500 flex items-center gap-3 mx-auto transition-all hover:bg-blue-50"
                >
                    <Plus size={18} />
                    Add New Memory
                </motion.button>
            </header>

            <div className="max-w-5xl mx-auto px-6 space-y-32 relative">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
                        />
                    </div>
                ) : memories.length === 0 ? (
                    <div className="text-center py-20 opacity-40">
                        <ImageIcon size={48} className="mx-auto mb-4" />
                        <p className="text-xl font-light">No memories saved yet.</p>
                    </div>
                ) : (
                    sortedYears.map((year, index) => (
                        <motion.section
                            key={year}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="flex gap-8 md:gap-16">
                                {/* Year Marker */}
                                <div className="flex flex-col items-center shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-2xl shadow-blue-500/10 z-10">
                                        <span className="text-sm font-bold text-slate-800">{year}</span>
                                    </div>
                                    <div className="w-px h-full bg-slate-200 mt-4" />
                                </div>

                                {/* Content */}
                                <div className="w-full pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {groupedMemories[year].map((memory, i) => (
                                            <motion.div
                                                key={memory._id}
                                                whileHover={{ y: -8 }}
                                                className="group relative"
                                            >
                                                <div className="aspect-4/5 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-white overflow-hidden relative">
                                                    <img
                                                        src={memory.imageUrl}
                                                        alt={memory.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                        <h3 className="text-white font-medium text-lg leading-tight mb-1">{memory.title}</h3>
                                                        <div className="flex items-center gap-3 text-white/70 text-[10px] font-mono tracking-widest uppercase">
                                                            <span>{memory.month}/{memory.day}</span>
                                                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                                                            <span>Snapshot</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    ))
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-100/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl border border-slate-200 p-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 p-2"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-10 pt-2">
                                <h2 className="text-3xl font-light text-slate-800 mb-2">Preserve a Moment</h2>
                                <p className="text-sm text-slate-400">Upload your visual memory to the digital archive.</p>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-6">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Give it a name..."
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="relative">
                                            <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-light"
                                                value={formData.year}
                                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="MM"
                                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-light"
                                                value={formData.month}
                                                onChange={e => setFormData({ ...formData, month: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="DD"
                                                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-light"
                                                value={formData.day}
                                                onChange={e => setFormData({ ...formData, day: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className="w-full h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-blue-200 transition-all overflow-hidden"
                                    >
                                        {formData.image ? (
                                            <img
                                                src={URL.createObjectURL(formData.image)}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <>
                                                <Camera className="text-slate-300" size={32} />
                                                <span className="text-xs text-slate-400 font-medium">Click to select image</span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={uploading}
                                    className={`w-full py-5 rounded-2xl bg-slate-900 text-white font-medium shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3 transition-opacity ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploading ? 'Uploading to Archive...' : 'Add to Collection'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemoriesPage;
