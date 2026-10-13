import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, it } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  Command,
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
  Container,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  Flex,
  FormField,
  Grid,
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Input,
  Label,
  Link,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  Spacer,
  Spinner,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index.js";
import { axe, toHaveNoViolations } from "./test/axe-helper.js";

/**
 * Automated axe-core checks for each component in typical, correctly-authored
 * usage. jsdom has no layout engine, so colour-contrast and other visual rules
 * are reported as "incomplete" rather than violations — those still need
 * manual / browser audits (see docs/TODO.md, Phase 18).
 *
 * The CI accessibility job runs this file via `-t a11y`.
 */
const cases: [name: string, ui: () => ReactElement][] = [
  ["Button", () => <Button>Save</Button>],
  ["Button (loading)", () => <Button loading>Save</Button>],
  ["IconButton", () => <IconButton label="Close">×</IconButton>],
  ["Link", () => <Link href="/docs">Docs</Link>],
  [
    "Typography",
    () => (
      <>
        <Heading level={1}>Title</Heading>
        <Text>Body copy</Text>
      </>
    ),
  ],
  [
    "Input with Label",
    () => (
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </>
    ),
  ],
  ["Input (invalid)", () => <Input aria-label="Email" invalid />],
  ["Textarea", () => <Textarea aria-label="Message" />],
  ["Checkbox", () => <Checkbox aria-label="Accept terms" />],
  ["Switch", () => <Switch aria-label="Notifications" />],
  [
    "RadioGroup",
    () => (
      <RadioGroup aria-label="Plan" defaultValue="free">
        <RadioItem value="free" aria-label="Free" />
        <RadioItem value="pro" aria-label="Pro" />
      </RadioGroup>
    ),
  ],
  ["Slider", () => <Slider label="Volume" defaultValue={[50]} />],
  [
    "Combobox",
    () => (
      <Combobox
        label="Framework"
        defaultValue="next"
        options={[
          { value: "next", label: "Next.js" },
          { value: "remix", label: "Remix" },
        ]}
      />
    ),
  ],
  [
    "Command",
    () => (
      <Command label="Commands">
        <CommandInput placeholder="Type a command" />
        <CommandList>
          <CommandItem>Profile</CommandItem>
        </CommandList>
      </Command>
    ),
  ],
  [
    "CommandDialog (open)",
    () => (
      <CommandDialog open label="Quick actions">
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Profile</CommandItem>
        </CommandList>
      </CommandDialog>
    ),
  ],
  ["Slider (range)", () => <Slider label="Price" defaultValue={[10, 90]} />],
  [
    "FormField",
    () => (
      <FormField label="Username" htmlFor="username" helperText="3–16 characters">
        <Input id="username" />
      </FormField>
    ),
  ],
  ["Badge", () => <Badge>New</Badge>],
  [
    "Avatar",
    () => (
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    ),
  ],
  [
    "Card",
    () => (
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Monthly</CardDescription>
        </CardHeader>
        <CardBody>Content</CardBody>
      </Card>
    ),
  ],
  [
    "Tag (dismissible)",
    () => (
      <Tag onDismiss={() => undefined} dismissLabel="Remove React">
        React
      </Tag>
    ),
  ],
  [
    "Table",
    () => (
      <Table>
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  ],
  [
    "Alert",
    () => (
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>
    ),
  ],
  ["Progress", () => <Progress value={40} label="Upload progress" />],
  ["Spinner", () => <Spinner />],
  ["Skeleton", () => <Skeleton className="h-4 w-20" />],
  ["EmptyState", () => <EmptyState title="No results" description="Try another search." />],
  [
    "Accordion (open)",
    () => (
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  ],
  [
    "Tabs",
    () => (
      <Tabs defaultValue="one">
        <TabsList aria-label="Settings">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
      </Tabs>
    ),
  ],
  [
    "Breadcrumb",
    () => (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    ),
  ],
  [
    "Pagination",
    () => (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  ],
  [
    "Dialog (open)",
    () => (
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogContent>
      </Dialog>
    ),
  ],
  [
    "Popover (open)",
    () => (
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        {/* Popover content is role="dialog" — consumers must name it. */}
        <PopoverContent aria-label="Details">Details</PopoverContent>
      </Popover>
    ),
  ],
  [
    "Drawer (open)",
    () => (
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Site sections</DrawerDescription>
        </DrawerContent>
      </Drawer>
    ),
  ],
  [
    "DropdownMenu (open)",
    () => (
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
  [
    "Select (open)",
    () => (
      <Select defaultOpen>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    ),
  ],
  [
    "HoverCard (open)",
    () => (
      <HoverCard defaultOpen>
        <HoverCardTrigger href="/u/ada">@ada</HoverCardTrigger>
        <HoverCardContent>Ada Lovelace</HoverCardContent>
      </HoverCard>
    ),
  ],
  [
    "Tooltip (open)",
    () => (
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipContent>Save your changes</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  ],
  [
    "ScrollArea",
    () => (
      <ScrollArea className="h-24 w-48">
        <p>Long content</p>
      </ScrollArea>
    ),
  ],
  ["Toaster", () => <Toaster />],
  [
    "Layout primitives",
    () => (
      <Container>
        <Stack gap={2}>
          <Flex gap={2}>
            <Box>One</Box>
            <Spacer />
            <Box>Two</Box>
          </Flex>
          <Grid cols={2}>
            <div>A</div>
            <div>B</div>
          </Grid>
          <AspectRatio ratio={16 / 9}>
            <div>Media</div>
          </AspectRatio>
        </Stack>
      </Container>
    ),
  ],
];

describe("a11y", () => {
  it.each(cases)("%s has no axe violations", async (_name, ui) => {
    render(ui());
    // Portalled content (dialogs, popovers) renders outside the container.
    toHaveNoViolations(await axe(document.body));
  });
});
