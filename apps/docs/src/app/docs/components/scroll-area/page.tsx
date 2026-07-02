import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { ScrollArea } from "@loony/ui";

const TAGS = ["React", "TypeScript", "Next.js", "Tailwind", "Radix UI", "CVA", "Motion", "Vitest", "Biome", "Changesets", "TurboRepo", "pnpm", "ESLint", "Vite", "Storybook"];

export default function ScrollAreaPage() {
  return (
    <ComponentDoc
      name="ScrollArea"
      description="Augments native scroll functionality with a custom, cross-browser scrollbar."
      radix="https://www.radix-ui.com/primitives/docs/components/scroll-area"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "horizontal", label: "Horizontal" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { ScrollArea } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<ScrollArea className="h-48 w-64 rounded-md border p-4">
  {/* long content */}
</ScrollArea>`}
        >
          <ScrollArea className="h-48 w-56 rounded-md border border-[--loony-color-border] p-4">
            <div className="space-y-2">
              {TAGS.map((tag) => (
                <div
                  key={tag}
                  className="rounded-sm border border-[--loony-color-border] bg-[--loony-color-surface] px-3 py-1.5 text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>
      </Section>

      <Section id="horizontal" title="Horizontal">
        <ComponentPreview
          code={`<ScrollArea className="w-64 rounded-md border">
  <div className="flex gap-2 p-3">
    {items.map((item) => (
      <div key={item} className="shrink-0 rounded-md border px-4 py-2 text-sm">
        {item}
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="w-72 rounded-md border border-[--loony-color-border]">
            <div className="flex gap-2 p-3">
              {TAGS.map((tag) => (
                <div
                  key={tag}
                  className="shrink-0 rounded-md border border-[--loony-color-border] bg-[--loony-color-surface] px-3 py-1.5 text-sm whitespace-nowrap"
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "className", type: "string", default: "—", description: "Apply width/height constraints to control the scroll bounds." },
            { name: "type", type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: "Visibility behavior of the scrollbar." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
