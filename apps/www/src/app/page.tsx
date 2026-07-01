import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { Features } from "@/components/features";
import { ComponentShowcase } from "@/components/component-showcase";
import { TokensSection } from "@/components/tokens-section";
import { CliSection } from "@/components/cli-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div style={{ background: "#09090b", minHeight: "100dvh" }}>
      <SiteHeader />
      <main>
        <Hero />
        <Philosophy />
        <Features />
        <ComponentShowcase />
        <TokensSection />
        <CliSection />
      </main>
      <SiteFooter />
    </div>
  );
}
