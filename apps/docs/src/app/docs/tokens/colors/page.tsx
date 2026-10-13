import { Section } from "@/components/component-doc";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Colors — Tokens" };

const colorGroups = [
  {
    label: "Background",
    tokens: [
      {
        name: "--loony-color-bg",
        description: "Page background",
        swatch: "bg-white dark:bg-[oklch(0.12_0.005_260)]",
      },
      { name: "--loony-color-surface", description: "Card / input background" },
      { name: "--loony-color-surface-hover", description: "Hovered surface" },
    ],
  },
  {
    label: "Foreground",
    tokens: [
      { name: "--loony-color-fg", description: "Primary text" },
      { name: "--loony-color-fg-muted", description: "Secondary / placeholder text" },
    ],
  },
  {
    label: "Accent (Brand)",
    tokens: [
      { name: "--loony-color-accent", description: "Interactive primary" },
      { name: "--loony-color-accent-hover", description: "Hovered accent" },
      { name: "--loony-color-accent-subtle", description: "Low-contrast accent surface" },
    ],
  },
  {
    label: "Semantic",
    tokens: [
      { name: "--loony-color-success", description: "Positive / confirmed" },
      { name: "--loony-color-success-subtle", description: "Success surface" },
      { name: "--loony-color-warning", description: "Caution / pending" },
      { name: "--loony-color-warning-subtle", description: "Warning surface" },
      { name: "--loony-color-danger", description: "Error / destructive" },
      { name: "--loony-color-danger-subtle", description: "Danger surface" },
      { name: "--loony-color-info", description: "Informational" },
      { name: "--loony-color-info-subtle", description: "Info surface" },
    ],
  },
  {
    label: "Border & Ring",
    tokens: [
      { name: "--loony-color-border", description: "Default border / divider" },
      { name: "--loony-color-ring", description: "Focus ring" },
    ],
  },
];

export default function ColorsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-(--loony-color-fg)">Colors</h1>
        <p className="text-(--loony-color-fg-muted)">
          All colors are defined as CSS custom properties using the{" "}
          <code className="font-mono text-xs">oklch()</code> color space for perceptually uniform
          lightness across variants and dark mode.
        </p>
      </div>

      <Section title="Color scale">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          The accent color uses a 10-step scale (50–900) built from primitives. All other roles
          reference this scale via semantic tokens.
        </p>
        <div className="flex gap-1 rounded-xl overflow-hidden border border-(--loony-color-border)">
          {["97%", "93%", "85%", "75%", "65%", "55%", "45%", "35%", "25%", "15%"].map((l, i) => (
            <div
              key={i}
              className="flex-1 h-16"
              style={{ background: `oklch(${l} 0.22 290)` }}
              title={`violet-${(i + 1) * 100}`}
            />
          ))}
        </div>
        <div className="mt-1 flex px-0.5">
          {["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((step) => (
            <div
              key={step}
              className="flex-1 text-center text-[10px] text-(--loony-color-fg-muted)"
            >
              {step}
            </div>
          ))}
        </div>
      </Section>

      {colorGroups.map((group) => (
        <Section key={group.label} title={group.label}>
          <div className="overflow-hidden rounded-xl border border-(--loony-color-border)">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--loony-color-border) bg-(--loony-color-surface)">
                  <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted) w-8">
                    Swatch
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                    Token
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((token, i) => (
                  <tr
                    key={token.name}
                    className={
                      i < group.tokens.length - 1 ? "border-b border-(--loony-color-border)" : ""
                    }
                  >
                    <td className="px-4 py-3">
                      <div
                        className="h-5 w-5 rounded border border-(--loony-color-border)"
                        style={{ background: `var(${token.name})` }}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-(--loony-color-fg)">
                      {token.name}
                    </td>
                    <td className="px-4 py-3 text-xs text-(--loony-color-fg-muted)">
                      {token.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}

      <Section title="Using oklch()">
        <div className="prose text-sm">
          <p className="mb-3 text-(--loony-color-fg-muted)">
            <code className="font-mono text-xs">oklch(L C H)</code> gives perceptually uniform
            lightness. Adjusting only <em>L</em> produces lighter/darker variants that feel evenly
            spaced to the human eye — unlike HSL where yellows and blues appear at different
            brightness levels even with the same L value.
          </p>
        </div>
        <div className="rounded-xl border border-(--loony-color-border) p-5 font-mono text-xs text-(--loony-color-fg)">
          <p className="text-(--loony-color-fg-muted) mb-2">
            {"/* oklch(Lightness Chroma Hue) */"}
          </p>
          <p>
            oklch(0.97 0.02 290){" "}
            <span className="text-(--loony-color-fg-muted)">{"/* violet-50: very light */"}</span>
          </p>
          <p>
            oklch(0.55 0.22 290){" "}
            <span className="text-(--loony-color-fg-muted)">{"/* violet-500: base accent */"}</span>
          </p>
          <p>
            oklch(0.22 0.10 290){" "}
            <span className="text-(--loony-color-fg-muted)">{"/* violet-900: very dark */"}</span>
          </p>
        </div>
      </Section>
    </div>
  );
}
