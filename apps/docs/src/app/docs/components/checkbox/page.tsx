import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Checkbox, Label } from "@loony/ui";

export default function CheckboxPage() {
  return (
    <ComponentDoc
      name="Checkbox"
      description="A control that allows the user to toggle between checked, unchecked, and indeterminate states."
      radix="https://www.radix-ui.com/primitives/docs/components/checkbox"
      aria={["checkbox"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-label", label: "With label" },
        { id: "indeterminate", label: "Indeterminate" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Checkbox } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code="<Checkbox defaultChecked />">
          <Checkbox defaultChecked />
        </ComponentPreview>
      </Section>

      <Section id="with-label" title="With label">
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="indeterminate" title="Indeterminate">
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <Checkbox id="select-all" indeterminate />
  <Label htmlFor="select-all">Select all</Label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="select-all" indeterminate />
            <Label htmlFor="select-all">Select all</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview
          code={`<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-unchecked" disabled />
    <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked">Disabled checked</Label>
  </div>
</div>`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="d1" disabled />
              <Label htmlFor="d1">Disabled unchecked</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="d2" disabled defaultChecked />
              <Label htmlFor="d2">Disabled checked</Label>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "checked",
              type: "boolean | 'indeterminate'",
              default: "—",
              description: "Controlled checked state.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "—",
              description: "Initial checked state (uncontrolled).",
            },
            {
              name: "indeterminate",
              type: "boolean",
              default: "false",
              description: "Whether the checkbox is in an indeterminate state.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean | 'indeterminate') => void",
              default: "—",
              description: "Callback when checked state changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents user interaction.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
