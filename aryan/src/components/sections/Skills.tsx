"use client";
// src/components/sections/Skills.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Skill categories with skills and proficiency levels
const skillCategories = [
  {
    title: 'Frontend',
    icon: '💻',
    skills: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 70 },
      { name: 'MongoDB', level: 65 },
      { name: 'REST APIs', level: 80 },
      { name: 'SQL', level: 60 }
    ]
  },
  {
    title: 'Other',
    icon: '🔧',
    skills: [
      { name: 'Git/GitHub', level: 80 },
      { name: 'Responsive Design', level: 90 },
      { name: 'UI/UX Design', level: 70 },
      { name: 'Performance Optimization', level: 75 },
      { name: 'Testing', level: 65 }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            My <span className="text-accent-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-accent-primary mx-auto mt-4"></div>
          <p className="text-white/60 max-w-2xl mx-auto mt-6">
            Here are the technologies and tools I work with. I'm continuously learning and exploring new technologies to improve my skillset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className="bg-background-secondary p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-heading font-bold text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-accent-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-heading font-bold text-white mb-6">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Git', 'Figma'].map((tool) => (
              <motion.div
                key={tool}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-background-secondary rounded-lg"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}