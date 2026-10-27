/**
 * Section "The Problem" — tiga bottleneck operasional yang dialami brand D2C.
 * Server component, nol JavaScript. Reveal saat scroll ditangani CSS
 * `animation-timeline: view()` (lihat .reveal di globals.css).
 */

const PROBLEMS = [
  {
    title: "Afiliator dikelola pakai spreadsheet",
    body: "200+ afiliator, tapi tracking masih manual. Link dibagi lewat WA, komisi dihitung pakai Excel, payout satu-satu. Tim kehabisan waktu sebelum sempat scale.",
  },
  {
    title: "CS kewalahan, buyer nunggu berjam-jam",
    body: "Tim CS jawab pertanyaan yang sama berulang kali. Response time 4+ jam. Buyer kabur sebelum checkout selesai.",
  },
  {
    title: "Data ada, tapi tidak bisa dibaca",
    body: "Angka tersebar di Shopee, TikTok, website, dan spreadsheet. Tidak ada satu view yang kasih gambaran utuh bisnis kamu.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="relative z-10 scroll-mt-24 bg-[var(--background)] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[72rem] px-6 md:px-10">
        <p className="section-label">01 / The Problem</p>

        <h2
          id="problem-title"
          className="reveal mt-5 max-w-[34rem] font-[family-name:var(--font-heading)] font-normal leading-[1.04] tracking-[-0.04em]"
          style={{ fontSize: "var(--type-section-title)" }}
        >
          Brand kamu sudah scale.
          <br />
          <span className="text-[var(--muted)]">
            Tapi operasionalnya belum.
          </span>
        </h2>

        <ol className="mt-14 grid gap-px border-t border-[var(--border)] md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <li
              key={p.title}
              className="reveal relative border-b border-[var(--border)] pt-7 pb-8 md:border-b-0 md:pr-8 md:not-last:border-r md:not-last:border-[var(--border)] md:pl-8 md:first:pl-0"
              // animation-delay TIDAK berlaku pada timeline berbasis scroll;
              // stagger dibuat dengan menggeser animation-range tiap kolom.
              style={
                { "--reveal-offset": `${i * 8}%` } as React.CSSProperties
              }
            >
              {/* Nomor bersifat dekoratif — urutan sudah tersampaikan lewat <ol> */}
              <span className="section-label" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="mt-4 font-[family-name:var(--font-heading)] font-normal tracking-[-0.02em]"
                style={{ fontSize: "var(--type-compact-title)", lineHeight: 1.2 }}
              >
                {p.title}
              </h3>

              <p className="mt-3 max-w-[32rem] text-[0.9375rem] leading-[1.6] text-[var(--muted)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="reveal mt-12 max-w-[42rem] text-[var(--muted)]" style={{ fontSize: "var(--type-lead)", lineHeight: 1.5 }}>
          Afilabs solve ketiga masalah ini — dengan AI yang dibangun khusus
          untuk konteks bisnis D2C Indonesia.
        </p>
      </div>
    </section>
  );
}
