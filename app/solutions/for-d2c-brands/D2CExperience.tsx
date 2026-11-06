"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, ChartNoAxesCombined, Check,
  ChevronRight, Database, FileText, Globe2, Link2, MessageCircle,
  Minus, Plus, ReceiptText, Repeat2, ShoppingBag, Store, UsersRound, Workflow,
} from "lucide-react";
import { modules, opportunities, roadmap, type ModuleId } from "./d2c-data";
import styles from "./d2c.module.css";

const moduleIcons = { hub: UsersRound, assist: MessageCircle, creator: FileText, insight: ChartNoAxesCombined, flow: Workflow };

export function D2COpportunity() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);

  return <div className={styles.opportunityExplorer}>
    <div className={styles.opportunityList}>
      {opportunities.map((item, index) => <div className={styles.opportunityItem} key={item.title}>
        <h3>
          <button type="button" id={`d2c-opportunity-button-${index}`} aria-expanded={expanded === index} aria-controls={`d2c-opportunity-body-${index}`} onClick={() => { setSelected(index); setExpanded(expanded === index ? null : index); }}>
            <span className={styles.itemNumber} aria-hidden="true">0{index + 1}</span>
            <span>{item.title}</span>
            {expanded === index ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
          </button>
        </h3>
        <div id={`d2c-opportunity-body-${index}`} role="region" aria-labelledby={`d2c-opportunity-button-${index}`} hidden={expanded !== index} className={styles.opportunityBody}><p>{item.body}</p></div>
      </div>)}
    </div>
    <div className={styles.opportunityVisual} aria-hidden="true">
      <div className={styles.visualTop}><span className={styles.label}>The direct advantage</span><span className={styles.itemNumber}>0{selected + 1} / 03</span></div>
      <div key={selected} className={styles.opportunityScene}>
        {selected === 0 && <>
          <div className={styles.receipt}><ReceiptText size={26} strokeWidth={1.4} /><span>Di balik setiap transaksi</span><div>{["Platform fee", "Komisi afiliasi", "Subsidi ongkir", "Iklan internal"].map((cost) => <span key={cost}>{cost}<Minus size={13} /></span>)}</div></div>
          <div className={styles.visualOutcome}><Store size={21} />Kelola struktur biaya D2C</div>
        </>}
        {selected === 1 && <>
          <div className={styles.customerRecord}><Database size={31} strokeWidth={1.3} /><strong>Konteks pelanggan</strong><span>Di channel milik brand</span></div>
          <div className={styles.dataLayers}>{["Riwayat pembelian", "Segmen pelanggan", "Program loyalitas"].map((label) => <span key={label}><Check size={15} />{label}</span>)}</div>
        </>}
        {selected === 2 && <>
          <div className={styles.relationship}><div><Store size={32} strokeWidth={1.3} /><strong>Brand kamu</strong></div><Repeat2 size={38} strokeWidth={1.2} /><div><UsersRound size={32} strokeWidth={1.3} /><strong>Pelanggan</strong></div></div>
          <div className={styles.relationshipLabels}><span>Kenal produknya</span><span>Kembali ke brand</span></div>
        </>}
      </div>
      <p className={styles.visualCaption}>{opportunities[selected].caption}</p>
    </div>
  </div>;
}

function ModuleVisual({ id }: { id: ModuleId }) {
  if (id === "hub") return <div className={styles.affiliateVisual}>
    <div className={styles.visualHeading}><UsersRound size={22} /><span>Referral yang terhubung ke pesanan</span></div>
    <div className={styles.referralFlow}>
      {[{ icon: UsersRound, label: "Kreator" }, { icon: Link2, label: "Link referral" }, { icon: Store, label: "Website D2C" }, { icon: ShoppingBag, label: "Atribusi pesanan" }].map(({ icon: Icon, label }, index) => <div key={label}><span><Icon size={25} strokeWidth={1.4} /></span><strong>{label}</strong>{index < 3 && <ArrowRight className={styles.flowArrow} size={17} />}</div>)}
    </div>
    <div className={styles.visualFoot}><Link2 size={16} />Pelacakan server-side di website brand</div>
  </div>;

  if (id === "assist") return <div className={styles.chatVisual}>
    <div className={styles.channelLabels}><span><Globe2 size={15} />Website</span><span><MessageCircle size={15} />WhatsApp Business API</span></div>
    <div className={styles.customerBubble}><span>Pelanggan</span><p>Saya ingin melihat pilihan produk.</p></div>
    <div className={styles.assistBubble}><span><MessageCircle size={14} />AfiAssist</span><p>Tentu. Produk apa yang sedang kamu cari?</p></div>
    <span className={styles.exampleLabel}>Contoh percakapan</span>
  </div>;

  if (id === "creator") return <div className={styles.briefVisual}>
    <div className={styles.briefTop}><FileText size={24} strokeWidth={1.4} /><div><span className={styles.label}>Contoh arahan</span><strong>Brief untuk kreator D2C</strong></div></div>
    {[["Tujuan konten", "Kenalkan produk brand"], ["Pesan utama", "Manfaat dan cara pakai"], ["Arahan kreator", "Format konten dan hook"]].map(([title, body], index) => <div className={styles.briefRow} key={title}><span className={styles.itemNumber}>0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div><Check size={15} /></div>)}
  </div>;

  if (id === "insight") return <div className={styles.insightVisual}>
    <div className={styles.sourceLabels}>{["Website", "Marketplace", "Afiliasi"].map((label) => <span key={label}>{label}</span>)}</div>
    <ArrowDown className={styles.downConnector} size={23} />
    <div className={styles.insightCore}><ChartNoAxesCombined size={29} strokeWidth={1.4} /><div><strong>AfiInsight</strong><span>Performa dalam satu konteks</span></div></div>
    <div className={styles.insightQuestions}><span>Channel mana yang perlu ditinjau?</span><span>Apa langkah berikutnya untuk tim?</span></div>
  </div>;

  return <div className={styles.automationVisual}>
    <div className={styles.visualHeading}><Workflow size={22} /><span>Alur operasional yang terhubung</span></div>
    <ol>{["Data pesanan masuk", "Sinkronisasi stok", "Invoice dan rekap", "Payout afiliasi"].map((label, index) => <li key={label}><span className={styles.automationStep}>{index + 1}</span><span>{label}</span>{index === 0 ? <ShoppingBag size={17} /> : index === 3 ? <ReceiptText size={17} /> : <Check size={17} />}</li>)}</ol>
  </div>;
}

