"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [playReveal, setPlayReveal] = useState(false);

  useEffect(() => {
    if (!showLoader) setPlayReveal(true);
  }, [showLoader]);

  const heroContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.12 },
    },
  };

  const lineContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035 } },
  };

  const letter = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };
  

  return (
    <div className="min-h-screen w-screen flex flex-col overflow-hidden bg-white">
      <AnimatePresence>
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      {!showLoader && (
        <div className="relative flex-1">
          {/* Center line overlay that expands to edges */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[50vh] h-[2px] bg-black origin-center z-20"
            initial={{ x: "-50%", y: "-50%", width: 0, opacity: 1 }}
            animate={playReveal ? { width: "95%" } : {}}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.12 }}
          />
          {/* Top navigation */}
          <motion.header
            className="w-full"
            initial={{ y: -24, opacity: 0 }}
            animate={playReveal ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          >
            <div className="mx-auto w-full md:px-12 py-4 flex items-center justify-center md:justify-between text-sm tracking-wide text-neutral-700 uppercase">
              <div className="hidden md:block">JUSTIN SIEK ©2025</div>
              <nav className="flex items-center w-full px-4 justify-between md:w-auto md:justify-normal md:gap-6">
                <a className="hover:text-black" href="#projects">Projects</a>
                <a className="hover:text-black" href="#work">Experience</a>
                <a className="hover:text-black" href="#contact">Contact</a>
                <a className="hover:text-black" href="#">Resume ↗</a>
              </nav>
            </div>
          </motion.header>

          {/* Top half */}
          <div className="mx-auto px-4 md:px-24 pb-8 h-[45vh] flex flex-row items-end justify-between">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={playReveal ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="font-light leading-[0.9] text-neutral-900 space-y-2 md:space-y-0"
                variants={heroContainer}
                initial="hidden"
                animate={playReveal ? "show" : undefined}
              >
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)]"
                  variants={lineContainer}
                >
                  {"CRAFTING".split("").map((ch, i) => (
                    <motion.span key={`c-${i}`} className="inline-block" variants={letter}>
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)]"
                  variants={lineContainer}
                >
                  {"DATA".split("").map((ch, i) => (
                    <motion.span key={`d-${i}`} className="inline-block" variants={letter}>
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)]"
                  variants={lineContainer}
                >
                  {"DRIVEN".split("").map((ch, i) => (
                    <motion.span key={`r-${i}`} className="inline-block" variants={letter}>
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)]"
                  variants={lineContainer}
                >
                  {"EXPERIENCES.".split("").map((ch, i) => (
                    <motion.span key={`e-${i}`} className="inline-block" variants={letter}>
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-sm tracking-[0.12em] text-neutral-500 hidden md:block"
              initial={{ opacity: 0, x: -24 }}
              animate={playReveal ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              BASED IN THE LOS ANGELES AREA
            </motion.div>
          </div>
          {/* Main content */}
          <main className="px-4 md:px-26 pb-24 md:pb-32">
            {/* ABOUT */}
            <section id="about" className="py-6 md:py-10">
              <div>
                <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">ABOUT ME</p>

                <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-neutral-900 font-light">
                  I build data products end‑to‑end: from pipelines to models to precise interfaces.
                </h2>

                <div className="mt-6 md:mt-7 space-y-5 text-neutral-600 max-w-5xl">
                  <p>
                    I work at the intersection of data science and software engineering—shipping software that turns data into decisions, with low latency, high signal, and interfaces that stay out of the way.
                  </p>
                </div>

                <div className="mt-10 border-t border-neutral-200" />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4 space-y-3">
                    <p className="text-[12px] tracking-widest text-neutral-500 uppercase">Principles</p>
                    <div className="space-y-4 text-neutral-700">
                      <div>
                        <p className="text-neutral-900">Clarity</p>
                        <p className="text-neutral-600">Reduce until the intent is unmistakable.</p>
                      </div>
                      <div>
                        <p className="text-neutral-900">Restraint</p>
                        <p className="text-neutral-600">Let whitespace and typography carry the design.</p>
                      </div>
                      <div>
                        <p className="text-neutral-900">Craft</p>
                        <p className="text-neutral-600">Precise motion and interaction, only when useful.</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-6">
                    

                    <div>
                      <p className="text-[12px] tracking-widest text-neutral-500 uppercase mb-3">Approach</p>
                      <p className="text-neutral-700">
                        Start with the system, design for the edge cases, and refine until
                        what remains feels inevitable.
                      </p>
                    </div>
                    
                    <div className="py-4">
                      <p className="text-[12px] tracking-widest text-neutral-500 uppercase mb-3">Toolkit</p>
                      <p className="text-neutral-700">TypeScript, Python, SQL, React/Next.js, AWS (Lambda/S3), LangChain/LangGraph, scikit‑learn, OpenCV.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            
          </main>
        </div>
      )}
    </div>
  );
}
