import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Gentle wave formula
  float elevation = sin(pos.x * 2.0 + uTime * 0.5) * 0.2 
                  + sin(pos.y * 1.5 + uTime * 0.3) * 0.2;
                  
  pos.z += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vElevation;

void main() {
  // Mix colors based on elevation for depth
  vec3 color = mix(uColorA, uColorB, vElevation * 2.0 + 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`;

export const FlowingBlueSilk = () => {
    const mesh = useRef();
    const location = useLocation();

    const palettes = useMemo(() => ({
        '/': { A: '#E0F2FE', B: '#3B82F6' },       
        '/work': { A: '#EEF2FF', B: '#6366F1' },   
        '/about': { A: '#F8FAFC', B: '#94A3B8' },  
    }), []);

    const activePalette = palettes[location.pathname] || palettes['/'];

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(activePalette.A) },
        uColorB: { value: new THREE.Color(activePalette.B) }
    }), []);

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();

            mesh.current.material.uniforms.uColorA.value.lerp(new THREE.Color(activePalette.A), 0.05);
            mesh.current.material.uniforms.uColorB.value.lerp(new THREE.Color(activePalette.B), 0.05);
        }
    });

    return (
        <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} scale={[1.5, 1.5, 1.5]}>
            <planeGeometry args={[10, 10, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};
