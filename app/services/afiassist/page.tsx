import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Clock3, MessageCircle, Moon, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { ChatDemo, FeatureExplorer, IntegrationExplorer, ProcessStory, ResultsComparison } from "@/components/services/afiassist/AfiAssistExperience";
import { site } from "@/lib/site";
import styles from "@/components/services/afiassist/afiassist.module.css";

export const dynamic = "force-static";

const title = "AfiAssist — AI Customer Service";
const description = "AI customer service berbahasa Indonesia untuk brand kamu. Layani pelanggan 24/7 di WhatsApp, Instagram, dan website dengan respons natural serta eskalasi ke tim manusia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/afiassist" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/services/afiassist", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};

const contact = "https://afilabs.id/contact";
const problems = [
  { icon: MessageCircle, title: "FAQ yang itu-itu lagi.", body: "Berapa ongkirnya? Kapan pesanan sampai? Pertanyaan berulang menghabiskan waktu yang seharusnya dipakai tim untuk menangani komplain serius.", detail: "Waktu tim habis untuk FAQ", note: "Repetitive work" },
  { icon: Moon, title: "Buyer online. Tim offline.", body: "Pelanggan tetap belanja di luar jam kerja. Saat pertanyaan malam hari tidak terjawab, kesempatan penjualan bisa ikut lewat.", detail: "Pertanyaan tidak ikut jam kantor", note: "Missed conversations" },
  { icon: Clock3, title: "Beda CS, beda jawaban.", body: "Kelelahan dan informasi yang belum diperbarui membuat kualitas respons tidak konsisten. Tim butuh standar dan knowledge base yang sama.", detail: "Kualitas jawaban belum seragam", note: "Inconsistent experience" },
];

