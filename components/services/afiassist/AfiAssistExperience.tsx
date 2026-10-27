"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Check, CheckCheck, ChevronRight, Clock3,
  Database, FileText, Headphones, MessageCircle, RotateCcw,
  Send, ShieldCheck, Sparkles, Workflow,
} from "lucide-react";
import styles from "./afiassist.module.css";

const scenarios = [
  {
    name: "Tanya produk", tag: "Product knowledge", escalated: false,
    messages: [
      "Kak, serum vitamin C-nya ada ukuran berapa?",
      "Halo, Kak! Untuk serum vitamin C ini ada pilihan 20 ml. Mau saya bantu cek stok dan detail produknya?",
      "Boleh, yang ukuran 20 ml masih ready?",
      "Varian 20 ml tersedia, Kak. Saya bantu kirimkan detail produk dan link checkout-nya, ya. ✨",
    ],
  },
  {
    name: "Cek pesanan", tag: "Order support", escalated: false,
    messages: [
      "Halo, pesanan AFI-1024 sudah dikirim belum?",
      "Halo, Kak! Pesanan AFI-1024 sudah diserahkan ke kurir. Status terakhir: dalam perjalanan ke kota tujuan. 📦",
      "Saya bisa cek resinya di mana?",
      "Nomor resinya ada di detail pesanan, Kak. Saya bantu arahkan ke halaman pelacakannya supaya Kakak bisa cek update terbaru.",
    ],
  },
  {
    name: "Komplain", tag: "Smart escalation", escalated: true,
    messages: [
      "Paket saya datang, tapi produknya rusak. Saya kecewa.",
      "Maaf atas pengalaman ini, Kak. Saya bantu catat kendalanya. Boleh kirimkan nomor pesanan dan foto kondisi produknya?",
      "AFI-1024. Saya ingin bicara langsung dengan timnya.",
      "Baik, Kak. Saya teruskan ke tim kami, lengkap dengan riwayat percakapan dan nomor pesanan. Kakak tidak perlu mengulang ceritanya.",
    ],
  },
];

function Conversation({ scenario }: { scenario: typeof scenarios[number] }) {
  const [visible, setVisible] = useState(2);
  const [typing, setTyping] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = log.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [visible, typing]);
  useEffect(() => {
    const timers = [
      window.setTimeout(() => setVisible(3), 1100),
      window.setTimeout(() => setTyping(true), 1600),
      window.setTimeout(() => { setTyping(false); setVisible(4); }, 2900),
    ];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      timers.forEach(window.clearTimeout);
      // A single immediate timer avoids a moving conversation for reduced motion.
      timers.push(window.setTimeout(() => setVisible(4), 0));
    }
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <>
      <div ref={log} className={styles.messages} role="log" aria-label="Contoh percakapan AfiAssist" aria-live="polite" aria-relevant="additions text">
        <span className={styles.chatDate}>Hari ini · Percakapan ilustrasi</span>
        {scenario.messages.slice(0, visible).map((message, index) => (
          <div key={message} className={`${styles.bubble} ${index % 2 ? styles.aiBubble : styles.buyerBubble}`}>
            <span className={styles.srOnly}>{index % 2 ? "AfiAssist: " : "Pelanggan: "}</span>
            {message}
            <span className={styles.messageTime}>02:0{index + 1} {index % 2 === 1 && <CheckCheck size={12} aria-hidden="true" />}</span>
          </div>
        ))}
        {typing && <div className={styles.typing} role="status" aria-label="AfiAssist sedang mengetik"><i /><i /><i /></div>}
      </div>
      <div className={styles.chatOutcome} aria-live="polite">
        {visible === 4 ? <><Check size={13} aria-hidden="true" />{scenario.escalated ? "Diteruskan ke tim · konteks lengkap" : "Ditangani AI · tim tetap fokus"}</> : <><Sparkles size={13} aria-hidden="true" />Membaca konteks percakapan</>}
      </div>
    </>
  );
}

