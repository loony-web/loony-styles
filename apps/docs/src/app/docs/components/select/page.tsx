import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@loony/ui";

export default function SelectPage() {
  return (
    <ComponentDoc
      name="Select"
      description="Displays a list of options for the user to pick from — triggered by a button."
      radix="https://www.radix-ui.com/primitives/docs/components/select"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-groups", label: "With groups" },
        { id: "disabled", label: "Disabled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Select defaultValue="light">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select defaultValue="light">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Section>

      <Section id="with-groups" title="With groups">
        <ComponentPreview
          code={`<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="mango">Mango</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="broccoli">Broccoli</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select a food" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Section>

      <Section id="disabled" title="Disabled">
        <ComponentPreview
          code={`<Select disabled>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option">Option</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select disabled>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option">Option</SelectItem>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              default: "—",
              description: "Controlled selected value.",
            },
            {
              name: "defaultValue",
              type: "string",
              default: "—",
              description: "Initial selected value (uncontrolled).",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "—",
              description: "Callback when selected value changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents user interaction.",
            },
            {
              name: "placeholder",
              type: "string",
              default: "—",
              description: "Placeholder text when no value is selected (on SelectValue).",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
