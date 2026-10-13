"use client";

import { type ReactNode, useState } from "react";

/* ── Types ─────────────────────────────────────────── */

export interface TocItem {
  id: string;
  label: string;
}

export interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface ComponentDocProps {
  name: string;
  description: string;
  source?: string;
  radix?: string;
  aria?: string[];
  status?: "stable" | "beta" | "experimental";
  toc?: TocItem[];
  children?: ReactNode;
}

/* ── Syntax highlighting ────────────────────────────── */

function highlight(code: string): ReactNode[] {
  const tokens: { type: string; value: string }[] = [];
  let rest = code;

  while (rest.length > 0) {
    let m: RegExpMatchArray | null;

    m = rest.match(/^(\/\/.+)/);
    if (m) {
      tokens.push({ type: "comment", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^(\/\*[\s\S]*?\*\/)/);
    if (m) {
      tokens.push({ type: "comment", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^(`[^`]*`)/);
    if (m) {
      tokens.push({ type: "string", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^("(?:[^"\\]|\\.)*")/);
    if (m) {
      tokens.push({ type: "string", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^('(?:[^'\\]|\\.)*')/);
    if (m) {
      tokens.push({ type: "string", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^(<\/[A-Z][A-Za-z0-9.]*>)/);
    if (m) {
      tokens.push({ type: "tag", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^(<\/?[A-Z][A-Za-z0-9.]*)/);
    if (m) {
      tokens.push({ type: "tag", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(
      /^(import|export|from|default|const|let|var|function|return|if|else|async|await|new|typeof|instanceof|true|false|null|undefined|void)(?=\W)/,
    );
    if (m) {
      tokens.push({ type: "keyword", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(?==)/);
    if (m) {
      tokens.push({ type: "attr", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^(\d+\.?\d*)/);
    if (m) {
      tokens.push({ type: "num", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    m = rest.match(/^([^"'`/<\n\r\d]+)/);
    if (m) {
      tokens.push({ type: "plain", value: m[0] });
      rest = rest.slice(m[0].length);
      continue;
    }

    tokens.push({ type: "plain", value: rest[0] ?? "" });
    rest = rest.slice(1);
  }

  const colorMap: Record<string, string> = {
    keyword: "#c792ea",
    string: "#c3e88d",
    comment: "#546e7a",
    tag: "#f07178",
    attr: "#82aaff",
    num: "#f78c6c",
    plain: "#cdd3de",
  };

  return tokens.map((tok, i) => (
    <span
      key={i}
      style={{
        color: colorMap[tok.type] ?? "#cdd3de",
        fontStyle: tok.type === "comment" ? "italic" : "normal",
      }}
    >
      {tok.value}
    </span>
  ));
}

/* ── CopyButton ─────────────────────────────────────── */

function CopyButton({ text, light }: { text: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied!" : "Copy code"}
      className={[
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
        light
          ? "text-(--loony-color-fg-muted) hover:bg-(--loony-color-surface) hover:text-(--loony-color-fg)"
          : "text-[#546e7a] hover:bg-white/8 hover:text-[#8b949e]",
      ].join(" ")}
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
    >
      {copied ? (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

/* ── CodeBlock ──────────────────────────────────────── */

export function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
  return (
    <div
      className="my-4 overflow-hidden rounded-xl"
      style={{ background: "#0d1117", border: "1px solid #21262d" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ background: "#161b22", borderBottom: "1px solid #21262d" }}
      >
        <span
          style={{
            color: "#8b949e",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {language}
        </span>
        <div className="ml-auto">
          <CopyButton text={children} />
        </div>
      </div>
      <pre
        className="overflow-x-auto p-5"
        style={{
          margin: 0,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.8125rem",
          lineHeight: "1.7",
        }}
      >
        <code>{highlight(children)}</code>
      </pre>
    </div>
  );
}

/* ── ComponentPreview ───────────────────────────────── */

export function ComponentPreview({
  children,
  code,
  minHeight = 180,
  label,
}: {
  children: ReactNode;
  code: string;
  minHeight?: number;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6">
      {label && (
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-(--loony-color-fg-muted)">
          {label}
        </p>
      )}

      {/* Preview panel */}
      <div
        className="relative flex flex-wrap items-center justify-center gap-4 rounded-xl border border-(--loony-color-border) p-8"
        style={{
          minHeight,
          background: "var(--loony-color-surface)",
          backgroundImage:
            "radial-gradient(circle, var(--loony-color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {children}
      </div>

      {/* View code toggle */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-(--loony-color-fg-muted) transition-colors hover:bg-(--loony-color-surface) hover:text-(--loony-color-fg)"
        >
          <svg
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          {open ? "Hide code" : "View code"}
        </button>

        {open && (
          <div
            className="mt-1 overflow-hidden rounded-xl"
            style={{ background: "#0d1117", border: "1px solid #21262d" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{ background: "#161b22", borderBottom: "1px solid #21262d" }}
            >
              <span
                style={{
                  color: "#8b949e",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                tsx
              </span>
              <div className="ml-auto">
                <CopyButton text={code} />
              </div>
            </div>
            <pre
              className="overflow-x-auto p-5"
              style={{
                margin: 0,
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.8125rem",
                lineHeight: "1.7",
              }}
            >
              <code>{highlight(code)}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PackageInstall ─────────────────────────────────── */

type PkgManager = "pnpm" | "npm" | "bun";

const installCommands: Record<PkgManager, string> = {
  pnpm: "pnpm add @loony/ui",
  npm: "npm install @loony/ui",
  bun: "bun add @loony/ui",
};

export function PackageInstall() {
  const [pkg, setPkg] = useState<PkgManager>("pnpm");
  const cmd = installCommands[pkg];

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-(--loony-color-border)">
      {/* Tab bar */}
      <div className="flex items-center border-b border-(--loony-color-border) bg-(--loony-color-bg) px-3">
        {(["pnpm", "npm", "bun"] as PkgManager[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPkg(m)}
            className={[
              "-mb-px border-b-2 px-3 py-2 text-xs font-medium transition-colors",
              pkg === m
                ? "border-(--loony-color-fg) text-(--loony-color-fg)"
                : "border-transparent text-(--loony-color-fg-muted) hover:text-(--loony-color-fg)",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="flex items-center gap-2 bg-(--loony-color-surface) px-4 py-3">
        <span className="text-(--loony-color-fg-muted) select-none text-sm">$</span>
        <code
          className="flex-1 font-mono text-sm text-(--loony-color-fg)"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {cmd}
        </code>
        <CopyButton text={cmd} light />
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────── */

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-20 first:mt-0">
      <h2 className="mb-4 text-base font-semibold tracking-tight text-(--loony-color-fg)">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── PropsTable ─────────────────────────────────────── */

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--loony-color-border)">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--loony-color-border) bg-(--loony-color-surface)">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-(--loony-color-fg-muted)"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              className={i < props.length - 1 ? "border-b border-(--loony-color-border)" : ""}
            >
              <td className="px-4 py-3 font-mono text-[0.75rem] font-medium text-(--loony-color-fg)">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-[0.75rem] text-(--loony-color-accent)">
                {p.type}
              </td>
              <td className="px-4 py-3 font-mono text-[0.75rem] text-(--loony-color-fg-muted)">
                {p.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-[0.8125rem] text-(--loony-color-fg-muted)">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── OnThisPage ─────────────────────────────────────── */

function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <div>
      <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-widest text-(--loony-color-fg-muted)">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              className={[
                "block text-sm transition-colors",
                active === item.id
                  ? "text-(--loony-color-accent) font-medium"
                  : "text-(--loony-color-fg-muted) hover:text-(--loony-color-fg)",
              ].join(" ")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ComponentDoc ───────────────────────────────────── */

const statusConfig = {
  stable: { label: "Stable", cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  beta: { label: "Beta", cls: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  experimental: {
    label: "Experimental",
    cls: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  },
} as const;

export function ComponentDoc({
  name,
  description,
  source,
  radix,
  aria,
  status = "stable",
  toc,
  children,
}: ComponentDocProps) {
  const { label, cls } = statusConfig[status];

  return (
    <div className="flex min-w-0 gap-10 xl:gap-16">
      {/* Main article */}
      <article className="min-w-0 flex-1 max-w-3xl">
        {/* Header */}
        <header className="mb-8 border-b border-(--loony-color-border) pb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-(--loony-color-fg)">{name}</h1>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium ${cls}`}
            >
              {label}
            </span>
          </div>
          <p className="text-[0.9375rem] leading-relaxed text-(--loony-color-fg-muted)">
            {description}
          </p>

          {(source ?? radix) && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--loony-color-accent) hover:underline"
                >
                  Source ↗
                </a>
              )}
              {radix && (
                <a
                  href={radix}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--loony-color-fg-muted) hover:text-(--loony-color-fg)"
                >
                  Radix UI docs ↗
                </a>
              )}
            </div>
          )}

          {aria && aria.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {aria.map((role) => (
                <code
                  key={role}
                  className="rounded-md border border-(--loony-color-border) bg-(--loony-color-surface) px-2 py-0.5 font-mono text-[0.6875rem] text-(--loony-color-fg-muted)"
                >
                  role=&quot;{role}&quot;
                </code>
              ))}
            </div>
          )}
        </header>

        {children}
      </article>

      {/* Right TOC */}
      {toc && toc.length > 0 && (
        <aside className="hidden w-44 shrink-0 self-start xl:block">
          <div className="sticky top-20">
            <OnThisPage items={toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
