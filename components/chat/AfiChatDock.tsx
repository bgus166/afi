"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight, Minus, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { getDemoReply, starterQuestions, type ChatReply } from "./chatContent";
import styles from "./AfiChatDock.module.css";

type Message = { id: number; question: string; reply?: ChatReply; cancelled?: boolean };

function Avatar({ small = false }: { small?: boolean }) {
  return <span className={`${styles.avatar} ${small ? styles.smallAvatar : ""}`}>
    <Image src="/images/afi-avatar.jpg" alt="" width={34} height={34} unoptimized />
  </span>;
}

export function AfiChatDock() {
  const pathname = usePathname();
  const entry = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const followAnswer = useRef(true);
  const restoreFocus = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const showSuggestions = !isOpen && !suppressed && (hovered || focused || pinned);

  useEffect(() => {
    if (!isOpen && restoreFocus.current) {
      restoreFocus.current = false;
      launcher.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!entry.current?.contains(event.target as Node) && !dialog.current?.open) {
        setPinned(false);
        setSuppressed(true);
      }
    }
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      if (replyTimer.current) clearTimeout(replyTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    // The root layout preserves the conversation while navigating between pages.
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    dialog.current?.close();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const viewport = window.visualViewport;
    const panel = dialog.current;
    const resize = () => {
      panel?.style.setProperty("--chat-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      panel?.style.setProperty("--chat-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      panel?.style.removeProperty("--chat-viewport-height");
      panel?.style.removeProperty("--chat-viewport-top");
    };
  }, [isOpen]);

  useEffect(() => {
    const thread = log.current;
    if (!isOpen || !thread || !followAnswer.current) return;
    const last = thread.querySelector<HTMLElement>("[data-chat-message]:last-child");
    const target = pending ? last : last?.querySelector<HTMLElement>("[data-chat-answer]");
    if (target) thread.scrollTop += target.getBoundingClientRect().top - thread.getBoundingClientRect().top - 22;
  }, [messages, pending, isOpen]);

  function openChat() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setClosing(false);
    if (!dialog.current?.open) dialog.current?.showModal();
    setIsOpen(true);
    setPinned(false);
    input.current?.focus({ preventScroll: true });
  }

  function closeChat() {
    if (!dialog.current?.open || closeTimer.current) return;
    setClosing(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      dialog.current?.close();
    }, reducedMotion ? 0 : 200);
  }

  function submit(question: string) {
    const text = question.trim().slice(0, 500);
    if (!text || replyTimer.current) return;
    openChat();
    const id = nextId.current++;
    followAnswer.current = true;
    setDraft("");
    setPending(true);
    setMessages((current) => [...current, { id, question: text }]);
    replyTimer.current = setTimeout(() => {
      replyTimer.current = null;
      setMessages((current) => current.map((message) => message.id === id ? { ...message, reply: getDemoReply(text) } : message));
      setPending(false);
    }, 850);
  }

  function cancelReply() {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setPending(false);
    setMessages((current) => current.map((message) => !message.reply ? { ...message, cancelled: true } : message));
    input.current?.focus({ preventScroll: true });
  }

  function resetChat() {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    setPending(false);
    setMessages([]);
    setDraft("");
    input.current?.focus({ preventScroll: true });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(draft);
  }

  function handleInputKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit(draft);
    }
  }

  return <>
    <div ref={entry} className={`${styles.entry} ${paused ? styles.paused : ""}`} hidden={isOpen} data-engaged={showSuggestions}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") { setHovered(true); setSuppressed(false); } }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocus={() => { setFocused(true); setSuppressed(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
      onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); setPinned(false); setSuppressed(true); } }}
    >
      <div className={styles.dock} role="group" aria-label="Tanya AFI">
        <div className={styles.dockInner}>
          <button ref={launcher} type="button" className={styles.launcher} aria-label="Tanya AFI, buka percakapan" aria-haspopup="dialog" aria-controls="afi-chat-dialog" onClick={openChat}>
            <Avatar /><span className={styles.copy}><strong>Tanya AFI</strong><span>Cari solusi untuk bisnis kamu</span></span>
          </button>
          <button type="button" className={styles.signal} aria-label="Tampilkan saran pertanyaan" aria-expanded={showSuggestions} aria-controls="afi-chat-suggestions"
            onClick={() => { setPinned(true); setSuppressed(false); }}>
            <span className={styles.wave} aria-hidden="true"><b /><b /><b /><b /><b /></span>
          </button>
        </div>
      </div>
      <div id="afi-chat-suggestions" className={styles.suggestions} aria-label="Saran pertanyaan" hidden={!showSuggestions}>
        {starterQuestions.map((question) => <button type="button" key={question} onClick={() => submit(question)}>{question}</button>)}
      </div>
    </div>

    <dialog ref={dialog} id="afi-chat-dialog" className={`${styles.dialog} ${closing ? styles.closing : ""}`} aria-labelledby="afi-chat-title" aria-describedby="afi-chat-demo"
      onCancel={(event) => { event.preventDefault(); closeChat(); }}
      onClose={() => { restoreFocus.current = true; setIsOpen(false); setClosing(false); setHovered(false); setSuppressed(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeChat(); }}
    >
      <div className={styles.panel}>
        <header className={styles.panelHeader}>
          <Avatar small />
          <div className={styles.panelTitle}><h2 id="afi-chat-title">Tanya AFI</h2><span>Cari solusi untuk bisnis kamu</span></div>
          <button type="button" className={styles.iconButton} aria-label={paused ? "Putar animasi dock" : "Jeda animasi dock"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
          {messages.length > 0 && <button type="button" className={styles.iconButton} aria-label="Mulai percakapan baru" onClick={resetChat}><RotateCcw size={16} /></button>}
          <button type="button" className={styles.iconButton} aria-label="Minimalkan percakapan" onClick={closeChat}><Minus size={20} /></button>
        </header>

        <div ref={log} className={styles.log} role="log" aria-label="Riwayat percakapan" aria-live="polite" aria-relevant="additions text"
          onScroll={(event) => { const thread = event.currentTarget; followAnswer.current = thread.scrollHeight - thread.scrollTop - thread.clientHeight < 130; }}>
          {messages.length === 0 ? <div className={styles.welcome}>
            <span className={styles.eyebrow}>KENALAN DENGAN AFILABS</span>
            <h3>Mulai dari<br />satu pertanyaan.</h3>
            <p>Coba demo percakapan ini untuk mengenali layanan Afilabs dan cara kerja bersama tim.</p>
            <div className={styles.starters}>{starterQuestions.map((question) => <button key={question} type="button" onClick={() => submit(question)}>{question}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>
          </div> : messages.map((message) => <div key={message.id} data-chat-message className={styles.message}>
            <div className={styles.userMessage}>{message.question}</div>
            {message.reply ? <div data-chat-answer className={styles.answer}>
              <span className={styles.answerLabel}>AFI / JAWABAN CONTOH</span><p>{message.reply.text}</p>
              {message.reply.links && <div className={styles.resultLinks}>{message.reply.links.map((link) => link.href.startsWith("/") ?
                <Link key={link.href} href={link.href} onClick={closeChat}><span><strong>{link.label}</strong><small>{link.description}</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link> :
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><span><strong>{link.label}</strong><small>{link.description}</small></span><ArrowUpRight size={16} aria-hidden="true" /></a>
              )}</div>}
              <div className={styles.followUps}>{message.reply.followUps.map((question) => <button type="button" key={question} disabled={pending} onClick={() => submit(question)}>{question}</button>)}</div>
            </div> : message.cancelled ? <p className={styles.cancelled}>Simulasi dihentikan. Kamu bisa melanjutkan dengan pertanyaan lain.</p> : <div className={styles.typing}><span aria-hidden="true" />Menyiapkan jawaban contoh<button type="button" onClick={cancelReply}>Batalkan</button></div>}
          </div>)}
        </div>

        <div className={styles.composer}>
          <form onSubmit={handleSubmit}>
            <label className={styles.inputLabel}><span className={styles.srOnly}>Pesan untuk AFI</span><textarea ref={input} rows={1} maxLength={500} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleInputKey} placeholder="Tulis pesan…" /></label>
            <button className={styles.send} type="submit" aria-label="Kirim pesan" disabled={!draft.trim() || pending}><ArrowUp size={18} /></button>
          </form>
          <p id="afi-chat-demo" className={styles.demoLabel}>Demo percakapan · jawaban contoh</p>
        </div>
      </div>
    </dialog>
  </>;
}
