import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { ChevronRightIcon, PlusIcon } from "@loony/icons";
import { Button } from "@loony/ui";

export default function ButtonPage() {
  return (
    <ComponentDoc
      name="Button"
      description="The primary interactive element. Supports 7 variants, 5 sizes, loading state, and the asChild pattern for polymorphic rendering."
      aria={["button"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "sizes", label: "Sizes" },
        { id: "with-icons", label: "With icons" },
        { id: "loading", label: "Loading" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Button } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={"<Button>Click me</Button>"}>
          <Button>Click me</Button>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-outline">Danger Outline</Button>
<Button variant="danger-ghost">Danger Ghost</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-outline">Danger Outline</Button>
            <Button variant="danger-ghost">Danger Ghost</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XLarge</Button>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XSmall</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="with-icons" title="With icons">
        <ComponentPreview
          code={`import { PlusIcon, ChevronRightIcon } from "@loony/icons";

<Button leftIcon={<PlusIcon />}>New component</Button>
<Button rightIcon={<ChevronRightIcon />} variant="outline">Learn more</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<PlusIcon />}>New component</Button>
            <Button rightIcon={<ChevronRightIcon />} variant="outline">
              Learn more
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="loading" title="Loading state">
        <ComponentPreview
          code={`<Button loading>Saving changes...</Button>
<Button loading variant="outline">Uploading...</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button loading>Saving changes...</Button>
            <Button loading variant="outline">
              Uploading...
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"solid" | "outline" | "ghost" | "link" | "danger" | "danger-outline" | "danger-ghost"',
              default: '"solid"',
              description: "Visual style of the button.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Controls padding and font size.",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description: "Shows a spinner and sets aria-disabled.",
            },
            {
              name: "leftIcon",
              type: "ReactNode",
              default: "—",
              description: "Icon rendered before the label.",
            },
            {
              name: "rightIcon",
              type: "ReactNode",
              default: "—",
              description: "Icon rendered after the label.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Merges button props onto a single child element (Slot pattern).",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the button via the native disabled attribute.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
