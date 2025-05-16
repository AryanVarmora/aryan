
"use client";
// src/components/3d/AnimatedSphere.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useMousePosition } from '../../lib/hooks/useMousePosition';
import * as THREE from 'three';

function DistortedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const mousePosition = useMousePosition();
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Base animation
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      // Mouse interaction - subtle movement based on mouse position
      if (mousePosition.x && mousePosition.y) {
        // Normalize mouse position to range from -0.1 to 0.1
        const normalizedX = (mousePosition.x / window.innerWidth - 0.5) * 0.2;
        const normalizedY = (mousePosition.y / window.innerHeight - 0.5) * 0.2;
        
        // Apply subtle movement
        sphereRef.current.position.x = normalizedX;
        sphereRef.current.position.y = -normalizedY; // Invert Y for natural movement
      }
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial 
        color="#3b82f6" 
        attach="material" 
        distort={0.4} 
        speed={1.5} 
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function AnimatedSphere() {
  return (
    <div className="absolute right-0 top-1/4 md:top-1/3 w-64 h-64 md:w-96 md:h-96 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f43f5e" />
        <DistortedSphere />
      </Canvas>
    </div>
  );
}