# Afilabs.id — Rebuild Plan

Target: rebuild afilabs.id dengan bahasa visual & kualitas motion situs referensi
(daliagency-anonymized.vercel.app), memakai konten & IA Afilabs yang sudah ada.

Keputusan yang sudah dikunci:
- Build baru di `/Users/bgst/afi` (bukan refactor repo lama)
- Tema TERANG (paper) mengikuti referensi
- Konten & IA Afilabs dipertahankan, hanya bahasa visual + motion yang diadopsi

---

## 1. Temuan teknis

### Situs sekarang (afilabs.id)
| Aspek | Nilai |
|---|---|
| Framework | Next.js (App Router, Turbopack) |
| Tema | Gelap, `#0A0A0A` |
| Font | Inter + JetBrains Mono |
| Lang | `id` |
| SEO | canonical, OG lengkap (900x900), Twitter card, 1x JSON-LD |
| Hosting | Cloudflare (ada beacon `cloudflareinsights`) |
| Rute | `/services/{afiassist,aficreator,afiinsight,afiflow}`, `/solutions/{for-d2c-brands,for-marketplace-sellers,for-affiliate-brands}`, `/how-it-works`, `/case-studies`, `/pricing`, `/about`, `/contact` |

### Situs referensi
| Aspek | Nilai |
|---|---|
| Framework | Next.js App Router, static di Vercel |
| Styling | Tailwind + CSS Modules untuk layer animasi |
| Motion | Transform/opacity via inline style — **tanpa GSAP, tanpa Lenis, tanpa Three.js, tanpa canvas** |
| Font | Onest (body), Syne (heading/UI), IBM Plex Mono (technical) |
| SEO | Metadata API, JSON-LD `@graph` (Organization + dst), OG/Twitter, keywords |

Catatan penting: referensi mencapai efek "mahal"-nya **murni dengan CSS + transform**.
Tidak perlu library animasi berat. Ini kabar bagus untuk Core Web Vitals.

---

## 2. Stack yang dipakai

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 | Sama dengan situs sekarang & proyek Anda yang lain; SSG + Metadata API terbaik untuk SEO |
| Bahasa | TypeScript (strict) | |
| Styling | Tailwind CSS v4 (`@theme` CSS-first) | Token didefinisikan sebagai CSS variable — persis pola referensi |
| Motion | **Hook `useScrollProgress` sendiri (~1 KB)** — tanpa library | Lihat catatan di bawah |
| Smooth scroll | **Tidak pakai** | Lenis merusak scroll native, menambah INP, dan referensi tidak memakainya |
| Komponen | Tanpa shadcn di fase awal | Marketing site; baru tambah Base UI/Radix saat butuh form & dialog di `/contact` |
| Font | `next/font` — Onest (body), Syne (display), JetBrains Mono (technical) | Onest+Syne mengikuti referensi; JetBrains Mono dipertahankan sebagai benang merah brand Afilabs |
| Ikon | `lucide-react` | |
| Deploy | Vercel (staging) → cutover ke domain produksi | Perlu konfirmasi: produksi sekarang di Cloudflare |

### Catatan: kenapa tanpa library animasi

Draf awal memakai `motion` (framer-motion). Setelah diukur, paket itu menambah
**51 KB gzip** hanya untuk dua transform terikat scroll — 43% dari seluruh kode
non-framework. Diganti hook `useScrollProgress` buatan sendiri yang menulis
langsung ke DOM lewat `requestAnimationFrame`, tanpa `setState` per frame.

Ini juga lebih setia ke referensi: situs referensi tidak memuat GSAP, Lenis,
Three.js, maupun canvas — semua efeknya CSS + inline transform.

Tambahkan library animasi nanti hanya kalau ada section yang benar-benar butuh
orkestrasi kompleks (spring, gesture, layout animation).

---

## 3. Design token (diambil persis dari referensi)

```css
@theme {
  --color-background: #FCFCFA;
  --color-text:       #111312;
  --color-muted:      #687170;
  --color-accent:     #1E3A8A;
  --color-accent-hover: #172A66;
  --color-accent-soft:  #E9EDFF;

  --color-surface:        rgba(255,255,255,0.92);
  --color-surface-strong: #FFFFFF;
  --color-surface-soft:   #F5F7FB;
  --color-border:         rgba(17,19,18,0.12);
  --shadow-scene:         0 24px 80px rgba(15,23,42,0.08);
}
```

Skala tipografi (fluid clamp, tanpa breakpoint jump):

```
--type-display:        clamp(2.25rem, 4.2vw, 4rem)
--type-page-title:     clamp(2.25rem, 4vw,   3.5rem)
--type-section-title:  clamp(2rem,    3.2vw, 3rem)
--type-card-title:     clamp(1.625rem,2.4vw, 2.125rem)
--type-lead:           clamp(1.125rem,1.5vw, 1.25rem)
--type-body:           1rem
--type-label:          0.75rem
--section-label-size:    0.6875rem
--section-label-tracking: 0.16em
```

---

## 4. Urutan build (per section)

Setiap fase = satu unit kerja yang bisa di-review terpisah.

**Fase 0 — Fondasi** ✅ SELESAI
- Scaffold Next.js 16 + TS + Tailwind v4
- Token `@theme` + `globals.css`
- Setup `next/font` (Onest, Syne, JetBrains Mono)
- Shell `app/layout.tsx`: `lang="id"`, metadata base, JSON-LD `@graph`
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- Utility `<PaperBackground>` dan hook `useScrollProgress`

**Fase 1 — Hero + Header** ✅ SELESAI (kecuali menu mobile, lihat §8)
Header digabung karena logo referensi ber-morph dari hero ke navbar saat scroll
(`data-logo-scroll-track`) — keduanya satu sistem, tidak bisa dipisah.

**Fase 2** — Trusted-by (marquee logo brand) ✅ SELESAI
**Fase 3** — Problem ("Brand kamu sudah scale, tapi operasionalnya belum") ✅ SELESAI
**Fase 4** — Solutions / What We Build ✅ SELESAI
**Fase 5** — Process (Audit → Build → Deploy → Grow) ✅ SELESAI
**Fase 6** — Stats (34% / 10x / <2mnt) ✅ SELESAI
**Fase 7** — Case studies ✅ SELESAI (deck bertilt, lihat §7g)
**Fase 8** — Testimonials ✅ SELESAI (grid, lihat §7h)
**Fase 9** — CTA akhir + Footer — footer ✅ SELESAI (§7i), CTA ← berikutnya
**Fase 10** — Halaman dalam (`/services/*`, `/solutions/*`, dst) + audit SEO & cutover

---

## 5. Spesifikasi Hero (Fase 1)

