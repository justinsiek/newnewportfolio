"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";

const mono = Geist_Mono({ subsets: ["latin"], display: "swap" });

/* ---------- palette ---------- */
const DIM = "#7c877f";
const TREE = "#4b554f";
const GREEN = "#4ade80";
const ORANGE = "#ff8a4c";
const TAN = "#f0b94a";
const BLUE = "#7e9bff";

/* ---------- line model ---------- */
type Seg =
  | { k: "t"; s: string; cls?: string; u?: boolean } // typed text
  | { k: "add"; s: string } // typed text inside a green diff chip
  | { k: "brand"; b: "exa" | "brave" | "perplexity" }; // atomic vendor badge

type Line = { indent?: boolean; segs: Seg[] };

const tx = (s: string, cls?: string, u?: boolean): Seg => ({ k: "t", s, cls, u });
const ad = (s: string): Seg => ({ k: "add", s });
const br = (b: "exa" | "brave" | "perplexity"): Seg => ({ k: "brand", b });

/* ---------- badges ---------- */
function ExaBadge() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <Image src="/exa.jpeg" alt="Exa" width={15} height={15} className="rounded-[3px]" />
      <span className="text-[#e3e8ef]">Exa</span>
    </span>
  );
}

function BraveBadge() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <span className="inline-flex h-[15px] w-[15px] items-center justify-center align-middle">
        <Image src="/brave-logo.webp" alt="Brave" width={15} height={15} className="h-full w-full object-contain" />
      </span>
      <span className="text-[#e3e8ef]">Brave</span>
    </span>
  );
}

function PerplexityBadge() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <span className="inline-flex h-[15px] w-[15px] items-center justify-center overflow-hidden rounded-[3px] bg-white">
        <Image src="/perplexity-logo.png" alt="Perplexity" width={15} height={15} className="h-full w-full object-contain" />
      </span>
      <span className="text-[#e3e8ef]">Perplexity</span>
    </span>
  );
}

function Brand({ b }: { b: "exa" | "brave" | "perplexity" }) {
  return b === "exa" ? <ExaBadge /> : b === "brave" ? <BraveBadge /> : <PerplexityBadge />;
}

function Cursor({ on }: { on: boolean }) {
  // net-zero width so the typing head never reflows the line
  return (
    <span
      aria-hidden
      className="inline-block h-[0.95em] w-[7px] align-middle"
      style={{ background: on ? GREEN : "transparent", marginLeft: 1, marginRight: -8 }}
    />
  );
}

/* ---------- scenarios ---------- */
// constant part of the query; only the suffix swaps each loop
const PREFIX = "give the research agent web search that prioritizes ";

type Scenario = {
  suffix: string;
  lines: Line[];
  verdict: React.ReactNode;
  metric: string;
};

