"use client";

import { useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ChartNoAxesCombined, Clock3, FilePenLine,
  Files, FileText, Link2, MessageCircle, MessagesSquare, ReceiptText,
  Send, Sheet, UsersRound, Workflow, X, type LucideIcon,
} from "lucide-react";
import styles from "./page.module.css";

type WorkflowStep = { icon: LucideIcon; label: string };
type CaseStudy = {
  id: string;
  shortTitle: string;
  title: string;
  category: string;
  industry: string;
  size: string;
  timeline: string;
  services: string;
  storyHeading: string;
  challenge: string;
  solution: { title: string; description: string }[];
  before: string;
  after: string;
  comparisonLabel: string;
  beforeSteps: WorkflowStep[];
  afterSteps: WorkflowStep[];
  metrics: [string, string, string][];
  highlight: string;
  highlightLabel: string;
  note: string;
};

const cases: CaseStudy[] = [
  {
    id: "01",
    shortTitle: "Skincare D2C",
    title: "Skincare Brand D2C",
    category: "D2C Affiliate Scale",
    industry: "Skincare & Beauty",
    size: "Rp 2–5M GMV / bulan",
    timeline: "60 hari",
    services: "AfiHub + AfiInsight",
    storyHeading: "Jaringannya tumbuh. Rekapnya tertinggal.",
    challenge: "Program afiliasi tumbuh dari 10 menjadi lebih dari 200 orang, sementara tiga anggota tim masih mengurus distribusi link, komisi, dan payout secara manual. Kesalahan data dan lambatnya administrasi mulai mengancam retensi afiliator.",
    solution: [
      { title: "Petakan alurnya", description: "Memetakan tujuh alur kerja yang menjadi bottleneck operasional." },
      { title: "Hubungkan datanya", description: "Menghubungkan tracking server-side dan dashboard link mandiri untuk afiliator." },
      { title: "Beri konteks performa", description: "Mengotomatisasi rekap komisi dan notifikasi payout, lalu menambahkan dashboard performa serta alert fraud." },
    ],
    before: "13 jam",
    after: "1,5 jam",
    comparisonLabel: "untuk administrasi program afiliasi per minggu",
    beforeSteps: [{ icon: Sheet, label: "Spreadsheet" }, { icon: MessageCircle, label: "WhatsApp" }],
    afterSteps: [{ icon: Link2, label: "Tracking" }, { icon: ReceiptText, label: "Komisi" }],
    metrics: [["GMV afiliasi", "Baseline", "+34%"], ["Admin / minggu", "13 jam", "1,5 jam"], ["Kesalahan afiliator", "2–3 / bulan", "0"], ["Top afiliator keluar", "2 orang", "0"], ["Akurasi payout", "~95%", "99,9%"]],
    highlight: "+34%",
    highlightLabel: "GMV afiliasi",
    note: "Program afiliasi bisa berkembang tanpa menambah kerumitan administrasi.",
  },
  {
    id: "02",
    shortTitle: "Suplemen",
    title: "Suplemen Brand",
    category: "CS Automation",
    industry: "Health & Supplement",
    size: "500+ order / hari",
    timeline: "3 minggu",
    services: "AfiAssist",
    storyHeading: "Volume pertanyaan naik. Percakapan menunggu.",
    challenge: "Pesanan tumbuh tiga kali lipat dalam 18 bulan, sementara sebagian besar pertanyaan merupakan FAQ berulang. Waktu respons mencapai 4 jam 12 menit dan banyak chat malam tidak terjawab.",
    solution: [
      { title: "Susun konteks produk", description: "Menyusun knowledge base dari 200+ FAQ dan skenario keluhan bersama tim CS." },
      { title: "Uji percakapannya", description: "Menguji AfiAssist dengan lebih dari 1.000 simulasi kasus." },
      { title: "Rilis bertahap", description: "Mengalihkan trafik secara bertahap dari 20% hingga 100%, dengan eskalasi untuk kasus serius." },
    ],
    before: "4 jam 12 menit",
    after: "87 detik",
    comparisonLabel: "rata-rata waktu respons pelanggan",
    beforeSteps: [{ icon: MessageCircle, label: "Antrean chat" }, { icon: Clock3, label: "Menunggu" }],
    afterSteps: [{ icon: MessagesSquare, label: "AfiAssist" }, { icon: UsersRound, label: "Tim CS" }],
    metrics: [["Waktu respons rata-rata", "4 jam 12 menit", "87 detik"], ["Ditangani AI", "0%", "79%"], ["Kapasitas tim CS", "Terpakai 100%", "Fokus kasus kompleks"], ["Kepuasan pelanggan", "3,9 / 5", "4,8 / 5"], ["Estimasi sales kembali", "Tidak tersedia", "+6% dari loss"]],
    highlight: "79%",
    highlightLabel: "percakapan ditangani AI",
    note: "Tim CS mendapat ruang untuk menangani percakapan yang lebih kompleks.",
  },
  {
    id: "03",
    shortTitle: "F&B",
    title: "F&B Brand",
    category: "Operational Efficiency",
    industry: "Food & Beverage (kemasan, D2C)",
    size: "Rp 800M–1.2M GMV / bulan",
    timeline: "5 minggu",
    services: "AfiFlow + AfiInsight",
    storyHeading: "Rutinitas mengambil waktu untuk keputusan.",
    challenge: "Dengan ratusan pesanan setiap hari, tim menghabiskan banyak waktu merekonsiliasi data, menindaklanjuti invoice dan pembeli, serta menyiapkan laporan mingguan untuk founder.",
    solution: [
      { title: "Satukan data pesanan", description: "Rekonsiliasi data marketplace dan website secara otomatis setiap pagi." },
      { title: "Hubungkan tindak lanjut", description: "Follow-up WhatsApp setelah pengiriman dan laporan mingguan dengan narasi AI." },
      { title: "Rapikan rekonsiliasi", description: "Rekonsiliasi komisi, perhitungan PPh 21, dan persiapan antrean payout afiliator." },
    ],
    before: "0 jam",
    after: "117 jam",
    comparisonLabel: "pekerjaan terotomatisasi per bulan",
    beforeSteps: [{ icon: Files, label: "Rekap manual" }, { icon: Sheet, label: "Laporan" }],
    afterSteps: [{ icon: Workflow, label: "AfiFlow" }, { icon: ChartNoAxesCombined, label: "AfiInsight" }],
    metrics: [["Waktu terotomatisasi", "0 jam", "117 jam / bulan"], ["Efisiensi biaya", "4 staf admin", "Hemat 1 staf full-time"], ["Error operasional", "8%", "0,3%"], ["Laporan founder", "Manual", "Insight dari AI"]],
    highlight: "0,3%",
    highlightLabel: "error operasional",
    note: "Empat workflow membantu tim mengurangi pekerjaan rutin yang berulang.",
  },
  {
    id: "04",
    shortTitle: "Cosmetics",
    title: "Cosmetics Brand",
    category: "Automated Content Scaling",
    industry: "Cosmetics & Fashion",
    size: "1.000+ order / hari",
    timeline: "4 minggu",
    services: "AfiCreator",
    storyHeading: "Sampelnya sampai. Idenya belum siap.",
    challenge: "Menyiapkan brief personal untuk 300+ kreator memakan waktu 40 menit per orang. Hanya 15% kreator mengunggah review karena kesulitan menemukan ide konten.",
    solution: [
      { title: "Kenali persona kreator", description: "Mengelompokkan kreator ke dalam empat persona konten." },
      { title: "Susun arahan konten", description: "Melatih AfiCreator untuk menyusun hook dan poin produk sesuai gaya kreator." },
      { title: "Kirim di waktu yang tepat", description: "Menghubungkan WhatsApp dan data pengiriman agar brief terkirim otomatis saat paket diterima." },
    ],
    before: "15%",
    after: "82%",
    comparisonLabel: "posting rate dari sampel yang dikirim",
    beforeSteps: [{ icon: FilePenLine, label: "Brief manual" }, { icon: Clock3, label: "40 menit" }],
    afterSteps: [{ icon: FileText, label: "AfiCreator" }, { icon: Send, label: "Distribusi" }],
    metrics: [["Posting rate sampel", "15%", "82%"], ["Video dihasilkan", "45 video", "340+ / bulan"], ["Waktu menulis brief", "40 menit", "3 detik"], ["Pertumbuhan GMV afiliasi", "Baseline", "+142%"]],
    highlight: "340+",
    highlightLabel: "video per bulan",
    note: "Brief otomatis membantu kreator beralih dari menerima sampel ke membuat konten.",
  },
];

