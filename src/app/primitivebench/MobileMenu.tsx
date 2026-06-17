"use client";

import { useState } from "react";
import { Geist_Mono } from "next/font/google";

const mono = Geist_Mono({ subsets: ["latin"], display: "swap" });

const NAV = ["BENCH", "METHODOLOGY", "BLOG", "PRICING", "DOCS"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${mono.className} lg:hidden`}>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b-4 border-black bg-[#e6e4dc]">
          <nav className="flex flex-col items-stretch px-5 py-4 text-center text-[16px] font-medium tracking-wide">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setOpen(false)}
                className="border-b border-black/10 py-3.5 transition-colors hover:text-[#2e46f0]"
              >
                {item}
              </a>
            ))}
            <button className="mt-5 border-2 border-black bg-[#2e46f0] px-5 py-3.5 text-[14px] font-bold tracking-wide text-white shadow-[4px_4px_0_#000000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000000]">
              GET CERTIFIED
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
