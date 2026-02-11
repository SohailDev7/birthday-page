import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eraser, Undo, Redo, Lock, Eye, Check, Key, RotateCcw, Database, Download } from 'lucide-react';
import { FullBodyCharacter } from './Characters';

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
    const previewCanvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState('brush');
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanMode, setIsPanMode] = useState(false);
    const lastTapRef = useRef({ time: 0, color: null });
    const touchStateRef = useRef(null);

    const [shadePopup, setShadePopup] = useState({ show: false, color: '', x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false, canvasX: 0, canvasY: 0 });
    const longPressTimer = useRef(null);

    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Refs to access fresh state in event listeners
    const historyRef = useRef([]);
    const historyIndexRef = useRef(-1);

    // Sync refs with state
    useEffect(() => {
        historyRef.current = history;
        historyIndexRef.current = historyIndex;
    }, [history, historyIndex]);





    const [gallery, setGallery] = useState([]);
    const [equippedIndex, setEquippedIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [paintingTitle, setPaintingTitle] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [saveSlot, setSaveSlot] = useState(0);
    const [pendingExportData, setPendingExportData] = useState(null);
    const [hasTouchedCanvas, setHasTouchedCanvas] = useState(false);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    const [mode, setMode] = useState('view');
    const [authInput, setAuthInput] = useState('');
    const [authError, setAuthError] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [isFetchingPic, setIsFetchingPic] = useState(false);

    const correctHandle = user.instaHandle || user.displayName.toLowerCase();

    useEffect(() => {
        if (mode !== 'auth') return;

        const fetchPic = async () => {
            const input = authInput.trim().toLowerCase();
            const target = (user.instaHandle || user.displayName || '').toLowerCase();

            console.log("Canvas Auth Debug:", { input, target, user });

            if (input === target && input.length > 0) {
                setIsFetchingPic(true);
                // Try instagram with a forced fallback chain
                const url = `https://unavatar.io/instagram/${target}?fallback=https://unavatar.io/github/${target}&t=${Date.now()}`;
                console.log("Fetching from:", url);
                setProfilePic(url);
            } else {
                setProfilePic(null);
                setIsFetchingPic(false);
            }
        };

        const timer = setTimeout(fetchPic, 300);
        return () => clearTimeout(timer);
    }, [authInput, mode, user, correctHandle]);

    const drawStateRef = useRef({
        isDrawing: false,
        tool: 'brush',
        color: '#000000',
        brushSize: 5,
        zoom: 1,
        mode: 'view',
        isPanMode: false,
        lastPoint: { x: 0, y: 0 },
        points: []
    });

    const lastPointRef = useRef(null);
    const pointsRef = useRef([]);
    const brushPreviewRef = useRef(null);
    const canvasBoundsRef = useRef(null);
    const magnifierTimerRef = useRef(null);
    const [showKeypad, setShowKeypad] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        drawStateRef.current.tool = tool;
        drawStateRef.current.color = color;
        drawStateRef.current.brushSize = brushSize;
        drawStateRef.current.zoom = zoom;
        drawStateRef.current.mode = mode;
        drawStateRef.current.isPanMode = isPanMode;
    }, [tool, color, brushSize, zoom, mode, isPanMode]);

    const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
    const [pendingExitAction, setPendingExitAction] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const RESOLUTION = 1024;
        canvas.width = RESOLUTION;
        canvas.height = RESOLUTION;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

        if (initialData) {
            const img = new Image();
            img.onload = () => {

                ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
                const dataURL = canvas.toDataURL();
                setHistory([dataURL]);
                setHistoryIndex(0);
            };
            img.src = initialData;
        } else {
            const dataURL = canvas.toDataURL();
            setHistory([dataURL]);
            setHistoryIndex(0);
        }

        const fetchGallery = async () => {
            try {
                const res = await fetch(`/api/paintings/${user.displayName.toLowerCase()}`);
                const result = await res.json();
                if (result.success && result.data) {
                    setGallery(result.data.paintings || []);
                    setEquippedIndex(result.data.equippedIndex || 0);
                } else {
                    setGallery([]);
                }
            } catch (e) {
                console.error("Failed to fetch gallery:", e);
            }
        };
        fetchGallery();
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const handlePointerMove = (e) => {
            const state = drawStateRef.current;
            if (!state.isDrawing || state.isPanMode || state.mode !== 'edit') return;

            if (e.getCoalescedEvents) {
                const coalesced = e.getCoalescedEvents();
                for (const cev of coalesced) {
                    executeDraw(cev);
                }
            } else {
                executeDraw(e);
            }

            const pos = getPos(e);
            updateMagnifier(pos.x, pos.y);

            if (brushPreviewRef.current) {
                const offset = state.tool === 'powder' ? (state.brushSize * 2.0) : (state.brushSize / 2);
                const tx = (pos.screenX / state.zoom) - offset;
                const ty = (pos.screenY / state.zoom) - offset;
                brushPreviewRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                brushPreviewRef.current.style.opacity = '1';
            }
        };

        const handlePointerUp = () => {
            stopDrawing();
            drawStateRef.current.isPanMode = false;
            setIsPanMode(false);
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (mode !== 'edit' || showSaveDialog || showKeypad) return;

            const key = e.key.toLowerCase();
            if (key === 'b') setTool('brush');
            else if (key === 'p') setTool('powder');
            else if (key === 'c') setTool('calligraphy');
            else if (key === 's' && !e.ctrlKey) setTool('shade');
            else if (key === 'f') setTool('fill');
            else if (key === 'e') setTool('eraser');

            if (e.ctrlKey) {
                if (key === 'z') { e.preventDefault(); handleUndo(); }
                else if (key === 'y') { e.preventDefault(); handleRedo(); }
                else if (key === 's') {
                    e.preventDefault();
                    setPendingExportData(canvasRef.current.toDataURL());
                    setSaveSlot(equippedIndex);
                    setShowSaveDialog(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mode, showSaveDialog, showKeypad, equippedIndex, historyIndex]);

    useEffect(() => {
        const handleResize = () => {

        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const saveToHistory = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();

        // Use ref for current history to avoid stale closures
        const currentHistory = historyRef.current;
        const currentIndex = historyIndexRef.current;

        const newHistory = currentHistory.slice(0, currentIndex + 1);
        newHistory.push(dataURL);

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        onSave(dataURL);
    };

    const restoreState = (index, data = null) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const source = data || history[index];
            onSave(source);
        };
        img.src = data || history[index];
        if (!data) setHistoryIndex(index);
    };

    const loadPaintingToCanvas = (data) => {
        restoreState(null, data);
        setHistory([data]);
        setHistoryIndex(0);
        setHasTouchedCanvas(true);
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

        if (authInput.toLowerCase() === correctHandle.toLowerCase()) {
            setMode('edit');
            setAuthError(false);
            setAuthInput('');
            setProfilePic(null);
        } else {
            setAuthError(true);
            setTimeout(() => setAuthError(false), 500);
        }
    };

    const handleZoom = (newZoom) => {
        const clampedZoom = Math.min(3, Math.max(1, newZoom));

        if (clampedZoom <= 1) {
            setZoom(1);
            setPan({ x: 0, y: 0 });
            setIsPanMode(false);
        } else {

            const currentZoom = zoom;

            let ratio = 1;
            if (currentZoom > 1) {
                ratio = (clampedZoom - 1) / (currentZoom - 1);
            }

            if (isFinite(ratio)) {
                setPan(prev => ({
                    x: prev.x * ratio,
                    y: prev.y * ratio
                }));
            }

            setZoom(clampedZoom);
        }
    };

    const getPos = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0, screenX: 0, screenY: 0 };

        const rect = canvas.getBoundingClientRect();

        const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;

        const relativeX = (clientX - rect.left);
        const relativeY = (clientY - rect.top);

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: relativeX * scaleX,
            y: relativeY * scaleY,
            screenX: relativeX,
            screenY: relativeY,
            clientX,
            clientY
        };
    };

    const floodFill = (ctx, startX, startY, fillColor) => {

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
        if (mode !== 'edit' || isPanMode) return;
        setHasTouchedCanvas(true);
        const { x, y } = getPos(e);

        drawStateRef.current.isDrawing = true;
        drawStateRef.current.points = [{ x, y }];
        drawStateRef.current.lastPoint = { x, y };

        setIsDrawing(true);
        setCursorPos(prev => ({ ...prev, show: true }));

        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        updateMagnifier(x, y);
    };

    const executeDraw = (e) => {
        const state = drawStateRef.current;
        const pos = getPos(e);
        const ctx = canvasRef.current.getContext('2d');

        state.points.push(pos);

        ctx.save();

        if (state.tool === 'eraser' || state.tool === 'brush' || state.tool === 'shade') {
            if (state.tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'white';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = state.color;
                ctx.globalAlpha = state.tool === 'shade' ? 0.05 : 1.0;
            }

            ctx.lineWidth = state.brushSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (state.points.length > 2) {
                const prev = state.points[state.points.length - 2];
                const midX = (prev.x + pos.x) / 2;
                const midY = (prev.y + pos.y) / 2;

                ctx.beginPath();
                ctx.moveTo(state.lastPoint.x, state.lastPoint.y);
                ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
                ctx.stroke();

                state.lastPoint = { x: midX, y: midY };
            } else {
                ctx.beginPath();
                ctx.moveTo(state.lastPoint.x, state.lastPoint.y);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                state.lastPoint = pos;
            }
        } else if (state.tool === 'powder') {
            ctx.fillStyle = state.color;
            ctx.globalAlpha = 1.0;
            const particleCount = Math.max(5, Math.floor(state.brushSize * 0.8));
            const radius = state.brushSize * 3.0;

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.sqrt(Math.random()) * radius;
                ctx.fillRect(Math.floor(pos.x + Math.cos(angle) * dist), Math.floor(pos.y + Math.sin(angle) * dist), 1, 1);
            }
        } else if (state.tool === 'calligraphy') {
            ctx.fillStyle = state.color;
            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-state.brushSize / 2, -state.brushSize, state.brushSize, state.brushSize * 2);
            ctx.restore();
        }

        ctx.restore();
    };

    const updateMagnifier = (x, y) => {
        if (!previewCanvasRef.current || !canvasRef.current) return;
        const prevCtx = previewCanvasRef.current.getContext('2d');

        const size = 60;
        const destSize = 120;

        prevCtx.fillStyle = '#FFFFFF';
        prevCtx.fillRect(0, 0, destSize, destSize);

        prevCtx.drawImage(
            canvasRef.current,
            Math.floor(x - size / 2), Math.floor(y - size / 2), size, size,
            0, 0, destSize, destSize
        );

        prevCtx.strokeStyle = 'rgba(0,0,0,0.5)';
        prevCtx.lineWidth = 1;
        prevCtx.beginPath();
        prevCtx.moveTo(destSize / 2, 0);
        prevCtx.lineTo(destSize / 2, destSize);
        prevCtx.moveTo(0, destSize / 2);
        prevCtx.lineTo(destSize, destSize / 2);
        prevCtx.stroke();
    };

    const stopDrawing = () => {
        const state = drawStateRef.current;
        if (state.isDrawing) {
            state.isDrawing = false;
            setIsDrawing(false);
            setCursorPos(prev => ({ ...prev, show: false }));
            saveToHistory();
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 1024, 1024);
        saveToHistory();
        setHasTouchedCanvas(false);
    };

    const startNewSlot = (index) => {
        setEquippedIndex(index);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL();
        setHistory([dataURL]);
        setHistoryIndex(0);
        setHasTouchedCanvas(false);
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const handleSaveToDatabase = async () => {
        if (!paintingTitle.trim() || !pendingExportData) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/paintings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userKey: user.displayName.toLowerCase(),
                    displayName: user.displayName,
                    drawingData: pendingExportData,
                    title: paintingTitle,
                    index: saveSlot
                })
            });
            const result = await res.json();
            if (result.success && result.data) {
                setGallery(result.data.paintings || []);
                setShowSaveDialog(false);
                setPendingExportData(null);
                setPaintingTitle('');
                onSave(pendingExportData);
                setHasTouchedCanvas(false);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                alert(result.message);
            }
        } catch (e) {
            console.error("Save failed:", e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEquip = async (index) => {
        try {
            const res = await fetch(`/api/paintings/${user.displayName.toLowerCase()}/equip`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index })
            });
            const result = await res.json();
            if (result.success) {
                setEquippedIndex(index);
                onSave(gallery[index].drawingData);
            }
        } catch (e) {
            console.error("Equip failed:", e);
        }
    };

    const handleDelete = async (index) => {
        if (!confirm("Delete this painting?")) return;
        try {
            const res = await fetch(`/api/paintings/${user.displayName.toLowerCase()}/${index}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success && result.data) {
                setGallery(result.data.paintings || []);
                setEquippedIndex(result.data.equippedIndex || 0);
                if (result.data.paintings[result.data.equippedIndex]) {
                    onSave(result.data.paintings[result.data.equippedIndex].drawingData);
                }
            }
        } catch (e) {
            console.error("Delete failed:", e);
        }
    };

    const downloadDrawing = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `${user.displayName.toLowerCase()}-art.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const generateShades = (hex) => {

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const shades = [];
        const factors = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8];

        factors.forEach(f => {
            const nr = Math.max(0, Math.min(255, Math.floor(r * f))).toString(16).padStart(2, '0');
            const ng = Math.max(0, Math.min(255, Math.floor(g * f))).toString(16).padStart(2, '0');
            const nb = Math.max(0, Math.min(255, Math.floor(b * f))).toString(16).padStart(2, '0');
            shades.push(`#${nr}${ng}${nb}`);
        });
        return shades;
    };

    const handleColorClick = (c, e) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 400;

        if (lastTapRef.current.color === c && now - lastTapRef.current.time < DOUBLE_TAP_DELAY) {

            handleColorLongPress(c, e);
        } else {
            setColor(c);
        }
        lastTapRef.current = { time: now, color: c };
    };

    const handleColorLongPress = (c, e) => {
        const rect = e.target.getBoundingClientRect();
        setShadePopup({
            show: true,
            color: c,
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
    };

    const handleCloseRequest = () => {
        if (hasTouchedCanvas) {
            setPendingExitAction({ type: 'close' });
            setShowUnsavedWarning(true);
        } else {
            onClose();
        }
    };

    const handleNewSlotRequest = (index) => {
        if (hasTouchedCanvas) {
            setPendingExitAction({ type: 'newSlot', index });
            setShowUnsavedWarning(true);
        } else {
            startNewSlot(index);
        }
    };

    const confirmExitAction = () => {
        if (!pendingExitAction) return;
        if (pendingExitAction.type === 'close') {
            onClose();
        } else if (pendingExitAction.type === 'newSlot') {
            startNewSlot(pendingExitAction.index);
        }
        setShowUnsavedWarning(false);
        setPendingExitAction(null);
    };

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pointer-events-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#FFE4C4] border-4 border-[#8B4513] p-2 md:p-4 shadow-[8px_8px_0_rgba(0,0,0,1)] max-w-5xl w-full max-h-[90vh] flex flex-col gap-2 md:gap-4 relative overflow-hidden"
                style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: 'pixelated' }}
            >
                { }
                <div className="flex justify-between items-center border-b-4 border-[#8B4513] p-2 md:p-3 bg-[#8B4513]/10 shrink-0 z-50">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.3)]" style={{ background: user.color }} />
                        <div className="flex flex-col">
                            <h2 className="text-[#5D4037] text-[9px] md:text-sm max-w-[150px] md:max-w-[300px] truncate">
                                {mode === 'edit' ? 'EDITING: ' : 'VIEWING: '}
                                {(gallery && gallery[equippedIndex]?.title) || 'UNTITLED'}
                            </h2>
                            <span className="text-[7px] md:text-[8px] text-[#8B4513] opacity-60">
                                OWNER: {user.displayName.toUpperCase()}
                            </span>
                            {mode === 'view' && <span className="text-[7px] md:text-[10px] text-[#8B4513] opacity-70">LOCKED <Lock size={8} className="inline" /></span>}
                            {mode === 'edit' && <span className="text-[7px] md:text-[10px] text-green-700">UNLOCKED <Key size={8} className="inline" /></span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {mode === 'edit' && (
                            <div className="flex items-center bg-[#DEB887] border-2 border-[#8B4513] px-2 py-1 gap-2">
                                <span className="text-[8px] text-[#5D4037]">ZOOM</span>
                                <button onClick={() => handleZoom(zoom - 0.5)} className="hover:text-white">-</button>
                                <span className="text-[8px]">{zoom}x</span>
                                <button onClick={() => handleZoom(zoom + 0.5)} className="hover:text-white">+</button>
                            </div>
                        )}
                        <button
                            onClick={handleCloseRequest}
                            className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 border-4 border-white shadow-[6px_6px_0_#000] hover:bg-red-700 transition-all active:translate-y-1 active:shadow-none flex items-center justify-center font-black text-xs md:text-sm z-1000"
                            title="EXIT CANVAS"
                        >
                            <span className="mr-2 hidden md:inline">EXIT</span> <X size={24} strokeWidth={4} />
                        </button>
                    </div>
                </div>

                { }
                <AnimatePresence>
                    {mode === 'edit' && cursorPos.show && isDrawing && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="fixed top-24 left-4 pointer-events-none border-4 border-[#8B4513] shadow-[8px_8px_0_rgba(0,0,0,0.4)] z-200 overflow-hidden bg-white"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '8px',
                                border: '4px solid #8B4513',
                                transform: 'translateZ(0)'
                            }}
                        >
                            <canvas
                                ref={previewCanvasRef}
                                width={120}
                                height={120}
                                style={{ imageRendering: 'pixelated', width: '112px', height: '112px' }}
                            />
                            <div className="absolute top-0 right-0 bg-[#8B4513] text-white text-[8px] px-1 py-0.5 font-bold">PREVIEW</div>
                            { }
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-full h-px bg-[#8B4513]/30" />
                                <div className="h-full w-px bg-[#8B4513]/30" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                { }
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 flex-1 min-h-0 overflow-hidden">
                    { }
                    <div className="flex-1 flex flex-col gap-2 md:gap-4 min-w-0 overflow-hidden">
                        { }
                        <div className="relative p-1 md:p-3 bg-[#DEB887] border-4 border-[#5D4037] shadow-inner flex-1 overflow-auto flex flex-col items-center min-h-[200px] md:min-h-[300px]">
                            <div
                                className="relative bg-white border-4 border-[#8B4513] overflow-hidden m-auto shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    aspectRatio: '1 / 1',
                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                    transformOrigin: 'top left',
                                    cursor: isPanMode ? 'grab' : 'auto',
                                    transition: isDrawing || (touchStateRef.current?.dist) ? 'none' : 'transform 0.2s ease-out',
                                    willChange: 'transform'
                                }}
                            >
                                <canvas
                                    ref={canvasRef}
                                    className={`w-full h-full block image-pixelated ${mode === 'edit' ? (isPanMode ? 'cursor-grabbing' : 'cursor-crosshair') : 'cursor-default'}`}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onPointerDown={(e) => {
                                        if (mode !== 'edit' || isPanMode) return;
                                        if (e.button === 2 || e.buttons === 2) {
                                            if (zoom > 1) {
                                                setIsPanMode(true);
                                                drawStateRef.current.isPanMode = true;
                                            }
                                            return;
                                        }
                                        if (tool === 'fill') handleCanvasClick(e);
                                        else startDrawing(e);
                                    }}
                                    onMouseMove={(e) => {
                                        if (isPanMode) {
                                            if (zoom <= 1) { setIsPanMode(false); return; }
                                            setPan(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
                                            return;
                                        }

                                        if (!isDrawing) {
                                            const pos = getPos(e);
                                            if (brushPreviewRef.current) {
                                                const offset = tool === 'powder' ? (brushSize * 2.0) : (brushSize / 2);
                                                const tx = (pos.screenX / zoom) - offset;
                                                const ty = (pos.screenY / zoom) - offset;
                                                brushPreviewRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                                                brushPreviewRef.current.style.opacity = '1';
                                            }
                                        }
                                    }}
                                    onMouseUp={() => {
                                        stopDrawing();
                                        setIsPanMode(false);
                                    }}
                                    onMouseLeave={() => {
                                        stopDrawing();
                                        setIsPanMode(false);
                                        if (brushPreviewRef.current) brushPreviewRef.current.style.opacity = '0';
                                    }}
                                    onTouchStart={(e) => {
                                        if (e.touches.length > 1) {
                                            // Cancel any drawing immediately
                                            stopDrawing();

                                            const dist = Math.hypot(
                                                e.touches[0].clientX - e.touches[1].clientX,
                                                e.touches[0].clientY - e.touches[1].clientY
                                            );

                                            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                                            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                                            touchStateRef.current = { dist, zoom, pan, startCenter: { x: centerX, y: centerY } };
                                            return;
                                        }
                                        if (tool === 'fill') handleCanvasClick(e);
                                        else startDrawing(e);
                                    }}
                                    onTouchMove={(e) => {
                                        if (e.touches.length === 2 && touchStateRef.current?.dist) {
                                            const dist = Math.hypot(
                                                e.touches[0].clientX - e.touches[1].clientX,
                                                e.touches[0].clientY - e.touches[1].clientY
                                            );

                                            const currentX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                                            const currentY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                                            const scaleFactor = dist / touchStateRef.current.dist;
                                            const startZoom = touchStateRef.current.zoom;
                                            const newZoom = Math.min(3, Math.max(1, startZoom * scaleFactor));

                                            if (newZoom <= 1.05) {
                                                setZoom(1);
                                                setPan({ x: 0, y: 0 });
                                            } else {
                                                const startPan = touchStateRef.current.pan;
                                                const startCenter = touchStateRef.current.startCenter;
                                                const zoomRatio = newZoom / startZoom;

                                                const zoomPanX = startPan.x + (startCenter.x - startPan.x) * (1 - zoomRatio);
                                                const zoomPanY = startPan.y + (startCenter.y - startPan.y) * (1 - zoomRatio);

                                                const dragX = currentX - startCenter.x;
                                                const dragY = currentY - startCenter.y;

                                                setZoom(newZoom);
                                                setPan({
                                                    x: zoomPanX + dragX,
                                                    y: zoomPanY + dragY
                                                });
                                            }
                                            return;
                                        }
                                        const pos = getPos(e);
                                        executeDraw(e);
                                        setCursorPos({
                                            x: pos.screenX,
                                            y: pos.screenY,
                                            canvasX: pos.x,
                                            canvasY: pos.y,
                                            show: true
                                        });
                                    }}
                                    onTouchEnd={(e) => {
                                        stopDrawing();
                                        setCursorPos(prev => ({ ...prev, show: false }));
                                        if (e.touches.length < 2) touchStateRef.current = null;
                                    }}
                                    style={{
                                        imageRendering: 'pixelated',
                                        touchAction: 'none'
                                    }}
                                />

                                { }
                                {!initialData && !hasTouchedCanvas && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
                                        <PixelPaintbrushIcon size={40} className="text-[#8B4513] mb-4" />
                                        <span className="text-[#8B4513] text-[10px] md:text-sm animate-pulse text-center leading-loose">
                                            CLICK ANYWHERE<br />TO START PAINTING
                                        </span>
                                    </div>
                                )}

                                { }

                                { }
                                {mode === 'edit' && tool !== 'fill' && (
                                    <div
                                        ref={brushPreviewRef}
                                        className={`pointer-events-none absolute mix-blend-difference z-10 transition-opacity duration-150 top-0 left-0 ${tool === 'powder' ? 'border-2 border-dotted border-white/70' : 'border-2 border-white/50 rounded-full'}`}
                                        style={{
                                            width: tool === 'powder' ? (brushSize * 4.0) : brushSize,
                                            height: tool === 'powder' ? (brushSize * 4.0) : brushSize,
                                            borderRadius: '50%',
                                            boxShadow: '0 0 0 1px black',
                                            opacity: 0,
                                            willChange: 'transform'
                                        }}
                                    />
                                )}

                                { }
                                <AnimatePresence>
                                    {saveSuccess && (
                                        <motion.div
                                            initial={{ y: -50, opacity: 0 }}
                                            animate={{ y: 20, opacity: 1 }}
                                            exit={{ y: -50, opacity: 0 }}
                                            className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 border-4 border-white shadow-lg z-200 font-bold text-[10px]"
                                        >
                                            SAVED TO GALLERY!
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                { }
                                {mode === 'auth' && (
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-md">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="bg-[#FFE4C4] border-4 border-[#8B4513] p-8 flex flex-col items-center gap-6 shadow-[8px_8px_0_#000] w-[320px]"
                                        >
                                            <div className="relative">
                                                <div className="w-20 h-20 bg-[#DEB887] border-4 border-[#8B4513] rounded-full flex items-center justify-center overflow-hidden shadow-inner relative">
                                                    {!profilePic && !isFetchingPic && (
                                                        <Lock size={32} className="text-[#8B4513] opacity-40" />
                                                    )}

                                                    {isFetchingPic && (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="text-[#8B4513] z-10"
                                                        >
                                                            <Database size={24} />
                                                        </motion.div>
                                                    )}

                                                    {profilePic && (
                                                        <motion.img
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: isFetchingPic ? 0 : 1 }}
                                                            src={profilePic}
                                                            className="w-full h-full object-cover absolute inset-0"
                                                            alt="Profile"
                                                            onLoad={() => {
                                                                console.log("Profile pic loaded successfully");
                                                                setIsFetchingPic(false);
                                                            }}
                                                            onError={(e) => {
                                                                console.error("Profile pic failed to load, trying fallback");
                                                                e.target.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${correctHandle}`;
                                                                setTimeout(() => setIsFetchingPic(false), 500);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                {profilePic && !isFetchingPic && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-1 shadow-md"
                                                    >
                                                        <Check size={12} className="text-white" />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="text-center">
                                                <h3 className="text-[#5D4037] text-[10px] mb-2 font-bold">IDENTITY VERIFICATION</h3>
                                                <p className="text-[7px] text-[#8B4513] mb-4 uppercase">Enter your Instagram handle to enable editing</p>
                                            </div>

                                            <div className="w-full relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B4513] opacity-40 text-xs">@</span>
                                                <input
                                                    type="text"
                                                    value={authInput}
                                                    onChange={(e) => setAuthInput(e.target.value)}
                                                    className={`w-full pl-8 pr-3 py-3 text-center text-[10px] bg-[#FFF8DC] border-4 outline-none font-['Press_Start_2P'] ${authError ? 'border-red-500 text-red-500' : 'border-[#8B4513] text-[#5D4037]'}`}
                                                    placeholder="username"
                                                    autoFocus
                                                />
                                            </div>

                                            {profilePic && !isFetchingPic && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-[7px] text-green-700 font-bold"
                                                >
                                                    IS THIS YOU? UNLOCK TO EDIT!
                                                </motion.p>
                                            )}

                                            <div className="flex gap-3 w-full">
                                                <button
                                                    onClick={() => { setMode('view'); setAuthError(false); setAuthInput(''); setProfilePic(null); }}
                                                    className="flex-1 py-3 text-[8px] bg-[#DEB887] border-2 border-[#8B4513] text-[#5D4037] hover:bg-[#D2B48C] font-bold"
                                                >
                                                    CANCEL
                                                </button>
                                                <button
                                                    onClick={handleUnlock}
                                                    className="flex-1 py-3 text-[8px] bg-[#8B4513] border-2 border-[#5D4037] text-[#FFE4C4] hover:bg-[#5D4037] font-bold shadow-[4px_4px_0_rgba(0,0,0,0.2)]"
                                                >
                                                    UNLOCK
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>

                        { }
                        {mode === 'edit' && (
                            <div className="flex flex-col gap-2 bg-[#DEB887] p-2 md:p-3 border-2 border-[#8B4513] shadow-[4px_4px_0_rgba(0,0,0,0.2)] shrink-0">
                                { }
                                <div className="flex items-center gap-2 bg-[#F5DEB3] p-1 border border-[#8B4513] overflow-x-auto custom-scrollbar-h shrink-0 shadow-inner">
                                    <div className="shrink-0 flex items-center pr-2 border-r border-[#8B4513]/30">
                                        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-black shadow-sm" style={{ backgroundColor: color }} />
                                    </div>
                                    <div className="flex gap-1">
                                        {['#000000', '#FF3B30', '#4CD964', '#007AFF', '#FFCC00', '#FF2D55', '#5856D6', '#8E8E93', '#FFFFFF', '#654321', '#FF6B00', '#00FFFF'].map(c => (
                                            <button
                                                key={c}
                                                onClick={(e) => handleColorClick(c, e)}
                                                className={`w-6 h-6 md:w-7 md:h-7 border-2 border-black transition-transform hover:scale-110 active:scale-90 shrink-0 ${color === c ? 'ring-2 ring-white scale-110' : ''}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                { }
                                <div className="flex items-center gap-1 overflow-x-auto pb-1 custom-scrollbar-h shrink-0 py-1 border-b border-[#8B4513]/20">
                                    <div className="flex items-center gap-2 flex-wrap md:flex-nowrap px-1">
                                        <button onClick={() => setTool('brush')} title="Brush (B)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'brush' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <PixelPaintbrushIcon size={16} />
                                            <span className="text-[8px] md:text-[10px] font-bold">BRUSH</span>
                                        </button>
                                        <button onClick={() => setTool('powder')} title="Powder (P)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'powder' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <div className="flex items-center gap-1.5">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2" /><circle cx="8" cy="8" r="1" /><circle cx="16" cy="16" r="1" /><circle cx="16" cy="8" r="1" /><circle cx="8" cy="16" r="1" /></svg>
                                                <span className="text-[8px] md:text-[10px] font-bold">POWDER</span>
                                            </div>
                                        </button>
                                        <button onClick={() => setTool('calligraphy')} title="Calligraphy (C)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'calligraphy' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="4" transform="rotate(45 12 12)" /></svg>
                                            <span className="text-[8px] md:text-[10px] font-bold">PEN</span>
                                        </button>
                                        <button onClick={() => setTool('shade')} title="Soft Shade (S)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'shade' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z" /><path d="M12 6l-6 16" /><path d="M12 6l6 16" /></svg>
                                            <span className="text-[8px] md:text-[10px] font-bold">SHADE</span>
                                        </button>
                                        <button onClick={() => setTool('fill')} title="Fill Bucket (F)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'fill' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11l-8-8-9 9 8 8 5-5 9-9z" /><path d="M22 22l-5-5" /></svg>
                                            <span className="text-[8px] md:text-[10px] font-bold">FILL</span>
                                        </button>
                                        <button onClick={() => setTool('eraser')} title="Eraser (E)" className={`p-2 border-2 transition-all flex items-center gap-1.5 min-w-[60px] md:min-w-[80px] justify-center ${tool === 'eraser' ? 'bg-[#8B4513] text-white border-black scale-105 shadow-[2px_2px_0_#000]' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513]'}`}>
                                            <Eraser size={16} />
                                            <span className="text-[8px] md:text-[10px] font-bold">ERASE</span>
                                        </button>
                                    </div>
                                </div>

                                { }
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 overflow-x-auto py-1">
                                    { }
                                    <div className="flex items-center gap-2 px-2 border-r border-[#8B4513]/30 min-w-0">
                                        <span className="text-[7px] text-[#5D4037] whitespace-nowrap">SIZE</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="50"
                                            value={brushSize}
                                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                            className="w-16 md:w-32 accent-[#8B4513] h-2 bg-[#F5DEB3] rounded-lg appearance-none cursor-pointer border border-[#8B4513]"
                                        />
                                        <span className="text-[8px] text-[#5D4037] min-w-[15px]">{brushSize}</span>
                                    </div>

                                    { }
                                    <div className="flex gap-1 px-2 border-r border-[#8B4513]/30">
                                        <button onClick={handleUndo} disabled={historyIndex <= 0} className="p-1.5 border-2 bg-[#F5DEB3] border-[#8B4513] text-[#5D4037] disabled:opacity-50 hover:bg-[#DEB887] active:scale-95"><Undo size={14} /></button>
                                        <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-1.5 border-2 bg-[#F5DEB3] border-[#8B4513] text-[#5D4037] disabled:opacity-50 hover:bg-[#DEB887] active:scale-95"><Redo size={14} /></button>
                                    </div>

                                    { }
                                    <div className="flex gap-1 ml-auto">
                                        <button
                                            onClick={() => {
                                                setPendingExportData(canvasRef.current.toDataURL());
                                                setSaveSlot(equippedIndex);
                                                setShowSaveDialog(true);
                                            }}
                                            className="px-2 py-1 bg-[#90EE90] text-[#006400] text-[8px] border-2 border-[#006400] shadow-[1px_1px_0_#006400] flex items-center gap-1 active:translate-y-0.5"
                                        >
                                            <Download size={8} /> EXPORT
                                        </button>
                                        <button
                                            onClick={clearCanvas}
                                            className="px-2 py-1 bg-[#FFB6C1] text-[#8B0000] text-[8px] border-2 border-[#8B0000] shadow-[1px_1px_0_#8B0000] flex items-center gap-1 active:translate-y-0.5"
                                        >
                                            <RotateCcw size={8} /> CLEAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    { }
                    {mode === 'edit' && (
                        <div className="w-full md:w-64 bg-[#DEB887] p-1 md:p-3 border-t-4 md:border-l-4 border-[#8B4513] shadow-inner flex flex-col min-h-0 overflow-hidden shrink-0">
                            <h3 className="text-[#5D4037] text-[8px] md:text-[10px] mb-1 md:mb-2 flex items-center gap-2 font-bold bg-[#F5DEB3] p-1 md:p-2 border-2 border-[#8B4513] shrink-0">
                                <Database size={12} /> GALLERY ({(gallery || []).length}/8)
                            </h3>

                            <div className="flex md:grid md:grid-cols-2 gap-2 overflow-x-auto md:overflow-y-auto flex-1 p-1 custom-scrollbar-h">
                                {[...Array(8)].map((_, i) => {
                                    const p = gallery[i];
                                    const isSelected = equippedIndex === i;
                                    return (
                                        <div
                                            key={i}
                                            className={`aspect-square w-16 h-16 md:w-auto md:h-auto border-4 relative shrink-0 group cursor-pointer transition-all ${isSelected ? 'border-green-600 bg-green-100 ring-4 ring-green-600/30' : 'border-[#8B4513] bg-[#F5DEB3] hover:border-[#5D4037]'}`}
                                            onClick={() => {
                                                if (p) {
                                                    setSelectedSlotIndex(i);
                                                } else {
                                                    handleNewSlotRequest(i);
                                                }
                                            }}
                                        >
                                            {p ? (
                                                <div className="w-full h-full flex flex-col relative min-h-0">
                                                    <div className="flex-1 w-full relative min-h-0 p-1">
                                                        <img src={p.drawingData} className="w-full h-full object-contain image-pixelated" alt={p.title} />

                                                        { }
                                                        {isSelected && (
                                                            <div className="absolute top-0 right-0 bg-green-600 text-white p-0.5 border-l border-b border-white shadow-sm z-10">
                                                                <Check size={8} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    { }
                                                    <div className="bg-black/70 text-white text-[5px] text-center p-0.5 truncate pointer-events-none font-bold">
                                                        {p.title}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity bg-black/5">
                                                    <span className="text-xl font-bold text-[#8B4513]">+</span>
                                                    {isSelected && (
                                                        <div className="absolute top-0 right-0 bg-blue-600 text-white p-0.5 border-l border-b border-white shadow-sm z-10">
                                                            <Check size={8} />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                { }
                <AnimatePresence>
                    {showSaveDialog && (
                        <div className="fixed inset-0 z-100000 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-[#FFE4C4] border-4 border-[#8B4513] p-6 shadow-[8px_8px_0_#000] w-full max-w-sm"
                            >
                                <h3 className="text-[#5D4037] text-xs mb-4 text-center">SAVE TO SLOT {saveSlot + 1}</h3>

                                { }
                                <div className="flex gap-1 justify-center mb-4">
                                    {[...Array(8)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSaveSlot(i)}
                                            className={`w-6 h-6 md:w-8 md:h-8 border-2 flex items-center justify-center text-[10px] transition-all
                                                ${saveSlot === i ? 'bg-[#8B4513] text-white border-black scale-110 z-10 shadow-md' : 'bg-[#F5DEB3] text-[#5D4037] border-[#8B4513] hover:bg-[#DEB887]'}
                                                ${gallery && gallery[i] ? 'ring-2 ring-red-400 ring-offset-1' : ''}
                                            `}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                { }
                                {pendingExportData && (
                                    <div className="w-full aspect-square border-4 border-[#8B4513] mb-4 bg-white image-pixelated">
                                        <img src={pendingExportData} className="w-full h-full object-contain p-2" alt="Preview" />
                                    </div>
                                )}

                                {gallery && gallery[saveSlot] && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 text-[10px]" role="alert">
                                        <p className="font-bold">⚠️ OVERWRITE WARNING</p>
                                        <p>Slot {saveSlot + 1} contains "{gallery[saveSlot].title}".<br />Saving will replace it.</p>
                                    </div>
                                )}

                                <input
                                    type="text"
                                    value={paintingTitle}
                                    onChange={(e) => setPaintingTitle(e.target.value)}
                                    placeholder="Enter title..."
                                    className="w-full p-2 bg-white border-4 border-[#8B4513] text-sm mb-4 outline-none text-[#5D4037]"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowSaveDialog(false)}
                                        className="flex-1 py-2 bg-[#DEB887] border-2 border-[#8B4513] text-[10px]"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={handleSaveToDatabase}
                                        disabled={!paintingTitle.trim() || isSaving}
                                        className="flex-1 py-2 bg-[#8B4513] text-[#FFE4C4] border-2 border-[#5D4037] text-[10px] disabled:opacity-50"
                                    >
                                        {isSaving ? 'SAVING...' : 'SAVE'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {selectedSlotIndex !== null && gallery[selectedSlotIndex] && (
                        <div className="fixed inset-0 z-100000 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#FFE4C4] border-4 border-[#8B4513] p-4 shadow-[8px_8px_0_#000] w-full max-w-sm flex flex-col gap-4"
                            >
                                <div className="flex justify-between items-center bg-[#8B4513] p-2 -m-4 mb-0">
                                    <span className="text-white text-[10px] font-bold">SLOT {selectedSlotIndex + 1}</span>
                                    <button onClick={() => setSelectedSlotIndex(null)} className="text-white hover:bg-white/20 p-1">
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-col items-center gap-4">
                                    <h3 className="text-[#5D4037] text-xs font-bold uppercase tracking-tight">
                                        {gallery[selectedSlotIndex].title}
                                    </h3>

                                    <div className="w-full aspect-square bg-white border-4 border-[#8B4513] shadow-inner image-pixelated p-2">
                                        <img
                                            src={gallery[selectedSlotIndex].drawingData}
                                            className="w-full h-full object-contain"
                                            alt="Slot Preview"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <button
                                            onClick={() => {
                                                handleEquip(selectedSlotIndex);
                                                loadPaintingToCanvas(gallery[selectedSlotIndex].drawingData);
                                                setSelectedSlotIndex(null);
                                            }}
                                            className="w-full bg-blue-500 text-white text-[10px] border-4 border-white py-3 flex items-center justify-center font-bold shadow-[4px_4px_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none transition-all"
                                        >
                                            OPEN PAINTING
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(selectedSlotIndex);
                                                setSelectedSlotIndex(null);
                                            }}
                                            className="w-full bg-red-500 text-white text-[10px] border-4 border-white py-3 flex items-center justify-center font-bold shadow-[4px_4px_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none transition-all"
                                        >
                                            DELETE SLOT
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {shadePopup.show && (
                        <div className="fixed inset-0 z-1000000 pointer-events-auto">
                            <div className="absolute inset-0" onClick={() => setShadePopup({ ...shadePopup, show: false })} />
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="fixed bg-[#F5DEB3] border-4 border-[#8B4513] p-2 flex gap-1 shadow-[4px_4px_0_#000]"
                                style={{
                                    imageRendering: 'pixelated',
                                    left: shadePopup.x,
                                    top: shadePopup.y,
                                    transform: 'translate(-50%, -100%)'
                                }}
                            >
                                {generateShades(shadePopup.color).map(sc => (
                                    <button
                                        key={sc}
                                        onClick={() => { setColor(sc); setShadePopup({ ...shadePopup, show: false }); }}
                                        className="w-6 h-6 border-2 border-black hover:scale-110 active:scale-95"
                                        style={{ backgroundColor: sc }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {showUnsavedWarning && (
                        <div className="fixed inset-0 z-2000000 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#FFE4C4] border-4 border-[#8B4513] p-6 shadow-[8px_8px_0_#000] w-full max-w-sm flex flex-col gap-4 text-center"
                            >
                                <div className="text-red-700 font-bold text-sm flex items-center justify-center gap-2">
                                    <RotateCcw size={20} /> UNSAVED CHANGES
                                </div>
                                <p className="text-[#5D4037] text-[10px] md:text-xs leading-relaxed">
                                    You have unsaved drawings on the canvas. Moving away now will delete your current progress.
                                </p>

                                <div className="flex flex-col gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setShowUnsavedWarning(false);
                                            setPendingExportData(canvasRef.current.toDataURL());
                                            setSaveSlot(equippedIndex);
                                            setShowSaveDialog(true);
                                        }}
                                        className="w-full bg-green-600 text-white text-[10px] border-4 border-white py-3 font-bold shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:bg-green-700 active:translate-y-1 transition-all"
                                    >
                                        SAVE TO SLOT
                                    </button>
                                    <button
                                        onClick={confirmExitAction}
                                        className="w-full bg-red-500 text-white text-[10px] border-4 border-white py-3 font-bold shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:bg-red-600 active:translate-y-1 transition-all"
                                    >
                                        DISCARD & CONTINUE
                                    </button>
                                    <button
                                        onClick={() => { setShowUnsavedWarning(false); setPendingExitAction(null); }}
                                        className="w-full bg-[#DEB887] text-[#5D4037] text-[10px] border-4 border-[#8B4513] py-2 font-bold hover:bg-[#D2B48C] active:translate-y-1 transition-all"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
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
    const [animState, setAnimState] = useState('idle');
    const timeoutRef = useRef(null);

    const handleHover = () => {
        // Clear any existing sequence
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (userKey === 'sohail') {
            // Sohail: Levitate continuously until mouse leave
            setAnimState('levitate');
        } else {
            // Others: Wave twice (~1.6s) then return to Idle
            setAnimState('wave');
            timeoutRef.current = setTimeout(() => {
                setAnimState('idle');
            }, 1600);
        }
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setAnimState('idle');
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center group cursor-pointer relative shrink-0"
            onClick={(e) => {
                e.stopPropagation();
                onClick(userKey);
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            style={{ pointerEvents: 'auto' }}
        >
            <div
                className="mb-3 px-3 py-1.5 bg-[#8B4513] border-4 border-[#3E2723] shadow-[4px_4px_0_rgba(0,0,0,0.4)] transform rotate-1 group-hover:rotate-0 transition-all origin-center z-30 pointer-events-auto"
                style={{ imageRendering: 'pixelated' }}
            >
                <span className="text-white text-[8px] md:text-[10px] font-bold font-['Press_Start_2P'] drop-shadow-md whitespace-nowrap">
                    {user.displayName.toUpperCase()}
                </span>
                <div className="absolute top-[-8px] left-1/4 w-1 h-2 bg-[#5D4037]" />
                <div className="absolute top-[-8px] right-1/4 w-1 h-2 bg-[#5D4037]" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Character standing beside stand */}
                <div className="absolute -left-14 bottom-0 w-24 h-24 z-20 pointer-events-none hidden md:block">
                    <FullBodyCharacter
                        userKey={userKey}
                        userData={user}
                        isSelected={false}
                        animationState={animState}
                        direction={0} // Look Front in Gallery
                    />
                </div>

                <div className="relative z-10 bg-[#DEB887] p-2 border-l-4 border-t-4 border-r-4 border-b-8 border-[#5D4037] shadow-[6px_6px_0_rgba(0,0,0,0.2)] w-24 h-24 md:w-32 md:h-32">
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

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-1 md:gap-2 pointer-events-none p-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClick(userKey); }}
                                className="w-full max-w-[80px] py-1 bg-blue-500 text-white text-[7px] md:text-[8px] border-2 border-white font-bold shadow-[2px_2px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 pointer-events-auto"
                            >
                                OPEN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[80px] -mt-2 z-0 flex flex-col items-center pointer-events-none relative">
                    <svg width="100%" height="80px" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        <ellipse cx="50" cy="75" rx="40" ry="5" fill="rgba(0,0,0,0.2)" />
                        <path d="M15 0 H25 V20 H24 V40 H23 V60 H22 V80 H15 V80 V60 H16 V40 H17 V20 H18 V0 Z" fill="#5D4037" />
                        <path d="M85 0 H75 V20 H76 V40 H77 V60 H78 V80 H85 V80 V60 H84 V40 H83 V60 H82 V40 H81 V20 H80 V0 Z" fill="#5D4037" />
                        <rect x="20" y="5" width="60" height="8" fill="#5D4037" />
                        <path d="M48 0 H52 V70 H48 Z" fill="#3D2723" opacity="0.6" />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 rounded-[100%] blur-md -z-10" />
                </div>
            </div>
        </motion.div>
    );
};

const UserGallery = ({ users }) => {
    const [selectedUserKey, setSelectedUserKey] = useState(null);
    const [drawings, setDrawings] = useState({});

    useEffect(() => {
        const fetchDrawings = async () => {
            try {
                const response = await fetch('/api/paintings');
                const result = await response.json();
                if (result.success) {
                    setDrawings(result.data || {});
                }
            } catch (e) {
                console.error("Failed to load drawings from API:", e);

                const saved = localStorage.getItem('pixel_birthday_drawings');
                if (saved) {
                    setDrawings(JSON.parse(saved));
                }
            }
        };

        fetchDrawings();
    }, []);

    const handleSaveDrawing = async (key, dataURL) => {

        const newDrawings = { ...drawings, [key]: dataURL };
        setDrawings(newDrawings);

        localStorage.setItem('pixel_birthday_drawings', JSON.stringify(newDrawings));

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
            {/* Gallery Header */}
            <h2 className="absolute top-[-40vh] left-0 w-full text-center text-xl md:text-2xl text-[#5D4037] font-['Press_Start_2P'] drop-shadow-[2px_2px_0_#FFF] pointer-events-auto">
                COMMUNITY GALLERY
            </h2>

            {/* Scroll Container */}
            {/* Reduced gap to fit all on screen for PC (no carousel) */}
            <div className="flex flex-row items-end overflow-x-auto md:overflow-x-visible w-full pointer-events-auto no-scrollbar snap-x snap-mandatory md:snap-none scroll-smooth pb-14 md:justify-center px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex flex-row items-end gap-12 md:gap-14 md:justify-center w-max md:w-auto mx-auto">
                    { }
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

                    { }
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