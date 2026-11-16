const STATS = [
  {
    value: "34%",
    label: "Rata-rata kenaikan GMV afiliasi dalam 60 hari",
  },
  {
    value: "10x",
    label: "Lebih cepat disiapkan dibanding membangun sendiri",
  },
  {
    value: "< 2 mnt",
    label: "Response time AI customer service vs rata-rata industri",
  },
];

/**
 * Band angka hasil. Sengaja tanpa label section bernomor — di situs sekarang
 * pun ini jeda ritme antara Process dan Case Studies, bukan bab tersendiri.
 */
export function Stats() {
  return (
    <section
      id="results"
      aria-labelledby="stats-title"
      className="relative z-10 scroll-mt-24 bg-[var(--accent)] py-16 text-[var(--surface-strong)] md:py-20"
    >
      <div className="mx-auto w-full max-w-[72rem] px-6 md:px-10">
        {/* Section tanpa judul kasat mata tetap perlu nama untuk pembaca layar */}
        <h2 id="stats-title" className="sr-only">
          Hasil yang terukur
        </h2>

        <ul className="grid border-t border-white/30 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <li
              key={stat.value}
              className="reveal border-b border-white/30 pt-8 pb-9 md:border-b-0 md:pr-10 md:not-last:border-r md:pl-10 md:first:pl-0"
              style={{ ["--reveal-offset" as string]: `${i * 8}%` }}
            >
              <p
                className="font-[family-name:var(--font-heading)] font-normal leading-[1] tracking-[-0.045em]"
                style={{ fontSize: "var(--type-display)" }}
              >
                {stat.value}
              </p>
              <p className="mt-4 max-w-[18rem] text-[0.9375rem] leading-[1.5]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
