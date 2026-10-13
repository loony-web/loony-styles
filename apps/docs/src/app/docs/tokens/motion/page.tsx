import { CodeBlock, Section } from "@/components/component-doc";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Motion — Tokens" };

const durations = [
  {
    token: "--loony-duration-instant",
    value: "0ms",
    usage: "No animation — skip for reduced motion",
  },
  {
    token: "--loony-duration-fast",
    value: "100ms",
    usage: "Micro-interactions: hover, focus ring",
  },
  { token: "--loony-duration-normal", value: "200ms", usage: "Default: most UI transitions" },
  { token: "--loony-duration-slow", value: "300ms", usage: "Modal open/close, drawer slide" },
  { token: "--loony-duration-slower", value: "500ms", usage: "Complex multi-step animations" },
];

const easings = [
  {
    token: "--loony-ease-default",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    usage: "Standard enter/exit",
  },
  {
    token: "--loony-ease-in",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    usage: "Elements leaving the screen",
  },
  {
    token: "--loony-ease-out",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    usage: "Elements entering the screen",
  },
  {
    token: "--loony-ease-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    usage: "Bouncy: tooltips, popovers",
  },
  {
    token: "--loony-ease-linear",
    value: "linear",
    usage: "Spinners, loading bars, step animations",
  },
];

export default function MotionPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-(--loony-color-fg)">Motion</h1>
        <p className="text-(--loony-color-fg-muted)">
          Motion tokens define a consistent vocabulary for duration and easing. All animated
          components respect the <code className="font-mono text-xs">prefers-reduced-motion</code>{" "}
          media query by default.
        </p>
      </div>

      <Section title="Duration">
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
              {durations.map(({ token, value, usage }, i) => (
                <tr
                  key={token}
                  className={
                    i < durations.length - 1 ? "border-b border-(--loony-color-border)" : ""
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

      <Section title="Easing">
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
              {easings.map(({ token, value, usage }, i) => (
                <tr
                  key={token}
                  className={i < easings.length - 1 ? "border-b border-(--loony-color-border)" : ""}
                >
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-fg)">{token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-(--loony-color-accent) max-w-[200px] break-all">
                    {value}
                  </td>
                  <td className="px-4 py-3 text-xs text-(--loony-color-fg-muted)">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Reduced motion">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          All Loony components apply a reduced motion override. Copy this pattern into your own
          components:
        </p>
        <CodeBlock>{`/* In your component CSS or globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* When using Motion (motion.dev) — use the hook */
import { useReducedMotion } from "motion/react"

function AnimatedCard() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    />
  )
}`}</CodeBlock>
      </Section>

      <Section title="Motion in components">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Components animate with CSS (ADR-009). Overlays key enter/exit animations off the Radix{" "}
          <code>data-state</code> attribute using <code>tw-animate-css</code> utilities, with timing
          taken from the motion tokens. Radix waits for the exit animation before unmounting, so no
          JavaScript animation library is needed.
        </p>
        <CodeBlock>{`// DialogContent
<DialogPrimitive.Content
  className={cn(
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
    "duration-(--loony-duration-normal)",
    "motion-reduce:animate-none",
  )}
/>`}</CodeBlock>
      </Section>
    </div>
  );
}
