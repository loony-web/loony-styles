import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Link } from "@loony/ui";

export default function LinkPage() {
  return (
    <ComponentDoc
      name="Link"
      description="An accessible anchor element with variants and external link support."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "external", label: "External" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Link } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={`<Link href="#">Visit our documentation</Link>`}>
          <Link href="#">Visit our documentation</Link>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<Link href="#" variant="default">Default link</Link>
<Link href="#" variant="subtle">Subtle link</Link>
<Link href="#" variant="ghost">Ghost link</Link>`}
        >
          <div className="flex flex-col gap-3">
            <Link href="#" variant="default">
              Default link
            </Link>
            <Link href="#" variant="subtle">
              Subtle link
            </Link>
            <Link href="#" variant="ghost">
              Ghost link
            </Link>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="external" title="External">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          External links automatically get{" "}
          <code className="font-mono text-xs">target=&quot;_blank&quot;</code>,{" "}
          <code className="font-mono text-xs">rel=&quot;noopener noreferrer&quot;</code>, an
          external link icon, and a visually hidden &quot;opens in new tab&quot; announcement for
          screen readers.
        </p>
        <ComponentPreview
          code={`<Link href="https://radix-ui.com" external>
  Radix UI
</Link>`}
        >
          <Link href="https://radix-ui.com" external>
            Radix UI
          </Link>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "href", type: "string", default: "—", description: "URL to navigate to." },
            {
              name: "variant",
              type: '"default" | "subtle" | "ghost"',
              default: '"default"',
              description: "Visual style variant.",
            },
            {
              name: "external",
              type: "boolean",
              default: "false",
              description: "Opens in new tab with security attributes and visual indicator.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Renders as the child element (for Next.js Link, etc.).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
