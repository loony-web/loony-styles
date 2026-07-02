import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Stack } from "@loony/ui";

export default function StackPage() {
  return (
    <ComponentDoc
      name="Stack"
      description="A flexbox layout primitive for stacking elements vertically or horizontally with consistent spacing."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "horizontal", label: "Horizontal" },
        { id: "alignment", label: "Alignment" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Stack } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Stack gap={4}>
  <div className="rounded-md bg-accent/10 px-4 py-3 text-sm">Item one</div>
  <div className="rounded-md bg-accent/10 px-4 py-3 text-sm">Item two</div>
  <div className="rounded-md bg-accent/10 px-4 py-3 text-sm">Item three</div>
</Stack>`}
        >
          <div className="w-64">
            <Stack gap={3}>
              {["Item one", "Item two", "Item three"].map((item) => (
                <div
                  key={item}
                  className="rounded-md bg-[--loony-color-accent]/10 border border-[--loony-color-border] px-4 py-3 text-sm text-[--loony-color-fg]"
                >
                  {item}
                </div>
              ))}
            </Stack>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="horizontal" title="Horizontal">
        <ComponentPreview
          code={`<Stack direction="row" gap={3} align="center">
  <div className="h-8 w-8 rounded-full bg-accent" />
  <div>
    <p className="text-sm font-medium">John Doe</p>
    <p className="text-xs text-muted-foreground">Engineer</p>
  </div>
</Stack>`}
        >
          <Stack direction="row" gap={3} align="center">
            <div className="h-10 w-10 rounded-full bg-[--loony-color-accent] shrink-0" />
            <div>
              <p className="text-sm font-medium text-[--loony-color-fg]">John Doe</p>
              <p className="text-xs text-[--loony-color-fg-muted]">Software Engineer</p>
            </div>
          </Stack>
        </ComponentPreview>
      </Section>

      <Section id="alignment" title="Alignment">
        <ComponentPreview
          code={`<Stack direction="row" justify="between" align="center" gap={4}>
  <span className="text-sm font-medium">Total</span>
  <span className="text-lg font-bold">$99.00</span>
</Stack>`}
        >
          <div className="w-64 rounded-xl border border-[--loony-color-border] p-4">
            <Stack direction="row" justify="between" align="center">
              <span className="text-sm font-medium text-[--loony-color-fg]">Total</span>
              <span className="text-lg font-bold text-[--loony-color-fg]">$99.00</span>
            </Stack>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "direction", type: '"row" | "column" | "row-reverse" | "column-reverse"', default: '"column"', description: "Flex direction." },
            { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: "Align items along the cross axis." },
            { name: "justify", type: '"start" | "center" | "end" | "between" | "around" | "evenly"', default: '"start"', description: "Justify content along the main axis." },
            { name: "gap", type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | ...", default: "—", description: "Gap between children (Tailwind spacing scale)." },
            { name: "wrap", type: '"wrap" | "nowrap" | "wrap-reverse"', default: '"nowrap"', description: "Flex wrap behavior." },
            { name: "as", type: "ElementType", default: '"div"', description: "HTML element or component to render as." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
