import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { CaseStudiesExplorer } from "./CaseStudiesExplorer";
import styles from "./page.module.css";

const description = "Jelajahi studi kasus Afilabs: dari otomasi layanan pelanggan hingga pertumbuhan afiliasi dan efisiensi operasional.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "Case Studies | Afilabs", description, url: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.container}>
            <p className="section-label">The work / Transformation stories</p>
            <h1 id="case-title">Sebelum dan sesudah.<br /><span>Cerita di antaranya.</span></h1>
            <p className={styles.lead}>Ikuti perubahan cara kerja, dari pekerjaan manual menuju sistem yang membantu tim.</p>
          </div>
        </section>
        <CaseStudiesExplorer />
        <section className={styles.cta} aria-labelledby="next-story-title">
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <div>
              <h2 id="next-story-title">Mulai cerita perubahan kamu.</h2>
              <p>Bahas proses yang ingin kamu benahi bersama tim.</p>
            </div>
            <a href="https://afilabs.id/contact" className={styles.ctaButton}>
              Diskusikan project <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
