"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Activity, ArrowDown, ArrowDownUp, ArrowUpRight, BarChart3, Check, ChevronRight, CircleAlert, Database, Layers3, Sparkles } from "lucide-react";
import { channels, compactRupiah, number, recordsFor, rupiah, totalsFor, type Channel, type Period } from "./insightData";
import styles from "./insight.module.css";

function TrendChart({ values, labels, label, money = true, compact = false }: { values: number[]; labels: string[]; label: string; money?: boolean; compact?: boolean }) {
  const [point, setPoint] = useState<number | null>(null);
  const id = useId();
  const selected = Math.min(point ?? values.length - 1, values.length - 1);
  const ceiling = Math.max(...values, 1) * 1.16;
  const x = (index: number) => 24 + index * 552 / Math.max(1, values.length - 1);
  const y = (value: number) => 180 - value / ceiling * 152;
  const line = values.map((value, i) => `${i ? "L" : "M"}${x(i)},${y(value)}`).join(" ");
  const format = money ? rupiah : number;
  function move(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    setPoint(event.key === "Home" ? 0 : event.key === "End" ? values.length - 1 : Math.max(0, Math.min(values.length - 1, selected + (event.key === "ArrowRight" ? 1 : -1))));
  }
  function selectPoint(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setPoint(Math.max(0, Math.min(values.length - 1, Math.round((ratio * 600 - 24) / 552 * (values.length - 1)))));
  }
  return <div className={`${styles.chart} ${compact ? styles.compactChart : ""}`}>
    <div className={styles.chartCaption}><span>{label}</span><strong>{labels[selected]} <span>/</span> {format(values[selected])}</strong></div>
    <div className={styles.chartControl} tabIndex={0} role="slider" aria-label={label} aria-valuemin={1} aria-valuemax={values.length} aria-valuenow={selected + 1} aria-valuetext={`${labels[selected]}, ${format(values[selected])}`} aria-describedby={`${id}-help`} onKeyDown={move} onBlur={() => setPoint(null)} onPointerLeave={() => setPoint(null)} onPointerMove={selectPoint} onPointerDown={selectPoint}>
      <svg viewBox="0 0 600 190" aria-hidden="true">
        <defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6077c0" stopOpacity=".23" /><stop offset="1" stopColor="#6077c0" stopOpacity="0" /></linearGradient></defs>
        {[28, 78, 129, 180].map((position) => <line key={position} x1="24" x2="576" y1={position} y2={position} className={styles.gridLine} />)}
        <path d={`${line} L576,180 L24,180 Z`} fill={`url(#${id}-fill)`} />
        <path className={styles.chartLine} d={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" pathLength="1" />
        <line x1={x(selected)} x2={x(selected)} y1="20" y2="180" className={styles.crosshair} />
        <circle cx={x(selected)} cy={y(values[selected])} r="5" fill="currentColor" stroke="var(--background)" strokeWidth="3" />
      </svg>
    </div>
    <div className={styles.chartDates} aria-hidden="true"><span>{labels[0]}</span><span>{labels.at(-1)}</span></div>
    <p id={`${id}-help`} className={styles.chartHelp}>Geser di grafik atau gunakan tombol ← → saat grafik terfokus.</p>
  </div>;
}

export function InsightPreview() {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const records = recordsFor(7, "all");
  const total = totalsFor(records);
  return <div className={styles.preview}>
    <div className={styles.windowTop}><span><BarChart3 size={14} aria-hidden="true" /> AfiInsight</span><span className={styles.sample}>Data ilustrasi</span></div>
    <div className={styles.previewBody}><span className={styles.micro}>THE BUSINESS, IN FOCUS</span><div className={styles.previewValue} key={`value-${metric}`}>{metric === "revenue" ? compactRupiah(total.revenue) : number(total.orders)}<span>{metric === "revenue" ? "GMV / 7 hari" : "Order / 7 hari"}</span></div>
      <div className={styles.segment} role="group" aria-label="Metrik preview"><button type="button" aria-pressed={metric === "revenue"} onClick={() => setMetric("revenue")}>GMV</button><button type="button" aria-pressed={metric === "orders"} onClick={() => setMetric("orders")}>Order</button></div>
      <TrendChart key={metric} compact values={records.map((item) => item[metric])} labels={records.map((item) => item.label)} label="Tren preview" money={metric === "revenue"} />
      <div className={styles.previewNote}><Sparkles size={15} aria-hidden="true" /><p><strong>Dari angka, ke pertanyaan yang tepat.</strong>Channel mana yang paling layak kamu prioritaskan?</p><ArrowUpRight size={17} aria-hidden="true" /></div>
    </div>
  </div>;
}

const journey = [
  { title: "Connect", tag: "Satukan konteksnya", body: "Hubungkan AfiHub, toko online, marketplace, dan analytics dalam satu pandangan.", output: "Data berbeda. Satu konteks.", icon: Database },
  { title: "Analyze", tag: "Temukan sinyalnya", body: "Baca pola performa, perilaku pelanggan, dan anomali yang perlu diperhatikan.", output: "Sinyal yang perlu ditelusuri.", icon: Activity },
  { title: "Act", tag: "Tentukan langkahnya", body: "Terima tiga insight, tiga tindakan, dan satu early warning dalam laporan mingguan.", output: "Tim tahu apa yang didahulukan.", icon: Sparkles },
];
const sources = [
  { name: "AfiHub", detail: "Program afiliasi dan kontribusi kreator." },
  { name: "Shopify / Woo", detail: "Order dari website dan nilai transaksi." },
  { name: "Marketplace", detail: "Performa penjualan per platform." },
  { name: "Analytics", detail: "Kunjungan dan perilaku di website." },
];

export function IntelligenceJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [source, setSource] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches) return;
      const articles = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-insight-step]") ?? []);
      const readingLine = window.innerHeight * .45;
      // Reading the current positions also handles large scroll jumps that
      // can skip the narrow activation band of an IntersectionObserver.
      let next = 0;
      articles.forEach((article, index) => { if (article.getBoundingClientRect().top <= readingLine) next = index; });
      setStep(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule); media.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule); };
  }, []);
  const Icon = journey[step].icon;
  return <div ref={root} className={styles.journey}>
    <div className={styles.journeySticky}>
      <div className={styles.journeyCanvas}><div className={styles.windowTop}><span>AFI / INTELLIGENCE ENGINE</span><span>0{step + 1} / 03</span></div>
        <div key={step} className={styles.journeyScene}>
          {step === 0 ? <><div className={styles.sourceGrid} role="group" aria-label="Jelajahi sumber data">{sources.map((item, i) => <button type="button" key={item.name} aria-pressed={source === i} onClick={() => setSource(i)}><Layers3 size={16} aria-hidden="true" />{item.name}<span /></button>)}</div><div className={styles.connectionLines} aria-hidden="true"><i /><i /><i /><i /></div><p className={styles.sourceDetail} aria-live="polite">{sources[source].detail}</p></> : step === 1 ? <div className={styles.pattern}><span className={styles.micro}>EXAMPLE / SIGNAL DETECTED</span><div aria-hidden="true">{[30, 45, 35, 60, 42, 69, 48, 78, 57, 96, 68, 86].map((height, i) => <i key={i} style={{ height: `${height}%`, animationDelay: `${i * 45}ms` }} />)}</div><p>Perubahan kecil.<br /><strong>Konteks yang lebih besar.</strong></p></div> : <div className={styles.reportStack}>{["03 insight untuk ditinjau", "03 langkah untuk dipilih", "01 sinyal untuk diwaspadai"].map((text, i) => <div key={text} style={{ animationDelay: `${i * 100}ms` }}><Check size={16} aria-hidden="true" />{text}</div>)}</div>}
          <div className={styles.engineCore}><Icon size={21} aria-hidden="true" /><span>{journey[step].output}</span></div>
        </div>
      </div>
      <div className={styles.journeyNav} role="group" aria-label="Tahap AfiInsight">{journey.map((item, i) => <button key={item.title} type="button" aria-pressed={step === i} onClick={() => {
        setStep(i);
        if (window.matchMedia("(min-width: 761px)").matches) {
          const article = document.getElementById(`insight-step-${i}`);
          if (article) window.scrollTo({ top: window.scrollY + article.getBoundingClientRect().top - (window.innerHeight - article.offsetHeight) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }
      }}><span>0{i + 1}</span>{item.title}<ArrowDown size={12} aria-hidden="true" /></button>)}</div>
    </div>
    <div>{journey.map((item, i) => <article key={item.title} id={`insight-step-${i}`} data-insight-step={i} className={`${styles.journeyStep} ${step === i ? styles.activeStep : ""}`}><span className={styles.stepNumber}>0{i + 1}</span><span className={styles.micro}>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
  </div>;
}

const views = ["GMV Overview", "Affiliate Performance", "Customer Intelligence", "Operations Health", "Weekly AI Report"];
const creators = [{ name: "Kreator A", share: .38 }, { name: "Kreator B", share: .29 }, { name: "Kreator C", share: .21 }, { name: "Kreator D", share: .12 }];

function Metrics({ items }: { items: { label: string; value: string; note: string }[] }) {
  return <div className={styles.metrics}>{items.map((item, i) => <div key={item.label} style={{ animationDelay: `${i * 65}ms` }}><span>{item.label}</span><strong key={item.value}>{item.value}</strong><small>{item.note}</small></div>)}</div>;
}

export function InsightDashboard() {
  const id = useId();
  const [view, setView] = useState(0);
  const [period, setPeriod] = useState<Period>(30);
  const [channel, setChannel] = useState<Channel>("all");
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const [ascending, setAscending] = useState(false);
  const [cohort, setCohort] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const effectiveChannel = view === 1 ? "affiliate" : view === 2 ? (["all", "affiliate", "website"] as const)[cohort] : channel;
  const records = recordsFor(period, effectiveChannel);
  const total = totalsFor(records);
  const repeat = Math.round(total.orders * [ .32, .41, .26 ][cohort]);
  const cohortLabels = ["Semua pelanggan", "Pelanggan afiliasi", "Pelanggan website"];
  return <div className={styles.dashboard}>
    <div className={styles.dashboardTop}><span className={styles.brand}><BarChart3 size={18} aria-hidden="true" />AfiInsight <span>/ WORKSPACE PREVIEW</span></span><span className={styles.sample}>Demo · data ilustrasi Oktober</span></div>
    <div className={styles.dashboardTabs} role="tablist" aria-label="Area dashboard" onKeyDown={(event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 4 : (view + (event.key === "ArrowRight" ? 1 : 4)) % 5; setView(next); tabRefs.current[next]?.focus();
    }}>{views.map((name, i) => <button ref={(element) => { tabRefs.current[i] = element; }} key={name} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={view === i} aria-controls={`${id}-panel`} tabIndex={view === i ? 0 : -1} onClick={() => setView(i)}>{name}</button>)}</div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${view}`} className={styles.dashboardBody} tabIndex={0}>
      <div className={styles.dashboardHeading}><div><span className={styles.micro}>YOUR NEXT DECISION STARTS HERE</span><h3>{views[view]}</h3></div>{view !== 4 && <div className={styles.filters}>
        <div className={styles.segment} role="group" aria-label="Periode dashboard">{([7, 30] as const).map((days) => <button key={days} type="button" aria-pressed={period === days} onClick={() => setPeriod(days)}>{days} hari</button>)}</div>
        {view === 1 || view === 2 ? <span className={styles.fixedFilter}>{view === 1 ? "Channel / Afiliasi" : "Pilih segmen di bawah"}</span> : <label><span className={styles.srOnly}>Channel dashboard</span><select value={channel} onChange={(event) => setChannel(event.target.value as Channel)} aria-label="Channel dashboard">{channels.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>}
      </div>}</div>
      <div key={view} className={styles.viewContent}>
        {view === 0 && <><Metrics items={[{ label: "Total GMV", value: compactRupiah(total.revenue), note: `Akumulasi ${period} hari terpilih` }, { label: "Order", value: number(total.orders), note: "Jumlah order dalam contoh" }, { label: "Rata-rata order", value: rupiah(total.basket), note: "Total GMV ÷ jumlah order" }]} />
          <div className={styles.chartToolbar}><span className={styles.micro}>DAILY PERFORMANCE</span><div className={styles.segment} role="group" aria-label="Metrik grafik"><button type="button" aria-pressed={metric === "revenue"} onClick={() => setMetric("revenue")}>GMV</button><button type="button" aria-pressed={metric === "orders"} onClick={() => setMetric("orders")}>Order</button></div></div>
          <TrendChart key={`${period}-${channel}-${metric}`} values={records.map((item) => item[metric])} labels={records.map((item) => item.label)} label={metric === "revenue" ? "GMV per hari" : "Order per hari"} money={metric === "revenue"} />
          <div className={styles.channelMix}>{(channel === "all" ? channels.slice(1) : channels.filter((item) => item.value === channel)).map((item) => <div key={item.value}><span>{item.label}</span><strong>{compactRupiah(channel === "all" ? total.revenue * item.share : total.revenue)}</strong><i style={{ ["--share" as string]: `${channel === "all" ? item.share * 100 : 100}%` }} /></div>)}</div></>}
        {view === 1 && <><Metrics items={[{ label: "GMV afiliasi", value: compactRupiah(total.revenue), note: "Kontribusi channel afiliasi" }, { label: "Order afiliasi", value: number(total.orders), note: `Periode ${period} hari` }, { label: "Kreator contoh", value: "04", note: "Nama ilustrasi, bukan data klien" }]} /><div className={styles.tableWrap}><table><caption>Kontribusi kreator · data ilustrasi</caption><thead><tr><th scope="col">Kreator</th><th scope="col"><button type="button" onClick={() => setAscending(!ascending)} aria-label={`Urutkan GMV ${ascending ? "terbesar" : "terkecil"}`}>GMV <ArrowDownUp size={12} aria-hidden="true" /></button></th><th scope="col">Kontribusi</th></tr></thead><tbody>{[...creators].sort((a, b) => ascending ? a.share - b.share : b.share - a.share).map((item, i) => <tr key={item.name}><td><span className={styles.creatorBadge}>{item.name.at(-1)}</span>{item.name}</td><td>{compactRupiah(total.revenue * item.share)}</td><td><span className={styles.contribution}><i style={{ width: `${item.share * 200}%` }} />{Math.round(item.share * 100)}%</span><span className={styles.srOnly}>Peringkat {i + 1}</span></td></tr>)}</tbody></table></div></>}
        {view === 2 && <><div className={styles.cohortControls} role="group" aria-label="Segmen pelanggan">{cohortLabels.map((name, i) => <button key={name} type="button" aria-pressed={cohort === i} onClick={() => setCohort(i)}>{name}</button>)}</div><Metrics items={[{ label: "Order dari pelanggan kembali", value: number(repeat), note: "Estimasi ilustratif per segmen" }, { label: "Repeat order rate", value: `${[32, 41, 26][cohort]}%`, note: "Persentase contoh, bukan benchmark" }, { label: "Nilai order rata-rata", value: rupiah(total.basket), note: "Mengikuti segmen pelanggan" }]} /><div className={styles.cohorts}><div><span className={styles.micro}>RETURNING CUSTOMER / EXAMPLE</span><h4>Pembelian pertama<br />bukan akhir cerita.</h4><p>Bandingkan pola pembelian ulang untuk menentukan pertanyaan berikutnya bagi tim.</p></div><div key={cohort}>{[100, [68, 75, 60][cohort], [49, 56, 42][cohort], [32, 41, 26][cohort]].map((value, i) => <div className={styles.cohortRow} key={i}><span>{i === 0 ? "Awal" : `Minggu ${i}`}</span><div><i style={{ width: `${value}%` }} /></div><strong>{value}%</strong></div>)}<p className={styles.note}>Kurva cohort ilustrasi · bukan tingkat retensi aktual.</p></div></div></>}
        {view === 3 && <><Metrics items={[{ label: "Order dipantau", value: number(total.orders), note: `Periode ${period} hari` }, { label: "Perlu pengecekan", value: number(Math.ceil(total.orders * .03)), note: "Contoh 3% dari order terpilih" }, { label: "Status demo", value: "Review", note: "Buka sinyal untuk melihat konteks" }]} /><div className={styles.alerts}>{[
          { label: "Return produk meningkat", tag: "Prioritas tinggi", body: "Contoh: return naik dari 2% menjadi 4% dalam satu minggu. Tinjau alasan retur dan batch produk sebelum menarik kesimpulan.", next: "Cek alasan return bersama tim produk." },
          { label: "Antrian chat bertambah", tag: "Perlu ditinjau", body: "Contoh: beberapa percakapan melewati target respons internal. Periksa jam sibuk dan jenis pertanyaan yang berulang.", next: "Petakan pertanyaan berulang bersama tim CS." },
          { label: "Order belum diperbarui", tag: "Pantau", body: "Contoh: status pengiriman belum berubah. Cocokkan catatan gudang dan kurir agar tim memahami sumber keterlambatan.", next: "Verifikasi status ke tim operasional." },
        ].map((alert, i) => <details key={alert.label}><summary><span className={i === 0 ? styles.warningIcon : styles.normalIcon}><CircleAlert size={17} aria-hidden="true" /></span><span>{alert.label}<small>{alert.tag}</small></span><ChevronRight size={16} aria-hidden="true" /></summary><div><p>{alert.body}</p><strong>{alert.next}</strong></div></details>)}</div></>}
        {view === 4 && <WeeklyIntelligence compact />}
      </div>
    </div>
    <div className={styles.dashboardFoot}><span>Semua angka dan nama dalam demo adalah ilustrasi.</span><span>Tanpa koneksi ke data bisnis.</span></div>
  </div>;
}

const reports = [
  { week: "19–25 Oktober", theme: "Kenali sumber momentum.", insights: ["Kontribusi kreator A paling besar dalam contoh minggu ini.", "Order website punya nilai rata-rata lebih tinggi.", "Pembelian ulang memberi konteks tambahan bagi tim."], actions: ["Tinjau konten kreator A sebelum memperluas brief.", "Bandingkan pengalaman checkout website.", "Diskusikan follow-up pelanggan dengan tim CRM."], warning: "Return produk perlu ditelusuri sebelum menaikkan volume promosi." },
  { week: "12–18 Oktober", theme: "Rapikan fondasi minggu depan.", insights: ["Sebagian penjualan terkonsentrasi pada satu produk.", "Jam sibuk CS bersamaan dengan puncak order.", "Ada kreator dengan volume kecil yang layak ditinjau."], actions: ["Periksa stok produk yang paling sering dipesan.", "Sesuaikan jadwal CS dengan jam order.", "Evaluasi materi dan profil kreator baru."], warning: "Ketergantungan pada satu produk perlu dibahas bersama tim." },
];

export function WeeklyIntelligence({ compact = false }: { compact?: boolean }) {
  const [week, setWeek] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const report = reports[week];
  const count = report.actions.filter((_, i) => completed.includes(`${week}-${i}`)).length;
  return <div className={`${styles.weekly} ${compact ? styles.weeklyCompact : ""}`}>
    <div className={styles.weeklyIntro}><span className={styles.micro}><Sparkles size={14} aria-hidden="true" />MONDAY / INTELLIGENCE BRIEF</span><h3>{report.theme}</h3><p>Contoh laporan mingguan. Baca sinyalnya, lalu pilih langkah yang ingin kamu tandai dalam demo.</p><label>Minggu contoh<select aria-label="Minggu laporan" value={week} onChange={(event) => setWeek(Number(event.target.value))}>{reports.map((item, i) => <option key={item.week} value={i}>{item.week}</option>)}</select></label><div className={styles.reportProgress}><span>Rencana ditandai <strong aria-live="polite">{count} / 3</strong></span><div role="progressbar" aria-label="Rencana ditandai" aria-valuenow={count} aria-valuemin={0} aria-valuemax={3}><i style={{ width: `${count / 3 * 100}%` }} /></div></div><p className={styles.note}>Penanda hanya untuk eksplorasi di halaman ini.</p></div>
    <div className={styles.weeklyPaper} key={week}><div className={styles.paperTop}><span>AFI / WEEKLY INTELLIGENCE</span><span>{report.week}</span></div><span className={styles.micro}>03 / INSIGHT UNTUK DITINJAU</span><ol className={styles.insightList}>{report.insights.map((text, i) => <li key={text}><span>0{i + 1}</span><p>{text}</p></li>)}</ol><span className={styles.micro}>03 / LANGKAH BERIKUTNYA</span><div className={styles.actionList}>{report.actions.map((text, i) => { const key = `${week}-${i}`; return <label key={key}><input type="checkbox" checked={completed.includes(key)} onChange={() => setCompleted((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])} /><span>{text}</span><Check size={14} aria-hidden="true" /></label>; })}</div><div className={styles.earlyWarning}><CircleAlert size={17} aria-hidden="true" /><div><strong>01 / EARLY WARNING</strong><p>{report.warning}</p></div></div><p className={styles.note}>Contoh tersiapkan, bukan analisis AI langsung atau hasil klien.</p></div>
  </div>;
}
