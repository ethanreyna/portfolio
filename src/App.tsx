import Backdrop from "./components/Backdrop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact, { Footer } from "./components/Contact";
import { useEffect } from "react";

export default function App() {
  // The page renders client-side, so the browser can't jump to a #section on load by itself.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Backdrop />
      <div className="mx-auto flex max-w-7xl justify-center gap-6 px-3 pt-16 pb-10 sm:px-6 sm:pt-20 lg:gap-8 lg:py-16">
        <div className="min-w-0 w-full max-w-5xl">
          <main
            id="main"
            className="space-y-20 rounded-2xl border border-line/70 bg-panel px-5 py-12 shadow-sm backdrop-blur-md sm:space-y-28 sm:px-10 sm:py-16"
          >
            <Hero />
            <Work />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
        <Nav />
      </div>
    </>
  );
}
