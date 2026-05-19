import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Credibility from "@/components/sections/Credibility";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Process />
      <TechStack />
      <Credibility />
      <Contact />
    </>
  );
}
