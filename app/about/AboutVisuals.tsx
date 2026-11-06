"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight, BarChart3, Check, ChevronRight, Database, Eye, FileText,
  MapPin, MessageCircle, Search, ShieldCheck, Workflow,
} from "lucide-react";
import styles from "./about-visuals.module.css";

const stages = [
  { name: "Pahami", title: "Mulai dari konteks bisnis.", detail: "Kenali kebutuhan, percakapan, dan pekerjaan tim.", icon: Search },
  { name: "Bangun", title: "Hubungkan cara kerjanya.", detail: "Susun sistem AI di sekitar kebutuhan yang sudah dipahami.", icon: Workflow },
  { name: "Ukur", title: "Tinjau dampaknya bersama.", detail: "Lihat perubahan operasional dan tentukan langkah berikutnya.", icon: BarChart3 },
];

export function AboutHeroVisual() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];

  return (
    <div className={styles.heroVisual}>
      <div className={styles.scene}>
        <div className={styles.sceneTop}><span>Afilabs / The way we build</span><span>Ilustrasi</span></div>
        <div className={styles.sceneBackdrop} aria-hidden="true" />
        <Image
          src="/images/results/afiflow.png"
          width={1122}
          height={1402}
          alt=""
          sizes="(max-width: 760px) 70vw, (max-width: 1000px) 55vw, 390px"
          loading="eager"
          fetchPriority="high"
          className={styles.heroIllustration}
        />
        <div className={`${styles.floatingCard} ${styles.contextCard}`} data-active={selected === 0}>
          <MessageCircle size={20} aria-hidden="true" /><span><small>Pahami</small>Konteks bisnis</span>
        </div>
        <div className={`${styles.floatingCard} ${styles.systemCard}`} data-active={selected === 1}>
          <Workflow size={20} aria-hidden="true" /><span><small>Bangun</small>Sistem terhubung</span>
        </div>
        <div className={`${styles.floatingCard} ${styles.outcomeCard}`} data-active={selected === 2}>
          <BarChart3 size={20} aria-hidden="true" /><span><small>Ukur</small>Dampak bisnis</span>
        </div>
        <div className={styles.sceneFooter}><span>Bisnis kamu, titik mulainya.</span><span>0{selected + 1} / 03</span></div>
      </div>
      <div className={styles.stagePicker} role="group" aria-label="Jelajahi pendekatan Afilabs">
        {stages.map((item, index) => {
          const Icon = item.icon;
          return <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
            <Icon size={16} aria-hidden="true" /><span>{item.name}</span>{selected === index && <Check size={13} aria-hidden="true" />}
          </button>;
        })}
      </div>
      <div className={styles.stageCaption} aria-live="polite" aria-atomic="true">
        <p key={stage.title}><strong>{stage.title}</strong><span>{stage.detail}</span></p>
      </div>
    </div>
  );
}

const principleScenes = [
  { label: "Dampak yang ditinjau", title: "Sistem. Operasional. Hasil.", icon: BarChart3 },
  { label: "Kendali yang tetap di tim", title: "Terbuka untuk dipahami.", icon: Eye },
  { label: "Dibangun dari konteks lokal", title: "Dekat dengan keseharian.", icon: MapPin },
];

