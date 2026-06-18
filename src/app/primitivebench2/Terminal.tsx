"use client";

import { useEffect, useState } from "react";

/* ---------- warm palette ---------- */
const INK = "#1C1A17";
const BODY = "#3a2c18";
const BROWN_DEEP = "#5C3A1F";
const MUTED = "#8a7a5e";

/* ---------- line model ---------- */
type Seg =
  | { k: "t"; s: string; c?: string; b?: boolean } // typed text
  | { k: "add"; s: string }; // typed text inside the amber-soft diff chip

type Line = { indent?: boolean; segs: Seg[] };

const tx = (s: string, c?: string, b?: boolean): Seg => ({ k: "t", s, c, b });
const ad = (s: string): Seg => ({ k: "add", s });

type Scenario = {
  suffix: string;
  lines: Line[];
  verdict: string;
  metric: string;
};

/* ---------- scenarios (TASK = "web search · prioritize {suffix}") ---------- */
const SCENARIOS: Scenario[] = [
  {
    suffix: "relevance",
    lines: [
      { segs: [tx("> add web search — cite fresh, relevant sources", INK)] },
      { segs: [tx("● querying primitive_bench · relevance", BROWN_DEEP)] },
      { indent: true, segs: [tx("└ 200 · Exa certified (94/100)", INK, true)] },
      { segs: [tx("● Update(lib/search.ts)", BROWN_DEEP)] },
      { segs: [ad('+ import Exa from "exa-js"')] },
      { indent: true, segs: [tx("└ routed to the certified pick.", MUTED)] },
    ],
    verdict: "✓ Exa certified #1 — relevance",
    metric: "94/100",
  },
  {
    suffix: "latency",
    lines: [
      { segs: [tx("> swap to the lowest-latency web search", INK)] },
      { segs: [tx("● querying primitive_bench · latency", BROWN_DEEP)] },
      { indent: true, segs: [tx("└ 200 · Brave certified (41ms p50)", INK, true)] },
      { segs: [tx("● Update(lib/search.ts)", BROWN_DEEP)] },
      { segs: [ad('+ import Brave from "brave-search"')] },
      { indent: true, segs: [tx("└ routed to the certified pick.", MUTED)] },
    ],
    verdict: "✓ Brave certified #1 — latency",
    metric: "41ms p50",
  },
  {
    suffix: "citations",
    lines: [
      { segs: [tx("> add web search with traceable citations", INK)] },
      { segs: [tx("● querying primitive_bench · citations", BROWN_DEEP)] },
      { indent: true, segs: [tx("└ 200 · Perplexity certified (89/100)", INK, true)] },
      { segs: [tx("● Update(lib/search.ts)", BROWN_DEEP)] },
      { segs: [ad('+ import Perplexity from "perplexity"')] },
      { indent: true, segs: [tx("└ routed to the certified pick.", MUTED)] },
    ],
    verdict: "✓ Perplexity certified #1 — citations",
    metric: "89/100",
  },
];

/* ---------- timing ---------- */
const TYPE_MS = 9; // transcript char
const LINE_GAP = 110; // pause between transcript lines
const TASK_TYPE_MS = 34; // user typing the task suffix
const TASK_DEL_MS = 18; // user deleting the task suffix
const TASK_PAUSE = 450; // beat after task typed before the agent runs
const FOOTER_GAP = 280; // after run before verdict
const FOOTER_REVEAL = 450;
const HOLD = 2800; // dwell on the finished state
const SCN_GAP = 450; // empty beat before the next query types

const segUnits = (s: Seg) => s.s.length;
const lineUnits = (l: Line) => l.segs.reduce((a, s) => a + segUnits(s), 0);

