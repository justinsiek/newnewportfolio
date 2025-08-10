"use client";

import React, { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 5

const WORDS: string[] = [
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hello",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hello",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hello",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hello",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hello",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
];

type LoaderProps = {
  onComplete?: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const progressControls = useAnimation();
  const wordsControls = useAnimation();
  const collapseControls = useAnimation();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const progress = progressControls.start({
        scaleX: 1,
        transition: { duration: DURATION, ease: [0.215, 0.61, 0.355, 1] },
      });

      const wordsMove = wordsControls.start({
        y: "-80%",
        transition: { duration: DURATION, ease: [0.215, 0.61, 0.355, 1] },
      });

      await Promise.all([progress, wordsMove]);

      await progressControls.start({
        opacity: 0,
        transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] },
      });

      await collapseControls.start({
        clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
        transition: { duration: 3, ease: [0.19, 1, 0.22, 1] },
      });

      if (!cancelled) onComplete?.();
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [collapseControls, onComplete, progressControls, wordsControls]);

  const progressInitial = useMemo(
    () => ({ scaleX: 0, transformOrigin: "left center" as const }),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute bottom-0 left-0 h-[5vh] w-full z-30">
        <motion.div
          className="h-full w-full bg-black origin-left"
          initial={progressInitial}
          animate={progressControls}
        />
      </div>

      <motion.div
        className="relative h-full w-full flex items-center justify-center flex-col bg-white overflow-hidden z-20"
        animate={collapseControls}
      >
        <div className="relative overflow-hidden h-[32rem]">
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9) 47%, transparent, transparent 47%, transparent, transparent 55%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9))",
            }}
          />
          <motion.div className="relative" animate={wordsControls}>
            {WORDS.map((word, index) => (
              <span key={index} className="block text-[2rem] sm:text-[2rem] leading-tight">
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 