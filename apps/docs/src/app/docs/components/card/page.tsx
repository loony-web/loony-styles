import {
  CodeBlock,
  ComponentDoc,
  ComponentPreview,
  PackageInstall,
  PropsTable,
  Section,
} from "@/components/component-doc";
import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@loony/ui";

export default function CardPage() {
  return (
    <ComponentDoc
      name="Card"
      description="A surface container for grouping related content. Composed from Card, CardHeader, CardBody, and CardFooter."
      toc={[
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "login-form", label: "Login form" },
        { id: "simple", label: "Simple card" },
        { id: "api", label: "API Reference" },
      ]}
    >
      <Section id="installation" title="Installation">
        <PackageInstall />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock>{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@loony/ui";`}</CodeBlock>
        <ComponentPreview
          code={`<Card className="w-72">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardBody>
    <p className="text-sm text-muted-foreground">
      Your subscription renews in 3 days.
    </p>
  </CardBody>
  <CardFooter>
    <Button size="sm">View all</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="space-y-2 text-sm text-(--loony-color-fg-muted)">
                <p>Your subscription renews in 3 days.</p>
                <p>New comment on your post.</p>
                <p>Deployment completed successfully.</p>
              </div>
            </CardBody>
            <CardFooter>
              <Button size="sm">View all</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Section>

      <Section id="login-form" title="Login form">
        <ComponentPreview
          minHeight={420}
          code={`<Card className="w-80">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>
      Enter your email below to login to your account
    </CardDescription>
  </CardHeader>
  <CardBody className="space-y-4">
    <div className="grid gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" />
    </div>
    <div className="grid gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
    </div>
  </CardBody>
  <CardFooter className="flex-col gap-2">
    <Button className="w-full">Login</Button>
    <Button variant="outline" className="w-full">Login with Google</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="card-email">Email</Label>
                <Input id="card-email" type="email" placeholder="m@example.com" />
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="card-password">Password</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input id="card-password" type="password" />
              </div>
            </CardBody>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full">Login</Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Section>

      <Section id="simple" title="Simple card">
        <ComponentPreview
          code={`<Card className="w-72">
  <CardHeader>
    <CardTitle>Team Members</CardTitle>
    <CardDescription>Invite others to collaborate.</CardDescription>
  </CardHeader>
  <CardBody>
    <p className="text-sm text-muted-foreground">
      You have 3 active team members on your plan.
    </p>
  </CardBody>
  <CardFooter>
    <Button size="sm">Invite member</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Invite others to collaborate.</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-(--loony-color-fg-muted)">
                You have 3 active team members on your plan.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm">Invite member</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Section>

      <Section id="api" title="API Reference">
        <PropsTable
          props={[
            {
              name: "Card",
              type: "div",
              default: "—",
              description: "Root container with border, background, and rounded corners.",
            },
            {
              name: "CardHeader",
              type: "div",
              default: "—",
              description: "Top section — typically holds CardTitle and CardDescription.",
            },
            {
              name: "CardTitle",
              type: "h3",
              default: "—",
              description: "Primary heading rendered as an h3 by default.",
            },
            {
              name: "CardDescription",
              type: "p",
              default: "—",
              description: "Muted subtitle beneath the title.",
            },
            {
              name: "CardBody",
              type: "div",
              default: "—",
              description: "Main content area with consistent padding.",
            },
            {
              name: "CardFooter",
              type: "div",
              default: "—",
              description: "Bottom row with horizontal alignment for actions.",
            },
          ]}
        />
      </Section>
    </ComponentDoc>
  );
}