const SCENARIOS: Scenario[] = [
  {
    suffix: "content relevance",
    lines: [
      { segs: [tx(">", DIM), tx(" add web search — cite fresh, relevant sources")] },
      { segs: [tx("● ", ORANGE), tx("querying primitive_bench for "), tx("content relevance", TAN)] },
      {
        indent: true,
        segs: [tx("└ ", TREE), tx("200", GREEN), tx(" · "), br("exa"), tx(" certified "), tx("(94/100)", DIM)],
      },
      { segs: [tx("● ", ORANGE), tx("Update("), tx("lib/search.ts", BLUE, true), tx(")")] },
      { indent: true, segs: [tx("└ ", TREE), ad('+ import Exa from "exa-js"')] },
      { indent: true, segs: [tx("└ ", TREE), tx("routed to the certified pick.", DIM)] },
    ],
    verdict: (
      <>
        <span className="font-bold">✓</span> <Brand b="exa" /> certified{" "}
        <span className="font-bold">#1</span> — content relevance
      </>
    ),
    metric: "94/100 · routed",
  },
  {
    suffix: "latency",
    lines: [
      { segs: [tx(">", DIM), tx(" swap to the lowest-latency web search")] },
      { segs: [tx("● ", ORANGE), tx("querying primitive_bench for "), tx("latency", TAN)] },
      {
        indent: true,
        segs: [tx("└ ", TREE), tx("200", GREEN), tx(" · "), br("brave"), tx(" certified "), tx("(41ms p50)", DIM)],
      },
      { segs: [tx("● ", ORANGE), tx("Update("), tx("lib/search.ts", BLUE, true), tx(")")] },
      { indent: true, segs: [tx("└ ", TREE), ad('+ import Brave from "brave-search"')] },
      { indent: true, segs: [tx("└ ", TREE), tx("routed to the certified pick.", DIM)] },
    ],
    verdict: (
      <>
        <span className="font-bold">✓</span> <Brand b="brave" /> certified{" "}
        <span className="font-bold">#1</span> — latency
      </>
    ),
    metric: "41ms p50 · routed",
  },
  {
    suffix: "citations",
    lines: [
      { segs: [tx(">", DIM), tx(" add web search with traceable citations")] },
      { segs: [tx("● ", ORANGE), tx("querying primitive_bench for "), tx("citations", TAN)] },
      {
        indent: true,
        segs: [tx("└ ", TREE), tx("200", GREEN), tx(" · "), br("perplexity"), tx(" certified "), tx("(89/100)", DIM)],
      },
      { segs: [tx("● ", ORANGE), tx("Update("), tx("lib/search.ts", BLUE, true), tx(")")] },
      { indent: true, segs: [tx("└ ", TREE), ad('+ import Perplexity from "perplexity"')] },
      { indent: true, segs: [tx("└ ", TREE), tx("routed to the certified pick.", DIM)] },
    ],
    verdict: (
      <>
        <span className="font-bold">✓</span> <Brand b="perplexity" /> certified{" "}
        <span className="font-bold">#1</span> — citations
      </>
    ),
    metric: "89/100 cited · routed",
  },
];

/* ---------- timing ---------- */
const TYPE_MS = 9; // transcript char
const LINE_GAP = 100; // pause between transcript lines
const TASK_TYPE_MS = 32; // user typing the task
const TASK_DEL_MS = 18; // user deleting the task
const TASK_PAUSE = 450; // beat after task typed before the agent runs
const FOOTER_GAP = 250; // after run before verdict
const FOOTER_REVEAL = 450;
const HOLD = 2600; // dwell on the finished state
const SCN_GAP = 450; // empty beat before the next query types

const segUnits = (s: Seg) => (s.k === "t" || s.k === "add" ? s.s.length : 1);
const lineUnits = (l: Line) => l.segs.reduce((a, s) => a + segUnits(s), 0);

function schedule(lines: Line[]) {
  const times: { start: number; dur: number }[] = [];
  let t = 0;
  for (const l of lines) {
    const dur = Math.max(lineUnits(l) * TYPE_MS, 90);
    times.push({ start: t, dur });
    t += dur + LINE_GAP;
  }
  return { times, done: t - LINE_GAP };
}

const SCN = SCENARIOS.map((s) => {
  const sched = schedule(s.lines);
  const sufType = s.suffix.length * TASK_TYPE_MS;
  const runStart = sufType + TASK_PAUSE;
  const runEnd = runStart + sched.done;
  const footerStart = runEnd + FOOTER_GAP;
  const delStart = footerStart + FOOTER_REVEAL + HOLD;
  const delEnd = delStart + s.suffix.length * TASK_DEL_MS;
  const end = delEnd + SCN_GAP;
  return { ...s, sched, sufType, runStart, runEnd, footerStart, delStart, delEnd, end };
});

const OFFSETS: number[] = [];
let _acc = 0;
for (const s of SCN) {
  OFFSETS.push(_acc);
  _acc += s.end;
}
const CYCLE = _acc;

const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

