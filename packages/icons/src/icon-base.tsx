import type { ComponentPropsWithRef } from "react";

export interface IconProps extends ComponentPropsWithRef<"svg"> {
  /** Accessible label. Required when the icon conveys meaning alone (no adjacent text). */
  label?: string;
  /** Icon size in pixels. Applied to both width and height. */
  size?: number | string;
}

/**
 * Icon — Base SVG wrapper for all Loony icons.
 *
 * Accessibility contract:
 *   - When `label` is provided: role="img" + aria-label for standalone icons
 *   - When no label: aria-hidden="true" (decorative; parent must provide context)
 *   - focusable="false" prevents tab stop in IE11 and Chromium Edge
 *
 * Sizing:
 *   - Default: 1em × 1em (inherits from parent font-size — scales with text)
 *   - Override via `size` prop or `width`/`height` SVG attrs
 *   - Alternatively, use CSS: `[data-icon] { width: 20px; height: 20px }`
 *
 * @example
 * // Decorative (next to visible text — no label needed)
 * <SearchIcon />
 *
 * // Standalone (must have accessible label)
 * <SearchIcon label="Search" />
 *
 * // Custom size
 * <SearchIcon size={20} />
 */
export function IconBase({
  label,
  size,
  width,
  height,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  const isDecorative = !label;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size ?? width ?? "1em"}
      height={size ?? height ?? "1em"}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-icon
      role={isDecorative ? undefined : "img"}
      aria-label={label}
      aria-hidden={isDecorative ? true : undefined}
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}
