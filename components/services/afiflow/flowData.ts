export const workflows = [
  {
    name: "Daily Order Reconciliation", short: "Rekap order", trigger: "Setiap hari / 06.00", saving: "90 menit / hari", category: "Finance operations",
    description: "Gabungkan data penjualan dari Shopee, Tokopedia, dan website D2C ke satu spreadsheet pembukuan finansial terpusat setiap pagi.",
    nodes: [
      { label: "Tarik order", tool: "Shopee · Tokopedia · D2C", detail: "Kumpulkan data penjualan harian dari channel toko yang terhubung." },
      { label: "Normalisasi", tool: "Data processing", detail: "Samakan format data agar transaksi dari berbagai channel dapat dibaca bersama." },
      { label: "Rekonsiliasi", tool: "AI + business rules", detail: "Cocokkan data transaksi dan tandai perbedaan yang perlu diperiksa tim." },
      { label: "Simpan rekap", tool: "Spreadsheet", detail: "Susun hasil rekap ke spreadsheet pembukuan terpusat untuk ditinjau tim." },
    ],
  },
  {
    name: "Buyer Follow-up Sequence", short: "Buyer follow-up", trigger: "Setelah pesanan diterima", saving: "3 jam / hari", category: "Customer experience",
    description: "Kirim WhatsApp personal 3 hari setelah barang sampai untuk meminta ulasan, lalu tawarkan opsi reorder pada hari ke-30.",
    nodes: [
      { label: "Order diterima", tool: "Order status", detail: "Status pesanan diterima menjadi pemicu dimulainya urutan follow-up." },
      { label: "Tunggu 3 hari", tool: "Scheduled delay", detail: "Berikan waktu kepada pelanggan untuk mencoba produk sebelum menerima follow-up." },
      { label: "Minta ulasan", tool: "WhatsApp", detail: "Kirim pesan personal untuk menanyakan pengalaman pelanggan dan meminta ulasan." },
      { label: "Reorder hari 30", tool: "WhatsApp", detail: "Jadwalkan penawaran reorder di hari ke-30 sesuai alur yang disepakati brand." },
    ],
  },
  {
    name: "Weekly Report Generation", short: "Laporan mingguan", trigger: "Terjadwal / setiap minggu", saving: "3–4 jam / minggu", category: "Business visibility",
    description: "Tarik GMV, CS response rate, dan komisi afiliasi. AI menyusun ringkasan, lalu mengirim laporan PDF ke email founder.",
    nodes: [
      { label: "Ambil metrik", tool: "Connected platforms", detail: "Kumpulkan GMV, response rate CS, dan affiliate commissions dari sumber data yang terhubung." },
      { label: "Susun analisis", tool: "AI summary", detail: "Rangkum metrik menjadi narasi yang membantu founder memahami perkembangan bisnis." },
      { label: "Buat PDF", tool: "Report template", detail: "Susun ringkasan dan metrik ke dalam format laporan yang konsisten." },
      { label: "Kirim laporan", tool: "Email", detail: "Kirim laporan mingguan ke email founder sesuai jadwal yang ditentukan." },
    ],
  },
  {
    name: "Affiliate Payout Statement", short: "Slip komisi", trigger: "Setiap periode komisi", saving: "5–8 jam / bulan", category: "Affiliate operations",
    description: "Hitung bagi hasil dari database, siapkan potongan PPh 21 sesuai aturan yang dikonfigurasi, dan kirim slip PDF personal ke setiap kreator.",
    nodes: [
      { label: "Data afiliasi", tool: "Affiliate database", detail: "Baca data penjualan dan komisi dari database afiliasi brand." },
      { label: "Hitung komisi", tool: "Configured rules", detail: "Terapkan perhitungan komisi dan potongan sesuai konfigurasi yang disepakati." },
      { label: "Buat slip PDF", tool: "Personal statement", detail: "Rangkum perhitungan untuk setiap afiliator ke slip PDF personal." },
      { label: "Distribusi slip", tool: "Creator delivery", detail: "Kirim slip kepada masing-masing kreator dan simpan jejak prosesnya." },
    ],
  },
] as const;

export const manualTasks = [
  "Export data order dari Shopee setiap hari",
  "Copy-paste transaksi ke spreadsheet rekap",
  "WhatsApp reminder ke buyer yang belum bayar",
  "Susun laporan penjualan mingguan untuk founder",
  "Update stok produk di semua platform",
  "Kirim invoice komisi ke ratusan afiliator",
  "Follow up review 7 hari setelah pesanan diterima",
  "Compile data multi-channel untuk rapat bulanan",
];
