import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Progress } from "@loony/ui";

export default function ProgressPage() {
  return (
    <ComponentDoc
      name="Progress"
      description="Displays an indicator showing the completion progress of a task."
      radix="https://www.radix-ui.com/primitives/docs/components/progress"
      aria={["progressbar"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "sizes", label: "Sizes" },
        { id: "color-schemes", label: "Color schemes" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Progress } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={`<Progress value={60} label="Upload progress" />`}>
          <div className="w-64">
            <Progress value={60} label="Upload progress" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Progress size="xs" value={80} />
<Progress size="sm" value={60} />
<Progress size="md" value={40} />
<Progress size="lg" value={20} />`}
        >
          <div className="flex w-64 flex-col gap-4">
            <Progress size="xs" value={80} label="xs" />
            <Progress size="sm" value={60} label="sm" />
            <Progress size="md" value={40} label="md" />
            <Progress size="lg" value={20} label="lg" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="color-schemes" title="Color schemes">
        <ComponentPreview
          code={`<Progress colorScheme="accent" value={75} />
<Progress colorScheme="success" value={60} />
<Progress colorScheme="warning" value={45} />
<Progress colorScheme="danger" value={30} />`}
        >
          <div className="flex w-64 flex-col gap-4">
            <Progress colorScheme="accent" value={75} label="accent" />
            <Progress colorScheme="success" value={60} label="success" />
            <Progress colorScheme="warning" value={45} label="warning" />
            <Progress colorScheme="danger" value={30} label="danger" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "value", type: "number", default: "0", description: "Current progress value (0–100)." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: "Height of the progress bar." },
            { name: "colorScheme", type: '"accent" | "success" | "warning" | "danger"', default: '"accent"', description: "Color of the filled indicator." },
            { name: "label", type: "string", default: "—", description: "Accessible label (aria-label)." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
