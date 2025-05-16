"use client";
// src/components/3d/ParticlesBackground.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
}

export default function Particles({ count = 1000 }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  
  // Generate random positions, speeds and sizes for particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random positions in a sphere
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random speeds
      speeds[i] = 0.01 + Math.random() * 0.03;
      
      // Random sizes
      sizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    return { positions, speeds, sizes };
  }, [count]);
  
  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particles upward with their speed
        positions[i3 + 1] += particles.speeds[i];
        
        // Reset position when particle reaches top
        if (positions[i3 + 1] > 5) {
          positions[i3 + 1] = -5;
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation={true}
      />
    </points>
  );
}