"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowDown, ArrowRight, Check, Circle, Clock3, Database, FileCheck2, GitBranch, Play, RotateCcw, Zap } from "lucide-react";
import { manualTasks, workflows } from "./flowData";
import styles from "./flow.module.css";

const nodeIcons = [Database, GitBranch, Zap, FileCheck2];
type RunStatus = "idle" | "running" | "done" | "error";

export function WorkflowDemo({ compact = false }: { compact?: boolean }) {
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [status, setStatus] = useState<RunStatus>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const workflow = workflows[workflowIndex];
  const clearRun = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const changeWorkflow = (index: number) => { clearRun(); setWorkflowIndex(index); setSelectedNode(0); setCompleted(0); setStatus("idle"); };
  const reset = () => { clearRun(); setSelectedNode(0); setCompleted(0); setStatus("idle"); };
  const run = (fail = false) => {
    clearRun(); setCompleted(0); setSelectedNode(0); setStatus("running");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650;
    const length = fail ? 2 : workflow.nodes.length;
    for (let i = 0; i < length; i++) timers.current.push(setTimeout(() => {
      if (fail && i === 1) { setSelectedNode(1); setStatus("error"); return; }
      setCompleted(i + 1); setSelectedNode(Math.min(i + 1, workflow.nodes.length - 1));
      if (i === workflow.nodes.length - 1) setStatus("done");
    }, delay * (i + 1)));
  };
  const choices = compact ? workflows.slice(0, 2) : workflows;
  return <div className={`${styles.workflowDemo} ${compact ? styles.compact : ""}`}>
    <div className={styles.demoHeader}><span className={styles.micro}><GitBranch size={14} aria-hidden="true" />AfiFlow / Workflow canvas</span><button type="button" aria-label={compact ? "Reset preview alur" : "Reset simulasi alur"} onClick={reset}><RotateCcw size={14} /></button></div>
    <div className={styles.workflowChoices} role="group" aria-label={compact ? "Pilih preview workflow" : "Pilih alur otomasi"}>{choices.map((item, i) => <button key={item.name} type="button" aria-pressed={workflowIndex === i} onClick={() => changeWorkflow(i)}>{compact ? item.short : item.name}</button>)}</div>
    {!compact && <p className={styles.workflowDescription}>{workflow.description}</p>}
    <div className={styles.trigger}><Clock3 size={13} aria-hidden="true" /><span>Trigger / {workflow.trigger}</span><span className={styles.triggerDot} aria-hidden="true" /></div>
    <div className={styles.nodes} role="group" aria-label="Detail tiap langkah workflow">
      {workflow.nodes.map((node, i) => {
        const Icon = nodeIcons[i];
        const state = status === "error" && i === 1 ? "error" : completed > i ? "done" : status === "running" && completed === i ? "running" : "queued";
        return <div className={styles.nodeSlot} key={`${workflowIndex}-${node.label}`}>
          <button type="button" className={styles.node} data-state={state} aria-pressed={selectedNode === i} aria-label={`${node.label}: ${state === "done" ? "selesai" : state === "running" ? "berjalan" : state === "error" ? "gagal" : "menunggu"}`} onClick={() => setSelectedNode(i)} onFocus={() => setSelectedNode(i)} onMouseEnter={() => setSelectedNode(i)}><span className={styles.nodeIcon}><Icon size={22} strokeWidth={1.5} aria-hidden="true" />{state === "done" && <span className={styles.nodeCheck}><Check size={10} /></span>}</span><strong>{node.label}</strong><span>{node.tool}</span></button>
          {i < workflow.nodes.length - 1 && <span className={styles.nodeConnector} data-running={status === "running" && completed === i} data-done={completed > i} aria-hidden="true"><i /></span>}
        </div>;
      })}
    </div>
    <div className={styles.nodeDetail} key={`${workflowIndex}-${selectedNode}`}><span className={styles.micro}>0{selectedNode + 1} / {workflow.nodes[selectedNode].label}</span><p>{workflow.nodes[selectedNode].detail}</p></div>
    {!compact && <div className={styles.executionLog} aria-label="Log simulasi"><span className={styles.micro}>Execution log / Simulasi</span><ol>{workflow.nodes.map((node, i) => <li key={node.label} data-state={status === "error" && i === 1 ? "error" : completed > i ? "done" : "queued"}><span>0{i + 1}</span>{completed > i ? <Check size={12} aria-hidden="true" /> : status === "error" && i === 1 ? <AlertCircle size={12} aria-hidden="true" /> : <Circle size={10} aria-hidden="true" />}<span>{node.label}</span><span>{completed > i ? "Success" : status === "error" && i === 1 ? "API timeout · retry tersedia" : "Pending"}</span></li>)}</ol></div>}
    <div className={styles.runBar}><button type="button" className={styles.runButton} disabled={status === "running"} onClick={() => run()}><Play size={13} aria-hidden="true" />{status === "running" ? "Alur berjalan..." : status === "error" ? "Coba lagi" : status === "done" ? "Jalankan ulang" : "Jalankan simulasi"}</button>{!compact && <button type="button" className={styles.errorButton} disabled={status === "running"} onClick={() => run(true)}><AlertCircle size={13} aria-hidden="true" />Simulasikan error</button>}</div>
    <div className={styles.runStatus} role="status" data-error={status === "error"}>{status === "idle" ? <><Circle size={11} aria-hidden="true" />Siap dijalankan · pilih node untuk detail</> : status === "running" ? <><span className={styles.runningDot} />Memproses langkah {completed + 1} dari 4</> : status === "error" ? <><AlertCircle size={13} aria-hidden="true" />Alur berhenti. Tim mendapat notifikasi untuk retry.</> : <><Check size={13} aria-hidden="true" />4 langkah selesai · eksekusi tercatat</>}</div>
    <div className={styles.demoFooter}><span><Clock3 size={12} aria-hidden="true" />Hemat {workflow.saving}</span><span>Simulasi · tidak memproses data bisnis</span></div>
  </div>;
}

