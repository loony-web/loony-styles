import type { Metadata } from "next";
import { CodeBlock, ComponentDoc, Preview, Section } from "@/components/component-doc";

export const metadata: Metadata = { title: "Button" };

export default function ButtonPage() {
  return (
    <ComponentDoc
      name="Button"
      description="The primary interactive element. Supports 7 variants, 5 sizes, loading state, and the asChild pattern for polymorphic rendering."
      aria={["button"]}
      status="stable"
      props={[
        { name: "variant", type: '"solid" | "outline" | "ghost" | "link" | "danger" | "danger-outline" | "danger-ghost"', default: '"solid"', description: "Visual style of the button." },
        { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Controls padding and font size." },
        { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and sets aria-disabled. The button is not removed from the tab order." },
        { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label." },
        { name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label." },
        { name: "asChild", type: "boolean", default: "false", description: "Merges button props onto a single child element (Slot pattern)." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the button via the native disabled attribute." },
      ]}
    >
      <Section title="Variants">
        <Preview>
          <div className="flex flex-wrap gap-3">
            {["solid", "outline", "ghost", "link", "danger"].map((v) => (
              <button
                key={v}
                type="button"
                className={[
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  v === "solid" && "bg-[--loony-color-accent] text-white hover:opacity-90",
                  v === "outline" && "border border-[--loony-color-border] text-[--loony-color-fg] hover:bg-[--loony-color-surface-hover]",
                  v === "ghost" && "text-[--loony-color-fg] hover:bg-[--loony-color-surface-hover]",
                  v === "link" && "text-[--loony-color-accent] underline underline-offset-4 hover:opacity-80",
                  v === "danger" && "bg-[--loony-color-danger] text-white hover:opacity-90",
                ].filter(Boolean).join(" ")}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </Preview>
        <CodeBlock>{`import { Button } from "@/components/ui/button"

<Button variant="solid">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Delete</Button>`}</CodeBlock>
      </Section>

      <Section title="Sizes">
        <Preview label="xs → xl">
          <div className="flex flex-wrap items-center gap-3">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => {
              const px = { xs: "px-2.5 py-1 text-xs", sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base", xl: "px-6 py-3 text-lg" }[size];
              return (
                <button key={size} type="button" className={`rounded-md bg-[--loony-color-accent] font-medium text-white ${px}`}>
                  {size}
                </button>
              );
            })}
          </div>
        </Preview>
        <CodeBlock>{`<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XLarge</Button>`}</CodeBlock>
      </Section>

      <Section title="Loading state">
        <Preview>
          <button type="button" disabled aria-disabled className="inline-flex items-center gap-2 rounded-md bg-[--loony-color-accent] px-4 py-2 text-sm font-medium text-white opacity-70">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Loading...
          </button>
        </Preview>
        <CodeBlock>{`<Button loading>Saving...</Button>

// loading=true sets aria-disabled and shows a Spinner
// The button remains focusable for screen reader announcements`}</CodeBlock>
      </Section>

      <Section title="asChild (polymorphism)">
        <CodeBlock>{`import Link from "next/link"
import { Button } from "@/components/ui/button"

// Renders as <a> with all Button styles and props merged
<Button asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>

// Works with any element or component
<Button asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External link
  </a>
</Button>`}</CodeBlock>
      </Section>

      <Section title="Accessibility">
        <div className="prose text-sm">
          <ul>
            <li>Renders a native <code>{"<button>"}</code> with <code>type="button"</code> by default — prevents accidental form submission.</li>
            <li>When <code>loading</code> is true, <code>aria-disabled</code> is set (not <code>disabled</code>) so the element remains reachable by screen readers.</li>
            <li>When <code>disabled</code> is true, the native <code>disabled</code> attribute removes it from the tab order entirely.</li>
            <li>Icon-only buttons should use <code>{"<IconButton>"}</code> instead, which requires an accessible <code>label</code>.</li>
          </ul>
        </div>
      </Section>
    </ComponentDoc>
  );
}
