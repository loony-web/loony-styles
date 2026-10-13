import { CodeBlock, Section } from "@/components/component-doc";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Theming — Loony" };

export default function ThemingPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-(--loony-color-fg)">Theming</h1>
        <p className="text-(--loony-color-fg-muted)">
          Loony uses a three-layer CSS custom property system: Primitives → Semantic → Component.
          All tokens are defined in <code className="font-mono text-xs">@loony/tokens</code> and
          consumed as CSS variables.
        </p>
      </div>

      <Section title="Token layers">
        <div className="space-y-4">
          {[
            {
              layer: "Primitives",
              file: "@loony/tokens/src/primitives.css",
              description:
                "Raw oklch values — colors, radii, font sizes, spacing scale. Never used directly in components.",
              example: `/* primitives.css */
@layer loony.primitives {
  :root {
    --loony-primitive-violet-50: oklch(0.97 0.02 290);
    --loony-primitive-violet-500: oklch(0.55 0.22 290);
    --loony-primitive-violet-900: oklch(0.22 0.10 290);
  }
}`,
            },
            {
              layer: "Semantic",
              file: "@loony/tokens/src/semantic.css",
              description:
                "Named intent tokens that map primitives to meaning. Light and dark values defined here.",
              example: `/* semantic.css */
@layer loony.semantic {
  :root {
    --loony-color-accent: var(--loony-primitive-violet-500);
    --loony-color-bg: oklch(1 0 0);
    --loony-color-fg: oklch(0.15 0 0);
    --loony-color-border: oklch(0.9 0 0);
  }
  .dark {
    --loony-color-accent: var(--loony-primitive-violet-400);
    --loony-color-bg: oklch(0.12 0.005 260);
    --loony-color-fg: oklch(0.97 0 0);
    --loony-color-border: oklch(0.25 0.005 260);
  }
}`,
            },
            {
              layer: "Component",
              file: "component-level via CVA",
              description:
                "Per-component custom properties set on the element. Lets variants override only what they need.",
              example: `/* Set on the .progress element */
.progress[data-color="success"] {
  [--progress-fill]: var(--loony-color-success);
}

/* The track reads it */
.progress-indicator {
  background: var(--progress-fill, var(--loony-color-accent));
}`,
            },
          ].map(({ layer, file, description, example }) => (
            <div key={layer} className="rounded-xl border border-(--loony-color-border) p-5">
              <div className="mb-1 flex items-center gap-3">
                <span className="font-semibold text-(--loony-color-fg)">{layer}</span>
                <code className="rounded bg-(--loony-color-surface) px-1.5 py-0.5 font-mono text-xs text-(--loony-color-fg-muted)">
                  {file}
                </code>
              </div>
              <p className="mb-3 text-sm text-(--loony-color-fg-muted)">{description}</p>
              <CodeBlock>{example}</CodeBlock>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dark mode">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Dark mode is opt-in via the <code className="font-mono text-xs">.dark</code> class on{" "}
          <code className="font-mono text-xs">&lt;html&gt;</code>. All semantic tokens redefine
          their values inside <code className="font-mono text-xs">.dark &#123; &#125;</code>.
        </p>
        <CodeBlock>{`// Toggle dark mode
document.documentElement.classList.toggle("dark")

// Or set explicitly
document.documentElement.classList.add("dark")
document.documentElement.classList.remove("dark")

// With next-themes (recommended for Next.js)
import { ThemeProvider } from "next-themes"

export default function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}`}</CodeBlock>
      </Section>

      <Section title="Customizing tokens">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Override any semantic token in your own CSS. Since tokens use{" "}
          <code className="font-mono text-xs">@layer</code>, your overrides win automatically
          without specificity tricks.
        </p>
        <CodeBlock>{`/* globals.css */
@import "tailwindcss";
@import "@loony/tokens/css"; /* base tokens */

/* Override accent color to brand blue */
:root {
  --loony-color-accent: oklch(0.55 0.18 235);
  --loony-color-accent-hover: oklch(0.48 0.18 235);
}

.dark {
  --loony-color-accent: oklch(0.65 0.18 235);
}`}</CodeBlock>
      </Section>

      <Section title="Using tokens in Tailwind">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Tokens are available as arbitrary CSS variable values in Tailwind utilities.
        </p>
        <CodeBlock>{`{/* Use semantic tokens directly */}
<div className="bg-(--loony-color-surface) text-(--loony-color-fg)">
  <p className="text-(--loony-color-fg-muted)">Muted text</p>
  <button className="bg-(--loony-color-accent) text-white">
    Click me
  </button>
</div>`}</CodeBlock>
      </Section>

      <Section title="Available semantic tokens">
        <div className="overflow-hidden rounded-xl border border-(--loony-color-border)">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--loony-color-border) bg-(--loony-color-surface)">
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Token
                </th>
                <th className="px-4 py-3 text-left font-medium text-(--loony-color-fg-muted)">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--loony-color-bg", "Page background"],
                ["--loony-color-surface", "Card / panel / input background"],
                ["--loony-color-surface-hover", "Hovered surface state"],
                ["--loony-color-border", "Default border / divider"],
                ["--loony-color-fg", "Primary text"],
                ["--loony-color-fg-muted", "Secondary / placeholder text"],
                ["--loony-color-accent", "Brand primary (interactive)"],
                ["--loony-color-accent-hover", "Hovered accent"],
                ["--loony-color-ring", "Focus ring"],
                ["--loony-color-success", "Success state"],
                ["--loony-color-warning", "Warning state"],
                ["--loony-color-danger", "Error / destructive state"],
                ["--loony-color-info", "Informational state"],
                ["--loony-radius-sm / md / lg / xl", "Border radius scale"],
                ["--loony-shadow-sm / md / lg", "Box shadow scale"],
              ].map(([token, purpose], i, arr) => (
                <tr
                  key={token}
                  className={i < arr.length - 1 ? "border-b border-(--loony-color-border)" : ""}
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-(--loony-color-fg)">{token}</td>
                  <td className="px-4 py-2.5 text-xs text-(--loony-color-fg-muted)">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
