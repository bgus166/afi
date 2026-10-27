import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InsightDashboard, InsightPreview, IntelligenceJourney, WeeklyIntelligence } from "@/components/services/afiinsight/InsightExperience";
import { FeatureExplorer, type ServiceFeature } from "@/components/services/shared/ServiceInteractions";
import { ProblemCards, SectionHeading, ServiceCTA, ServiceHero, ServiceSchema } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import styles from "@/components/services/shared/ServicePage.module.css";

export const dynamic = "force-static";
const title = "AfiInsight — AI Business Intelligence";
const description = "Hubungkan data bisnis dan temukan langkah berikutnya bersama AfiInsight. Jelajahi dashboard, performa afiliasi, pola pelanggan, dan contoh weekly intelligence.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/services/afiinsight" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/services/afiinsight", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

const problems = [
  { tag: "Scattered context", title: "Satu bisnis. Banyak dashboard.", body: "Data website, marketplace, dan afiliasi terpisah. Gambaran utuh sulit terlihat." },
  { tag: "Numbers without direction", title: "Angka berubah. Lalu apa?", body: "Perubahan performa butuh konteks agar tim tahu apa yang perlu ditelusuri." },
  { tag: "Reporting overload", title: "Waktunya habis di laporan.", body: "Ekspor dan rekap manual mengurangi waktu untuk mengambil tindakan." },
];
const features: ServiceFeature[] = [
  { title: "Multi-source Integration", body: "Satukan website, marketplace, payment, dan konteks CS.", tag: "A connected picture", icon: "layers", sample: "Lihat hubungan antar-channel, bukan angka yang terpisah." },
  { title: "AI-generated Insights", body: "Terjemahkan pola data menjadi bahan keputusan tim.", tag: "Find the signal", icon: "sparkles", sample: "Mulai diskusi dari sinyal yang perlu ditinjau." },
  { title: "Weekly Intelligence", body: "Ringkasan mingguan dikirim setiap Senin melalui email.", tag: "A weekly rhythm", icon: "database", sample: "Buka minggu dengan prioritas yang lebih jelas." },
  { title: "Early Warning System", body: "Kenali anomali produk dan operasional lebih awal.", tag: "Notice what changed", icon: "shield", sample: "Lihat sinyalnya. Periksa konteksnya. Tentukan responsnya." },
  { title: "Custom Dashboard", body: "Fokuskan tampilan pada metrik yang relevan bagi bisnis.", tag: "A focused workspace", icon: "trend", sample: "Beri ruang untuk metrik yang membantu keputusanmu." },
  { title: "Multi-user Access", body: "Sesuaikan akses founder, marketing, dan operasional.", tag: "The right context", icon: "workflow", sample: "Setiap tim mendapat pandangan sesuai tanggung jawabnya." },
];

export default function AfiInsightPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <ServiceHero name="AfiInsight" category="AI business intelligence" title={<>Satu pandangan.<br />Keputusan<br /><span>lebih tajam.</span></>} lead="AfiInsight menghubungkan data bisnis dan mengubahnya menjadi insight serta prioritas tindakan mingguan." action="See AfiInsight Demo" demo="insight-dashboard"><InsightPreview /></ServiceHero>
      <section className={styles.section} aria-labelledby="insight-problem-title"><div className={styles.container}><SectionHeading id="insight-problem-title" label="01 / The problem" title={<>Kamu punya datanya.<br /><span>Sudah tahu langkahnya?</span></>} /><ProblemCards items={problems} /><div className={styles.statement}><span aria-hidden="true">↳</span><p>Lebih sedikit menebak.<br />Lebih banyak memahami.</p></div></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="insight-process-title"><div className={styles.container}><SectionHeading id="insight-process-title" label="02 / How AfiInsight works" title={<>Data masuk.<br /><span>Arah mulai terlihat.</span></>} aside="Ikuti bagaimana konteks dikumpulkan, pola dibaca, dan prioritas disusun." /><IntelligenceJourney /><Link href="/how-it-works" className={styles.textLink}>Kenali proses kerja kami <ArrowUpRight size={14} aria-hidden="true" /></Link></div></section>
      <section id="insight-dashboard" className={styles.section} aria-labelledby="insight-dashboard-title"><div className={styles.container}><SectionHeading id="insight-dashboard-title" label="03 / Your business, in focus" title={<>Buka perspektif baru.<br /><span>Coba dashboard-nya.</span></>} aside="Ganti periode dan channel. Telusuri grafik, urutkan kreator, lalu buka sinyal operasional. Seluruh data di sini adalah ilustrasi." /><InsightDashboard /></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="insight-features-title"><div className={styles.container}><SectionHeading id="insight-features-title" label="04 / Built for clarity" title={<>Konteks yang lengkap.<br /><span>Fokus yang tetap terjaga.</span></>} /><FeatureExplorer id="insight-feature" features={features} /></div></section>
      <section className={`${styles.section} ${styles.blue}`} aria-labelledby="insight-report-title"><div className={styles.container}><SectionHeading id="insight-report-title" label="05 / A clearer Monday" title={<>Buka minggu.<br /><span>Sudah punya arah.</span></>} aside="Coba contoh intelligence brief dan tandai langkah yang ingin dibahas bersama tim." /><WeeklyIntelligence /></div></section>
      <ServiceCTA id="insight-cta-title" label="Your data. A clearer direction." title={<>Siap melihat bisnis<br /><span>dengan lebih utuh?</span></>} body="Ceritakan data dan keputusan yang paling penting bagi timmu. Kita mulai dari sana." action="Explore AfiInsight" />
    </main>
    <Footer /><ServiceSchema name="AfiInsight" slug="afiinsight" description={description} type="AI Business Intelligence" />
  </>;
}
