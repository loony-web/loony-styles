"use client";

import { useState } from "react";
import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter,
  DialogTitle, DialogDescription, DialogClose, Button, Input, Label,
} from "@loony/ui";

function BasicDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="d-name">Name</Label>
              <Input id="d-name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="d-email">Email</Label>
              <Input id="d-email" defaultValue="john@example.com" type="email" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DestructiveDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="danger">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="danger" onClick={() => setOpen(false)}>Delete account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogPage() {
  return (
    <ComponentDoc
      name="Dialog"
      description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
      radix="https://www.radix-ui.com/primitives/docs/components/dialog"
      aria={["dialog"]}
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "destructive", label: "Destructive" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
      </div>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <BasicDialogDemo />
        </ComponentPreview>
      </Section>

      <Section id="destructive" title="Destructive confirmation">
        <ComponentPreview
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="danger">Delete account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="danger">Delete account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <DestructiveDialogDemo />
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "—", description: "Initial open state (uncontrolled)." },
            { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
            { name: "showClose", type: "boolean", default: "true", description: "Whether to show the close button in the top-right corner (on DialogContent)." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
