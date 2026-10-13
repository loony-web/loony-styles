import type { ReactNode } from "react";
import { IconBase, type IconProps } from "./icon-base.js";

/**
 * createIcon — Factory for generating tree-shakeable icon components.
 *
 * Each icon is a standalone module export. Bundlers can dead-code-eliminate
 * unused icons since there are no re-exported barrel files with all icons.
 *
 * The generated component:
 *   - Is a named function (required for displayName and React DevTools)
 *   - Passes through all SVG props
 *   - Supports the Loony icon accessibility contract
 *
 * @example
 * export const SearchIcon = createIcon("SearchIcon", (
 *   <path d="M11 4a7 7 0 1 1 0 14A7 7 0 0 1 11 4zm9 9-4.35-4.35" />
 * ));
 */
export function createIcon(displayName: string, paths: ReactNode) {
  function Icon(props: IconProps) {
    return <IconBase {...props}>{paths}</IconBase>;
  }

  Icon.displayName = displayName;
  return Icon;
}