/* ---------- renderers ---------- */
// a string with the first `r` chars visible, the rest reserved-but-invisible
function typed(s: string, r: number, showCursor: boolean, on: boolean) {
  return (
    <>
      <span>{s.slice(0, r)}</span>
      {showCursor && <Cursor on={on} />}
      <span className="opacity-0">{s.slice(r)}</span>
    </>
  );
}

// one transcript line at reveal-count r, optionally with the write cursor
function renderLine(segs: Seg[], r: number, showCursor: boolean, on: boolean) {
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  let placed = false;
  const tryCursor = () => {
    if (showCursor && !placed) {
      nodes.push(<Cursor key={`c${pos}`} on={on} />);
      placed = true;
    }
  };

  segs.forEach((seg, i) => {
    const u = segUnits(seg);
    const segStart = pos;
    pos += u;

    if (seg.k === "t" || seg.k === "add") {
      const take = Math.max(0, Math.min(u, r - segStart));
      const shown = seg.s.slice(0, take);
      const hidden = seg.s.slice(take);

      if (seg.k === "add") {
        if (take === 0) {
          tryCursor();
          nodes.push(
            <span key={i} className="rounded-[3px] bg-[#15401e] px-1.5 py-[1px] text-[#86f5ab] opacity-0">
              {seg.s}
            </span>
          );
        } else {
          const cur = take < u && showCursor && !placed;
          if (cur) placed = true;
          nodes.push(
            <span key={i} className="rounded-[3px] bg-[#15401e] px-1.5 py-[1px] text-[#86f5ab]">
              {shown}
              {cur && <Cursor on={on} />}
              {take < u && <span className="opacity-0">{hidden}</span>}
            </span>
          );
        }
      } else {
        const style =
          seg.cls || seg.u
            ? {
                color: seg.cls,
                textDecoration: seg.u ? "underline" : undefined,
                textDecorationColor: seg.u ? "#4d6ad0" : undefined,
                textUnderlineOffset: seg.u ? 2 : undefined,
              }
            : undefined;
        if (take > 0) nodes.push(<span key={i} style={style}>{shown}</span>);
        if (take < u) {
          tryCursor();
          nodes.push(<span key={`${i}h`} style={style} className="opacity-0">{hidden}</span>);
        }
      }
    } else {
      if (r >= pos) {
        nodes.push(<Brand key={i} b={seg.b} />);
      } else {
        tryCursor();
        nodes.push(<span key={i} className="opacity-0"><Brand b={seg.b} /></span>);
      }
    }
  });

  if (showCursor && !placed) nodes.push(<Cursor key="end" on={on} />);
  return nodes;
}

