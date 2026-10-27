/**
 * Preview dashboard AfiInsight yang muncul di bawah judul hero.
 * Server component dan dilewatkan ke <Hero> sebagai prop, supaya markup
 * statis ini tidak ikut terbundel ke JavaScript sisi klien.
 */
// Tinggi batang dalam persen — data contoh, nanti diganti angka nyata.
const BARS = [38, 44, 41, 52, 49, 58, 63, 57, 71, 82, 88, 96];

export function HeroScene() {
  return (
    <div
      className="relative flex min-h-[calc(100svh-8rem)] flex-col overflow-hidden rounded-t-xl border border-[var(--border)] border-b-0 bg-[var(--surface-strong)]"
      style={{ boxShadow: "var(--shadow-scene)" }}
    >
      {/* Bar judul panel */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-4 py-3">
        <p className="section-label truncate">
          AfiInsight — Real-time Growth Dashboard
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--accent)]">
          <span className="size-1.5 rounded-full bg-[var(--accent)]" />
          Live
        </span>
      </div>

      <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
        <Stat
          label="Total GMV"
          value="Rp 1.482.900.000"
          delta="+34% growth bulan ini"
        />
        <Stat
          label="Active Affiliates"
          value="248 Creators"
          delta="99,9% tracking accuracy"
        />
      </div>


      {/* Grafik GMV — batang CSS murni, tanpa library chart.
          Panel sengaja dibuat tinggi agar tepi bawahnya "bleed" keluar
          panggung hero, seperti pada situs referensi. */}
      <div className="flex flex-1 flex-col border-t border-[var(--border)] px-4 py-5">
        <div className="flex items-baseline justify-between">
          <p className="section-label">GMV Afiliasi — 12 Minggu Terakhir</p>
          <p className="font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--muted)]">
            Rp juta
          </p>
        </div>
        <div className="mt-4 flex max-h-56 min-h-28 flex-1 items-end gap-1.5" aria-hidden="true">
          {BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i >= BARS.length - 3 ? "var(--accent)" : "var(--accent-soft)",
              }}
            />
          ))}
        </div>
        <p className="mt-3 text-[0.8125rem] text-[var(--muted)]">
          Tiga minggu terakhir konsisten di atas rata-rata kuartal.
        </p>
      </div>

      {/* Cuplikan percakapan AfiAssist */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-soft)] px-4 py-4">
        <p className="section-label mb-3">AfiAssist — WhatsApp Business API</p>
        <div className="flex flex-col gap-2">
          <div className="max-w-[22rem] rounded-lg rounded-tl-sm bg-[var(--surface-strong)] px-3 py-2 text-[var(--type-small)] text-[var(--text)] shadow-sm">
            Halo, produk serum vitamin C ready?
          </div>
          <div className="ml-auto max-w-[22rem] rounded-lg rounded-tr-sm bg-[var(--accent-soft)] px-3 py-2 text-[var(--type-small)] text-[var(--text)]">
            Ready, Kak. Serum Vitamin C 20ml stok tersedia. Mau saya kirimkan
            link checkout-nya?
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="bg-[var(--surface-strong)] px-4 py-5">
      <p className="section-label">{label}</p>
      <p
        className="mt-2 font-[family-name:var(--font-heading)] tracking-[-0.03em]"
        style={{ fontSize: "var(--type-compact-title)" }}
      >
        {value}
      </p>
      <p className="mt-1 text-[0.8125rem] text-[var(--muted)]">{delta}</p>
    </div>
  );
}
