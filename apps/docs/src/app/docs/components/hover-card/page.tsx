import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar, AvatarFallback } from "@loony/ui";

export default function HoverCardPage() {
  return (
    <ComponentDoc
      name="HoverCard"
      description="For sighted users to preview content available behind a link."
      radix="https://www.radix-ui.com/primitives/docs/components/hover-card"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { HoverCard, HoverCardTrigger, HoverCardContent } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-sm font-medium underline underline-offset-4">
      @loonyui
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>LU</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@loonyui</h4>
        <p className="text-sm text-muted-foreground">
          Production-grade React component library.
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Joined January 2025</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href="#" className="text-sm font-medium underline underline-offset-4 text-[--loony-color-accent]">
                @loonyui
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>LU</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[--loony-color-fg]">@loonyui</h4>
                  <p className="text-sm text-[--loony-color-fg-muted]">
                    Production-grade React component library.
                  </p>
                  <p className="text-xs text-[--loony-color-fg-subtle]">Joined January 2025</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "—", description: "Initial open state (uncontrolled)." },
            { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
            { name: "openDelay", type: "number", default: "700", description: "Delay in ms before opening on hover." },
            { name: "closeDelay", type: "number", default: "300", description: "Delay in ms before closing after hover ends." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
