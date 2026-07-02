import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@loony/ui";

export default function AccordionPage() {
  return (
    <ComponentDoc
      name="Accordion"
      description="Vertically stacked collapsible sections with keyboard navigation and ARIA support."
      radix="https://www.radix-ui.com/primitives/docs/components/accordion"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "single", label: "Single" },
        { id: "multiple", label: "Multiple" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows the WAI-ARIA design pattern for accordions.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that you can customize.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It&apos;s animated by default with a smooth expand/collapse.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It follows the WAI-ARIA design pattern for accordions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that you can customize.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default with a smooth expand/collapse.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="single" title="Single (collapsible)">
        <p className="mb-4 text-sm text-[--loony-color-fg-muted]">
          Use <code className="font-mono text-xs">type=&quot;single&quot;</code> with{" "}
          <code className="font-mono text-xs">collapsible</code> to allow the open item to be closed by clicking it again.
        </p>
        <ComponentPreview
          code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Loony UI?</AccordionTrigger>
    <AccordionContent>
      A production-grade, accessible React component library built on Radix UI and Tailwind CSS.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Run <code>pnpm add @loony/ui</code> in your project.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Loony UI?</AccordionTrigger>
                <AccordionContent>
                  A production-grade, accessible React component library built on Radix UI and Tailwind CSS.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I install it?</AccordionTrigger>
                <AccordionContent>
                  Run pnpm add @loony/ui in your project.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="multiple" title="Multiple">
        <p className="mb-4 text-sm text-[--loony-color-fg-muted]">
          Use <code className="font-mono text-xs">type=&quot;multiple&quot;</code> to allow multiple items to be open at the same time.
        </p>
        <ComponentPreview
          code={`<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content for section one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>Content for section two.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Section one</AccordionTrigger>
                <AccordionContent>Content for section one.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Section two</AccordionTrigger>
                <AccordionContent>Content for section two.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "type", type: '"single" | "multiple"', default: "—", description: "Whether one or multiple items can be open at a time." },
            { name: "collapsible", type: "boolean", default: "false", description: "When type is single, allows closing the open item." },
            { name: "defaultValue", type: "string | string[]", default: "—", description: "The default open item(s)." },
            { name: "value", type: "string | string[]", default: "—", description: "Controlled open value(s)." },
            { name: "onValueChange", type: "(value: string | string[]) => void", default: "—", description: "Callback when open state changes." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
