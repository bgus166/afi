"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator, Check, ChevronRight, CirclePlus, ReceiptText, RotateCcw, Store } from "lucide-react";
import { calculateCostComparison, DEFAULT_GMV, MAX_GMV, MIN_GMV } from "./cost-model";
import { expansionPhases } from "./marketplace-data";
import styles from "./marketplace.module.css";

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const formatRupiah = (amount: number) => rupiah.format(amount);

export function MarketplaceCalculator() {
  const [rawGMV, setRawGMV] = useState(String(DEFAULT_GMV));
  const gmv = Number(rawGMV);
  const result = calculateCostComparison(gmv);
  const error = rawGMV.trim() === "" ? "Isi GMV bulanan untuk melihat hasil simulasi." : "Gunakan angka bulat antara Rp100 juta dan Rp5 miliar.";

  return <div className={styles.calculator}>
    <div className={styles.calculatorTop}><span><Calculator size={19} strokeWidth={1.5} aria-hidden="true" />Marketplace vs D2C</span><span className={styles.label}>Simulasi biaya</span></div>
    <div className={styles.gmvControls}>
      <div className={styles.gmvHeading}><div><label htmlFor="marketplace-gmv">GMV bulanan yang dibandingkan (Rp)</label><p id="marketplace-gmv-help">Masukkan nilai antara Rp100 juta dan Rp5 miliar.</p></div><div className={styles.numberInput}><span aria-hidden="true">Rp</span><input id="marketplace-gmv" type="number" inputMode="numeric" min={MIN_GMV} max={MAX_GMV} step="1" value={rawGMV} onChange={(event) => setRawGMV(event.target.value)} aria-invalid={!result} aria-describedby={result ? "marketplace-gmv-help" : "marketplace-gmv-help marketplace-gmv-error"} /></div></div>
      {!result && <p id="marketplace-gmv-error" className={styles.inputError} role="alert">{error}</p>}
      <label htmlFor="marketplace-gmv-range" className={styles.rangeLabel}>Atur GMV bulanan</label>
      <input
        id="marketplace-gmv-range"
        className={styles.gmvRange}
        type="range"
        min={MIN_GMV}
        max={MAX_GMV}
        step="1"
        value={result ? gmv : DEFAULT_GMV}
        onChange={(event) => setRawGMV(event.target.value)}
        onKeyDown={(event) => {
          const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0;
          if (!direction) return;
          event.preventDefault();
          const current = result ? gmv : DEFAULT_GMV;
          setRawGMV(String(Math.min(MAX_GMV, Math.max(MIN_GMV, current + direction * 10_000_000))));
        }}
        aria-valuetext={result ? formatRupiah(gmv) : "GMV belum valid"}
      />
      <div className={styles.rangeEnds} aria-hidden="true"><span>Rp100 juta</span><span>Rp5 miliar</span></div>
      <div className={styles.presets} role="group" aria-label="Pilih contoh GMV bulanan">{[{ value: MIN_GMV, label: "Rp100 juta" }, { value: DEFAULT_GMV, label: "Rp1 miliar" }, { value: MAX_GMV, label: "Rp5 miliar" }].map((preset) => <button type="button" key={preset.value} aria-pressed={result ? gmv === preset.value : false} onClick={() => setRawGMV(String(preset.value))}>{preset.label}{result && gmv === preset.value && <Check size={13} aria-hidden="true" />}</button>)}</div>
    </div>

    {result ? <div className={styles.calculationResults}>
      <div className={styles.costColumns}>
        {[{ id: "marketplace", title: "Marketplace", role: "Channel yang sudah berjalan", data: result.marketplace, icon: ReceiptText }, { id: "d2c", title: "Website D2C", role: "Channel milik brand", data: result.d2c, icon: Store }].map(({ id, title, role, data, icon: Icon }) => <section key={id} className={id === "d2c" ? styles.d2cCosts : styles.marketplaceCosts} aria-labelledby={`marketplace-cost-${id}`}>
          <div className={styles.costHeading}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><div><h3 id={`marketplace-cost-${id}`}>{title}</h3><p>{role}</p></div></div>
          <dl className={styles.feeRows}>{data.rows.map((fee) => <div key={fee.label}><dt>{fee.label}<span>Asumsi {fee.percent}%</span></dt><dd>{formatRupiah(fee.amount)}</dd></div>)}</dl>
          <div className={styles.costTotal}><span>Total biaya <strong>{data.percent}%</strong></span><output aria-label={`Total biaya ${title}`}>{formatRupiah(data.total)}</output></div>
        </section>)}
      </div>
      <div className={styles.savingPanel}>
        <div className={styles.savingCopy}><span className={styles.label}>Selisih biaya simulasi</span><div className={styles.monthlySaving}><output aria-label="Selisih biaya per bulan" aria-live="polite">{formatRupiah(result.monthlyDifference)}</output><span>per bulan</span></div><p><strong>{formatRupiah(result.yearlyDifference)}</strong> jika nilai bulanan yang sama dipakai selama 12 bulan.</p></div>
        <div className={styles.costBars} aria-label="Perbandingan asumsi biaya terhadap GMV"><div><span>Marketplace <strong>{result.marketplace.percent}%</strong></span><div className={styles.barTrack} aria-hidden="true"><span className={styles.marketplaceBar} style={{ width: `${result.marketplace.percent}%` }} /></div></div><div><span>Website D2C <strong>{result.d2c.percent}%</strong></span><div className={styles.barTrack} aria-hidden="true"><span className={styles.d2cBar} style={{ width: `${result.d2c.percent}%` }} /></div></div><p>Persentase dari GMV yang sama.</p></div>
      </div>
    </div> : <div className={styles.calculatorEmpty} role="status"><Calculator size={32} strokeWidth={1.3} aria-hidden="true" /><h3>Simulasi menunggu nilai GMV.</h3><p>Masukkan angka dalam rentang yang tersedia atau pilih salah satu contoh di atas.</p><button type="button" className={styles.textLink} onClick={() => setRawGMV(String(DEFAULT_GMV))}><RotateCcw size={15} aria-hidden="true" />Kembalikan contoh Rp1 miliar</button></div>}
    <p className={styles.assumptionNote}>Persentase adalah asumsi ilustratif dari materi Afilabs, bukan tarif aktual. Perbandingan memakai GMV yang sama dan belum memasukkan biaya website, pajak, serta biaya lain. Selisih biaya bukan proyeksi laba.</p>
  </div>;
}