export default function AfiAssistPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="assist-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <Link href="/#solutions" className={styles.backLink}>Services <span>/ AfiAssist</span></Link>
              <p className={styles.micro}><span className={styles.liveDot} />AI customer service / 24.7</p>
              <h1 id="assist-title">Customer service<br />yang tidak pernah<br /><span>tidur.</span><span className={styles.titleStar} aria-hidden="true">✳</span></h1>
              <p className={styles.heroLead}>AI agent berbahasa Indonesia yang handle CS brand kamu 24/7. Respons natural, paham konteks, dan tahu kapan tim manusia perlu turun tangan.</p>
              <div className={styles.heroActions}><a href={contact} className={styles.primaryButton}>Deploy AfiAssist <ArrowUpRight size={15} aria-hidden="true" /></a><a href="#assist-demo" className={styles.textButton}>Coba demo <ArrowDown size={14} aria-hidden="true" /></a></div>
              <div className={styles.heroFootnote}><Check size={14} aria-hidden="true" />WhatsApp API resmi<span aria-hidden="true">/</span>Setup 3–5 hari kerja</div>
            </div>
            <div className={styles.heroScene}><ChatDemo /></div>
          </div>
          <div className={`${styles.container} ${styles.heroBottom}`}><span className={styles.micro}>Good conversations. Better business.</span><a href="#assist-problem" aria-label="Lanjut ke tantangan customer service"><ArrowDown size={17} aria-hidden="true" /></a><span className={styles.micro}>Scroll to discover / 01</span></div>
        </section>

        <section id="assist-problem" className={`${styles.section} ${styles.problem}`} aria-labelledby="assist-problem-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.enter}`}><h2 id="assist-problem-title" className="section-label">01 / The problem</h2><p className={styles.sectionTitle}>CS manual itu expensive.<br /><span>Dalam semua dimensi.</span></p></div>
            <ol className={styles.problemGrid}>
              {problems.map((problem, i) => <li key={problem.title} className={styles.enter} style={{ ["--stagger" as string]: `${i * 8}%` }}><div className={styles.problemTop}><span className={styles.micro}>0{i + 1} / {problem.note}</span><problem.icon size={20} strokeWidth={1.4} aria-hidden="true" /></div><h3>{problem.title}</h3><p>{problem.body}</p><div className={styles.problemBottom}><span>{problem.detail}</span><ArrowUpRight size={14} aria-hidden="true" /></div></li>)}
            </ol>
            <div className={`${styles.bridge} ${styles.wipe}`}><span aria-hidden="true">↳</span><p>Biarkan AI menangani yang berulang.<br /><strong>Tim kamu fokus ke yang berarti.</strong></p><Sparkles size={26} strokeWidth={1.2} aria-hidden="true" /></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="assist-process-title">
          <div className={styles.container}>
            <div className={styles.enter}><h2 id="assist-process-title" className="section-label">02 / How AfiAssist works</h2><p className={styles.sectionTitle}>Paham bisnis kamu.<br /><span>Bukan chatbot template.</span></p></div>
            <ProcessStory />
            <Link href="/how-it-works" className={styles.textButton}>Lihat proses kerja lengkap <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.featuresSection}`} aria-labelledby="assist-features-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.enter}`}><div><h2 id="assist-features-title" className="section-label">03 / Built for your team</h2><p className={styles.sectionTitle}>Everything your CS team needs.<br /><span>Automated.</span></p></div><p className={styles.sectionAside}>Dari percakapan pertama sampai tindak lanjut terakhir. Pilih fitur untuk melihat lebih dekat.</p></div>
            <FeatureExplorer />
          </div>
        </section>

        <section className={`${styles.section} ${styles.resultsSection}`} aria-labelledby="assist-results-title">
          <div className={styles.container}>
            <div className={styles.enter}><h2 id="assist-results-title" className="section-label">04 / The results</h2><p className={styles.sectionTitle}>Lebih dari sekadar balasan cepat.<br /><span>Hasil yang bisa kamu ukur.</span></p></div>
            <div className={styles.resultHighlights}>
              {[["80", "%", "Pertanyaan ditangani otomatis"], ["90", "dtk", "Rata-rata waktu respons"], ["4.8", "/5", "Customer satisfaction"]].map(([value, unit, label], i) => <div key={label} className={styles.enter} style={{ ["--stagger" as string]: `${i * 8}%` }}><p>{value}<span>{unit}</span></p><span>{label}</span></div>)}
            </div>
            <ResultsComparison />
          </div>
        </section>

        <section className={`${styles.section} ${styles.integrationSection}`} aria-labelledby="assist-integrations-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.enter}`}><div><h2 id="assist-integrations-title" className="section-label">05 / Integrations</h2><p className={styles.sectionTitle}>Works with<br /><span>your existing stack.</span></p></div><p className={styles.sectionAside}>Tetap gunakan tools yang sudah kamu kenal. Pilih platform untuk menjelajahi integrasinya.</p></div>
            <IntegrationExplorer />
          </div>
        </section>

        <section className={`${styles.section} ${styles.pricingSection}`} aria-labelledby="assist-pricing-title">
          <div className={`${styles.container} ${styles.pricingGrid} ${styles.enter}`}>
            <div><h2 id="assist-pricing-title" className="section-label">06 / Made to fit</h2><p className={styles.sectionTitle}>Volume bisnismu unik.<br /><span>Pricing-nya juga.</span></p></div>
            <div><p>Tidak ada paket one-size-fits-all. Kami sesuaikan dengan jumlah channel, volume percakapan, dan kompleksitas knowledge base kamu.</p><ul className={styles.pricingFactors}><li><span>01</span>Channel yang terhubung</li><li><span>02</span>Volume percakapan</li><li><span>03</span>Kompleksitas knowledge base</li></ul><a href={contact} className={styles.textButton}>Get Custom Quote <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="assist-cta-title">
          <PaperBackground />
          <div className={`${styles.container} ${styles.ctaInner}`}><span className={styles.ctaSymbol} aria-hidden="true">✳</span><p className="section-label">Your next conversation starts here</p><h2 id="assist-cta-title" className={styles.enter}>Pelanggan nggak berhenti.<br /><span>CS kamu juga nggak perlu.</span></h2><p>Siap reduce response time 90%?</p><div className={styles.heroActions}><a href={contact} className={styles.primaryButton}>Deploy AfiAssist <ArrowUpRight size={15} aria-hidden="true" /></a><a href={contact} className={styles.textButton}>Talk to our team <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@graph": [
          { "@type": "Service", "@id": `${site.url}/services/afiassist#service`, name: "AfiAssist", serviceType: "AI Customer Service", description, url: `${site.url}/services/afiassist`, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "Indonesia" } },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: site.url }, { "@type": "ListItem", position: 2, name: "AfiAssist", item: `${site.url}/services/afiassist` }] },
        ],
      }) }} />
    </>
  );
}
