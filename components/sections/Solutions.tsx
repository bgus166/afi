import Link from "next/link";
import { SolutionsNav } from "./SolutionsNav";
import { AfiAssistPreview } from "./previews/AfiAssistPreview";
import { AfiCreatorPreview } from "./previews/AfiCreatorPreview";
import { AfiInsightPreview } from "./previews/AfiInsightPreview";
import { AfiFlowPreview } from "./previews/AfiFlowPreview";

const PRODUCTS = [
  {
    id: "afiassist",
    kicker: "01",
    name: "AfiAssist",
    family: "Customer Service",
    href: "/services/afiassist",
    lead: "AI customer service berbahasa Indonesia yang menangani CS 24 jam. Balas di bawah 2 menit, dan hanya melempar ke manusia saat memang perlu.",
    points: [
      "Terhubung langsung ke WhatsApp Business API",
      "Paham konteks produk, stok, dan ongkir",
      "Eskalasi otomatis untuk komplain dan kasus sensitif",
    ],
    preview: <AfiAssistPreview />,
  },
  {
    id: "aficreator",
    kicker: "02",
    name: "AfiCreator",
    family: "Content Engine",
    href: "/services/aficreator",
    lead: "Generate hook TikTok, caption Instagram, dan brief konten untuk ratusan afiliator sekaligus — otomatis dari USP produkmu.",
    points: [
      "Satu produk jadi puluhan variasi hook",
      "Brief per afiliator, bukan template seragam",
      "Nada bahasa mengikuti karakter brand",
    ],
    preview: <AfiCreatorPreview />,
  },
  {
    id: "afiinsight",
    kicker: "03",
    name: "AfiInsight",
    family: "Business Intelligence",
    href: "/services/afiinsight",
    lead: "Dashboard yang membaca data dari semua platform lalu memberi action item mingguan — bukan sekadar kumpulan angka.",
    points: [
      "Tarik data Shopee, TikTok Shop, dan website jadi satu",
      "Rekomendasi tindakan, bukan cuma grafik",
      "Tracking afiliasi dengan akurasi 99,9%",
    ],
    preview: <AfiInsightPreview />,
  },
  {
    id: "afiflow",
    kicker: "04",
    name: "AfiFlow",
    family: "Workflow Automation",
    href: "/services/afiflow",
    lead: "Otomatisin 10+ jam kerja manual per minggu. Rekap order, follow-up payment, dan laporan mingguan berjalan sendiri.",
    points: [
      "Alur kerja dibangun mengikuti proses timmu",
      "Jalan terjadwal, dengan log tiap langkah",
      "Tetap ada titik persetujuan manusia",
    ],
    preview: <AfiFlowPreview />,
  },
];

const NAV_ITEMS = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  kicker: p.kicker,
}));

export function Solutions() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative z-10 scroll-mt-24 bg-[#fafafa] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <h2 id="solutions-title" className="section-label">
          02 / What We Build
        </h2>

        <p
          className="reveal mt-5 max-w-[32rem] font-[family-name:var(--font-heading)] leading-[1.04] tracking-[-0.04em]"
          style={{ fontSize: "var(--type-section-title)" }}
        >
          Empat sistem AI.
          <br />
          <span className="text-[var(--muted)]">Satu ekosistem pertumbuhan.</span>
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14">
          {/* Kolom kiri — daftar produk yang menempel saat panel di kanan discroll */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="section-label mb-3 px-2.5">Solutions</p>
              <SolutionsNav items={NAV_ITEMS} />
            </div>
          </aside>

          {/* Kolom kanan — panel per produk */}
          <div className="flex flex-col gap-16 md:gap-24">
            {PRODUCTS.map((p) => (
              <article
                key={p.id}
                id={p.id}
                // Dibatasi lebarnya supaya baris teks tetap nyaman dibaca dan
                // mock UI-nya tidak melar jadi gepeng di layar lebar.
                className="max-w-[38rem] scroll-mt-24"
              >
                <div className="reveal">
                  <p className="section-label">{p.family}</p>

                  <h3
                    className="mt-3 font-[family-name:var(--font-heading)] font-normal tracking-[-0.03em]"
                    style={{ fontSize: "var(--type-card-title)", lineHeight: 1.1 }}
                  >
                    {p.name}
                  </h3>

                  <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-[1.6] text-[var(--muted)]">
                    {p.lead}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {p.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-[var(--accent)]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.href}
                    className="mt-5 inline-flex items-center gap-1.5 font-[family-name:var(--font-technical)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--accent)] transition-opacity hover:opacity-70"
                  >
                    Pelajari {p.name}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                {/* Mock UI produk */}
                <div className="reveal mt-7 h-[23rem] md:h-[26rem]">
                  {p.preview}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
