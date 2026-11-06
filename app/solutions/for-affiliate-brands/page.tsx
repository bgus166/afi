import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, ChartNoAxesCombined, FileText, Link2, ReceiptText, UsersRound, Workflow } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { serviceContact } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import { AffiliateInfrastructure, AffiliatePayout, AffiliateScale } from "./AffiliateExperience";
import styles from "./affiliate.module.css";

export const dynamic = "force-static";
const title = "Solusi untuk Affiliate-Led Brands";
const description = "Bangun sistem afiliasi yang menghubungkan tracking, brief kreator, komisi, dan payout. Jelajahi infrastruktur serta simulasi payout bersama Afilabs.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/for-affiliate-brands" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/solutions/for-affiliate-brands", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

function AffiliateNetworkVisual() {
  return <figure className={styles.heroVisual} aria-label="Ilustrasi afiliator, konten, dan referral terhubung melalui AfiHub ke performa kreator serta komisi dan payout.">
    <div className={styles.visualTop}><span className={styles.label}>Built around your creators</span><span className={styles.visualTag}>Ilustrasi</span></div>
    <div className={styles.networkScene}>
      <div className={styles.networkInputs}>{[{ icon: UsersRound, label: "Afiliator" }, { icon: FileText, label: "Konten" }, { icon: Link2, label: "Referral" }].map(({ icon: Icon, label }) => <div key={label}><Icon size={25} strokeWidth={1.3} aria-hidden="true" /><span>{label}</span></div>)}</div>
      <div className={styles.networkConnector} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.hubCore}><div><Workflow size={26} strokeWidth={1.3} aria-hidden="true" /><span>AfiHub Integration</span></div><strong>Satu alur afiliasi.</strong><p>Tracking, komisi, dan status payout<br />dalam konteks yang terhubung.</p><div className={styles.hubFields}><span>Referral</span><span>Konversi</span><span>Komisi</span></div></div>
      <div className={styles.networkBranch} aria-hidden="true" />
      <div className={styles.networkOutputs}><div><ChartNoAxesCombined size={24} strokeWidth={1.3} aria-hidden="true" /><span>Performa<br /><strong>kreator</strong></span></div><div><ReceiptText size={24} strokeWidth={1.3} aria-hidden="true" /><span>Komisi<br /><strong>& payout</strong></span></div></div>
    </div>
    <figcaption>Program berkembang. Setiap alur tetap bisa ditelusuri.</figcaption>
  </figure>;
}

function SectionHeading({ id, label, heading, accent, aside }: { id: string; label: string; heading: string; accent: string; aside: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.label}>{label}</p><h2 id={id}>{heading}<br /><span>{accent}</span></h2></div><p>{aside}</p></div>;
}

export default function AffiliateBrandsPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="affiliate-title">
        <PaperBackground />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroGrid}><div className={styles.heroCopy}><p className={styles.label}>Solutions / For affiliate-led brands</p><h1 id="affiliate-title">Afiliator kamu<br />adalah<br /><span>aset terbesar.</span></h1><p className={styles.lead}>Bangun sistem yang menghubungkan pelacakan referral, brief konten, komisi, dan payout. Jaga program afiliasi tetap terkelola saat jaringan kreator berkembang.</p><div className={styles.actions}><a href={serviceContact} className={styles.primary}>Diskusikan sistem afiliasi<ArrowUpRight size={16} aria-hidden="true" /></a><a href="#affiliate-payout" className={styles.textLink}>Simulasikan payout<ArrowDown size={15} aria-hidden="true" /></a></div></div><AffiliateNetworkVisual /></div>
          <nav className={styles.chapterNav} aria-label="Bagian halaman Affiliate Brands">{[{ number: "01", label: "Skala program", href: "#affiliate-scale" }, { number: "02", label: "Simulasi payout", href: "#affiliate-payout" }, { number: "03", label: "Infrastruktur", href: "#affiliate-infrastructure" }].map((item) => <a href={item.href} key={item.href}><span aria-hidden="true">{item.number}</span>{item.label}<ArrowDown size={13} aria-hidden="true" /></a>)}</nav>
        </div>
      </section>
      <section id="affiliate-scale" className={`${styles.section} ${styles.tinted}`} aria-labelledby="affiliate-scale-title"><div className={styles.container}><SectionHeading id="affiliate-scale-title" label="01 / The problem of scale" heading="Program bertumbuh." accent="Beban admin ikut naik." aside="Pilih skenario untuk melihat tantangan yang muncul saat jaringan afiliator berkembang tanpa sistem yang terhubung." /><AffiliateScale /></div></section>
      <section id="affiliate-payout" className={styles.section} aria-labelledby="affiliate-payout-title"><div className={styles.container}><SectionHeading id="affiliate-payout-title" label="02 / The payout simulation" heading="Komisi terlihat jelas." accent="Payout mudah ditinjau." aside="Ubah GMV dan komisi untuk satu afiliator. Lihat hubungan antara komisi kotor, potongan simulasi, dan estimasi penerimaan bersih." /><AffiliatePayout /></div></section>
      <section id="affiliate-infrastructure" className={`${styles.section} ${styles.blue}`} aria-labelledby="affiliate-infrastructure-title"><div className={styles.container}><SectionHeading id="affiliate-infrastructure-title" label="03 / The connected infrastructure" heading="Sistem yang siap" accent="tumbuh bersama kreator." aside="Enam komponen untuk mengelola program afiliasi. Buka setiap bagian untuk melihat peran dan alurnya." /><AffiliateInfrastructure /></div></section>
      <section className={styles.cta} aria-labelledby="affiliate-cta-title"><PaperBackground /><div className={`${styles.container} ${styles.ctaInner}`}><UsersRound size={34} strokeWidth={1.3} className={styles.ctaIcon} aria-hidden="true" /><p className={styles.label}>Your creators. A connected system.</p><h2 id="affiliate-cta-title">Rawat jaringannya.<br /><span>Rapikan sistemnya.</span></h2><p>Ceritakan cara brand kamu mengelola afiliator hari ini. Kita petakan infrastruktur yang dibutuhkan untuk langkah berikutnya.</p><a href={serviceContact} className={styles.primary}>Jadwalkan diskusi afiliasi<ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
    </main>
    <Footer />
  </>;
}
