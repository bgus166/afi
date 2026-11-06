export const opportunities = [
  {
    title: "Margin yang lebih terkendali",
    body: "Platform fee, komisi afiliasi, subsidi ongkir, dan iklan internal ikut membentuk biaya jualan di marketplace. Channel D2C memberi brand ruang untuk mengelola struktur biayanya sendiri.",
    caption: "Lihat biaya di balik setiap transaksi.",
  },
  {
    title: "Data pelanggan di tangan brand",
    body: "Hubungan langsung dengan pembeli memberi konteks untuk remarketing, program loyalitas, dan segmentasi pelanggan. Riwayat pembelian menjadi dasar untuk memahami siapa yang kembali dan apa yang mereka butuhkan.",
    caption: "Kenali pelanggan, lalu bangun hubungan berikutnya.",
  },
  {
    title: "Brand yang tumbuh di luar algoritma",
    body: "Website D2C memberi pelanggan tempat untuk kembali karena mereka mengenal brand kamu. Hubungan ini menjadi fondasi bisnis yang tidak hanya bergantung pada perang harga dan rekomendasi marketplace.",
    caption: "Beri pelanggan alasan untuk kembali ke brand kamu.",
  },
] as const;

export const modules = [
  {
    id: "hub",
    name: "AfiHub Integration",
    role: "Affiliate engine",
    description: "Pelacakan afiliasi server-side langsung di website D2C. Hubungkan aktivitas kreator dengan atribusi pesanan di channel milik brand.",
    connection: "Kreator → referral → pesanan di website",
    href: null,
  },
  {
    id: "assist",
    name: "AfiAssist",
    role: "Customer conversations",
    description: "Layanan pelanggan AI 24/7 untuk website D2C dan WhatsApp Business API. Bantu pelanggan mendapat jawaban di tempat mereka berinteraksi dengan brand.",
    connection: "Website & WhatsApp → percakapan pelanggan",
    href: "/services/afiassist",
  },
  {
    id: "creator",
    name: "AfiCreator",
    role: "Content & creator briefs",
    description: "Susun brief marketing untuk banyak afiliator sekaligus. Berikan arahan konten yang konsisten agar kreator memahami produk dan pesan yang ingin disampaikan.",
    connection: "Arahan brand → brief konten → kreator",
    href: "/services/aficreator",
  },
  {
    id: "insight",
    name: "AfiInsight",
    role: "Business intelligence",
    description: "Satukan konteks performa website, marketplace, dan afiliasi. Baca hubungan antar-channel sebagai bahan keputusan bisnis.",
    connection: "Data antar-channel → konteks → keputusan",
    href: "/services/afiinsight",
  },
  {
    id: "flow",
    name: "AfiFlow",
    role: "Connected operations",
    description: "Hubungkan pekerjaan admin seperti sinkronisasi stok, invoice, dan payout afiliasi. Otomatiskan alur berulang agar operasional mengikuti pertumbuhan channel.",
    connection: "Pesanan → stok → invoice → payout",
    href: "/services/afiflow",
  },
] as const;

export type ModuleId = (typeof modules)[number]["id"];

export const roadmap = [
  {
    weeks: "Minggu 1–2",
    title: "AI Readiness Audit",
    body: "Audit operasional dan petakan kebutuhan integrasi D2C. Kita mulai dengan memahami proses yang berjalan serta bagian yang paling perlu dibenahi.",
    focus: "Peta operasional & rancangan integrasi",
    nodes: ["Operasional saat ini", "Kebutuhan brand", "Rencana integrasi"],
  },
  {
    weeks: "Minggu 3–4",
    title: "Ecosystem Setup",
    body: "Pasang pelacakan afiliasi AfiHub dan aktifkan AfiAssist untuk website. Fondasi akuisisi dan percakapan pelanggan mulai dihubungkan.",
    focus: "AfiHub & AfiAssist di website D2C",
    nodes: ["Website D2C", "Tracking afiliasi", "Layanan pelanggan"],
  },
  {
    weeks: "Minggu 5–6",
    title: "Creator Onboarding",
    body: "Siapkan kloter pertama afiliator D2C dan bagikan brief melalui AfiCreator. Kreator mendapat arahan untuk mulai mengenalkan produk dan channel brand.",
    focus: "Brief untuk kloter awal kreator",
    nodes: ["Arahan brand", "Brief AfiCreator", "Afiliator D2C"],
  },
  {
    weeks: "Minggu 7–8",
    title: "Data Aggregation",
    body: "Hubungkan data Shopee, Tokopedia, dan Google Analytics ke AfiInsight. Tim mulai membaca performa channel dalam satu konteks.",
    focus: "Konteks performa antar-channel",
    nodes: ["Marketplace", "Google Analytics", "AfiInsight"],
  },
  {
    weeks: "Minggu 9–10",
    title: "Workflow Automation",
    body: "Bangun tiga alur admin prioritas bersama AfiFlow: rekap harian, follow-up pembayaran, dan payout afiliasi.",
    focus: "Tiga alur admin prioritas",
    nodes: ["Rekap harian", "Follow-up pembayaran", "Payout afiliasi"],
  },
  {
    weeks: "Minggu 11–12",
    title: "Optimize & Scale",
    body: "Evaluasi hasil bulanan dan tinjau komisi afiliator. Gunakan temuan operasional sebagai dasar untuk menentukan langkah pertumbuhan berikutnya.",
    focus: "Evaluasi hasil & prioritas berikutnya",
    nodes: ["Hasil bulanan", "Evaluasi komisi", "Prioritas pertumbuhan"],
  },
] as const;
