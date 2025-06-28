import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  // Hide instructions after user interaction
  useEffect(() => {
    if (isRotating && !hasInteracted) {
      setHasInteracted(true);
      setTimeout(() => setShowInstructions(false), 2000);
    }
  }, [isRotating, hasInteracted]);

  // Auto-hide instructions after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* Current Stage Info */}
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* Interaction Instructions */}
      {showInstructions && (
        <div className='absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-pulse'>
          <div className='bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/20'>
            <div className='flex items-center gap-3'>
              <div className='hidden md:flex items-center gap-2'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span className='text-sm font-medium'>Drag to explore</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
              <div className='md:hidden flex items-center gap-2'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span className='text-sm font-medium'>Swipe to explore</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <button 
              onClick={() => setShowInstructions(false)} 
              className='text-xs text-gray-300 hover:text-white underline mt-1 block text-center w-full'
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Controls Hint */}
      <div className='absolute top-4 right-4 z-20 hidden md:block'>
        <div className='bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-white/20 text-xs'>
          <div className='flex items-center gap-2 mb-1'>
            <kbd className='px-2 py-1 bg-white/20 rounded text-xs'>←</kbd>
            <kbd className='px-2 py-1 bg-white/20 rounded text-xs'>→</kbd>
            <span>Keyboard controls</span>
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className='absolute top-4 left-4 z-20'>
        <div className='bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-white/20 text-xs'>
          <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 rounded-full ${isRotating ? 'bg-green-400' : 'bg-blue-400'}`}></div>
            <span>{isRotating ? 'Exploring' : 'Ready'}</span>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Enhanced Lighting Setup */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          {/* 3D Models */}
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      {/* Enhanced Audio Control */}
      <div className='absolute bottom-2 left-2 z-20'>
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className={`w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center ${
            isPlayingMusic 
              ? 'bg-green-500/20 hover:bg-green-500/30' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
          title={isPlayingMusic ? 'Mute music' : 'Play music'}
        >
          <img
            src={!isPlayingMusic ? soundoff : soundon}
            alt='music toggle'
            className='w-6 h-6 object-contain'
          />
        </button>
        
        {/* Music indicator */}
        {isPlayingMusic && (
          <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
            <div className='flex items-center gap-1'>
              <div className='w-1 h-3 bg-white/60 rounded animate-pulse' style={{animationDelay: '0ms'}}></div>
              <div className='w-1 h-4 bg-white/60 rounded animate-pulse' style={{animationDelay: '150ms'}}></div>
              <div className='w-1 h-2 bg-white/60 rounded animate-pulse' style={{animationDelay: '300ms'}}></div>
              <div className='w-1 h-5 bg-white/60 rounded animate-pulse' style={{animationDelay: '450ms'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Stage Progress Indicator */}
      <div className='absolute bottom-2 right-2 z-20'>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20'>
          <div className='flex gap-2'>
            {[1, 2, 3, 4].map((stage) => (
              <div
                key={stage}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentStage === stage 
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <div className='text-white/70 text-xs mt-1 text-center'>
            {currentStage}/4
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;