### Struktur
```
<section id="top">                     // track setinggi 160vh (170vh di md)
  └ <div class="sticky top-0 h-svh">   // panggung yang diam saat di-scroll
      ├ PaperBackground                // z-0, opacity .64
      └ TitleLayer                     // z-10, transform + opacity terikat scroll
          ├ h1
          ├ p (lead)
          └ CTA row
```

### Resep background "paper"
Empat layer bertumpuk (semuanya CSS murni, nol gambar):
1. Base putih `#FFFFFF`
2. Garis hairline vertikal — `mask-image: repeating-linear-gradient(90deg, #000 0 1.92px, transparent 1.92px 14.4px)`
3. Glow biru — `radial-gradient(70% 55% at 50% 70%, rgba(82,122,218,.133), transparent 72%)`
4. Scrim putih (radial + linear) untuk memudarkan tepi, lalu noise `feTurbulence`
   inline SVG `baseFrequency=1.25`, `opacity: .073`, `mix-blend-mode: multiply`

### Tipografi hero
- `font-size: clamp(36px, 6.1vw, 88px)`, `line-height: .98`, `letter-spacing: -.055em`
- Dua baris, baris kedua memakai `<span class="text-accent">` untuk frasa kunci
- Copy: **"Scale your brand with AI that _actually works._"** — aksen biru pada "actually works."
- Lead: `max-width: 44rem`, warna `--muted`, `text-wrap: balance`

### CTA
- Primary: filled `--accent`, secondary: outline — keduanya `min-height: 44px` (target sentuh WCAG)

### Aturan motion
- Saat scroll melewati track: title layer `translate3d` naik + fade, panel dashboard
  di bawahnya naik & membesar
- Hanya animasikan `transform` dan `opacity` (properti yang di-composite GPU)
- Hormati `prefers-reduced-motion: reduce` → matikan gerak, tampilkan state akhir

### ⚠ Catatan LCP (temuan penting)
Referensi merender section dengan `opacity: 0` lalu fade-in via JS.
Untuk H1 hero kita **jangan** ikuti itu — H1 adalah elemen LCP.
H1 harus ter-render `opacity: 1` pada paint pertama; hanya `transform` yang dianimasikan.
Kalau tidak, LCP diukur dari saat fade selesai dan skor Core Web Vitals jatuh.

---

## 6. Arsitektur SEO

**Rendering** — semua halaman marketing SSG (`export const dynamic = 'force-static'`).
Tanpa client-side data fetching di atas lipatan.

**Metadata**
- `metadataBase` + `generateMetadata` per rute
- Canonical absolut di tiap halaman
- OG image dinamis via `opengraph-image.tsx` (`ImageResponse`) — 1200×630
  (situs sekarang memakai 900×900; itu bukan rasio OG yang benar, perlu diperbaiki)

**Structured data** — JSON-LD `@graph` di root:
`Organization` → `WebSite` → `ProfessionalService`, ditambah `BreadcrumbList` per halaman
dalam, `FAQPage` di `/pricing` & `/how-it-works`, `Service` di tiap `/services/*`.

**Teknis**
- `sitemap.ts` + `robots.ts` native Next
- `lang="id"`, `og:locale="id_ID"`
- Struktur routing disiapkan i18n-ready sejak awal (referensi punya switcher EN)
  supaya menambah `/en` nanti tidak mengubah URL yang sudah ter-index
- Satu `<h1>` per halaman; section label memakai `<h2>`
- Font di-preload via `next/font`, `display: swap`

**Budget performa** — LCP < 2.0s, CLS < 0.05, INP < 200ms.

Budget JS **direvisi setelah pengukuran**. Angka 120 KB yang saya tulis di draf awal
tidak realistis untuk Next.js App Router: runtime React 19 + Next 16 saja sudah
~152 KB gzip sebelum satu baris kode kita pun ditambahkan. Ini lantai yang tidak
bisa ditawar selama memakai App Router.

Budget yang benar:
- Framework (tetap, tidak tumbuh per section): ~152 KB gzip
- **Kode aplikasi: < 40 KB gzip** ← ini yang kita jaga
- CSS: < 20 KB gzip

Terukur setelah Fase 1: kode aplikasi ~13 KB, CSS 6,7 KB. Masih longgar.

**Migrasi** — pertahankan seluruh URL yang sudah ada persis seperti sekarang.
Sebelum cutover: crawl situs lama, bandingkan daftar URL, siapkan 301 hanya untuk
yang benar-benar berubah. Submit ulang sitemap setelah live.

---

## 7. Status Fase 0 & 1

Terpasang: Next.js 16.3.5, React 19.2.8, Tailwind v4, TypeScript strict.
Font Onest + Syne + IBM Plex Mono lewat `next/font`.

```
app/          layout.tsx (metadata + JSON-LD), page.tsx, globals.css, sitemap.ts, robots.ts
components/   layout/Header.tsx, layout/Logo.tsx
              sections/Hero.tsx, sections/HeroScene.tsx
              ui/PaperBackground.tsx
hooks/        useScrollProgress.ts
lib/          site.ts, jsonld.ts
```

Terverifikasi:
- Build produksi lolos, seluruh rute prerender statis
- H1 ter-render tanpa `opacity` awal di HTML server → aman sebagai elemen LCP
- Koreografi scroll terukur di 5 titik progress: judul memudar habis di p=0.7,
  panel naik mengisi ruangnya dan menyentuh tepi bawah panggung di p=1
- `lang="id"`, canonical, JSON-LD (Organization + WebSite + ProfessionalService),
  `robots.txt`, `sitemap.xml` — semua keluar benar
- Hairline + glow biru terlihat di desktop maupun mobile

## 7a-bis. Bug font yang baru ketahuan (berdampak ke SELURUH situs)

Ditemukan saat memasang TechText di footer, jauh setelah Fase 0.

**Seluruh situs ternyata tidak pernah memakai Onest/Syne/IBM Plex Mono.**
Semuanya diam-diam jatuh ke font sistem sejak Fase 0.

Dua sebab bertumpuk:

1. Token `--font-body` / `--font-heading` / `--font-technical` hanya
   dideklarasikan di dalam `@theme inline`. Tailwind v4 mensubstitusi blok itu
   saat build ke dalam utility-nya dan **tidak memancarkan custom property saat
   runtime** — jadi setiap `var(--font-heading)` di CSS biasa, dan setiap kelas
   `font-[family-name:var(--font-heading)]`, resolve ke kosong.

