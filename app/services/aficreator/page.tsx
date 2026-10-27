import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContentCalendar, ContentDeck, CreatorStudio } from "@/components/services/aficreator/CreatorExperience";
import { FeatureExplorer, ScrollStory, type ServiceFeature } from "@/components/services/shared/ServiceInteractions";
import { ProblemCards, SectionHeading, ServiceCTA, ServiceHero, ServiceSchema } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import styles from "@/components/services/shared/ServicePage.module.css";

export const dynamic = "force-static";
const title = "AfiCreator — AI Content Engine";
const description = "Generate hook TikTok, caption Instagram, dan brief konten personal untuk afiliator brand kamu. AfiCreator menghubungkan data produk, tren, dan gaya kreator.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/services/aficreator" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/services/aficreator", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

const problems = [
  { tag: "Mixed messages", title: "Banyak afiliator. Pesan berbeda-beda.", body: "Tanpa brief yang jelas, setiap afiliator punya versi promosi sendiri. Brand message dan citra produk jadi tidak konsisten di berbagai channel." },
  { tag: "Copy-paste content", title: "Produknya beda. Caption-nya sama.", body: "Konten generik dipakai berulang untuk produk dan audiens yang berbeda. Relevansi turun, engagement ikut tertahan." },
  { tag: "Manual briefing", title: "Brief satu per satu? Nggak scalable.", body: "Waktu tim marketing habis untuk menyusun brief manual. Saat puluhan kreator tumbuh menjadi ratusan, proses yang sama makin membebani tim." },
];
const steps = [
  { title: "Product Intelligence", tag: "Start with what is true", body: "AfiCreator pelajari katalog produk: fitur, benefit, harga, target audience, unique selling point, dan kompetitor. Data produk menjadi fondasi konten yang relevan dan akurat.", labels: ["Katalog & spesifikasi produk", "Audience & unique selling point", "Harga, benefit & kompetitor"], output: "Product intelligence siap digunakan" },
  { title: "Trend Integration", tag: "Find the right conversation", body: "Setiap minggu, AfiCreator memindai tren konten TikTok dan Instagram yang relevan dengan kategori produk. Angle dan hook diperbarui mengikuti konteks tren yang berkembang.", labels: ["Tren kategori TikTok & Instagram", "Hook & format yang relevan", "Pembaruan mingguan"], output: "Angle konten yang lebih kontekstual" },
  { title: "Personalized Brief", tag: "Make it their own", body: "Setiap afiliator menerima brief yang sesuai niche dan gaya kontennya. Kreator fashion dan skincare bisa mendapat angle berbeda, meski mempromosikan produk yang sama.", labels: ["Niche & gaya kreator", "Brand message yang konsisten", "Hook, demo & CTA personal"], output: "Brief siap dibagikan ke afiliator" },
];
const features: ServiceFeature[] = [
  { title: "AI Content Generation", body: "Buat hook video, caption media sosial, dan struktur brief konten yang mengikuti karakter brand. Satu data produk menjadi fondasi berbagai format.", tag: "One source, many formats", icon: "sparkles", sample: "Product data → TikTok hooks + IG captions + Creator brief" },
  { title: "Trend Integration", body: "Pindai tren audio dan hook TikTok serta Instagram secara berkala, lalu hubungkan dengan kategori dan konteks produk kamu.", tag: "Stay relevant", icon: "trend", sample: "Tren kategori + konteks produk = angle yang relevan" },
  { title: "Per-Afiliator Personalization", body: "Sesuaikan sudut pandang konten dengan niche audiens dan gaya penyampaian tiap kreator. Pesan brand tetap konsisten, ceritanya tetap personal.", tag: "Built around the creator", icon: "layers", sample: "Satu produk. Berbeda kreator. Berbeda cerita." },
  { title: "Compliance Check", body: "Bantu saring kata dan klaim berisiko dengan mempertimbangkan regulasi BPOM, etika periklanan, serta pedoman brand sebelum brief dibagikan.", tag: "A more careful message", icon: "shield", sample: "Draft → Periksa klaim → Tinjau brief" },
  { title: "Weekly Refresh", body: "Perbarui brief mengikuti informasi produk, promosi baru, dan pergantian event promo brand. Afiliator selalu punya konteks yang lebih segar.", tag: "Keep the story moving", icon: "database", sample: "Produk berubah. Promo berganti. Brief ikut diperbarui." },
  { title: "Content Calendar", body: "Atur distribusi brief dan kalender konten untuk membantu tim mengelola jadwal posting serta ritme komunikasi ke afiliator.", tag: "A coordinated rhythm", icon: "workflow", sample: "Brief yang tepat, di jadwal yang terencana." },
];