export function AboutPrinciples({ items }: { items: { title: string; body: string }[] }) {
  const [selected, setSelected] = useState(0);
  const scene = principleScenes[selected];
  const SceneIcon = scene.icon;

  return (
    <div className={styles.principlesExplorer}>
      <div className={styles.principleOptions} role="group" aria-label="Pilih prinsip Afilabs">
        {items.map((item, index) => {
          const Icon = principleScenes[index].icon;
          return <button key={item.title} type="button" aria-pressed={selected === index} aria-controls="about-principle-preview" onClick={() => setSelected(index)}>
            <span className={styles.optionIcon}><Icon size={22} aria-hidden="true" /></span>
            <span className={styles.optionCopy}><strong>{item.title}</strong><span>{item.body}</span></span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>;
        })}
      </div>
      <div id="about-principle-preview" className={styles.principlePreview} role="region" aria-label="Ilustrasi prinsip yang dipilih">
        <div className={styles.previewTop}><span>{scene.label}</span><span>0{selected + 1} / 03</span></div>
        <div key={selected} className={styles.principleScene} aria-hidden="true">
          {selected === 0 && <div className={styles.resultFlow}>
            <div className={styles.resultCore}><Workflow size={38} strokeWidth={1.25} /><span>Solusi AI</span></div>
            <div className={styles.flowLine} />
            <div className={styles.resultOutcomes}>
              <span><Check size={16} />Operasional</span><span><BarChart3 size={16} />Hasil bisnis</span>
            </div>
          </div>}
          {selected === 1 && <div className={styles.documents}>
            <div><FileText size={22} /><span>Kode</span><Check size={15} /></div>
            <div><FileText size={22} /><span>Dokumentasi</span><Check size={15} /></div>
            <div><ShieldCheck size={22} /><span>Akses tim kamu</span><Check size={15} /></div>
          </div>}
          {selected === 2 && <div className={styles.localContext}>
            <div><MessageCircle size={22} /><span>Bahasa pelanggan</span></div>
            <div><Database size={22} /><span>Ekosistem marketplace</span></div>
            <div><MapPin size={22} /><span>Operasional Indonesia</span></div>
          </div>}
        </div>
        <div className={styles.principleCaption} aria-live="polite" aria-atomic="true">
          <SceneIcon size={18} aria-hidden="true" /><p>{scene.title}</p>
        </div>
      </div>
    </div>
  );
}

const ecosystemRoles = [
  { name: "Afilabs", label: "AI Growth Partner", body: "Audit, arsitektur, dan solusi AI khusus untuk brand D2C.", icon: Workflow },
  { name: "AfiHub", label: "Fondasi afiliasi", body: "Platform pelacakan afiliasi dan pembayaran komisi yang kami kembangkan.", icon: Database },
  { name: "AfiInsight", label: "Konteks keputusan", body: "Data afiliasi AfiHub menjadi konteks bagi AfiInsight.", icon: BarChart3 },
];

export function AboutEcosystem() {
  const [selected, setSelected] = useState(0);
  const role = ecosystemRoles[selected];
  const RoleIcon = role.icon;

  function node(index: number) {
    const item = ecosystemRoles[index];
    const Icon = item.icon;
    return <button type="button" className={styles.networkNode} aria-pressed={selected === index} aria-controls="about-ecosystem-detail" onClick={() => setSelected(index)}>
      <span className={styles.networkIcon}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span>
      <span><strong>{item.name}</strong><small>{item.label}</small></span>
      <span className={styles.nodeSelection} aria-hidden="true">{selected === index ? <Check size={16} /> : <ChevronRight size={16} />}</span>
    </button>;
  }

  return (
    <div className={styles.ecosystemExplorer}>
      <div className={styles.network} role="group" aria-label="Jelajahi peran dalam ekosistem AFI">
        <div className={styles.networkPartner}>{node(0)}</div>
        <div className={styles.networkStem} aria-hidden="true" />
        <div className={styles.networkBranch}>
          {node(1)}<span className={styles.networkArrow} aria-hidden="true"><ArrowRight size={22} /></span>{node(2)}
        </div>
        <p className={styles.networkHint}>Pilih peran untuk melihat hubungannya.</p>
      </div>
      <div id="about-ecosystem-detail" className={styles.networkDetail} aria-live="polite" aria-atomic="true">
        <span className={styles.networkDetailIcon}><RoleIcon size={28} strokeWidth={1.5} aria-hidden="true" /></span>
        <div key={selected}><span>{role.label}</span><h3>{role.name}</h3><p>{role.body}</p></div>
      </div>
    </div>
  );
}
