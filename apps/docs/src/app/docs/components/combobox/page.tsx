import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Combobox, Label } from "@loony/ui";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix", keywords: ["react-router"] },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt", keywords: ["vue"] },
  { value: "sveltekit", label: "SvelteKit", keywords: ["svelte"] },
];

const optionsCode = `const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix", keywords: ["react-router"] },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt", keywords: ["vue"] },
  { value: "sveltekit", label: "SvelteKit", keywords: ["svelte"] },
];`;

export default function ComboboxPage() {
  return (
    <ComponentDoc
      name="Combobox"
      description="Pick one option from a searchable list. Type to filter, including by keywords, then choose with the mouse or keyboard."
      status="beta"
      aria={["combobox", "listbox", "option", "dialog"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "visible-label", label: "With a visible label" },
        { id: "clearable", label: "Clearable" },
        { id: "forms", label: "Forms and validation" },
        { id: "accessibility", label: "Accessibility" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
        <CodeBlock>npx @loony/cli add combobox</CodeBlock>
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Combobox } from "@loony/ui";

${optionsCode}`}</CodeBlock>
        <ComponentPreview
          code={`<Combobox
  label="Framework"
  options={frameworks}
  placeholder="Select a framework…"
  onValueChange={(value) => console.log(value)}
/>`}
        >
          <div className="w-64">
            <Combobox label="Framework" options={frameworks} placeholder="Select a framework…" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="visible-label" title="With a visible label">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Without a visible label, <code>label</code> names the field. With one, point{" "}
          <code>aria-labelledby</code> at it; <code>label</code> still names the popup and search
          field.
        </p>
        <ComponentPreview
          code={`<Label id="framework-label">Framework</Label>
<Combobox
  aria-labelledby="framework-label"
  label="Framework"
  options={frameworks}
/>`}
        >
          <div className="flex w-64 flex-col gap-1.5">
            <Label id="framework-label">Framework</Label>
            <Combobox aria-labelledby="framework-label" label="Framework" options={frameworks} />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="clearable" title="Clearable">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          With <code>clearable</code>, choosing the selected option again clears the value (
          <code>onValueChange(null)</code>).
        </p>
        <ComponentPreview
          code={`<Combobox label="Framework" options={frameworks} defaultValue="astro" clearable />`}
        >
          <div className="w-64">
            <Combobox label="Framework" options={frameworks} defaultValue="astro" clearable />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="forms" title="Forms and validation">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Pass <code>name</code> to submit the value with a native form. Use <code>invalid</code>{" "}
          and <code>aria-describedby</code> to connect an error message.
        </p>
        <ComponentPreview
          code={`<form>
  <Combobox
    name="framework"
    label="Framework"
    options={frameworks}
    invalid
    aria-describedby="framework-error"
  />
  <p id="framework-error">Choose a framework to continue.</p>
</form>`}
        >
          <div className="flex w-64 flex-col gap-1.5">
            <Combobox
              name="framework"
              label="Framework"
              options={frameworks}
              invalid
              aria-describedby="docs-framework-error"
            />
            <p id="docs-framework-error" className="text-sm text-(--loony-color-danger)">
              Choose a framework to continue.
            </p>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="accessibility" title="Accessibility">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          The trigger is a button that opens a dialog popup. Inside it, the search field is the
          WAI-ARIA combobox and controls the listbox of options (the editable combobox with list
          autocomplete pattern). Focus moves into the search field on open and returns to the
          trigger on close. The selected option is announced as “…, selected”.
        </p>
        <PropsTable
          props={[
            { name: "Enter / Space", type: "Trigger", default: "", description: "Open the list." },
            {
              name: "ArrowDown / ArrowUp",
              type: "Trigger",
              default: "",
              description: "Open the list.",
            },
            {
              name: "Type",
              type: "Search",
              default: "",
              description: "Filter options by label and keywords (fuzzy).",
            },
            {
              name: "ArrowDown / ArrowUp",
              type: "Search",
              default: "",
              description: "Move the highlight.",
            },
            {
              name: "Home / End",
              type: "Search",
              default: "",
              description: "Highlight the first / last option.",
            },
            {
              name: "Enter",
              type: "Search",
              default: "",
              description: "Select the highlighted option and close.",
            },
            {
              name: "Escape",
              type: "Search",
              default: "",
              description: "Close without changing the value; focus returns to the trigger.",
            },
          ]}
        />
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "options",
              type: "ComboboxOption[]",
              default: "—",
              description:
                "{ value, label, disabled?, keywords? }. `value` must be unique; `label` is shown and searched.",
            },
            {
              name: "value",
              type: "string | null",
              default: "—",
              description: "Selected value (controlled). null means nothing selected.",
            },
            {
              name: "defaultValue",
              type: "string | null",
              default: "null",
              description: "Initially selected value (uncontrolled).",
            },
            {
              name: "onValueChange",
              type: "(value: string | null) => void",
              default: "—",
              description: "Called when the selection changes.",
            },
            {
              name: "clearable",
              type: "boolean",
              default: "false",
              description: "Choosing the selected option again clears the value.",
            },
            {
              name: "label",
              type: "string",
              default: "—",
              description:
                "Accessible name. Required unless labelled via aria-labelledby or <Label htmlFor>.",
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Select an option…"',
              description: "Trigger text when nothing is selected.",
            },
            {
              name: "searchPlaceholder",
              type: "string",
              default: '"Search…"',
              description: "Placeholder for the search field.",
            },
            {
              name: "emptyMessage",
              type: "ReactNode",
              default: '"No results found."',
              description: "Shown when the search matches nothing.",
            },
            {
              name: "name",
              type: "string",
              default: "—",
              description: "Submit the value with a native form under this name.",
            },
            {
              name: "invalid",
              type: "boolean",
              default: "false",
              description: "Sets aria-invalid and error styling.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the trigger.",
            },
            {
              name: "open / defaultOpen / onOpenChange",
              type: "boolean / boolean / (open) => void",
              default: "—",
              description: "Control the popup.",
            },
            {
              name: "className / contentClassName",
              type: "string",
              default: "—",
              description: "Classes for the trigger / popup panel.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
