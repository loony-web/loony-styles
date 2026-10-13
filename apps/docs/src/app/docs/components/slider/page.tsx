import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Slider } from "@loony/ui";

export default function SliderPage() {
  return (
    <ComponentDoc
      name="Slider"
      description="An input where the user selects a value from within a given range."
      radix="https://www.radix-ui.com/primitives/docs/components/slider"
      aria={["slider"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "sizes", label: "Sizes" },
        { id: "range", label: "Range" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Slider } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={`<Slider defaultValue={[40]} max={100} step={1} label="Volume" />`}>
          <div className="w-64">
            <Slider defaultValue={[40]} max={100} step={1} label="Volume" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Slider size="sm" defaultValue={[30]} label="Small" />
<Slider size="md" defaultValue={[50]} label="Medium" />
<Slider size="lg" defaultValue={[70]} label="Large" />`}
        >
          <div className="flex w-64 flex-col gap-6">
            <Slider size="sm" defaultValue={[30]} label="Small" />
            <Slider size="md" defaultValue={[50]} label="Medium" />
            <Slider size="lg" defaultValue={[70]} label="Large" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="range" title="Range slider">
        <ComponentPreview
          code={`<Slider defaultValue={[25, 75]} max={100} step={1} label="Price range" />`}
        >
          <div className="w-64">
            <Slider defaultValue={[25, 75]} max={100} step={1} label="Price range" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "defaultValue",
              type: "number[]",
              default: "—",
              description: "Initial value(s) (uncontrolled).",
            },
            { name: "value", type: "number[]", default: "—", description: "Controlled value(s)." },
            {
              name: "onValueChange",
              type: "(value: number[]) => void",
              default: "—",
              description: "Callback on value change.",
            },
            { name: "min", type: "number", default: "0", description: "Minimum allowed value." },
            { name: "max", type: "number", default: "100", description: "Maximum allowed value." },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "Step size between values.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Track and thumb size.",
            },
            {
              name: "label",
              type: "string",
              default: "—",
              description: "Accessible label (aria-label).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
