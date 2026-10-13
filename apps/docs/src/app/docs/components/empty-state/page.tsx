import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { AlertCircleIcon, InfoIcon, SearchIcon } from "@loony/icons";
import { Button, EmptyState } from "@loony/ui";

export default function EmptyStatePage() {
  return (
    <ComponentDoc
      name="EmptyState"
      description="A placeholder component for empty or zero-data states."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-action", label: "With action" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { EmptyState } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<EmptyState
  icon={<InfoIcon size={24} />}
  title="No messages yet"
  description="When you receive messages, they'll appear here."
/>`}
        >
          <EmptyState
            icon={<InfoIcon size={24} />}
            title="No messages yet"
            description="When you receive messages, they'll appear here."
          />
        </ComponentPreview>
      </Section>

      <Section id="with-action" title="With action">
        <ComponentPreview
          code={`<EmptyState
  icon={<SearchIcon size={24} />}
  title="No results found"
  description="Try adjusting your search or filter to find what you're looking for."
  action={<Button size="sm">Clear filters</Button>}
/>`}
        >
          <EmptyState
            icon={<SearchIcon size={24} />}
            title="No results found"
            description="Try adjusting your search or filter to find what you're looking for."
            action={
              <Button size="sm" variant="outline">
                Clear filters
              </Button>
            }
          />
        </ComponentPreview>

        <ComponentPreview
          label="Error state"
          code={`<EmptyState
  icon={<AlertCircleIcon size={24} className="text-(--loony-color-danger)" />}
  title="Failed to load data"
  description="An error occurred while fetching your data."
  action={<Button size="sm" variant="danger">Try again</Button>}
/>`}
        >
          <EmptyState
            icon={<AlertCircleIcon size={24} className="text-(--loony-color-danger)" />}
            title="Failed to load data"
            description="An error occurred while fetching your data."
            action={
              <Button size="sm" variant="danger">
                Try again
              </Button>
            }
          />
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              default: "—",
              description: "Required. The main heading text.",
            },
            {
              name: "description",
              type: "string",
              default: "—",
              description: "Supporting text beneath the title.",
            },
            {
              name: "icon",
              type: "ReactNode",
              default: "—",
              description: "Icon to display above the title.",
            },
            {
              name: "action",
              type: "ReactNode",
              default: "—",
              description: "Call-to-action element (usually a Button).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