2. Setelah token dipindah ke `:root`, nilainya **tetap** kosong: `next/font`
   memasang `--font-syne` dkk. di `<body>`, sedangkan token dideklarasikan di
   `:root` (`<html>`). Substitusi custom property terjadi di elemen tempat ia
   dideklarasikan — di `html`, `var(--font-syne)` belum ada, hasilnya kosong,
   dan kekosongan itulah yang diwariskan ke seluruh halaman.

Perbaikan: token dideklarasikan di `:root` **dan** variabel `next/font`
dipindah dari `<body>` ke `<html>`.

Terverifikasi setelah perbaikan: hero H1 → Syne, body → Onest, section label →
IBM Plex Mono, tagline footer → Syne.

**Pelajaran:** memastikan font "ter-load" (variabelnya ada) tidak sama dengan
memastikan font **terpakai**. Yang perlu dicek `getComputedStyle(el).fontFamily`
pada elemen nyata, bukan keberadaan variabelnya.

## 7b. Status Fase 2 — Trusted-by

`components/sections/TrustedBy.tsx` + aturan `.marquee` di `globals.css`.

Mengikuti pola section referensi: dipisahkan lewat tint background (`#FAFAFA`
di atas `#FCFCFA`), bukan garis border; label memakai kelas `.section-label`
yang sama.

**Nol JavaScript.** Guliran memakai CSS animation, bukan rAF atau library —
bundle JS tidak bertambah sama sekali (tetap di angka yang sama seperti Fase 1).

Terverifikasi:
- 6 salinan daftar, track 4444px, geser per siklus 741px = **persis satu
  salinan**, jadi titik sambungnya mulus
- Setelah bergeser, sisa konten masih menutupi viewport dengan margin 2263px
  pada layar 1440px — aman sampai viewport ~3700px
- Hanya salinan pertama yang terbaca screen reader; lima sisanya `aria-hidden`
- `prefers-reduced-motion`: guliran mati, mask dilepas, daftar jadi wrap
  rata tengah, salinan duplikat disembunyikan — semua lolos ke CSS hasil build
- Berfungsi di 1440px maupun 375px

### Bug yang ditemukan & diperbaiki saat pengerjaan

Versi pertama memakai 2 salinan dengan geseran `-50%`. Satu grup hanya selebar
741px sementara viewport 1440px, sehingga setelah bergeser akan muncul **celah
kosong ~700px** di sisi kanan sepanjang siklus. Diperbaiki jadi 6 salinan dengan
geseran `calc(-100% / var(--marquee-copies))`, yang selalu sama dengan lebar satu
salinan berapa pun jumlah salinannya.

## 7c. Status Fase 3 — Problem

`components/sections/Problem.tsx` + aturan `.reveal` di `globals.css`.

Tiga bottleneck operasional dalam grid 3 kolom berpemisah hairline, dengan
penomoran `01/02/03` yang di-`aria-hidden` (urutan sudah tersampaikan lewat
elemen `<ol>`, jadi nomornya murni dekoratif) — pola ini diambil langsung dari
daftar bernomor di section About referensi.

**Nol JavaScript lagi.** Reveal saat scroll memakai CSS
`animation-timeline: view()`, bukan IntersectionObserver.

### Kenapa reveal-nya CSS, bukan JS

Referensi mem-fade section-nya lewat JS dengan `opacity: 0` sebagai state awal
di markup. Pola itu sudah kita tolak untuk hero (alasan LCP), dan untuk section
bawah pun ada risikonya: kalau JS gagal, konten tidak pernah muncul.

`animation-timeline: view()` dibungkus `@supports`, jadi:
- Browser yang mendukung → reveal halus, nol JS
- Browser yang belum (Firefox, Safari lama) → konten tampil normal apa adanya

Tidak ada skenario di mana konten bisa hilang karena alasan teknis.

### Catatan: animation-delay tidak berlaku di timeline scroll

Versi pertama memakai `animation-delay` bertingkat untuk efek cascade. Itu
**kode mati** — `animation-delay` diabaikan oleh animasi berbasis progress
scroll. Diganti dengan menggeser `animation-range` tiap kolom lewat variabel
`--reveal-offset` (0%, 8%, 16%).

Terverifikasi dengan mengukur opacity pada empat posisi scroll:

| Posisi judul dari atas viewport | Judul | Kolom 1 / 2 / 3 |
|---|---|---|
| 934px (di bawah lipatan) | 0 | 0 / 0 / 0 |
| 810px | 1 | 0 / 0 / 0 |
| 675px | 1 | **0,49 / 0,34 / 0,20** |
| 495px | 1 | 1 / 1 / 1 |

Baris ketiga membuktikan cascade-nya benar-benar bertingkat, bukan serentak.

Hierarki heading: `h1` (hero) → `h2` (trusted-by) → `h2` (problem) → `h3` x3.

## 7d. Status Fase 4 — Solutions / What We Build

Mengikuti pola `02 / Solutions` situs referensi: dua kolom, sidebar sticky berisi
daftar produk di kiri, panel panjang per produk di kanan. Tiap panel punya
**mock UI produknya sendiri** — di referensi namanya `visualStage`.

```
components/sections/Solutions.tsx        layout + konten (server)
components/sections/SolutionsNav.tsx     nav sticky dengan sorotan aktif (client)
components/sections/previews/
  PreviewShell.tsx                       bingkai bersama keempat mock
  AfiAssistPreview.tsx                   konsol chat WhatsApp + indikator mengetik
  AfiCreatorPreview.tsx                  generator brief + shimmer baris diproses
  AfiInsightPreview.tsx                  dashboard multi-sumber + action items
  AfiFlowPreview.tsx                     kanvas alur + konektor putus-putus berjalan
```

Animasi mock (semuanya CSS, nol JS): `dash-march` (garis konektor berjalan),
`typing-dot`, `shimmer-sweep`, `live-pulse`, dan `bar-grow` yang terikat
`animation-timeline: view()`.

Referensi memakai animasi setara — `dashdraw`, `voiceWave`, `nodePop`, `uiRise`.

Mock UI diberi `aria-hidden` karena murni ilustrasi; isinya sudah tersampaikan
lewat teks panel di sebelahnya.

Terukur: JS 175,8 KB (hanya +0,4 KB dari nav sticky — satu-satunya bagian
section ini yang butuh JavaScript), CSS 8,0 KB. Mock 608x416 di desktop,
327x368 di mobile, tanpa overflow horizontal. Sidebar disembunyikan di mobile.

Hierarki heading tetap rapi: `h2` (solutions) diikuti `h3` per produk.

### Catatan: dua kali salah diagnosis pada nav sticky

Pengujian awal menunjukkan sorotan nav tertinggal satu langkah, selang-seling.
Saya menyimpulkan penyebabnya semantik `IntersectionObserver` (callback-nya hanya
mengirim elemen yang berubah) lalu menulis ulang memakai perhitungan jarak ke
tengah viewport.

