import type { Metadata } from "next";
import { CodeBlock, ComponentDoc, Preview, Section } from "@/components/component-doc";

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
        { name: "isInvalid", type: "boolean", default: "false", description: "Applies error ring and sets aria-invalid." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
        { name: "readOnly", type: "boolean", default: "false", description: "Makes the input read-only." },
      ]}
    >
      <Section title="Basic usage">
        <Preview>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-64 rounded-md border border-[--loony-color-border] bg-[--loony-color-bg] px-3 py-2 text-sm text-[--loony-color-fg] placeholder:text-[--loony-color-fg-muted] focus:outline-none focus:ring-2 focus:ring-[--loony-color-ring]"
          />
        </Preview>
        <CodeBlock>{`import { Input } from "@/components/ui/input"

<Input placeholder="Enter your name" />`}</CodeBlock>
      </Section>

      <Section title="Validation state">
        <Preview>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              defaultValue="not-an-email"
              aria-invalid
              className="w-64 rounded-md border border-[--loony-color-danger] bg-[--loony-color-bg] px-3 py-2 text-sm text-[--loony-color-fg] ring-2 ring-[--loony-color-danger]/30 focus:outline-none"
            />
            <p className="text-xs text-[--loony-color-danger]">Please enter a valid email address.</p>
          </div>
        </Preview>
        <CodeBlock>{`<FormField
  label="Email"
  htmlFor="email"
  errorMessage="Please enter a valid email address."
>
  <Input id="email" type="email" isInvalid defaultValue="not-an-email" />
</FormField>`}</CodeBlock>
      </Section>

      <Section title="With icons">
        <Preview>
          <div className="relative w-64">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[--loony-color-fg-muted]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-[--loony-color-border] bg-[--loony-color-bg] py-2 pl-9 pr-3 text-sm text-[--loony-color-fg] placeholder:text-[--loony-color-fg-muted] focus:outline-none focus:ring-2 focus:ring-[--loony-color-ring]"
            />
          </div>
        </Preview>
        <CodeBlock>{`import { SearchIcon } from "@loony/icons"

<Input
  placeholder="Search..."
  leftElement={<SearchIcon className="h-4 w-4" aria-hidden />}
/>`}</CodeBlock>
      </Section>

      <Section title="Accessibility">
        <div className="prose text-sm">
          <ul>
            <li>Always associate an <code>{"<Input>"}</code> with a <code>{"<Label>"}</code> via <code>htmlFor</code>/<code>id</code> — or use <code>{"<FormField>"}</code> which handles this automatically.</li>
            <li>When <code>isInvalid</code> is true, <code>aria-invalid="true"</code> is set so screen readers announce the error state.</li>
            <li>Use <code>aria-describedby</code> to connect the input to an error message element, or use <code>{"<FormField>"}</code> which wires this up automatically.</li>
          </ul>
        </div>
      </Section>
    </ComponentDoc>
  );
}