function schedule(lines: Line[]) {
  const times: { start: number }[] = [];
  let t = 0;
  for (const l of lines) {
    const dur = Math.max(lineUnits(l) * TYPE_MS, 90);
    times.push({ start: t });
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


/* ---------- cursor ---------- */
function Cursor({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block h-[0.95em] w-[7px] align-middle"
      style={{ background: on ? INK : "transparent", marginLeft: 1, marginRight: -8 }}
    />
  );
}

// string with first `r` chars visible, rest reserved-but-invisible
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
    const take = Math.max(0, Math.min(u, r - segStart));
    const shown = seg.s.slice(0, take);
    const hidden = seg.s.slice(take);

    if (seg.k === "add") {
      if (take === 0) {
        tryCursor();
        nodes.push(
          <span key={i} className="rounded-[3px] bg-[#F2DCAE] px-1 font-bold opacity-0" style={{ color: INK }}>
            {seg.s}
          </span>
        );
      } else {
        const cur = take < u && showCursor && !placed;
        if (cur) placed = true;
        nodes.push(
          <span key={i} className="rounded-[3px] bg-[#F2DCAE] px-1 font-bold" style={{ color: INK }}>
            {shown}
            {cur && <Cursor on={on} />}
            {take < u && <span className="opacity-0">{hidden}</span>}
          </span>
        );
      }
    } else {
      const style = { color: seg.c, fontWeight: seg.b ? 700 : undefined };
      if (take > 0) nodes.push(<span key={i} style={style}>{shown}</span>);
      if (take < u) {
        tryCursor();
        nodes.push(<span key={`${i}h`} style={style} className="opacity-0">{hidden}</span>);
      }
    }
  });

  if (showCursor && !placed) nodes.push(<Cursor key="end" on={on} />);
  return nodes;
}

/* ---------- terminal ---------- */
export default function Terminal({ mono }: { mono: string }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(SCN[1].footerStart + 1000 + OFFSETS[1]); // show finished "latency" state, no loop
      return;
    }
    let raf = 0;
    let start: number | undefined;
    let last = 0;
    const START_DELAY = 1200; // idle beat before the first keystroke on load
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
      className={`${mono} w-full max-w-[600px] overflow-hidden rounded-[16px] border-[3px] border-[#1C1A17] bg-[#FBF3E1] text-[12.5px] leading-[1.95] shadow-[6px_6px_0_#1C1A17]`}
    >
      <style>{`@keyframes pb-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}`}</style>

      {/* Title bar */}
      <div className="flex items-center justify-between border-b-[3px] border-[#1C1A17] bg-[#936C3E] px-[15px] py-[11px]">
        <div className="flex items-center gap-[9px]">
          <span className="flex gap-[6px]">
            <span className="h-[11px] w-[11px] rounded-full border-2 border-[#1C1A17] bg-[#F2A63B]" />
            <span className="h-[11px] w-[11px] rounded-full border-2 border-[#1C1A17] bg-[#E7D4A8]" />
            <span className="h-[11px] w-[11px] rounded-full border-2 border-[#1C1A17] bg-[#5C3A1F]" />
          </span>
          <span className="ml-[5px] text-[11.5px] font-semibold text-[#F6EBCF]">
            primitive-bench — claude code
          </span>
        </div>
        <span className="inline-flex items-center gap-[6px] rounded-[6px] border-2 border-[#1C1A17] bg-[#F2A63B] px-[7px] py-[2px] text-[10px] font-bold tracking-[0.08em] text-[#1C1A17]">
          ● LIVE
        </span>
      </div>

      {/* Task bar (the user's query types/deletes here) */}
      <div className="flex items-start gap-[9px] border-b-[3px] border-[#1C1A17] px-[15px] py-[12px]">
        <span className="mt-[1px] rounded-[5px] bg-[#1C1A17] px-[7px] py-[1px] text-[10.5px] font-bold tracking-[0.06em] text-[#F6EBCF]">
          TASK
        </span>
        <span className="font-semibold" style={{ color: INK }}>
          give the research agent web search that prioritizes{" "}
          <span style={{ color: "#F2A63B" }}>{typed(s.suffix, sufR, taskCursor, blink)}</span>
        </span>
      </div>

      {/* Body */}
      <div className="px-[15px] py-[14px]" style={{ color: BODY }}>
        <div className="flex items-center">
          <span className="font-bold" style={{ color: INK }}>✻ Claude Code</span>
        </div>

        <div className="mb-[6px] mt-[2px] text-[11px]" style={{ color: MUTED }}>~/research-agent</div>

        <div>
          {s.lines.map((line, i) => (
            <p key={i} className={line.indent ? "pl-[14px]" : undefined}>
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
        className="flex items-center justify-between border-t-[3px] border-[#1C1A17] bg-[#F2A63B] px-[15px] py-[12px]"
      >
        <span className="text-[12px] font-bold text-[#1C1A17]">{s.verdict}</span>
        <span className="text-[11px] font-semibold text-[#1C1A17]">{s.metric}</span>
      </div>
    </div>
  );
}
