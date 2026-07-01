import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loony UI — Build beautiful interfaces. Own every line.",
  description:
    "Production-grade React component ecosystem. 44 accessible components. Copy into your codebase, customize freely, ship with confidence.",
  keywords: ["react", "components", "design system", "tailwind", "typescript", "accessible"],
  openGraph: {
    type: "website",
    title: "Loony UI",
    description: "Production-grade React component ecosystem. Copy components, not dependencies.",
    siteName: "Loony UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loony UI",
    description: "44 accessible React components. Copy, customize, ship.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
