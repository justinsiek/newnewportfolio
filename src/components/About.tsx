"use client";

import React, { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number; // in ms
  y?: number; // translateY distance in px
  className?: string;
};

function FadeInOnScroll({ children, delay = 0, y = 16, className }: FadeInProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  }, []);

  const style: React.CSSProperties = {
    transition: "opacity 600ms ease, transform 600ms ease",
    transitionDelay: `${delay}ms`,
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
        <FadeInOnScroll delay={500} y={6}>
          <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">ABOUT ME</p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={500 + 100} y={8}>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-neutral-900 font-light">
            I build data products end‑to‑end: from pipelines to models to precise interfaces.
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={500 + 180} y={10}>
          <div className="mt-6 md:mt-7 space-y-5 text-neutral-600">
            <p>
              I work at the intersection of data science and software engineering—shipping software that turns data into decisions.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="mt-8">
          <FadeInOnScroll delay={500 + 220} y={8}>
            <p className="text-[12px] tracking-widest text-neutral-500 uppercase mb-3">Principles</p>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FadeInOnScroll delay={500 +260} y={12}>
              <div>
                <div className="flex items-center gap-3">
                  <p className=" text-neutral-400">01</p>
                  <p className=" text-neutral-400">—</p>
                  <p className="text-neutral-900">Simplicity</p>
                </div>
                <p className="text-neutral-600">The best model is the simplest one that solves the problem.</p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={500 +320} y={12}>
              <div>
                <div className="flex items-center gap-3">
                  <p className=" text-neutral-400">02</p>
                  <p className=" text-neutral-400">—</p>
                  <p className="text-neutral-900">Adaptability</p>
                </div>
                <p className="text-neutral-600">The ability to pivot while maintaining momentum.</p>
              </div>
            </FadeInOnScroll>
    
            <FadeInOnScroll delay={500 + 380} y={12}>
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

        <FadeInOnScroll delay={500 +420} y={0}>
          <div className="mt-10 border-t border-neutral-400" />
        </FadeInOnScroll>
      </div>
    </section>
  );
}