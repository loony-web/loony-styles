import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { FormField, Input, Textarea } from "@loony/ui";

export default function FormFieldPage() {
  return (
    <ComponentDoc
      name="FormField"
      description="A wrapper that pairs a label, form control, helper text, and error message together accessibly."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "error", label: "Error state" },
        { id: "required", label: "Required" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { FormField, Input } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<FormField
  label="Email address"
  htmlFor="email"
  helperText="We'll never share your email with anyone else."
>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>`}
        >
          <div className="w-72">
            <FormField
              label="Email address"
              htmlFor="ff-email"
              helperText="We'll never share your email with anyone else."
            >
              <Input id="ff-email" type="email" placeholder="you@example.com" />
            </FormField>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="error" title="Error state">
        <ComponentPreview
          code={`<FormField
  label="Username"
  htmlFor="username"
  errorMessage="Username is already taken."
>
  <Input id="username" defaultValue="janedoe" />
</FormField>`}
        >
          <div className="w-72">
            <FormField
              label="Username"
              htmlFor="ff-username"
              errorMessage="Username is already taken."
            >
              <Input id="ff-username" defaultValue="janedoe" />
            </FormField>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="required" title="Required">
        <ComponentPreview
          code={`<FormField
  label="Password"
  htmlFor="password"
  isRequired
  helperText="Must be at least 8 characters."
>
  <Input id="password" type="password" />
</FormField>`}
        >
          <div className="w-72">
            <FormField
              label="Password"
              htmlFor="ff-password"
              isRequired
              helperText="Must be at least 8 characters."
            >
              <Input id="ff-password" type="password" />
            </FormField>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "label", type: "ReactNode", default: "—", description: "Label text displayed above the control." },
            { name: "htmlFor", type: "string", default: "—", description: "Associates the label with the control via id." },
            { name: "helperText", type: "ReactNode", default: "—", description: "Supporting text shown when there is no error." },
            { name: "errorMessage", type: "ReactNode", default: "—", description: "Error message that replaces helper text. Sets role=alert." },
            { name: "isRequired", type: "boolean", default: "false", description: "Appends a required asterisk to the label." },
            { name: "isDisabled", type: "boolean", default: "false", description: "Dims the entire field." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