**Kesimpulan itu salah.** Implementasi baru menunjukkan pola kegagalan yang
persis sama. Penyebab sebenarnya ada di cara menguji: `requestAnimationFrame`
di-throttle berat pada panel browser ini — menunggu 6 frame tidak tercapai
bahkan dalam 1500ms. Jeda 250–350ms yang saya pakai terlalu pendek, sehingga
yang terbaca adalah state lama. Setelah jeda diperpanjang, kedua implementasi
lolos: 8 dari 8 benar, dua arah dan dengan pengulangan.

Implementasi jarak-ke-tengah tetap dipakai karena sudah terverifikasi dan
deterministik, bukan karena `IntersectionObserver` bermasalah.

Pelajaran untuk section berikutnya: **jangan menyimpulkan bug dari pengujian
yang bergantung pada frame sebelum memastikan frame benar-benar dihasilkan.**

## 7e. Status Fase 5 — Process

`components/sections/Process.tsx` + aturan `.rail-track` / `.anim-rail`.

Empat langkah (Audit → Build → Deploy → Grow) sebagai timeline: rail hairline
dengan titik aksen di tiap langkah, memakai pola sel bernomor dari section
`01 / Projects` referensi. Rail-nya terisi dari kiri ke kanan seiring scroll.

**Nol JavaScript** — JS tetap 175,8 KB, tidak bergerak dari Fase 4. CSS 8,1 KB.

Di mobile rail horizontal disembunyikan dan tiap langkah mendapat garisnya
sendiri, jadi titik aksen tetap duduk di atas garis, bukan menggantung.

Seluruh copy memakai klaim yang sudah ada di afilabs.id. Rincian durasi per
langkah **tidak** ditambahkan karena itu berarti mengarang fakta; hanya
"live dalam 2–4 minggu" yang dipakai, karena itu klaim mereka sendiri.

### Tiga iterasi sampai rail-nya benar

Ini pelajaran yang berlaku untuk tiap animasi berbasis `view()` berikutnya.

1. **Rentang `entry` mengikuti tinggi elemen.** Rail-nya setinggi 1px, jadi
   `animation-range: entry 15% entry 85%` menghasilkan rentang nyaris nol —
   garisnya melompat 0 ke 1 dalam ~135px scroll. Diperbaiki dengan
   mendeklarasikan `view-timeline: --rail` bernama pada wrapper yang tinggi,
   lalu merujuknya dari rail.

2. **`cover` tidak bisa dipakai di section terakhir.** Rentang `cover`
   mengukur seluruh perjalanan melintasi viewport, dan itu hanya tertempuh
   kalau masih ada konten di bawahnya. Selama Process jadi section paling
   bawah, scroll mentok di ~27% cover dan garis tidak pernah penuh.

3. **Solusi:** `entry 10% entry 95%` pada kontainer setinggi 395px. Hanya
   bergantung pada section ini sendiri masuk viewport, jadi selalu selesai
   apa pun yang ada di bawahnya.

Terukur: scaleX 0 → 0,015 → 0,284 → 0,552 → 0,82 → 1 sepanjang ~360px scroll.

**Aturan untuk section berikutnya:** jangan memasang `animation-timeline: view()`
langsung pada elemen tipis, dan jangan memakai rentang `cover` pada section yang
sedang berada di paling bawah halaman.

**Aturan pengujian:** nilai animasi yang dibaca lewat `getComputedStyle` di panel
ini tertinggal di belakang scroll dan tidak bisa diandalkan berapa pun jedanya.
Verifikasi konfigurasi lewat Web Animations API (`getAnimations()`), yang tidak
bergantung pada paint. Baca dua kali di posisi scroll yang sama — kalau nilainya
berubah, itu bacaan basi, bukan bug.

## 7f. Status Fase 6 — Stats

`components/sections/Stats.tsx`. Tiga angka hasil dalam grid berpemisah
hairline, angka besar (60px di desktop, 36px di mobile) berwarna aksen.

Sengaja **tanpa label section bernomor** — di afilabs.id pun band ini jeda ritme
antara Process dan Case Studies, bukan bab tersendiri. Karena tidak punya judul
kasat mata, section ini diberi `<h2 class="sr-only">` supaya tetap punya nama
bagi pembaca layar dan tidak memutus hierarki heading.

**Nol JavaScript** — JS tetap 175,8 KB, tidak bergerak sejak Fase 4.

### Tidak memakai animasi hitung-naik

Angka seperti "< 2 mnt" dan "10x" tidak punya progresi numerik yang wajar untuk
dihitung naik, dan animasi semacam itu membuat pembaca layar membacakan nilai
antara. Dipakai `.reveal` bertingkat saja — konsisten dengan section lain dan
tetap nol JS.

### Konfirmasi: rail Process tetap sehat

Setelah Stats terpasang, Process bukan lagi section terakhir. Pengukuran awal
sempat terlihat seperti regresi (macet di 0,954). Itu **bukan** regresi:
pada posisi scroll yang sama, pembacaan pertama 0,284 lalu pembacaan kedua
0,686 — nilainya berubah tanpa scroll bergerak, bukti pipeline render panel
tertinggal, sama seperti temuan Fase 4.

Diverifikasi lewat Web Animations API yang tidak bergantung pada paint:
animasi `rail-extend` terpasang, `ViewTimeline`, **subjeknya track setinggi
395px (bukan rail 1px)**, `fill: both`. Konfigurasinya persis seperti yang
dirancang.

## 7g. Status Fase 7 — Case Studies (Stack Scroll Reveal)

**Port langsung** dari kode komponen yang diberikan pemilik
(`/Users/bgst/stack-scroll-reveal` — index.html, script.js, style.css).
Mekanismenya dipertahankan apa adanya; hanya konten, warna, dan font yang
disesuaikan.

```
components/sections/StackScroll.tsx   port script.js (client, ~1 KB)
components/sections/CaseStudies.tsx   markup + konten (server)
app/globals.css                       port style.css bagian .deck-*
```

### Mekanisme sebenarnya (dari kode, bukan hasil tebakan)

- Kartu `position: absolute; inset: 0` — **semua bertumpuk di posisi sama**
- `transform-origin: 50% 100%` (tengah-bawah)
- `z-index: calc(count - index)` — **kartu pertama paling depan**
- `step = innerHeight * 1.1` — satu kartu per 1,1 tinggi layar
- `depth = max(0, index - progress)` → skala mundur 0,12 per tingkat,
  offset turun 10px per tingkat
