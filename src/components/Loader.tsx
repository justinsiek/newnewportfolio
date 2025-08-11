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
  "Hello (Lands on this one)",
  "你好",
  "Bonjour",
  "こんにちは",
  "Hej",
];

// Props accepted by the Loader
// onComplete is invoked after the collapse animation finishes to let the parent unmount the loader
type LoaderProps = {
  onComplete?: () => void;
};

// The Loader component orchestrates: progress bar grow, words scroll, progress fade, and final collapse
export default function Loader({ onComplete }: LoaderProps) {
  // Imperative controller for the progress bar animation (scaleX and fadeout)
  const progressControls = useAnimation();
  // Imperative controller for the vertical words scrolling
  const wordsControls = useAnimation();
  // Imperative controller for the final collapse (clip-path inset)
  const collapseControls = useAnimation();

  // Side effect to run the animation sequence once on mount
  useEffect(() => {
    // Guard to avoid state updates if the component unmounts mid-animation
    let cancelled = false;

    // Define the animation sequence as an async function for easy awaiting
    async function run() {
      // Start the progress bar animation (scaleX from 0 to 1 over DURATION)
      const progress = progressControls.start({
        scaleX: 1,
        transition: { duration: DURATION, ease: [0.215, 0.61, 0.355, 1] },
      });

      // Start the words group vertical movement (scroll upwards to -80%)
      const wordsMove = wordsControls.start({
        y: "-80%",
        transition: { duration: DURATION, ease: [0.215, 0.61, 0.355, 1] },
      });

      // Wait until both the progress bar and the words movement complete
      await Promise.all([progress, wordsMove]);

      // Fade out the progress bar once the initial animations finish
      await progressControls.start({
        opacity: 0,
        transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] },
      });

      // Collapse the full-screen loader to a centered horizontal band using CSS clip-path inset
      await collapseControls.start({
        clipPath: `inset(calc(50% - 18px) 0 calc(50% - 30px) 0)`,
        transition: { duration: 1.7, ease: [0.19, 1, 0.22, 1] },
      });

      // Notify parent that the loader sequence is done (if still mounted)
      if (!cancelled) onComplete?.();
    }

    // Kick off the animation sequence immediately on mount
    run();

    // Cleanup ensures we don't attempt to update after unmount
    return () => {
      cancelled = true;
    };
    // Controllers and callback are dependencies so effect rebinds correctly if they change
  }, [collapseControls, onComplete, progressControls, wordsControls]);

  // Memoize the initial style for the progress bar so the object identity is stable between renders
  const progressInitial = useMemo(
    () => ({ scaleX: 0, transformOrigin: "left center" as const }),
    []
  );

  // Render the full-screen loader overlay
  return (
    // Fixed overlay that covers the viewport while the loader is visible
    <div className="fixed inset-0 overflow-hidden z-50">
      {/* Progress bar area pinned to the bottom of the screen */}
      <div className="absolute bottom-0 left-0 h-[5vh] w-full z-30">
        {/* The progress bar itself; grows horizontally from the left */}
        <motion.div
          className="h-full w-full bg-black origin-left"
          initial={progressInitial}
          animate={progressControls}
        />
      </div>

      {/* The main loader content that will be collapsed via clip-path */}
      <motion.div
        // Start fully visible (no clipping) so we can interpolate to the collapsed inset band later
        initial={{ clipPath: "inset(0 0 0 0)" }}
        // Bind the collapse controller to this container to drive the final collapse animation
        animate={collapseControls}
        // White background, centered content, and overflow hidden so clipping is clean
        className="relative h-full w-full flex items-center justify-center flex-col bg-white overflow-hidden z-20 will-change-[clip-path]"
      >
        {/* The viewport for the scrolling words; overflow hidden to create a window */}
        <div className="relative overflow-hidden h-[32rem]">
          {/* Overlay gradient that creates a fixed-height transparent band centered vertically
              This uses calc with 18px half-height to leave a 36px see-through window in the middle */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.9) 0%,
                  rgba(255,255,255,0.9) calc(50% - 18px),
                  transparent calc(50% - 18px),
                  transparent calc(50% + 30px),
                  rgba(255,255,255,0.9) calc(50% + 18px),
                  rgba(255,255,255,0.9) 100%
                )`,
            }}
          />

          {/* The group of words that scrolls upward */}
          <motion.div className="relative" animate={wordsControls}>
            {/* Render each word on its own line at a large size for readability during the scroll */}
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