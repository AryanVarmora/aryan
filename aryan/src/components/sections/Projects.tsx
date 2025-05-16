"use client";
// src/components/sections/Projects.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Project data - you can replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'Modern E-commerce Platform',
    description: 'A full-stack e-commerce application with cart functionality, user authentication, and payment processing.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    imageUrl: '/images/projects/ecommerce.jpg', // You'll need to add these images
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project1'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity application that helps users organize tasks, set deadlines, and track progress.',
    technologies: ['TypeScript', 'React', 'Redux', 'Express', 'PostgreSQL'],
    imageUrl: '/images/projects/taskapp.jpg',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project2'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with 3D elements and animations.',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: '/images/projects/portfolio.jpg',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/project3'
  },
  // Add more projects as needed
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            My <span className="text-accent-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent-primary mx-auto mt-4"></div>
          <p className="text-white/60 max-w-2xl mx-auto mt-6">
            Here are some of my recent projects. Each project demonstrates different skills and technologies I've worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background-tertiary rounded-xl overflow-hidden shadow-lg hover:shadow-accent-primary/20 transition-all duration-300 group"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Replace with actual images */}
                <div className="w-full h-full bg-gray-700 relative">
                  {/* Uncomment when you have images
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  */}
                  
                  {/* Placeholder until you have images */}
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    {project.title} Screenshot
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/60 mb-5 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={`${project.id}-${tech}`} 
                      className="px-3 py-1 bg-background-primary text-accent-primary/80 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-accent-primary text-white text-sm rounded-md hover:bg-accent-primary/90 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-accent-primary text-accent-primary text-sm rounded-md hover:bg-accent-primary/10 transition-colors"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href="https://github.com/AryanVarmora"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent-primary hover:text-accent-primary/80 transition-colors"
          >
            See more projects on GitHub
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}