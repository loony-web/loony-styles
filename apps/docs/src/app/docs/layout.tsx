import { DocsHeader } from "@/components/docs-header";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[--loony-color-bg]">
      <DocsHeader />
      <div className="mx-auto flex max-w-[1280px] px-4 md:px-6">
        <DocsSidebar />
        {/* Divider */}
        <div className="hidden w-px shrink-0 bg-[--loony-color-border] md:block" aria-hidden />
        <main className="min-w-0 flex-1 py-10 md:pl-10">
          {children}
        </main>
      </div>
    </div>
  );
}
