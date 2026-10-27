export type WorkspaceView = "overview" | "assist" | "creator" | "insight" | "flow";
export type WorkspacePeriod = 7 | 30;
type WorkspaceData = {
  name: string; title: string;
  metrics: { label: string; values: [string, string]; note: string }[];
  chart: string; unit: string; ticks: [string, string, string];
  distribution: string; legend: string[]; sourceLabel: string;
  table: string; rows: [string, string, string][];
};

/** Illustrative workspace, with no connection to a visitor's business data. */
export const workspaceViews: Record<WorkspaceView, WorkspaceData> = {
  overview: {
    name: "Overview", title: "Business overview",
    metrics: [{ label: "Total GMV", values: ["Rp 251 jt", "Rp 871 jt"], note: "Akumulasi periode terpilih" }, { label: "Order masuk", values: ["880", "3.055"], note: "Semua channel" }, { label: "Kreator aktif", values: ["24", "42"], note: "Contoh workspace" }],
    chart: "Revenue overview", unit: "Rp juta", ticks: ["40", "20", "0"], distribution: "Sales by channel", legend: ["Afiliasi", "Marketplace", "Website"], sourceLabel: "channel",
    table: "Aktivitas terbaru", rows: [["Pertanyaan produk", "AfiAssist", "Terjawab"], ["Brief kreator", "AfiCreator", "Siap review"]],
  },
  assist: {
    name: "AfiAssist", title: "Customer conversations",
    metrics: [{ label: "Percakapan", values: ["1.248", "4.360"], note: "Semua inbox" }, { label: "Terjawab", values: ["1.086", "3.810"], note: "Contoh percakapan" }, { label: "Perlu tim", values: ["162", "550"], note: "Tinjauan manusia" }],
    chart: "Conversation volume", unit: "Percakapan", ticks: ["200", "100", "0"], distribution: "Conversation sources", legend: ["WhatsApp", "Website", "Lainnya"], sourceLabel: "sumber",
    table: "Percakapan terbaru", rows: [["Pertanyaan produk", "AfiAssist", "Terjawab"], ["Status pengiriman", "AfiAssist", "Perlu tim"]],
  },
  creator: {
    name: "AfiCreator", title: "Content studio",
    metrics: [{ label: "Draft konten", values: ["128", "436"], note: "Materi contoh" }, { label: "Brief siap", values: ["36", "120"], note: "Menunggu review tim" }, { label: "Kreator", values: ["24", "42"], note: "Contoh workspace" }],
    chart: "Content output", unit: "Draft", ticks: ["30", "15", "0"], distribution: "Content formats", legend: ["Hooks", "Captions", "Briefs"], sourceLabel: "format",
    table: "Draft terbaru", rows: [["Hook produk A", "AfiCreator", "Siap review"], ["Brief kreator B", "AfiCreator", "Draft"]],
  },
  insight: {
    name: "AfiInsight", title: "Business intelligence",
    metrics: [{ label: "Total GMV", values: ["Rp 251 jt", "Rp 871 jt"], note: "Akumulasi periode terpilih" }, { label: "Order masuk", values: ["880", "3.055"], note: "Semua channel" }, { label: "Insight contoh", values: ["3", "12"], note: "Untuk diskusi tim" }],
    chart: "Revenue overview", unit: "Rp juta", ticks: ["40", "20", "0"], distribution: "Revenue sources", legend: ["Afiliasi", "Marketplace", "Website"], sourceLabel: "channel",
    table: "Intelligence signals", rows: [["Performa afiliasi", "AfiInsight", "Tinjau"], ["Pola pembelian ulang", "AfiInsight", "Tinjau"]],
  },
  flow: {
    name: "AfiFlow", title: "Workflow automation",
    metrics: [{ label: "Eksekusi", values: ["312", "1.080"], note: "Alur contoh" }, { label: "Selesai", values: ["304", "1.052"], note: "Eksekusi contoh" }, { label: "Perlu tinjau", values: ["8", "28"], note: "Tindak lanjut tim" }],
    chart: "Workflow executions", unit: "Eksekusi", ticks: ["60", "30", "0"], distribution: "Trigger sources", legend: ["Webhook", "Terjadwal", "Manual"], sourceLabel: "trigger",
    table: "Eksekusi terbaru", rows: [["Rekap order", "AfiFlow", "Selesai"], ["Follow-up payment", "AfiFlow", "Menunggu"]],
  },
};

export const heroServices = [
  { key: "assist", name: "AfiAssist", category: "Conversation", description: "Percakapan pelanggan lebih terarah.", href: "/services/afiassist" },
  { key: "creator", name: "AfiCreator", category: "Content", description: "Satu produk, lebih banyak cerita.", href: "/services/aficreator" },
  { key: "insight", name: "AfiInsight", category: "Intelligence", description: "Data menjadi konteks keputusan.", href: "/services/afiinsight" },
  { key: "flow", name: "AfiFlow", category: "Automation", description: "Pekerjaan berulang saling terhubung.", href: "/services/afiflow" },
] as const;