export function ChatDemo() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const [channel, setChannel] = useState(0);
  const channels = ["WhatsApp", "Instagram", "Website"];
  return (
    <div id="assist-demo" className={styles.demo}>
      <div className={styles.demoTop}><span><span className={styles.liveDot} />Interactive demo</span><button type="button" onClick={() => setReplay((n) => n + 1)} aria-label="Putar ulang demo percakapan"><RotateCcw size={14} /></button></div>
      <div className={styles.channelTabs} role="group" aria-label="Pilih channel demo">
        {channels.map((name, index) => <button type="button" key={name} aria-pressed={channel === index} onClick={() => setChannel(index)}>{name}</button>)}
      </div>
      <div className={styles.chatWindow}>
        <div className={styles.chatHeader}>
          <span className={styles.avatar}><Sparkles size={20} aria-hidden="true" /></span>
          <div><strong>AfiAssist AI</strong><span><span className={styles.liveDot} />Online · {channels[channel]} · 24/7</span></div>
          <ShieldCheck size={17} aria-hidden="true" />
        </div>
        <Conversation key={`${selected}-${replay}`} scenario={scenarios[selected]} />
        <div className={styles.chatInput} aria-hidden="true"><span>Selalu siap membantu pelangganmu.</span><Send size={15} /></div>
      </div>
      <div className={styles.scenarioPicker} role="group" aria-label="Pilih skenario percakapan">
        {scenarios.map((scenario, index) => <button key={scenario.name} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index}>{scenario.name}<ArrowUpRight size={12} aria-hidden="true" /></button>)}
      </div>
      <p className={styles.demoNote}>Pilih skenario untuk mencoba. Simulasi, tanpa mengirim pesan.</p>
    </div>
  );
}

const steps = [
  { title: "Training", kicker: "Kenali brand kamu", body: "Kami training AfiAssist dengan katalog produk, FAQ, kebijakan return, harga, dan promo aktif. Satu knowledge base yang memahami konteks bisnis kamu.", detail: "Pengetahuan brand jadi fondasi setiap jawaban.", icon: Database },
  { title: "Deploy", kicker: "Hadir di channel kamu", body: "Aktif di WhatsApp Business API, Instagram DM, website live chat, atau semuanya sekaligus. Setup dalam 3–5 hari kerja.", detail: "Channel yang sudah kamu pakai. Pengalaman yang lebih baik.", icon: Workflow },
  { title: "Monitor & Improve", kicker: "Makin pintar setiap minggu", body: "Monitor volume pertanyaan, satisfaction score, topik populer, dan percakapan yang diteruskan ke manusia melalui dashboard real-time.", detail: "Ukur performa, pelajari percakapan, perbaiki respons.", icon: Sparkles },
];

