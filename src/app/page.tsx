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
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const heroLine = {
    hidden: { opacity: 0, x: 24, scaleX: 1.02 },
    show: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: { duration: 0.7 },
    },
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] bg-black origin-center z-20"
            initial={{ x: "-50%", y: "-50%", width: 0, opacity: 1 }}
            animate={playReveal ? { width: "100%" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Top navigation */}
          <header className="w-full">
  <div className="mx-auto md:px-6 py-4 flex items-center justify-center md:justify-between text-sm tracking-wide text-neutral-700 uppercase">
    <div className="hidden md:block">JUSTIN SIEK ©2025</div>
    <nav className="flex items-center gap-6">
      <a className="hover:text-black" href="#">Projects</a>
      <a className="hover:text-black" href="#">Work</a>
      <a className="hover:text-black" href="#">Contact</a>
      <a className="hover:text-black" href="#">Resume ↗</a>
    </nav>
  </div>
</header>

          {/* Top half */}
          <div className="mx-auto px-2 md:px-24 md:pb-4 pb-9 h-[45vh] flex items-end md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={playReveal ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="font-light leading-[0.9] text-neutral-900 space-y-2 md:space-y-0"
                variants={heroContainer}
                initial="hidden"
                animate={playReveal ? "show" : undefined}
              >
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)] tracking-[0.04em]"
                  variants={heroLine}
                >
                  CRAFTING
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)] tracking-[0.04em]"
                  variants={heroLine}
                >
                  DATA
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)] tracking-[0.04em]"
                  variants={heroLine}
                >
                  DRIVEN
                </motion.span>
                <motion.span
                  className="block origin-right will-change-transform text-[clamp(3rem,14vw,7.5rem)] md:text-[clamp(2.2rem,5vw,7.5rem)] tracking-[0.04em]"
                  variants={heroLine}
                >
                  EXPERIENCES.
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
          {/* Bottom half */}
          <div className="h-[50vh]"></div>
        </div>
      )}
    </div>
  );
}
