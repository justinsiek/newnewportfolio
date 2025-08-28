"use client";

export default function Contact() {
  return (
    <section id="contact" >
      <div>
        <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">SAY HELLO</p>

        <div className="mt-6 text-neutral-600 max-w-3xl">
          <p>For projects, roles, or collaborations—reach out below.</p>
        </div>

        <div className="mt-6">
          <a
            href="mailto:justinsiek05@gmail.com"
            className="inline-flex items-baseline gap-3 group"
          >
            <span className="text-[12px] tracking-widest text-neutral-400">EMAIL</span>
            <span className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-400">
              justinsiek05@gmail.com
            </span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-neutral-600">
          <a className="hover:text-neutral-900" href="https://github.com/justinsiek" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="hover:text-neutral-900" href="https://www.linkedin.com/in/justin-siek/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="hover:text-neutral-900" href="#" target="_blank" rel="noreferrer">
            Resume ↗
          </a>
        </div>
      </div>
    </section>
  );
}