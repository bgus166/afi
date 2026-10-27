import Link from "next/link";

const STEPS = [
  {
    name: "Audit",
    body: "Kami pelajari bisnis kamu dan identifikasi bottleneck operasional yang paling mahal.",
  },
  {
    name: "Build",
    body: "Bangun solusi AI yang tepat untuk masalah spesifikmu — bukan template yang sama untuk semua.",
  },
  {
    name: "Deploy",
    body: "Live dalam 2–4 minggu dengan skema gradual rollout, jadi operasional tidak terganggu.",
  },
  {
    name: "Grow",
    body: "Monitor, ukur ROI, dan optimasi performa AI terus-menerus setelah sistemnya jalan.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative z-10 scroll-mt-24 bg-[var(--background)] py-16 md:py-24"
    >
      <div className="rail-track mx-auto w-full max-w-[72rem] px-6 md:px-10">
        <h2 id="process-title" className="section-label">
          03 / Our Process
        </h2>

        <div className="reveal mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-[30rem] font-[family-name:var(--font-heading)] leading-[1.04] tracking-[-0.04em]"
            style={{ fontSize: "var(--type-section-title)" }}
          >
            Dari audit ke growth
            <br />
            <span className="text-[var(--muted)]">dalam 30 hari.</span>
          </p>

          <Link
            href="/how-it-works"
            className="inline-flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--accent)] transition-opacity hover:opacity-70"
          >
            Lihat proses lengkap
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Rail timeline: garis dasar abu, ditimpa garis aksen yang memanjang
            seiring scroll. Titik tiap langkah duduk di atas garis itu. */}
        <div className="relative mt-14">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-[var(--border)] md:block" />
          <div
            aria-hidden="true"
            className="anim-rail absolute inset-x-0 top-0 hidden h-px origin-left bg-[var(--accent)] md:block"
          />

          <ol className="grid md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li
                key={step.name}
                className="reveal relative border-t border-[var(--border)] pt-8 pb-8 md:border-t-0 md:pr-8"
                style={{ ["--reveal-offset" as string]: `${i * 7}%` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[3.5px] left-0 size-[7px] rounded-full bg-[var(--accent)]"
                />

                <span className="section-label" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="mt-3 font-[family-name:var(--font-heading)] font-normal tracking-[-0.02em]"
                  style={{ fontSize: "var(--type-compact-title)", lineHeight: 1.2 }}
                >
                  {step.name}
                </h3>

                <p className="mt-2 max-w-[22rem] text-[0.875rem] leading-[1.6] text-[var(--muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