/* ---------- terminal ---------- */
export default function Terminal() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(SCN[0].footerStart + 1000); // show the first finished state, no loop
      return;
    }
    let raf = 0;
    let start: number | undefined;
    let last = 0;
    const START_DELAY = 1500; // idle beat before the first keystroke on load
    const loop = (now: number) => {
      if (start === undefined) start = now;
      const e = now - start;
      if (e - last >= 33) {
        last = e;
        setT(Math.max(0, e - START_DELAY) % CYCLE);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tt = t % CYCLE;
  let idx = 0;
  while (idx < SCN.length - 1 && tt >= OFFSETS[idx] + SCN[idx].end) idx++;
  const s = SCN[idx];
  const local = tt - OFFSETS[idx];
  const blink = Math.floor(t / 500) % 2 === 0;

  // task suffix state (prefix stays, only the suffix types/deletes)
  let sufR: number;
  let taskCursor = true;
  if (local < s.sufType) sufR = Math.floor(local / TASK_TYPE_MS);
  else if (local < s.delStart) {
    sufR = s.suffix.length;
    taskCursor = false;
  } else if (local < s.delEnd) sufR = s.suffix.length - Math.floor((local - s.delStart) / TASK_DEL_MS);
  else sufR = 0;
  sufR = Math.max(0, Math.min(s.suffix.length, sufR));

  // run phases
  const running = local >= s.runStart && local < s.runEnd;
  const done = local >= s.runEnd && local < s.delStart;
  const footerShown = local >= s.footerStart && local < s.delStart;

  // transcript cursor target
  let cur = -1;
  if (running) {
    const rl = local - s.runStart;
    for (let i = 0; i < s.lines.length; i++) if (rl >= s.sched.times[i].start) cur = i;
  }
  const lineR = (i: number) => {
    if (local < s.runStart || local >= s.delStart) return 0;
    if (local >= s.runEnd) return lineUnits(s.lines[i]);
    const rl = local - s.runStart;
    const st = s.sched.times[i].start;
    return Math.max(0, Math.min(lineUnits(s.lines[i]), Math.floor((rl - st) / TYPE_MS)));
  };

  return (
    <div
      className={`${mono.className} overflow-hidden border-2 border-[#ff5747] bg-[#0c100e] text-[14px] text-[#d2dbd0] shadow-[8px_8px_0_#ff5747]`}
    >
      <style>{`@keyframes pb-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}`}</style>

      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[#19211c] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-1 font-bold text-[#e8efe9]">primitive-bench</span>
          <span className="text-[#7c877f]">— claude code</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#7c877f]">
          <span>04:25</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            live
          </span>
        </div>
      </div>

      {/* Task bar (the user's query types/deletes here) */}
      <div className="flex items-start gap-3 border-b border-[#19211c] px-4 py-2.5">
        <span className="mt-[1px] rounded-[3px] bg-[#f5cd1c] px-1.5 py-[1px] text-[10px] font-bold text-[#1a1a1a]">
          TASK
        </span>
        <span className="whitespace-nowrap text-[#c2ccc6]">
          {PREFIX}
          <span style={{ color: BLUE }}>{typed(s.suffix, sufR, taskCursor, blink)}</span>
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-16">
        <div className="mb-3 flex items-center justify-between border-b border-[#19211c] pb-3">
          <div className="flex items-center gap-2.5">
            <Image src="/claude-logo.png" alt="Claude Code" width={22} height={22} className="rounded-[5px]" />
            <div className="leading-tight">
              <div className="font-bold text-[#e8efe9]">Claude Code</div>
              <div className="text-[10px] text-[#7c877f]">~/research-agent</div>
            </div>
          </div>
          {running ? (
            <span className="rounded-full border border-[#3a4a40] px-2 py-[2px] text-[10px] font-bold tracking-wide text-[#b7c1b8]">
              {SPIN[Math.floor(t / 80) % SPIN.length]} RUN
            </span>
          ) : done ? (
            <span
              style={{ animation: "pb-pop .3s ease-out" }}
              className="rounded-full border border-[#2f7a52] px-2 py-[2px] text-[10px] font-bold tracking-wide text-[#4ade80]"
            >
              DONE
            </span>
          ) : (
            <span className="rounded-full border border-[#2a332d] px-2 py-[2px] text-[10px] font-bold tracking-wide text-[#69736d]">
              READY
            </span>
          )}
        </div>

        <div className="space-y-1.5 leading-relaxed">
          {s.lines.map((line, i) => (
            <p key={i} className={line.indent ? "whitespace-nowrap pl-3" : "whitespace-nowrap"}>
              {renderLine(line.segs, lineR(i), i === cur, blink)}
            </p>
          ))}
        </div>
      </div>

      {/* Verdict footer */}
      <div
        style={{
          opacity: footerShown ? 1 : 0,
          transform: footerShown ? "translateY(0)" : "translateY(8px)",
          transition: "opacity .4s ease-out, transform .4s ease-out",
        }}
        className="flex items-center justify-between gap-3 overflow-hidden border-t border-[#19211c] bg-[#0a1410] px-4 py-4"
      >
        <span className="whitespace-nowrap text-[#86f5ab]">{s.verdict}</span>
        <span className="whitespace-nowrap text-[#7c877f]">{s.metric}</span>
      </div>
    </div>
  );
}
