import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eraser, Undo, Redo, Lock, Eye, Check, Key, RotateCcw } from 'lucide-react';

const PixelPaintbrushIcon = ({ size = 24, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="currentColor"
        className={className}
        style={{ imageRendering: 'pixelated' }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path fillRule="evenodd" clipRule="evenodd" d="
            M10 0H13V1H14V2H15V5H14V6H13V7H12V8H11V9H8V8H9V7H10V6H11V5H12V2H11V1H10V0ZM
            8 9V11H7V12H6V13H5V14H4V16H0V12H2V11H3V10H4V9H5V8H7V9H8ZM
            6 14H4V12H6V14ZM
            11 2V5H13V2H11Z
        "/>
    </svg>
);

const DrawingModal = ({ user, onClose, initialData, onSave }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState('brush'); // brush, eraser, fill, shade

    // Performance & Preview State
    const [shadePopup, setShadePopup] = useState({ show: false, color: '', x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false });
    const longPressTimer = useRef(null);

    // History State
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Auth & Mode State
    const [mode, setMode] = useState('view'); // 'view', 'auth', 'edit'
    const [authInput, setAuthInput] = useState('');
    const [authError, setAuthError] = useState(false);
    const [showKeypad, setShowKeypad] = useState(false);

    // Initialize canvas & history
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set visible size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Fill white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load initial data if exists
        if (initialData) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Initialize history after loading image
                const dataURL = canvas.toDataURL();
                setHistory([dataURL]);
                setHistoryIndex(0);
            };
            img.src = initialData;
        } else {
            // Initialize history with blank canvas
            const dataURL = canvas.toDataURL();
            setHistory([dataURL]);
            setHistoryIndex(0);
        }

        const handleResize = () => {
            // Optional: handle resize but complicated with pixel data
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const saveToHistory = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();

        // If we are in the middle of history, slice off the future
        const newHistory = history.slice(0, historyIndex + 1);

        // Add new state
        newHistory.push(dataURL);

        // Update state
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        // Persist to storage
        onSave(dataURL);
    };

    const restoreState = (index) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            onSave(history[index]); // Sync with parent/storage
        };
        img.src = history[index];
        setHistoryIndex(index);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            restoreState(historyIndex - 1);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            restoreState(historyIndex + 1);
        }
    };

    const handleUnlock = (e) => {
        e.preventDefault();
        // Check against user DOB
        // Input should be YYYY-MM-DD
        if (authInput === user.dob) {
            setMode('edit');
            setAuthError(false);
            setAuthInput('');
        } else {
            setAuthError(true);
            setTimeout(() => setAuthError(false), 500);
        }
    };

    // --- Drawing Logic ---
    const getPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const floodFill = (ctx, startX, startY, fillColor) => {
        // ... (Keep existing floodFill logic) ...
        const r = parseInt(fillColor.slice(1, 3), 16);
        const g = parseInt(fillColor.slice(3, 5), 16);
        const b = parseInt(fillColor.slice(5, 7), 16);
        const a = 255;

        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const { width, height, data } = imageData;
        const stack = [[startX, startY]];

        const getPixelPos = (x, y) => (y * width + x) * 4;
        const startPos = getPixelPos(startX, startY);
        const startR = data[startPos];
        const startG = data[startPos + 1];
        const startB = data[startPos + 2];
        const startA = data[startPos + 3];

        if (startR === r && startG === g && startB === b && startA === a) return;

        const matchStartColor = (pos) => {
            return data[pos] === startR && data[pos + 1] === startG && data[pos + 2] === startB && data[pos + 3] === startA;
        };

        const colorPixel = (pos) => {
            data[pos] = r;
            data[pos + 1] = g;
            data[pos + 2] = b;
            data[pos + 3] = a;
        };

        while (stack.length) {
            const [x, y] = stack.pop();
            const pos = getPixelPos(x, y);

            if (data[pos] === undefined) continue;

            if (matchStartColor(pos)) {
                colorPixel(pos);

                if (x > 0) stack.push([x - 1, y]);
                if (x < width - 1) stack.push([x + 1, y]);
                if (y > 0) stack.push([x, y - 1]);
                if (y < height - 1) stack.push([x, y + 1]);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };

    const handleCanvasClick = (e) => {
        if (mode !== 'edit') return;
        if (tool === 'fill') {
            const { x, y } = getPos(e);
            const ctx = canvasRef.current.getContext('2d');
            floodFill(ctx, Math.floor(x), Math.floor(y), color);
            saveToHistory();
        }
    };

    const startDrawing = (e) => {
        if (mode !== 'edit') return;
        const { x, y } = getPos(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing || mode !== 'edit' || tool === 'fill') return;

        const { x, y } = getPos(e);
        const ctx = canvasRef.current.getContext('2d');

        ctx.lineTo(x, y);
        ctx.save();

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.globalAlpha = 1.0;
        } else if (tool === 'shade') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.05;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
            ctx.globalAlpha = 1.0;
        }

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
    };

    const stopDrawing = () => {
        if (isDrawing && mode === 'edit') {
            saveToHistory();
        }
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
        onSave(canvas.toDataURL());
    };

    const downloadDrawing = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `${user.displayName.toLowerCase()}-art.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    // Helper to generate shades
    const generateShades = (hex) => {
        // Simple shade generator
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const shades = [];
        const factors = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8]; // More granular shades

        factors.forEach(f => {
            const nr = Math.max(0, Math.min(255, Math.floor(r * f))).toString(16).padStart(2, '0');
            const ng = Math.max(0, Math.min(255, Math.floor(g * f))).toString(16).padStart(2, '0');
            const nb = Math.max(0, Math.min(255, Math.floor(b * f))).toString(16).padStart(2, '0');
            shades.push(`#${nr}${ng}${nb}`);
        });
        return shades;
    };

    const handleColorLongPress = (c, e) => {
        const rect = e.target.getBoundingClientRect();
        setShadePopup({
            show: true,
            color: c,
            x: rect.left,
            y: rect.top - 50 // Above the button
        });
    };

    // Render using Portal
    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pointer-events-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#FFE4C4] border-4 border-[#8B4513] p-4 shadow-[8px_8px_0_rgba(0,0,0,1)] max-w-4xl w-full flex flex-col gap-4 relative"
                style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: 'pixelated' }}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b-4 border-[#8B4513] pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.3)]" style={{ background: user.color }} />
                        <div className="flex flex-col">
                            <h2 className="text-[#5D4037] text-xs md:text-sm">
                                {mode === 'edit' ? 'EDITING: ' : 'VIEWING: '}
                                {user.displayName.toUpperCase()}
                            </h2>
                            {mode === 'view' && <span className="text-[10px] text-[#8B4513] opacity-70">LOCKED <Lock size={10} className="inline" /></span>}
                            {mode === 'edit' && <span className="text-[10px] text-green-700">UNLOCKED <Key size={10} className="inline" /></span>}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-[#8B4513] hover:bg-[#DEB887] p-2 border-2 border-transparent hover:border-[#8B4513] transition-all active:translate-y-1">
                        <X size={24} />
                    </button>
                </div>

                {/* Canvas Container */}
                <div className="relative p-2 bg-[#DEB887] border-4 border-[#5D4037] shadow-inner">
                    <div className="relative aspect-5/4 bg-white border-2 border-[#8B4513] overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            className={`w-full h-full block image-pixelated ${mode === 'edit' ? 'cursor-crosshair' : 'cursor-default'}`}
                            onMouseDown={(e) => {
                                if (tool === 'fill') handleCanvasClick(e);
                                else startDrawing(e);
                            }}
                            onMouseMove={(e) => {
                                draw(e);
                                setCursorPos({ ...getPos(e), show: true });
                            }}
                            onMouseUp={stopDrawing}
                            onMouseLeave={() => {
                                stopDrawing();
                                setCursorPos(prev => ({ ...prev, show: false }));
                            }}
                            onTouchStart={(e) => {
                                if (e.cancelable) e.preventDefault();
                                if (tool === 'fill') handleCanvasClick(e);
                                else startDrawing(e);
                            }}
                            onTouchMove={(e) => {
                                if (e.cancelable) e.preventDefault();
                                draw(e);
                                setCursorPos({ ...getPos(e), show: true });
                            }}
                            onTouchEnd={(e) => {
                                if (e.cancelable) e.preventDefault();
                                stopDrawing();
                                setCursorPos(prev => ({ ...prev, show: false }));
                            }}
                            style={{
                                imageRendering: 'pixelated',
                                touchAction: 'none' // CRITICAL: Stop mobile scrolling
                            }}
                        />

                        {/* Brush Preview Circle */}
                        {mode === 'edit' && tool !== 'fill' && cursorPos.show && (
                            <div
                                className="pointer-events-none absolute border-2 border-white/50 mix-blend-difference rounded-full z-5"
                                style={{
                                    width: brushSize,
                                    height: brushSize,
                                    left: cursorPos.x - brushSize / 2,
                                    top: cursorPos.y - brushSize / 2,
                                    boxShadow: '0 0 0 1px black'
                                }}
                            />
                        )}

                        {/* Auth Overlay */}
                        {mode === 'auth' && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="bg-[#FFE4C4] border-4 border-[#8B4513] p-6 flex flex-col items-center gap-4 shadow-[8px_8px_0_#000]"
                                >
                                    <Lock size={32} className="text-[#8B4513]" />
                                    <div className="text-center">
                                        <h3 className="text-[#5D4037] text-xs mb-2">SECURE CANVAS</h3>
                                        <p className="text-[8px] text-[#8B4513] mb-4">ENTER DOB (YYYY-MM-DD)</p>
                                    </div>

                                    <input
                                        type="text"
                                        maxLength={10}
                                        value={authInput}
                                        onChange={(e) => setAuthInput(e.target.value)}
                                        className={`w-48 p-2 text-center text-sm bg-[#FFF8DC] border-4 outline-none font-['Press_Start_2P'] ${authError ? 'border-red-500 text-red-500' : 'border-[#8B4513] text-[#5D4037]'}`}
                                        placeholder="YYYY-MM-DD"
                                        autoFocus
                                    />

                                    <div className="flex gap-2 w-full">
                                        <button
                                            onClick={() => { setMode('view'); setAuthError(false); setAuthInput(''); }}
                                            className="flex-1 py-2 text-[8px] bg-[#DEB887] border-2 border-[#8B4513] text-[#5D4037] hover:bg-[#D2B48C]"
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            onClick={handleUnlock}
                                            className="flex-1 py-2 text-[8px] bg-[#8B4513] border-2 border-[#5D4037] text-[#FFE4C4] hover:bg-[#5D4037]"
                                        >
                                            UNLOCK
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}


                    </div>
                </div>

                {/* Toolbar - Only visible in EDIT mode */}
                {mode === 'edit' && (
                    <div className="flex flex-wrap items-center gap-4 bg-[#DEB887] p-3 border-2 border-[#8B4513] shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                        {/* Current Color Indicator */}
                        <div className="flex flex-col items-center gap-1 px-2 border-r border-[#8B4513]/30">
                            <span className="text-[8px] text-[#5D4037]">COLOR</span>
                            <div
                                className="w-8 h-8 border-4 border-black"
                                style={{ backgroundColor: color }}
                            />
                        </div>

                        {/* Colors */}
                        <div className="flex gap-2 p-2 bg-[#F5DEB3] border border-[#8B4513] shadow-sm flex-wrap justify-center relative">
                            {['#000000', '#FF3B30', '#4CD964', '#007AFF', '#FFCC00', '#FF2D55', '#5856D6', '#8E8E93', '#FFFFFF', '#654321'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => { setColor(c); setTool('brush'); }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        handleColorLongPress(c, e);
                                    }}
                                    onTouchStart={(e) => {
                                        longPressTimer.current = setTimeout(() => handleColorLongPress(c, e), 500);
                                    }}
                                    onTouchEnd={() => {
                                        clearTimeout(longPressTimer.current);
                                    }}
                                    className={`w-6 h-6 border-2 border-black transition-transform hover:scale-110 active:scale-90 ${color === c && (tool === 'brush' || tool === 'shade') ? 'ring-2 ring-black scale-110 shadow-[2px_2px_0_rgba(0,0,0,0.5)]' : ''}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}

                            {/* Shade Popup */}
                            <AnimatePresence>
                                {shadePopup.show && (
                                    <>
                                        {/* Click outside to close */}
                                        <div
                                            className="fixed inset-0 z-100"
                                            onClick={() => setShadePopup({ ...shadePopup, show: false })}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-[#F5DEB3] border-4 border-[#8B4513] p-2 flex gap-1 z-101 shadow-[4px_4px_0_#000]"
                                            style={{ imageRendering: 'pixelated' }}
                                        >
                                            {generateShades(shadePopup.color).map(sc => (
                                                <button
                                                    key={sc}
                                                    onClick={() => {
                                                        setColor(sc);
                                                        setShadePopup({ ...shadePopup, show: false });
                                                    }}
                                                    className="w-6 h-6 border-2 border-black hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: sc }}
                                                />
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-8 w-1 bg-[#8B4513] opacity-50" />

                        {/* Tools */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTool('brush')}
                                title="Solid Brush"
                                className={`p-2 border-2 ${tool === 'brush' ? 'bg-[#8B4513] text-white border-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px]'}`}
                            >
                                <PixelPaintbrushIcon size={16} />
                            </button>

                            <button
                                onClick={() => setTool('shade')}
                                title="Shading Brush"
                                className={`p-2 border-2 ${tool === 'shade' ? 'bg-[#8B4513] text-white border-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px]'}`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M12 2L2 22h20L12 2z" /><path d="M12 6l-6 16" /><path d="M12 6l6 16" /></svg>
                            </button>

                            <button
                                onClick={() => setTool('fill')}
                                title="Fill Bucket"
                                className={`p-2 border-2 ${tool === 'fill' ? 'bg-[#8B4513] text-white border-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px]'}`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M19 11l-8-8-9 9 8 8 5-5 9-9z" /><path d="M22 22l-5-5" /></svg>
                            </button>

                            <button
                                onClick={() => setTool('eraser')}
                                title="Eraser"
                                className={`p-2 border-2 ${tool === 'eraser' ? 'bg-[#8B4513] text-white border-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px]'}`}
                            >
                                <Eraser size={16} />
                            </button>
                        </div>

                        <div className="h-8 w-1 bg-[#8B4513] opacity-50" />

                        {/* History Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleUndo}
                                disabled={historyIndex <= 0}
                                title="Undo"
                                className="p-2 border-2 bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Undo size={16} />
                            </button>
                            <button
                                onClick={handleRedo}
                                disabled={historyIndex >= history.length - 1}
                                title="Redo"
                                className="p-2 border-2 bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Redo size={16} />
                            </button>
                        </div>

                        <div className="h-8 w-1 bg-[#8B4513] opacity-50" />

                        {/* Size Slider */}
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#5D4037]">SIZE</span>
                            <input
                                type="range"
                                min="2"
                                max="30"
                                value={brushSize}
                                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                className="w-24 accent-[#8B4513]"
                            />
                        </div>

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={downloadDrawing}
                                title="Download Illustration"
                                className="px-3 py-2 bg-[#90EE90] text-[#006400] text-[10px] border-2 border-[#006400] hover:bg-[#98FB98] active:translate-y-1 shadow-[4px_4px_0_#006400] active:shadow-none transition-all flex items-center gap-2"
                            >
                                <Eye size={12} /> SAVE
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="px-3 py-2 bg-[#FFB6C1] text-[#8B0000] text-[10px] border-2 border-[#8B0000] hover:bg-[#FFC0CB] active:translate-y-1 shadow-[4px_4px_0_#8B0000] active:shadow-none transition-all flex items-center gap-2"
                            >
                                <RotateCcw size={12} /> CLEAR
                            </button>
                        </div>
                    </div>
                )}

                {/* View Mode Lock Button - Placed in footer area */}
                {mode === 'view' && (
                    <div className="flex justify-center p-2">
                        <button
                            onClick={() => setMode('auth')}
                            className="w-full py-4 bg-[#8B4513] text-[#FFE4C4] font-bold text-xs md:text-sm border-4 border-[#5D4037] hover:bg-[#A0522D] shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
                        >
                            <Key size={16} />
                            UNLOCK TO PAINT
                        </button>
                    </div>
                )}
            </motion.div>
        </div>,
        document.body
    );
};

const GalleryItem = ({ user, userKey, drawingData, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 group cursor-pointer relative shrink-0"
            onClick={(e) => {
                e.stopPropagation();
                onClick(userKey);
            }}
            style={{ pointerEvents: 'auto' }}
        >
            {/* Name Placard */}
            <div
                className="mb-2 px-2 py-1 bg-[#8B4513] border-2 border-[#3E2723] shadow-[2px_2px_0_rgba(0,0,0,0.3)] transform -rotate-1 group-hover:rotate-0 transition-transform origin-center"
                style={{ imageRendering: 'pixelated' }}
            >
                <span className="text-white text-[8px] md:text-[10px] font-bold font-['Press_Start_2P'] drop-shadow-md">
                    {user.displayName.toUpperCase()}
                </span>
            </div>

            {/* Easel/Canvas Container - FLEX COLUMN */}
            <div className="relative flex flex-col items-center">

                {/* Main Canvas Frame */}
                {/* Canvas is on top of legs */}
                {/* Standardized to 5:4 aspect ratio internal content box on both mobile (109px width for h-24) and desktop (149px width for h-32) */}
                <div className="relative z-10 bg-[#DEB887] p-2 border-l-4 border-t-4 border-r-4 border-b-8 border-[#5D4037] shadow-[4px_4px_0_rgba(0,0,0,0.2)] w-[109px] h-24 md:w-[149px] md:h-32">
                    {/* Canvas Surface */}
                    <div className="w-full h-full bg-white border-2 border-[#8B4513] relative overflow-hidden flex items-center justify-center image-pixelated">
                        {drawingData ? (
                            <img src={drawingData} alt="User drawing" className="w-full h-full object-contain image-pixelated" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                <PixelPaintbrushIcon size={20} className="text-[#8B4513]" />
                                <div className="text-[#8B4513] text-[6px] md:text-[8px] text-center font-['Press_Start_2P'] leading-tight">
                                    CLICK<br />TO PAINT
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pixel Art Legs - Rendered as a block element below canvas */}
                <div className="w-full h-[60px] -mt-3 z-0 flex justify-center pointer-events-none relative">
                    <svg width="100%" height="60px" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        {/* Left Leg */}
                        <path d="M15 0 H25 V10 H24 V20 H23 V30 H22 V40 H21 V50 H20 V60 H15 V60 V50 H16 V40 H17 V30 H18 V20 H19 V10 H20 V0 Z" fill="#5D4037" />

                        {/* Right Leg */}
                        <path d="M85 0 H75 V10 H76 V20 H77 V30 H78 V40 H79 V50 H80 V60 H85 V60 V50 H84 V40 H83 V30 H82 V20 H81 V10 H80 V0 Z" fill="#5D4037" />


                        {/* Horizontal Crossbar */}
                        <rect x="20" y="25" width="60" height="5" fill="#5D4037" />
                    </svg>

                    {/* Ground Shadow - Part of the legs block so it renders properly */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/30 rounded-[100%] blur-sm -z-10" />
                </div>
            </div>
        </motion.div>
    );
};

const UserGallery = ({ users }) => {
    const [selectedUserKey, setSelectedUserKey] = useState(null);
    const [drawings, setDrawings] = useState({});

    // Load drawings from local storage on mount
    // Load drawings from API on mount
    useEffect(() => {
        const fetchDrawings = async () => {
            try {
                const response = await fetch('/api/paintings');
                const result = await response.json();
                if (result.success) {
                    setDrawings(result.data);
                }
            } catch (e) {
                console.error("Failed to load drawings from API:", e);
                // Fallback to local storage if API fails (optional, but good for offline dev)
                const saved = localStorage.getItem('pixel_birthday_drawings');
                if (saved) {
                    setDrawings(JSON.parse(saved));
                }
            }
        };

        fetchDrawings();
    }, []);

    const handleSaveDrawing = async (key, dataURL) => {
        // Optimistic UI update
        const newDrawings = { ...drawings, [key]: dataURL };
        setDrawings(newDrawings);

        // Save to local storage as backup
        localStorage.setItem('pixel_birthday_drawings', JSON.stringify(newDrawings));

        // Save to API
        try {
            await fetch('/api/paintings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userKey: key,
                    displayName: users[key].displayName,
                    drawingData: dataURL
                }),
            });
        } catch (error) {
            console.error("Failed to save drawing to API:", error);
        }
    };

    return (
        <div className="absolute bottom-20 left-0 w-full flex flex-col justify-end z-20 pointer-events-none">
            {/* Title - Floating in sky */}
            <h2 className="absolute top-[-40vh] left-0 w-full text-center text-xl md:text-2xl text-[#5D4037] font-['Press_Start_2P'] drop-shadow-[2px_2px_0_#FFF] pointer-events-auto">
                COMMUNITY GALLERY
            </h2>

            {/* Horizontal Scroll Container for Canvases placed on ground */}
            {/* pb-32 (128px) ensures legs are fully visible above the 80px grass layer */}
            <div className="flex flex-row items-end overflow-x-auto md:overflow-x-visible w-full pointer-events-auto no-scrollbar snap-x snap-mandatory md:snap-none scroll-smooth pb-32 md:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex flex-row items-end gap-8 md:gap-16 px-4 md:px-0 md:justify-center w-full md:w-auto">
                    {/* Start Spacer for centering first item - Mobile Only */}
                    <div className="w-[35vw] md:hidden shrink-0" />

                    {Object.entries(users).map(([key, user]) => (
                        <motion.div
                            key={key}
                            className="snap-center md:snap-align-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GalleryItem
                                userKey={key}
                                user={user}
                                drawingData={drawings[key]}
                                onClick={setSelectedUserKey}
                            />
                        </motion.div>
                    ))}

                    {/* End Spacer for centering last item - Mobile Only */}
                    <div className="w-[35vw] md:hidden shrink-0" />
                </div>
            </div>

            <AnimatePresence>
                {selectedUserKey && (
                    <DrawingModal
                        user={users[selectedUserKey]}
                        initialData={drawings[selectedUserKey]}
                        onClose={() => setSelectedUserKey(null)}
                        onSave={(data) => handleSaveDrawing(selectedUserKey, data)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserGallery;