import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  // Stage 1: Introduction
  if (currentStage === 1) {
    return (
      <div className="absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] sm:w-auto max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-lg text-white text-center space-y-2 animate-fade-in">
        <div className="flex justify-center items-center gap-1 text-xs sm:text-sm font-medium pointer-events-none">
          <span className="text-lg">🇮🇳</span>
          <span>
            Made with <span className="text-red-400">❤️</span> in India
          </span>
        </div>
        <h1 className="text-sm sm:text-base font-semibold tracking-wide pointer-events-none">
          Hi, I'm Aryan 👋
        </h1>
        <p className="text-sm sm:text-base font-medium pointer-events-none">Software Engineer</p>
      </div>
    );
  }

  // Generic card renderer for stages 2–4
  const renderStageCard = ({ text, link, cta }) => (
    <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] sm:w-auto max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg text-white text-center space-y-4 animate-fade-in">
      <p className="font-medium text-sm sm:text-lg leading-relaxed pointer-events-none">{text}</p>
      <Link
        to={link}
        className="neo-brutalism-white neo-btn inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold transition-all hover:scale-105"
      >
        {cta}
        <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
      </Link>
    </div>
  );

  // Stage-specific content
  const stageContent = {
    2: {
      text: "Worked with many companies and picked up many skills along the way.",
      link: "/about",
      cta: "Learn more",
    },
    3: {
      text: "Led multiple projects to success over the years. Curious about the impact?",
      link: "/projects",
      cta: "Visit my portfolio",
    },
    4: {
      text: "Need a project done or looking for a dev? I'm just a few keystrokes away.",
      link: "/contact",
      cta: "Let's talk",
    },
  };

  // Render content if available for the current stage
  return stageContent[currentStage] ? renderStageCard(stageContent[currentStage]) : null;
};

export default HomeInfo;
