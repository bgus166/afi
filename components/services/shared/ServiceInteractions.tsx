"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, ChevronRight, Database, FileText, GitBranch, Layers3, ShieldCheck, Sparkles, TrendingUp, Workflow } from "lucide-react";
import styles from "./ServicePage.module.css";

export type ServiceFeature = { title: string; body: string; tag: string; icon: "sparkles" | "trend" | "layers" | "shield" | "database" | "workflow"; sample: string };
const icons = { sparkles: Sparkles, trend: TrendingUp, layers: Layers3, shield: ShieldCheck, database: Database, workflow: Workflow };

export function FeatureExplorer({ id, features }: { id: string; features: ServiceFeature[] }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const feature = features[selected];
  const Icon = icons[feature.icon];
  return <div className={styles.featureExplorer}>
    <div>{features.map((item, i) => <div className={styles.featureItem} key={item.title}>
      <h3><button type="button" id={`${id}-button-${i}`} aria-expanded={expanded === i} aria-controls={`${id}-content-${i}`} onClick={() => { setSelected(i); setExpanded(expanded === i ? null : i); }}><span className={styles.eyebrow}>0{i + 1}</span>{item.title}<ChevronRight size={16} aria-hidden="true" /></button></h3>
      <div id={`${id}-content-${i}`} role="region" aria-labelledby={`${id}-button-${i}`} hidden={expanded !== i} className={styles.featureBody}><p>{item.body}</p></div>
    </div>)}</div>
    <div className={styles.featureCanvas} aria-hidden="true"><span className={styles.eyebrow}>Built for real operations</span><div key={selected} className={styles.featureIllustration}><span className={styles.orbit} /><span className={styles.orbit} /><span className={styles.featureCore}><Icon size={40} strokeWidth={1.25} /></span><span className={styles.orbitPoint} /></div><div key={`caption-${selected}`} className={styles.visualCaption}><span className={styles.eyebrow}>{feature.tag}</span><p>{feature.sample}</p></div><span className={styles.featureCounter}>0{selected + 1} / 0{features.length}</span></div>
  </div>;
}

type StoryStep = { title: string; body: string; tag: string; labels: string[]; output: string };

export function ScrollStory({ id, kind, steps }: { id: string; kind: "creator" | "flow"; steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      if (!media.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.storyStep)); });
      // A narrow activation band avoids two tall steps competing for the
      // same preview when a navigation button scrolls to a step's centre.
      }, { rootMargin: "-45% 0px -54% 0px", threshold: 0 });
      root.current?.querySelectorAll("[data-story-step]").forEach((node) => observer?.observe(node));
    };
    setup(); media.addEventListener("change", setup);
    return () => { observer?.disconnect(); media.removeEventListener("change", setup); };
  }, []);
  const step = steps[active];
  return <div ref={root} className={styles.story}>
    <div className={styles.storySticky}>
      <div className={styles.storyCanvas}><div className={styles.canvasTop}><span className={styles.eyebrow}>{kind === "creator" ? "AfiCreator / Content intelligence" : "AfiFlow / Operations engine"}</span><span className={styles.dot} /></div>
        <div key={active} className={styles.storyScene}>
          <span className={styles.storySceneLabel}>{step.tag}</span>
          <div className={kind === "creator" ? styles.documentRows : styles.pipelineRows}>{step.labels.map((label, i) => <div key={label} style={{ animationDelay: `${i * 90}ms` }}>{kind === "creator" ? <FileText size={17} aria-hidden="true" /> : <GitBranch size={17} aria-hidden="true" />}<span>{label}</span><Check size={13} aria-hidden="true" /></div>)}</div>
          <div className={styles.sceneConnector} aria-hidden="true" />
          <div className={styles.sceneOutput}>{kind === "creator" ? <Sparkles size={21} aria-hidden="true" /> : <Workflow size={21} aria-hidden="true" />}<span>{step.output}</span></div>
        </div><div className={styles.canvasBottom}><span>0{active + 1} / 0{steps.length}</span><span>{step.title}</span></div>
      </div>
      <div className={styles.storyNav} role="group" aria-label={`Pilih tahap ${kind === "creator" ? "AfiCreator" : "AfiFlow"}`}>
        {steps.map((item, i) => <button type="button" key={item.title} aria-pressed={active === i} onClick={() => {
          setActive(i);
          if (window.matchMedia("(min-width: 761px)").matches) document.getElementById(`${id}-${i}`)?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }}><span>0{i + 1}</span>{item.title}<ArrowDown size={12} aria-hidden="true" /></button>)}
      </div>
    </div>
    <div>{steps.map((item, i) => <article key={item.title} id={`${id}-${i}`} data-story-step={i} className={`${styles.storyStep} ${active === i ? styles.storyActive : ""}`}><span className={styles.stepNumber} aria-hidden="true">0{i + 1}</span><span className={styles.eyebrow}>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
  </div>;
}
