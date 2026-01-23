import About from "../sections/About";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Blog from "../sections/Blog";
import Contact from "../sections/Contact";

export default function MainContent() {
  return (
    <main className="w-1/2 min-h-screen bg-bg-primary max-lg:w-full">
      <div className="px-8 py-12 space-y-16">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Blog />
        <Contact />
      </div>
    </main>
  );
}
