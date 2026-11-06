"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChartNoAxesCombined, Check, ChevronRight, FileText, Link2, ListChecks, Medal, MessageCircle, Minus, Plus, ReceiptText, RotateCcw, SearchCheck, ShieldCheck, UsersRound, WalletCards, Workflow } from "lucide-react";
import { infrastructure, scaleStages, type InfrastructureId } from "./affiliate-data";
import { calculateAffiliatePayout, DEFAULT_COMMISSION, DEFAULT_SALES, MAX_COMMISSION, MAX_SALES, MIN_COMMISSION, MIN_SALES } from "./payout-model";
import styles from "./affiliate.module.css";

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const formatMoney = (amount: number) => rupiah.format(amount);

export function AffiliateScale() {
  const [selected, setSelected] = useState(0);
  const stage = scaleStages[selected];
  return <div className={styles.scaleExplorer}>
    <div className={styles.scaleOptions} role="group" aria-label="Pilih skenario jumlah afiliator">
      {scaleStages.map((item, index) => <button type="button" key={item.count} aria-pressed={selected === index} aria-controls="affiliate-scale-detail" onClick={() => setSelected(index)}><span><strong>{item.count}</strong><small>afiliator</small></span><span>{item.title}</span>{selected === index ? <Check size={17} aria-hidden="true" /> : <ChevronRight size={17} aria-hidden="true" />}</button>)}
    </div>
    <div id="affiliate-scale-detail" className={styles.scaleDetail} role="region" aria-label="Detail skenario skala program" aria-live="polite">
      <div className={styles.scaleCopy}><span className={styles.label}>Skenario / {stage.count} afiliator</span><h3>{stage.title}</h3><p>{stage.body}</p></div>
      <div className={styles.scaleVisual} key={selected}>
        <div className={styles.visualTop}><span className={styles.label}>Ilustrasi beban operasional</span><ListChecks size={18} aria-hidden="true" /></div>
        <div className={styles.workRows}>{stage.items.map((item, index) => <div key={item}><span className={styles.itemNumber} aria-hidden="true">0{index + 1}</span><span>{item}</span>{selected === 0 ? <MessageCircle size={17} aria-hidden="true" /> : <SearchCheck size={17} aria-hidden="true" />}</div>)}</div>
        <div className={styles.scaleFocus}><Workflow size={20} aria-hidden="true" /><span>{stage.focus}</span></div>
      </div>
    </div>
    <p className={styles.scaleNote}>Ilustrasi tantangan pada referensi Afilabs. Kebutuhan sistem mengikuti proses dan kompleksitas program, bukan hanya jumlah afiliator.</p>
  </div>;
}

