"use client";

export default function Experience() {
  return (
    <section id="experience">
      <div>
        <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">EXPERIENCE</p>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-neutral-200" aria-hidden />

          <div className="space-y-10 md:space-y-12">
            <div className="relative pl-8">
              <span className="absolute left-0 -translate-x-1/2 top-1.5 h-2 w-2 rounded-full bg-neutral-200" />
              <p className="text-[12px] tracking-widest text-neutral-400 uppercase">Aug 2025 — Present</p>
              <p className="text-neutral-900 mt-1">Data Scientist · <span className="text-neutral-600">First American</span></p>
              <p className="text-neutral-600 mt-1 text-sm">
                Building a GraphRAG system to interact with property graph databse.
              </p>
            </div>

            <div className="relative pl-8">
              <span className="absolute left-0 -translate-x-1/2 top-1.5 h-2 w-2 rounded-full bg-neutral-200" />
              <p className="text-[12px] tracking-widest text-neutral-400 uppercase">Jun 2025 — Aug 2025</p>
              <p className="text-neutral-900 mt-1">Data Science Intern · <span className="text-neutral-600">First American</span></p>
              <p className="text-neutral-600 mt-1 text-sm">
                Built a property graph database with 300 million nodes and 1 billion edges. 
              </p>
            </div>

            <div className="relative pl-8">
              <span className="absolute left-0 -translate-x-1/2 top-1.5 h-2 w-2 rounded-full bg-neutral-200" />
              <p className="text-[12px] tracking-widest text-neutral-400 uppercase">Sep 2024 — PRESENT</p>
              <p className="text-neutral-900 mt-1">Software Developer · <span className="text-neutral-600">ICS Student Council</span></p>
              <p className="text-neutral-600 mt-1 text-sm">
                Building ZotMeet, a platform for students to schedule meetings and book study rooms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}