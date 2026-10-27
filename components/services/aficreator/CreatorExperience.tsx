"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, FileText, RefreshCw, Sparkles } from "lucide-react";
import styles from "./creator.module.css";

const formats = ["TikTok Hooks", "IG Captions", "Creator Brief"];
const products = [
  { name: "Serum Vitamin C 20 ml", audience: "Skincare enthusiast", facts: "Botol 20 ml · rutinitas skincare · pemakaian sehari-hari", angle: "rutinitas skincare" },
  { name: "Kopi Susu Oat 250 ml", audience: "Coffee & lifestyle", facts: "Botol 250 ml · kopi susu oat · praktis dibawa", angle: "coffee break" },
];
const personas = ["Lifestyle creator", "Product reviewer", "Storyteller"];

function outputFor(product: number, persona: number, batch: number, format: number) {
  const item = products[product];
  const starts = [
    ["POV: satu hal kecil yang selalu ada di tas gue.", "Rutinitas simpel sebelum mulai hari? Ini versi gue.", "Kalau kamu suka yang praktis, sini merapat."],
    ["Sebelum checkout, cek tiga detail ini dulu.", "Unboxing jujur: kita lihat produknya lebih dekat.", "Apa yang sebenarnya kamu dapat? Yuk, cek bareng."],
    ["Awalnya cuma penasaran, lalu masuk rutinitas gue.", "Di balik satu jeda kecil di hari yang panjang...", "Cerita hari ini dimulai dari hal sederhana."],
  ][persona];
  const shifted = starts.map((_, i) => starts[(i + batch) % starts.length]);
  if (format === 0) return shifted.map((hook) => `${hook} Kenalan dengan ${item.name}.`);
  if (format === 1) return [
    `Ada ruang untuk ${item.angle} di tengah hari yang padat. ${item.name} jadi bagian kecil dari rutinitas hari ini. Kamu punya versi rutinitas sendiri? Cerita di komentar, ya.`,
    `Detail kecil, cerita berbeda. Hari ini kita kenalan lebih dekat dengan ${item.name}. Cek detail produk sebelum memilih yang sesuai kebutuhanmu. #DailyRoutine #Afiliasi`,
    `${shifted[0]} ${item.name} hadir di cerita hari ini. Simpan dulu untuk referensi, dan cek detail produknya di link yang tersedia.`,
  ];
  return [
    `HOOK / 0–3 detik\n${shifted[0]}`,
    `DEMO / 3–20 detik\nPerlihatkan ${item.name}, ukuran kemasan, dan cara produk masuk ke ${item.angle}. Gunakan gaya ${personas[persona].toLowerCase()}.`,
    "CTA / 20–30 detik\nAjak audiens cek detail produk. Cantumkan disclosure afiliasi dan gunakan klaim yang sudah disetujui brand.",
  ];
}

export function ContentDeck() {
  const [format, setFormat] = useState(0);
  const previews = [
    ["POV: satu detail kecil di rutinitas pagi gue.", "Sebelum checkout, lihat produknya lebih dekat.", "Dari produk yang sama, tiga cerita berbeda."],
    ["A little routine, a little me-time. ✨", "Detail produknya? Kita bahas satu per satu.", "Simpan untuk referensi rutinitas besok."],
    ["01 / Hook yang cocok dengan niche kreator", "02 / Demo produk dengan brand message yang jelas", "03 / CTA + disclosure afiliasi"],
  ];
  return <div className={styles.deck}>
    <div className={styles.deckTop}><span className={styles.micro}><Sparkles size={13} aria-hidden="true" />AfiCreator / Content engine</span><span className={styles.micro}>Preview</span></div>
    <div className={styles.deckProduct}><span className={styles.productMark} aria-hidden="true"><FileText size={24} strokeWidth={1.3} /></span><div><span className={styles.micro}>One product. Many stories.</span><strong>Serum Vitamin C 20 ml</strong><span>Product data → Creator-ready content</span></div></div>
    <div className={styles.deckCards} key={format}>{previews[format].map((text, i) => <div key={text} style={{ animationDelay: `${i * 80}ms` }}><span className={styles.micro}>0{i + 1} / {formats[format]}</span><p>{text}</p><ArrowUpRight size={14} aria-hidden="true" /></div>)}</div>
    <div className={styles.deckControls}><button type="button" onClick={() => setFormat((format + 2) % 3)} aria-label="Lihat format sebelumnya"><ChevronLeft size={16} /></button><div role="group" aria-label="Format preview konten">{formats.map((name, i) => <button key={name} type="button" aria-label={name} aria-pressed={i === format} onClick={() => setFormat(i)} />)}</div><button type="button" onClick={() => setFormat((format + 1) % 3)} aria-label="Lihat format berikutnya"><ChevronRight size={16} /></button></div>
    <p className={styles.note}>Contoh output · geser format melalui tombol</p>
  </div>;
}

