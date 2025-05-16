// src/app/page.tsx
import Hero from '@portfolio/components/sections/Hero';
import About from '@portfolio/components/sections/About';
import Projects from '@portfolio/components/sections/Projects';
import Skills from '@portfolio/components/sections/Skills';
import Contact from '@portfolio/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}