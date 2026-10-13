"use client";

const points = [
  "Copy source files directly — no black-box npm package to fight.",
  "Customize styles, logic, and markup. It's just your code.",
  "No breaking-change anxiety. You own the version you shipped.",
  "Upgrade on your schedule with loony diff.",
];

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-[#3b82f6]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Philosophy() {
  return (
    <section
      className="px-4 py-24 md:px-6"
      style={{
        background: "#111113",
        borderTop: "1px solid #27272a",
        borderBottom: "1px solid #27272a",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left — copy */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">
              Philosophy
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Copy, don't install.
            </h2>
            <p className="mt-4 leading-relaxed text-[#71717a]">
              Loony is not a component library you depend on — it's source files you own. Run{" "}
              <code
                className="rounded px-1.5 py-0.5 text-sm text-[#60a5fa]"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                loony add button
              </code>{" "}
              and the code lands directly in your project.
            </p>
            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[#a1a1aa]">
                  <Check />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — code block */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ background: "#0d1117", border: "1px solid #30363d" }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-3"
              style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span
                className="ml-3 text-xs text-[#8b949e]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                src/components/ui/button.tsx
              </span>
              <span
                className="ml-auto rounded px-1.5 py-0.5 text-[10px] text-[#58a6ff]"
                style={{ background: "#21262d" }}
              >
                yours ✓
              </span>
            </div>
            <pre
              className="overflow-x-auto p-5 text-[0.8125rem] leading-[1.7]"
              style={{ fontFamily: "var(--font-mono, monospace)", margin: 0 }}
            >
              <code>
                <span style={{ color: "#8b949e", fontStyle: "italic" }}>
                  {"// This file is yours. Edit freely.\n"}
                </span>
                <span style={{ color: "#8b949e", fontStyle: "italic" }}>
                  {"// loony diff shows upstream changes.\n\n"}
                </span>
                <span style={{ color: "#ff7b72" }}>import </span>
                <span style={{ color: "#e6edf3" }}>{"{ cva } "}</span>
                <span style={{ color: "#ff7b72" }}>from </span>
                <span style={{ color: "#a5d6ff" }}>{'"class-variance-authority"\n'}</span>
                <span style={{ color: "#ff7b72" }}>import </span>
                <span style={{ color: "#e6edf3" }}>{"{ cn } "}</span>
                <span style={{ color: "#ff7b72" }}>from </span>
                <span style={{ color: "#a5d6ff" }}>{'"@/lib/utils"\n\n'}</span>
                <span style={{ color: "#ff7b72" }}>export const </span>
                <span style={{ color: "#d2a8ff" }}>buttonVariants </span>
                <span style={{ color: "#e6edf3" }}>= </span>
                <span style={{ color: "#ffa657" }}>cva</span>
                <span style={{ color: "#e6edf3" }}>{"(\n"}</span>
                <span style={{ color: "#a5d6ff" }}>
                  {"  'rounded-md font-medium transition-colors'"}
                </span>
                <span style={{ color: "#e6edf3" }}>
                  {",\n  {\n    variants: {\n      variant: {\n"}
                </span>
                <span style={{ color: "#79c0ff" }}>{"        solid"}</span>
                <span style={{ color: "#e6edf3" }}>{": "}</span>
                <span style={{ color: "#a5d6ff" }}>'bg-(--accent) text-white'</span>
                <span style={{ color: "#e6edf3" }}>{",\n"}</span>
                <span style={{ color: "#79c0ff" }}>{"        outline"}</span>
                <span style={{ color: "#e6edf3" }}>{": "}</span>
                <span style={{ color: "#a5d6ff" }}>'border border-(--border)'</span>
                <span style={{ color: "#e6edf3" }}>{",\n"}</span>
                <span style={{ color: "#8b949e", fontStyle: "italic" }}>
                  {"        // ✏️  add your own variants\n"}
                </span>
                <span style={{ color: "#e6edf3" }}>{"      }\n    }\n  }\n)"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