export function CreatorStudio() {
  const [product, setProduct] = useState(0);
  const [persona, setPersona] = useState(0);
  const [format, setFormat] = useState(0);
  const [batch, setBatch] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const cancel = () => { if (timer.current) clearTimeout(timer.current); setBusy(false); setNotice(""); };
  const output = outputFor(product, persona, batch, format);
  const generate = () => {
    cancel(); setBusy(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 800;
    timer.current = setTimeout(() => { setBatch((value) => (value + 1) % 3); setBusy(false); setNotice("Variasi baru siap dieksplorasi."); }, delay);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${products[product].name}\n${personas[persona]} / ${formats[format]}\n\n${output.join("\n\n")}`);
      setNotice("Output berhasil disalin.");
    } catch { setNotice("Akses clipboard tidak tersedia. Kamu bisa pilih dan salin teks output secara manual."); }
  };
  return <div className={styles.studio}>
    <div className={styles.studioInputs}><span className={styles.micro}>01 / Your input</span><h3>Satu produk.<br />Banyak kemungkinan.</h3>
      <label htmlFor="creator-product">Produk contoh</label><select id="creator-product" value={product} onChange={(event) => { cancel(); setProduct(Number(event.target.value)); }}>{products.map((item, i) => <option key={item.name} value={i}>{item.name}</option>)}</select>
      <label htmlFor="creator-persona">Gaya kreator</label><select id="creator-persona" value={persona} onChange={(event) => { cancel(); setPersona(Number(event.target.value)); }}>{personas.map((name, i) => <option key={name} value={i}>{name}</option>)}</select>
      <div className={styles.productFacts}><span className={styles.micro}>Product intelligence</span><p>{products[product].facts}</p><span>Audience / {products[product].audience}</span></div>
      <button type="button" className={styles.generate} disabled={busy} onClick={generate}><RefreshCw size={14} className={busy ? styles.spinning : ""} aria-hidden="true" />{busy ? "Menyusun variasi..." : "Buat variasi lain"}</button>
      <p className={styles.note}>Demo interaktif dengan contoh tersiapkan. Bukan generasi AI live.</p>
    </div>
    <div className={styles.studioOutput} aria-busy={busy}>
      <div className={styles.outputHeader}><span className={styles.micro}>02 / Creator-ready output</span><button type="button" className={styles.copyButton} aria-label="Salin semua output konten" onClick={copy} disabled={busy}><Copy size={14} aria-hidden="true" />Salin</button></div>
      <div className={styles.formatTabs} role="group" aria-label="Pilih format output">{formats.map((name, i) => <button type="button" key={name} aria-pressed={i === format} onClick={() => { cancel(); setFormat(i); }}>{name}</button>)}</div>
      <div className={`${styles.outputRows} ${busy ? styles.generating : ""}`} key={`${product}-${persona}-${format}-${batch}`}>
        {output.map((text, i) => <article key={text} style={{ animationDelay: `${i * 65}ms` }}><span className={styles.outputNumber}>0{i + 1}</span><p>{text}</p><span className={styles.outputCheck} aria-hidden="true"><Check size={13} /></span></article>)}
      </div>
      <div className={styles.outputFooter}><span><Check size={13} aria-hidden="true" />{personas[persona]}</span><span>{format === 0 ? "Contoh 3 dari 15 hook / produk" : format === 1 ? "Caption dengan angle berbeda" : "Struktur video 30 detik"}</span></div>
      <p className={styles.copyNotice} role="status">{busy ? "Sedang menyiapkan contoh variasi konten." : notice}</p>
    </div>
  </div>;
}

const calendar = [
  { day: "Sen", title: "Start with a hook", type: "TikTok Hooks", detail: "Buka minggu dengan angle baru yang sesuai karakter kreator. Mulai dari product intelligence yang sama.", step: "01 / Awareness" },
  { day: "Sel", title: "Make it personal", type: "Creator Brief", detail: "Bagikan brief yang disesuaikan dengan niche dan gaya penyampaian setiap afiliator.", step: "02 / Personalization" },
  { day: "Rab", title: "Tell the story", type: "IG Captions", detail: "Lengkapi visual dengan caption yang punya konteks produk dan CTA yang jelas.", step: "03 / Conversation" },
  { day: "Kam", title: "Show the details", type: "Creator Brief", detail: "Tunjukkan detail produk melalui demo singkat. Jaga agar pesan dan klaim mengikuti brief brand.", step: "04 / Product story" },
  { day: "Jum", title: "Refresh the angle", type: "TikTok Hooks", detail: "Siapkan variasi hook berikutnya berdasarkan pembaruan informasi produk dan tren kategori.", step: "05 / Weekly refresh" },
];

export function ContentCalendar() {
  const [selected, setSelected] = useState(0);
  return <div className={styles.calendar}><div className={styles.calendarHeading}><span className={styles.micro}>A week of possibilities</span><span className={styles.note}>Jadwal ilustrasi</span></div><div className={styles.calendarDays} role="group" aria-label="Jelajahi contoh kalender konten">{calendar.map((item, i) => <button type="button" key={item.day} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className={styles.micro}>{item.day}</span><span>{item.type}</span><ArrowRight size={15} aria-hidden="true" /></button>)}</div><div className={styles.calendarDetail} key={selected}><span className={styles.micro}>{calendar[selected].step}</span><h3>{calendar[selected].title}</h3><p>{calendar[selected].detail}</p></div></div>;
}
