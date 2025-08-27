"use client";

export default function About() {
  return (
    <section id="about" className="py-6 md:py-10">
      <div>
        <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">ABOUT ME</p>

        <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-neutral-900 font-light">
          I build data products end‑to‑end: from pipelines to models to precise interfaces.
        </h2>

        <div className="mt-6 md:mt-7 space-y-5 text-neutral-600">
          <p>
            I work at the intersection of data science and software engineering—shipping software that turns data into decisions.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-[12px] tracking-widest text-neutral-500 uppercase mb-3">Principles</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-3">
                <p className=" text-neutral-400">01</p>
                <p className=" text-neutral-400">—</p>
                <p className="text-neutral-900">Simplicity</p>
              </div>
              <p className="text-neutral-600">The best model is the simplest one that solves the problem.</p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <p className=" text-neutral-400">02</p>
                <p className=" text-neutral-400">—</p>
                <p className="text-neutral-900">Adaptability</p>
              </div>
              <p className="text-neutral-600">The ability to pivot while maintaining momentum.</p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <p className=" text-neutral-400">03</p>
                <p className=" text-neutral-400">—</p>
                <p className="text-neutral-900">Scalability</p>
              </div>
              <p className="text-neutral-600">Designing for tomorrow's volume with today's constraints.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200" />
      </div>
    </section>
  );
}