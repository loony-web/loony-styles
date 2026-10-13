import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Alert, AlertDescription, AlertTitle } from "@loony/ui";

export default function AlertPage() {
  return (
    <ComponentDoc
      name="Alert"
      description="Inline status message for communicating success, warnings, errors, or informational content."
      radix="https://www.radix-ui.com/primitives"
      aria={["alert"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "custom-icon", label: "Custom icon" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Alert, AlertTitle, AlertDescription } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Alert variant="info">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can customize the appearance of this alert with the variant prop.
  </AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="info">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can customize the appearance of this alert with the variant prop.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          label="info"
          code={`<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Your trial expires in 3 days.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="info">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Your trial expires in 3 days.</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview
          label="success"
          code={`<Alert variant="success">
  <AlertTitle>Payment successful</AlertTitle>
  <AlertDescription>Your payment has been processed.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="success">
              <AlertTitle>Payment successful</AlertTitle>
              <AlertDescription>Your payment has been processed.</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview
          label="warning"
          code={`<Alert variant="warning">
  <AlertTitle>Storage limit approaching</AlertTitle>
  <AlertDescription>You've used 90% of your storage quota.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="warning">
              <AlertTitle>Storage limit approaching</AlertTitle>
              <AlertDescription>You&apos;ve used 90% of your storage quota.</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview
          label="danger"
          code={`<Alert variant="danger">
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Your card was declined. Please update your billing info.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="danger">
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>
                Your card was declined. Please update your billing info.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview
          label="neutral"
          code={`<Alert variant="neutral">
  <AlertTitle>Maintenance scheduled</AlertTitle>
  <AlertDescription>The system will be offline on Sunday at 2am UTC.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="neutral">
              <AlertTitle>Maintenance scheduled</AlertTitle>
              <AlertDescription>The system will be offline on Sunday at 2am UTC.</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="custom-icon" title="Custom icon">
        <ComponentPreview
          code={`<Alert variant="info" icon={null}>
  <AlertDescription>Alert without an icon.</AlertDescription>
</Alert>`}
        >
          <div className="w-full max-w-md">
            <Alert variant="info" icon={null}>
              <AlertDescription>Alert without an icon.</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"info" | "success" | "warning" | "danger" | "neutral"',
              default: '"info"',
              description: "Controls the color scheme and default icon.",
            },
            {
              name: "icon",
              type: "ReactNode | null",
              default: "—",
              description: "Custom icon. Pass null to suppress the default icon.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
