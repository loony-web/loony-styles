import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { SearchIcon } from "@loony/icons";
import { Input, Label } from "@loony/ui";

export default function InputPage() {
  return (
    <ComponentDoc
      name="Input"
      description="A text input with size variants, validation state, and optional leading/trailing element slots."
      aria={["textbox"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "sizes", label: "Sizes" },
        { id: "with-icon", label: "With icon" },
        { id: "error", label: "Error state" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Input, Label } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<div className="grid gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
        >
          <div className="grid w-72 gap-1.5">
            <Label htmlFor="input-email">Email address</Label>
            <Input id="input-email" type="email" placeholder="you@example.com" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />`}
        >
          <div className="flex w-72 flex-col gap-3">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="with-icon" title="With icon">
        <ComponentPreview
          code={`import { SearchIcon } from "@loony/icons";

<Input
  placeholder="Search components..."
  leftElement={<SearchIcon className="h-4 w-4" />}
/>`}
        >
          <div className="w-72">
            <Input
              placeholder="Search components..."
              leftElement={<SearchIcon className="h-4 w-4" aria-hidden />}
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="error" title="Error state">
        <ComponentPreview
          code={`<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    defaultValue="not-an-email"
    invalid
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-(--loony-color-danger)">
    Please enter a valid email address.
  </p>
</div>`}
        >
          <div className="grid w-72 gap-1.5">
            <Label htmlFor="input-error-email">Email</Label>
            <Input
              id="input-error-email"
              type="email"
              defaultValue="not-an-email"
              invalid
              aria-describedby="input-error-msg"
            />
            <p id="input-error-msg" className="text-sm text-(--loony-color-danger)">
              Please enter a valid email address.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview code={`<Input disabled placeholder="Disabled input" />`}>
          <div className="w-72">
            <Input disabled placeholder="Disabled input" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls height and font size.",
            },
            {
              name: "leftElement",
              type: "ReactNode",
              default: "—",
              description: "Content rendered inside the input on the left.",
            },
            {
              name: "rightElement",
              type: "ReactNode",
              default: "—",
              description: "Content rendered inside the input on the right.",
            },
            {
              name: "invalid",
              type: "boolean",
              default: "false",
              description: "Applies error ring and sets aria-invalid.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the input.",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Makes the input read-only.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
