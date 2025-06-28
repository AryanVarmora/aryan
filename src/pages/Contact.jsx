
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

const Contact = () => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes from DOM
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (x > 0.6) setCurrentAnimation("walk");
    else if (y > 0.6) setCurrentAnimation("hit");
    else setCurrentAnimation("idle");
  };

  return (
    <section
      className={`min-h-screen px-6 py-20 flex flex-col lg:flex-row gap-16 items-center justify-center overflow-hidden relative transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50"
      }`}
      onMouseMove={handlePointerMove}
    >
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
          ? "bg-gradient-to-br from-blue-950/30 via-transparent to-purple-950/30"
          : "bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"
      }`} />

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
              className={`backdrop-blur-lg rounded-xl p-6 flex items-center justify-between border transition-all duration-300 shadow-lg hover:shadow-xl group ${
                isDark
                  ? "bg-gray-800/80 border-gray-700/50 hover:bg-gray-800 hover:border-gray-600/60"
                  : "bg-white/80 border-gray-200/50 hover:bg-white hover:border-gray-300/60"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCurrentAnimation("walk")}
              onMouseLeave={() => setCurrentAnimation("idle")}
              onClick={() => setCurrentAnimation("hit")}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${
                  isDark ? "bg-blue-900" : "bg-blue-100"
                }`}>
                  <span className={isDark ? "text-blue-400" : "text-blue-600"}>{icon}</span>
                </div>
                <span className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {name}
                </span>
              </div>
              <span className={`transition-colors ${
                isDark
                  ? "text-gray-500 group-hover:text-blue-400"
                  : "text-gray-400 group-hover:text-blue-600"
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Additional Info Card */}
        <motion.div
          className={`backdrop-blur-lg rounded-xl p-6 border ${
            isDark
              ? "bg-gray-800/80 border-gray-700/50"
              : "bg-white/80 border-gray-200/50"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className={`text-xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Quick Info
          </h3>
          <div className={`space-y-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">🌍</span>
              <span>Based in New York City, New York</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">💼</span>
              <span>Open to full-time opportunities</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🚀</span>
              <span>Available for freelance projects</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <span>Usually responds within 24 hours</span>
            </div>
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

      {/* Right: 3D Fox */}
      <motion.div 
        className="flex-1 w-full h-[400px] lg:h-[500px] cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          onPointerMissed={() => setCurrentAnimation("idle")}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

          <Suspense fallback={<Loader />}>
            <Fox  
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </motion.div>
    </section>
  );
};

export default Contact;