- `exit = clamp((progress - index - 0.15) / 0.85)`
- `lift = exit * (innerHeight + tinggiPanggung * 0.3)`
- `scale = max(0.64, 1 - depth * 0.12) + exit * 0.1`
- `rotate = sin(exit * PI/2) * 18` — maksimal **18°**, dengan easing
- Urutan transform: `translateY(depth*10) scale() perspective(500px)
  translateY(-lift) rotateX()` — perspektif di **tengah** rantai
- Kartu yang sudah lewat diberi `visibility: hidden`

Terverifikasi setelah port: track 4460px (= 500 + 4x110svh), stage-top 200px
(= max(32, 50svh-250)), dan pada satu titik scroll kartu 1 terukur
`translateY(-990px) rotateX(17,93deg) scale(1,094)` sementara kartu 2 jadi
fokus dan kartu 3-4 mengintip pada skala 0,874 dan 0,754.

### Berapa jauh tebakan sebelumnya meleset

Tiga percobaan reverse-engineering sebelum ini semuanya salah di hal mendasar:

| | Tebakan | Sebenarnya |
|---|---|---|
| Susunan | kolom vertikal yang naik | semua kartu bertumpuk `inset: 0` |
| Arah rotasi | sempat terbalik | 0° → 18°, sin-eased |
| Sudut maks | 15° | 18° |
| z-index | kartu terakhir di depan | kartu **pertama** di depan |
| Perspektif | di panggung / di awal rantai | di **tengah** rantai transform |

**Pelajaran:** untuk mereplikasi interaksi spesifik, minta kodenya. Tiga
putaran pengukuran DOM + analisis frame video tetap tidak menghasilkan
mekanisme yang benar.

### Penyesuaian yang disengaja

- **Panel visual, bukan foto.** Sumbernya memakai foto potret; kita memakai
  panel metrik karena tidak punya dokumentasi klien dan tidak mengarangnya.
- **Variabel tinggi kartu dipindah ke CSS.** Awalnya dipasang sebagai inline
  style, yang membuat varian mobile (620px) tidak pernah berlaku — inline
  style tidak bisa ditimpa media query.
- **`color` dikembalikan di panel visual.** Kartu mewariskan `color: #fff`;
  tanpa override, teks di dalam panel terang (mis. "90 detik") jadi putih di
  atas putih dan hilang. Ketahuan saat pengujian mobile.

Terukur: JS 176,2 KB (+0,4 KB untuk pengendali; isi kartu tetap server
component), CSS 8,9 KB. Fallback `prefers-reduced-motion` ikut ter-port —
tumpukan dibongkar jadi grid biasa.

### Dua case study tambahan berstatus DRAF

Case nyata hanya dua (Skincare/AfiInsight, Suplemen/AfiAssist). Atas permintaan
pemilik ditambahkan Fashion/AfiCreator dan F&B/AfiFlow. **Keduanya karangan**,
membawa `isDraft: true` yang memunculkan badge "DRAF" kuning yang selalu
tampil. Hapus flag-nya setelah diganti data nyata.

## 7h. Status Fase 8 — Testimonials

Section ini punya desainnya sendiri: kartu kertas ter-pin yang bisa di-drag
dan berayun dengan pegas (`TestimonialCards.tsx`), plus CSS module terpisah.

### Dari gelap ke terang

Versi sebelumnya berlatar charcoal keolivan dengan spotlight, kartu tembus
pandang, dan kepala pin berkilau. Tidak nyambung dengan tema situs, jadi
seluruh lapisan visualnya disusun ulang untuk terang. Sempat ada langkah
antara yang hanya menukar warna sambil mempertahankan latar gelap — itu
ditolak, dan benar: masalahnya memang latarnya, bukan warnanya.

Yang **dipertahankan utuh**: seluruh layout, sudut kemiringan tiap kartu,
pin, dan interaksi ayunannya (murni JS, tanpa warna).

Yang **diganti**:

| | Sebelum | Sesudah |
|---|---|---|
| Latar | radial charcoal `#161715` + spotlight | `#fafafa` + resep kertas hero |
| Tekstur | noise putih di atas gelap | noise `mix-blend-mode: multiply` |
| Kartu | panel tembus pandang + `backdrop-filter` | kertas putih + `--border` + bayangan |
| Watermark | putih 9% | tinta `--text` 16% |
| Pin | gradien hijau olive | gradien navy `--accent` |
| Teks | abu keolivan lepas | `--text` / `--muted` / `--accent` |

Latarnya memakai resep kertas yang sama dengan hero — garis hairline vertikal
di atas glow aksen, ditutup scrim dan noise — supaya section ini terbaca satu
keluarga dengan bagian atas halaman. `backdrop-filter: blur()` dilepas karena
tidak ada gunanya di atas latar terang yang hampir solid (sekaligus hemat
kerja komposit).

### Kontras: dua kegagalan nyata yang sempat tersembunyi

Pengukuran pertama melaporkan semuanya lolos dengan angka 20-an. Itu salah —
parser warnanya tidak menangani alpha, lalu tidak menangani format
`color(srgb …)` yang memakai skala 0..1. Setelah diperbaiki, dua teks
fungsional ternyata **gagal**:

| Elemen | Sebelum | Sesudah |
|---|---|---|
| Nomor kartu `[ 01 ]` | 3,00 ❌ | 4,85 ✅ |
| Annotation `[ Cerita klien ]` | 3,27 ❌ | 4,81 ✅ |

Keduanya semi-transparan; dibuat solid `--muted`.

Hasil akhir seluruh teks (ambang AA 4,5; teks besar 3,0):

| Elemen | Rasio |
|---|---|
| Kutipan | 18,02 |
| Nama perusahaan | 18,02 |
| Peran | 10,00 |
| Sorotan | 9,92 |
| Nomor | 4,85 |
| Label / intro / annotation | 4,81 |

**Pelajaran:** kalau angka kontras terlihat terlalu bagus untuk teks abu,
curigai parsernya — bukan warnanya.

### Penyesuaian lanjutan

1. **Pin dihapus** — elemen `.pin` beserta seluruh aturannya dibuang.
   `transform-origin: 58% 0` dipertahankan, jadi kartu tetap berayun dari
   titik atas seperti kertas tersangkut.

