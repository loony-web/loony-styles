import Link from "next/link";

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect width="20" height="20" rx="5" fill="#3b82f6" />
      <path d="M5 5.5h3.5v9H5zM11.5 5.5h3.5L13 10l2 4.5h-3.5L13 10l-1.5-4.5z" fill="white" fillOpacity="0.92" />
    </svg>
  );
}

const links = {
  Docs: [
    { label: "Getting started", href: "/docs/getting-started" },
    { label: "Components",      href: "/docs/components/button" },
    { label: "Design tokens",   href: "/docs/tokens/colors" },
    { label: "Theming",         href: "/docs/theming" },
    { label: "CLI reference",   href: "/docs/cli" },
  ],
  Components: [
    { label: "Button",   href: "/docs/components/button" },
    { label: "Dialog",   href: "/docs/components/dialog" },
    { label: "Input",    href: "/docs/components/input" },
    { label: "Tabs",     href: "/docs/components/tabs" },
    { label: "Toast",    href: "/docs/components/toast" },
  ],
  Project: [
    { label: "GitHub",       href: "https://github.com/your-org/loony" },
    { label: "Roadmap",      href: "https://github.com/your-org/loony/blob/main/docs/ROADMAP.md" },
    { label: "Changelog",    href: "https://github.com/your-org/loony/releases" },
    { label: "Contributing", href: "https://github.com/your-org/loony/blob/main/CONTRIBUTING.md" },
  ],
};

const techStack = ["React 19", "Next.js 15", "Tailwind v4", "Radix UI", "TypeScript"];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-10 pt-16 md:px-6" style={{ background: "#09090b", borderTop: "1px solid #27272a" }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <LogoMark />
              <span className="text-sm font-semibold text-white">loony/ui</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[#71717a]">
              Production-grade React components you own. Copy, customize, and ship without black-box dependencies.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md px-2 py-0.5 font-mono text-[0.625rem] text-[#52525b]"
                  style={{ background: "#18181b", border: "1px solid #27272a" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-widest text-[#52525b]">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#71717a] transition-colors hover:text-[#fafafa]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row"
          style={{ borderTop: "1px solid #27272a" }}
        >
          <p className="text-xs text-[#52525b]">© {new Date().getFullYear()} Loony Design System. MIT License.</p>
          <p className="text-xs text-[#52525b]">Built with Loony · Open source</p>
        </div>
      </div>
    </footer>
  );
}
