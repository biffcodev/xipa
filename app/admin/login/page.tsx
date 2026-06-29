"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-static";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo iniciar sesión");
      router.push(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar sesión");
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line2 bg-bg0 px-3 py-2.5 text-sm text-fg outline-none transition focus:border-brand";

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="text-3xl font-bold tracking-tight text-fg">XIPA</div>
        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Panel de administración</div>
      </div>
      <div className="grid gap-4 rounded-2xl border border-line2 bg-bg1 p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-fg">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="tu@email.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-fg">Contraseña</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </label>
        {error && <p className="text-sm text-brand">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Ingresando…" : "Ingresar"}
        </button>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg2 px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