2. **Shake saat hover.** Memakai variabel sendiri `--shake`, terpisah dari
   `--swing`. Alasannya penting: `--swing` ditulis JS lewat inline style saat
   kartu di-drag, sedangkan animasi CSS menang atas inline style — kalau
   keduanya memakai properti yang sama, kartu akan lepas dari kursor saat
   ditarik sambil di-hover. Rotasi kartu kini menjumlahkan ketiganya:
   `rotate(calc(var(--tilt) + var(--swing) + var(--shake)))`, dan
   `.card[data-dragging]` mematikan animasinya.

   `--shake` didaftarkan lewat `@property` di `globals.css`; tanpa itu nilainya
   dianggap token teks dan animasinya meloncat antar keyframe alih-alih
   menginterpolasi.

   Terverifikasi secara numerik: pada ms=70 `--shake` terbaca −2,19939deg dan
   rotasi total −12,2° — persis nilai keyframe 15%. Pemicu `:hover`-nya sendiri
   **tidak bisa diuji di panel ini** (pointer sintetisnya tidak menghasilkan
   state `:hover`); aturannya sudah dipastikan ada di CSS yang disajikan dan
   media query `(hover: hover)` cocok.

3. **Watermark di-center.** Dari `left: 11%` jadi `left: 50%` +
   `translate: -50% 0` + `text-align: center`. Terukur: titik tengah judul dan
   titik tengah scene sama persis (selisih 0px). Di mobile posisinya relatif,
   jadi `translate` dilepas agar tidak menggeser ganda.

### Satu hal yang sengaja dibiarkan

Headline watermark ("DIPERCAYA BRAND…") ada di **1,41**, di bawah ambang 3,0
untuk teks besar. Itu memang elemen dekoratif — inti desainnya justru samar.
Sudah dinaikkan dari 9% ke 16% agar lebih hadir di latar terang, tapi tidak
sampai lolos AA. Kalau mau lolos, alpha-nya perlu sekitar 50%, yang mengubah
karakternya dari watermark jadi heading abu biasa. Keputusan pemilik.

## 7i. Status Fase 9a — Footer

Dibangun dua tahap: pertama menebak dari footer reactbits.dev, lalu
**dikoreksi** setelah pemilik mengirim desain Figma-nya
(`AFIHUB`, node `289:1295`).

```
components/layout/Footer.tsx
components/layout/Footer.module.css
components/layout/DotFieldWordmark.tsx   interaksi kursor pada wordmark
public/afilabs-wordmark.svg              aset lettering dari Figma
```

### Figma ternyata sama dengan hasil tebakan — kecuali wordmark-nya

Susunan, warna, dan isi footer di Figma identik dengan versi tebakan: `#111312`,
`rgba(252,252,250,·)` untuk teks, kolom Services/Solutions/Company/Legal,
container 1344px, padding atas 72px, gap 56px, tombol sosial 36px.

Yang **berbeda** cuma area wordmark. Dan di situ tebakan saya terbalik.

### Arah titiknya: tebakan saya salah

Catatan pemilik sebelumnya — "titiknya dibalik dari reactbits" — saya tafsirkan
sebagai: titik mengisi seluruh bidang, huruf jadi bentuk pejal yang
melubanginya. Itu yang saya bangun.

Dua aset di Figma menunjukkan yang sebenarnya:
- `0d5c9.svg` — kisi titik (lingkaran r=6, jarak 24px) → dipakai sebagai **mask**
- `08048.svg` — wordmark "Afilabs" → dipakai sebagai **isi**

Jadi wordmark-nya yang di-mask oleh kisi titik: **titik hanya ada di dalam
huruf, di luar huruf kosong.** Kebalikan dari yang saya bangun.

Implementasinya membalik arah mask (bentuk huruf jadi mask, isinya kisi titik)
— hasil visual sama persis tapi bebas resolusi. Nilai dari aset dipertahankan:
jarak 24px, radius 6px, warna `#3F434F`.

### Wordmark: komponen TechText dari React Bits

Versi bertitik (baik yang titik-di-luar maupun titik-di-dalam-huruf) ditolak
pemilik. Diganti dengan komponen **TechText** React Bits, yang sumbernya
diberikan langsung.

```
components/vendor/reactbits/TechText.jsx   sumber vendor, TIDAK diubah
components/vendor/reactbits/TechText.css   CSS bawaannya
components/vendor/reactbits/TechText.d.ts  deklarasi tipe
```

Sumber vendor sengaja disalin apa adanya; penyesuaian dilakukan lewat props di
`Footer.tsx`. `TechText.d.ts` ada karena prop `style` tidak punya nilai default
di sumber JS-nya, sehingga TypeScript menyimpulkannya sebagai prop wajib —
dengan file deklarasi, sumber vendor tidak perlu disentuh.

`allowJs` sudah aktif, tapi `include` di `tsconfig.json` belum mencakup
`**/*.jsx`; ditambahkan.

Props yang dipakai: `text="Afilabs"`, `fontWeight 700`, `fontSize 220`
(mengecil sendiri agar muat), `letterSpacing -0.055`, `color #515767`,
`accentColor #e9edff`, `reveal="letter"`, `dashLength 4`, `dashGap 2`,
`specks 15`.

`fontFamily` sengaja dikosongkan: komponen membaca `font-family` wadahnya, dan
wadahnya diset `var(--font-heading)` sehingga wordmark memakai Syne seperti
judul lain di situs. Inilah yang menyingkap bug font di §7a-bis — awalnya
wadahnya terbaca font sistem.

File lama (`DotFieldWordmark.tsx`, `public/afilabs-wordmark.svg`) dihapus.

### Menu

14 tautan, semuanya rute nyata di afilabs.id. Kolom `Solutions` ditambahkan
karena rutenya ada tapi belum pernah masuk footer.

### Kontras

Judul kolom sempat 4,44 — di bawah ambang AA 4,5 untuk teks 10px. Alpha
dinaikkan 0,45 → 0,52, kini 5,54. Sisanya lolos: tagline & kontak 16,4;
alamat & link menu 7,41; baris bawah 5,21.

### Yang masih kosong

Tiga ikon sosial menunjuk ke beranda platform (`https://linkedin.com`, dst),
sama seperti afilabs.id sekarang — **tautan mati sampai diisi URL profil
asli**. Ditandai `TODO` di `Footer.tsx`.

## 7j. Halaman layanan — AfiAssist

Rute `/services/afiassist` memakai konten dari
`https://afilabs.id/services/afiassist`, dengan token paper, aksen biru,
Syne/Onest/IBM Plex Mono, Header, dan Footer yang sudah ada.

