"use client";
// src/components/sections/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  // Timeline data - replace with your actual information
  const timeline = [
    {
      year: '2023',
      title: 'Web Developer',
      company: 'Tech Company',
      description: 'Working on full-stack web applications using React, Next.js, and Node.js.'
    },
    {
      year: '2022',
      title: 'Frontend Developer Intern',
      company: 'Startup Name',
      description: 'Developed responsive UI components and implemented new features.'
    },
    {
      year: '2021',
      title: 'Computer Science Degree',
      company: 'University Name',
      description: 'Graduated with a focus on web development and software engineering.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            About <span className="text-accent-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full max-w-md h-96 md:h-[500px] bg-gray-700 rounded-lg overflow-hidden relative mx-auto">
                {/* Replace with your actual image
                <Image
                  src="/images/profile.jpg"
                  alt="Aryan Varmora"
                  fill
                  className="object-cover"
                />
                */}
                
                {/* Placeholder text until you have an image */}
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  Your Profile Image
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-4 border-accent-primary rounded-lg -z-10"></div>
              <div className="absolute -top-5 -left-5 w-40 h-40 bg-accent-secondary/20 rounded-full -z-10"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Web Developer & Designer
            </h3>
            
            <p className="text-white/70 mb-6">
              Hello! I'm Aryan, a passionate Web Developer based in [Your Location]. I enjoy turning complex problems into simple, beautiful and intuitive designs. When I'm not coding or pushing pixels, you'll find me [your hobbies or interests].
            </p>
            
            <p className="text-white/70 mb-8">
              I'm proficient in modern web technologies and frameworks, with a strong foundation in both frontend and backend development. I'm always eager to learn new technologies and stay updated with the latest industry trends.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-white"><span className="text-accent-primary font-semibold">Name:</span> Aryan Varmora</p>
              </div>
              <div>
                <p className="text-white"><span className="text-accent-primary font-semibold">Email:</span> your.email@example.com</p>
              </div>
              <div>
                <p className="text-white"><span className="text-accent-primary font-semibold">Location:</span> [Your Location]</p>
              </div>
              <div>
                <p className="text-white"><span className="text-accent-primary font-semibold">Availability:</span> Available for work</p>
              </div>
            </div>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-accent-primary text-white font-medium rounded-md hover:bg-accent-primary/90 transition-colors"
            >
              Download CV
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </motion.div>
        </div>
        
        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-10 text-center">
            My Journey
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-accent-primary/30"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative md:grid md:grid-cols-2 md:gap-8"
                >
                  {/* Timeline circle */}
                  <div className="absolute left-[-8px] md:left-1/2 top-0 md:transform md:-translate-x-1/2 w-4 h-4 bg-accent-primary rounded-full border-4 border-background-secondary z-10"></div>
                  
                  {/* Content positioning based on index */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:text-right md:pr-8 pl-8 md:pl-0">
                        <span className="inline-block px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-sm mb-2">
                          {item.year}
                        </span>
                        <h4 className="text-xl font-heading font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="text-accent-secondary mt-1">{item.company}</p>
                        <p className="text-white/60 mt-3">{item.description}</p>
                      </div>
                      <div></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block"></div>
                      <div className="md:pl-8 pl-8">
                        <span className="inline-block px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-sm mb-2">
                          {item.year}
                        </span>
                        <h4 className="text-xl font-heading font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="text-accent-secondary mt-1">{item.company}</p>
                        <p className="text-white/60 mt-3">{item.description}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}