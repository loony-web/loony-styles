"use client";

import Link from "next/link";

const categories = [
  { name: "Foundation", accent: "#60a5fa", components: ["Button", "IconButton", "Link", "Spinner", "Typography"] },
  { name: "Form",       accent: "#c084fc", components: ["Input", "Textarea", "Select", "Checkbox", "Switch", "Radio", "Slider", "FormField"] },
  { name: "Layout",     accent: "#34d399", components: ["Stack", "Flex", "Grid", "Container", "Box", "AspectRatio", "Spacer"] },
  { name: "Display",    accent: "#fbbf24", components: ["Badge", "Avatar", "Card", "Accordion", "Skeleton", "Tag", "Table"] },
  { name: "Feedback",   accent: "#fb923c", components: ["Alert", "Toast", "Progress", "EmptyState"] },
  { name: "Overlay",    accent: "#f472b6", components: ["Dialog", "Drawer", "Tooltip", "Popover", "HoverCard"] },
  { name: "Navigation", accent: "#22d3ee", components: ["Tabs", "Breadcrumb", "Pagination", "DropdownMenu"] },
  { name: "Advanced",   accent: "#f87171", components: ["Command", "ScrollArea"] },
];

export function ComponentShowcase() {
  const total = categories.reduce((n, c) => n + c.components.length, 0);

  return (
    <section className="px-4 py-24 md:px-6" style={{ background: "#09090b", borderTop: "1px solid #27272a" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">Components</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {total} components.{" "}
              <span className="text-[#52525b]">8 categories.</span>
            </h2>
          </div>
          <Link
            href="/docs/components/button"
            className="text-sm font-medium text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
          >
            Browse all →
          </Link>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group rounded-xl p-4 transition-colors"
              style={{ background: "#111113", border: "1px solid #27272a" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#3f3f46"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#27272a"; }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: cat.accent }} />
                <p className="text-xs font-semibold" style={{ color: cat.accent }}>{cat.name}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.components.map((comp) => (
                  <span
                    key={comp}
                    className="rounded-md px-2 py-0.5 text-[0.6875rem] text-[#71717a]"
                    style={{ background: "#18181b", border: "1px solid #27272a" }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}