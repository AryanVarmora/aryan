import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const featuredProjects = [
  {
    id: 1,
    title: "FlashFade – Memory Decay Flashcards",
    description: "A unique MERN stack app that visualizes memory decay through animated fading flashcards. Reinforces learning using Ebbinghaus' Forgetting Curve.",
    icon: "⏱️",
    color: "from-blue-500 to-cyan-500",
    category: "AI/ML",
    link: "https://github.com/AryanVarmora/FlashFade"
  },
  {
    id: 2,
    title: "EcomMonger – Spring Boot API",
    description: "A full-fledged RESTful e-commerce API using Spring Boot, JWT auth, and MongoDB with advanced security features.",
    icon: "🛒",
    color: "from-purple-500 to-pink-500",
    category: "Full-Stack",
    link: "https://github.com/AryanVarmora/EcomMonger"
  },
  {
    id: 3,
    title: "PromptCraft-Finance",
    description: "A finance-oriented AI assistant using Hugging Face Transformers. Generates investment insights from prompts using open-source LLMs.",
    icon: "📈",
    color: "from-emerald-500 to-teal-500",
    category: "AI/ML",
    link: "https://github.com/AryanVarmora/PromptCraft-Finance"
  },
  {
    id: 4,
    title: "WildEye – Wildlife Conservation AI",
    description: "AI-powered wildlife detection using the Snapshot Serengeti dataset. Detects and tracks species in real-time for conservation efforts.",
    icon: "🐾",
    color: "from-indigo-500 to-purple-500",
    category: "AI/ML",
    link: "https://github.com/AryanVarmora/WildEye"
  }
];

const ProjectCard = ({ project, index, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className={`group relative backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl border ${
      isDark
        ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50"
        : "bg-white/80 border-gray-200/50 hover:bg-white hover:border-gray-300/60"
    }`}
    onClick={() => window.open(project.link, '_blank')}
  >
    {/* Hover overlay */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Project icon */}
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
      {project.icon}
    </div>
    
    {/* Project title */}
    <h3 className={`text-2xl font-bold mt-6 mb-4 transition-colors ${
      isDark
        ? "text-white group-hover:text-blue-300"
        : "text-gray-900 group-hover:text-blue-600"
    }`}>
      {project.title}
    </h3>
    
    {/* Project description */}
    <p className={`leading-relaxed text-base transition-colors ${
      isDark
        ? "text-gray-300 group-hover:text-gray-100"
        : "text-gray-600 group-hover:text-gray-800"
    }`}>
      {project.description}
    </p>
    
    {/* Category badge */}
    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className={`px-3 py-1 text-xs rounded-full border font-medium ${
        isDark
          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
          : "bg-blue-500/20 text-blue-600 border-blue-500/30"
      }`}>
        {project.category}
      </span>
    </div>
    
    {/* External link indicator */}
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      <svg className={`w-5 h-5 transition-colors ${
        isDark
          ? "text-gray-500 group-hover:text-blue-300"
          : "text-gray-400 group-hover:text-blue-600"
      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
  </motion.div>
);

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Listen for theme changes from DOM (same as Contact page)
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios.get('https://api.github.com/users/AryanVarmora/repos')
      .then(response => {
        const sorted = response.data
          .filter(repo => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);
        setGithubProjects(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch GitHub repos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        : "bg-gray-50"
    }`}>
      {/* Background pattern */}
      <div className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-30"}`}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.2) 1px, transparent 0)`, 
            backgroundSize: '50px 50px' 
          }} 
        />
      </div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"
          : "bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="mb-20 text-center"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            A collection of noteworthy and open-source projects I've crafted with passion. 
            Each project represents a unique challenge and learning experience in my development journey.
          </p>
        </motion.div>

        {/* Featured projects section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isDark={isDark} />
            ))}
          </div>
        </motion.div>

        {/* GitHub projects section */}
        {githubProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className={`text-3xl font-bold mb-8 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Recent GitHub Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubProjects.map((repo, index) => (
                <ProjectCard 
                  key={repo.id} 
                  project={{
                    id: repo.id,
                    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    description: repo.description || 'A GitHub repository showcasing various development concepts and implementations.',
                    icon: '💻',
                    color: 'from-gray-500 to-gray-700',
                    category: 'GitHub',
                    link: repo.html_url
                  }} 
                  index={index + featuredProjects.length} 
                  isDark={isDark}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Loading GitHub projects...
            </p>
          </div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className={`backdrop-blur-sm border rounded-3xl p-8 max-w-2xl mx-auto ${
            isDark
              ? "bg-gray-800/40 border-gray-700/30"
              : "bg-white/80 border-gray-200/50"
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Interested in collaborating?
            </h3>
            <p className={`mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <a
              href="https://github.com/AryanVarmora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;