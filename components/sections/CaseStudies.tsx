import Image from "next/image";
import Link from "next/link";
import { StackScroll } from "./StackScroll";
import styles from "./CaseStudies.module.css";

type Case = {
  id: string;
  client: string;
  category: string;
  title: string;
  body: string;
  image: string;
  mirrored?: boolean;
  metric: "growth" | "response" | "content" | "workflow";
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
    image: "/images/results/afiinsight.png",
    metric: "growth",
  },
  {
    id: "suplemen",
    client: "Suplemen Brand",
    category: "AfiAssist",
    title: "Response time turun dari 4 jam ke 90 detik",
    body: "AfiAssist menangani 80% pertanyaan CS. Tim CS kini fokus ke masalah yang benar-benar butuh manusia.",
    image: "/images/results/afiassist.png",
    mirrored: true,
    metric: "response",
  },
  {
    id: "fashion",
    client: "Fashion Brand D2C",
    category: "AfiCreator",
    title: "Brief konten untuk ratusan afiliator sekaligus",
    body: "Hook dan caption digenerate otomatis dari USP tiap produk, lalu dikirim sebagai brief personal ke masing-masing afiliator.",
    image: "/images/results/aficreator.png",
    mirrored: true,
    metric: "content",
    isDraft: true,
  },
  {
    id: "fnb",
    client: "F&B Brand D2C",
    category: "AfiFlow",
    title: "10 jam kerja manual per minggu berjalan sendiri",
    body: "Rekap order, follow-up payment, dan laporan mingguan dijadikan alur otomatis dengan titik persetujuan manusia.",
    image: "/images/results/afiflow.png",
    mirrored: true,
    metric: "workflow",
    isDraft: true,
  },
];

function CaseVisual({ item }: { item: Case }) {
  const metrics = item.metric === "content"
    ? [{ value: "1.240", label: "Aset konten" }, { value: "6x", label: "Output/minggu" }]
    : [{ value: "10,5 jam", label: "Dihemat/minggu" }, { value: "312", label: "Task otomatis" }];

  return (
    <div className="deck-card-visual">
      <div className={styles.imageFrame}>
        <Image
          src={item.image}
          width={1122}
          height={1402}
          alt=""
          sizes="(max-width: 767px) 80vw, (max-width: 1099px) 36vw, 335px"
          className={`${styles.illustration}${item.mirrored ? ` ${styles.mirrored}` : ""}`}
        />
      </div>

      {item.metric === "growth" && (
        <>
          <div className={styles.growth}>
            <svg viewBox="0 0 168 168" aria-hidden="true">
              <circle cx="84" cy="84" r="80" fill="none" stroke="#ececff" strokeWidth="3" />
              <circle cx="84" cy="84" r="80" fill="none" stroke="#3346bd" strokeWidth="3" strokeLinecap="round" strokeDasharray="170.9 502.7" transform="rotate(-90 84 84)" />
            </svg>
            <p><strong>+34%</strong><span>GMV afiliasi</span></p>
          </div>
          <dl className={`${styles.satellite} ${styles.period}`}>
            <dt>Periode</dt><dd>60 hari</dd>
          </dl>
          <dl className={`${styles.satellite} ${styles.affiliates}`}>
            <dt>Afiliator</dt><dd>200+</dd>
          </dl>
        </>
      )}

      {item.metric === "response" && (
        <div className={styles.response}>
          <p>80% CS ditangani AI</p>
          <dl>
            <div><dt>Sebelum</dt><dd>4 jam</dd></div>
            <div><dt>Sesudah</dt><dd>90 detik</dd></div>
          </dl>
        </div>
      )}

      {(item.metric === "content" || item.metric === "workflow") && (
        <dl className={styles.metricPair}>
          {metrics.map((metric) => (
            <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
          ))}
        </dl>
      )}
    </div>
  );
}

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
              ["--deck-index" as string]: `${i}`,
            }}
          >
            <div className="deck-card-body">
              <p className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>

              <div>
                <p className={styles.category}>
                  <span>
                    {c.category}
                  </span>
                  {c.isDraft && (
                    <span
                      className={styles.draft}
                      title="Konten contoh, belum diverifikasi dengan data klien"
                    >
                      Draf
                    </span>
                  )}
                </p>

                <h3 className={styles.title}>
                  {c.title}
                </h3>
              </div>

              <p className={styles.copy}>
                {c.body}
              </p>

              <p className={styles.footer}>
                <span>
                  {c.client}
                </span>
                <Link
                  href="/case-studies"
                  className={styles.caseLink}
                >
                  Baca case study
                  <span aria-hidden="true">↗</span>
                </Link>
              </p>
            </div>

            <CaseVisual item={c} />
          </article>
        ))}
      </StackScroll>
    </section>
  );
}
