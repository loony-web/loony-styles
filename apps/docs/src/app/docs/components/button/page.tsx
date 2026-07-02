import type { Metadata } from "next";
import { Button } from "@loony/ui";
import { ComponentDoc, ComponentPreview, Section } from "@/components/component-doc";

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
        { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and sets aria-disabled." },
        { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label." },
        { name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label." },
        { name: "asChild", type: "boolean", default: "false", description: "Merges button props onto a single child element (Slot pattern)." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the button via the native disabled attribute." },
      ]}
    >
      <Section title="Variants">
        <ComponentPreview
          code={`import { Button } from "@/components/ui/button"

<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-outline">Danger Outline</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-outline">Danger Outline</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Sizes">
        <ComponentPreview
          code={`<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XLarge</Button>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XSmall</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="With icons">
        <ComponentPreview
          code={`import { PlusIcon, ArrowRightIcon } from "@loony/icons"

<Button leftIcon={<PlusIcon />}>New component</Button>
<Button rightIcon={<ArrowRightIcon />} variant="outline">Learn more</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              New component
            </Button>
            <Button
              variant="outline"
              rightIcon={
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
            >
              Learn more
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Loading state">
        <ComponentPreview
          code={`<Button loading>Saving changes...</Button>
<Button loading variant="outline">Uploading...</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button loading>Saving changes...</Button>
            <Button loading variant="outline">Uploading...</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Disabled">
        <ComponentPreview
          code={`<Button disabled>Cannot click</Button>
<Button disabled variant="outline">Cannot click</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button disabled>Cannot click</Button>
            <Button disabled variant="outline">Cannot click</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="asChild (polymorphism)">
        <ComponentPreview
          code={`import Link from "next/link"

// Renders as <a> with all Button styles applied
<Button asChild>
  <Link href="/docs">Go to docs</Link>
</Button>

// Any element or component works
<Button asChild variant="outline">
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
    GitHub ↗
  </a>
</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="/docs">Go to docs</a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </Button>
          </div>
        </ComponentPreview>
      </Section>
    </ComponentDoc>
  );
}
