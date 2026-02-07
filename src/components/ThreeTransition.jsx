import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Animated 3D Plane with shader
const TransitionPlane = ({ isTransitioning }) => {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (meshRef.current && materialRef.current) {
            // Rotate and animate the plane
            meshRef.current.rotation.y = state.clock.elapsedTime * 2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;

            // Pulse scale
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
            meshRef.current.scale.set(scale, scale, scale);

            // Animate opacity
            if (isTransitioning) {
                materialRef.current.opacity = Math.min(1, materialRef.current.opacity + 0.05);
            } else {
                materialRef.current.opacity = Math.max(0, materialRef.current.opacity - 0.05);
            }
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshStandardMaterial
                ref={materialRef}
                color="#ec4899"
                wireframe
                transparent
                opacity={0}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Particle system
const Particles = () => {
    const particlesRef = useRef();
    const particleCount = 100;

    useEffect(() => {
        if (particlesRef.current) {
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 20;
            }

            particlesRef.current.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, 3)
            );
        }
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
            }

            particlesRef.current.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points>
            <bufferGeometry ref={particlesRef} />
            <pointsMaterial
                size={0.1}
                color="#f472b6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Main Three.js Transition Component
const ThreeTransition = ({ isTransitioning }) => {
    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <TransitionPlane isTransitioning={isTransitioning} />
                        <Particles />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ThreeTransition;
