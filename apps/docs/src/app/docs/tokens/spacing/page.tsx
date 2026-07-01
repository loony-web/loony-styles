import type { Metadata } from "next";
import { Section } from "@/components/component-doc";

export const metadata: Metadata = { title: "Spacing — Tokens" };

const spacingScale = [
  { step: "0", token: "--loony-space-0", px: "0px" },
  { step: "1", token: "--loony-space-1", px: "4px" },
  { step: "2", token: "--loony-space-2", px: "8px" },
  { step: "3", token: "--loony-space-3", px: "12px" },
  { step: "4", token: "--loony-space-4", px: "16px" },
  { step: "5", token: "--loony-space-5", px: "20px" },
  { step: "6", token: "--loony-space-6", px: "24px" },
  { step: "8", token: "--loony-space-8", px: "32px" },
  { step: "10", token: "--loony-space-10", px: "40px" },
  { step: "12", token: "--loony-space-12", px: "48px" },
  { step: "16", token: "--loony-space-16", px: "64px" },
  { step: "20", token: "--loony-space-20", px: "80px" },
  { step: "24", token: "--loony-space-24", px: "96px" },
];

const radii = [
  { token: "--loony-radius-none", value: "0px", usage: "Sharp — data tables, code blocks" },
  { token: "--loony-radius-sm", value: "4px", usage: "Badge, Tag, small chips" },
  { token: "--loony-radius-md", value: "6px", usage: "Button, Input, default" },
  { token: "--loony-radius-lg", value: "8px", usage: "Card, Dropdown" },
  { token: "--loony-radius-xl", value: "12px", usage: "Modal, Drawer, large surfaces" },
  { token: "--loony-radius-2xl", value: "16px", usage: "Hero sections, marketing" },
  { token: "--loony-radius-full", value: "9999px", usage: "Pill badge, Avatar, circular button" },
];

export default function SpacingPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-[--loony-color-fg]">Spacing</h1>
        <p className="text-[--loony-color-fg-muted]">
          A 4px base-unit spacing scale with consistent radius tokens. The scale is linear up to 24px,
          then steps in increments that match common layout patterns.
        </p>
      </div>

      <Section title="Spacing scale">
        <div className="space-y-2">
          {spacingScale.map(({ step, token, px }) => {
            const pxNum = Number.parseInt(px);
            const barWidth = Math.min(pxNum * 2, 300);
            return (
              <div key={step} className="flex items-center gap-4">
                <div className="w-8 shrink-0 text-right font-mono text-xs text-[--loony-color-fg-muted]">{step}</div>
                <div
                  className="h-4 rounded bg-[--loony-color-accent]/40 border border-[--loony-color-accent]/20"
                  style={{ width: `${Math.max(barWidth, 4)}px` }}
                />
                <div className="font-mono text-xs text-[--loony-color-fg]">{px}</div>
                <div className="font-mono text-xs text-[--loony-color-fg-muted]">{token}</div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Border radius">
        <div className="overflow-hidden rounded-xl border border-[--loony-color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--loony-color-border] bg-[--loony-color-surface]">
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Preview</th>
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Token</th>
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Value</th>
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Usage</th>
              </tr>
            </thead>
            <tbody>
              {radii.map(({ token, value, usage }, i) => (
                <tr key={token} className={i < radii.length - 1 ? "border-b border-[--loony-color-border]" : ""}>
                  <td className="px-4 py-3">
                    <div
                      className="h-8 w-12 bg-[--loony-color-accent]/20 border border-[--loony-color-accent]/40"
                      style={{ borderRadius: value }}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[--loony-color-fg]">{token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[--loony-color-accent]">{value}</td>
                  <td className="px-4 py-3 text-xs text-[--loony-color-fg-muted]">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage in components">
        <div className="prose text-sm text-[--loony-color-fg-muted]">
          <p className="mb-2">
            Components use spacing tokens for internal padding, gap, and sizing. Never hardcode pixel values in components —
            always reference a token so the system stays consistent.
          </p>
          <p>
            Tailwind v4's arbitrary value syntax lets you reference tokens directly:
          </p>
        </div>
        <div className="my-4 rounded-xl border border-[--loony-color-border] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[--loony-color-border] bg-[--loony-color-surface] px-4 py-2.5">
            <span className="text-xs text-[--loony-color-fg-muted]">tsx</span>
          </div>
          <pre className="overflow-x-auto bg-[--loony-color-bg] p-5">
            <code className="font-mono text-xs leading-relaxed text-[--loony-color-fg]">{`{/* Tailwind arbitrary values reference tokens */}
<div className="p-[--loony-space-4] gap-[--loony-space-2]">
  ...
</div>

{/* Or use Tailwind's default scale (1 unit = 4px) */}
<div className="p-4 gap-2">
  ...
</div>`}</code>
          </pre>
        </div>
      </Section>
    </div>
  );
}