export function D2CStack() {
  const [selected, setSelected] = useState(0);
  const module = modules[selected];
  const Icon = moduleIcons[module.id];

  return <div className={styles.stackExplorer}>
    <div className={styles.moduleOptions} role="group" aria-label="Pilih modul ekosistem D2C">
      {modules.map((item, index) => {
        const ItemIcon = moduleIcons[item.id];
        return <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="d2c-module-detail" onClick={() => setSelected(index)}>
          <ItemIcon size={23} strokeWidth={1.5} aria-hidden="true" /><span><strong>{item.name}</strong><small>{item.role}</small></span>{selected === index ? <Check size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
        </button>;
      })}
      <p>Setiap modul punya peran.<br />Datanya saling terhubung.</p>
    </div>
    <section id="d2c-module-detail" className={styles.moduleDetail} aria-labelledby="d2c-module-title">
      <div className={styles.moduleHeading}>
        <div><span className={styles.label}>02 / Stack AI D2C</span><h3 id="d2c-module-title"><Icon size={24} strokeWidth={1.5} aria-hidden="true" />{module.name}</h3></div>
        <span className={styles.itemNumber}>0{selected + 1} / 05</span>
      </div>
      <p className={styles.moduleDescription} aria-live="polite">{module.description}</p>
      <div className={styles.moduleCanvas} key={module.id} aria-hidden="true"><ModuleVisual id={module.id} /></div>
      <div className={styles.moduleConnection}><span>{module.connection}</span>{module.href && <Link className={styles.textLink} href={module.href}>Kenali {module.name}<ArrowUpRight size={15} aria-hidden="true" /></Link>}</div>
      <p className={styles.illustrationNote}>Ilustrasi cara kerja. Integrasi mengikuti kebutuhan brand.</p>
    </section>
  </div>;
}

export function D2CRoadmap() {
  const [selected, setSelected] = useState(0);
  const stage = roadmap[selected];

  return <div className={styles.roadmapExplorer}>
    <div className={styles.roadmapSummary}><span>Audit → bangun → evaluasi</span><span>6 tahap / ±90 hari</span></div>
    <ol className={styles.roadmapSteps} aria-label="Pilih tahap rencana D2C">
      {roadmap.map((item, index) => <li key={item.title}>
        <button type="button" aria-pressed={selected === index} aria-controls="d2c-roadmap-detail" onClick={() => setSelected(index)}>
          <span className={styles.stageNumber} aria-hidden="true">0{index + 1}</span><span className={styles.stageWeeks}>{item.weeks}</span><strong>{item.title}</strong>{selected === index ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
        </button>
      </li>)}
    </ol>
    <div id="d2c-roadmap-detail" className={styles.roadmapDetail} role="region" aria-label="Detail tahap rencana D2C" aria-live="polite">
      <div className={styles.stageCopy}><span className={styles.label}>Tahap 0{selected + 1} / {stage.weeks}</span><h3>{stage.title}</h3><p>{stage.body}</p></div>
      <div className={styles.stageVisual}>
        <span className={styles.label}>Fokus tahap</span>
        <strong>{stage.focus}</strong>
        <div key={selected} className={styles.stageNodes}>{stage.nodes.map((node, index) => <span key={node}>{index > 0 && <ArrowDown size={15} aria-hidden="true" />}<span>{node}</span></span>)}</div>
      </div>
    </div>
    <p className={styles.roadmapNote}>Rencana awal. Urutan dan durasi disesuaikan dengan hasil audit serta kesiapan integrasi.</p>
  </div>;
}
