import { Section } from "@/components/component-doc";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Typography — Tokens" };

const typeScale = [
  { token: "--loony-font-size-xs", value: "0.75rem (12px)", usage: "Caption, badge, helper text" },
  {
    token: "--loony-font-size-sm",
    value: "0.875rem (14px)",
    usage: "Body small, table cells, labels",
  },
  { token: "--loony-font-size-md", value: "1rem (16px)", usage: "Default body text" },
  { token: "--loony-font-size-lg", value: "1.125rem (18px)", usage: "Large body, lead text" },
  { token: "--loony-font-size-xl", value: "1.25rem (20px)", usage: "Section heading 4" },
  { token: "--loony-font-size-2xl", value: "1.5rem (24px)", usage: "Heading 3" },
  { token: "--loony-font-size-3xl", value: "1.875rem (30px)", usage: "Heading 2" },
  { token: "--loony-font-size-4xl", value: "2.25rem (36px)", usage: "Heading 1" },
  { token: "--loony-font-size-5xl", value: "3rem (48px)", usage: "Hero heading" },
];

const weights = [
  { token: "--loony-font-weight-regular", value: "400", usage: "Body text" },
  { token: "--loony-font-weight-medium", value: "500", usage: "Label, badge" },
  { token: "--loony-font-weight-semibold", value: "600", usage: "Heading 3–4, button" },
  { token: "--loony-font-weight-bold", value: "700", usage: "Heading 1–2, strong" },
];

const lineHeights = [
  { token: "--loony-leading-none", value: "1", usage: "Single-line display text" },
  { token: "--loony-leading-tight", value: "1.25", usage: "Heading" },
  { token: "--loony-leading-snug", value: "1.375", usage: "Subheading" },
  { token: "--loony-leading-normal", value: "1.5", usage: "Body" },
  { token: "--loony-leading-relaxed", value: "1.625", usage: "Prose / article" },
];

export default function TypographyPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-(--loony-color-fg)">
          Typography
        </h1>
        <p className="text-(--loony-color-fg-muted)">
          A harmonious type scale built on a 1.25 ratio (Major Third). All values are defined as CSS
          custom properties so they respond to the user's browser font size preference.
        </p>
      </div>

      <Section title="Type scale">
        <div className="space-y-3">
          {typeScale.map(({ token, value, usage }) => (
            <div
              key={token}
              className="flex items-baseline justify-between gap-4 rounded-lg border border-(--loony-color-border) px-4 py-3"
            >
              <div className="min-w-0">
                <p
                  className="font-semibold text-(--loony-color-fg) leading-none mb-1"
                  style={{ fontSize: `var(${token})` }}
                >
                  Aa
                </p>
                <p className="font-mono text-[10px] text-(--loony-color-fg-muted)">{token}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-(--loony-color-fg)">{value}</p>
                <p className="text-[10px] text-(--loony-color-fg-muted)">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font weight">
        <div className="overflow-hidden rounded-xl border border-(--loony-color-border)">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--loony-color-border) bg-(--loony-color-surface)">
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Preview
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Token
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Value
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              {weights.map(({ token, value, usage }, i) => (
                <tr
                  key={token}
                  className={i < weights.length - 1 ? "border-b border-(--loony-color-border)" : ""}
                >
                  <td
                    className="px-4 py-3 text-(--loony-color-fg)"
                    style={{ fontWeight: `var(${token})` }}
                  >
                    The quick brown fox
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-fg)">{token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-accent)">
                    {value}
                  </td>
                  <td className="px-4 py-3 text-xs text-(--loony-color-fg-muted)">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Line height">
        <div className="overflow-hidden rounded-xl border border-(--loony-color-border)">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--loony-color-border) bg-(--loony-color-surface)">
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Token
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Value
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              {lineHeights.map(({ token, value, usage }, i) => (
                <tr
                  key={token}
                  className={
                    i < lineHeights.length - 1 ? "border-b border-(--loony-color-border)" : ""
                  }
                >
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-fg)">{token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-accent)">
                    {value}
                  </td>
                  <td className="px-4 py-3 text-xs text-(--loony-color-fg-muted)">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Font families">
        <div className="space-y-3">
          {[
            {
              token: "--loony-font-sans",
              value: "system-ui, -apple-system, sans-serif",
              usage: "All UI text",
            },
            {
              token: "--loony-font-mono",
              value: "ui-monospace, 'Cascadia Code', monospace",
              usage: "Code, kbd, token names",
            },
          ].map(({ token, value, usage }) => (
            <div key={token} className="rounded-xl border border-(--loony-color-border) p-4">
              <p className="font-mono text-xs text-(--loony-color-fg-muted) mb-1">{token}</p>
              <p
                className="text-base text-(--loony-color-fg) mb-1"
                style={{ fontFamily: `var(${token})` }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xs text-(--loony-color-fg-muted)">
                {value} — {usage}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