export function TaskAudit() {
  const [selected, setSelected] = useState([0, 1, 3]);
  return <div className={styles.taskAudit}><div className={styles.taskList}>{manualTasks.map((task, i) => <label key={task}><input type="checkbox" checked={selected.includes(i)} onChange={() => setSelected((current) => current.includes(i) ? current.filter((value) => value !== i) : [...current, i])} /><span className={styles.taskCheck} aria-hidden="true"><Check size={12} /></span><span>{task}</span></label>)}</div><div className={styles.taskSummary}><span className={styles.micro}>Quick operational check</span><p className={styles.taskCount}>{selected.length}<span>/ 08</span></p><h3>{selected.length ? "Proses berulang yang masih kamu kerjakan." : "Mulai dari pekerjaan yang paling repetitif."}</h3><p>Pilih pekerjaan yang masih manual di tim kamu. Ini titik awal untuk memetakan alur yang bisa diotomatisin.</p><a href="#flow-calculator">Hitung waktu yang terpakai <ArrowDown size={14} aria-hidden="true" /></a></div></div>;
}

export function TimeSavingsCalculator() {
  const [minutes, setMinutes] = useState(90);
  const [frequency, setFrequency] = useState(5);
  const weekly = minutes * frequency / 60;
  const format = (value: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value);
  return <div className={styles.calculator}>
    <div className={styles.calculatorInputs}><span className={styles.micro}>Your time, back</span><h3>Mulai dari satu<br />pekerjaan rutin.</h3><div className={styles.rangeField}><label htmlFor="flow-minutes">Waktu manual per proses <strong>{minutes} menit</strong></label><input id="flow-minutes" type="range" min="5" max="180" step="5" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} /><div><span>5 menit</span><span>180 menit</span></div></div><div className={styles.rangeField}><label htmlFor="flow-frequency">Frekuensi per minggu <strong>{frequency} kali</strong></label><input id="flow-frequency" type="range" min="1" max="35" step="1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} /><div><span>1 kali</span><span>35 kali</span></div></div></div>
    <div className={styles.calculatorResult} aria-live="polite" aria-atomic="true"><span className={styles.micro}>Waktu manual yang bisa dievaluasi</span><p className={styles.hours}>{format(weekly)}<span>jam / minggu</span></p><div className={styles.hoursRule} aria-hidden="true"><span style={{ transform: `scaleX(${Math.min(weekly / 105, 1)})` }} /></div><p className={styles.monthly}>{format(weekly * 4)} <span>jam / bulan</span></p><p className={styles.formula}>{minutes} menit × {frequency} kali ÷ 60<br />Perhitungan bulanan memakai 4 minggu.</p><p className={styles.calculatorNote}>Estimasi beban kerja manual, dengan asumsi seluruh proses terpilih dapat diotomatisin. Cakupan aktual ditentukan saat audit.</p></div>
  </div>;
}
