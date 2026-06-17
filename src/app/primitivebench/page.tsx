import { Archivo_Black, Geist_Mono } from "next/font/google";
import Terminal from "./Terminal";
import MobileMenu from "./MobileMenu";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], display: "swap" });

const NAV = ["BENCH", "METHODOLOGY", "BLOG", "PRICING", "DOCS"];

export default function PrimitiveBench() {
  return (
    <div className="flex min-h-screen flex-col text-[#141414]">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-4 border-black bg-[#e6e4dc] px-4 sm:px-5">
        {/* Left: logo + nav */}
        <div className="flex h-full items-center gap-4">
          <div className="flex items-center gap-1">
            {/* PRIMITIVE BENCH mark */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/monkey.png"
              alt="Primitive Bench"
              className="h-12 w-12 shrink-0 object-contain lg:h-13 lg:w-13"
            />
            <span className={`${mono.className} text-base font-bold tracking-tight sm:text-lg`}>
              PRIMITIVE BENCH
            </span>
          </div>
          <div className="mx-2 hidden h-7 w-[2px] bg-black lg:block" />
          <nav
            className={`${mono.className} hidden items-center gap-6 text-[15px] font-medium tracking-wide lg:flex`}
          >
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="relative inline-block py-1 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2e46f0] after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: icon + CTA */}
        <div className="hidden h-full items-center gap-4 lg:flex">
          <button
            aria-label="Source"
            className="hidden border-2 border-black p-1.5 transition-colors hover:bg-black hover:text-white md:flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
          </button>
          <div className="hidden h-7 w-[2px] bg-black md:block" />
          <button
            className={`${mono.className} border-2 border-black bg-[#2e46f0] px-5 py-2.5 text-[13px] font-bold tracking-wide text-white shadow-[3px_3px_0_#000000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#000000]`}
          >
            GET CERTIFIED
          </button>
        </div>
        <MobileMenu />
      </header>

      {/* Hero */}
      <main
        className="relative flex-1 overflow-hidden px-5 sm:px-8 lg:px-10"
        style={{
          backgroundColor: "#e9e6dd",
          backgroundImage: `
            radial-gradient(900px circle at 92% -10%, rgba(245,205,28,0.15), transparent 50%),
            radial-gradient(800px circle at 80% 100%, rgba(255,71,60,0.14), transparent 50%),
            radial-gradient(800px circle at 20% 100%, rgba(30,58,138,0.18), transparent 50%)
          `,
        }}
      >
        {/* Dotted overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(60,52,96,0.12) 0.7px, transparent 0.8px)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="relative mx-auto max-w-[108rem]">
          <div className="flex flex-col items-center gap-10 pt-6 pb-16 lg:min-h-[calc(100vh-5rem)] lg:flex-row lg:items-center lg:gap-10 lg:pt-4">
            {/* Left: hero copy */}
            <div className="flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
            {/* Headline */}
          <h1
            className={`${display.className} text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.04em] 2xl:text-[clamp(2.5rem,5.5vw,6rem)]`}
            style={{ textShadow: "3px 4px 0 #ff5747" }}
          >
            <span className="block">THE BEST API,</span>
            <span className="block">RIGHT IN YOUR</span>
            <span className="block">
              <span className="relative inline-block px-3">
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.05em] bottom-[0.06em] top-[0.1em] origin-left bg-[#f5cd1c] mix-blend-multiply"
                  style={{ animation: "highlight-sweep 0.7s cubic-bezier(0.2,0.8,0.2,1) 0.35s both" }}
                />
                <span className="relative z-10">CODING TOOL.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`${mono.className} mt-7 max-w-xl text-[17px] leading-relaxed tracking-tight text-[#2a2a2a] md:text-[17px]`}>
            Every AI app is built from APIs -{" "}
            <strong className="font-bold text-black">
              search, extraction, OCR, vector databases, agents.
            </strong>{" "}
            We benchmark them on real tasks and hand the winner straight to your
            AI coding tool.
          </p>

          {/* Buttons */}
          <div
            className={`${mono.className} mt-12 flex w-full flex-col items-stretch gap-4 text-[14px] font-bold tracking-wide sm:w-auto sm:flex-row sm:items-center sm:gap-5`}
          >
            <button className="w-full border-2 border-black bg-[#2e46f0] px-7 py-4 text-white shadow-[5px_5px_0_#141414] transition-all hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-[0px_0px_0_#141414] sm:w-auto">
              SEE THE PRECISION MATRIX →
            </button>
            <button className="w-full border-2 border-black bg-[#f5f3ec] px-7 py-4 text-[#141414] shadow-[5px_5px_0_#141414] transition-all hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-[0px_0px_0_#141414] sm:w-auto">
              {"WHAT'S A VIBE CODER?"}
            </button>
          </div>
            </div>

            {/* Right: terminal */}
            <div className="w-full lg:w-[700px] lg:shrink-0">
              <Terminal />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
