import { fordham, dev, soft } from "../assets/images";

import {

    contact,

    linkedin,

    hour,
    laptop,
    bar,
    brain,
    paw,
    chart,
    sparkles,
    users,
    cart,
    soundon,
    soundoff,
    airplane,
    planet,
    github


    
    
} from "../assets/icons";

export const skills = [
//     { imageUrl: javascript, name: "JavaScript", type: "Frontend" },
//     { imageUrl: typescript, name: "TypeScript", type: "Frontend" },
//     { imageUrl: react, name: "React", type: "Frontend" },
//     { imageUrl: nextjs, name: "Next.js", type: "Frontend" },
//     { imageUrl: nodejs, name: "Node.js", type: "Backend" },
//     { imageUrl: express, name: "Express", type: "Backend" },
//     { imageUrl: mongodb, name: "MongoDB", type: "Database" },
//     { imageUrl: tailwindcss, name: "Tailwind CSS", type: "Frontend" },
//     { imageUrl: mui, name: "Material UI", type: "Frontend" },
//     { imageUrl: css, name: "CSS", type: "Frontend" },
//     { imageUrl: html, name: "HTML", type: "Frontend" },
//     { imageUrl: redux, name: "Redux", type: "State Management" },
//     { imageUrl: git, name: "Git", type: "Version Control" },
    { imageUrl: github, name: "GitHub", type: "Version Control" }
//     { imageUrl: motion, name: "Framer Motion", type: "Animation" },
  ];
  

 // constants/index.js
// Updated workExperiences with correct animation names for your 3D model

export const workExperiences = [
  {
    title: "Graduate Assistant - Computational Neural Science",
    company_name: "Fordham University",
    icon: fordham, // Your imported icon
    iconBg: "#d1c4e9",
    date: "Aug 2024 – Present",
    animation: "victory",
    points: [
      "Collaborated with research teams and faculty to scope and document AI-based systems with a focus on transparency and maintainability.",
      "Deployed AI models that automated manual tasks, reducing processing time by 35% and improving decision accuracy by 20%.",
      "Built predictive models that enhanced data workflows, improving processing efficiency by 30%.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company_name: "Neev Infosoft",
    icon: soft, // Your imported icon
    iconBg: "#bbf7d0",
    date: "Sep 2022 – Feb 2024",
    animation: "salute", // ✅ Changed from "walk" to "salute"
    points: [
      "Improved system performance by 30% through optimized database schema and efficient indexing techniques.",
      "Developed modular, object-oriented software components, reducing code maintenance time by 40%.",
      "Conducted unit and integration testing, achieving over 95% test coverage and system reliability.",
    ],
  },
  {
    title: "Backend Developer Intern – eCommerce Integration",
    company_name: "IdeaBright Infotech Pvt. Ltd.",
    icon: dev, // Your imported icon
    iconBg: "#fef08a",
    date: "May 2022 – Jun 2022",
    animation: "clapping", // ✅ Changed from "jump" to "clapping"
    points: [
      "Researched nopCommerce using ASP.NET Core and MS SQL Server to implement scalable eCommerce solutions.",
      "Integrated payment gateway APIs and optimized transaction processes, resulting in a 25% speed improvement.",
      "Developed and deployed custom plugins to expand platform functionality and improve user experience.",
    ],
  }
];

// Animation mapping for reference (if you need to map other animations later)
export const animationMap = {
  "typing": "victory",    
  "walk": "salute",      
  "jump": "clapping",     
  "coding": "victory",
  "thinking": "salute",
  "working": "clapping"
};

// Valid animations that your 3D model supports
export const validAnimations = ['idle', 'salute', 'clapping', 'victory'];
  
  


  
export const projects = [
    {
      iconUrl: hour,
      theme: 'btn-back-pink',
      name: 'FlashFade – Memory Decay Flashcards',
      description: 'A unique MERN stack app that visualizes memory decay through animated fading flashcards. Reinforces learning using Ebbinghaus’ Forgetting Curve.',
      link: 'https://github.com/AryanVarmora/FlashFade',
    },
    {
      iconUrl: brain,
      theme: 'btn-back-yellow',
      name: 'PromptCraft-Finance',
      description: 'A finance-oriented AI assistant using Hugging Face Transformers. Generates investment insights from prompts using open-source LLMs.',
      link: 'https://github.com/AryanVarmora/PromptCraft-Finance',
    },
    {
      iconUrl: paw,
      theme: 'btn-back-green',
      name: 'WildEye – Wildlife Conservation AI',
      description: 'AI-powered wildlife detection using the Snapshot Serengeti dataset. Detects and tracks species in real-time.',
      link: 'https://github.com/AryanVarmora/WildEye',
    },
    {
      iconUrl: chart,
      theme: 'btn-back-blue',
      name: 'PrognosticEngine',
      description: 'Predictive maintenance engine using supervised learning to estimate equipment remaining useful life (RUL).',
      link: 'https://github.com/AryanVarmora/PrognosticEngine',
    },
    {
      iconUrl: chart,
      theme: 'btn-back-yellow',
      name: 'InsightScribe – AI Data Storytelling',
      description: 'Automatically generates visual insights from raw datasets using AI narrative logic.',
      link: 'https://github.com/AryanVarmora/InsightScribe',
    },
  
    // Full-Stack Projects
    {
      iconUrl: cart,
      theme: 'btn-back-black',
      name: 'EcomMonger – Spring Boot API',
      description: 'A full-fledged RESTful e-commerce API using Spring Boot, JWT auth, and MongoDB.',
      link: 'https://github.com/AryanVarmora/EcomMonger',
    },
    {
      iconUrl: users,
      theme: 'btn-back-pink',
      name: 'Blondly – Social Network Platform',
      description: 'React + Node full-stack social media platform with real-time posts, chat, and responsive UI.',
      link: 'https://github.com/AryanVarmora/Blondly',
    },
  
    // Innovation & Academic Projects
    {
      iconUrl: sparkles,
      theme: 'btn-back-red',
      name: 'Lumeno & Noema',
      description: 'Innovative 2025 projects exploring creative interactions, animations, and learning design.',
      link: 'https://github.com/AryanVarmora/Lumeno',
    },
    {
      iconUrl: airplane,
      theme: 'btn-back-blue',
      name: 'LogicFlights – Prolog Flight Manager',
      description: 'A Prolog-based reasoning system for flight paths, transfers, and time constraints.',
      link: 'https://github.com/AryanVarmora/CS-Project3-LogicFlights',
    },
    {
      iconUrl: planet,
      theme: 'btn-back-green',
      name: 'Solar System Explorer',
      description: 'Java-based planetary system simulation with interactive data and volume comparisons.',
      link: 'https://github.com/AryanVarmora/SolarSystem',
    },
  ];
  
export const socialLinks = [
    {
      name: 'Contact',
      iconUrl: contact,
      link: '/contact',
    },
    {
      name: 'GitHub',
      iconUrl: github,
      link: 'https://github.com/AryanVarmora',
    },
    {
      name: 'LinkedIn',
      iconUrl: linkedin,
      link: 'https://www.linkedin.com/in/aryanvarmora/',
    }
];