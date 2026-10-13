import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Label, RadioGroup, RadioItem } from "@loony/ui";

export default function RadioPage() {
  return (
    <ComponentDoc
      name="Radio"
      description="A set of checkable buttons where no more than one can be checked at a time."
      radix="https://www.radix-ui.com/primitives/docs/components/radio-group"
      aria={["radiogroup", "radio"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "horizontal", label: "Horizontal" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { RadioGroup, RadioItem, Label } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option one</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option two</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioItem value="option-3" id="r3" />
    <Label htmlFor="r3">Option three</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center gap-2">
              <RadioItem value="option-1" id="r1" />
              <Label htmlFor="r1">Option one</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioItem value="option-2" id="r2" />
              <Label htmlFor="r2">Option two</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioItem value="option-3" id="r3" />
              <Label htmlFor="r3">Option three</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Section>

      <Section id="horizontal" title="Horizontal">
        <ComponentPreview
          code={`<RadioGroup defaultValue="card" orientation="horizontal">
  <div className="flex items-center gap-2">
    <RadioItem value="card" id="card" />
    <Label htmlFor="card">Card</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioItem value="paypal" id="paypal" />
    <Label htmlFor="paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioItem value="bank" id="bank" />
    <Label htmlFor="bank">Bank transfer</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="card" orientation="horizontal" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioItem value="card" id="card" />
              <Label htmlFor="card">Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview
          code={`<RadioGroup defaultValue="option-1" disabled>
  <div className="flex items-center gap-2">
    <RadioItem value="option-1" id="rd1" />
    <Label htmlFor="rd1">Option one</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioItem value="option-2" id="rd2" />
    <Label htmlFor="rd2">Option two</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="option-1" disabled>
            <div className="flex items-center gap-2">
              <RadioItem value="option-1" id="rd1" />
              <Label htmlFor="rd1">Option one</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioItem value="option-2" id="rd2" />
              <Label htmlFor="rd2">Option two</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "defaultValue",
              type: "string",
              default: "—",
              description: "Initial selected value (uncontrolled).",
            },
            {
              name: "value",
              type: "string",
              default: "—",
              description: "Controlled selected value.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "—",
              description: "Callback when selection changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all radio items in the group.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              default: '"vertical"',
              description: "Layout direction of the group.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
