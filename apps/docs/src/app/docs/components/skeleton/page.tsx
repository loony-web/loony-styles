import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock } from "@/components/component-doc";
import { Skeleton } from "@loony/ui";

export default function SkeletonPage() {
  return (
    <ComponentDoc
      name="Skeleton"
      description="Used to show a placeholder while content is loading."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "card-skeleton", label: "Card skeleton" },
        { id: "profile-skeleton", label: "Profile skeleton" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Skeleton } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview code={`<Skeleton className="h-4 w-48 rounded" />`}>
          <Skeleton className="h-4 w-48 rounded" />
        </ComponentPreview>
      </Section>

      <Section id="card-skeleton" title="Card skeleton">
        <ComponentPreview
          code={`<div className="w-72 space-y-3 rounded-xl border border-[--loony-color-border] p-5">
  <Skeleton className="h-32 w-full rounded-lg" />
  <Skeleton className="h-4 w-3/4 rounded" />
  <Skeleton className="h-4 w-1/2 rounded" />
  <div className="flex gap-2 pt-1">
    <Skeleton className="h-8 w-20 rounded-md" />
    <Skeleton className="h-8 w-16 rounded-md" />
  </div>
</div>`}
        >
          <div className="w-72 space-y-3 rounded-xl border border-[--loony-color-border] p-5">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Section id="profile-skeleton" title="Profile skeleton">
        <ComponentPreview
          code={`<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-32 rounded" />
    <Skeleton className="h-3 w-24 rounded" />
  </div>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
          </div>
        </ComponentPreview>
      </Section>
    </ComponentDoc>
  );
}
