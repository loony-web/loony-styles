import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@loony/ui";

export default function TabsPage() {
  return (
    <ComponentDoc
      name="Tabs"
      description="A set of layered sections of content that are displayed one at a time."
      radix="https://www.radix-ui.com/primitives/docs/components/tabs"
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "controlled", label: "Controlled" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Tabs defaultValue="account" className="w-96">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-sm text-muted-foreground">
      Make changes to your account here.
    </p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-sm text-muted-foreground">
      Change your password here.
    </p>
  </TabsContent>
  <TabsContent value="settings">
    <p className="text-sm text-muted-foreground">
      Manage your settings here.
    </p>
  </TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="account" className="w-80">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="p-2 text-sm text-(--loony-color-fg-muted)">
                Make changes to your account here.
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="p-2 text-sm text-(--loony-color-fg-muted)">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="p-2 text-sm text-(--loony-color-fg-muted)">
                Manage your settings here.
              </p>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </Section>

      <Section id="controlled" title="Disabled tab">
        <ComponentPreview
          code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Active</TabsTrigger>
    <TabsTrigger value="tab2">Normal</TabsTrigger>
    <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Active tab content.</TabsContent>
  <TabsContent value="tab2">Normal tab content.</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Active</TabsTrigger>
              <TabsTrigger value="tab2">Normal</TabsTrigger>
              <TabsTrigger value="tab3" disabled>
                Disabled
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="p-2 text-sm text-(--loony-color-fg-muted)">Active tab content.</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="p-2 text-sm text-(--loony-color-fg-muted)">Normal tab content.</p>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "defaultValue",
              type: "string",
              default: "—",
              description: "Initial active tab (uncontrolled).",
            },
            { name: "value", type: "string", default: "—", description: "Controlled active tab." },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "—",
              description: "Callback when active tab changes.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Orientation of the tab list.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
