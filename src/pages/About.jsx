
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

import Developer from "../components/Developer";
import CanvasLoader from "../components/Loading";
import { workExperiences } from "../constants";
import { CTA } from "../components";

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

const ExperienceCard = ({ item, index, isDark, setAnimationName }) => {
  const anim = getValidAnimation(item.animation);

  return (
    <motion.div
      className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isDark
          ? "bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 hover:shadow-blue-500/10"
          : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
      }`}
      onMouseEnter={() => setAnimationName(anim)}
      onMouseLeave={() => setAnimationName("idle")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl p-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <img src={item.icon} alt={item.company_name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {item.title}
          </h3>
          <p className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            {item.company_name} • {item.date}
          </p>
          <ul className={`mt-2 text-sm space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {item.points.map((pt, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500 text-xs mt-1">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [animationName, setAnimationName] = useState("idle");
  const [isDark, setIsDark] = useState(false);

  // Listen for theme changes from DOM (same as Contact & Projects pages)
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Aryan
            </span>{" "}
            👋
          </h1>
          <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            I'm a Computer Science graduate from Fordham University with a passion for building impactful tech — from AI-driven platforms to immersive UIs.
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Developer Model */}
          <motion.div
            className={`relative h-96 lg:h-[500px] rounded-3xl overflow-hidden ${
              isDark
                ? "bg-gray-800/30 border border-gray-700/50"
                : "bg-white/50 border border-gray-200/50"
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} enablePan={false} />
              <Suspense fallback={<CanvasLoader />}>
                <Developer position={[0, -3, 0]} scale={3} animationName={getValidAnimation(animationName)} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Experience Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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

        {/* CTA */}
        <div className="mt-20 text-center">
          <CTA />
        </div>
      </div>
    </div>
  );
};

export default About;