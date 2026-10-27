import Link from "next/link";
import { StackScroll } from "./StackScroll";
import { ResultRing } from "./previews/ResultRing";
import { ResponseDrop } from "./previews/ResponseDrop";
import { MetricPair } from "./previews/MetricPair";

type Case = {
  id: string;
  client: string;
  category: string;
  title: string;
  body: string;
  /** Satu warna pekat per kartu, mengikuti pola sumbernya. */
  color: string;
  visual: React.ReactNode;
  /**
   * Kartu draf: isinya disusun agar masuk akal untuk produk Afilabs, tapi
   * BUKAN hasil klien yang benar-benar terjadi. Selama true, kartu menampilkan
   * badge "DRAF". Hapus flag-nya setelah diganti data nyata.
   */
  isDraft?: boolean;
};

const CASES: Case[] = [
  {
    id: "skincare",
    client: "Skincare Brand D2C",
    category: "AfiInsight",
    title: "Dari spreadsheet ke sistem afiliasi otomatis",
    body: "Program afiliasi yang dikelola manual digantikan sistem otomatis. 200+ afiliator ter-manage, GMV afiliasi naik 34% dalam 60 hari.",
    color: "#1E3A8A",
    visual: (
      <ResultRing
        percent={34}
        value="+34%"
        caption="GMV afiliasi"
        satellites={[
          { value: "200+", label: "Afiliator" },
          { value: "60 hari", label: "Periode" },
        ]}
      />
    ),
  },
  {
    id: "suplemen",
    client: "Suplemen Brand",
    category: "AfiAssist",
    title: "Response time turun dari 4 jam ke 90 detik",
    body: "AfiAssist menangani 80% pertanyaan CS. Tim CS kini fokus ke masalah yang benar-benar butuh manusia.",
    color: "#0F5E5A",
    visual: (
      <ResponseDrop
        before={240}
        after={1.5}
        beforeLabel="4 jam"
        afterLabel="90 detik"
        badge="80% CS ditangani AI"
      />
    ),
  },
  {
    id: "fashion",
    client: "Fashion Brand D2C",
    category: "AfiCreator",
    title: "Brief konten untuk ratusan afiliator sekaligus",
    body: "Hook dan caption digenerate otomatis dari USP tiap produk, lalu dikirim sebagai brief personal ke masing-masing afiliator.",
    color: "#8C3312",
    isDraft: true,
    visual: (
      <MetricPair
        items={[
          { value: "1.240", label: "Aset konten" },
          { value: "6x", label: "Output/minggu" },
        ]}
      />
    ),
  },
  {
    id: "fnb",
    client: "F&B Brand D2C",
    category: "AfiFlow",
    title: "10 jam kerja manual per minggu berjalan sendiri",
    body: "Rekap order, follow-up payment, dan laporan mingguan dijadikan alur otomatis dengan titik persetujuan manusia.",
    color: "#4C1D95",
    isDraft: true,
    visual: (
      <MetricPair
        items={[
          { value: "10,5 jam", label: "Dihemat/minggu" },
          { value: "312", label: "Task otomatis" },
        ]}
      />
    ),
  },
];

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="cases-title"
      className="relative z-10 scroll-mt-24 bg-[var(--background)] pt-16 md:pt-24"
      // Hanya jumlah kartu yang diteruskan dari data; tinggi kartu dan posisi
      // panggung didefinisikan di globals.css agar bisa ditimpa media query.
      style={{ ["--deck-count" as string]: `${CASES.length}` }}
    >
      <div className="mx-auto w-full max-w-[72rem] px-6 md:px-10">
        <h2 id="cases-title" className="section-label">
          04 / Results
        </h2>

        <p
          className="reveal mt-5 max-w-[30rem] font-[family-name:var(--font-heading)] leading-[1.04] tracking-[-0.04em]"
          style={{ fontSize: "var(--type-section-title)" }}
        >
          Angka yang bicara
          <br />
          <span className="text-[var(--muted)]">untuk diri sendiri.</span>
        </p>
      </div>

      <StackScroll>
        {CASES.map((c, i) => (
          <article
            key={c.id}
            className="deck-card"
            style={{
              ["--deck-color" as string]: c.color,
              ["--deck-index" as string]: `${i}`,
            }}
          >
            <div className="deck-card-body">
              <p
                className="font-[family-name:var(--font-heading)] text-[2rem] leading-none font-medium"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              <div>
                <p className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="font-[family-name:var(--font-technical)] text-[0.75rem] uppercase tracking-[0.14em] text-white/80">
                    {c.category}
                  </span>
                  {c.isDraft && (
                    <span
                      className="rounded-full bg-[#fde68a] px-2 py-0.5 font-[family-name:var(--font-technical)] text-[0.5625rem] uppercase tracking-[0.14em] text-[#78350f]"
                      title="Konten contoh — belum diverifikasi dengan data klien"
                    >
                      Draf
                    </span>
                  )}
                </p>

                <h3
                  className="font-[family-name:var(--font-heading)] font-bold tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(1.65rem, 2.6vw, 2.6rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {c.title}
                </h3>
              </div>

              <p className="text-[1.0625rem] leading-[1.5] text-white/80">
                {c.body}
              </p>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.16em] text-white/55">
                  {c.client}
                </span>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-1.5 font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-70"
                >
                  Baca case study
                  <span aria-hidden="true">↗</span>
                </Link>
              </p>
            </div>

            {/* Sumbernya memakai foto potret di sini. Kita pakai panel metrik,
                karena tidak punya dokumentasi klien dan tidak mengarangnya. */}
            <div className="deck-card-visual">{c.visual}</div>
          </article>
        ))}
      </StackScroll>
    </section>
  );
}
