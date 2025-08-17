"use client";

import React, { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 5
const END_DELAY_MS = 1000

const WORDS: string[] = [
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "こんにちは",
  "Bonjour",
  "你好",
  "שלום",
  "Hej",
  "Привет",
  "Ciao",
  "नमस्ते",
  "សួស្តី",
  "Hola",
  "안녕하세요",
  "Hi",
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
  "Hi",
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
  "Hi",
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
  "Hi",
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
  // Imperative controller for the progress bar animation (scaleX and fade/slide)
  const progressControls = useAnimation();
  // Imperative controller for the vertical words scrolling
  const wordsControls = useAnimation();
  // Imperative controller for the final collapse (clip-path inset)
  const collapseControls = useAnimation();
  // Post-collapse: reveal the suffix on the right
  const suffixRevealControls = useAnimation();

  // Determine which "Hi" is the landing one (use the last occurrence)
  const landingIndex = useMemo(() => WORDS.lastIndexOf("Hi"), []);

  // Final combined text used to size the container to keep centering stable
  const FINAL_FULL_TEXT = "Hi, my name is Justin.";

  // Side effect to run the animation sequence once on mount
  useEffect(() => {
    // Guard to avoid state updates if the component unmounts mid-animation
    let cancelled = false;

    // Define the animation sequence as an async function for easy awaiting
    async function run() {
      // Start the progress bar animation (scaleX from 0 to 1 over DURATION)
      const progress = progressControls.start({
        scaleX: 1,
        transition: { duration: DURATION, ease: [0.77, 0, 0.175, 1] },
      });

      // Start the words group vertical movement (scroll upwards to -80%)
      const wordsMove = wordsControls.start({
        y: "-80%",
        transition: { duration: DURATION, ease: [0.77, 0, 0.175, 1] },
      });

      // Wait until both the progress bar and the words movement complete
      await Promise.all([progress, wordsMove]);
      
      // Slide the progress bar down while the container collapses at the same time
      const slideDown = progressControls.start({
        y: "100%",
        transition: { duration: 1.5, ease: [0.215, 0.61, 0.355, 1] },
      });
      const collapse = collapseControls.start({
        clipPath: `inset(calc(50% - 18px) 0 calc(50% - 28px) 0)`,
        transition: { duration: 1.7, ease: [0.19, 1, 0.22, 1] },
      });
      await Promise.all([slideDown, collapse]);

      // After collapse: reveal suffix on the right (no left shift needed)
      const suffixReveal = suffixRevealControls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        letterSpacing: "0em",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      });
      await Promise.all([suffixReveal]);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Final elegant collapse into a thin center line (start slow, end fast)
      await collapseControls.start({
        clipPath: "inset(50% 0 50% 0)",
        transition: { duration: 0.6, ease: "easeIn" },
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
  }, [collapseControls, onComplete, progressControls, suffixRevealControls, wordsControls]);

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
      <div className="absolute bottom-0 left-0 h-[5vh] w-full z-30 overflow-hidden">
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
        className="relative h-full w-full flex items-center justify-center flex-col bg-white overflow-hidden z-20 will-change-[clip-path] font-light"
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
                  rgba(255,255,255,0.9) calc(50% - 12px),
                  transparent calc(50% - 12px),
                  transparent calc(50% + 28px),
                  rgba(255,255,255,0.9) calc(50% + 28px),
                  rgba(255,255,255,0.9) 100%
                )`,
            }}
          />
          {/* Additional top and bottom fades for a softer edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 z-20 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-20 bg-gradient-to-t from-white to-transparent" />

          {/* The group of words that scrolls upward */}
          <motion.div className="relative pl-[6px] sm:pl-2" animate={wordsControls} dir="ltr">
            {/* Render each word on its own line at a large size for readability during the scroll */}
            {WORDS.map((word, index) => (
              <span
                key={index}
                className={
                  "block text-[2rem] sm:text-[2rem] leading-tight " +
                  (index !== landingIndex ? "-ml-[6px] sm:-ml-2" : "")
                }
              >
                {index === landingIndex ? (
                  <span className="relative inline-block">
                    {/* Invisible placeholder establishes the final width so line stays centered */}
                    <span className="invisible">{FINAL_FULL_TEXT}</span>
                    {/* Overlay actual animated content centered within placeholder width */}
                    <span className="absolute inset-0 flex items-baseline justify-center whitespace-pre">
                      <motion.span className="inline-block">
                        {word}
                      </motion.span>
                      <motion.span
                        className="inline-block will-change-[clip-path,opacity,letter-spacing] transform-gpu"
                        initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0.9, letterSpacing: "0.02em" }}
                        animate={suffixRevealControls}
                      >
                        {", my name is Justin."}
                      </motion.span>
                    </span>
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 