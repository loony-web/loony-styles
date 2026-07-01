import type { Metadata } from "next";
import { CodeBlock, ComponentDoc, Preview, Section } from "@/components/component-doc";

export const metadata: Metadata = { title: "Dialog" };

export default function DialogPage() {
  return (
    <ComponentDoc
      name="Dialog"
      description="A modal overlay with focus trap, scroll lock, Escape key close, and enter/exit animations. Built on Radix UI Dialog."
      radix="https://www.radix-ui.com/docs/primitives/components/dialog"
      aria={["dialog"]}
      status="stable"
      props={[
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dialog opens or closes." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state for uncontrolled usage." },
      ]}
    >
      <Section title="Anatomy">
        <CodeBlock>{`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p>Are you sure you want to delete this item?</p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="danger">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </Section>

      <Section title="Controlled mode">
        <CodeBlock>{`const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button onClick={() => setOpen(true)}>Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* ... */}
    <Button onClick={() => setOpen(false)}>Save changes</Button>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </Section>

      <Section title="Accessibility">
        <div className="prose text-sm">
          <ul>
            <li><strong>Focus trap</strong> — keyboard focus is constrained within the dialog while open. Tab and Shift+Tab cycle through focusable elements.</li>
            <li><strong>Focus restoration</strong> — when the dialog closes, focus returns to the element that triggered it.</li>
            <li><strong>aria-modal</strong> — set on the content element so screen readers understand only the dialog is interactive.</li>
            <li><strong>Escape key</strong> — closes the dialog and triggers <code>onOpenChange(false)</code>.</li>
            <li><strong>Scroll lock</strong> — body scroll is locked while the dialog is open to prevent disorienting movement.</li>
            <li><code>DialogTitle</code> is required. It is announced by screen readers when the dialog opens.</li>
          </ul>
        </div>
      </Section>

      <Section title="Keyboard interaction">
        <div className="overflow-hidden rounded-xl border border-[--loony-color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--loony-color-border] bg-[--loony-color-surface]">
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Key</th>
                <th className="px-4 py-3 text-left font-medium text-[--loony-color-fg-muted]">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Escape", "Close the dialog"],
                ["Tab", "Move focus to next focusable element (wraps)"],
                ["Shift + Tab", "Move focus to previous focusable element (wraps)"],
                ["Enter / Space", "Activate the focused button"],
              ].map(([key, action]) => (
                <tr key={key} className="border-b border-[--loony-color-border] last:border-0">
                  <td className="px-4 py-2.5">
                    <kbd className="rounded border border-[--loony-color-border] bg-[--loony-color-surface] px-1.5 py-0.5 font-mono text-xs">{key}</kbd>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[--loony-color-fg-muted]">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </ComponentDoc>
  );
}
