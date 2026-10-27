"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { HeroSplitScene, type HeroSplitHandle } from "./hero/HeroSplitScene";
import styles from "./hero/hero-split.module.css";

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HeroSplitHandle>(null);

  const onProgress = useCallback((p: number) => sceneRef.current?.update(p), []);

  useScrollProgress(trackRef, onProgress);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative z-10">
      <div
        ref={trackRef}
        data-hero-track
        className={styles.track}
      >
        <div ref={stageRef} className={styles.stage}>
          <PaperBackground />

          <div className={styles.heroContainer}>
            {/*
              Catatan LCP: layer ini TIDAK punya opacity awal di markup server.
              H1 tampil penuh pada paint pertama dan langsung terhitung sebagai
              LCP; scroll baru mengubahnya belakangan lewat inline style.
            */}
            <div ref={titleRef} className={styles.heroCopy}>
              <p className="section-label mb-6">
                AI Growth Partner untuk Brand D2C Indonesia
              </p>

              <h1
                id="hero-title"
                className="flex max-w-[60rem] flex-col items-center text-center font-[family-name:var(--font-heading)] font-normal leading-[0.98] tracking-[-0.055em]"
                style={{ fontSize: "clamp(36px, 6.1vw, 88px)" }}
              >
                <span className="block text-balance">Scale your brand</span>
                <span className="block text-balance">
                  with AI that{" "}
                  <span className="text-[var(--accent)]">actually works.</span>
                </span>
              </h1>

              <p
                className="mx-auto mt-7 max-w-[44rem] text-center text-[var(--muted)] [text-wrap:balance]"
                style={{ fontSize: "var(--type-lead)", lineHeight: 1.5 }}
              >
                Afilabs membangun sistem AI yang mengotomatisin operasional,
                menumbuhkan afiliasi, dan memberi visibilitas penuh ke bisnis
                kamu. Bukan hanya teknologi — hasil yang terukur.
              </p>

              <div className="mt-9 flex w-full max-w-[22rem] flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--accent)] px-6 font-[family-name:var(--font-technical)] text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  Start a Project
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 font-[family-name:var(--font-technical)] text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--text)] transition-colors hover:bg-[var(--surface-soft)]"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            <HeroSplitScene ref={sceneRef} titleRef={titleRef} stageRef={stageRef} trackRef={trackRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
