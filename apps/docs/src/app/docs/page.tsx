import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/component-doc";

export const metadata: Metadata = { title: "Introduction" };

const packages = [
  { name: "@loony/ui",    description: "44 React components — copy-based",   badge: "copy" },
  { name: "@loony/tokens", description: "Design tokens + CSS custom props",  badge: "npm"  },
  { name: "@loony/icons",  description: "26 accessible SVG icon components", badge: "npm"  },
  { name: "@loony/utils",  description: "Hooks, Slot, Portal, Presence",     badge: "npm"  },
  { name: "loony (CLI)",   description: "init · add · diff · theme",         badge: "npx"  },
];

const principles = [
  {
    icon: "⬡",
    title: "Ownership over abstraction",
    body: "You copy source files, not npm packages. The component is yours the moment you add it — no abstraction between you and your UI.",
  },
  {
    icon: "⌨",
    title: "Accessibility first",
    body: "Every component is WCAG 2.1 AA compliant with correct ARIA roles, keyboard navigation, and focus management.",
  },
  {
    icon: "∅",
    title: "Zero-compromise TypeScript",
    body: "Strict mode throughout. No any, no @ts-ignore, no workarounds. Types that actually help you.",
  },
  {
    icon: "◈",
    title: "CSS variables, not JS themes",
    body: "Theming happens in CSS. No React context overhead, no flash of unstyled content, instant dark mode.",
  },
];

const badgeColors = {
  copy: { bg: "oklch(0.546 0.245 262.881 / 0.1)", fg: "oklch(0.546 0.245 262.881)" },
  npm:  { bg: "oklch(0.70 0.2 145 / 0.1)",        fg: "oklch(0.50 0.2 145)"         },
  npx:  { bg: "oklch(0.78 0.18 80 / 0.12)",        fg: "oklch(0.55 0.18 80)"         },
};

function getBadgeColors(badge: string): { bg: string; fg: string } {
  if (badge === "copy") return badgeColors.copy;
  if (badge === "npx") return badgeColors.npx;
  return badgeColors.npm;
}

export default function DocsIntroPage() {
  return (
    <div className="max-w-[720px]">
      {/* Breadcrumb */}
      <p className="mb-2 text-xs text-[--loony-color-fg-muted]">
        Docs
      </p>

      {/* Title */}
      <div className="mb-6 border-b border-[--loony-color-border] pb-6">
        <div className="mb-3 flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-[--loony-color-fg]">Introduction</h1>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium"
            style={{ background: "oklch(0.546 0.245 262.881 / 0.08)", color: "oklch(0.546 0.245 262.881)", borderColor: "oklch(0.546 0.245 262.881 / 0.2)" }}
          >
            v0.1.0-alpha
          </span>
        </div>
        <p className="text-[1.0625rem] leading-relaxed text-[--loony-color-fg-muted]">
          Loony is a production-grade React component ecosystem. Components live in{" "}
          <em>your</em> codebase — not in a dependency you consume.
        </p>
      </div>

      {/* Intro */}
      <section className="mb-10 space-y-3 text-[--loony-color-fg-muted]">
        <p>
          Run <code className="rounded-md border border-[--loony-color-border] bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs text-[--loony-color-fg]">loony add button</code> and the source file lands directly in your project. You read it, understand it, and modify it freely.
        </p>
        <p>No black boxes. No update anxiety. No fighting abstractions you don't control.</p>
      </section>

      {/* Design principles */}
      <section className="mb-12">
        <h2 className="mb-5 text-base font-semibold text-[--loony-color-fg]">Design principles</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-[--loony-color-border] p-5">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="text-base text-[--loony-color-fg-muted]" aria-hidden>{p.icon}</span>
                <h3 className="text-sm font-semibold text-[--loony-color-fg]">{p.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[--loony-color-fg-muted]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="mb-12">
        <h2 className="mb-5 text-base font-semibold text-[--loony-color-fg]">Packages</h2>
        <div className="overflow-hidden rounded-xl border border-[--loony-color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--loony-color-border] bg-[--loony-color-surface]">
                {["Package", "Description", "Distribution"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-[--loony-color-fg-muted]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.map((p, i) => {
                const colors = getBadgeColors(p.badge);
                return (
                  <tr key={p.name} className={i < packages.length - 1 ? "border-b border-[--loony-color-border]" : ""}>
                    <td className="px-4 py-3 font-mono text-xs font-medium text-[--loony-color-fg]">{p.name}</td>
                    <td className="px-4 py-3 text-xs text-[--loony-color-fg-muted]">{p.description}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium" style={{ background: colors.bg, color: colors.fg, borderColor: colors.fg + "33" }}>
                        {p.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick start */}
      <section className="mb-10">
        <h2 className="mb-5 text-base font-semibold text-[--loony-color-fg]">Quick start</h2>
        <CodeBlock language="bash">{`# 1. Initialize Loony in your project
npx loony init

# 2. Add components
loony add button dialog toast

# 3. Import and use — from your own files
import { Button } from "@/components/ui/button"

<Button variant="solid">Hello Loony</Button>`}</CodeBlock>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "oklch(0.546 0.245 262.881)" }}
        >
          Installation guide →
        </Link>
        <Link
          href="/docs/components/button"
          className="inline-flex items-center gap-2 rounded-lg border border-[--loony-color-border] px-5 py-2.5 text-sm font-medium text-[--loony-color-fg] transition-colors hover:bg-[--loony-color-surface]"
        >
          Browse components
        </Link>
      </div>
    </div>
  );
}