function WorkflowVisual({ steps, connected = false }: { steps: WorkflowStep[]; connected?: boolean }) {
  return (
    <div className={styles.workflow}>
      {steps.map(({ icon: Icon, label }, index) => (
        <div className={styles.workflowPart} key={label}>
          {connected && index > 0 && <ArrowRight className={styles.flowArrow} size={20} aria-hidden="true" />}
          <div className={styles.workflowNode}>
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudiesExplorer() {
  const [selectedId, setSelectedId] = useState(cases[0].id);
  const resultsDialog = useRef<HTMLDialogElement>(null);
  const selected = cases.find((item) => item.id === selectedId) ?? cases[0];

  return (
    <section id="cases" className={styles.stories} aria-label="Cerita perubahan bisnis">
      <div className={styles.container}>
        <div className={styles.chapters} role="group" aria-label="Pilih studi kasus">
          {cases.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={selectedId === item.id}
              aria-controls="selected-case"
              onClick={() => setSelectedId(item.id)}
            >
              <span>{item.id}</span>{item.shortTitle}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">Menampilkan studi kasus {selected.title}.</p>

        <article id="selected-case" className={styles.caseStory} aria-labelledby="selected-case-title" data-case-id={selected.id}>
          <header className={styles.caseIntro}>
            <div>
              <p className="section-label">{selected.id} / {selected.services}</p>
              <h2 id="selected-case-title">{selected.title}</h2>
            </div>
            <p className={styles.caseMeta}><span>{selected.timeline}</span><span aria-hidden="true">/</span><span>{selected.industry}</span></p>
          </header>

          <div className={styles.transformation}>
            <section className={styles.comparison} aria-labelledby="before-title">
              <h3 id="before-title" className={styles.comparisonLabel}>Sebelum / Cara kerja awal</h3>
              <WorkflowVisual steps={selected.beforeSteps} />
              <p className={styles.comparisonValue}>{selected.before}</p>
              <p className={styles.comparisonDescription}>{selected.comparisonLabel}</p>
            </section>
            <ArrowRight size={24} className={styles.transformationArrow} aria-hidden="true" />
            <section className={`${styles.comparison} ${styles.comparisonAfter}`} aria-labelledby="after-title">
              <h3 id="after-title" className={styles.comparisonLabel}>Sesudah / Sistem terhubung</h3>
              <WorkflowVisual steps={selected.afterSteps} connected />
              <p className={styles.comparisonValue}>{selected.after}</p>
              <p className={styles.comparisonDescription}>{selected.comparisonLabel}</p>
            </section>
          </div>

          <div className={styles.storyBody}>
            <section className={styles.challenge} aria-labelledby="challenge-title">
              <p className="section-label">01 / Tantangan</p>
              <h3 id="challenge-title">{selected.storyHeading}</h3>
              <p>{selected.challenge}</p>
            </section>
            <section className={styles.solution} aria-labelledby="solution-title">
              <h3 id="solution-title" className="section-label">02 / Perubahan yang dibangun</h3>
              <ol>
                {selected.solution.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                    <div><h4>{step.title}</h4><p>{step.description}</p></div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <div className={styles.outcome}>
            <dl>
              <div><dt>{selected.highlightLabel}</dt><dd>{selected.highlight}</dd></div>
              <div><dt>periode implementasi</dt><dd>{selected.timeline}</dd></div>
            </dl>
            <button type="button" className={styles.resultsButton} aria-haspopup="dialog" aria-controls="case-results" onClick={() => resultsDialog.current?.showModal()}>
              Lihat detail hasil <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>

      <dialog ref={resultsDialog} id="case-results" className={styles.resultsDialog} aria-labelledby="results-title" aria-describedby="results-summary">
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.dialogLabel}>{selected.category} / {selected.id}</p>
            <h2 id="results-title">{selected.title}</h2>
          </div>
          <button type="button" className={styles.closeButton} aria-label="Tutup detail hasil" onClick={() => resultsDialog.current?.close()}><X size={22} aria-hidden="true" /></button>
        </div>
        <p id="results-summary" className={styles.dialogSummary}>{selected.note}</p>
        <dl className={styles.caseFacts}>
          <div><dt>Layanan</dt><dd>{selected.services}</dd></div>
          <div><dt>Industri</dt><dd>{selected.industry}</dd></div>
          <div><dt>Skala bisnis</dt><dd>{selected.size}</dd></div>
          <div><dt>Periode</dt><dd>{selected.timeline}</dd></div>
        </dl>
        <table className={styles.resultsTable}>
          <caption>Hasil sebelum dan sesudah</caption>
          <thead><tr><th scope="col">Metrik</th><th scope="col">Sebelum</th><th scope="col">Sesudah</th></tr></thead>
          <tbody>
            {selected.metrics.map(([label, before, after]) => (
              <tr key={label}><th scope="row">{label}</th><td>{before}</td><td>{after}</td></tr>
            ))}
          </tbody>
        </table>
      </dialog>
    </section>
  );
}
