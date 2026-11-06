import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Link2, Repeat2, ShoppingBag, Store, UsersRound } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { serviceContact } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import { MarketplaceCalculator, MarketplaceExpansion } from "./MarketplaceExperience";
import { channelComparison } from "./marketplace-data";
import styles from "./marketplace.module.css";

export const dynamic = "force-static";
const title = "Solusi untuk Marketplace Sellers";
const description = "Kembangkan channel D2C sambil menjaga toko marketplace tetap berjalan. Bandingkan asumsi biaya dan kenali strategi ekspansi bertahap bersama Afilabs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/for-marketplace-sellers" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/solutions/for-marketplace-sellers", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

function ParallelChannelsVisual() {
  return <figure className={styles.heroVisual} aria-label="Ilustrasi satu brand dengan dua channel: marketplace untuk akuisisi pelanggan baru dan website D2C untuk repeat order.">
    <div className={styles.visualTop}><span className={styles.label}>One brand. Two channels.</span><span className={styles.visualTag}>Ilustrasi</span></div>
    <div className={styles.parallelScene}>
      <div className={styles.brandCore}><ShoppingBag size={25} strokeWidth={1.3} aria-hidden="true" /><span>Brand kamu</span></div>
      <div className={styles.branchLine} aria-hidden="true" />
      <div className={styles.channelCards}>
        <div className={styles.marketplaceCard}><div className={styles.channelIcon}><ShoppingBag size={29} strokeWidth={1.3} aria-hidden="true" /></div><span className={styles.label}>Acquisition</span><strong>Marketplace</strong><p>Temukan<br />pelanggan baru.</p><div className={styles.channelMini}><UsersRound size={17} aria-hidden="true" /><span>Shopee / TikTok</span></div></div>
        <div className={styles.directCard}><div className={styles.channelIcon}><Store size={29} strokeWidth={1.3} aria-hidden="true" /></div><span className={styles.label}>Retention</span><strong>Website D2C</strong><p>Beri alasan<br />untuk kembali.</p><div className={styles.channelMini}><Repeat2 size={17} aria-hidden="true" /><span>Channel milikmu</span></div></div>
      </div>
      <div className={styles.parallelOutcome}><Check size={16} aria-hidden="true" />Keduanya berjalan berdampingan.</div>
    </div>
    <figcaption>Peran berbeda. Satu portofolio brand.</figcaption>
  </figure>;
}

function SectionHeading({ id, label, heading, accent, aside }: { id: string; label: string; heading: string; accent: string; aside: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.label}>{label}</p><h2 id={id}>{heading}<br /><span>{accent}</span></h2></div><p>{aside}</p></div>;
}