function ProcessVisual({ active }: { active: number }) {
  return (
    <div className={styles.processCanvas}>
      <div className={styles.canvasHeader}><span className={styles.micro}>AfiAssist / System overview</span><span className={styles.liveDot} /></div>
      <div key={active} className={styles.canvasScene}>
        {active === 0 && <>
          <div className={styles.documentStack}>
            {["Katalog produk", "FAQ & kebijakan", "Brand voice & promo"].map((label, i) => <div key={label} style={{ animationDelay: `${i * 90}ms` }}><FileText size={16} aria-hidden="true" /><span>{label}</span><Check size={14} aria-hidden="true" /></div>)}
          </div>
          <div className={styles.connectionLine} aria-hidden="true" />
          <div className={styles.knowledgeCore}><Sparkles size={24} aria-hidden="true" /><strong>Brand knowledge</strong><span>Satu sumber. Jawaban konsisten.</span></div>
        </>}
        {active === 1 && <>
          <div className={styles.deployCore}><Sparkles size={24} aria-hidden="true" /><strong>AfiAssist</strong><span>Ready to connect</span></div>
          <div className={styles.channelBranches}>
            {["WhatsApp API", "Instagram DM", "Website chat"].map((name, i) => <div key={name} style={{ animationDelay: `${i * 100}ms` }}><MessageCircle size={18} aria-hidden="true" /><span>{name}</span><span className={styles.connected}>Connected <Check size={11} aria-hidden="true" /></span></div>)}
          </div>
        </>}
        {active === 2 && <>
          <div className={styles.monitorStats}><div><span>Conversations</span><strong>All channels</strong></div><span><span className={styles.liveDot} />Live overview</span></div>
          <div className={styles.chart} aria-label="Ilustrasi monitoring percakapan">{[32, 47, 39, 61, 52, 73, 65, 83, 71, 94, 84, 100].map((h, i) => <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 35}ms` }} />)}</div>
          <div className={styles.monitorRows}><span><Check size={14} />Pertanyaan terjawab</span><span><Headphones size={14} />Eskalasi terpantau</span></div>
          <p className={styles.micro}>Visual ilustrasi · bukan data live</p>
        </>}
      </div>
      <div className={styles.canvasFooter}><span>0{active + 1} / 03</span><span>{steps[active].kicker}</span></div>
    </div>
  );
}

export function ProcessStory() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>("[data-assist-step]");
    if (!nodes) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.assistStep));
      });
    }, { rootMargin: "-25% 0px -40% 0px", threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.story} ref={root}>
      <div className={styles.storyVisual}>
        <ProcessVisual active={active} />
        <nav className={styles.storyNav} aria-label="Tahap implementasi AfiAssist">
          {steps.map((step, i) => <a key={step.title} href={`#assist-step-${i}`} aria-current={active === i ? "step" : undefined}><span>0{i + 1}</span>{step.title}<ArrowDown size={12} aria-hidden="true" /></a>)}
        </nav>
      </div>
      <div className={styles.storySteps}>
        {steps.map((step, i) => <article key={step.title} id={`assist-step-${i}`} data-assist-step={i} className={`${styles.storyStep} ${active === i ? styles.activeStep : ""}`}>
          <span className={styles.stepIndex} aria-hidden="true">0{i + 1}</span>
          <p className={styles.micro}>{step.kicker}</p><h3>{step.title}</h3><p>{step.body}</p>
          <span className={styles.stepDetail}><step.icon size={15} aria-hidden="true" />{step.detail}</span>
        </article>)}
      </div>
    </div>
  );
}

const features = [
  { title: "Bahasa Indonesia natural", description: "Bahasa yang luwes, dengan tone yang mengikuti brand voice kamu. Pelanggan merasa didengar, bukan sedang bicara dengan bot kaku.", label: "Feels human", sample: "Siap, Kak. Saya bantu cek dulu, ya. ✨", icon: MessageCircle },
  { title: "24/7 availability", description: "Tetap siap menjawab di luar jam operasional. Tidak ada hari libur atau jam sibuk yang membuat pelanggan harus menunggu tim kembali online.", label: "Always available", sample: "02:00 AM / Masih ada yang siap membantu.", icon: Clock3 },
  { title: "Smart escalation", description: "Pertanyaan kompleks dideteksi dan diteruskan ke tim manusia dengan riwayat serta konteks lengkap. Pelanggan tidak perlu mengulang ceritanya.", label: "Human when it matters", sample: "AI → Konteks lengkap → Tim manusia", icon: Headphones },
  { title: "Multi-channel", description: "WhatsApp Business, Instagram DM, dan website chat dikelola dari satu dashboard terpadu. Percakapan dari berbagai channel tetap terpantau.", label: "One connected inbox", sample: "WhatsApp + Instagram + Website", icon: Workflow },
  { title: "Analytics dashboard", description: "Lihat volume chat, tingkat kepuasan buyer, serta topik terpopuler. Data percakapan membantu kamu memahami apa yang dibutuhkan pelanggan.", label: "Clarity from conversations", sample: "Volume chat / Satisfaction / Topik populer", icon: Sparkles },
  { title: "Continuous learning", description: "Knowledge base diperbarui secara reguler seiring perubahan produk dan informasi brand, supaya jawaban tetap relevan.", label: "Keeps getting better", sample: "Produk baru → Knowledge update → Jawaban relevan", icon: Database },
  { title: "Secure & private", description: "Data percakapan terenkripsi dan dikelola dalam sistem yang kamu kendalikan. Keamanan data menjadi bagian dari implementasi.", label: "Built with care", sample: "Percakapan terenkripsi. Akses terkendali.", icon: ShieldCheck },
  { title: "WhatsApp API ready", description: "Terintegrasi langsung dengan WhatsApp Business API resmi, tanpa mengandalkan scraping dari pihak ketiga.", label: "Official connection", sample: "WhatsApp Business API / Connected", icon: CheckCheck },
];

export function FeatureExplorer() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const feature = features[active];
  return (
    <div className={styles.featuresLayout}>
      <div className={styles.featureList}>
        {features.map((item, i) => <div className={styles.featureItem} key={item.title}>
          <h3><button id={`feature-button-${i}`} type="button" aria-expanded={expanded === i} aria-controls={`feature-content-${i}`} onClick={() => { setActive(i); setExpanded(expanded === i ? null : i); }}><span className={styles.micro}>0{i + 1}</span>{item.title}<ChevronRight size={16} aria-hidden="true" /></button></h3>
          <div id={`feature-content-${i}`} role="region" aria-labelledby={`feature-button-${i}`} className={styles.featureDescription} hidden={expanded !== i}><p>{item.description}</p></div>
        </div>)}
      </div>
      <div className={styles.featurePreview} aria-hidden="true">
        <span className={styles.micro}>Designed for real conversations</span>
        <div className={styles.featureArt} key={active}><div className={styles.orbitRing} /><div className={styles.orbitRing} /><div className={styles.featureIcon}><feature.icon size={38} strokeWidth={1.3} /></div><span className={styles.orbitDot} /></div>
        <div className={styles.featurePreviewCopy} key={`copy-${active}`}><span className={styles.micro}>{feature.label}</span><p>{feature.sample}</p></div>
        <span className={styles.featureCounter}>0{active + 1} <span>/ 08</span></span>
      </div>
    </div>
  );
}

export function ResultsComparison() {
  const [after, setAfter] = useState(true);
  return (
    <div className={styles.caseStudy}>
      <div className={styles.caseHeader}><div><span className={styles.micro}>Studi kasus / Brand suplemen</span><h3>500+ order sehari.<br />Tim lebih fokus.</h3></div><div className={styles.resultToggle} role="group" aria-label="Bandingkan kondisi sebelum dan sesudah AfiAssist"><button type="button" onClick={() => setAfter(false)} aria-pressed={!after}>Sebelum</button><button type="button" onClick={() => setAfter(true)} aria-pressed={after}>Sesudah 30 hari</button></div></div>
      <div className={styles.caseMetrics} aria-live="polite" aria-atomic="true">
        <div><span className={styles.micro}>Average response time</span><p key={`time-${after}`} className={styles.metricValue}>{after ? "87" : "4,2"}<span>{after ? "detik" : "jam"}</span></p><div className={styles.metricTrack} aria-hidden="true"><span style={{ transform: `scaleX(${after ? .06 : 1})` }} /></div><span className={styles.metricFoot}>{after ? "Pelanggan mendapat jawaban lebih cepat." : "Pelanggan menunggu balasan tim."}</span></div>
        <div><span className={styles.micro}>Customer satisfaction</span><p key={`score-${after}`} className={styles.metricValue}>{after ? "4.8" : "3.9"}<span>/ 5</span></p><div className={styles.metricTrack} aria-hidden="true"><span style={{ transform: `scaleX(${after ? .96 : .78})` }} /></div><span className={styles.metricFoot}>{after ? "Pengalaman yang lebih konsisten." : "Kualitas jawaban belum seragam."}</span></div>
        <div><span className={styles.micro}>{after ? "Pertanyaan ditangani AI" : "Waktu tim untuk FAQ"}</span><p key={`faq-${after}`} className={styles.metricValue}>{after ? "80" : "60"}<span>%</span></p><div className={styles.metricTrack} aria-hidden="true"><span style={{ transform: `scaleX(${after ? .8 : .6})` }} /></div><span className={styles.metricFoot}>{after ? "Tim fokus ke komplain kompleks." : "Tim CS 4 orang, kerja 8 jam/hari."}</span></div>
      </div>
      <p className={styles.sourceNote}>Hasil studi kasus pada situs Afilabs. Hasil setiap brand dapat berbeda.</p>
    </div>
  );
}

const integrations = [
  { name: "WhatsApp API", code: "WA", category: "Customer conversations", text: "Layani percakapan pelanggan melalui WhatsApp Business API resmi.", icon: MessageCircle },
  { name: "Instagram DM", code: "IG", category: "Customer conversations", text: "Hadir untuk pelanggan yang bertanya melalui direct message Instagram.", icon: MessageCircle },
  { name: "Tokopedia", code: "TK", category: "Commerce ecosystem", text: "Hubungkan AfiAssist dengan ekosistem operasional toko Tokopedia kamu.", icon: Workflow },
  { name: "Shopee", code: "SP", category: "Commerce ecosystem", text: "Jadikan Shopee bagian dari stack operasional yang terhubung dengan AfiAssist.", icon: Workflow },
  { name: "WooCommerce", code: "WC", category: "Your online store", text: "Integrasikan AfiAssist dengan toko online berbasis WooCommerce kamu.", icon: Database },
  { name: "Shopify", code: "SH", category: "Your online store", text: "Tambahkan AfiAssist ke ekosistem toko Shopify yang sudah kamu gunakan.", icon: Database },
  { name: "Zendesk", code: "ZD", category: "Customer support stack", text: "Lengkapi workflow dukungan pelanggan yang sudah berjalan di Zendesk.", icon: Headphones },
];

export function IntegrationExplorer() {
  const [active, setActive] = useState(0);
  const selected = integrations[active];
  return (
    <div className={styles.integrationExplorer}>
      <div className={styles.integrationGrid} role="group" aria-label="Jelajahi integrasi AfiAssist">
        {integrations.map((item, i) => <button type="button" key={item.name} aria-pressed={active === i} onClick={() => setActive(i)}><span className={styles.integrationMonogram}>{item.code}</span><span>{item.name}</span><ArrowUpRight size={13} aria-hidden="true" /></button>)}
      </div>
      <div className={styles.integrationDetail} aria-live="polite" aria-atomic="true"><div key={active}><selected.icon size={20} aria-hidden="true" /><span className={styles.micro}>{selected.category}</span><h3>{selected.name}</h3><p>{selected.text}</p></div><span className={styles.connectionBadge}><span className={styles.liveDot} />Available integration</span></div>
    </div>
  );
}
