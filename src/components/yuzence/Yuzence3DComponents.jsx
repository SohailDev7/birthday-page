import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const Nebula = ({ count = 2000, mouse }) => {
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            particle.mx += (mouse.current[0] * 100 - particle.mx) * 0.02;
            particle.my += (-mouse.current[1] * 100 - particle.my) * 0.02;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhysicalMaterial
                color="#00FFFF"
                emissive="#0000FF"
                emissiveIntensity={2}
                roughness={0}
                metalness={1}
                toneMapped={false}
            />
        </instancedMesh>
    );
};

export const TheCore = ({ position = [0, 0, 0] }) => {
    const mesh = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.2;
        mesh.current.rotation.y += delta * 0.3;

        const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
        mesh.current.scale.set(scale, scale, scale);
    });

    return (
        <mesh ref={mesh} position={position}>
            <octahedronGeometry args={[2.5, 0]} />
            <meshPhysicalMaterial
                roughness={0}
                metalness={0.2}
                transmission={1}
                thickness={3}
                envMapIntensity={2}
                clearcoat={1}
                clearcoatRoughness={0}
                ior={1.5}
                color="#ffffff"
                attenuationColor="#00E0FF"
                attenuationDistance={5}
            />
        </mesh>
    );
};
