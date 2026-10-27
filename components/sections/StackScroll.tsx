"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * Pengendali tumpukan kartu — port langsung dari `script.js` komponen
 * "Stack Scroll Reveal" yang diberikan pemilik.
 *
 * Rumusnya dipertahankan persis seperti sumbernya:
 *   step     = innerHeight * 1.1        satu kartu per 1,1 tinggi layar
 *   depth    = max(0, index - progress) seberapa dalam kartu di tumpukan
 *   exit     = clamp((progress - index - 0.15) / 0.85)
 *   lift     = exit * (innerHeight + tinggiPanggung * 0.3)
 *   scale    = max(0.64, 1 - depth * 0.12) + exit * 0.1
 *   rotate   = sin(exit * PI/2) * 18     (maks 18°, dengan easing)
 *
 * Urutan transform juga dijaga — `perspective(500px)` berada di tengah
 * rantai, setelah scale dan sebelum lift/rotate. Memindahkannya mengubah
 * hasil foreshortening.
 *
 * Kartu di-render sebagai children dari server component, jadi isinya tidak
 * ikut terbundel ke JavaScript sisi klien.
 */
export function StackScroll({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...stage.querySelectorAll<HTMLElement>(".deck-card")];
    let frame = 0;

    const render = () => {
      frame = 0;

      if (reduced.matches) {
        for (const card of cards) {
          card.style.transform = "";
          card.style.visibility = "";
        }
        return;
      }

      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const distance = top - track.getBoundingClientRect().top;
      const step = window.innerHeight * 1.1;
      const progress = Math.max(0, distance / step);

      cards.forEach((card, index) => {
        const depth = Math.max(0, index - progress);
        const exit = clamp((progress - index - 0.15) / 0.85);
        const lift = exit * (window.innerHeight + stage.offsetHeight * 0.3);
        const scale = Math.max(0.64, 1 - depth * 0.12) + exit * 0.1;
        const rotate = Math.sin((exit * Math.PI) / 2) * 18;

        card.style.transform = `translateY(${depth * 10}px) scale(${scale}) perspective(500px) translateY(${-lift}px) rotateX(${rotate}deg)`;
        card.style.visibility = exit >= 1 ? "hidden" : "visible";
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduced.addEventListener("change", request);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduced.removeEventListener("change", request);
    };
  }, []);

  return (
    <div ref={trackRef} className="deck-track">
      <div ref={stageRef} className="deck-stage">
        {children}
      </div>
    </div>
  );
}
