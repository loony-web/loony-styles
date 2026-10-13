import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Heading, Text } from "@loony/ui";

export default function TypographyPage() {
  return (
    <ComponentDoc
      name="Typography"
      description="Primitive text and heading components with size, weight, color, and alignment variants."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "text", label: "Text" },
        { id: "heading", label: "Heading" },
        { id: "colors", label: "Colors" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="text" title="Text">
        <CodeBlock>{`import { Text } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Text size="2xs">2xs — Extra extra small</Text>
<Text size="xs">xs — Extra small</Text>
<Text size="sm">sm — Small</Text>
<Text size="base">base — Base size</Text>
<Text size="lg">lg — Large</Text>
<Text size="xl">xl — Extra large</Text>`}
        >
          <div className="flex flex-col gap-2">
            <Text size="2xs">2xs — Extra extra small</Text>
            <Text size="xs">xs — Extra small</Text>
            <Text size="sm">sm — Small</Text>
            <Text size="base">base — Base size</Text>
            <Text size="lg">lg — Large</Text>
            <Text size="xl">xl — Extra large</Text>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="heading" title="Heading">
        <CodeBlock>{`import { Heading } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Heading level={1}>Heading level 1</Heading>
<Heading level={2}>Heading level 2</Heading>
<Heading level={3}>Heading level 3</Heading>
<Heading level={4}>Heading level 4</Heading>
<Heading level={5}>Heading level 5</Heading>
<Heading level={6}>Heading level 6</Heading>`}
        >
          <div className="flex flex-col gap-2">
            <Heading level={1}>Heading level 1</Heading>
            <Heading level={2}>Heading level 2</Heading>
            <Heading level={3}>Heading level 3</Heading>
            <Heading level={4}>Heading level 4</Heading>
            <Heading level={5}>Heading level 5</Heading>
            <Heading level={6}>Heading level 6</Heading>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="colors" title="Colors">
        <ComponentPreview
          code={`<Text color="default">Default</Text>
<Text color="muted">Muted</Text>
<Text color="subtle">Subtle</Text>
<Text color="accent">Accent</Text>
<Text color="danger">Danger</Text>
<Text color="success">Success</Text>
<Text color="warning">Warning</Text>`}
        >
          <div className="flex flex-col gap-1.5">
            <Text color="default">Default</Text>
            <Text color="muted">Muted</Text>
            <Text color="subtle">Subtle</Text>
            <Text color="accent">Accent</Text>
            <Text color="danger">Danger</Text>
            <Text color="success">Success</Text>
            <Text color="warning">Warning</Text>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "size",
              type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl"',
              default: '"base"',
              description: "Text size (Text component).",
            },
            {
              name: "level",
              type: "1 | 2 | 3 | 4 | 5 | 6",
              default: "2",
              description: "Heading level — controls both visual size and rendered element.",
            },
            {
              name: "weight",
              type: '"normal" | "medium" | "semibold" | "bold"',
              default: '"normal"',
              description: "Font weight.",
            },
            {
              name: "color",
              type: '"default" | "muted" | "subtle" | "disabled" | "accent" | "danger" | "success" | "warning"',
              default: '"default"',
              description: "Text color token.",
            },
            {
              name: "align",
              type: '"left" | "center" | "right"',
              default: "—",
              description: "Text alignment.",
            },
            {
              name: "truncate",
              type: "boolean",
              default: "false",
              description: "Truncates text with an ellipsis.",
            },
            {
              name: "as",
              type: "ElementType",
              default: '"p" / "h2"',
              description: "HTML element to render as.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
