"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Minus } from "lucide-react";
import styles from "./pricing.module.css";

const models = [
  { id: "project", number: "01", name: "Project-based", short: "Kebutuhan spesifik", price: "35", unit: "juta", prefix: "Mulai dari", cadence: "sekali bayar", summary: "Untuk kebutuhan spesifik dengan cakupan yang jelas sejak awal.", details: ["AI Readiness Audit gratis", "Desain dan arsitektur solusi AI", "Build dan deployment penuh", "Training dan video SOP untuk tim", "Support dan monitoring selama 30 hari"], excluded: ["Optimasi bulanan berkelanjutan", "Fitur baru setelah 30 hari", "Biaya API pihak ketiga"], note: "Selesai setelah sistem diserahterimakan.", action: "Get Project Quote" },
  { id: "retainer", number: "02", name: "Monthly Retainer", short: "Kemitraan berkelanjutan", price: "15–45", unit: "juta", prefix: "Rentang biaya", cadence: "/ bulan", summary: "Untuk brand yang membutuhkan partner jangka panjang dan optimasi berkelanjutan.", details: ["AI Readiness Audit di awal", "Peningkatan build prioritas", "Review bisnis bulanan selama 60 menit", "Dukungan siaga melalui Slack atau WhatsApp", "Penyesuaian tanpa batas dalam scope", "Update performa setiap kuartal"], excluded: [], note: "Komitmen awal minimal 3 bulan, lalu berlanjut bulanan.", action: "Discuss Retainer" },
  { id: "performance", number: "03", name: "Performance-based", short: "Tumbuh bersama", price: "8–15", unit: "juta", prefix: "Base retainer", cadence: "/ bulan + 1–3% share", summary: "Untuk brand dengan traksi stabil yang ingin menyelaraskan biaya dengan pertumbuhan.", details: ["Retainer dasar lebih rendah", "Komisi 1–3% dari pertumbuhan GMV", "Afilabs ikut berbagi risiko pertumbuhan", "Untuk brand dengan GMV di atas Rp 500 juta per bulan", "Akses dashboard finansial penuh"], excluded: [], note: "Membutuhkan komitmen kemitraan minimal 6 bulan.", action: "Explore Performance Model" },
];

export function PricingExplorer() {
  const [selected, setSelected] = useState(0);
  const model = models[selected];
  return <section id="models" className={styles.models} aria-labelledby="models-title"><div className={styles.container}>
    <div className={styles.sectionHead}><div><p className="section-label">01 / How we price</p><h2 id="models-title">Tiga cara bekerja sama.<br /><span>Pilih yang paling pas.</span></h2></div><p>Mulai dari project yang terarah sampai kemitraan yang tumbuh bersama bisnis kamu.</p></div>
    <div className={styles.modelPicker} role="group" aria-label="Pilih model kerja sama">{models.map((item, index) => <button type="button" key={item.id} aria-pressed={selected === index} className={selected === index ? styles.activeModel : ""} onClick={() => setSelected(index)}><span className={styles.pickerTop}><span>{item.number} / MODEL</span><ArrowDownRight size={17} aria-hidden="true" /></span><span className={styles.pickerName}>{item.name}</span><span className={styles.pickerShort}>{item.short}</span><span className={styles.pickerPrice}><small>{item.prefix} </small>Rp {item.price} jt <small>{item.cadence}</small></span></button>)}</div>
    <div className={styles.detailPanel} aria-live="polite"><div className={styles.detailMain} key={model.id}><div className={styles.detailTop}><span>{model.number} / {model.name}</span><span>MODEL KERJA SAMA</span></div><div className={styles.detailBody}><p className={styles.priceLabel}>{model.prefix}</p><p className={styles.price}><span>Rp</span> {model.price} <small>{model.unit}</small></p><p className={styles.cadence}>{model.cadence}</p><h3>{model.name}</h3><p className={styles.summary}>{model.summary}</p><p className={styles.note}>{model.note}</p><a href="https://afilabs.id/contact" className={styles.primary}>{model.action} <ArrowUpRight size={16} aria-hidden="true" /></a></div><span className={styles.watermark} aria-hidden="true">{model.number}</span></div>
      <div className={styles.detailFeatures} key={`${model.id}-features`}><div className={styles.detailTop}><span>WHAT’S INCLUDED</span><span>{model.number} / 03</span></div><h3>Yang kamu dapatkan.</h3><ul>{model.details.map(item => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>{model.excluded.length > 0 && <><p className={styles.excludedTitle}>Tidak termasuk</p><ul className={styles.excluded}>{model.excluded.map(item => <li key={item}><Minus size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul></>}</div>
    </div>
    <p className={styles.pricingNote}>Harga dapat disesuaikan dengan kebutuhan dan scope bisnis. Biaya platform pihak ketiga dibayar langsung ke penyedia.</p>
  </div></section>;
}
