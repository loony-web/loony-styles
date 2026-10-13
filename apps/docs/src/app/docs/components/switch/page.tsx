import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Label, Switch } from "@loony/ui";

export default function SwitchPage() {
  return (
    <ComponentDoc
      name="Switch"
      description="A control that allows the user to toggle between on and off states."
      radix="https://www.radix-ui.com/primitives/docs/components/switch"
      aria={["switch"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-label", label: "With label" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Switch } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code="<Switch defaultChecked />">
          <Switch defaultChecked />
        </ComponentPreview>
      </Section>

      <Section id="with-label" title="With label">
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane mode</Label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane mode</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview
          code={`<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Switch id="d1" disabled />
    <Label htmlFor="d1">Disabled off</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="d2" disabled defaultChecked />
    <Label htmlFor="d2">Disabled on</Label>
  </div>
</div>`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Switch id="s-d1" disabled />
              <Label htmlFor="s-d1">Disabled off</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="s-d2" disabled defaultChecked />
              <Label htmlFor="s-d2">Disabled on</Label>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "checked",
              type: "boolean",
              default: "—",
              description: "Controlled checked state.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "—",
              description: "Initial checked state (uncontrolled).",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              default: "—",
              description: "Callback when checked state changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents user interaction.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
