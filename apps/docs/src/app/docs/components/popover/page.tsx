import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from "@loony/ui";

export default function PopoverPage() {
  return (
    <ComponentDoc
      name="Popover"
      description="Displays rich content in a portal, triggered by a button."
      radix="https://www.radix-ui.com/primitives/docs/components/popover"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "form-example", label: "Form example" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Popover, PopoverTrigger, PopoverContent } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Details">
    <p className="text-sm">This is a popover with rich content.</p>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent aria-label="Details">
              <p className="text-sm text-(--loony-color-fg)">
                This is a popover with rich content.
              </p>
            </PopoverContent>
          </Popover>
        </ComponentPreview>
      </Section>

      <Section id="form-example" title="Form example">
        <ComponentPreview
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Dimensions" className="w-80">
    <div className="space-y-4">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Edit dimensions</Button>
            </PopoverTrigger>
            <PopoverContent aria-label="Dimensions" className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none text-(--loony-color-fg)">Dimensions</h4>
                <p className="text-sm text-(--loony-color-fg-muted)">
                  Set the dimensions for the layer.
                </p>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="pop-width">Width</Label>
                    <Input id="pop-width" defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="pop-height">Height</Label>
                    <Input id="pop-height" defaultValue="25px" className="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "—",
              description: "Initial open state (uncontrolled).",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              default: "—",
              description: "Callback when open state changes.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "Alignment of the popover relative to trigger (on PopoverContent).",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"bottom"',
              description: "Preferred side of the trigger (on PopoverContent).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