Referensi interaksi: [Feature Story Scroll](https://www.framer.com/marketplace/components/feature-story-scroll/)
dan [Scroll Service Cards](https://www.framer.com/marketplace/components/scroll-service-cards/)
di Framer Marketplace. Implementasi dibuat sendiri, tanpa menyalin komponen berbayar
atau menambahkan library animasi.

- Demo chat: tiga skenario, tiga channel, typing, replay, dan eskalasi komplain.
  Percakapan adalah ilustrasi lokal; tidak mengirim pesan atau mengakses stok nyata.
  Area pesan memiliki tinggi tetap agar balasan tidak menggeser halaman.
- Proses: visual sticky desktop berganti mengikuti tiga langkah melalui
  IntersectionObserver; mobile memakai alur bertumpuk. Scroll tetap native.
- Delapan fitur berupa accordion dengan preview animasi, hasil kasus dapat
  dibandingkan sebelum/sesudah, dan tujuh integrasi dapat dipilih.
- Transisi masuk section memakai CSS scroll timeline dengan fallback konten
  terbaca. Reduced motion mematikan animasi, dan demo langsung menampilkan balasan.
- Metadata canonical/OG/Twitter, Service/Breadcrumb JSON-LD, dan sitemap ditambahkan.
- Build produksi Webpack + TypeScript lolos. Interaksi, keyboard accordion,
  sticky/scroll sync, dan layout 1280/390/320px sudah diperiksa di browser.
  Tidak ditemukan error/warning console pada pemeriksaan akhir.

CTA memakai halaman kontak situs aktif sampai `/contact` lokal tersedia.

## 7k. Halaman layanan — AfiCreator & AfiFlow

Rute `/services/aficreator` dan `/services/afiflow` memakai konten dari halaman
layanan yang sama di afilabs.id. Header bersama (termasuk submenu), Footer,
token paper/biru, dan font yang sudah ada dipertahankan.

Bagian bersama ada di `components/services/shared/`: hero, CTA, kartu masalah,
section reveal, proses dengan visual sticky, feature explorer, dan Service /
Breadcrumb JSON-LD. Tidak ada dependency animasi baru. Referensi pola visual:
[Scroll Story](https://www.framer.com/marketplace/components/scroll-story/) dan
[Journey Stepper](https://www.framer.com/marketplace/components/journey-stepper/).
Implementasi dibuat sendiri, tanpa menyalin komponen berbayar.

- **AfiCreator:** preview format konten; studio dengan dua produk ilustrasi,
  tiga gaya kreator, dan format TikTok Hooks / IG Captions / Creator Brief;
  variasi contoh dan tombol salin; kalender distribusi interaktif.
- **AfiFlow:** empat contoh workflow, detail node melalui hover/fokus/klik,
  eksekusi simulasi bertahap, log, skenario error dan retry, serta reset.
  Pergantian workflow membatalkan timer alur sebelumnya.
- Checklist operasional dan kalkulator durasi × frekuensi memperlihatkan
  beban waktu manual. Perhitungan bulanan memakai empat minggu, dengan asumsi
  seluruh tugas yang dihitung dapat diotomatisin; label asumsi tampil di UI.
- Demo tidak melakukan generasi AI live atau memproses data bisnis. Penjelasan
  simulasi ditampilkan. Animasi menghormati reduced motion; proses mobile
  memakai layout bertumpuk dan kontrol tahap tanpa sticky yang memakan layar.
- Build produksi Webpack + TypeScript lolos. HTML hasil build mengonfirmasi
  satu H1 per halaman, canonical masing-masing, anchor valid, Service /
  Breadcrumb JSON-LD, dan sitemap untuk kedua rute.
- Pengujian desktop memverifikasi personalisasi output, variasi, notifikasi
  salin, kalender, keyboard accordion, sticky/scroll sync, keempat workflow,
  sukses/error/retry, pembatalan proses, checklist, dan rumus kalkulator.
- **Batas verifikasi:** pemeriksaan visual mobile belum selesai karena origin
  approval browser untuk localhost berulang kali timeout. Layout responsif
  telah diimplementasikan, tetapi belum dinyatakan lolos pemeriksaan mobile.

Dev server port 3000 disegarkan dengan Webpack setelah proses sebelumnya belum
mengenali rute AfiFlow baru. Kedua rute sudah dapat dimuat setelah restart.

### 7l. Tanya AFI — center dock Figma terpasang

Prototype dipasang di root layout agar tersedia pada semua halaman. Setelah
review ukuran, dock diperbesar dari 300 × 60 menjadi 360 × 72 px, dengan
avatar, outline lavender, waveform, cahaya berputar, serta tiga saran
pertanyaan dari referensi Figma. Lebarnya menyesuaikan layar mobile kecil.
Panel percakapan memakai native dialog dengan transisi, Escape, pengembalian
fokus, scroll lock, dan penyesuaian terhadap visual viewport mobile.

- Jawaban masih contoh lokal yang disiapkan di `components/chat/chatContent.ts`.
  Tidak ada model AI, request layanan chat, atau penyimpanan pesan pengunjung.
  Percakapan bertahan saat navigasi internal, dan hilang saat reload.
- Kartu rekomendasi membuka halaman AfiAssist, AfiCreator, AfiFlow, dan proses
  kerja yang sudah ada. Kontrol reset, jeda motion, serta pembatalan simulasi
  tersedia. Reduced motion mematikan animasi dekoratif.
- Interaksi hover/fokus/tap memadukan lift dock, sapuan cahaya sekali,
  gerakan sapaan avatar, perubahan tempo waveform, dan prompt yang muncul
  bergiliran dengan arah rotasi berbeda. Hover tiap prompt juga merespons
  dengan lift dan rotasi ringan. Saat animasi dijeda, prompt tetap terlihat.
- Avatar preview memakai crop 47 × 47 px dari referensi Figma yang sama dengan
  prototype, disimpan di `public/images/afi-avatar.jpg`.
- Footer diberi ruang bawah agar dock tidak menutupi teks legal.
- Browser QA: dock dan panel pada desktop; mobile 390 × 844 dan 320 × 568;
  saran, pengiriman Enter, navigasi layanan, percakapan tetap ada setelah
  navigasi, Escape dan fokus kembali, reset, jeda motion, serta lapisan menu
  mobile. Tidak ada overflow horizontal pada pemeriksaan 390 px. Keyboard
  ponsel fisik belum diuji; penanganan resize visual viewport sudah disiapkan.
- Build produksi Webpack dan TypeScript lolos. Preview implementasi tersimpan
  di `docs/previews/afi-chat-dock.png`.

### 7m. AfiInsight — business intelligence yang bisa dieksplorasi

Halaman `/services/afiinsight` mengikuti token paper/biru, tipografi, header
bersubmenu, footer, dan dock chat yang sudah ada. Struktur konten merujuk ke
[halaman AfiInsight asli](https://afilabs.id/services/afiinsight). Referensi
interaksi grafik: [Interactive Chart](https://www.framer.com/marketplace/components/interactive-chart/)
dari Framer Marketplace. Implementasi SVG dan CSS dibuat sendiri, tanpa
mengambil kode komponen berbayar atau menambah dependency.

- Hero: preview GMV/order dengan garis yang tergambar dan titik yang bisa
  ditelusuri melalui pointer, tap, serta tombol panah/Home/End.
- Connect / Analyze / Act: visual sticky berubah mengikuti posisi scroll;
  navigasi tahap, pemilihan sumber data, animasi batang dan tumpukan laporan.
  Perhitungan posisi tahap juga menangani lompatan scroll besar. Di mobile
  visual tidak sticky, dan tahap dapat dipilih langsung.
- Dashboard memiliki lima area: GMV, afiliasi, pelanggan, operasi, dan laporan.
  Periode 7/30 hari dan channel menghitung GMV/order/AOV dari record contoh
  yang sama. Area afiliasi memakai dataset afiliasi; segmen pelanggan
  menentukan datasetnya. Tabel kreator bisa diurutkan, dan warning bisa dibuka.
- Laporan mingguan memiliki dua minggu contoh, checklist tindakan per minggu,
  progress, tiga insight, dan satu early warning. Tidak mengirim email atau
  menyimpan keputusan di luar sesi komponen. Semua angka/nama diberi label
  ilustrasi; tidak ada koneksi analytics atau generasi AI langsung.
- Section heading, visual dashboard, grafik, metrik, fitur, dan laporan memakai
  transisi yang menghormati reduced motion. Tab dashboard mendukung keyboard;
  tab mobile dapat digulir horizontal tanpa membuat halaman melebar.
- Metadata canonical/OpenGraph/Twitter, Service/Breadcrumb JSON-LD, dan sitemap
  ditambahkan. Chat demo mengenali AfiInsight dan membuka rutenya.
- Verifikasi: build produksi Webpack + TypeScript; perhitungan periode,
  agregasi channel, AOV dan label tanggal; satu H1, canonical, schema, ID unik,
  serta anchor. Browser QA desktop 1280 px, mobile 390 px dan 320 px:
  filter, grafik keyboard, sorting, segmen, tab keyboard, warning, laporan,
  checklist per minggu, navigasi proses, dan lebar halaman.
  Preview desktop: `docs/previews/afiinsight-hero.png`.

## 7n. Hero dashboard → empat layanan — selesai

- Hero beranda memakai application shell dengan sidebar Overview + empat
  layanan, filter 7/30 hari, tiga KPI, grafik, distribusi, dan tabel aktivitas.
  Menu dan filter mengganti data ilustrasi serta seluruh potongan secara serempak.
- Scroll memusatkan dashboard, membelahnya menjadi empat crop vertikal,
  kemudian membaliknya secara bertahap menjadi mini UI layanan. Scroll naik
  menggabungkan dashboard kembali. Setiap kartu membuka rute layanan terkait.
- Desktop memakai empat kolom; tablet tinggi memakai 2 × 2. Mobile, layar
  pendek, reduced motion, dan HTML awal memakai alur normal. Mobile memiliki
  reveal ringan bila browser mendukung scroll-driven animation. Di bawah
  360 px kartu menjadi satu kolom. Ruang dock chat tetap diperhitungkan.
- Geometri diukur saat resize; scroll ditangani lewat refs dan satu rAF.
  Potongan dekoratif disembunyikan dari accessibility tree; link baru dapat
  difokuskan setelah flip selesai. Tidak menambah dependency.
- Verifikasi: build produksi Webpack/TypeScript, ESLint file yang berubah,
  desktop 1280×900/720, tablet 865×978, mobile 390×844 dan 320×568,
  semua menu/filter, scroll dua arah, breakpoint, dan empat rute layanan.
  Console tanpa warning/error selama pengecekan akhir. Reduced motion
  diperiksa pada implementasi; preferensi OS tidak diubah.
- Preview: `docs/previews/hero-workspace.png` dan
  `docs/previews/hero-dashboard-split.png`. Rincian: `docs/HERO_SPLIT_PLAN.md`.

## 8. Utang yang diketahui

1. **Header & menu mobile — selesai.** Header mengikuti susunan situs Afilabs:
   logo kiri, navigasi tengah, CTA kanan; Services berupa grid 2 kolom dan
   Solutions berupa daftar dengan deskripsi. Palet paper tetap dipertahankan.
   Mobile memakai drawer kanan dengan accordion submenu, scroll lock, dan
   pengelolaan fokus keyboard. Navigasi Pricing juga sudah ditambahkan.
2. **Logo klien masih placeholder, dan ini bukan sekadar soal aset.**
   Lima nama di band trusted-by (SkinGlow, VitaFit, NutraBest, KopiKita,
   FashionLab) diambil dari situs afilabs.id yang sekarang. Nama-nama itu
   ditampilkan di bawah klaim "Dipercaya oleh brand D2C terkemuka Indonesia" —
   klaim kepercayaan yang seharusnya didukung brand nyata. Sebelum rilis, ganti
   dengan klien sungguhan (idealnya dengan izin tertulis), atau ubah
   framing-nya jadi sesuatu yang tidak mengklaim hubungan klien.
3. **Semua angka masih perlu disubstansiasi.** Dua kategori berbeda:
   - *Angka ilustratif* — dashboard hero dan isi keempat mock UI produk
     (waktu respons, jumlah afiliator, jam dihemat, hook digenerate). Ini
     hiasan antarmuka; ganti dengan angka nyata atau biarkan jelas sebagai
     contoh.
   - *Klaim performa & hasil klien* — "34%", "10x", "< 2 mnt" di Fase 6;
     "live dalam 2–4 minggu" di Fase 5; dan dua case study di Fase 7
     (Skincare Brand D2C, Suplemen Brand). Semuanya diambil dari afilabs.id
     yang sekarang, tapi tampil sebagai hasil terukur — dan di Fase 7
     divisualkan sebagai gauge, yang membuatnya terasa makin faktual.
     Pastikan ada datanya, dan izin klien, sebelum rilis.
4. **Belum ada dark mode.** Token sudah berupa CSS variable, jadi penambahannya
   nanti tidak perlu bongkar komponen.
5. **Belum ada `opengraph-image.tsx`** — direncanakan di Fase 0 tapi ditunda ke
   fase konten, karena desainnya bergantung pada bahasa visual yang sudah jadi.
6. **Catatan metode pengujian:** animasi (rAF maupun scroll-driven CSS) tidak
   berjalan selama panel browser tersembunyi — nilai yang terbaca jadi beku dan
   menyesatkan. Pastikan panel tampil dulu sebelum memverifikasi motion.
7. **`site.url` masih `https://afilabs.id`** — canonical sudah menunjuk domain
   produksi walau kita kerja lokal. Sengaja, supaya tidak ada URL localhost bocor
   ke metadata.
