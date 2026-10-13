"use client";

import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Tag } from "@loony/ui";

export default function TagPage() {
  return (
    <ComponentDoc
      name="Tag"
      description="Compact element for categorizing and filtering content. Supports dismissal and icons."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "dismissible", label: "Dismissible" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Tag } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={"<Tag>React</Tag>"}>
          <Tag>React</Tag>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<Tag variant="solid">Solid</Tag>
<Tag variant="subtle">Subtle</Tag>
<Tag variant="outline">Outline</Tag>
<Tag variant="neutral">Neutral</Tag>`}
        >
          <div className="flex flex-wrap gap-2">
            <Tag variant="solid">Solid</Tag>
            <Tag variant="subtle">Subtle</Tag>
            <Tag variant="outline">Outline</Tag>
            <Tag variant="neutral">Neutral</Tag>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="dismissible" title="Dismissible">
        <ComponentPreview
          code={`<Tag onDismiss={() => console.log("dismissed")}>TypeScript</Tag>
<Tag variant="outline" onDismiss={() => {}}>React</Tag>
<Tag variant="neutral" onDismiss={() => {}}>Next.js</Tag>`}
        >
          <div className="flex flex-wrap gap-2">
            <Tag onDismiss={() => {}}>TypeScript</Tag>
            <Tag variant="outline" onDismiss={() => {}}>
              React
            </Tag>
            <Tag variant="neutral" onDismiss={() => {}}>
              Next.js
            </Tag>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"solid" | "subtle" | "outline" | "neutral"',
              default: '"subtle"',
              description: "Visual style variant.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the tag.",
            },
            {
              name: "onDismiss",
              type: "MouseEventHandler<HTMLButtonElement>",
              default: "—",
              description: "If provided, renders a dismiss button.",
            },
            {
              name: "dismissLabel",
              type: "string",
              default: '"Remove"',
              description: "Accessible label for the dismiss button.",
            },
            {
              name: "icon",
              type: "ReactNode",
              default: "—",
              description: "Icon to display before the label.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
