import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const getCharacterVoxels = (userKey, userData) => {
    const voxels = [];
    const add = (x, y, z, color) => voxels.push({ x, y, z, color });

    if (userKey === 'yuzence') {

        for (let i = 0; i < 12; i++) add(6 + i, 6, 0, '#10B981'); 

        for (let i = 0; i < 8; i++) add(8 + i, 6, 1, '#1a1a1a');
        for (let i = 0; i < 8; i++) add(8 + i, 7, 1, '#2d2d2d');
        add(7, 8, 1, '#2d2d2d');
        add(16, 8, 1, '#2d2d2d');

        add(6, 7, 0, '#10B981'); add(17, 7, 0, '#10B981');
        add(6, 8, 0, '#10B981'); add(17, 8, 0, '#10B981');
        add(6, 9, 0, '#10B981'); add(17, 9, 0, '#10B981');

        add(10, 11, 1, '#FFF'); add(11, 11, 1, '#FFF');
        add(13, 11, 1, '#FFF'); add(14, 11, 1, '#FFF');
        add(10, 12, 1.2, '#34D399'); add(14, 12, 1.2, '#34D399'); 

        return voxels;
    }

    if (userKey === 'sama') {
        
        const hairColor = '#7C3AED';

        for (let i = 0; i < 12; i++) {
            add(6 + i, 6, 1, hairColor);
            add(6 + i, 7, 1, '#8B5CF6');
        }

        for (let y = 6; y < 14; y++) {
            add(6, y, 1, hairColor);   
            add(17, y, 1, hairColor);  
        }

        add(9, 11, 0.5, '#FFF'); add(10, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(10, 11, 1.2, '#9333EA'); add(14, 11, 1.2, '#9333EA'); 

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
        add(10, 8, 1, '#10B981'); add(11, 8, 1, '#10B981'); 
        add(10, 11, 0.5, '#FFF'); add(11, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(11, 12, 0.8, '#10B981'); add(14, 12, 0.8, '#10B981');
        return voxels;
    }

    if (userKey === 'prachi') {
        
        const hairColor = '#3E2723'; 

        for (let i = 0; i < 12; i++) {
            add(6 + i, 6, 1, hairColor);
            add(6 + i, 5, 0.5, hairColor); 
        }

        for (let y = 6; y < 16; y++) {
            add(6, y, 1, hairColor);  
            add(7, y, 0.8, hairColor); 
            add(17, y, 1, hairColor); 
            add(16, y, 0.8, hairColor); 
        }

        for (let i = 0; i < 10; i++) add(7 + i, 6, 1.2, hairColor);

        add(10, 5, 2, '#FF2D92'); add(13, 5, 2, '#FF2D92'); 
        add(11, 5, 1.8, '#FF69B4'); add(12, 5, 1.8, '#FF69B4'); 

        add(9, 11, 0.5, '#FFF'); add(10, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(10, 11, 1, '#FF2D92'); add(14, 11, 1, '#FF2D92'); 

        add(8, 12, 0.6, '#FFB6C1'); add(15, 12, 0.6, '#FFB6C1');

        return voxels;
    }

    if (userKey === 'aaditya') {
        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#D97706');
        for (let i = 0; i < 8; i++) add(8 + i, 7, 1, '#F59E0B');
        add(9, 11, 1, '#F59E0B'); add(11, 11, 1, '#F59E0B'); 
        add(13, 11, 1, '#F59E0B'); add(15, 11, 1, '#F59E0B');
        return voxels;
    }

    if (userKey === 'sameer') {
        
        for (let i = 0; i < 12; i++) add(6 + i, 6, 1, '#EA580C');
        for (let i = 0; i < 14; i++) add(5 + i, 5, 0.5, '#C2410C');
        for (let i = 0; i < 10; i++) add(7 + i, 7, 1, '#F97316'); 
        add(10, 11, 0.5, '#FFF'); add(11, 11, 0.5, '#FFF');
        add(13, 11, 0.5, '#FFF'); add(14, 11, 0.5, '#FFF');
        add(11, 12, 1, '#000'); add(14, 12, 1, '#000');
        return voxels;
    }

    if (userKey === 'sohail') {
        
        for (let i = 0; i < 10; i++) {
            add(7 + i, 5, 1, '#FFD700'); 
            if (i % 2 === 0) add(7 + i, 4, 1, '#FFD700'); 
        }
        
        add(11, 4, 1.2, '#FF0000');

        for (let i = 0; i < 10; i++) add(7 + i, 6, 1, '#2d2d2d');

        add(10, 11, 1, '#FFF'); add(11, 11, 1, '#FFF');
        add(13, 11, 1, '#FFF'); add(14, 11, 1, '#FFF');
        
        voxels.push({ x: 10, y: 11, z: 1.2, color: '#FFD700', emissive: true });
        voxels.push({ x: 14, y: 11, z: 1.2, color: '#FFD700', emissive: true });

        for (let i = 0; i < 6; i++) add(9 + i, 14, 1, '#4a4a4a');

        return voxels;
    }

    return voxels;
};

export const HeadMesh = ({ userData, userKey, isSpawned = false }) => {
    const mesh = useRef();
    
    useFrame((state) => {
        if (mesh.current && !isSpawned) {
            mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    const voxels = useMemo(() => getCharacterVoxels(userKey, userData), [userKey, userData]);

    return (
        <group ref={mesh}>
            {}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[8, 8, 8]} />
                <meshStandardMaterial color={userData.skinColor || '#f0c0a0'} roughness={0.5} />
            </mesh>

            {}
            <mesh position={[0, 0.5, -0.5]} scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[8, 7, 8]} />
                <meshStandardMaterial color={userKey === 'prachi' ? '#3E2723' : userData.color} roughness={0.8} />
            </mesh>

            {}
            {voxels.map((v, i) => (
                <mesh
                    key={i}
                    position={[
                        v.x - 11.5,   
                        -(v.y - 10), 
                        4 + (v.z * 0.5) 
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

        if (group.current) {

            const targetRot = direction === 1 ? Math.PI / 2 : -Math.PI / 2;

            const finalTarget = (animationState === 'wave' || animationState === 'levitate') ? 0 : targetRot;

            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, finalTarget, 0.1);

            if (animationState === 'walk') {
                group.current.position.y = Math.abs(Math.sin(t * 10)) * 0.5 - 1;
            } else {
                group.current.position.y = Math.sin(t * 2) * 0.1 - 1;
            }
        }

        if (animationState === 'wave') {
            
            if (rightArm.current) {
                rightArm.current.rotation.z = Math.PI - 0.2 + Math.sin(t * 8) * 0.5;
                rightArm.current.rotation.x = Math.sin(t * 3) * 0.1;
            }
            
            if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.05;
            
            if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t) * 0.05;
            if (rightLeg.current) rightLeg.current.rotation.x = -Math.sin(t) * 0.05;
        } else if (animationState === 'walk') {
            
            const speed = 10;
            const armAmp = 0.8;
            const legAmp = 0.8;

            if (rightArm.current) {
                rightArm.current.rotation.z = 0; 
                rightArm.current.rotation.x = Math.sin(t * speed) * armAmp;
            }
            if (leftArm.current) {
                leftArm.current.rotation.z = 0;
                leftArm.current.rotation.x = Math.sin(t * speed + Math.PI) * armAmp;
            }

            if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * speed + Math.PI) * legAmp;
            if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * speed) * legAmp;
        } else if (animationState === 'levitate') {
            
            const floatAmp = 1.0; 
            const tiltAmp = 0.1;

            if (group.current) {
                group.current.position.y = Math.sin(t * 2) * floatAmp - 3.5; 
                group.current.rotation.z = Math.sin(t * 1.5) * tiltAmp;
            }

            if (rightArm.current) {
                rightArm.current.rotation.z = Math.PI * 0.75 + Math.sin(t * 1.5) * 0.1;
                rightArm.current.rotation.x = -0.5;
            }
            if (leftArm.current) {
                leftArm.current.rotation.z = -(Math.PI * 0.75) - Math.sin(t * 1.5) * 0.1;
                leftArm.current.rotation.x = -0.5;
            }

            if (rightLeg.current) rightLeg.current.rotation.x = 0.3 + Math.sin(t * 1.5) * 0.1;
            if (leftLeg.current) leftLeg.current.rotation.x = 0.3 - Math.sin(t * 1.5) * 0.1;
        }

        if (head.current) {
            head.current.rotation.y = Math.sin(t) * 0.1;
            head.current.rotation.x = Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]}>
            {}
            <group ref={head} position={[0, 6, 0]}>
                <HeadMesh userKey={userKey} userData={userData} isSpawned={true} />
            </group>

            {}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[8, 10, 4]} />
                <meshStandardMaterial color={userData.color} />
            </mesh>

            {}
            <group ref={rightArm} position={[5, 4, 0]}>
                <mesh position={[1, -4, 0]}>
                    <boxGeometry args={[3, 10, 3]} />
                    <meshStandardMaterial color={userData.accent} />
                </mesh>
            </group>

            {}
            <group ref={leftArm} position={[-5, 4, 0]}>
                <mesh position={[-1, -4, 0]}>
                    <boxGeometry args={[3, 10, 3]} />
                    <meshStandardMaterial color={userData.accent} />
                </mesh>
            </group>

            {}
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
