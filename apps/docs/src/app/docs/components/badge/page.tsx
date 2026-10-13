import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Badge } from "@loony/ui";

export default function BadgePage() {
  return (
    <ComponentDoc
      name="Badge"
      description="Small status indicator or label for categorization, counts, and statuses."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "sizes", label: "Sizes" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Badge } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code="<Badge>New</Badge>">
          <Badge>New</Badge>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<Badge variant="solid">Solid</Badge>
<Badge variant="subtle">Subtle</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="success-subtle">Success subtle</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="danger-subtle">Danger subtle</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="warning-subtle">Warning subtle</Badge>`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="solid">Solid</Badge>
            <Badge variant="subtle">Subtle</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="success-subtle">Success subtle</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="danger-subtle">Danger subtle</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="warning-subtle">Warning subtle</Badge>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
        >
          <div className="flex items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"solid" | "subtle" | "outline" | "danger" | "danger-subtle" | "success" | "success-subtle" | "warning" | "warning-subtle" | "neutral"',
              default: '"solid"',
              description: "Visual style variant.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the badge.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
