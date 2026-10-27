import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const dynamic = "force-static";

const description =
  "Kenali cara kerja Afilabs: audit operasional, build solusi AI, deployment bertahap, dan optimasi berkelanjutan untuk pertumbuhan brand kamu.";

export const metadata: Metadata = {
  title: "Bagaimana Kami Bekerja",
  description,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "Bagaimana Kami Bekerja — Afilabs",
    description,
    url: "/how-it-works",
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagaimana Kami Bekerja — Afilabs",
    description,
  },
};

const phases = [
  { id: "audit", name: "Audit", time: "Minggu 1–2", note: "Pahami masalahnya." },
  { id: "build", name: "Build", time: "Minggu 3–8", note: "Bangun yang berdampak." },
  { id: "deploy", name: "Deploy", time: "Minggu 4–10", note: "Jalankan dengan aman." },
  { id: "grow", name: "Grow", time: "Ongoing", note: "Ukur. Pelajari. Optimasi." },
] as const;

const auditTimeline = [
  ["Day 1–2", "Kickoff call", "Kami pelajari bisnis kamu, goals, dan constraints."],
  ["Day 3–5", "Operational deep dive", "Mapping semua proses, tools, dan bottleneck."],
  ["Day 6–8", "Data collection", "Akses ke dashboard, spreadsheet, dan tools existing."],
  ["Day 9–12", "AI analysis", "Pattern recognition dari semua data yang dikumpulkan."],
  ["Day 13–14", "Delivery", "AI Readiness Report dan 90-day roadmap."],
];

const comparison = [
  ["Mulai dengan", "Proposal & cakupan spec teoritis", "Audit yang objektif & transparan"],
  ["Build approach", "Kaku sesuai dokumen kontrak di awal", "Iteratif, dinamis, berbasis data real"],
  ["Ukuran sukses", "Sistem selesai dideploy", "Metrik angka bisnis terbukti bergerak"],
  ["Setelah delivery", "Project selesai, goodbye", "Ongoing partnership & maintenance bulanan"],
  ["Harga", "Fixed project fee di awal", "Aligned dengan pertumbuhan value bisnis"],
  ["Timeline", "3–6 bulan development kaku", "2–4 minggu per modul solusi siap live"],
];

const team = [
  {
    role: "AI Solution Architect",
    detail: "Bertanggung jawab mendesain arsitektur solusi AI dan pengambilan keputusan teknis. Memastikan apa yang dibangun sesuai dengan masalah unik brand kamu — bukan template generik.",
    label: "Architecture & direction",
  },
  {
    role: "Implementation Engineer",
    detail: "Yang memprogram dan mendeploy sistem. Seluruh pengembangan dikerjakan in-house dengan standar keamanan data yang tinggi, tanpa outsourcing luar atau junior engineer.",
    label: "Build & deployment",
  },
  {
    role: "Growth Partner",
    detail: "Memastikan sistem AI benar-benar menggerakkan penjualan bisnis kamu. Melakukan review bulanan, menjaga akuntabilitas metrik, dan mendampingi keputusan strategis kamu.",
    label: "Performance & partnership",
  },
];

const contactUrl = "https://afilabs.id/contact";

