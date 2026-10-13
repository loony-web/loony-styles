"use client";

import Link from "next/link";

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect width="20" height="20" rx="5" fill="#3b82f6" />
      <path
        d="M5 5.5h3.5v9H5zM11.5 5.5h3.5L13 10l2 4.5h-3.5L13 10l-1.5-4.5z"
        fill="white"
        fillOpacity="0.92"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "Tokens", href: "/docs/tokens/colors" },
  { label: "CLI", href: "/docs/cli" },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md"
      style={{ background: "rgba(9, 9, 11, 0.85)", borderBottom: "1px solid #27272a" }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-white">
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight">loony/ui</span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-md px-3 py-1.5 text-sm text-[#a1a1aa] transition-colors hover:bg-[#18181b] hover:text-[#fafafa]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/loony-web/loony-styles"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#a1a1aa] transition-colors hover:bg-[#18181b] hover:text-[#fafafa]"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <Link
            href="/docs/getting-started"
            className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