export default function MarketplaceSellersPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="marketplace-title">
        <PaperBackground />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.label}>Solutions / For marketplace sellers</p>
              <h1 id="marketplace-title">Marketplace jalan.<br />D2C ikut<br /><span>tumbuh.</span></h1>
              <p className={styles.lead}>Bangun channel D2C secara paralel, sambil menjaga toko marketplace tetap berjalan. Afilabs membantu menghubungkan afiliasi, layanan pelanggan, dan operasionalnya.</p>
              <div className={styles.actions}><a href={serviceContact} className={styles.primary}>Audit biaya marketplace<ArrowUpRight size={16} aria-hidden="true" /></a><a href="#marketplace-calculator" className={styles.textLink}>Hitung simulasi biaya<ArrowDown size={15} aria-hidden="true" /></a></div>
            </div>
            <ParallelChannelsVisual />
          </div>
          <nav className={styles.chapterNav} aria-label="Bagian halaman Marketplace Sellers">{[{ number: "01", label: "Simulasi biaya", href: "#marketplace-calculator" }, { number: "02", label: "Strategi paralel", href: "#marketplace-strategy" }, { number: "03", label: "Rencana ekspansi", href: "#marketplace-expansion" }].map((chapter) => <a href={chapter.href} key={chapter.href}><span aria-hidden="true">{chapter.number}</span>{chapter.label}<ArrowDown size={13} aria-hidden="true" /></a>)}</nav>
        </div>
      </section>

      <section id="marketplace-calculator" className={`${styles.section} ${styles.tinted}`} aria-labelledby="marketplace-calculator-title">
        <div className={styles.container}>
          <SectionHeading id="marketplace-calculator-title" label="01 / The numbers" heading="Bandingkan biayanya." accent="Lihat ruang efisiensinya." aside="Ubah GMV bulanan untuk membandingkan dua skenario biaya dengan asumsi yang terlihat jelas." />
          <MarketplaceCalculator />
        </div>
      </section>

      <section id="marketplace-strategy" className={styles.section} aria-labelledby="marketplace-strategy-title">
        <div className={styles.container}>
          <SectionHeading id="marketplace-strategy-title" label="02 / The parallel strategy" heading="Dua channel." accent="Saling melengkapi." aside="Gunakan marketplace untuk mengenalkan produk. Bangun channel D2C untuk pelanggan yang ingin kembali ke brand kamu." />
          <div className={styles.strategyFlow} aria-label="Marketplace membantu akuisisi, sementara D2C mendukung repeat order."><div><ShoppingBag size={25} strokeWidth={1.4} aria-hidden="true" /><span><small>Marketplace</small><strong>Pelanggan baru</strong></span></div><ArrowRight size={25} strokeWidth={1.3} aria-hidden="true" /><div><Store size={25} strokeWidth={1.4} aria-hidden="true" /><span><small>Website D2C</small><strong>Hubungan berlanjut</strong></span></div></div>
          <table className={styles.comparisonTable}><caption>Peran marketplace dan channel D2C dalam bisnis brand.</caption><thead><tr><th scope="col">Aspek bisnis</th><th scope="col">Marketplace yang sudah ada</th><th scope="col">Website D2C</th></tr></thead><tbody>{channelComparison.map((row) => <tr key={row.aspect}><th scope="row">{row.aspect}</th><td><span className={styles.mobileCellLabel} aria-hidden="true">Marketplace</span>{row.marketplace}</td><td><span className={styles.mobileCellLabel} aria-hidden="true">Website D2C</span>{row.d2c}</td></tr>)}</tbody></table>
          <div className={styles.strategyNote}><div><Link2 size={23} strokeWidth={1.4} aria-hidden="true" /><p>Afiliator yang sama bisa mempromosikan kedua channel, dengan link dan komisi yang berbeda.</p></div><Link href="/solutions/for-d2c-brands" className={styles.textLink}>Lihat solusi D2C<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="marketplace-expansion" className={`${styles.section} ${styles.blue}`} aria-labelledby="marketplace-expansion-title">
        <div className={styles.container}>
          <SectionHeading id="marketplace-expansion-title" label="03 / The expansion path" heading="Tambah channel." accent="Bangun bertahap." aside="Empat fase untuk mengembangkan portofolio penjualan. Pilih fase untuk melihat fokus kerja dan target skenarionya." />
          <MarketplaceExpansion />
          <p className={styles.expansionNote}>Rencana dan target bersifat indikatif, mengikuti materi Afilabs. Implementasi disesuaikan dengan kondisi toko dan kesiapan tim.</p>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="marketplace-cta-title">
        <PaperBackground />
        <div className={`${styles.container} ${styles.ctaInner}`}><ShoppingBag size={33} strokeWidth={1.3} className={styles.ctaIcon} aria-hidden="true" /><p className={styles.label}>Know your costs. Plan your next channel.</p><h2 id="marketplace-cta-title">Mulai dari<br /><span>biaya yang jelas.</span></h2><p>Petakan biaya marketplace kamu dan temukan ruang untuk membangun channel D2C bersama Afilabs.</p><a href={serviceContact} className={styles.primary}>Jadwalkan audit marketplace<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </section>
    </main>
    <Footer />
  </>;
}
