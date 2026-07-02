"use client";

import { useState } from "react";
import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose, Button,
} from "@loony/ui";

function RightDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer (right)</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Explore the app sections.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-2">
            {["Dashboard", "Projects", "Team", "Settings", "Billing"].map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-md px-3 py-2 text-sm text-[--loony-color-fg-muted] hover:bg-[--loony-color-surface] hover:text-[--loony-color-fg] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BottomDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer (bottom)</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>Share this content with others.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[--loony-color-fg-muted]">Choose a sharing option below.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button className="w-full">Copy link</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function DrawerPage() {
  return (
    <ComponentDoc
      name="Drawer"
      description="A panel that slides in from the edge of the screen. Used for navigation, forms, or contextual content."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "bottom", label: "Bottom drawer" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Navigation</DrawerTitle>
      <DrawerDescription>Explore the app.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      {/* content */}
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <RightDrawerDemo />
        </ComponentPreview>
      </Section>

      <Section id="bottom" title="Bottom drawer">
        <ComponentPreview
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer (bottom)</Button>
  </DrawerTrigger>
  <DrawerContent side="bottom">
    <DrawerHeader>
      <DrawerTitle>Share</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>...</DrawerBody>
    <DrawerFooter>
      <Button>Copy link</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <BottomDrawerDemo />
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "side", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "The side from which the drawer slides in (on DrawerContent)." },
            { name: "hideClose", type: "boolean", default: "false", description: "Whether to hide the close button (on DrawerContent)." },
            { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
