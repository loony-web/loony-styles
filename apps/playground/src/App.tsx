import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Code,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  FormField,
  Heading,
  IconButton,
  Kbd,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Progress,
  RadioGroup,
  RadioItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Switch,
  Tag,
  Text,
  Textarea,
  Toaster,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@loony/ui";
import {
  SearchIcon,
  PlusIcon,
  MoonIcon,
  SunIcon,
} from "@loony/icons";

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState([40]);
  const [progressValue] = useState(65);
  const { toast } = useToast();

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  const simulateLoading = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[--loony-color-bg] text-[--loony-color-fg] font-[--loony-font-sans]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-[--loony-color-border] bg-[--loony-color-bg]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Heading level={1} className="text-xl">
              Loony <Badge variant="subtle" size="sm">Playground</Badge>
            </Heading>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton label={darkMode ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleDark}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>{darkMode ? "Light mode" : "Dark mode"}</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          <Stack gap={12}>
            {/* Buttons */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Buttons</Heading>
              <Stack gap={6}>
                <div>
                  <Text size="sm" color="muted" className="mb-3">Variants</Text>
                  <Stack direction="row" gap={3} wrap="wrap">
                    <Button variant="solid">Solid</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="danger-outline">Danger Outline</Button>
                  </Stack>
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-3">Sizes</Text>
                  <Stack direction="row" gap={3} wrap="wrap" align="center">
                    <Button size="xs">XSmall</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">XLarge</Button>
                  </Stack>
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-3">States</Text>
                  <Stack direction="row" gap={3} wrap="wrap">
                    <Button loading={loading} onClick={simulateLoading}>
                      {loading ? "Loading..." : "Click to Load"}
                    </Button>
                    <Button disabled>Disabled</Button>
                    <Button leftIcon={<PlusIcon />}>With Left Icon</Button>
                    <Button rightIcon={<SearchIcon />}>With Right Icon</Button>
                  </Stack>
                </div>
              </Stack>
            </section>

            {/* Form */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Form Controls</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Stack gap={2}>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="John Doe" leftElement={<SearchIcon size={16} />} />
                </Stack>
                <Stack gap={2}>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
                </Stack>
                <Stack gap={3}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={checked}
                      onCheckedChange={(v) => setChecked(v === true)}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="notifications"
                      checked={switchOn}
                      onCheckedChange={setSwitchOn}
                    />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                </Stack>
                <Stack gap={2}>
                  <Label>Theme preference</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </Stack>
              </div>
            </section>

            {/* Feedback */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Feedback</Heading>
              <Stack gap={4}>
                <Alert variant="info">
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>This is an informational message.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your changes were saved successfully.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>This action may have unintended consequences.</AlertDescription>
                </Alert>
                <Alert variant="danger">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Failed to save. Please try again.</AlertDescription>
                </Alert>
                <Stack direction="row" gap={4} align="center">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </Stack>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Stack>
            </section>

            {/* Display */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Display</Heading>
              <Stack gap={6}>
                <div>
                  <Text size="sm" color="muted" className="mb-3">Badges</Text>
                  <Stack direction="row" gap={2} wrap="wrap">
                    <Badge>Default</Badge>
                    <Badge variant="subtle">Subtle</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="success-subtle">Success Subtle</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                  </Stack>
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-3">Avatars</Text>
                  <Stack direction="row" gap={3} align="center">
                    <Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
                    <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
                    <Avatar size="md"><AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Avatar" /><AvatarFallback>MD</AvatarFallback></Avatar>
                    <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
                    <Avatar size="xl"><AvatarFallback>JD</AvatarFallback></Avatar>
                  </Stack>
                </div>
                <Card className="max-w-sm">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>A surface container for grouped content.</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <Text size="sm" color="muted">
                      Cards can contain any content. Use CardHeader, CardBody, and CardFooter
                      to create consistent layouts.
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                  </CardFooter>
                </Card>
              </Stack>
            </section>

            {/* Overlays */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Overlays</Heading>
              <Stack direction="row" gap={3} wrap="wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>
                        This dialog demonstrates focus trapping, Escape to close, and animations.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <Text size="sm">
                        The dialog body can contain any content including forms, lists, or rich media.
                      </Text>
                    </DialogBody>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Stack>
            </section>

            {/* Navigation */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Navigation</Heading>
              <Tabs defaultValue="components">
                <TabsList>
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="utilities">Utilities</TabsTrigger>
                </TabsList>
                <TabsContent value="components" className="mt-4">
                  <Text>Browse the complete component library.</Text>
                </TabsContent>
                <TabsContent value="tokens" className="mt-4">
                  <Text>Explore design tokens and CSS variables.</Text>
                </TabsContent>
                <TabsContent value="utilities" className="mt-4">
                  <Text>Utility functions and hooks for React.</Text>
                </TabsContent>
              </Tabs>
            </section>

            {/* Accordion */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Accordion</Heading>
              <Accordion type="single" collapsible className="max-w-lg">
                <AccordionItem value="q1">
                  <AccordionTrigger>What is Loony?</AccordionTrigger>
                  <AccordionContent>
                    Loony is a design system you own. Components are copied into your project so you
                    can customize them freely.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. All components follow WCAG 2.1 AA guidelines with keyboard navigation,
                    proper ARIA attributes, and focus management.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. All styling uses CSS variables. Override{" "}
                    <Code>--loony-color-accent</Code> and similar tokens to change the look.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Typography */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">Typography</Heading>
              <Stack gap={3}>
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Text>Body text — the default paragraph style.</Text>
                <Text color="muted">Muted text for secondary information.</Text>
                <Text color="subtle">Subtle text for low-emphasis content.</Text>
                <Text>
                  Inline <Code>code element</Code> inside a paragraph.
                </Text>
                <Text>
                  Press <Kbd>⌘K</Kbd> to open the command palette.
                </Text>
              </Stack>
            </section>
            {/* New components */}
            <section>
              <Heading level={2} className="mb-6 text-2xl">New Components</Heading>
              <Stack gap={8}>

                {/* Drawer */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Drawer / Sheet</Text>
                  <Stack direction="row" gap={3} wrap="wrap">
                    {(["left", "right", "bottom"] as const).map((side) => (
                      <Drawer key={side}>
                        <DrawerTrigger asChild>
                          <Button variant="outline">{side} drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent side={side}>
                          <DrawerHeader>
                            <DrawerTitle>Drawer ({side})</DrawerTitle>
                          </DrawerHeader>
                          <DrawerBody>
                            <Text size="sm" color="muted">Content goes here.</Text>
                          </DrawerBody>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline" size="sm">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    ))}
                  </Stack>
                </div>

                {/* Dropdown */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">DropdownMenu</Text>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Toast */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Toast</Text>
                  <Stack direction="row" gap={2} wrap="wrap">
                    {(["default", "success", "danger", "warning", "info"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant="outline"
                        onClick={() => toast({ title: `${v} toast`, description: "Notification message.", variant: v })}
                      >
                        {v}
                      </Button>
                    ))}
                  </Stack>
                  <Toaster />
                </div>

                {/* Progress */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Progress</Text>
                  <Stack gap={3} className="max-w-sm">
                    <Progress value={progressValue} colorScheme="accent" label="Accent" />
                    <Progress value={85} colorScheme="success" label="Success" />
                    <Progress value={30} colorScheme="danger" label="Danger" />
                    <Progress value={55} colorScheme="warning" label="Warning" />
                  </Stack>
                </div>

                {/* Slider */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Slider — value: {sliderValue[0]}</Text>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    className="max-w-sm"
                    label="Volume"
                  />
                </div>

                {/* Radio */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">RadioGroup</Text>
                  <RadioGroup defaultValue="b">
                    {["Option A", "Option B", "Option C"].map((label, i) => (
                      <div key={label} className="flex items-center gap-2">
                        <RadioItem value={String.fromCharCode(97 + i)} id={`radio-demo-${i}`} />
                        <Label htmlFor={`radio-demo-${i}`}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Tag */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Tags</Text>
                  <Stack direction="row" gap={2} wrap="wrap">
                    <Tag>Default</Tag>
                    <Tag variant="solid">Solid</Tag>
                    <Tag variant="outline">Outline</Tag>
                    <Tag variant="neutral">Neutral</Tag>
                    <Tag onDismiss={() => {}}>Dismissible</Tag>
                  </Stack>
                </div>

                {/* Breadcrumb */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Breadcrumb</Text>
                  <Breadcrumb>
                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem isCurrentPage><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                  </Breadcrumb>
                </div>

                {/* Pagination */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">Pagination</Text>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                      <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationEllipsis /></PaginationItem>
                      <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>

                {/* ScrollArea */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">ScrollArea</Text>
                  <ScrollArea className="h-32 w-64 rounded border border-[--loony-color-border] p-4">
                    {Array.from({ length: 20 }, (_, i) => (
                      <Text key={i} size="sm">Item {i + 1}</Text>
                    ))}
                  </ScrollArea>
                </div>

                {/* EmptyState */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">EmptyState</Text>
                  <EmptyState
                    title="No results found"
                    description="Try adjusting your search or filters to find what you're looking for."
                    action={<Button size="sm">Clear Filters</Button>}
                    className="border border-[--loony-color-border] rounded-lg"
                  />
                </div>

                {/* FormField */}
                <div>
                  <Text size="sm" color="muted" className="mb-3">FormField</Text>
                  <Stack gap={4} className="max-w-sm">
                    <FormField
                      label="Email address"
                      htmlFor="email-demo"
                      helperText="We'll never share your email with anyone."
                      isRequired
                    >
                      <input
                        id="email-demo"
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full rounded-md border border-[--loony-color-border] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--loony-color-ring]"
                      />
                    </FormField>
                    <FormField
                      label="Username"
                      htmlFor="username-demo"
                      errorMessage="Username is already taken."
                    >
                      <input
                        id="username-demo"
                        type="text"
                        placeholder="johndoe"
                        className="w-full rounded-md border border-[--loony-color-danger] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--loony-color-danger]"
                      />
                    </FormField>
                  </Stack>
                </div>
              </Stack>
            </section>

          </Stack>
        </main>
      </div>
    </TooltipProvider>
  );
}
