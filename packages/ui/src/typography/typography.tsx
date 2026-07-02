"use client";

import { type ElementType, type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";

// ============================================================
// Text
// ============================================================

const textVariants = cva("", {
  variants: {
    size: {
      "2xs": "text-[--loony-text-2xs]",
      xs: "text-[--loony-text-xs]",
      sm: "text-[--loony-text-sm]",
      base: "text-[--loony-text-base]",
      lg: "text-[--loony-text-lg]",
      xl: "text-[--loony-text-xl]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-[--loony-color-fg]",
      muted: "text-[--loony-color-fg-muted]",
      subtle: "text-[--loony-color-fg-subtle]",
      disabled: "text-[--loony-color-fg-disabled]",
      accent: "text-[--loony-color-accent]",
      danger: "text-[--loony-color-danger]",
      success: "text-[--loony-color-success]",
      warning: "text-[--loony-color-warning]",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
  },
});

interface TextProps
  extends Omit<ComponentPropsWithRef<"p">, "color">,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

/**
 * Text — Generic text rendering with semantic variants.
 *
 * Renders as <p> by default. Use `as` to render as span, label, div, etc.
 *
 * @example
 * <Text>Body text</Text>
 * <Text size="sm" color="muted">Helper text</Text>
 * <Text as="span" weight="semibold">Inline text</Text>
 */
export function Text({
  className,
  as: Tag = "p",
  size,
  weight,
  color,
  align,
  truncate,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textVariants({ size, weight, color, align, truncate }), className)}
      {...props}
    />
  );
}

Text.displayName = "Text";

// ============================================================
// Heading
// ============================================================

const headingVariants = cva(
  ["font-semibold leading-tight tracking-tight text-[--loony-color-fg]"],
  {
    variants: {
      level: {
        1: "text-[--loony-text-4xl] sm:text-[--loony-text-5xl]",
        2: "text-[--loony-text-3xl] sm:text-[--loony-text-4xl]",
        3: "text-[--loony-text-2xl] sm:text-[--loony-text-3xl]",
        4: "text-[--loony-text-xl] sm:text-[--loony-text-2xl]",
        5: "text-[--loony-text-lg] sm:text-[--loony-text-xl]",
        6: "text-[--loony-text-base] sm:text-[--loony-text-lg]",
      },
    },
    defaultVariants: {
      level: 2,
    },
  },
);

interface HeadingProps
  extends ComponentPropsWithRef<"h2">,
    VariantProps<typeof headingVariants> {
  /** Heading level (1–6). Controls both font size and the rendered element tag. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Override the rendered tag without changing the visual size. */
  as?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
}

/**
 * Heading — Semantic heading element with size variants.
 *
 * The `level` prop controls both visual size and the rendered HTML element.
 * If you need different visual vs semantic levels, use `as` to override the tag.
 *
 * @example
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2} as="h1">Visually h2, semantically h1</Heading>
 */
export function Heading({ className, level = 2, as, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as `h${typeof level}`);

  return (
    <Tag
      className={cn(headingVariants({ level }), className)}
      {...props}
    />
  );
}

Heading.displayName = "Heading";

// ============================================================
// Code
// ============================================================

interface CodeProps extends ComponentPropsWithRef<"code"> {
  block?: boolean;
}

/**
 * Code — Inline or block code rendering.
 *
 * Use `block` for multi-line code blocks (renders as <pre><code>).
 *
 * @example
 * <Code>const x = 1;</Code>
 * <Code block>{"function example() {\n  return true;\n}"}</Code>
 */
export function Code({ className, block = false, children, ...props }: CodeProps) {
  if (block) {
    return (
      <pre className={cn(
        "overflow-x-auto rounded-[--loony-radius-md]",
        "bg-[--loony-color-bg-muted] border border-[--loony-color-border]",
        "p-4 text-sm font-mono",
        className,
      )}>
        <code {...props}>{children}</code>
      </pre>
    );
  }

  return (
    <code
      className={cn(
        "rounded px-1 py-0.5",
        "bg-[--loony-color-bg-muted] border border-[--loony-color-border]",
        "font-mono text-[0.875em]",
        "text-[--loony-color-fg]",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

Code.displayName = "Code";

// ============================================================
// Kbd
// ============================================================

interface KbdProps extends ComponentPropsWithRef<"kbd"> {}

/**
 * Kbd — Keyboard shortcut indicator.
 *
 * Semantically correct <kbd> element styled as a key cap.
 *
 * @example
 * <span>Press <Kbd>⌘K</Kbd> to open search</span>
 */
export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-[--loony-radius-sm] border border-[--loony-color-border]",
        "bg-[--loony-color-bg-subtle] px-1.5 py-0.5",
        "font-mono text-xs text-[--loony-color-fg-muted]",
        "shadow-[0_1px_0_1px_--loony-color-border]",
        className,
      )}
      {...props}
    />
  );
}

Kbd.displayName = "Kbd";