import { ComponentDoc, ComponentPreview, PackageInstall, Section, CodeBlock, PropsTable } from "@/components/component-doc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@loony/ui";

export default function BreadcrumbPage_() {
  return (
    <ComponentDoc
      name="Breadcrumb"
      description="Displays the path to the current resource using a hierarchy of links."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "with-ellipsis", label: "With ellipsis" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbPage>Components</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Documentation</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </ComponentPreview>
      </Section>

      <Section id="with-ellipsis" title="With ellipsis">
        <ComponentPreview
          code={`<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbEllipsis />
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbPage>Button</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbPage>Button</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            { name: "separator", type: "ReactNode", default: "<ChevronRightIcon />", description: "Custom separator between items." },
            { name: "isCurrentPage", type: "boolean", default: "false", description: "Marks the item as the current page (adds aria-current)." },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
