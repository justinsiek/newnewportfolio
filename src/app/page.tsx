"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import About from "@/components/About";
import Experience from "@/components/Experience";

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
            <About />
            <Experience />
          </main>
        </div>
      )}
    </div>
  );
}
