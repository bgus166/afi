import Link from "next/link";
import { ArrowUpRight, Check, FileText, MessageCircle, Sparkles } from "lucide-react";
import { heroServices } from "./workspaceData";
import styles from "./hero-split.module.css";

export function HeroServiceCard({ index }: { index: number }) {
  const service = heroServices[index];
  return <article className={styles.serviceCard}>
    <div className={styles.cardCategory}><span>0{index + 1} / {service.category}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
    <div className={`${styles.miniUI} ${styles[service.key]}`} aria-hidden="true">
      {service.key === "assist" && <><span className={styles.miniLabel}><MessageCircle size={13} />Customer inbox</span><div className={styles.bubble}>Produk ready, Kak?</div><div className={styles.bubble}>Ready. Ini detailnya. <Check size={11} /></div><span className={styles.typing}>● ● ●</span></>}
      {service.key === "creator" && <><span className={styles.miniLabel}><FileText size={13} />Creator brief</span><div className={styles.brief}><span>Hook / 01</span><p>Satu produk.<br />Cerita versi kamu.</p></div><i /><i /></>}
      {service.key === "insight" && <><span className={styles.miniLabel}>Weekly view</span><div className={styles.miniBars}>{[25, 45, 35, 60, 55, 80, 95].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><span className={styles.insightNote}><Sparkles size={11} />Insight → action items</span></>}
      {service.key === "flow" && <><span className={styles.miniLabel}>Trigger → result</span><div className={styles.miniWorkflow}><span>Order masuk</span><i /><span>Proses data</span><i /><span>Laporan siap <Check size={11} /></span></div></>}
    </div>
    <div className={styles.cardCopy}><h3>{service.name}</h3><p>{service.description}</p></div>
    <Link href={service.href} className={styles.cardLink}>Kenali {service.name}<ArrowUpRight size={14} aria-hidden="true" /></Link>
  </article>;
}
