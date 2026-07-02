"use client";

import { useState } from "react";
import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { ToastProvider, ToastViewport, Toast, Button } from "@loony/ui";

function ToastDemo({ variant }: { variant?: "default" | "success" | "danger" | "warning" | "info" }) {
  const [toasts, setToasts] = useState<Array<{ id: number; open: boolean }>>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, open: true }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const labels = {
    default: "Default",
    success: "Success",
    danger: "Danger",
    warning: "Warning",
    info: "Info",
  };

  const descriptions = {
    default: "Your message has been sent.",
    success: "Profile updated successfully.",
    danger: "Something went wrong.",
    warning: "Storage is running low.",
    info: "A new version is available.",
  };

  const v = variant ?? "default";

  return (
    <ToastProvider>
      <Button variant="outline" onClick={addToast}>
        Show {labels[v]} toast
      </Button>
      {toasts.map(({ id, open }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(o) => {
            if (!o) setToasts((prev) => prev.filter((t) => t.id !== id));
          }}
          variant={v}
          title={labels[v]}
          description={descriptions[v]}
          duration={4000}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export default function ToastPage() {
  return (
    <ComponentDoc
      name="Toast"
      description="A succinct message that is displayed temporarily to inform users of an event or state."
      radix="https://www.radix-ui.com/primitives/docs/components/toast"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`"use client";

import { useState } from "react";
import { ToastProvider, ToastViewport, Toast, Button } from "@loony/ui";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Success"
        description="Your changes have been saved."
        variant="success"
      />
      <ToastViewport />
    </ToastProvider>
  );
}`}</CodeBlock>
        <ComponentPreview
          code={`<ToastProvider>
  <Button onClick={showToast}>Show toast</Button>
  <Toast open={open} onOpenChange={setOpen}
    title="Saved" description="Your changes have been saved." />
  <ToastViewport />
</ToastProvider>`}
        >
          <ToastDemo variant="default" />
        </ComponentPreview>
      </Section>

      <Section id="variants" title="Variants">
        <ComponentPreview
          code={`<Toast variant="success" title="Success" description="Profile updated." />
<Toast variant="danger" title="Error" description="Something went wrong." />
<Toast variant="warning" title="Warning" description="Storage is running low." />
<Toast variant="info" title="Info" description="A new version is available." />`}
        >
          <div className="flex flex-wrap gap-3">
            <ToastDemo variant="success" />
            <ToastDemo variant="danger" />
            <ToastDemo variant="warning" />
            <ToastDemo variant="info" />
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
            { name: "variant", type: '"default" | "success" | "danger" | "warning" | "info"', default: '"default"', description: "Visual style and icon." },
            { name: "title", type: "ReactNode", default: "—", description: "Toast heading." },
            { name: "description", type: "ReactNode", default: "—", description: "Supporting text." },
            { name: "duration", type: "number", default: "5000", description: "Auto-dismiss delay in ms." },
            { name: "action", type: "ReactNode", default: "—", description: "Optional action element (ToastAction)." },
            { name: "showIcon", type: "boolean", default: "true", description: "Whether to show the variant icon." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
