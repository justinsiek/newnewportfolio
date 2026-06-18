"use client";

import { useState } from "react";

const NAV = [
  { label: "Bench", href: "#matrix" },
  { label: "Methodology", href: "#methodology" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-[11px] border-[3px] border-[#1C1A17] bg-[#FBF3E1] text-[#1C1A17] shadow-[3px_3px_0_#1C1A17] transition-colors hover:bg-[#F2A63B]"
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
        <div className="absolute left-0 right-0 top-full border-b-[3px] border-[#1C1A17] bg-[#F4E7C8]">
          <nav className="flex flex-col items-stretch px-6 py-4 text-center text-[16px] font-bold">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b-2 border-[#1C1A17]/15 py-3.5 text-[#1C1A17] no-underline transition-colors hover:text-[#936C3E]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-[11px] border-[3px] border-[#1C1A17] bg-[#F2A63B] px-5 py-3.5 text-[14px] font-bold text-[#1C1A17] no-underline shadow-[3px_3px_0_#1C1A17] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[0px_0px_0_#1C1A17]"
            >
              Get certified
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
