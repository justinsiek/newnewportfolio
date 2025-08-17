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
            <div className="mx-auto  px-6 py-4 flex items-center justify-between text-sm tracking-wide text-neutral-700 uppercase">
              <div>SIEK ©2025</div>
              <nav className="flex items-center gap-6">
                <a className="hover:text-black" href="#">About me</a>
                <a className="hover:text-black" href="#">Contact</a>
                <a className="hover:text-black" href="#">Blog ↗</a>
              </nav>
            </div>
          </header>

          {/* Top half */}
          <div className="mx-auto px-6 md:px-24 md:pb-4 pb-9 h-[45vh] flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={playReveal ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <h1 className="font-light leading-[0.9] text-neutral-900">
                    <span className="block text-[clamp(3rem,14vw,7.5rem)] sm:text-[clamp(2.2rem,12vw,7.5rem)] tracking-[0.04em]">I TURN DATA</span>
                    <span className="block text-[clamp(3rem,14vw,7.5rem)] sm:text-[clamp(2.2rem,12vw,7.5rem)] tracking-[0.04em]">INTO</span>
                    <span className="block text-[clamp(3rem,14vw,7.5rem)] sm:text-[clamp(2.2rem,12vw,7.5rem)] tracking-[0.04em]">EXPERIENCES.</span>
                  </h1>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Bottom half */}
          <div className="h-[50vh]"></div>
        </div>
      )}
    </div>
  );
}
