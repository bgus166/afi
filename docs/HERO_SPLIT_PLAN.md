# Rencana hero: satu dashboard → empat layanan

Status: diterapkan pada hero beranda. Dashboard memakai menu dan filter interaktif; data tetap ilustrasi.

## Arah visual

Komponen yang diganti adalah `HeroScene` pada beranda, di bawah headline
“Scale your brand with AI that actually works.” Hero halaman layanan tidak
termasuk dalam perubahan ini.

Referensi: https://scroll-split-cards.framer.ai/

Pola referensi yang dipertahankan: panel lebar, potongan vertikal membuka,
lalu permukaan berputar dan memperlihatkan kartu berbeda. Kita adaptasi
menjadi empat bagian, masing-masing mewakili satu layanan Afilabs.

Dashboard awal memakai label “Afilabs workspace” dan “Data ilustrasi”. Isinya adalah
ilustrasi gabungan, bukan klaim adanya aplikasi terpadu yang sudah live.
Paper terang, biru navy, tipografi Onest/Syne/IBM Plex Mono dipertahankan.

## Urutan scroll desktop

| Progres | Kejadian | Yang terbaca pengguna |
| --- | --- | --- |
| 0–20% | Headline dan CTA masih utuh. Dashboard masuk dari bawah. | Nilai utama Afilabs. |
| 20–40% | Headline naik dan memudar. Dashboard menjadi fokus di tengah. | Satu gambaran ekosistem. |
| 40–65% | Bingkai dashboard memudar. Empat potongan vertikal membuka jarak. | Gambaran tadi tersusun dari beberapa bagian. |
| 65–85% | Potongan berputar pada sumbu Y secara bertahap. Tampilan dashboard berganti dengan mini UI setiap layanan. | Setiap bagian punya fungsi berbeda. |
| 85–100% | Empat kartu berhenti dalam susunan lebar dengan rotasi ringan. Nama dan tautan layanan terlihat. | Pilih layanan yang sesuai. |

Progres dikendalikan posisi scroll dan dapat berjalan mundur. Tidak ada
animasi pembuka yang memaksa pengguna menunggu. Awal perkiraan track desktop
280svh: satu viewport sticky dengan sekitar 180svh perjalanan scroll.
Angka ini disesuaikan setelah pengujian ukuran layar, bukan durasi wajib.

Judul akhir: **Empat layanan. Satu arah pertumbuhan.**

## Empat kartu akhir

| Layanan | Mini UI | Pesan ringkas | Tujuan tautan |
| --- | --- | --- | --- |
| AfiAssist | Bubble pertanyaan dan jawaban CS | Percakapan pelanggan lebih terarah. | `/services/afiassist` |
| AfiCreator | Draft hook dan brief kreator | Satu produk, lebih banyak cerita. | `/services/aficreator` |
| AfiInsight | Grafik dan ringkasan tindakan | Data menjadi konteks keputusan. | `/services/afiinsight` |
| AfiFlow | Trigger, proses, dan hasil | Pekerjaan berulang saling terhubung. | `/services/afiflow` |

Isi mini UI berupa contoh, dengan label ilustrasi. Kartu memiliki area klik
dan fokus keyboard yang jelas setelah terbuka. Hover cukup mengangkat kartu
dan menggeser panah; gerakan utama tetap berasal dari scroll.

## Responsif dan aksesibilitas

- Desktop: empat kolom. Dashboard dibelah menjadi empat potongan yang sama
  sebelum isi layanan muncul. Ruang bawah disediakan untuk dock Tanya AFI.
- Tablet minimal 720 px dengan tinggi minimal 900 px: hasil akhir 2 × 2.
  Mobile memakai alur normal dengan reveal ringan; kartu 2 kolom, lalu
  1 kolom di bawah 360 px.
- Layar pendek atau sangat sempit: dashboard kemudian daftar kartu mengikuti
  scroll biasa; hindari pin panjang dan empat kartu yang harus muat sekaligus.
- Reduced motion: dashboard dan kartu tampil statis dalam alur normal.
- H1 dan CTA tetap tersedia pada render awal. Potongan dekoratif tidak
  diulang sebagai empat dashboard di accessibility tree. Tautan yang belum
  terlihat tidak menerima fokus. Semua tautan tetap tersedia tanpa hover.

## Implementasi

1. Buat scene baru yang terpisah dari komponen dashboard halaman AfiInsight.
2. Gunakan `useScrollProgress` yang sudah ada untuk satu timeline bersama:
   judul, posisi dashboard, jarak potongan, flip, dan kartu layanan.
3. Bentuk potongan menggunakan area crop yang selaras, lalu tampilkan mini UI
   HTML di sisi belakang. Pertahankan transform/opacity sebagai properti utama.
4. Ukur geometri saat resize; tulis transform melalui refs/rAF tanpa setState
   pada setiap frame. Gunakan tinggi track responsif dan batasi rotasi agar
   tidak keluar layar. Tidak perlu dependency animasi baru.
5. Sesudah scene selesai, scroll kembali ke urutan TrustedBy → Problem →
   Solutions yang sekarang. Scene ini menjadi pengantar visual, sedangkan
   Solutions tetap memuat penjelasan rinci layanan.
6. Periksa scroll turun/naik, lompatan scroll, keyboard, reduced motion,
   mobile 320/390 px, desktop, tautan layanan, posisi dock, dan build produksi.

## Wireframe

Wireframe interaktif terpisah memperlihatkan dashboard utuh, pembelahan,
dan empat kartu. Slider mewakili progres scroll; tombol Putar menjalankan
satu lintasan. Tata letak mobile bisa dipilih untuk menilai susunan 2 × 2.
Wireframe menjadi referensi komposisi. Ukuran final mengikuti geometri viewport pada implementasi beranda.

## Revisi bentuk dashboard — referensi Dribbble

Dashboard awal diperinci sebagai application shell: sidebar dengan Overview,
AfiAssist, AfiCreator, AfiInsight, dan AfiFlow; workspace switcher; breadcrumb;
profil; filter periode; KPI; grafik channel; serta tabel aktivitas. Menu dan
filter pada contoh dapat dicoba sebelum pembelahan dimulai. Empat potongan
memakai tampilan yang sama agar transisi tetap tersambung saat menu berubah.

Referensi yang diperiksa:

- [CRM dashboard — Untitled UI, Jordan Hughes](https://dribbble.com/shots/17080500-CRM-dashboard-Untitled-UI):
  hirarki judul, navigasi lokal, KPI, filter dan tabel.
- [Merivo — Ecommerce Analytics Dashboard, Design Monks](https://dribbble.com/shots/27702377-Merivo-Ecommerce-Analytics-Dashboard):
  sidebar aplikasi, susunan analytics, dan aktivitas/transaksi di area bawah.
- [SaaS CRM Dashboard UI, Nasir Uddin](https://dribbble.com/shots/26751588-SaaS-CRM-Dashboard-UI):
  menu berikon, overview performa dan hubungan antar-panel.

Pola susunan diadaptasi dengan palet Afilabs. Tidak menyalin aset atau
menggunakan gambar dashboard sebagai pengganti antarmuka. Semua data, menu,
dan nama workspace merupakan contoh untuk menilai desain.

## Verifikasi implementasi

Build produksi Webpack dan TypeScript; browser desktop 1280×900 dan
1280×720, tablet 865×978, mobile 390×844 dan 320×568. Menu lima area,
filter 7/30 hari, sinkronisasi potongan, scroll turun/naik, tautan layanan,
dan perpindahan breakpoint diperiksa. Reduced motion ditangani lewat media
query dan alur statis; preferensi OS tidak diubah selama pengujian.
