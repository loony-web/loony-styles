import { CliSection } from "@/components/cli-section";
import { ComponentShowcase } from "@/components/component-showcase";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TokensSection } from "@/components/tokens-section";

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
