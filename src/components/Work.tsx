"use client";

export default function SelectedWork() {
  const projects = [
    {
      id: "01",
      title: "Real‑Time Demand Forecasting",
      blurb:
        "Low‑latency forecasts powering inventory and pricing decisions across channels.",
      meta: ["Forecasting", "Streaming", "Retail"],
    },
    {
      id: "02",
      title: "Document Intelligence Platform",
      blurb:
        "Turn unstructured docs into reliable, queryable facts with measurable confidence.",
      meta: ["OCR", "RAG", "Evaluation"],
    },
    {
      id: "03",
      title: "Visual QA for Manufacturing",
      blurb:
        "Inline defect detection that reduces escapes without slowing throughput.",
      meta: ["Vision", "Edge", "Quality"],
    },
    {
      id: "04",
      title: "GenAI Support Triage",
      blurb:
        "Route and summarize tickets to cut handle time while improving resolution.",
      meta: ["LLM", "Summarization", "Routing"],
    },
    {
      id: "05",
      title: "ML Feature Store",
      blurb:
        "Single source of truth for online/offline features with lineage and SLAs.",
      meta: ["Platforms", "Data", "Governance"],
    },
    {
      id: "06",
      title: "Geospatial Risk Scoring",
      blurb:
        "Location‑aware risk surfaces for underwriting and network planning.",
      meta: ["Geospatial", "Scoring", "Mapping"],
    },
  ];

  return (
    <section id="work" className="py-6 md:py-10">
      <p className="text-sm tracking-[0.24em] text-neutral-500 ml-1">SELECTED WORK</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group border border-neutral-200 hover:border-neutral-300 transition-colors"
          >
            <div className="bg-neutral-50">
              <div className="aspect-[16/10] w-full" />
            </div>

            <div className="p-4 md:p-5 space-y-2">
              <div className="flex items-baseline gap-3">
                <p className="text-[12px] tracking-widest text-neutral-400">{p.id}</p>
                <h3 className="text-neutral-900">{p.title}</h3>
              </div>

              <p className="text-neutral-600">{p.blurb}</p>

              <div className="pt-2 flex flex-wrap gap-3">
                {p.meta.map((m) => (
                  <span
                    key={m}
                    className="text-[12px] tracking-widest text-neutral-500"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}