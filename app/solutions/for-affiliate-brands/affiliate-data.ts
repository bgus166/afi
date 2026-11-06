export const scaleStages = [
  { count: "10", title: "Masih bisa dikelola", body: "Koordinasi melalui grup WhatsApp dan rekap manual masih dapat ditangani tim. Fondasi pencatatan mulai penting agar informasi kreator tidak tercecer.", focus: "Mulai rapikan pencatatan.", items: ["Koordinasi WhatsApp", "Rekap pesanan manual", "Perhitungan komisi"] },
  { count: "50", title: "Rekap mulai kompleks", body: "Spreadsheet komisi bertambah besar. Tim menghabiskan lebih banyak waktu untuk memasukkan data dan memeriksa ulang perhitungan.", focus: "Hubungkan referral dengan komisi.", items: ["Data kreator bertambah", "Komisi perlu diperiksa", "Rekap berulang"] },
  { count: "100", title: "Tim mulai kewalahan", body: "Distribusi link dan perhitungan komisi makin sulit diikuti. Keterlambatan rekap membuat afiliator menunggu kejelasan payout.", focus: "Beri visibilitas pada setiap alur.", items: ["Distribusi link", "Atribusi pesanan", "Status payout"] },
  { count: "200+", title: "Risiko ikut membesar", body: "Kesalahan transfer, atribusi yang perlu ditinjau, dan hubungan dengan afiliator terbaik menjadi perhatian. Sistem perlu membantu tim menelusuri setiap transaksi.", focus: "Tinjau atribusi sebelum payout.", items: ["Pemeriksaan referral", "Validasi komisi", "Payout tercatat"] },
] as const;

export const infrastructure = [
  { id: "hub", title: "AfiHub Integration", body: "Pelacakan server-side di website D2C menghubungkan klik, konversi, komisi, dan status payout per kreator.", caption: "Satu jejak referral sampai ke komisi.", href: null, action: null },
  { id: "creator", title: "AfiCreator", body: "Siapkan brief otomatis dengan sudut pandang sesuai niche kreator. Arahan brand tetap konsisten saat jaringan afiliator berkembang.", caption: "Arahan yang sama, sudut pandang yang relevan.", href: "/services/aficreator", action: "Kenali AfiCreator" },
  { id: "fraud", title: "Fraud Protection", body: "Tinjau indikasi self-referral, cookie stuffing, dan click inflation untuk membantu memeriksa atribusi sebelum komisi dibayarkan.", caption: "Periksa sinyalnya sebelum mengambil tindakan.", href: null, action: null },
  { id: "payout", title: "Automated Payout", body: "Hubungkan penghitungan komisi, pemotongan PPh 21, dan batch payout melalui Xendit ke rekening atau e-wallet afiliator.", caption: "Perhitungan dan pencairan dalam satu alur.", href: "#affiliate-payout", action: "Coba simulasi payout" },
  { id: "tiers", title: "Tier System", body: "Susun tingkatan Bronze, Silver, dan Gold berdasarkan performa. Rancang komisi yang lebih tinggi untuk mendukung loyalitas afiliator terbaik.", caption: "Performa menjadi dasar pengembangan program.", href: null, action: null },
  { id: "insight", title: "AfiInsight for Affiliates", body: "Baca performa kreator untuk menemukan potensi, menentukan dukungan, dan meninjau afiliator yang perlu penyesuaian strategi.", caption: "Kenali siapa yang perlu didukung berikutnya.", href: "/services/afiinsight", action: "Kenali AfiInsight" },
] as const;

export type InfrastructureId = (typeof infrastructure)[number]["id"];
