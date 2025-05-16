"use client";
// src/components/sections/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-red-500 text-lg mb-4">
            Hello, I'm
          </h2>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Aryan Varmora
          </h1>
          
          <h3 className="text-2xl text-blue-400 mb-8">
            Web Developer & Designer
          </h3>
          
          <p className="text-gray-400 max-w-xl mb-10 text-lg">
            I create engaging digital experiences with modern web technologies.
            Focused on building responsive, accessible, and performant applications.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-md">
              View My Work
            </button>
            <button className="border border-pink-600 text-pink-600 px-6 py-3 rounded-md">
              Contact Me
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-white/60 mb-2">Scroll Down</p>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center p-1">
          <div className="w-1 h-2 bg-pink-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}