"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      disabled={busy}
      className="rounded-lg border border-line2 px-3 py-1.5 text-sm text-fg transition hover:bg-surface disabled:opacity-50"
    >
      Salir
    </button>
  );
}
