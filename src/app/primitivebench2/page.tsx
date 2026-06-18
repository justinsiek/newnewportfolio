import { Baloo_2, Archivo, JetBrains_Mono } from "next/font/google";
import Terminal from "./Terminal";
import MobileMenu from "./MobileMenu";

const display = Baloo_2({ weight: ["600", "700", "800"], subsets: ["latin"], display: "swap" });
const body = Archivo({ weight: ["500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });

const GUTTER = "max(48px, calc((100vw - 1440px) / 2))";

const NAV = [
  { label: "Bench", href: "#matrix" },
  { label: "Methodology", href: "#methodology" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

export default function PrimitiveBench() {
  return (
    <div className={`${body.className} min-h-screen overflow-x-hidden bg-[#F4E7C8] text-[#1C1A17]`}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex h-[85px] items-center justify-between border-b-[3px] border-[#1C1A17] bg-[#F4E7C8]"
        style={{ paddingInline: GUTTER }}
      >
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Primitive Bench home"
            className="inline-flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[11px] border-[3px] border-[#1C1A17] bg-[#F2A63B] shadow-[3px_3px_0_#1C1A17] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[0px_0px_0_#1C1A17]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/monkey.png" alt="" className="mt-[3px] h-[42px] w-[42px] object-contain" />
          </a>
          <span className="relative top-[1.5px] text-[24px] font-black tracking-[-0.01em]">PRIMITIVE BENCH</span>
        </div>

        <div className="hidden items-center gap-[26px] text-[15px] font-bold lg:flex">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="text-[#1C1A17] no-underline hover:text-[#936C3E]">
              {item.label}
            </a>
          ))}
          <a
            href="#"
            className="rounded-[11px] border-[3px] border-[#1C1A17] bg-[#F2A63B] px-4 py-[9px] text-[#1C1A17] no-underline shadow-[3px_3px_0_#1C1A17] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[0px_0px_0_#1C1A17]"
          >
            Get certified
          </a>
        </div>

        <MobileMenu />
      </nav>

      {/* HERO */}
      <section className="grid lg:min-h-[calc(100vh-85px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left column */}
        <div
          className="flex flex-col justify-center border-b-[3px] border-[#1C1A17] bg-[#F4E7C8] px-6 pb-14 pt-8 sm:px-10 lg:border-b-0 lg:border-r-[3px] lg:pb-[72px] lg:pr-14 lg:pt-10"
          style={{ paddingLeft: GUTTER }}
        >
          {/* Eyebrow */}
          <div
            className={`${mono.className} inline-flex items-center gap-[9px] self-start rounded-full border-[3px] border-[#1C1A17] bg-[#936C3E] px-[15px] py-[7px] text-[12px] font-semibold tracking-[0.04em] text-[#F6EBCF]`}
          >
            <span className="h-[9px] w-[9px] rounded-full border-2 border-[#1C1A17] bg-[#F2A63B]" />
            INDEPENDENT TRUST LAYER
          </div>

          {/* Headline */}
          <h1
            className={`${display.className} mt-[30px] text-[clamp(44px,5.4vw,76px)] font-extrabold leading-[1.02] tracking-[-0.01em] text-[#1C1A17]`}
          >
            The best API,
            <br />
            right in your
            <br />
            <span className="text-[#F2A63B]">coding tool.</span>
          </h1>

          {/* Paragraph */}
          <p className="mt-[26px] max-w-[48ch] text-[16px] font-medium leading-[1.55] text-[#3a2c18]">
            Every AI app is built from APIs: search, extraction, OCR, vector DBs. We benchmark them on
            real tasks and hand the winner straight to your coding tool.{" "}
            <span className="font-extrabold text-[#1C1A17]">No hype. No guessing.</span>
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-[18px]">
            <a
              href="#matrix"
              className="inline-flex items-center gap-[10px] rounded-[11px] border-[3px] border-[#1C1A17] bg-[#F2A63B] px-[22px] py-[14px] text-[15px] font-extrabold text-[#1C1A17] no-underline shadow-[4px_4px_0_#1C1A17] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0px_0px_0_#1C1A17]"
            >
              See the precision matrix <span className={mono.className}>→</span>
            </a>
            <a
              href="#vibe"
              className="inline-flex items-center gap-[10px] rounded-[11px] border-[3px] border-[#1C1A17] bg-[#FBF3E1] px-[22px] py-[14px] text-[15px] font-extrabold text-[#1C1A17] no-underline shadow-[4px_4px_0_#1C1A17] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0px_0px_0_#1C1A17]"
            >
              What&apos;s a vibe coder?
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-center justify-center bg-[#E7D4A8] px-6 py-14 sm:px-14 lg:py-16">
          <Terminal mono={mono.className} />
        </div>
      </section>
    </div>
  );
}
