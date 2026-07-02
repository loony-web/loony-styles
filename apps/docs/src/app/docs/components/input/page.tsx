import type { Metadata } from "next";
import { Input, Label } from "@loony/ui";
import { ComponentDoc, ComponentPreview, Section } from "@/components/component-doc";

export const metadata: Metadata = { title: "Input" };

export default function InputPage() {
  return (
    <ComponentDoc
      name="Input"
      description="A text input with size variants, validation state, and optional leading/trailing element slots."
      aria={["textbox"]}
      status="stable"
      props={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls height and font size." },
        { name: "leftElement", type: "ReactNode", description: "Content rendered inside the input on the left (icon, prefix)." },
        { name: "rightElement", type: "ReactNode", description: "Content rendered inside the input on the right (icon, clear button)." },
        { name: "invalid", type: "boolean", default: "false", description: "Applies error ring and sets aria-invalid." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
        { name: "readOnly", type: "boolean", default: "false", description: "Makes the input read-only." },
      ]}
    >
      <Section title="Default">
        <ComponentPreview
          code={`import { Input, Label } from "@/components/ui/input"

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="api-key">API Key</Label>
  <Input id="api-key" placeholder="sk-..." />
  <p className="text-sm text-muted-foreground">
    Your API key is encrypted and stored securely.
  </p>
</div>`}
        >
          <div className="grid w-72 gap-1.5">
            <Label htmlFor="api-key-demo">API Key</Label>
            <Input id="api-key-demo" placeholder="sk-..." />
            <p className="text-sm text-[--loony-color-fg-muted]">
              Your API key is encrypted and stored securely.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="With icon">
        <ComponentPreview
          code={`import { SearchIcon } from "@loony/icons"
import { Input } from "@/components/ui/input"

<Input
  placeholder="Search components..."
  leftElement={<SearchIcon className="h-4 w-4" aria-hidden />}
/>`}
        >
          <div className="w-72">
            <Input
              placeholder="Search components..."
              leftElement={
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              }
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Sizes">
        <ComponentPreview
          code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />`}
        >
          <div className="flex w-72 flex-col gap-3">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Error state">
        <ComponentPreview
          code={`<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    defaultValue="not-an-email"
    invalid
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-danger">
    Please enter a valid email address.
  </p>
</div>`}
        >
          <div className="grid w-72 gap-1.5">
            <Label htmlFor="email-demo">Email</Label>
            <Input
              id="email-demo"
              type="email"
              defaultValue="not-an-email"
              invalid
              aria-describedby="email-error-demo"
            />
            <p id="email-error-demo" className="text-sm text-[--loony-color-danger]">
              Please enter a valid email address.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Disabled">
        <ComponentPreview
          code={`<Input disabled placeholder="Disabled input" />`}
        >
          <div className="w-72">
            <Input disabled placeholder="Disabled input" />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Accessibility">
        <div className="text-sm text-[--loony-color-fg-muted] space-y-2">
          <p>Always associate an <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">Input</code> with a <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">Label</code> via <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">htmlFor</code>/<code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">id</code>.</p>
          <p>When <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">invalid</code> is true, <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">aria-invalid="true"</code> is set so screen readers announce the error state.</p>
          <p>Use <code className="rounded bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">aria-describedby</code> to connect the input to an error message element.</p>
        </div>
      </Section>
    </ComponentDoc>
  );
}
