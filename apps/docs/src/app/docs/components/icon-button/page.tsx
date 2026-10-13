import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { InfoIcon, PlusIcon, SearchIcon, SettingsIcon, TrashIcon } from "@loony/icons";
import { IconButton } from "@loony/ui";

export default function IconButtonPage() {
  return (
    <ComponentDoc
      name="IconButton"
      description="A square button containing only an icon. Requires an accessible label for screen readers."
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
        <CodeBlock>{`import { IconButton } from "@loony/ui";
import { SettingsIcon } from "@loony/icons";

<IconButton label="Open settings">
  <SettingsIcon />
</IconButton>`}</CodeBlock>
        <ComponentPreview
          code={`<IconButton label="Open settings">
  <SettingsIcon />
</IconButton>`}
        >
          <IconButton label="Open settings">
            <SettingsIcon />
          </IconButton>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<IconButton label="Solid" variant="solid"><InfoIcon /></IconButton>
<IconButton label="Outline" variant="outline"><InfoIcon /></IconButton>
<IconButton label="Ghost" variant="ghost"><InfoIcon /></IconButton>
<IconButton label="Danger" variant="danger"><TrashIcon /></IconButton>
<IconButton label="Danger ghost" variant="danger-ghost"><TrashIcon /></IconButton>`}
        >
          <div className="flex items-center gap-3">
            <IconButton label="Solid" variant="solid">
              <InfoIcon />
            </IconButton>
            <IconButton label="Outline" variant="outline">
              <InfoIcon />
            </IconButton>
            <IconButton label="Ghost" variant="ghost">
              <InfoIcon />
            </IconButton>
            <IconButton label="Danger" variant="danger">
              <TrashIcon />
            </IconButton>
            <IconButton label="Danger ghost" variant="danger-ghost">
              <TrashIcon />
            </IconButton>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<IconButton label="Extra small" size="xs"><SearchIcon /></IconButton>
<IconButton label="Small" size="sm"><SearchIcon /></IconButton>
<IconButton label="Medium" size="md"><SearchIcon /></IconButton>
<IconButton label="Large" size="lg"><SearchIcon /></IconButton>
<IconButton label="Extra large" size="xl"><SearchIcon /></IconButton>`}
        >
          <div className="flex items-center gap-3">
            <IconButton label="Extra small" size="xs">
              <SearchIcon />
            </IconButton>
            <IconButton label="Small" size="sm">
              <SearchIcon />
            </IconButton>
            <IconButton label="Medium" size="md">
              <SearchIcon />
            </IconButton>
            <IconButton label="Large" size="lg">
              <SearchIcon />
            </IconButton>
            <IconButton label="Extra large" size="xl">
              <PlusIcon />
            </IconButton>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              default: "—",
              description: "Required. Accessible label announced by screen readers.",
            },
            {
              name: "variant",
              type: '"solid" | "outline" | "ghost" | "danger" | "danger-ghost"',
              default: '"ghost"',
              description: "Visual style variant.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Size of the button.",
            },
            {
              name: "rounded",
              type: '"default" | "full"',
              default: '"default"',
              description: "Border radius — default or fully circular.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Renders as a child element (useful for Next.js Link).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