export function AffiliatePayout() {
  const [rawSales, setRawSales] = useState(String(DEFAULT_SALES));
  const [rawCommission, setRawCommission] = useState(String(DEFAULT_COMMISSION));
  const [additionalWithholding, setAdditionalWithholding] = useState(false);
  const sales = Number(rawSales);
  const commission = Number(rawCommission);
  const result = calculateAffiliatePayout(sales, commission, additionalWithholding);
  const validSales = Number.isSafeInteger(sales) && sales >= MIN_SALES && sales <= MAX_SALES;
  const validCommission = Number.isInteger(commission) && commission >= MIN_COMMISSION && commission <= MAX_COMMISSION;

  function reset() {
    setRawSales(String(DEFAULT_SALES));
    setRawCommission(String(DEFAULT_COMMISSION));
    setAdditionalWithholding(false);
  }

  return <div className={styles.payoutWorkspace}>
    <div className={styles.payoutControls}>
      <div className={styles.payoutControlsTop}><span className={styles.label}>Atur skenario per afiliator</span><button type="button" className={styles.resetButton} onClick={reset}><RotateCcw size={14} aria-hidden="true" />Reset contoh</button></div>
      <div className={styles.controlGroup}>
        <label htmlFor="affiliate-sales">Penjualan afiliasi / GMV (Rp)</label>
        <div className={styles.numberInput}><span aria-hidden="true">Rp</span><input id="affiliate-sales" type="number" inputMode="numeric" min={MIN_SALES} max={MAX_SALES} step="1" value={rawSales} onChange={(event) => setRawSales(event.target.value)} aria-invalid={!validSales} aria-describedby="affiliate-sales-help" /></div>
        <p id="affiliate-sales-help" className={validSales ? styles.controlHelp : styles.inputError}>{validSales ? "GMV yang diatribusikan kepada satu afiliator." : "Masukkan angka bulat antara Rp10 juta dan Rp500 juta."}</p>
        <label htmlFor="affiliate-sales-range" className={styles.rangeLabel}>Atur nilai GMV</label>
        <input id="affiliate-sales-range" className={styles.range} type="range" min={MIN_SALES} max={MAX_SALES} step="1" value={validSales ? sales : DEFAULT_SALES} onChange={(event) => setRawSales(event.target.value)} onKeyDown={(event) => { const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0; if (!direction) return; event.preventDefault(); setRawSales(String(Math.min(MAX_SALES, Math.max(MIN_SALES, (validSales ? sales : DEFAULT_SALES) + direction * 10_000_000)))); }} aria-valuetext={validSales ? formatMoney(sales) : "GMV belum valid"} />
        <div className={styles.rangeEnds} aria-hidden="true"><span>Rp10 juta</span><span>Rp500 juta</span></div>
      </div>
      <div className={styles.controlGroup}>
        <label htmlFor="affiliate-commission">Komisi afiliasi (%)</label>
        <div className={`${styles.numberInput} ${styles.percentInput}`}><input id="affiliate-commission" type="number" inputMode="numeric" min={MIN_COMMISSION} max={MAX_COMMISSION} step="1" value={rawCommission} onChange={(event) => setRawCommission(event.target.value)} aria-invalid={!validCommission} aria-describedby="affiliate-commission-help" /><span aria-hidden="true">%</span></div>
        <p id="affiliate-commission-help" className={validCommission ? styles.controlHelp : styles.inputError}>{validCommission ? "Pilih persentase bulat untuk skenario simulasi." : "Masukkan persentase bulat antara 5% dan 20%."}</p>
        <label htmlFor="affiliate-commission-range" className={styles.rangeLabel}>Atur persentase komisi</label>
        <input id="affiliate-commission-range" className={styles.range} type="range" min={MIN_COMMISSION} max={MAX_COMMISSION} step="1" value={validCommission ? commission : DEFAULT_COMMISSION} onChange={(event) => setRawCommission(event.target.value)} aria-valuetext={validCommission ? `${commission}%` : "Komisi belum valid"} />
        <div className={styles.rangeEnds} aria-hidden="true"><span>5%</span><span>20%</span></div>
      </div>
      <label className={styles.taxOption}><input type="checkbox" checked={additionalWithholding} onChange={(event) => setAdditionalWithholding(event.target.checked)} /><span><strong>Skenario tanpa NPWP</strong><small>Tambahan 20% pada potongan pajak, mengikuti contoh pada referensi Afilabs.</small></span></label>
    </div>
    <div className={styles.receipt} role="region" aria-label="Ringkasan simulasi payout">
      <div className={styles.receiptTop}><ReceiptText size={26} strokeWidth={1.3} aria-hidden="true" /><div><span className={styles.label}>Payout preview</span><h3>Ringkasan simulasi</h3></div></div>
      {result ? <>
        <p className={styles.receiptScenario}>{additionalWithholding ? "Skenario tambahan potongan" : "Skenario dasar"} / satu afiliator</p>
        <dl className={styles.receiptRows}><div><dt>Total penjualan</dt><dd>{formatMoney(sales)}</dd></div><div><dt>Komisi kotor <small>{commission}% dari GMV</small></dt><dd>{formatMoney(result.grossCommission)}</dd></div><div><dt>Dasar pengenaan pajak <small>50% komisi kotor</small></dt><dd>{formatMoney(result.taxBase)}</dd></div><div><dt>PPh 21 simulasi <small>5% dari DPP{additionalWithholding ? " + penyesuaian 20%" : ""}</small></dt><dd><output aria-label="Potongan pajak simulasi">{formatMoney(result.withholding)}</output></dd></div></dl>
        <div className={styles.netResult}><span className={styles.label}>Estimasi komisi bersih</span><output aria-label="Komisi bersih simulasi" aria-live="polite">{formatMoney(result.netCommission)}</output><p>Komisi kotor dikurangi potongan pada skenario ini.</p></div>
        <div className={styles.receiptFlow} aria-hidden="true"><span>Hitung komisi</span><ArrowRight size={13} /><span>Tinjau potongan</span><ArrowRight size={13} /><span>Siapkan payout</span></div>
      </> : <div className={styles.receiptEmpty} role="status"><ListChecks size={31} strokeWidth={1.3} aria-hidden="true" /><h4>Lengkapi nilai simulasi.</h4><p>Isi GMV dan komisi dalam rentang yang tersedia untuk melihat perkiraan payout.</p></div>}
    </div>
    <p className={styles.payoutNote}>Ilustrasi satu afiliator orang pribadi dalam negeri dengan skenario bukan pegawai. DPP 50% komisi dan tarif dasar 5% berlaku untuk rentang simulasi ini; angka dibulatkan ke rupiah. Pemotongan aktual mengikuti status serta validasi perpajakan.</p>
  </div>;
}

