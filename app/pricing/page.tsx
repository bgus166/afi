import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { FeatureExplorer, type ServiceFeature } from "@/components/services/shared/ServiceInteractions";
import { PricingExplorer } from "./pricing-explorer";
import styles from "./pricing.module.css";

const description = "Bandingkan model kerja Afilabs: project-based, monthly retainer, dan performance-based untuk pertumbuhan bisnis kamu.";
export const metadata: Metadata = {
  title: "Pricing",
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | Afilabs", description, url: "/pricing", type: "website" },
};

const included = [
  ["AI Readiness Audit", "Audit awal untuk memahami operasional dan peluang penerapan AI sebelum pembangunan dimulai."],
  ["NDA & Data Security Agreement", "Kesepakatan kerahasiaan untuk melindungi data bisnis dan pelanggan kamu."],
  ["Dedicated Point of Contact", "Berkomunikasi langsung dengan Growth Partner dan engineer Afilabs."],
  ["Full Handover & Video SOP", "Aset kode, dokumentasi, dan panduan diserahkan agar tim internal bisa mengelolanya."],
  ["Data Privacy", "Knowledge base bisnis dienkripsi dan tidak digunakan untuk melatih model kompetitor."],
];

const faq: ServiceFeature[] = [
  {
    title: "Apakah ada kontrak jangka panjang yang tidak bisa diputus?",
    body: "Project-based selesai setelah serah terima. Monthly Retainer memiliki komitmen awal minimal 3 bulan dan berlanjut bulanan setelahnya. Performance-based membutuhkan komitmen minimal 6 bulan.",
    tag: "Komitmen kerja sama",
    icon: "shield",
    sample: "Durasi kerja sama mengikuti model yang kamu pilih.",
  },
  {
    title: "Bagaimana jika kami butuh tambahan setelah project selesai?",
    body: "Kamu bisa melanjutkan dengan retainer bulanan untuk optimasi, atau meminta penawaran project baru untuk fitur yang lebih besar. Tidak ada kewajiban untuk melanjutkan.",
    tag: "Setelah serah terima",
    icon: "workflow",
    sample: "Retainer atau project baru, sesuai kebutuhan berikutnya.",
  },
  {
    title: "Apakah biaya Xendit, WhatsApp API, dan platform lain sudah termasuk?",
    body: "Belum. Biaya platform pihak ketiga dibayar langsung ke penyedia melalui akun perusahaan kamu. Afilabs membantu proses pendaftaran dan integrasinya.",
    tag: "Biaya pihak ketiga",
    icon: "layers",
    sample: "Akun perusahaan kamu. Pembayaran langsung ke penyedia platform.",
  },
  {
    title: "Apakah ada diskon untuk penggunaan beberapa produk?",
    body: "Ada penawaran khusus untuk brand yang menerapkan lebih dari dua solusi Afilabs secara bersamaan, karena sebagian infrastruktur dan knowledge base dapat digunakan bersama.",
    tag: "Beberapa solusi",
    icon: "database",
    sample: "Infrastruktur bersama membuka ruang untuk penawaran khusus.",
  },
];

export default function PricingPage() {
  return <><Header /><main className={styles.page}>
    <section className={styles.hero} aria-labelledby="pricing-title"><PaperBackground /><div className={`${styles.container} ${styles.heroInner}`}>
      <p className="section-label">Pricing / Built around your business</p>
      <h1 id="pricing-title">Investasi yang sejalan<br />dengan <span>pertumbuhan kamu.</span></h1>
      <p className={styles.lead}>Setiap bisnis punya kebutuhan yang berbeda. Pilih cara bekerja sama yang sesuai dengan tujuan dan tahap pertumbuhan brand kamu.</p>
      <a className={styles.heroLink} href="#models">Lihat pilihan kerja sama <ArrowDown size={15} aria-hidden="true" /></a>
    </div></section>
    <PricingExplorer />
    <section className={styles.included} aria-labelledby="included-title"><div className={styles.container}>
      <div className={styles.sectionHead}><div><p className="section-label">02 / Always included</p><h2 id="included-title">Apa pun modelnya,<br /><span>fondasinya tetap sama.</span></h2></div><p>Setiap kerja sama dimulai dengan pemahaman tentang bisnis kamu, dan diakhiri dengan sistem yang bisa kamu kelola.</p></div>
      <ol className={styles.includedList}>{included.map(([title, copy], index) => <li className="reveal" key={title}><span className={styles.itemNumber}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><Check size={18} aria-hidden="true" /></li>)}</ol>
    </div></section>
    <section id="good-to-know" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.container}>
        <div className={styles.faqIntro}>
          <div>
            <p className="section-label">03 / Good to know</p>
            <h2 id="faq-title">Pertanyaan soal biaya?<br /><span>Mari kita bahas.</span></h2>
          </div>
          <p>Hal-hal penting yang perlu kamu tahu sebelum memulai kerja sama.</p>
        </div>
        <FeatureExplorer id="pricing-faq" features={faq} canvasLabel="Built around your business" />
      </div>
    </section>
    <section className={styles.cta}><PaperBackground /><div className={`${styles.container} ${styles.ctaInner}`}><p className="section-label">Let’s find your fit</p><h2>Belum yakin mulai dari mana?<br /><span>Kita cari jawabannya bersama.</span></h2><p>Ceritakan kebutuhan bisnis kamu, dan kita tentukan model kerja sama yang paling sesuai.</p><a href="https://afilabs.id/contact" className={styles.primary}>Book a Pricing Consultation <ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
  </main><Footer /></>;
}
