import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TaskAudit, TimeSavingsCalculator, WorkflowDemo } from "@/components/services/afiflow/FlowExperience";
import { FeatureExplorer, ScrollStory, type ServiceFeature } from "@/components/services/shared/ServiceInteractions";
import { SectionHeading, ServiceCTA, ServiceHero, ServiceSchema } from "@/components/services/shared/ServicePage";
import { site } from "@/lib/site";
import styles from "@/components/services/shared/ServicePage.module.css";

export const dynamic = "force-static";
const title = "AfiFlow — AI Workflow Automation";
const description = "Otomatisin pekerjaan repetitif operasional brand dengan AfiFlow. Rekap order, follow-up buyer, laporan mingguan, dan slip komisi terhubung dalam workflow yang terpantau.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/services/afiflow" },
  openGraph: { title: `${title} | Afilabs`, description, url: "/services/afiflow", type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: `${title} | Afilabs`, description },
};
const steps = [
  { title: "Workflow Mapping", tag: "Map what matters", body: "Kami petakan proses operasional bersama tim kamu: mana yang paling memakan waktu, mana yang rawan kesalahan, dan mana yang tetap memerlukan keputusan manusia.", labels: ["Proses & tools yang dipakai", "Pekerjaan berulang & bottleneck", "Titik keputusan manusia"], output: "Prioritas otomasi yang jelas" },
  { title: "Build & Connect", tag: "Connect the moving parts", body: "Bangun alur dengan AI Agents, n8n/Make, dan API native platform kamu. Tidak ada kode baru yang harus tim kamu kelola sendiri. Setup awal 1–2 minggu.", labels: ["AI Agents + n8n / Make", "Integrasi API platform", "Testing & business rules"], output: "Workflow saling terhubung" },
  { title: "Monitor & Handover", tag: "Stay in control", body: "Pantau workflow lewat dashboard control, termasuk status berjalan atau error. Tim operasional mendapat training, dokumentasi, dan panduan untuk melakukan modifikasi ringan.", labels: ["Execution log & error alert", "SOP tertulis & video panduan", "Training tim operasional"], output: "Otomasi berjalan. Tim tetap pegang kendali." },
];
const features: ServiceFeature[] = [
  { title: "Visual Workflow Builder", body: "Petakan dan pantau alur otomasi operasional dari satu kanvas visual yang mudah dipahami tim.", tag: "See how work moves", icon: "workflow", sample: "Trigger → Process → Action → Result" },
  { title: "Native Integrations", body: "Hubungkan tools yang sudah digunakan, termasuk Shopify, Shopee, Xendit, dan WhatsApp, melalui integrasi platform.", tag: "Your tools, connected", icon: "layers", sample: "Shopify / Shopee / Xendit / WhatsApp" },
  { title: "Error Detection", body: "Dapatkan notifikasi melalui Slack atau WhatsApp saat alur gagal atau API terputus, supaya tim bisa merespons lebih cepat.", tag: "Know when something needs you", icon: "shield", sample: "Error terdeteksi → Tim diberi tahu → Tindak lanjut" },
  { title: "Audit Trail", body: "Simpan riwayat eksekusi data untuk verifikasi proses, penelusuran masalah, dan perbaikan eror.", tag: "Every step leaves a trace", icon: "database", sample: "Execution history. Context. Accountability." },
  { title: "Team Handover", body: "Tim menerima SOP tertulis dan rekaman video panduan agar bisa memahami serta mengelola alur kerjanya sendiri.", tag: "Built for your team", icon: "sparkles", sample: "Workflow + SOP + Training = Tim lebih mandiri" },
  { title: "Scalable", body: "Tambahkan workflow baru mengikuti pertumbuhan kebutuhan operasional, inventori, dan gudang bisnis kamu.", tag: "Room for what comes next", icon: "trend", sample: "Mulai dari satu alur. Berkembang bersama bisnis." },
];

export default function AfiFlowPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <ServiceHero name="AfiFlow" category="AI workflow automation" title={<>10 jam kerja manual<br />per minggu.<br /><span>Otomatis.</span></>} lead="AfiFlow mengganti pekerjaan repetitif dengan workflow otomatis. Dari rekap order sampai laporan mingguan ke founder, operasional tetap bergerak di belakang layar." action="Automate Your Workflow" demo="flow-workflows"><WorkflowDemo compact /></ServiceHero>
      <section className={styles.section} aria-labelledby="flow-problem-title"><div className={styles.container}><SectionHeading id="flow-problem-title" label="01 / The problem" title={<>Tim kamu terlalu baik<br /><span>untuk habiskan waktu di sini.</span></>} aside="Centang pekerjaan yang masih dilakukan manual. Kenali hambatan operasional sebelum menambah beban ke tim." /><TaskAudit /></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="flow-process-title"><div className={styles.container}><SectionHeading id="flow-process-title" label="02 / How AfiFlow works" title={<>Map, automate,<br /><span>dan biarkan berjalan.</span></>} /><ScrollStory id="flow-process" kind="flow" steps={steps} /><Link href="/how-it-works" className={styles.textLink}>Lihat proses implementasi <ArrowUpRight size={14} aria-hidden="true" /></Link></div></section>
      <section id="flow-workflows" className={styles.section} aria-labelledby="flow-workflows-title"><div className={styles.container}><SectionHeading id="flow-workflows-title" label="03 / What we automate" title={<>Dari trigger pertama<br /><span>sampai tugas selesai.</span></>} aside="Pilih contoh alur, jalankan simulasinya, dan buka detail tiap node. Coba juga skenario error untuk melihat bagaimana alur bisa dipantau dan diulang." /><WorkflowDemo /></div></section>
      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="flow-features-title"><div className={styles.container}><SectionHeading id="flow-features-title" label="04 / Built for operations" title={<>Otomatis bukan berarti<br /><span>kehilangan kendali.</span></>} aside="Dari integrasi sampai audit trail, setiap workflow dirancang agar tetap bisa dipahami, dipantau, dan dikelola tim kamu." /><FeatureExplorer id="flow-feature" features={features} /></div></section>
      <section id="flow-calculator" className={`${styles.section} ${styles.blue}`} aria-labelledby="flow-calculator-title"><div className={styles.container}><SectionHeading id="flow-calculator-title" label="05 / Time worth taking back" title={<>Berapa jam<br /><span>yang bisa kamu hemat?</span></>} aside="Ubah durasi dan frekuensi satu tugas rutin untuk melihat berapa banyak waktu manual yang bisa dievaluasi untuk otomasi." /><TimeSavingsCalculator /></div></section>
      <ServiceCTA id="flow-cta-title" label="Less busywork. More room to grow." title={<>Kembalikan waktu timmu.<br /><span>Mulai dari satu workflow.</span></>} body="Ceritakan pekerjaan yang paling sering diulang. Kita petakan alurnya, pilih prioritasnya, lalu bangun otomasi yang sesuai cara kerja tim kamu." action="Discuss Your Workflow" />
    </main>
    <Footer /><ServiceSchema name="AfiFlow" slug="afiflow" description={description} type="AI Workflow Automation" />
  </>;
}
