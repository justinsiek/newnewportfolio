"use client";

import React, { useEffect, useRef, useState } from "react";

let hasUserScrolled = false;

type FadeInProps = {
  children: React.ReactNode;
  delay?: number; // in ms
  y?: number; // translateY distance in px
  className?: string;
  initialBoostMs?: number; // extra delay if visible on first render
};

function FadeInOnScroll({ children, delay = 0, y = 16, className, initialBoostMs = 0 }: FadeInProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [finalDelayMs, setFinalDelayMs] = useState<number>(delay);
  const wasVisibleOnMountRef = useRef<boolean>(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Determine if element is within viewport on initial mount (partial visibility)
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = element.getBoundingClientRect();
    wasVisibleOnMountRef.current = rect.top < viewportHeight && rect.bottom > 0;

    const onFirstScroll = () => {
      hasUserScrolled = true;
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true, once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const boost = wasVisibleOnMountRef.current && !hasUserScrolled ? initialBoostMs : 0;
            setFinalDelayMs(delay + boost);
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, initialBoostMs]);

  const style: React.CSSProperties = {
    transition: "opacity 600ms ease, transform 600ms ease",
    transitionDelay: `${finalDelayMs}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : `translateY(${y}px)`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={containerRef} style={style} className={className}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-6 md:py-10">
      <div>
        <FadeInOnScroll delay={0} initialBoostMs={700} y={6}>
          <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">ABOUT ME</p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={100} initialBoostMs={700} y={8}>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-neutral-900 font-light">
            I build data products end‑to‑end: from pipelines to models to precise interfaces.
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={180} initialBoostMs={700} y={10}>
          <div className="mt-6 md:mt-7 space-y-5 text-neutral-600">
            <p>
              I work at the intersection of data science and software engineering—shipping software that turns data into decisions.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="mt-8">
          <FadeInOnScroll delay={100} initialBoostMs={800} y={8}>
            <p className="text-[12px] tracking-widest text-neutral-500 uppercase mb-3">Principles</p>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FadeInOnScroll delay={125} initialBoostMs={800} y={12}>
              <div>
                <div className="flex items-center gap-3">
                  <p className=" text-neutral-400">01</p>
                  <p className=" text-neutral-400">—</p>
                  <p className="text-neutral-900">Simplicity</p>
                </div>
                <p className="text-neutral-600">The best model is the simplest one that solves the problem.</p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={150} initialBoostMs={800} y={12}>
              <div>
                <div className="flex items-center gap-3">
                  <p className=" text-neutral-400">02</p>
                  <p className=" text-neutral-400">—</p>
                  <p className="text-neutral-900">Adaptability</p>
                </div>
                <p className="text-neutral-600">The ability to pivot while maintaining momentum.</p>
              </div>
            </FadeInOnScroll>
    
            <FadeInOnScroll delay={175} initialBoostMs={800} y={12}>
              <div>
                <div className="flex items-center gap-3">
                  <p className=" text-neutral-400">03</p>
                  <p className=" text-neutral-400">—</p>
                  <p className="text-neutral-900">Scalability</p>
                </div>
                <p className="text-neutral-600">Designing for tomorrow's volume with today's constraints.</p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>

        <FadeInOnScroll delay={200} initialBoostMs={800} y={0}>
          <div className="mt-10 border-t border-neutral-400" />
        </FadeInOnScroll>
      </div>
    </section>
  );
}