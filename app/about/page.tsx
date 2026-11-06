import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, FileSpreadsheet, MessageCircle, ShieldCheck, Target, UsersRound, Workflow } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";
import { AboutEcosystem, AboutHeroVisual, AboutPrinciples } from "./AboutVisuals";
import styles from "./about.module.css";

export const dynamic = "force-static";

const description = "Kenali cerita, prinsip, dan cara kerja Afilabs, mitra AI untuk bisnis D2C Indonesia.";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang Afilabs",
    description,
    url: "/about",
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: "Tentang Afilabs", description },
};

const chapters = [
  { number: "01", href: "#story", label: "Cerita kami" },
  { number: "02", href: "#principles", label: "Prinsip" },
  { number: "04", href: "#ecosystem", label: "Ekosistem" },
  { number: "05", href: "#values", label: "Dalam praktik" },
];

const principles = [
  { title: "Results over deliverables", body: "Hasil bisnis menjadi ukuran keberhasilan sistem." },
  { title: "Radical transparency", body: "Kamu memahami sistem dan tetap memegang kendalinya." },
  { title: "Indonesia-first thinking", body: "Konteks lokal mendasari setiap keputusan teknis." },
];

const practices = [
  { title: "Rilis bertahap", body: "Peluncuran disertai pemantauan selama 48 jam.", icon: Clock3 },
  { title: "Komunikasi terbuka", body: "Kendala dibahas sebelum tenggat, bersama pilihan penyelesaiannya.", icon: MessageCircle },
  { title: "Bertanggung jawab sampai tuntas", body: "Masalah target dibereskan sebelum penagihan retainer.", icon: ShieldCheck },
  { title: "Fokus pada keahlian", body: "Kebutuhan di luar bidang kami diarahkan ke partner spesialis.", icon: Target },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.label}>About / Afilabs</p>
                <h1 id="about-title">
                  Kami builders<br />
                  yang juga bisa<br />
                  <span>bicara bisnis.</span>
                </h1>
                <p className={styles.lead}>
                  Kami menerapkan AI sesuai bahasa pelanggan, ekosistem marketplace,
                  dan cara tim di Indonesia bekerja.
                </p>
                <a href="#story" className={styles.textLink}>
                  Kenali cara kami <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <AboutHeroVisual />
            </div>
            <nav className={styles.chapterNav} aria-label="Bagian halaman About">
              {chapters.map((chapter) => (
                <a key={chapter.href} href={chapter.href}>
                  <span aria-hidden="true">{chapter.number}</span>{chapter.label}
                  <ArrowDown size={13} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section id="story" className={styles.section} aria-labelledby="story-title">
          <div className={`${styles.container} ${styles.storyGrid}`}>
            <div className={styles.storyCopy}>
              <p className={styles.label}>01 / The story</p>
              <h2 id="story-title">Teknologinya ada.<br /><span>Konteksnya yang hilang.</span></h2>
              <p>
                Pada 2024, kami melihat brand bertumbuh sementara operasionalnya
                tertahan di spreadsheet dan WhatsApp. Afilabs menghubungkan AI
                dengan kebutuhan bisnis Indonesia.
              </p>
            </div>
            <div className={styles.storyVisual} role="img" aria-label="Awal cerita pada 2024: dari spreadsheet dan WhatsApp ke AI yang terhubung dengan kebutuhan bisnis.">
              <div className={styles.storyDate}><strong>2024</strong><span>Awal cerita</span></div>
              <div className={styles.manualSources}>
                <span><FileSpreadsheet size={24} strokeWidth={1.5} />Spreadsheet</span>
                <span><MessageCircle size={24} strokeWidth={1.5} />WhatsApp</span>
              </div>
              <div className={styles.storyConnector} aria-hidden="true"><ArrowDown size={20} /></div>
              <div className={styles.connectedSystem}><Workflow size={26} strokeWidth={1.5} /><span>AI dalam konteks bisnis</span><Check size={17} /></div>
              <p className={styles.visualNote}>Ilustrasi alur kerja</p>
            </div>
          </div>
        </section>

        <section id="principles" className={`${styles.section} ${styles.tinted}`} aria-labelledby="principles-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.label}>02 / Our principles</p><h2 id="principles-title" className={styles.sectionTitle}>Prinsip yang<br /><span>kami pegang.</span></h2></div>
              <p>Pilih prinsip untuk melihat bagaimana kami menerapkannya.</p>
            </div>
            <AboutPrinciples items={principles} />
          </div>
        </section>

        <section className={styles.partnership} aria-labelledby="partnership-title">
          <div className={`${styles.container} ${styles.partnershipGrid}`}>
            <div>
              <p className={styles.label}>03 / How we think</p>
              <h2 id="partnership-title">Kerja sama yang<br /><span>saling percaya.</span></h2>
            </div>
            <div className={styles.partnershipCopy}>
              <p>
                Klien dipilih berdasarkan kecocokan dan peluang dampak.
                Pengembangan dikerjakan in-house, dengan biaya berdasarkan nilai
                yang diberikan.
              </p>
              <div className={styles.commitments}>
                <span><UsersRound size={19} aria-hidden="true" />Tim in-house</span>
                <span><ShieldCheck size={19} aria-hidden="true" />Kendali di tim kamu</span>
              </div>
              <Link href="/how-it-works" className={styles.textLink}>
                Bagaimana kami bekerja <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="ecosystem" className={styles.section} aria-labelledby="ecosystem-title">
          <div className={styles.container}>
            <p className={styles.label}>04 / Ecosystem</p>
            <h2 id="ecosystem-title" className={styles.sectionTitle}>Peran berbeda.<br /><span>Saling terhubung.</span></h2>
            <AboutEcosystem />
            <div className={styles.ecosystemNote}>
              <p>Data afiliasi AfiHub menjadi konteks bagi AfiInsight.</p>
              <Link href="/services/afiinsight" className={styles.textLink}>
                Kenali AfiInsight <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="values" className={`${styles.section} ${styles.tinted}`} aria-labelledby="values-title">
          <div className={`${styles.container} ${styles.valuesGrid}`}>
            <div className={styles.valuesHeading}>
              <p className={styles.label}>05 / Values in practice</p>
              <h2 id="values-title" className={styles.sectionTitle}>Nilai yang terlihat<br /><span>dalam kerja.</span></h2>
              <div className={styles.signature} aria-hidden="true"><Logo /></div>
            </div>
            <ol className={styles.practices}>
              {practices.map((practice, index) => {
                const Icon = practice.icon;
                return <li key={practice.title}>
                  <div className={styles.practiceTop}><span className={styles.itemNumber} aria-hidden="true">0{index + 1}</span><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{practice.title}</h3><p>{practice.body}</p>
                  {index === 0 && <div className={styles.rollout} aria-label="Alur rilis: uji, rilis, pantau"><span>Uji</span><ArrowRight size={12} aria-hidden="true" /><span>Rilis</span><ArrowRight size={12} aria-hidden="true" /><span>Pantau</span></div>}
                </li>;
              })}
            </ol>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="about-cta-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <p className={styles.label}>Your next conversation</p>
            <h2 id="about-cta-title">Mulai dari<br /><span>percakapan.</span></h2>
            <div className={styles.actions}>
              <a href="https://afilabs.id/contact" className={styles.primary}>Jadwalkan obrolan <ArrowUpRight size={16} aria-hidden="true" /></a>
              <a href="mailto:hello@afilabs.id" className={styles.email}>hello@afilabs.id</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
