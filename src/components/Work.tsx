"use client";

export default function SelectedWork() {
  const projects = [
    {
      id: "01",
      title: "atrova.app",
      blurb:
        "Productivity app that users can text to add tasks and events to their calendar.",
      meta: ["LangChain", "AWS", "NextJS"],
    },
    {
      id: "02",
      title: "Apprazer",
      blurb:
        "AI powered dashboard to streamline the mortgage approval process.",
      meta: ["OpenCV", "scikit-learn", "NextJS"],
    },
    
    {
      id: "03",
      title: "pippal.xyz",
      blurb:
        "Algorithmically extracts and displays common stock patterns and other technical indicators.",
      meta: ["NumPy", "Pandas", "NextJS"],
    },
    {
      id: "04",
      title: "CodeBattles",
      blurb:
        "Platform for real-time coding competitions, with automated judging.",
      meta: ["Websockets", "Flask", "NextJS"],
    },
    {
      id: "05",
      title: "notori.ai",
      blurb:
        "AI assistant writing platform with intelligent text manipulation.",
      meta: ["LangChain", "AWS", "NextJS"],
    },
    {
      id: "06",
      title: "Sonder",
      blurb:
        "Anonymized social media platform with Web3 authentication.",
      meta: ["Metamask", "React", "Firebase"],
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
      <div className="mt-10 border-t border-neutral-400" />
    </section>
  );
}