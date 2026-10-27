"use client";

import { useEffect, type RefObject } from "react";

/** Batasi nilai ke rentang 0..1 */
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Petakan p dari rentang [inMin, inMax] ke [outMin, outMax], dengan clamping.
 * Dipakai untuk mengikat properti animasi ke progress scroll.
 */
export function mapRange(
  p: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = clamp01((p - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

/**
 * Memanggil onProgress(0..1) selagi elemen track melintasi viewport:
 * 0 saat atas track menyentuh atas viewport, 1 saat bawah track menyentuh
 * bawah viewport — persis rentang saat panggung sticky menempel.
 *
 * Callback-nya sengaja menulis langsung ke DOM, bukan lewat setState.
 * Re-render React pada tiap frame scroll adalah penyebab utama INP buruk.
 * Pembacaan layout dibatasi satu kali per frame lewat requestAnimationFrame.
 */
export function useScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) { onProgress(0); return; }
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      onProgress(distance <= 0 ? 0 : clamp01(-rect.top / distance));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [trackRef, onProgress]);
}
