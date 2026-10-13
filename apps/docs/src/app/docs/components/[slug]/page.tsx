import { CodeBlock, ComponentDoc, type ComponentStatus, Section } from "@/components/component-doc";
import registry from "@loony/ui/registry.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Defined here, not in component-doc.tsx: that module is a client component, and
// a server component cannot call functions exported from it.
const STATUSES: readonly string[] = ["stable", "beta", "experimental", "deprecated"];
const isComponentStatus = (value: string): value is ComponentStatus => STATUSES.includes(value);

/** Name, description, status and ARIA roles come from the shared component registry. */
const registryItems = new Map(registry.components.map((item) => [item.name, item]));

/** Docs-only content for components without a dedicated page. */
const componentData: Record<
  string,
  {
    radix?: string;
    import: string;
    usage: string;
  }
> = {
  badge: {
    import: `import { Badge } from "@/components/ui/badge"`,
    usage: `<Badge>New</Badge>
<Badge variant="success-subtle">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="warning">Pending</Badge>`,
  },
  avatar: {
    radix: "https://www.radix-ui.com/docs/primitives/components/avatar",
    import: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    usage: `<Avatar size="md">
  <AvatarImage src="/avatar.jpg" alt="Jane Cooper" />
  <AvatarFallback>JC</AvatarFallback>
</Avatar>`,
  },
  accordion: {
    radix: "https://www.radix-ui.com/docs/primitives/components/accordion",
    import: `import {
  Accordion, AccordionItem,
  AccordionTrigger, AccordionContent
} from "@/components/ui/accordion"`,
    usage: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. Follows WAI-ARIA Disclosure pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  tabs: {
    radix: "https://www.radix-ui.com/docs/primitives/components/tabs",
    import: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    usage: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>`,
  },
  select: {
    radix: "https://www.radix-ui.com/docs/primitives/components/select",
    import: `import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem, SelectGroup, SelectLabel
} from "@/components/ui/select"`,
    usage: `<Select defaultValue="light">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Appearance</SelectLabel>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  },
  checkbox: {
    radix: "https://www.radix-ui.com/docs/primitives/components/checkbox",
    import: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`,
    usage: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

{/* Indeterminate */}
<Checkbox checked="indeterminate" aria-label="Select all" />`,
  },
  switch: {
    radix: "https://www.radix-ui.com/docs/primitives/components/switch",
    import: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`,
    usage: `const [enabled, setEnabled] = useState(false)

<div className="flex items-center gap-2">
  <Switch
    id="notifications"
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`,
  },
  tooltip: {
    radix: "https://www.radix-ui.com/docs/primitives/components/tooltip",
    import: `import {
  Tooltip, TooltipTrigger,
  TooltipContent, TooltipProvider
} from "@/components/ui/tooltip"`,
    usage: `// Wrap your app (or layout) with TooltipProvider once
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="sm">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Save document (⌘S)</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  toast: {
    radix: "https://www.radix-ui.com/docs/primitives/components/toast",
    import: `import { Toaster, useToast } from "@/components/ui/toast"`,
    usage: `// 1. Add Toaster to your layout (once)
<Toaster />

// 2. Use the hook anywhere
function MyComponent() {
  const { toast } = useToast()

  return (
    <Button onClick={() => toast({
      title: "Saved!",
      description: "Your changes have been saved.",
      variant: "success",
    })}>
      Save
    </Button>
  )
}`,
  },
  progress: {
    radix: "https://www.radix-ui.com/docs/primitives/components/progress",
    import: `import { Progress } from "@/components/ui/progress"`,
    usage: `<Progress value={60} label="Upload progress" />
<Progress value={85} colorScheme="success" label="Success" />
<Progress value={30} colorScheme="danger" size="sm" label="Error" />`,
  },
  drawer: {
    import: `import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerBody,
  DrawerFooter, DrawerClose
} from "@/components/ui/drawer"`,
    usage: `<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Settings</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
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
</Drawer>`,
  },
  card: {
    import: `import {
  Card, CardHeader, CardTitle, CardDescription,
  CardBody, CardFooter
} from "@/components/ui/card"`,
    usage: `<Card>
  <CardHeader>
    <CardTitle>Account settings</CardTitle>
    <CardDescription>Manage your account preferences.</CardDescription>
  </CardHeader>
  <CardBody>
    {/* content */}
  </CardBody>
  <CardFooter>
    <Button size="sm">Save changes</Button>
  </CardFooter>
</Card>`,
  },
  alert: {
    import: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    usage: `<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>You have 3 unread messages.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Published</AlertTitle>
  <AlertDescription>Your post is now live.</AlertDescription>
</Alert>

<Alert variant="danger">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Failed to save changes.</AlertDescription>
</Alert>`,
  },
  "dropdown-menu": {
    radix: "https://www.radix-ui.com/docs/primitives/components/dropdown-menu",
    import: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"`,
    usage: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  command: {
    import: `import {
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
  CommandDialog, CommandSeparator, CommandShortcut
} from "@/components/ui/command"`,
    usage: `// Inline
<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

// Modal (CommandDialog)
const [open, setOpen] = useState(false)
// Bind to ⌘K:
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((v) => !v)
    }
  }
  document.addEventListener("keydown", handler)
  return () => document.removeEventListener("keydown", handler)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  {/* same structure as inline */}
</CommandDialog>`,
  },
  "icon-button": {
    import: `import { IconButton } from "@/components/ui/icon-button"
import { TrashIcon } from "@loony/icons"`,
    usage: `{/* label prop renders sr-only text */}
<IconButton label="Delete item">
  <TrashIcon className="h-4 w-4" />
</IconButton>

{/* Variants and sizes match Button */}
<IconButton label="Settings" variant="ghost" size="sm">
  <SettingsIcon className="h-4 w-4" />
</IconButton>

<IconButton label="Loading" loading>
  <RefreshIcon className="h-4 w-4" />
</IconButton>`,
  },
  link: {
    import: `import { Link } from "@/components/ui/link"`,
    usage: `<Link href="/docs">Documentation</Link>

{/* External links get target="_blank" + rel="noopener noreferrer" automatically */}
<Link href="https://github.com/youorg/loony" external>
  GitHub ↗
</Link>

{/* Variants */}
<Link href="/pricing" variant="subtle">Pricing</Link>`,
  },
  typography: {
    import: `import { Heading, Text, Code, Lead } from "@/components/ui/typography"`,
    usage: `<Heading as="h1" size="4xl">Page Title</Heading>
<Heading as="h2" size="2xl">Section</Heading>

<Lead>A brief introductory paragraph that stands out.</Lead>

<Text>Regular body text. Defaults to <p>.</Text>
<Text size="sm" color="muted">Smaller muted text.</Text>

<Code>const x = 42</Code>`,
  },
  spinner: {
    import: `import { Spinner } from "@/components/ui/spinner"`,
    usage: `<Spinner />
<Spinner size="sm" />
<Spinner size="lg" label="Loading data..." />

{/* Conditionally render based on loading state */}
{isLoading ? <Spinner /> : <DataTable rows={rows} />}`,
  },
  textarea: {
    import: `import { Textarea } from "@/components/ui/textarea"`,
    usage: `<Textarea placeholder="Write your message..." />

{/* Auto-resize as user types */}
<Textarea autoResize minRows={3} maxRows={8} />

{/* Error state */}
<Textarea
  isInvalid
  defaultValue="This field has an error"
  aria-describedby="error-msg"
/>
<p id="error-msg" className="text-danger text-xs">Required field.</p>`,
  },
  radio: {
    radix: "https://www.radix-ui.com/docs/primitives/components/radio-group",
    import: `import { RadioGroup, RadioItem } from "@/components/ui/radio"`,
    usage: `<RadioGroup defaultValue="option-1">
  <RadioItem value="option-1">Option 1</RadioItem>
  <RadioItem value="option-2">Option 2</RadioItem>
  <RadioItem value="option-3" disabled>Option 3 (disabled)</RadioItem>
</RadioGroup>

{/* Controlled */}
const [value, setValue] = useState("option-1")

<RadioGroup value={value} onValueChange={setValue}>
  <RadioItem value="light">Light</RadioItem>
  <RadioItem value="dark">Dark</RadioItem>
</RadioGroup>`,
  },
  slider: {
    radix: "https://www.radix-ui.com/docs/primitives/components/slider",
    import: `import { Slider } from "@/components/ui/slider"`,
    usage: `{/* Single value */}
<Slider defaultValue={[50]} max={100} step={1} />

{/* Range (two thumbs) */}
<Slider defaultValue={[20, 80]} max={100} step={5} />

{/* Controlled */}
const [value, setValue] = useState([40])
<Slider value={value} onValueChange={setValue} max={100} />

{/* Vertical */}
<Slider defaultValue={[60]} orientation="vertical" className="h-40" />`,
  },
  "form-field": {
    import: `import { FormField } from "@/components/ui/form-field"`,
    usage: `<FormField
  label="Email address"
  htmlFor="email"
  helperText="We'll never share your email."
>
  <Input id="email" type="email" />
</FormField>

{/* With error */}
<FormField
  label="Username"
  htmlFor="username"
  errorMessage="Username is already taken."
>
  <Input id="username" isInvalid defaultValue="taken_user" />
</FormField>

{/* Required field */}
<FormField label="Full name" htmlFor="name" isRequired>
  <Input id="name" />
</FormField>`,
  },
  label: {
    radix: "https://www.radix-ui.com/docs/primitives/components/label",
    import: `import { Label } from "@/components/ui/label"`,
    usage: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>

{/* With checkbox */}
<div className="flex items-center gap-2">
  <Checkbox id="marketing" />
  <Label htmlFor="marketing">Receive marketing emails</Label>
</div>`,
  },
  stack: {
    import: `import { Stack } from "@/components/ui/stack"`,
    usage: `{/* Vertical (default) */}
<Stack gap="4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stack>

{/* Horizontal */}
<Stack direction="row" gap="2" align="center">
  <Spinner size="sm" />
  <Text>Loading...</Text>
</Stack>`,
  },
  flex: {
    import: `import { Flex } from "@/components/ui/layout/flex"`,
    usage: `<Flex direction="row" align="center" justify="between" gap="4">
  <Logo />
  <nav>...</nav>
  <Button>Sign in</Button>
</Flex>

{/* Polymorphic */}
<Flex as="nav" direction="row" gap="6">
  <Link href="/">Home</Link>
  <Link href="/docs">Docs</Link>
</Flex>`,
  },
  grid: {
    import: `import { Grid } from "@/components/ui/layout/grid"`,
    usage: `{/* Fixed columns */}
<Grid cols={3} gap="6">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</Grid>

{/* Auto-fit responsive */}
<Grid cols="auto-fill" minChildWidth="280px" gap="4">
  {products.map((p) => <ProductCard key={p.id} {...p} />)}
</Grid>`,
  },
  container: {
    import: `import { Container } from "@/components/ui/layout/container"`,
    usage: `{/* Default: max-w-6xl */}
<Container>
  <PageContent />
</Container>

{/* Size variants */}
<Container size="sm">   {/* max-w-2xl */}
  <ArticleContent />
</Container>

<Container size="full">  {/* 100% width */}
  <FullWidthBanner />
</Container>`,
  },
  box: {
    import: `import { Box } from "@/components/ui/layout/box"`,
    usage: `<Box className="bg-surface rounded-xl p-6">
  <Heading as="h2">Custom layout</Heading>
</Box>

{/* Render a different element with asChild */}
<Box asChild className="py-16">
  <section>...</section>
</Box>`,
  },
  "aspect-ratio": {
    radix: "https://www.radix-ui.com/docs/primitives/components/aspect-ratio",
    import: `import { AspectRatio } from "@/components/ui/layout/aspect-ratio"`,
    usage: `{/* 16:9 video thumbnail */}
<AspectRatio ratio={16 / 9}>
  <img
    src="/thumbnail.jpg"
    alt="Video thumbnail"
    className="h-full w-full object-cover rounded-lg"
  />
</AspectRatio>

{/* Square avatar */}
<div className="w-32">
  <AspectRatio ratio={1}>
    <img src="/avatar.jpg" alt="User" className="h-full w-full object-cover" />
  </AspectRatio>
</div>`,
  },
  spacer: {
    import: `import { Spacer } from "@/components/ui/layout/spacer"`,
    usage: `{/* Push nav items to opposite ends */}
<Flex direction="row" align="center">
  <Logo />
  <Spacer />
  <Button>Sign in</Button>
</Flex>

{/* Fixed size spacer */}
<Heading as="h1">Title</Heading>
<Spacer size="8" />
<Text>Content below with 32px gap above</Text>`,
  },
  skeleton: {
    import: `import { Skeleton } from "@/components/ui/skeleton"`,
    usage: `{/* Line skeletons */}
<div className="space-y-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-4 w-5/6" />
</div>

{/* Card skeleton */}
<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`,
  },
  tag: {
    import: `import { Tag } from "@/components/ui/tag"`,
    usage: `<Tag>React</Tag>
<Tag variant="solid">TypeScript</Tag>
<Tag variant="outline">Next.js</Tag>

{/* Dismissible */}
const [tags, setTags] = useState(["React", "TypeScript"])

{tags.map((tag) => (
  <Tag
    key={tag}
    onDismiss={() => setTags((t) => t.filter((t) => t !== tag))}
  >
    {tag}
  </Tag>
))}`,
  },
  table: {
    import: `import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption
} from "@/components/ui/table"`,
    usage: `<Table>
  <TableCaption>Monthly revenue report</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Month</TableHead>
      <TableHead>Revenue</TableHead>
      <TableHead>Growth</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>January</TableCell>
      <TableCell>$12,400</TableCell>
      <TableCell>+8.2%</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  "empty-state": {
    import: `import { EmptyState } from "@/components/ui/empty-state"
import { FolderOpenIcon } from "@loony/icons"`,
    usage: `<EmptyState
  icon={<FolderOpenIcon className="h-10 w-10" />}
  title="No projects yet"
  description="Create your first project to get started."
  action={
    <Button>New project</Button>
  }
/>`,
  },
  popover: {
    radix: "https://www.radix-ui.com/docs/primitives/components/popover",
    import: `import {
  Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover"`,
    usage: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Filter options" className="w-72">
    <div className="space-y-3">
      <Heading level={5} as="h3">Filter options</Heading>
      <div className="space-y-2">
        <Checkbox id="active" />
        <Label htmlFor="active">Show active only</Label>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
  },
  "hover-card": {
    radix: "https://www.radix-ui.com/docs/primitives/components/hover-card",
    import: `import {
  HoverCard, HoverCardTrigger, HoverCardContent
} from "@/components/ui/hover-card"`,
    usage: `<HoverCard>
  <HoverCardTrigger asChild>
    <Link href="/users/janedoe">@janedoe</Link>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="/janedoe.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">Jane Doe</p>
        <p className="text-sm text-muted">Product designer</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
  },
  breadcrumb: {
    import: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from "@/components/ui/breadcrumb"`,
    usage: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Button</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  pagination: {
    import: `import { Pagination } from "@/components/ui/pagination"`,
    usage: `const [page, setPage] = useState(1)

<Pagination
  page={page}
  totalPages={24}
  onPageChange={setPage}
/>

{/* Compact for tight spaces */}
<Pagination
  page={page}
  totalPages={8}
  onPageChange={setPage}
  compact
/>`,
  },
  "scroll-area": {
    radix: "https://www.radix-ui.com/docs/primitives/components/scroll-area",
    import: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    usage: `{/* Fixed-height container with custom scrollbar */}
<ScrollArea className="h-72 rounded-md border p-4">
  {longContentArray.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</ScrollArea>

{/* Horizontal scroll */}
<ScrollArea orientation="horizontal">
  <div className="flex gap-4 w-max">
    {items.map((item) => <Card key={item.id}>{item.name}</Card>)}
  </div>
</ScrollArea>`,
  },
};

// Redirect specific pages to their own files
const DEDICATED_PAGES = new Set(["button", "dialog", "input"]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: registryItems.get(slug)?.displayName ?? slug };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;

  if (DEDICATED_PAGES.has(slug)) {
    notFound();
  }

  const data = componentData[slug];
  const meta = registryItems.get(slug);
  if (!data || !meta) notFound();

  return (
    <ComponentDoc
      name={meta.displayName}
      description={meta.description}
      radix={data.radix}
      aria={meta.ariaRoles}
      status={isComponentStatus(meta.status) ? meta.status : "experimental"}
    >
      <Section title="Import">
        <CodeBlock>{data.import}</CodeBlock>
      </Section>
      <Section title="Usage">
        <CodeBlock>{data.usage}</CodeBlock>
      </Section>
    </ComponentDoc>
  );
}
