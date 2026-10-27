"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A small spring lets each card swing from its pin when dragged. */
export function TestimonialCards({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-testimonial-card]") ?? []);
    const enabled = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

    const cleanups = cards.map((card) => {
      let angle = 0;
      let velocity = 0;
      let frame = 0;
      let lastTime = 0;
      let pointer: number | null = null;
      let startX = 0;
      let startAngle = 0;

      const paint = () => card.style.setProperty("--swing", `${angle}deg`);
      const settle = (time: number) => {
        const step = Math.min((time - lastTime) / 16.667, 2);
        lastTime = time;
        velocity = (velocity - angle * 0.035 * step) * Math.pow(0.88, step);
        angle += velocity * step;
        paint();
        if (Math.abs(angle) + Math.abs(velocity) > 0.03) {
          frame = requestAnimationFrame(settle);
        } else {
          angle = 0;
          paint();
          frame = 0;
        }
      };

      const release = () => {
        if (pointer === null) return;
        const id = pointer;
        pointer = null;
        if (card.hasPointerCapture(id)) card.releasePointerCapture(id);
        card.removeAttribute("data-dragging");
        velocity = 0;
        lastTime = performance.now();
        frame = requestAnimationFrame(settle);
      };

      const down = (event: PointerEvent) => {
        if (!enabled.matches || event.button !== 0 || pointer !== null) return;
        cancelAnimationFrame(frame);
        pointer = event.pointerId;
        startX = event.clientX;
        startAngle = angle;
        card.setPointerCapture(pointer);
        card.setAttribute("data-dragging", "true");
      };

      const move = (event: PointerEvent) => {
        if (event.pointerId !== pointer) return;
        angle = Math.max(-24, Math.min(24, startAngle - (event.clientX - startX) * 0.12));
        paint();
      };

      const reset = () => {
        release();
        cancelAnimationFrame(frame);
        angle = velocity = frame = 0;
        paint();
      };

      card.addEventListener("pointerdown", down);
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerup", release);
      card.addEventListener("pointercancel", release);
      card.addEventListener("lostpointercapture", release);
      enabled.addEventListener("change", reset);

      return () => {
        reset();
        card.removeEventListener("pointerdown", down);
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerup", release);
        card.removeEventListener("pointercancel", release);
        card.removeEventListener("lostpointercapture", release);
        enabled.removeEventListener("change", reset);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
