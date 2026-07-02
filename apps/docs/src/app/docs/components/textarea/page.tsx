import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Textarea, Label, FormField } from "@loony/ui";

export default function TextareaPage() {
  return (
    <ComponentDoc
      name="Textarea"
      description="A multi-line text input control."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-label", label: "With label" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Textarea } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Textarea placeholder="Type your message here." />`}
        >
          <div className="w-64">
            <Textarea placeholder="Type your message here." />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="with-label" title="With label">
        <ComponentPreview
          code={`<div className="grid gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." rows={4} />
  <p className="text-xs text-muted-foreground">
    Your message will be copied to the support team.
  </p>
</div>`}
        >
          <div className="grid w-64 gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea id="message" placeholder="Type your message here." rows={4} />
            <p className="text-xs text-[--loony-color-fg-muted]">
              Your message will be copied to the support team.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview
          code={`<Textarea disabled placeholder="You cannot edit this." />`}
        >
          <div className="w-64">
            <Textarea disabled placeholder="You cannot edit this." />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "placeholder", type: "string", default: "—", description: "Placeholder text." },
            { name: "rows", type: "number", default: "3", description: "Number of visible text rows." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents user interaction." },
            { name: "value", type: "string", default: "—", description: "Controlled value." },
            { name: "onChange", type: "ChangeEventHandler<HTMLTextAreaElement>", default: "—", description: "Callback when value changes." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
