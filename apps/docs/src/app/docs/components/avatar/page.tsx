import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Avatar, AvatarImage, AvatarFallback } from "@loony/ui";

export default function AvatarPage() {
  return (
    <ComponentDoc
      name="Avatar"
      description="An image element with a fallback for displaying user profile pictures."
      radix="https://www.radix-ui.com/primitives/docs/components/avatar"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "sizes", label: "Sizes" },
        { id: "fallback", label: "Fallback" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Avatar, AvatarImage, AvatarFallback } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        >
          <Avatar size="lg">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </ComponentPreview>
      </Section>

      <Section id="sizes" title="Sizes">
        <ComponentPreview
          code={`<Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
<Avatar size="2xl"><AvatarFallback>2X</AvatarFallback></Avatar>`}
        >
          <div className="flex items-center gap-3">
            <Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
            <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
            <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
            <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
            <Avatar size="2xl"><AvatarFallback>2X</AvatarFallback></Avatar>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="fallback" title="Fallback">
        <p className="mb-4 text-sm text-[--loony-color-fg-muted]">
          When the image fails to load, the fallback text is displayed. Use initials for best results.
        </p>
        <ComponentPreview
          code={`<div className="flex items-center gap-3">
  <Avatar>
    <AvatarImage src="/broken-image.jpg" alt="John Doe" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>✦</AvatarFallback>
  </Avatar>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>✦</AvatarFallback>
            </Avatar>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: "Size of the avatar." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
