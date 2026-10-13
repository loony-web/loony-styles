"use client";

import type { ReactNode } from "react";

function BoxIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function ZapIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function TerminalIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <BoxIcon />,
    title: "44 accessible components",
    description:
      "ARIA attributes, keyboard nav, and focus management following WCAG 2.1 AA on every component.",
  },
  {
    icon: <ShieldIcon />,
    title: "TypeScript strict mode",
    description:
      "No any, no shortcuts. Full inference across all component APIs — including complex generics.",
  },
  {
    icon: <PaletteIcon />,
    title: "3-layer token system",
    description:
      "Primitives → Semantic → Component. Override one CSS variable to retheme the entire system.",
  },
  {
    icon: <LayersIcon />,
    title: "Tailwind CSS v4",
    description:
      "CSS-native config. @layer, container queries, and zero dead code in production output.",
  },
  {
    icon: <ZapIcon />,
    title: "Radix UI primitives",
    description:
      "Dialog, Select, Accordion, Tooltip. Complex ARIA patterns handled correctly by default.",
  },
  {
    icon: <TerminalIcon />,
    title: "First-class CLI",
    description:
      "loony add, loony diff, loony update. Manage components and track upstream changes.",
  },
  {
    icon: <CodeIcon />,
    title: "React 19 + RSC ready",
    description:
      "'use client' only where needed. Server components by default, clear rationale per component.",
  },
  {
    icon: <RefreshIcon />,
    title: "Changesets pipeline",
    description:
      "Semantic versioning, automated changelogs, and canary releases with CI a11y audits.",
  },
];

export function Features() {
  return (
    <section className="px-4 py-24 md:px-6" style={{ background: "#09090b" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">
            Why Loony
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything you need. <span className="text-[#52525b]">Nothing you don't.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[#71717a]">
            Built for teams that care about quality, accessibility, and long-term maintainability.
          </p>
        </div>

        <div
          className="grid gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{
            background: "#27272a",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #27272a",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-6 transition-colors"
              style={{ background: "#09090b" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111113";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#09090b";
              }}
            >
              {i === 0 && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120px at 0% 0%, rgba(59,130,246,0.08), transparent)",
                  }}
                  aria-hidden
                />
              )}
              <div
                className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-[#71717a] transition-colors group-hover:text-[#3b82f6]"
                style={{ background: "#18181b", border: "1px solid #27272a" }}
              >
                {f.icon}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[#fafafa]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#71717a]">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
