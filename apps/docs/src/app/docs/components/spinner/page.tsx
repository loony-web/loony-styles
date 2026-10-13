import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Spinner } from "@loony/ui";

export default function SpinnerPage() {
  return (
    <ComponentDoc
      name="Spinner"
      description="An animated loading indicator that communicates an ongoing process to the user."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "sizes", label: "Sizes" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Spinner } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={"<Spinner />"}>
          <Spinner />
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Size of the spinner.",
            },
            {
              name: "label",
              type: "string",
              default: '"Loading"',
              description: "Accessible label. Pass empty string to hide from screen readers.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