function PhaseHeading({ index, title }: { index: number; title: string }) {
  const phase = phases[index];
  return (
    <div className={styles.phaseHeading}>
      <span className={styles.phaseNumber} aria-hidden="true">0{index + 1}</span>
      <p className={styles.eyebrow}>Fase 0{index + 1} <span>/ {phase.time}</span></p>
      <h3>{phase.name}</h3>
      <p className={styles.phaseTagline}>{title}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="how-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <p className="section-label">The process / How we work</p>
            <h1 id="how-title">
              Dari pertanyaan pertama<br className={styles.desktopBreak} /> ke sistem yang berjalan.
              <span>Ini prosesnya.</span>
            </h1>
            <p className={styles.lead}>
              Tidak ada surprise. Tidak ada scope creep. Ini persis yang terjadi
              saat kamu mulai bekerja sama dengan Afilabs.
            </p>
            <div className={styles.actions}>
              <a href={contactUrl} className={styles.primaryButton}>
                Book Discovery Call <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a href="https://afilabs.id/company-profile-pdf" className={styles.textLink}>
                Company Profile (PDF) <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <a href="#phases" className={styles.explore}>
              Kenali proses kami <ArrowDown size={13} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="phases" aria-labelledby="phases-title" className={styles.phases}>
          <div className={styles.container}>
            <div className={styles.sectionIntro}>
              <h2 id="phases-title" className="section-label">01 / The four phases</h2>
              <p className={styles.sectionTitle}>Empat fase.<br /><span>Satu tujuan: bisnis tumbuh.</span></p>
            </div>
            <nav aria-label="Tahapan kerja" className={styles.phaseNav}>
              <ol>
                {phases.map((phase, index) => (
                  <li key={phase.id}>
                    <a href={`#${phase.id}`}>
                      <span className={styles.navTop}><span>0{index + 1} / {phase.time}</span><ArrowDown size={14} aria-hidden="true" /></span>
                      <span className={styles.navName}>{phase.name}</span>
                      <span className={styles.navNote}>{phase.note}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article id="audit" className={styles.phase} aria-label="Fase 1: Audit">
              <PhaseHeading index={0} title="Diagnose dulu. Baru build." />
              <div className={styles.phaseBody}>
                <h4 className={styles.eyebrow}>Timeline harian</h4>
                <ol className={styles.timeline}>
                  {auditTimeline.map(([day, title, detail]) => (
                    <li key={day}><span className={styles.time}>{day}</span><div><h5>{title}</h5><p>{detail}</p></div></li>
                  ))}
                </ol>
                <div className={styles.deliverables}>
                  <h4 className={styles.eyebrow}>Yang kamu terima</h4>
                  <ul className={styles.checkList}>
                    <li><Check aria-hidden="true" /><p><strong>AI Readiness Report</strong><span>30+ halaman hasil audit mendalam operasional dan peluang ROI.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>90-Day AI Roadmap</strong><span>Rencana prioritas deployment bertahap dari quick-wins.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>Tool Recommendation</strong><span>Rekomendasi software stack paling efisien untuk D2C.</span></p></li>
                  </ul>
                </div>
              </div>
            </article>

            <article id="build" className={styles.phase} aria-label="Fase 2: Build">
              <PhaseHeading index={1} title="Build fast. Build right." />
              <div className={styles.phaseBody}>
                <p className={styles.bodyLead}>Kami prioritaskan 2–3 solusi dengan dampak bisnis tertinggi hasil audit. Deploy yang pertama, lakukan validasi, baru berlanjut ke modul berikutnya.</p>
                <h4 className={styles.eyebrow}>Proses per solusi</h4>
                <ol className={styles.buildSteps}>
                  {["Technical setup + API integration.", "Configuration + testing internal.", "Soft launch ke volume terbatas.", "Full deployment + live monitoring."].map((step, index) => (
                    <li key={step}><span className={styles.time}>Week 0{index + 1}</span><p>{step}</p></li>
                  ))}
                </ol>
                <div className={styles.deliverables}>
                  <h4 className={styles.eyebrow}>Checklist kualitas</h4>
                  <ul className={styles.checkList}>
                    <li><Check aria-hidden="true" /><p><strong>Integration Test</strong><span>Semua API dan endpoint tersambung aman.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>Load Test</strong><span>Pengujian performa sistem di bawah trafik puncak.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>User Acceptance</strong><span>Persetujuan dari tim kamu sebelum live.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>Rollback Plan</strong><span>Prosedur pengembalian data jika terjadi eror sistem.</span></p></li>
                  </ul>
                </div>
              </div>
            </article>

            <article id="deploy" className={styles.phase} aria-label="Fase 3: Deploy">
              <PhaseHeading index={2} title="Live. Monitor. Iterate." />
              <div className={styles.phaseBody}>
                <h4 className={styles.eyebrow}>Gradual rollout</h4>
                <ol className={styles.rollout}>
                  {[
                    ["10%", "Rollout awal", "Segmen kecil, dengan 48 jam pemantauan ketat."],
                    ["30%", "Perluas volume", "48 jam pemantauan anomali sebelum tahap berikutnya."],
                    ["100%", "Full deployment", "Sistem live ke seluruh pelanggan."],
                  ].map(([percent, title, detail]) => (
                    <li key={percent}><span className={styles.rolloutPercent}>{percent}</span><span className={styles.rolloutTrack} aria-hidden="true"><span style={{ width: percent }} /></span><h5>{title}</h5><p>{detail}</p></li>
                  ))}
                </ol>
                <div className={styles.deliverables}>
                  <h4 className={styles.eyebrow}>Handover ke tim kamu</h4>
                  <ul className={styles.checkList}>
                    <li><Check aria-hidden="true" /><p><strong>Training Session</strong><span>Kelas panduan 2 jam untuk user operasional.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>SOP Documentation</strong><span>Video walkthrough dan dokumen tertulis SOP.</span></p></li>
                    <li><Check aria-hidden="true" /><p><strong>Dedicated Support</strong><span>Grup chat Slack/WA siaga selama 2 minggu pertama.</span></p></li>
                  </ul>
                </div>
              </div>
            </article>

            <article id="grow" className={styles.phase} aria-label="Fase 4: Grow">
              <PhaseHeading index={3} title="Ini baru mulai." />
              <div className={styles.phaseBody}>
                <p className={styles.bodyLead}>Sistem AI berkembang seiring bertambahnya data. Semakin lama AfiAssist dideploy, semakin akurat ia menjawab chat. Semakin lama AfiInsight berjalan, semakin tajam ia menangkap pola penjualan.</p>
                <h4 className={styles.eyebrow}>Agenda evaluasi</h4>
                <div className={styles.reviews}>
                  <div><span className={styles.time}>Bulanan / 60 menit</span><h5>Monthly Review</h5><p>Evaluasi metrik performa vs target bisnis.</p></div>
                  <div><span className={styles.time}>Kuartalan / 2 jam</span><h5>Quarterly Business Review</h5><p>Tinjauan mendalam perhitungan ROI per kuartal.</p></div>
                </div>
                <div className={styles.growthLoop} aria-label="Siklus optimasi berkelanjutan">
                  <span>Monitor</span><Plus size={12} aria-hidden="true" /><span>Learn</span><Plus size={12} aria-hidden="true" /><span>Optimize</span><span aria-hidden="true">↻</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.difference} aria-labelledby="difference-title">
          <div className={styles.container}>
            <h2 id="difference-title" className="section-label">02 / What makes us different</h2>
            <p className={styles.sectionTitle}>Kenapa cara kerja kami<br /><span>berbeda dari agency biasa.</span></p>
            <div className={styles.tableScroll} role="region" aria-label="Perbandingan cara kerja agency biasa dan Afilabs" tabIndex={0}>
              <table className={styles.comparison}>
                <caption className={styles.srOnly}>Perbandingan proses kerja agency biasa dengan Afilabs</caption>
                <thead><tr><th scope="col">Kriteria</th><th scope="col">Agency biasa</th><th scope="col">Afilabs <span aria-hidden="true">↗</span></th></tr></thead>
                <tbody>{comparison.map(([criterion, agency, afi]) => (
                  <tr key={criterion}><th scope="row">{criterion}</th><td>{agency}</td><td><Check size={15} aria-hidden="true" /><span>{afi}</span></td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.team} aria-labelledby="team-title">
          <div className={styles.container}>
            <h2 id="team-title" className="section-label">03 / Our team</h2>
            <p className={styles.sectionTitle}>Kamu kerja langsung dengan builder,<br /><span>bukan account manager.</span></p>
            <ol className={styles.teamGrid}>
              {team.map((member, index) => (
                <li key={member.role} className="reveal"><span className={styles.eyebrow}>0{index + 1} / {member.label}</span><h3>{member.role}</h3><p>{member.detail}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <p className="section-label">Your next move</p>
            <h2 id="cta-title">Siap mulai?<br /><span>Mulai dari satu percakapan.</span></h2>
            <p>Langkah pertama: 30 menit discovery call.</p>
            <a href={contactUrl} className={styles.primaryButton}>Book Discovery Call <ArrowUpRight size={15} aria-hidden="true" /></a>
            <Link href="/" className={styles.backLink}>Kembali ke beranda</Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
          { "@type": "ListItem", position: 2, name: "How It Works", item: `${site.url}/how-it-works` },
        ],
      }) }} />
    </>
  );
}
