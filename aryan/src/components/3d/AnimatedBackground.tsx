"use client";
// src/components/3d/AnimatedSphere.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useMousePosition } from '../../lib/hooks/useMousePosition';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial 
        color="#f43f5e" 
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.5}
      />
    </Sphere>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}