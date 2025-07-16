    import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
  import { Canvas } from "@react-three/fiber";
  import { OrbitControls } from "@react-three/drei";
  import { motion, useScroll, useTransform } from "framer-motion";
  
  import Developer from "../components/Developer";
  import CanvasLoader from "../components/Loading";
  
  const CTA = () => (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
      <p className="text-lg mb-6 opacity-80">Let's build something amazing together!</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
          <a href="#/contact">Get In Touch</a>
        </button>
        <button className="border border-current text-current px-8 py-3 rounded-lg font-semibold hover:bg-current hover:text-white transition-colors">
          <a href="#/projects">View My Projects</a>
        </button>
      </div>
    </div>
  );
  
  // Enhanced theme hook
  const useTheme = () => {  
    const [isDark, setIsDark] = useState(() => {
      if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark');
      }
      return false;
    });
  
    useEffect(() => {
      const updateTheme = () => {
        const hasClass = document.documentElement.classList.contains('dark');
        setIsDark(hasClass);
      };
  
      updateTheme();
      const observer = new MutationObserver(updateTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
  
      return () => observer.disconnect();
    }, []);
  
    return isDark;
  };
  
  // ARYAN'S ACTUAL WORK EXPERIENCES
  const workExperiences = [
    {
      title: "Graduate Assistant - Computational Neural Science",
      company_name: "Fordham University",
      date: "Aug 2024 – Present",
      icon: "🧠",
      animation: "coding",
      points: [
        "Collaborated in a 3-member research team on computational neuroscience projects focused on neural structure analysis using image processing techniques.",
        "Implemented and evaluated advanced algorithms including Phase Congruency, Hough Transform, Radon Transform, and DSLT to detect contours, symmetries, and fine structural details in microscopy images.",
        "Developed 3 automated pipelines to assist in segmentation and morphological analysis, reducing manual effort by 35% and increasing consistency in extracted features.",
        
      ]
    },
    {
      title: "Software Engineering Intern",
      company_name: "Neev Infosoft",
      date: "Sep 2022 – Feb 2024",
      icon: "💻",
      animation: "working",
      points: [
        "Improved system performance by 30% through optimized database schema and efficient indexing techniques",
        "Developed modular, object-oriented software components, reducing code maintenance time by 40%",
        "Conducted unit and integration testing, achieving over 95% test coverage and system reliability"
      ]
    },
    {
      title: "Backend Developer Intern – eCommerce Integration",
      company_name: "IdeaBright Infotech Pvt. Ltd.",
      date: "May 2022 – Jun 2022",
      icon: "🛒",
      animation: "thinking",
      points: [
        "Researched nopCommerce using ASP.NET Core and MS SQL Server to implement scalable eCommerce solutions",
        "Integrated payment gateway APIs and optimized transaction processes, resulting in a 25% speed improvement",
        "Developed and deployed custom plugins to expand platform functionality and improve user experience"
      ]
    }
  ];
  
  const getValidAnimation = (requested) => {
    const fallback = {
      typing: "victory",
      coding: "victory",
      thinking: "salute",
      working: "clapping",
      walk: "salute",
      jump: "clapping",
    };
    const valid = ["idle", "salute", "clapping", "victory"];
    return valid.includes(requested) ? requested : fallback[requested] || "idle";
  };
  
  // Improved floating particles with subtle colors
  const FloatingParticles = ({ isDark }) => {
    const particles = useMemo(() => 
      [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
      })), []
    );
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-blue-400/10' : 'bg-purple-400/15'
            }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, -120],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    );
  };
  
  // ARYAN'S ACTUAL SKILLS
  const SkillsBadges = ({ isDark }) => {
    const skills = [
      { name: "Python", description: "AI/ML and data science programming" },
      { name: "ASP.NET Core", description: "Microsoft's web framework" },
      { name: "React", description: "Frontend framework for building UIs" },
      { name: "AI/ML", description: "Artificial Intelligence & Machine Learning" },
      { name: "SQL Server", description: "Microsoft's relational database system" },
      { name: "MongoDB", description: "NoSQL database solution" },
      { name: "Node.js", description: "JavaScript runtime for backend development" },
      { name: "TypeScript", description: "Typed superset of JavaScript" },
      { name: "Data Science", description: "Predictive modeling and analytics" },
      { name: "Three.js", description: "3D graphics library for web" }
    ];
  
    return (
      <motion.div
        className="flex flex-wrap gap-3 justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="relative group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                isDark
                  ? "bg-gray-800/60 text-blue-300 border border-gray-700/50 hover:bg-gray-700/60 hover:border-blue-500/40"
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300"
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDark ? "0 4px 20px rgba(59, 130, 246, 0.15)" : "0 4px 20px rgba(147, 51, 234, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {skill.name}
            </motion.span>
            
            {/* Improved tooltip */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
              isDark 
                ? "bg-gray-900/95 text-gray-200 border border-gray-700/50 shadow-xl" 
                : "bg-white/95 text-gray-700 border border-gray-200 shadow-lg"
            }`}>
              {skill.description}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                isDark ? "border-t-gray-900/95" : "border-t-white/95"
              }`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  // ARYAN'S ACTUAL ACHIEVEMENTS STATS
  const StatsSection = ({ isDark }) => {
    const [isInView, setIsInView] = useState(false);
    
    const stats = [
      { number: 35, label: "Processing Time Reduction", icon: "🚀", suffix: "%" },
      { number: 30, label: "Performance Improvement", icon: "⚡", suffix: "%" },
      { number: 95, label: "Test Coverage Achieved", icon: "🎯", suffix: "%" },
      { number: 25, label: "Transaction Speed Boost", icon: "💼", suffix: "%" }
    ];
  
    const AnimatedCounter = ({ value, suffix, inView }) => {
      const [count, setCount] = useState(0);
      
      useEffect(() => {
        if (!inView) return;
        
        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        const stepTime = duration / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          setCount(Math.min(Math.floor(stepValue * currentStep), value));
          
          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepTime);
        
        return () => clearInterval(timer);
      }, [value, inView]);
      
      return <span>{count}{suffix}</span>;
    };
  
    return (
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onViewportEnter={() => setIsInView(true)}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-gray-800/40 border border-gray-700/40 backdrop-blur-sm hover:bg-gray-800/60"
                : "bg-white/70 border border-gray-200/60 backdrop-blur-sm hover:bg-white/90"
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: isDark 
                ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
                : "0 10px 30px rgba(0, 0, 0, 0.1)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              <AnimatedCounter value={stat.number} suffix={stat.suffix} inView={isInView} />
            </div>
            <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  // Enhanced experience card with better dark mode styling
  const ExperienceCard = ({ item, index, isDark, setAnimationName }) => {
    const anim = getValidAnimation(item.animation);
  
    return (
      <motion.div
        className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-500 group ${
          isDark
            ? "bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/60"
            : "bg-white/80 border border-gray-200 hover:border-blue-300 hover:bg-white"
        } backdrop-blur-sm overflow-hidden`}
        onMouseEnter={() => setAnimationName(anim)}
        onMouseLeave={() => setAnimationName("idle")}
        onFocus={() => setAnimationName(anim)}
        onBlur={() => setAnimationName("idle")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: isDark 
            ? "0 20px 40px rgba(0, 0, 0, 0.4)" 
            : "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}
        role="article"
        aria-label={`${item.title} at ${item.company_name}`}
        tabIndex={0}
      >
        {/* Subtle background gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDark
            ? "bg-gradient-to-r from-blue-600/3 to-purple-600/3"
            : "bg-gradient-to-r from-blue-50/50 to-purple-50/50"
        }`} />
        
        <div className="relative flex items-start gap-4">
          <motion.div 
            className="w-16 h-16 rounded-xl p-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg text-2xl"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-hidden="true"
          >
            {item.icon}
          </motion.div>
          
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              {item.title}
            </h3>
            <p className={`text-sm font-medium mb-3 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
              {item.company_name} • {item.date}
            </p>
            <ul className={`text-sm space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {item.points.map((pt, i) => (
                <motion.li 
                  key={i} 
                  className="flex gap-3 group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                >
                  <span className="text-blue-500 text-lg mt-0.5 group-hover:scale-125 transition-transform" aria-hidden="true">•</span>
                  <span className="leading-relaxed">{pt}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const About = () => {
    const [animationName, setAnimationName] = useState("idle");
    const isDark = useTheme();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
    // Improved background blobs with subtle colors
    const BackgroundBlobs = useMemo(() => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? "bg-blue-600/5" : "bg-purple-300/15"
          }`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? "bg-purple-600/5" : "bg-blue-300/15"
          }`}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    ), [isDark]);
  
    return (
      <div
        className={`min-h-screen transition-colors duration-500 relative ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
            : "bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50"
        }`}
      >
        <FloatingParticles isDark={isDark} />
        {BackgroundBlobs}
  
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            style={{ y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="inline-block mb-6"
            >
              <span className="text-6xl" role="img" aria-label="Waving hand">👋</span>
            </motion.div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Hello, I'm{" "}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Aryan
              </motion.span>
            </h1>
            
            <motion.p 
              className={`max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I'm a Computer Science graduate from Fordham University with a passion for building impactful tech — 
              from AI-driven platforms to immersive UIs.
            </motion.p>
  
            <SkillsBadges isDark={isDark} />
          </motion.div>
  
          {/* Stats Section */}
          <StatsSection isDark={isDark} />
  
          {/* Experience Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Developer Model */}
            <motion.div
              className={`relative h-96 lg:h-[500px] rounded-3xl overflow-hidden ${
                isDark
                  ? "bg-gray-800/30 border border-gray-700/40 backdrop-blur-sm"
                  : "bg-white/50 border border-gray-200/50 backdrop-blur-sm"
              } shadow-2xl`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Subtle interactive glow */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 ${
                isDark 
                  ? "bg-gradient-to-r from-blue-600/5 to-purple-600/5" 
                  : "bg-gradient-to-r from-blue-100/30 to-purple-100/30"
              }`} />
              
              <Canvas camera={{ position: [0, 0.5, 3.5], fov: 60 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[3, 6, 4]} angle={0.4} penumbra={1} intensity={0.9} />
                <directionalLight position={[-2, 4, 2]} intensity={0.5} />
                <pointLight position={[0, 2, 1]} intensity={0.4} />
                <OrbitControls 
                  enableZoom={false} 
                  maxPolarAngle={Math.PI / 1.6} 
                  minPolarAngle={Math.PI / 3.5} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.8}
                  target={[0, -0.2, 0]}
                />
                <Suspense fallback={<CanvasLoader />}>
                  <Developer 
                    position={[0, -1.8, 0]} 
                    scale={1.8} 
                    animationName={getValidAnimation(animationName)} 
                  />
                </Suspense>
              </Canvas>
              
              {/* Info panel */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className={`text-center p-3 rounded-xl ${
                  isDark 
                    ? "bg-gray-900/85 text-white border border-gray-700/40" 
                    : "bg-white/85 text-gray-900 border border-gray-200/40"
                } backdrop-blur-sm shadow-lg`}>
                  <p className="text-sm font-medium">Interactive 3D Model</p>
                  <p className="text-xs opacity-70">Hover over experience cards to see animations!</p>
                </div>
              </div>
            </motion.div>
  
            {/* Experience Cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 
                className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Work Experience
              </motion.h2>
              
              {workExperiences.map((item, index) => (
                <ExperienceCard
                  key={index}
                  item={item}
                  index={index}
                  isDark={isDark}
                  setAnimationName={setAnimationName}
                />
              ))}
            </motion.div>
          </div>
  
          {/* CTA Section */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className={`relative p-8 rounded-3xl ${
              isDark
                ? "bg-gray-800/40 border border-gray-700/40"
                : "bg-white/70 border border-gray-200"
            } backdrop-blur-sm`}>
              <CTA />
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default About;