export default function AfiCreatorPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <ServiceHero name="AfiCreator" category="AI content engine" title={<>Ratusan afiliator.<br />Satu content engine<br /><span>yang scale.</span></>} lead="Generate hook TikTok, caption IG, dan brief konten untuk semua afiliator kamu. Berangkat dari data produk nyata, tren aktual, dan performa historis konten." action="Request Demo" demo="creator-studio"><ContentDeck /></ServiceHero>
      <section className={styles.section} aria-labelledby="creator-problem-title"><div className={styles.container}><SectionHeading id="creator-problem-title" label="01 / The problem" title={<>Mereka mau buat konten.<br /><span>Tapi mulai dari mana?</span></>} /><ProblemCards items={problems} /><div className={styles.statement}><span aria-hidden="true">↳</span><p>Biarkan kreator fokus bercerita.<br />Fondasi kontennya, AfiCreator yang siapkan.</p></div></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="creator-process-title"><div className={styles.container}><SectionHeading id="creator-process-title" label="02 / How AfiCreator works" title={<>Input: data produk.<br /><span>Output: konten siap posting.</span></>} /><ScrollStory id="creator-process" kind="creator" steps={steps} /><Link href="/how-it-works" className={styles.textLink}>Kenali proses kerja kami <ArrowUpRight size={14} aria-hidden="true" /></Link></div></section>
      <section id="creator-studio" className={styles.section} aria-labelledby="creator-output-title"><div className={styles.container}><SectionHeading id="creator-output-title" label="03 / The content studio" title={<>Beda kreator, beda cerita.<br /><span>Coba sendiri di sini.</span></>} aside="Pilih produk, gaya kreator, dan format. Eksplorasi contoh output yang berbeda, lalu salin ide yang ingin kamu simpan." /><CreatorStudio /></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="creator-features-title"><div className={styles.container}><SectionHeading id="creator-features-title" label="04 / Built to scale" title={<>Creator operations.<br /><span>Minus the bottleneck.</span></>} aside="Enam kemampuan yang menjaga konten tetap relevan, konsisten, dan bisa dipersonalisasi saat program afiliasi tumbuh." /><FeatureExplorer id="creator-feature" features={features} /></div></section>
      <section className={`${styles.section} ${styles.blue}`} aria-labelledby="creator-calendar-title"><div className={styles.container}><SectionHeading id="creator-calendar-title" label="05 / A weekly rhythm" title={<>Konten terus bergerak.<br /><span>Tim tetap terarah.</span></>} aside="Brief bukan file yang dilupakan setelah dibagikan. Bangun ritme distribusi, variasi angle, dan refresh yang konsisten." /><ContentCalendar /></div></section>
      <ServiceCTA id="creator-cta-title" label="More creators. One content engine." title={<>Siap scale content program<br /><span>afiliasi kamu?</span></>} body="Mulai dari data produk dan tantangan tim kamu. Kita petakan bagaimana AfiCreator bisa membantu program afiliasi bertumbuh." action="See AfiCreator Demo" />
    </main>
    <Footer /><ServiceSchema name="AfiCreator" slug="aficreator" description={description} type="AI Content Generation" />
  </>;
}
