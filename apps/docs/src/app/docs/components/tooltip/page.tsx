import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from "@loony/ui";

export default function TooltipPage() {
  return (
    <ComponentDoc
      name="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      radix="https://www.radix-ui.com/primitives/docs/components/tooltip"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "placement", label: "Placement" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@loony/ui";

// Wrap your app with TooltipProvider once at the root level.
export default function App() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`}</CodeBlock>
        <ComponentPreview
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentPreview>
      </Section>

      <Section id="placement" title="Placement">
        <ComponentPreview
          code={`<TooltipProvider>
  <div className="flex gap-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">Top tooltip</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">Right tooltip</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">Left tooltip</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">Top tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">Right tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">Left tooltip</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "delayDuration", type: "number", default: "700", description: "Duration in ms before the tooltip opens (on TooltipProvider)." },
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side of the trigger to render the tooltip (on TooltipContent)." },
            { name: "sideOffset", type: "number", default: "4", description: "Distance in px from the trigger (on TooltipContent)." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
