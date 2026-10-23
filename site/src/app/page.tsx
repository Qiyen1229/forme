import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Tech } from "@/sections/Tech";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Tech />
      <Contact />
    </>
  );
}