export function MarketplaceExpansion() {
  const [selected, setSelected] = useState(0);
  const phase = expansionPhases[selected];

  return <div className={styles.expansionExplorer}>
    <ol className={styles.phaseOptions} aria-label="Pilih fase ekspansi channel">
      {expansionPhases.map((item, index) => <li key={item.title}><button type="button" aria-pressed={selected === index} aria-controls="marketplace-phase-detail" onClick={() => setSelected(index)}><span className={styles.phaseNumber} aria-hidden="true">0{index + 1}</span><span><small>{item.period}</small><strong>{item.title}</strong></span>{selected === index ? <Check size={18} aria-hidden="true" /> : <ChevronRight size={18} aria-hidden="true" />}</button></li>)}
    </ol>
    <section id="marketplace-phase-detail" className={styles.phaseDetail} aria-label="Detail fase ekspansi" aria-live="polite">
      <div className={styles.phaseTop}><span className={styles.label}>Fase 0{selected + 1} / {phase.period}</span><span className={styles.phaseCounter}>0{selected + 1} / 04</span></div>
      <h3>{phase.heading}</h3><p className={styles.phaseBody}>{phase.body}</p>
      <div key={selected} className={styles.phaseVisual}>
        {phase.target ? <><div className={styles.targetHeading}><div><span className={styles.label}>Target indikatif</span><strong>{phase.target}</strong></div><p>porsi GMV<br />melalui D2C</p></div><div className={styles.portfolioTrack} aria-hidden="true"><span style={{ width: `${phase.targetPercent}%` }} /></div><div className={styles.portfolioLegend}><span>Marketplace tetap berjalan</span><span>Channel D2C bertumbuh</span></div></> : <div className={styles.foundationVisual}><div><Store size={31} strokeWidth={1.3} aria-hidden="true" /><span>Website D2C</span></div><CirclePlus size={22} strokeWidth={1.3} aria-hidden="true" /><div><ReceiptText size={31} strokeWidth={1.3} aria-hidden="true" /><span>Tracking AfiHub</span></div></div>}
        <ul className={styles.phaseFocus}>{phase.focus.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
      </div>
      {phase.services.length > 0 && <div className={styles.phaseServices}>{phase.services.map((service) => <Link href={service.href} key={service.name} className={styles.textLink}>Kenali {service.name}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div>}
      <div className={styles.phaseBottom}><ArrowRight size={16} aria-hidden="true" /><span>Marketplace dan D2C berkembang sebagai satu portofolio.</span></div>
    </section>
  </div>;
}
