"use client";

import { useState, type ReactNode } from "react";

/* ── Types ─────────────────────────────────────────── */

interface Prop {
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
  props?: Prop[];
  children?: ReactNode;
}

/* ── Syntax highlighting ────────────────────────────── */

function highlight(code: string): ReactNode[] {
  const tokens: { type: string; value: string }[] = [];
  let rest = code;

  while (rest.length > 0) {
    let m: RegExpMatchArray | null;

    // Line comment
    m = rest.match(/^(\/\/.+)/);
    if (m) { tokens.push({ type: "comment", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Block comment
    m = rest.match(/^(\/\*[\s\S]*?\*\/)/);
    if (m) { tokens.push({ type: "comment", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Template literal
    m = rest.match(/^(`[^`]*`)/);
    if (m) { tokens.push({ type: "string", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Double-quoted string
    m = rest.match(/^("(?:[^"\\]|\\.)*")/);
    if (m) { tokens.push({ type: "string", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Single-quoted string
    m = rest.match(/^('(?:[^'\\]|\\.)*')/);
    if (m) { tokens.push({ type: "string", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // JSX closing tag </Foo>
    m = rest.match(/^(<\/[A-Z][A-Za-z0-9.]*>)/);
    if (m) { tokens.push({ type: "tag", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // JSX uppercase tag open
    m = rest.match(/^(<\/?[A-Z][A-Za-z0-9.]*)/);
    if (m) { tokens.push({ type: "tag", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Keywords
    m = rest.match(/^(import|export|from|default|const|let|var|function|return|if|else|async|await|new|typeof|instanceof|true|false|null|undefined|void)(?=\W)/);
    if (m) { tokens.push({ type: "keyword", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // JSX attribute / prop name before =
    m = rest.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(?==)/);
    if (m) { tokens.push({ type: "attr", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Numbers
    m = rest.match(/^(\d+\.?\d*)/);
    if (m) { tokens.push({ type: "num", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    // Plain text chunk
    m = rest.match(/^([^"'`/<\n\r\d]+)/);
    if (m) { tokens.push({ type: "plain", value: m[0] }); rest = rest.slice(m[0].length); continue; }

    tokens.push({ type: "plain", value: rest[0] ?? "" });
    rest = rest.slice(1);
  }

  const colorMap: Record<string, string> = {
    keyword: "#c792ea",
    string:  "#c3e88d",
    comment: "#546e7a",
    tag:     "#f07178",
    attr:    "#82aaff",
    num:     "#f78c6c",
    plain:   "#cdd3de",
  };

  return tokens.map((tok, i) => (
    <span key={i} style={{ color: colorMap[tok.type] ?? "#cdd3de", fontStyle: tok.type === "comment" ? "italic" : "normal" }}>
      {tok.value}
    </span>
  ));
}

/* ── CopyButton ─────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
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
      style={{ background: "transparent", border: "none", cursor: "pointer", color: copied ? "#c3e88d" : "#546e7a" }}
      className="ml-auto flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/8"
    >
      {copied ? (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
      )}
    </button>
  );
}

/* ── CodeBlock ──────────────────────────────────────── */

export function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl" style={{ background: "#0d1117", border: "1px solid #21262d" }}>
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: "#161b22", borderBottom: "1px solid #21262d" }}>
        <span style={{ color: "#8b949e", fontFamily: "var(--font-mono, monospace)", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {language}
        </span>
        <CopyButton text={children} />
      </div>
      <pre
        className="overflow-x-auto p-5"
        style={{ margin: 0, fontFamily: "var(--font-mono, monospace)", fontSize: "0.8125rem", lineHeight: "1.7" }}
      >
        <code>{highlight(children)}</code>
      </pre>
    </div>
  );
}

/* ── Preview ────────────────────────────────────────── */

export function Preview({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="my-5">
      {label && (
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-[--loony-color-fg-muted]">
          {label}
        </p>
      )}
      <div className="relative overflow-hidden rounded-xl border border-[--loony-color-border] bg-[--loony-color-surface]">
        {/* Macintosh dots */}
        <div aria-hidden className="flex items-center gap-1.5 border-b border-[--loony-color-border] bg-[--loony-color-bg] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-4 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────── */

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="mb-4 text-base font-semibold tracking-tight text-[--loony-color-fg]">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── ComponentDoc ───────────────────────────────────── */

const statusConfig = {
  stable:       { label: "Stable",       cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  beta:         { label: "Beta",         cls: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  experimental: { label: "Experimental", cls: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
} as const;

export function ComponentDoc({
  name,
  description,
  source,
  radix,
  aria,
  status = "stable",
  props,
  children,
}: ComponentDocProps) {
  const { label, cls } = statusConfig[status];

  return (
    <article className="max-w-[760px]">
      {/* Header ─────────────────── */}
      <header className="mb-8 border-b border-[--loony-color-border] pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[--loony-color-fg]">{name}</h1>
          <span className={`rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium ${cls}`}>
            {label}
          </span>
        </div>
        <p className="text-[0.9375rem] leading-relaxed text-[--loony-color-fg-muted]">{description}</p>

        {(source ?? radix) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {source && (
              <a href={source} target="_blank" rel="noopener noreferrer" className="text-[--loony-color-accent] hover:underline">
                Source ↗
              </a>
            )}
            {radix && (
              <a href={radix} target="_blank" rel="noopener noreferrer" className="text-[--loony-color-fg-muted] hover:text-[--loony-color-fg]">
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
                className="rounded-md border border-[--loony-color-border] bg-[--loony-color-surface] px-2 py-0.5 font-mono text-[0.6875rem] text-[--loony-color-fg-muted]"
              >
                role=&quot;{role}&quot;
              </code>
            ))}
          </div>
        )}
      </header>

      {/* Content ─────────────────── */}
      {children}

      {/* Props table ─────────────── */}
      {props && props.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-base font-semibold text-[--loony-color-fg]">Props</h2>
          <div className="overflow-x-auto rounded-xl border border-[--loony-color-border]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--loony-color-border] bg-[--loony-color-surface]">
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-[--loony-color-fg-muted]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.map((p, i) => (
                  <tr key={p.name} className={i < props.length - 1 ? "border-b border-[--loony-color-border]" : ""}>
                    <td className="px-4 py-3 font-mono text-[0.75rem] font-medium text-[--loony-color-fg]">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-[0.75rem] text-[--loony-color-accent]">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-[0.75rem] text-[--loony-color-fg-muted]">{p.default ?? "—"}</td>
                    <td className="px-4 py-3 text-[0.8125rem] text-[--loony-color-fg-muted]">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
