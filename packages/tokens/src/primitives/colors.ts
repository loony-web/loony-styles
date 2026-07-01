/**
 * Primitive color scales.
 *
 * These are raw palette values. They are NEVER used directly in components.
 * Components reference semantic tokens which alias these primitives.
 * This indirection enables complete theme replacement without touching components.
 *
 * Scale: 50 (lightest) → 950 (darkest), matching modern Tailwind conventions.
 */

export const gray = {
  50: "oklch(0.985 0.002 247.839)",
  100: "oklch(0.967 0.003 264.542)",
  200: "oklch(0.928 0.006 264.531)",
  300: "oklch(0.872 0.010 258.338)",
  400: "oklch(0.707 0.022 261.325)",
  500: "oklch(0.551 0.018 264.364)",
  600: "oklch(0.446 0.017 257.911)",
  700: "oklch(0.373 0.013 259.318)",
  800: "oklch(0.278 0.033 256.848)",
  900: "oklch(0.210 0.034 264.665)",
  950: "oklch(0.130 0.028 261.692)",
} as const;

export const blue = {
  50: "oklch(0.970 0.014 237.598)",
  100: "oklch(0.932 0.032 237.399)",
  200: "oklch(0.882 0.059 230.902)",
  300: "oklch(0.809 0.105 231.655)",
  400: "oklch(0.707 0.165 254.624)",
  500: "oklch(0.623 0.214 259.815)",
  600: "oklch(0.546 0.245 262.881)",
  700: "oklch(0.488 0.243 264.376)",
  800: "oklch(0.424 0.199 265.638)",
  900: "oklch(0.379 0.146 265.522)",
  950: "oklch(0.282 0.091 267.935)",
} as const;

export const green = {
  50: "oklch(0.982 0.018 155.826)",
  100: "oklch(0.962 0.044 156.743)",
  200: "oklch(0.925 0.084 155.995)",
  300: "oklch(0.871 0.150 154.449)",
  400: "oklch(0.792 0.209 151.711)",
  500: "oklch(0.723 0.219 149.579)",
  600: "oklch(0.627 0.194 149.214)",
  700: "oklch(0.527 0.154 150.069)",
  800: "oklch(0.448 0.119 151.328)",
  900: "oklch(0.393 0.095 152.535)",
  950: "oklch(0.266 0.065 152.934)",
} as const;

export const red = {
  50: "oklch(0.971 0.013 17.38)",
  100: "oklch(0.936 0.032 17.717)",
  200: "oklch(0.885 0.062 18.334)",
  300: "oklch(0.808 0.114 19.571)",
  400: "oklch(0.704 0.191 22.216)",
  500: "oklch(0.637 0.237 25.331)",
  600: "oklch(0.577 0.245 27.325)",
  700: "oklch(0.505 0.213 27.518)",
  800: "oklch(0.444 0.177 26.899)",
  900: "oklch(0.396 0.141 25.723)",
  950: "oklch(0.258 0.092 26.042)",
} as const;

export const yellow = {
  50: "oklch(0.987 0.026 102.212)",
  100: "oklch(0.973 0.071 103.193)",
  200: "oklch(0.945 0.129 101.540)",
  300: "oklch(0.905 0.182 98.111)",
  400: "oklch(0.852 0.199 91.936)",
  500: "oklch(0.795 0.184 86.047)",
  600: "oklch(0.681 0.162 75.834)",
  700: "oklch(0.554 0.135 66.442)",
  800: "oklch(0.476 0.114 61.907)",
  900: "oklch(0.421 0.095 57.708)",
  950: "oklch(0.286 0.066 53.813)",
} as const;

export const orange = {
  50: "oklch(0.980 0.016 73.684)",
  100: "oklch(0.954 0.038 75.164)",
  200: "oklch(0.901 0.076 70.697)",
  300: "oklch(0.837 0.128 66.029)",
  400: "oklch(0.750 0.183 55.934)",
  500: "oklch(0.705 0.213 47.604)",
  600: "oklch(0.646 0.222 41.116)",
  700: "oklch(0.553 0.195 38.402)",
  800: "oklch(0.470 0.157 37.304)",
  900: "oklch(0.408 0.123 38.172)",
  950: "oklch(0.266 0.079 36.259)",
} as const;

export const purple = {
  50: "oklch(0.977 0.014 308.299)",
  100: "oklch(0.946 0.033 307.060)",
  200: "oklch(0.902 0.063 306.703)",
  300: "oklch(0.827 0.119 306.383)",
  400: "oklch(0.714 0.203 305.504)",
  500: "oklch(0.627 0.265 303.900)",
  600: "oklch(0.558 0.288 302.321)",
  700: "oklch(0.496 0.265 301.924)",
  800: "oklch(0.438 0.218 303.724)",
  900: "oklch(0.381 0.176 304.987)",
  950: "oklch(0.291 0.149 302.717)",
} as const;

export const pink = {
  50: "oklch(0.971 0.014 343.198)",
  100: "oklch(0.948 0.028 342.258)",
  200: "oklch(0.899 0.061 343.231)",
  300: "oklch(0.823 0.120 346.018)",
  400: "oklch(0.718 0.202 349.761)",
  500: "oklch(0.656 0.241 354.308)",
  600: "oklch(0.592 0.249 0.584)",
  700: "oklch(0.525 0.223 3.958)",
  800: "oklch(0.459 0.187 3.815)",
  900: "oklch(0.408 0.153 2.432)",
  950: "oklch(0.284 0.109 3.907)",
} as const;

export const white = "oklch(1 0 0)" as const;
export const black = "oklch(0 0 0)" as const;
export const transparent = "transparent" as const;

export const primitiveColors = {
  gray,
  blue,
  green,
  red,
  yellow,
  orange,
  purple,
  pink,
  white,
  black,
  transparent,
} as const;

export type PrimitiveColorScale = typeof primitiveColors;
