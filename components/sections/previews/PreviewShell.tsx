import type { ReactNode } from "react";

/**
 * Bingkai bersama untuk keempat mock UI produk, supaya semuanya terbaca
 * sebagai satu keluarga antarmuka — pola yang sama dipakai situs referensi.
 *
 * Seluruhnya server component; tidak ada JavaScript yang dikirim.
 */
export function PreviewShell({
  app,
  status,
  statusTone = "neutral",
  children,
}: {
  app: string;
  status: string;
  statusTone?: "neutral" | "live";
  children: ReactNode;
}) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-strong)]"
      style={{ boxShadow: "var(--shadow-scene)" }}
      // Mock antarmuka ini murni ilustrasi produk, bukan konten yang perlu
      // dibacakan. Ringkasan teksnya sudah ada di panel sebelah kiri.
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-3.5 py-2.5">
        <span className="font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          {app}
        </span>
        <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--accent)]">
          {statusTone === "live" && (
            <span className="anim-pulse size-1.5 rounded-full bg-[var(--accent)]" />
          )}
          {status}
        </span>
      </div>
      <div className="flex-1 p-3.5">{children}</div>
    </div>
  );
}

/** Label kecil bertracking lebar, dipakai berulang di dalam mock UI. */
export function Micro({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-technical)] text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--muted)] ${className}`}
    >
      {children}
    </span>
  );
}
