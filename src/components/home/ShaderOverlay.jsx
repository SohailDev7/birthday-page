import React from 'react';

export const ShaderOverlay = ({ timeOfDay = 'day' }) => {
    
    const getGradient = () => {
        switch (timeOfDay) {
            case 'sunset':
                return 'linear-gradient(to bottom, rgba(255, 100, 50, 0.1), rgba(100, 0, 255, 0.1))'; 
            case 'night':
                return 'linear-gradient(to bottom, rgba(0, 10, 50, 0.3), rgba(0, 0, 20, 0.2))'; 
            case 'twilight':
                return 'linear-gradient(to bottom, rgba(75, 0, 130, 0.2), rgba(0, 0, 0, 0.2))'; 
            default: 
                return 'linear-gradient(to bottom, rgba(255, 255, 200, 0.1), rgba(255, 255, 255, 0))'; 
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" style={{ mixBlendMode: 'overlay' }}>

            {}
            <div
                className="absolute inset-0"
                style={{
                    background: getGradient(),
                    pointerEvents: 'none',
                    mixBlendMode: 'soft-light'
                }}
            />

            {}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4))',
                    backgroundSize: '100% 4px',
                    pointerEvents: 'none'
                }}
            />

            {}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'screen'
                }}
            />

            {}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    filter: 'contrast(150%) brightness(100%)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none'
                }}
            />

            {}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none'
                }}
            />

            {}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};
