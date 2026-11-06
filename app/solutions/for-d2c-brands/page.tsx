import type { Metadata } from "next";
import {
  ArrowDown, ArrowUpRight, ChartNoAxesCombined, Check, Database,
  FileText, HeartHandshake, MessageCircle, ShoppingBag, Store, UsersRound, Workflow,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { serviceContact } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import { D2COpportunity, D2CRoadmap, D2CStack } from "./D2CExperience";
import styles from "./d2c.module.css";

export const dynamic = "force-static";

const title = "Solusi untuk Brand D2C";
const description = "Bangun channel D2C dengan ekosistem AI terintegrasi: afiliasi, layanan pelanggan, konten, business intelligence, dan otomatisasi operasional bersama Afilabs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/for-d2c-brands" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/solutions/for-d2c-brands", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

function DirectChannelVisual() {
  return <figure className={styles.heroVisual} aria-label="Ilustrasi website D2C milik brand yang terhubung ke AfiHub, AfiAssist, AfiCreator, AfiInsight, dan AfiFlow.">
    <div className={styles.visualTop}><span className={styles.label}>Your direct channel</span><span className={styles.visualTag}>Ilustrasi</span></div>
    <div className={styles.ecosystemScene}>
      <svg className={styles.ecosystemLines} viewBox="0 0 500 420" fill="none" aria-hidden="true"><path d="M110 80H180V165M390 80H320V165M105 300H175V245M395 300H325V245M250 260V365" stroke="currentColor" strokeWidth="1.5" /><circle cx="110" cy="80" r="3" fill="currentColor" /><circle cx="390" cy="80" r="3" fill="currentColor" /><circle cx="105" cy="300" r="3" fill="currentColor" /><circle cx="395" cy="300" r="3" fill="currentColor" /></svg>
      <div className={`${styles.ecosystemCard} ${styles.hubCard}`}><UsersRound size={23} strokeWidth={1.4} aria-hidden="true" /><span><strong>AfiHub</strong><small>Program afiliasi</small></span></div>
      <div className={`${styles.ecosystemCard} ${styles.creatorCard}`}><FileText size={23} strokeWidth={1.4} aria-hidden="true" /><span><strong>AfiCreator</strong><small>Brief & konten</small></span></div>
      <div className={styles.storefront}>
        <div className={styles.storeTop}><Store size={16} aria-hidden="true" /><span>brand kamu</span><ShoppingBag size={15} aria-hidden="true" /></div>
        <div className={styles.storeBody}><span className={styles.storeKicker}>Direct-to-consumer</span><strong>Lebih dekat<br />dengan pelanggan.</strong><div className={styles.productDisplay} aria-hidden="true"><span className={styles.productBottle}><span /></span><span className={styles.productBox}><span /></span><span className={styles.productJar}><span /></span></div></div>
        <div className={styles.storeBottom}><Check size={13} aria-hidden="true" />Channel milik brand</div>
      </div>
      <div className={`${styles.ecosystemCard} ${styles.assistCard}`}><MessageCircle size={23} strokeWidth={1.4} aria-hidden="true" /><span><strong>AfiAssist</strong><small>Percakapan pelanggan</small></span></div>
      <div className={`${styles.ecosystemCard} ${styles.insightCard}`}><ChartNoAxesCombined size={23} strokeWidth={1.4} aria-hidden="true" /><span><strong>AfiInsight</strong><small>Konteks keputusan</small></span></div>
      <div className={`${styles.ecosystemCard} ${styles.flowCard}`}><Workflow size={21} strokeWidth={1.4} aria-hidden="true" /><span><strong>AfiFlow</strong><small>Operasional terhubung</small></span></div>
    </div>
    <figcaption><span>Website sebagai pusat ekosistem.</span><span>Afiliasi. Percakapan. Data. Operasional.</span></figcaption>
  </figure>;
}

function SectionHeading({ id, label, title: heading, accent, aside }: { id: string; label: string; title: string; accent: string; aside?: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.label}>{label}</p><h2 id={id}>{heading}<br /><span>{accent}</span></h2></div>{aside && <p>{aside}</p>}</div>;
}

export default function D2CBrandsPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="d2c-title">
        <PaperBackground />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.label}>Solutions / For D2C brands</p>
              <h1 id="d2c-title">Bangun channel<br />D2C yang<br /><span>profitable.</span></h1>
              <p className={styles.lead}>Hubungkan afiliasi, layanan pelanggan, data, dan operasional di atas website D2C kamu. Bangun satu ekosistem yang mendukung pertumbuhan brand.</p>
              <div className={styles.actions}><a href={serviceContact} className={styles.primary}>Diskusikan strategi D2C<ArrowUpRight size={16} aria-hidden="true" /></a><a href="#d2c-stack" className={styles.textLink}>Jelajahi stack AI<ArrowDown size={15} aria-hidden="true" /></a></div>
            </div>
            <DirectChannelVisual />
          </div>
          <div className={styles.benefitRail}>
            <div><ChartNoAxesCombined size={22} strokeWidth={1.4} aria-hidden="true" /><span><strong>Margin lebih terkendali</strong><small>Kelola biaya di channel sendiri</small></span></div>
            <div><Database size={22} strokeWidth={1.4} aria-hidden="true" /><span><strong>Data pelanggan lebih dekat</strong><small>Bangun konteks untuk retensi</small></span></div>
            <div><HeartHandshake size={22} strokeWidth={1.4} aria-hidden="true" /><span><strong>Hubungan langsung</strong><small>Beri pelanggan alasan kembali</small></span></div>
          </div>
        </div>
      </section>

      <section id="d2c-opportunity" className={`${styles.section} ${styles.tinted}`} aria-labelledby="d2c-opportunity-title">
        <div className={styles.container}>
          <SectionHeading id="d2c-opportunity-title" label="01 / The opportunity" title="Saatnya membangun" accent="channel milikmu." aside="Buka setiap bagian untuk melihat peran channel D2C bagi margin, data pelanggan, dan kekuatan brand." />
          <D2COpportunity />
        </div>
      </section>

      <section id="d2c-stack" className={styles.section} aria-labelledby="d2c-stack-title">
        <div className={styles.container}>
          <SectionHeading id="d2c-stack-title" label="02 / The connected stack" title="Lima peran." accent="Satu ekosistem D2C." aside="Pilih modul untuk melihat bagaimana afiliasi, percakapan, konten, data, dan operasional saling terhubung." />
          <D2CStack />
        </div>
      </section>

      <section id="d2c-roadmap" className={`${styles.section} ${styles.blue}`} aria-labelledby="d2c-roadmap-title">
        <div className={styles.container}>
          <SectionHeading id="d2c-roadmap-title" label="03 / The 90-day formula" title="Rencana 90 hari." accent="Dibangun bertahap." aside="Mulai dari audit, pasang fondasinya, lalu evaluasi bersama. Pilih tahap untuk melihat fokus pekerjaannya." />
          <D2CRoadmap />
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="d2c-cta-title">
        <PaperBackground />
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <Store size={33} strokeWidth={1.3} className={styles.ctaIcon} aria-hidden="true" />
          <p className={styles.label}>Your brand. Your direct channel.</p>
          <h2 id="d2c-cta-title">Channel milikmu.<br /><span>Mulai dari strategi.</span></h2>
          <p>Ceritakan kondisi website, afiliasi, dan operasional brand kamu. Kita petakan langkah D2C berikutnya bersama.</p>
          <a href={serviceContact} className={styles.primary}>Jadwalkan sesi strategi D2C<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
