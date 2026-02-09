import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Character Data Logic ---
const getCharacterVoxels = (userKey, userData) => {
    const voxels = [];
    const add = (x, y, z, color) => voxels.push({ x, y, z, color });

    // Common offset to center the 8x8 face on the 10x10 grid we use
    // Pixel art was designed on coords roughly x:6-18, y:6-16.
    // We center around x=12, y=11.

    if (userKey === 'yuzence') {
        // Green Hoodie Guy
        // Base Head is handled by main box
        // Voxel Features (Hair, Hood, Eyes)

        // Hood Top
        for (let i = 0; i < 12; i++) add(6 + i, 6, 0, '#10B981'); // Hood Top Rim

        // Messy Hair (Pop out z=1)
        for (let i = 0; i < 8; i++) add(8 + i, 6, 1, '#1a1a1a');
        for (let i = 0; i < 8; i++) add(8 + i, 7, 1, '#2d2d2d');
        add(7, 8, 1, '#2d2d2d');
        add(16, 8, 1, '#2d2d2d');

        // Hood Sides
        add(6, 7, 0, '#10B981'); add(17, 7, 0, '#10B981');
        add(6, 8, 0, '#10B981'); add(17, 8, 0, '#10B981');
        add(6, 9, 0, '#10B981'); add(17, 9, 0, '#10B981');

        // Eyes (Pop out z=1)
        add(10, 11, 1, '#FFF'); add(11, 11, 1, '#FFF');
        add(13, 11, 1, '#FFF'); add(14, 11, 1, '#FFF');
        add(10, 12, 1.2, '#34D399'); add(14, 12, 1.2, '#34D399'); // Green Pupils

        return voxels;
    }

    if (userKey === 'sama') {
        // Purple Hair Girl - Feminine Style
        const hairColor = '#7C3AED';

        // Hair Volume (z=1)
        for (let i = 0; i < 12; i++) {
            add(6 + i, 6, 1, hairColor);
            add(6 + i, 7, 1, '#8B5CF6');
        }

        // Long Side Hair for the Girl look
        for (let y = 6; y < 14; y++) {
            add(6, y, 1, hairColor);   // Left
            add(17, y, 1, hairColor);  // Right
        }

        // Eyes (Feminine lashes/big eyes)
        add(9, 11, 0.5, '#FFF'); add(10, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(10, 11, 1.2, '#9333EA'); add(14, 11, 1.2, '#9333EA'); // Purple Pupils

        // Blush
        add(8, 12, 0.6, '#FFB6C1'); add(15, 12, 0.6, '#FFB6C1');

        return voxels;
    }

    if (userKey === 'manash') {
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#1a1a1a');
        for (let i = 0; i < 8; i++) add(8 + i, 5, 0.5, '#1a1a1a');
        add(9, 11, 0.5, '#FFF'); add(10, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(10, 11, 1, '#000'); add(14, 11, 1, '#000');
        return voxels;
    }

    if (userKey === 'saurav') {
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#5D4037');
        add(10, 8, 1, '#10B981'); add(11, 8, 1, '#10B981'); // Green headband
        add(10, 11, 0.5, '#FFF'); add(11, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(11, 12, 0.8, '#10B981'); add(14, 12, 0.8, '#10B981');
        return voxels;
    }

    if (userKey === 'prachi') {
        // Feminine Hair Style - Long Dark Hair with Volume
        const hairColor = '#3E2723'; // Dark Brown

        // Top Hair Volume
        for (let i = 0; i < 12; i++) {
            add(6 + i, 6, 1, hairColor);
            add(6 + i, 5, 0.5, hairColor); // Back coverage
        }

        // Long Side Hair (The "Girl" look)
        for (let y = 6; y < 16; y++) {
            add(6, y, 1, hairColor);  // Left outer
            add(7, y, 0.8, hairColor); // Left inner
            add(17, y, 1, hairColor); // Right outer
            add(16, y, 0.8, hairColor); // Right inner
        }

        // Bangs/Fringe
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1.2, hairColor);

        // Cute Pink Bow (Center Top)
        add(10, 5, 2, '#FF2D92'); add(13, 5, 2, '#FF2D92'); // Bow Loops
        add(11, 5, 1.8, '#FF69B4'); add(12, 5, 1.8, '#FF69B4'); // Bow Center

        // Eyes (Big & Cute)
        add(9, 11, 0.5, '#FFF'); add(10, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(10, 11, 1, '#FF2D92'); add(14, 11, 1, '#FF2D92'); // Pink pupils matching theme

        // Blush Cheeks
        add(8, 12, 0.6, '#FFB6C1'); add(15, 12, 0.6, '#FFB6C1');

        return voxels;
    }

    if (userKey === 'aaditya') {
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#D97706');
        for (let i = 0; i < 8; i++) add(8 + i, 7, 1, '#F59E0B');
        add(9, 11, 1, '#F59E0B'); add(11, 11, 1, '#F59E0B'); // Sunglasses
        add(13, 11, 1, '#F59E0B'); add(15, 11, 1, '#F59E0B');
        return voxels;
    }

    if (userKey === 'sameer') {
        // Orange Theme / Sameer with Hair and Bandana
        for (let i = 0; i < 12; i++) add(6 + i, 6, 1, '#EA580C');
        for (let i = 0; i < 14; i++) add(5 + i, 5, 0.5, '#C2410C');
        for (let i = 0; i < 10; i++) add(7 + i, 7, 1, '#F97316'); // Highlights
        add(10, 11, 0.5, '#FFF'); add(11, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(11, 12, 1, '#000'); add(14, 12, 1, '#000');
        return voxels;
    }

    if (userKey === 'sohail') {
        // Gold Crown
        for (let i = 0; i < 10; i++) {
            add(7 + i, 5, 1, '#FFD700'); // Base
            if (i % 2 === 0) add(7 + i, 4, 1, '#FFD700'); // Spikes
        }
        // Gem in Crown
        add(11, 4, 1.2, '#FF0000');

        // Dark Hair
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#2d2d2d');

        // Eyes (Bright Gold for Aura effect)
        add(10, 11, 1, '#FFF'); add(11, 11, 1, '#FFF');
        add(13, 11, 1, '#FFF'); add(14, 11, 1, '#FFF');
        // Add glowing pupils
        voxels.push({ x: 10, y: 11, z: 1.2, color: '#FFD700', emissive: true });
        voxels.push({ x: 14, y: 11, z: 1.2, color: '#FFD700', emissive: true });

        // Beard/Stubble
        for (let i = 0; i < 6; i++) add(9 + i, 14, 1, '#4a4a4a');

        return voxels;
    }

    return voxels;
};

export const HeadMesh = ({ userData, userKey, isSpawned = false }) => {
    const mesh = useRef();
    // Auto-rotate logic - ONLY if NOT spawned (grid view)
    useFrame((state) => {
        if (mesh.current && !isSpawned) {
            mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    const voxels = useMemo(() => getCharacterVoxels(userKey, userData), [userKey, userData]);

    return (
        <group ref={mesh}>
            {/* Base Head Box (Skin Color) - 8x8x8 units */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[8, 8, 8]} />
                <meshStandardMaterial color={userData.skinColor || '#f0c0a0'} roughness={0.5} />
            </mesh>

            {/* Hair/Hat Base Wrapper (Slightly larger box for hair color base) */}
            <mesh position={[0, 0.5, -0.5]} scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[8, 7, 8]} />
                <meshStandardMaterial color={userKey === 'prachi' ? '#3E2723' : userData.color} roughness={0.8} />
            </mesh>

            {/* Voxel Features (The 3D bits) */}
            {voxels.map((v, i) => (
                <mesh
                    key={i}
                    position={[
                        v.x - 11.5,   // Center X (12 is mid)
                        -(v.y - 10), // Flip Y and Center (10 is mid)
                        4 + (v.z * 0.5) // Z offset from face (face is at z=4)
                    ]}
                >
                    <boxGeometry args={[1, 1, v.z || 0.5]} />
                    <meshStandardMaterial
                        color={v.color}
                        roughness={0.5}
                        emissive={v.emissive ? v.color : '#000000'}
                        emissiveIntensity={v.emissive ? 3 : 0}
                    />
                </mesh>
            ))}
        </group>
    );
};

export const CharacterHead = ({ userKey, userData, isSelected }) => {
    return (
        <div className="w-full h-full relative" style={{ imageRendering: 'pixelated' }}>
            <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} />
                <mesh rotation={[0.2, isSelected ? 0.5 : 0, 0]}>
                    <HeadMesh userData={userData} userKey={userKey} />
                </mesh>
                {isSelected && <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />}
            </Canvas>
        </div>
    );
};

export const MinecraftCharacter3D = ({ userKey, userData, animationState = 'wave', direction = 1 }) => {
    const group = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();
    const head = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Smooth rotation for direction change
        if (group.current) {
            // Target rotation based on direction (1 = Right, -1 = Left)
            // Base rotation is 0 (facing forward).
            // Right = Math.PI / 2, Left = -Math.PI / 2
            const targetRot = direction === 1 ? Math.PI / 2 : -Math.PI / 2;

            // If waving or levitating, face forward
            const finalTarget = (animationState === 'wave' || animationState === 'levitate') ? 0 : targetRot;

            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, finalTarget, 0.1);

            // Bobbing while walking
            if (animationState === 'walk') {
                group.current.position.y = Math.abs(Math.sin(t * 10)) * 0.5 - 1;
            } else {
                group.current.position.y = Math.sin(t * 2) * 0.1 - 1;
            }
        }

        if (animationState === 'wave') {
            // Wave Right Arm
            if (rightArm.current) {
                rightArm.current.rotation.z = Math.PI - 0.2 + Math.sin(t * 8) * 0.5;
                rightArm.current.rotation.x = Math.sin(t * 3) * 0.1;
            }
            // Idle Left Arm
            if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.05;
            // Idle Legs
            if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t) * 0.05;
            if (rightLeg.current) rightLeg.current.rotation.x = -Math.sin(t) * 0.05;
        } else if (animationState === 'walk') {
            // Walking Animation (Opposite limbs)
            const speed = 10;
            const armAmp = 0.8;
            const legAmp = 0.8;

            if (rightArm.current) {
                rightArm.current.rotation.z = 0; // Arms down
                rightArm.current.rotation.x = Math.sin(t * speed) * armAmp;
            }
            if (leftArm.current) {
                leftArm.current.rotation.z = 0;
                leftArm.current.rotation.x = Math.sin(t * speed + Math.PI) * armAmp;
            }

            if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * speed + Math.PI) * legAmp;
            if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * speed) * legAmp;
        } else if (animationState === 'levitate') {
            // Special Owner Animation: Majestic Floating & Power pose
            const floatAmp = 1.0; // Reduced further to keep in frame
            const tiltAmp = 0.1;

            if (group.current) {
                group.current.position.y = Math.sin(t * 2) * floatAmp - 3.5; // Lowered from -1.5 to -3.5 to keep him well within card
                group.current.rotation.z = Math.sin(t * 1.5) * tiltAmp;
            }

            // Both arms raised slightly (Prophet/Lordly pose)
            if (rightArm.current) {
                rightArm.current.rotation.z = Math.PI * 0.75 + Math.sin(t * 1.5) * 0.1;
                rightArm.current.rotation.x = -0.5;
            }
            if (leftArm.current) {
                leftArm.current.rotation.z = -(Math.PI * 0.75) - Math.sin(t * 1.5) * 0.1;
                leftArm.current.rotation.x = -0.5;
            }

            // Dangled legs
            if (rightLeg.current) rightLeg.current.rotation.x = 0.3 + Math.sin(t * 1.5) * 0.1;
            if (leftLeg.current) leftLeg.current.rotation.x = 0.3 - Math.sin(t * 1.5) * 0.1;
        }

        // Head Look
        if (head.current) {
            head.current.rotation.y = Math.sin(t) * 0.1;
            head.current.rotation.x = Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]}>
            {/* Head */}
            <group ref={head} position={[0, 6, 0]}>
                <HeadMesh userKey={userKey} userData={userData} isSpawned={true} />
            </group>

            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[8, 10, 4]} />
                <meshStandardMaterial color={userData.color} />
            </mesh>

            {/* Right Arm */}
            <group ref={rightArm} position={[5, 4, 0]}>
                <mesh position={[1, -4, 0]}>
                    <boxGeometry args={[3, 10, 3]} />
                    <meshStandardMaterial color={userData.accent} />
                </mesh>
            </group>

            {/* Left Arm */}
            <group ref={leftArm} position={[-5, 4, 0]}>
                <mesh position={[-1, -4, 0]}>
                    <boxGeometry args={[3, 10, 3]} />
                    <meshStandardMaterial color={userData.accent} />
                </mesh>
            </group>

            {/* Legs */}
            <group ref={leftLeg} position={[-2, -5, 0]}>
                <mesh position={[0, -4.5, 0]}>
                    <boxGeometry args={[3.5, 9, 3.5]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
            <group ref={rightLeg} position={[2, -5, 0]}>
                <mesh position={[0, -4.5, 0]}>
                    <boxGeometry args={[3.5, 9, 3.5]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
        </group>
    );
};

export const FullBodyCharacter = ({ userKey, userData, isSelected, animationState }) => {
    return (
        <div className="w-full h-full relative" style={{ imageRendering: 'pixelated' }}>
            <Canvas camera={{ position: [0, 6, 28], fov: 48 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} />
                <group rotation={[0.1, isSelected ? 0 : -0.2, 0]}>
                    <MinecraftCharacter3D
                        userKey={userKey}
                        userData={userData}
                        animationState={animationState || (isSelected ? 'wave' : 'idle')}
                    />
                </group>
                {isSelected && <OrbitControls enableZoom={false} />}
            </Canvas>
        </div>
    );
};
