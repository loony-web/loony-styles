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
  Avatar,
  AvatarFallback,
  Badge,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  EmptyState,
  FormField,
  Heading,
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
  Skeleton,
  Slider,
  Spinner,
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
];

describe("a11y", () => {
  it.each(cases)("%s has no axe violations", async (_name, ui) => {
    render(ui());
    // Portalled content (dialogs, popovers) renders outside the container.
    toHaveNoViolations(await axe(document.body));
  });
});
