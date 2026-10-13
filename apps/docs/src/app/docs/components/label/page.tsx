import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Checkbox, Input, Label } from "@loony/ui";

export default function LabelPage() {
  return (
    <ComponentDoc
      name="Label"
      description="An accessible label component for form elements."
      radix="https://www.radix-ui.com/primitives/docs/components/label"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-checkbox", label: "With checkbox" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Label } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<div className="grid gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
        >
          <div className="grid w-64 gap-1.5">
            <Label htmlFor="lbl-email">Email address</Label>
            <Input id="lbl-email" type="email" placeholder="you@example.com" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="with-checkbox" title="With checkbox">
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <Checkbox id="newsletter" />
  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "htmlFor",
              type: "string",
              default: "—",
              description: "The id of the form element the label is associated with.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
