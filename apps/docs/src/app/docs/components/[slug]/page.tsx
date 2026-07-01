import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock, ComponentDoc, Section } from "@/components/component-doc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const componentData: Record<
  string,
  {
    name: string;
    description: string;
    radix?: string;
    aria?: string[];
    status?: "stable" | "beta" | "experimental";
    import: string;
    usage: string;
  }
> = {
  badge: {
    name: "Badge",
    description: "Small status indicator or label with 10 semantic color variants and 3 sizes.",
    aria: [],
    import: `import { Badge } from "@/components/ui/badge"`,
    usage: `<Badge>New</Badge>
<Badge variant="success-subtle">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="warning">Pending</Badge>`,
  },
  avatar: {
    name: "Avatar",
    description: "User avatar with image, fallback initials, and 6 size variants. Built on Radix UI Avatar.",
    radix: "https://www.radix-ui.com/docs/primitives/components/avatar",
    import: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    usage: `<Avatar size="md">
  <AvatarImage src="/avatar.jpg" alt="Jane Cooper" />
  <AvatarFallback>JC</AvatarFallback>
</Avatar>`,
  },
  accordion: {
    name: "Accordion",
    description: "Vertically stacked collapsible sections with keyboard navigation. Built on Radix UI Accordion.",
    radix: "https://www.radix-ui.com/docs/primitives/components/accordion",
    aria: ["region", "button"],
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
    name: "Tabs",
    description: "Tabbed navigation with keyboard support and full ARIA. Built on Radix UI Tabs.",
    radix: "https://www.radix-ui.com/docs/primitives/components/tabs",
    aria: ["tablist", "tab", "tabpanel"],
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
    name: "Select",
    description: "Accessible custom select with keyboard navigation, groups, and scroll buttons. Built on Radix UI Select.",
    radix: "https://www.radix-ui.com/docs/primitives/components/select",
    aria: ["listbox", "option"],
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
    name: "Checkbox",
    description: "Binary selection control with indeterminate support. Built on Radix UI Checkbox.",
    radix: "https://www.radix-ui.com/docs/primitives/components/checkbox",
    aria: ["checkbox"],
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
    name: "Switch",
    description: "Toggle control for binary on/off state. Built on Radix UI Switch.",
    radix: "https://www.radix-ui.com/docs/primitives/components/switch",
    aria: ["switch"],
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
    name: "Tooltip",
    description: "Contextual hint shown on hover/focus. For non-interactive supplementary content only.",
    radix: "https://www.radix-ui.com/docs/primitives/components/tooltip",
    aria: ["tooltip"],
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
    name: "Toast",
    description: "Accessible notifications with 5 variants, auto-dismiss, and imperative API via useToast().",
    radix: "https://www.radix-ui.com/docs/primitives/components/toast",
    aria: ["status"],
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
    name: "Progress",
    description: "Linear progress bar with 4 color schemes and 4 sizes. Built on Radix UI Progress.",
    radix: "https://www.radix-ui.com/docs/primitives/components/progress",
    aria: ["progressbar"],
    import: `import { Progress } from "@/components/ui/progress"`,
    usage: `<Progress value={60} label="Upload progress" />
<Progress value={85} colorScheme="success" label="Success" />
<Progress value={30} colorScheme="danger" size="sm" label="Error" />`,
  },
  drawer: {
    name: "Drawer",
    description: "Side panel overlay from left, right, top, or bottom. Shares the Dialog accessibility contract.",
    aria: ["dialog"],
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
    name: "Card",
    description: "Surface container with header, body, and footer compound components.",
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
    name: "Alert",
    description: "Inline status messages with semantic variants and auto-selected icons.",
    aria: ["alert"],
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
    name: "DropdownMenu",
    description: "Floating context menu with items, submenus, checkboxes, and radio groups. Built on Radix UI DropdownMenu.",
    radix: "https://www.radix-ui.com/docs/primitives/components/dropdown-menu",
    aria: ["menu", "menuitem"],
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
    name: "Command",
    description: "Command palette with fuzzy search, keyboard navigation, and modal mode. Powered by cmdk.",
    aria: ["combobox", "listbox"],
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
    name: "IconButton",
    description: "A square button for icon-only actions. Requires an accessible label — renders sr-only text or aria-label.",
    aria: ["button"],
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
    name: "Link",
    description: "A styled anchor component with external link detection and icon support.",
    aria: ["link"],
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
    name: "Typography",
    description: "Semantic heading and body text components with correct HTML elements and token-driven styles.",
    import: `import { Heading, Text, Code, Lead } from "@/components/ui/typography"`,
    usage: `<Heading as="h1" size="4xl">Page Title</Heading>
<Heading as="h2" size="2xl">Section</Heading>

<Lead>A brief introductory paragraph that stands out.</Lead>

<Text>Regular body text. Defaults to <p>.</Text>
<Text size="sm" color="muted">Smaller muted text.</Text>

<Code>const x = 42</Code>`,
  },
  spinner: {
    name: "Spinner",
    description: "Animated loading indicator with 4 sizes. Renders with role='status' and a sr-only label.",
    aria: ["status"],
    import: `import { Spinner } from "@/components/ui/spinner"`,
    usage: `<Spinner />
<Spinner size="sm" />
<Spinner size="lg" label="Loading data..." />

{/* Conditionally render based on loading state */}
{isLoading ? <Spinner /> : <DataTable rows={rows} />}`,
  },
  textarea: {
    name: "Textarea",
    description: "Multi-line text input with auto-resize, validation state, and min/max rows.",
    aria: ["textbox"],
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
    name: "Radio",
    description: "Radio button group for single selection. Built on Radix UI RadioGroup.",
    radix: "https://www.radix-ui.com/docs/primitives/components/radio-group",
    aria: ["radiogroup", "radio"],
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
    name: "Slider",
    description: "Range input with keyboard navigation, multiple thumbs for range selection, and 3 sizes.",
    radix: "https://www.radix-ui.com/docs/primitives/components/slider",
    aria: ["slider"],
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
    name: "FormField",
    description: "Wraps any form control with a label, helper text, and error message. Handles ARIA wiring automatically.",
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
    name: "Label",
    description: "Accessible form label built on Radix UI Label. Clicking it focuses the associated control.",
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
    name: "Stack",
    description: "Vertical or horizontal flex container with consistent gap and alignment props.",
    import: `import { Stack } from "@/components/ui/layout"`,
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
    name: "Flex",
    description: "Low-level flex container with full control over direction, wrap, align, justify, and gap.",
    import: `import { Flex } from "@/components/ui/layout"`,
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
    name: "Grid",
    description: "CSS Grid container with column count, gap, and auto-responsive variants.",
    import: `import { Grid } from "@/components/ui/layout"`,
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
    name: "Container",
    description: "Max-width wrapper with centered horizontal padding. Responsive size variants.",
    import: `import { Container } from "@/components/ui/layout"`,
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
    name: "Box",
    description: "Generic layout primitive — a div with no opinions. Use when none of the semantic layout components fit.",
    import: `import { Box } from "@/components/ui/layout"`,
    usage: `<Box className="bg-surface rounded-xl p-6">
  <Heading as="h2">Custom layout</Heading>
</Box>

{/* Polymorphic */}
<Box as="section" className="py-16">
  ...
</Box>`,
  },
  "aspect-ratio": {
    name: "AspectRatio",
    description: "Constrains children to a specific aspect ratio. Built on Radix UI AspectRatio.",
    radix: "https://www.radix-ui.com/docs/primitives/components/aspect-ratio",
    import: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
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
    name: "Spacer",
    description: "Invisible element that pushes siblings apart. Renders aria-hidden. Prefer gap when possible.",
    import: `import { Spacer } from "@/components/ui/layout"`,
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
    name: "Skeleton",
    description: "Placeholder loading state with pulse animation. Use it to match the shape of the content it replaces.",
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
    name: "Tag",
    description: "Dismissible label chip with 4 visual variants and 3 sizes. Optional onDismiss for removable tags.",
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
    name: "Table",
    description: "Semantic HTML table with styled header, body, footer, and row selection state.",
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
    name: "EmptyState",
    description: "Zero-data placeholder with icon, title, description, and optional CTA slot.",
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
    name: "Popover",
    description: "Floating content panel anchored to a trigger. Supports all placement sides. Built on Radix UI Popover.",
    radix: "https://www.radix-ui.com/docs/primitives/components/popover",
    aria: ["dialog"],
    import: `import {
  Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover"`,
    usage: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <div className="space-y-3">
      <Heading as="h3" size="sm">Filter options</Heading>
      <div className="space-y-2">
        <Checkbox id="active" />
        <Label htmlFor="active">Show active only</Label>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
  },
  "hover-card": {
    name: "HoverCard",
    description: "Preview card revealed on hover for sighted users with pointing devices. Built on Radix UI HoverCard.",
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
    name: "Breadcrumb",
    description: "Navigation trail showing hierarchy. Uses <nav aria-label='Breadcrumb'> and structured list markup.",
    aria: ["navigation"],
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
    name: "Pagination",
    description: "Page navigation with prev/next, page number buttons, and ellipsis for large page counts.",
    aria: ["navigation"],
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
    name: "ScrollArea",
    description: "Custom scrollbar with consistent cross-browser styling. Built on Radix UI ScrollArea.",
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
  const data = componentData[slug];
  return { title: data?.name ?? slug };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;

  if (DEDICATED_PAGES.has(slug)) {
    notFound();
  }

  const data = componentData[slug];
  if (!data) notFound();

  return (
    <ComponentDoc
      name={data.name}
      description={data.description}
      radix={data.radix}
      aria={data.aria}
      status={data.status ?? "stable"}
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
