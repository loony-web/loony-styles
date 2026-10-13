"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const nav: NavGroup[] = [
  {
    group: "Getting started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/getting-started" },
      { label: "CLI", href: "/docs/cli" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
  {
    group: "Foundation",
    items: [
      { label: "Button", href: "/docs/components/button" },
      { label: "IconButton", href: "/docs/components/icon-button" },
      { label: "Link", href: "/docs/components/link" },
      { label: "Typography", href: "/docs/components/typography" },
      { label: "Spinner", href: "/docs/components/spinner" },
    ],
  },
  {
    group: "Form",
    items: [
      { label: "Input", href: "/docs/components/input" },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Checkbox", href: "/docs/components/checkbox" },
      { label: "Switch", href: "/docs/components/switch" },
      { label: "Select", href: "/docs/components/select" },
      { label: "Combobox", href: "/docs/components/combobox" },
      { label: "Radio", href: "/docs/components/radio" },
      { label: "Slider", href: "/docs/components/slider" },
      { label: "FormField", href: "/docs/components/form-field" },
      { label: "Label", href: "/docs/components/label" },
    ],
  },
  {
    group: "Layout",
    items: [
      { label: "Stack", href: "/docs/components/stack" },
      { label: "Flex", href: "/docs/components/flex" },
      { label: "Grid", href: "/docs/components/grid" },
      { label: "Container", href: "/docs/components/container" },
      { label: "Box", href: "/docs/components/box" },
      { label: "AspectRatio", href: "/docs/components/aspect-ratio" },
      { label: "Spacer", href: "/docs/components/spacer" },
    ],
  },
  {
    group: "Display",
    items: [
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Accordion", href: "/docs/components/accordion" },
      { label: "Skeleton", href: "/docs/components/skeleton" },
      { label: "Tag", href: "/docs/components/tag" },
      { label: "Table", href: "/docs/components/table" },
    ],
  },
  {
    group: "Feedback",
    items: [
      { label: "Alert", href: "/docs/components/alert" },
      { label: "Toast", href: "/docs/components/toast" },
      { label: "Progress", href: "/docs/components/progress" },
      { label: "EmptyState", href: "/docs/components/empty-state" },
    ],
  },
  {
    group: "Overlay",
    items: [
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Drawer", href: "/docs/components/drawer" },
      { label: "Tooltip", href: "/docs/components/tooltip" },
      { label: "Popover", href: "/docs/components/popover" },
      { label: "HoverCard", href: "/docs/components/hover-card" },
    ],
  },
  {
    group: "Navigation",
    items: [
      { label: "Tabs", href: "/docs/components/tabs" },
      { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { label: "Pagination", href: "/docs/components/pagination" },
      { label: "DropdownMenu", href: "/docs/components/dropdown-menu" },
    ],
  },
  {
    group: "Advanced",
    items: [
      { label: "Command", href: "/docs/components/command" },
      { label: "ScrollArea", href: "/docs/components/scroll-area" },
    ],
  },
  {
    group: "Tokens",
    items: [
      { label: "Colors", href: "/docs/tokens/colors" },
      { label: "Typography", href: "/docs/tokens/typography" },
      { label: "Spacing", href: "/docs/tokens/spacing" },
      { label: "Motion", href: "/docs/tokens/motion" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0">
      <nav
        className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-4"
        aria-label="Docs navigation"
      >
        {nav.map((section) => (
          <div key={section.group} className="mb-4">
            <p className="mb-1 px-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-(--loony-color-fg-muted)">
              {section.group}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/docs" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-(--loony-color-accent)/8 font-medium text-(--loony-color-accent)"
                          : "text-(--loony-color-fg-muted) hover:bg-(--loony-color-surface) hover:text-(--loony-color-fg)",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
