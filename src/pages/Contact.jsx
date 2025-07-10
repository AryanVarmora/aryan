
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaFilePdf } from "react-icons/fa";

import { Fox } from "../models";
import { Loader } from "../components";

const contactLinks = [
  {
    name: "GitHub",
    icon: <FaGithub className="text-xl" />,
    url: "https://github.com/AryanVarmora",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-xl" />,
    url: "https://linkedin.com/in/aryanvarmora",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-xl" />,
    url: "https://instagram.com/aarryaaann",
  },
  {
    name: "Email",
    icon: <FaEnvelope className="text-xl" />,
    url: "mailto:aryanvarmora8@gmail.com",
  },
  {
    name: "Resume",
    icon: <FaFilePdf className="text-xl" />,
    url: `${import.meta.env.BASE_URL}Aryan-Varmora-Resume.pdf`,
  },  
];

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

// Floating particles component
const FloatingParticles = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            isDark ? 'bg-blue-400/8' : 'bg-purple-400/12'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -120],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const isDark = useTheme();

  const handlePointerMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (x > 0.6) setCurrentAnimation("walk");
    else if (y > 0.6) setCurrentAnimation("hit");
    else setCurrentAnimation("idle");
  };

  return (
    <section
      className={`min-h-screen px-6 py-20 flex flex-col lg:flex-row gap-16 items-center justify-center overflow-hidden relative transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50"
      }`}
      onMouseMove={handlePointerMove}
    >
      {/* Floating particles */}
      <FloatingParticles isDark={isDark} />

      {/* Subtle background pattern */}
      <div className={`absolute inset-0 ${isDark ? "opacity-5" : "opacity-15"}`}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`, 
            backgroundSize: '60px 60px' 
          }} 
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-gradient-to-br from-blue-950/5 via-transparent to-purple-950/5"
          : "bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20"
      }`} />

      {/* Improved background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? "bg-blue-600/4" : "bg-purple-300/12"
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
            isDark ? "bg-purple-600/4" : "bg-blue-300/12"
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

      {/* Left: Contact Cards */}
      <div className="flex-1 max-w-2xl space-y-10 z-10">
        <motion.h2
          className={`text-4xl sm:text-5xl font-bold text-center lg:text-left ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Let's{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connect
          </span>
        </motion.h2>

        <motion.p
          className={`text-lg text-center lg:text-left max-w-xl ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm always interested in hearing about new opportunities and exciting projects. 
          Whether you're looking to collaborate or just want to say hello, I'd love to hear from you!
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactLinks.map(({ name, icon, url }, index) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`backdrop-blur-sm rounded-xl p-6 flex items-center justify-between border transition-all duration-300 shadow-lg hover:shadow-xl group ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/40 hover:bg-gray-800/70 hover:border-gray-600/50"
                  : "bg-white/70 border-gray-200/50 hover:bg-white/90 hover:border-gray-300/60"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: isDark 
                  ? "0 15px 35px rgba(0, 0, 0, 0.3)" 
                  : "0 15px 35px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setCurrentAnimation("walk")}
              onMouseLeave={() => setCurrentAnimation("idle")}
              onClick={() => setCurrentAnimation("hit")}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isDark 
                      ? "bg-gray-700/60 group-hover:bg-blue-900/40" 
                      : "bg-blue-50 group-hover:bg-blue-100"
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={`transition-colors duration-200 ${
                    isDark 
                      ? "text-blue-400 group-hover:text-blue-300" 
                      : "text-blue-600 group-hover:text-blue-700"
                  }`}>
                    {icon}
                  </span>
                </motion.div>
                <span className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {name}
                </span>
              </div>
              <motion.span 
                className={`transition-colors duration-200 ${
                  isDark
                    ? "text-gray-500 group-hover:text-blue-400"
                    : "text-gray-400 group-hover:text-blue-600"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.span>
            </motion.a>
          ))}
        </div>

        {/* Enhanced Additional Info Card */}
        <motion.div
          className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
            isDark
              ? "bg-gray-800/50 border-gray-700/40 hover:bg-gray-800/60"
              : "bg-white/70 border-gray-200/50 hover:bg-white/80"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: isDark 
              ? "0 10px 25px rgba(0, 0, 0, 0.2)" 
              : "0 10px 25px rgba(0, 0, 0, 0.05)"
          }}
        >
          <h3 className={`text-xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Quick Info
          </h3>
          <div className={`space-y-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-xl">🌍</span>
              <span>Based in New York City, New York</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-xl">💼</span>
              <span>Open to full-time opportunities</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-xl">🚀</span>
              <span>Available for freelance projects</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-xl">⚡</span>
              <span>Usually responds within 24 hours</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className={`text-center lg:text-left mt-12 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          &copy; 2025 Aryan Varmora. All rights reserved.
        </motion.p>
      </div>

      {/* Right: Enhanced 3D Fox */}
      <motion.div 
        className={`flex-1 w-full h-[400px] lg:h-[500px] cursor-pointer rounded-3xl overflow-hidden relative ${
          isDark
            ? "bg-gray-800/20 border border-gray-700/30"
            : "bg-white/30 border border-gray-200/30"
        } backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Interactive glow effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 ${
          isDark 
            ? "bg-gradient-to-r from-blue-600/5 to-purple-600/5" 
            : "bg-gradient-to-r from-blue-100/30 to-purple-100/30"
        }`} />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          onPointerMissed={() => setCurrentAnimation("idle")}
        >
          <directionalLight position={[0, 0, 1]} intensity={isDark ? 2 : 2.5} />
          <ambientLight intensity={isDark ? 0.8 : 1} />
          <pointLight position={[5, 10, 0]} intensity={isDark ? 1.5 : 2} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={isDark ? 1.5 : 2} 
          />

          <Suspense fallback={<Loader />}>
            <Fox  
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>

        {/* Interactive hint
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div 
            className={`text-center p-3 rounded-xl ${
              isDark 
                ? "bg-gray-900/80 text-white border border-gray-700/40" 
                : "bg-white/80 text-gray-900 border border-gray-200/40"
            } backdrop-blur-sm shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-sm font-medium">Interactive Fox Model</p>
            <p className="text-xs opacity-70">Move your cursor around or click the contact links!</p>
          </motion.div>
        </div> */}

        {/* Decorative corner element */}
        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
          isDark ? 'bg-blue-400' : 'bg-purple-500'
        }`}>
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isDark ? 'bg-blue-400' : 'bg-purple-500'
            }`}
            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;