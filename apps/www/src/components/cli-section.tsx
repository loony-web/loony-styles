import Link from "next/link";

const steps = [
  {
    step: "01",
    command: "npx loony init",
    description: "Interactive setup. Picks your components directory, styles path, import alias, and Tailwind version.",
    output: [
      { symbol: "✓", text: "Created loony.config.json", color: "#4ade80" },
      { symbol: "✓", text: "Added @import to globals.css", color: "#4ade80" },
      { symbol: "→", text: "Run: loony add <component>",   color: "#60a5fa" },
    ],
  },
  {
    step: "02",
    command: "loony add button dialog toast",
    description: "Resolves the full dependency tree and copies source files directly into your project.",
    output: [
      { symbol: "✓", text: "button.tsx → src/components/ui/",       color: "#4ade80" },
      { symbol: "✓", text: "dialog.tsx → src/components/ui/",       color: "#4ade80" },
      { symbol: "✓", text: "toast.tsx, toaster.tsx → src/components/ui/", color: "#4ade80" },
    ],
  },
  {
    step: "03",
    command: "loony diff button",
    description: "Shows exactly what changed upstream so you can cherry-pick updates on your own schedule.",
    output: [
      { symbol: "-", text: "'rounded-md'",              color: "#f87171" },
      { symbol: "+", text: "'rounded-lg'",              color: "#4ade80" },
      { symbol: " ", text: "// one variant changed",   color: "#52525b" },
    ],
  },
];

const commands = ["init", "add", "list", "diff", "update", "scaffold"];

export function CliSection() {
  return (
    <section className="px-4 py-24 md:px-6" style={{ background: "#09090b", borderTop: "1px solid #27272a" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">CLI</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Zero to component <br />
              <span className="text-[#52525b]">in seconds.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#71717a]">Six commands. Init, add, diff, and manage components from your terminal.</p>
        </div>

        <div className="mb-8 space-y-3">
          {steps.map((s) => (
            <div key={s.step} className="overflow-hidden rounded-xl" style={{ background: "#111113", border: "1px solid #27272a" }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-3 px-5 py-3" style={{ background: "#0d1117", borderBottom: "1px solid #21262d" }}>
                <span className="font-mono text-xs font-bold text-[#3b82f6]">{s.step}</span>
                <div className="font-mono text-sm text-[#e6edf3]">
                  <span className="text-[#52525b]">$ </span>
                  {s.command}
                </div>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="border-b border-[#27272a] p-5 md:border-b-0 md:border-r md:border-[#27272a]">
                  <p className="text-sm leading-relaxed text-[#71717a]">{s.description}</p>
                </div>
                <div className="p-5" style={{ background: "#0d1117" }}>
                  <div className="space-y-1.5 font-mono text-xs">
                    {s.output.map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-px font-bold" style={{ color: line.color }}>{line.symbol}</span>
                        <span className="text-[#e6edf3]">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commands */}
        <div className="mb-12 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {commands.map((cmd) => (
            <div
              key={cmd}
              className="flex items-center justify-center rounded-lg px-3 py-2 font-mono text-xs text-[#52525b]"
              style={{ background: "#111113", border: "1px solid #27272a" }}
            >
              <span className="mr-1 opacity-40">$</span>{cmd}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-85"
          >
            Get started →
          </Link>
          <Link href="/docs/cli" className="text-sm text-[#71717a] transition-colors hover:text-[#fafafa]">
            CLI reference →
          </Link>
        </div>
      </div>
    </section>
  );
}
