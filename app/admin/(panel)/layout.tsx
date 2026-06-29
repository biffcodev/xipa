import Link from "next/link";
import { requireSession } from "@/lib/admin/session";
import Sidebar from "@/components/admin/Sidebar";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "XIPA · Administración" };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return (
    <div className="min-h-screen bg-bg2 text-fg">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line2 bg-bg1/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-fg">XIPA</span>
          <span className="hidden text-xs uppercase tracking-widest text-muted sm:inline">Administración</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="hidden text-sm text-muted hover:text-fg sm:inline">
            Ver sitio ↗
          </Link>
          <span className="hidden text-sm text-muted md:inline">{session.name}</span>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-64 shrink-0 overflow-y-auto border-r border-line2 bg-bg1 md:block">
          <Sidebar />
        </aside>
        {/* Content */}
        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