function InfrastructureVisual({ id }: { id: InfrastructureId }) {
  if (id === "hub") return <div className={styles.trackingVisual}><div className={styles.previewCore}><Link2 size={32} strokeWidth={1.3} /><strong>AfiHub Integration</strong><span>Website D2C / tracking server-side</span></div><div className={styles.trackingCells}>{["Klik", "Konversi", "Komisi", "Status payout"].map((label) => <span key={label}><Check size={14} />{label}</span>)}</div></div>;
  if (id === "creator") return <div className={styles.briefVisual}><div className={styles.previewCore}><FileText size={32} strokeWidth={1.3} /><strong>Arahan brand</strong><span>Produk, pesan, dan tujuan konten</span></div><ArrowDown size={23} className={styles.previewArrow} /><div className={styles.nicheCards}><span>Sudut pandang<br /><strong>sesuai niche</strong></span><span>Brief untuk<br /><strong>setiap kreator</strong></span></div></div>;
  if (id === "fraud") return <div className={styles.fraudVisual}><div className={styles.previewCore}><ShieldCheck size={35} strokeWidth={1.3} /><strong>Review atribusi</strong><span>Indikasi untuk ditinjau tim</span></div><div className={styles.signalRows}>{["Self-referral", "Cookie stuffing", "Click inflation"].map((label) => <span key={label}><SearchCheck size={18} />{label}<span>Tinjau</span></span>)}</div></div>;
  if (id === "payout") return <div className={styles.payoutVisual}><div className={styles.previewCore}><WalletCards size={35} strokeWidth={1.3} /><strong>Rancangan batch payout</strong><span>Rekening / e-wallet melalui Xendit</span></div><ol className={styles.payoutSteps}>{["Komisi tervalidasi", "Perhitungan potongan", "Batch payout"].map((label, index) => <li key={label}><span>0{index + 1}</span>{label}{index < 2 ? <ArrowDown size={16} /> : <Check size={16} />}</li>)}</ol></div>;
  if (id === "tiers") return <div className={styles.tierVisual}><Medal size={36} strokeWidth={1.3} /><strong>Ruang untuk berkembang</strong><div className={styles.tierCards}>{["Bronze", "Silver", "Gold"].map((label, index) => <div key={label}><span aria-hidden="true">{Array.from({ length: index + 1 }, (_, key) => <span key={key} />)}</span><strong>{label}</strong></div>)}</div><p>Tingkatan dan komisi mengikuti performa.</p></div>;
  return <div className={styles.insightVisual}><div className={styles.previewCore}><ChartNoAxesCombined size={35} strokeWidth={1.3} /><strong>Performa dalam konteks</strong><span>AfiInsight for Affiliates</span></div><div className={styles.insightLanes}><span><UsersRound size={19} />Temukan potensi</span><span><FileText size={19} />Tentukan dukungan</span><span><SearchCheck size={19} />Tinjau penyesuaian</span></div></div>;
}

export function AffiliateInfrastructure() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const feature = infrastructure[selected];
  return <div className={styles.infrastructureExplorer}>
    <div className={styles.infrastructureList}>{infrastructure.map((item, index) => <div className={styles.infrastructureItem} key={item.id}><h3><button type="button" id={`affiliate-feature-button-${index}`} aria-expanded={expanded === index} aria-controls={`affiliate-feature-body-${index}`} onClick={() => { setSelected(index); setExpanded(expanded === index ? null : index); }}><span className={styles.itemNumber} aria-hidden="true">0{index + 1}</span><span>{item.title}</span>{expanded === index ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</button></h3><div id={`affiliate-feature-body-${index}`} className={styles.featureBody} role="region" aria-labelledby={`affiliate-feature-button-${index}`} hidden={expanded !== index}><p>{item.body}</p>{item.href && item.action && <Link href={item.href} className={styles.textLink}>{item.action}<ArrowUpRight size={14} aria-hidden="true" /></Link>}</div></div>)}</div>
    <div className={styles.infrastructureCanvas}>
      <div className={styles.visualTop}><span className={styles.label}>Affiliate infrastructure</span><span className={styles.visualTag}>Ilustrasi</span></div>
      <div key={feature.id} className={styles.infrastructureScene} aria-hidden="true"><InfrastructureVisual id={feature.id} /></div>
      <div className={styles.infrastructureCaption}><p>{feature.caption}</p><span className={styles.itemNumber}>0{selected + 1} / 06</span></div>
    </div>
  </div>;
}
