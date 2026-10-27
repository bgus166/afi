"use client";

import { useEffect, useState } from "react";

/**
 * Nav sticky yang menyorot produk sesuai panel yang sedang dibaca.
 *
 * Ini satu-satunya bagian section Solutions yang butuh JavaScript:
 * menentukan panel mana yang sedang dibaca adalah hubungan antar-elemen
 * yang tidak bisa dinyatakan lewat CSS saja.
 *
 * Memakai perhitungan jarak ke tengah viewport, bukan IntersectionObserver.
 * Alasannya determinisme: pada posisi scroll apa pun selalu ada tepat satu
 * pemenang, dan state-nya dihitung ulang dari nol tiap frame — tidak ada
 * kemungkinan sorotan tertinggal karena sebuah event terlewat.
 *
 * Biayanya kecil: pembacaan dibatasi satu kali per frame lewat rAF, hanya
 * membaca rect sejumlah panel, dan setState dijaga agar tidak memicu render
 * ulang kalau panel aktifnya tidak berubah.
 */
export function SolutionsNav({
  items,
}: {
  items: { id: string; name: string; kicker: string }[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const panels = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (panels.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;

      // Panel yang paling dekat dengan titik tengah viewport yang menang.
      // Jaraknya 0 bila titik tengah berada di dalam panel itu.
      let bestId = "";
      let bestDistance = Infinity;
      for (const panel of panels) {
        const box = panel.getBoundingClientRect();
        const distance =
          box.top > center
            ? box.top - center
            : box.bottom < center
              ? center - box.bottom
              : 0;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = panel.id;
        }
      }

      if (bestId) setActiveId((prev) => (prev === bestId ? prev : bestId));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav aria-label="Daftar produk" className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`group flex items-baseline gap-2.5 rounded-md px-2.5 py-2 transition-colors ${
              isActive
                ? "bg-[var(--accent-soft)] text-[var(--text)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
            }`}
          >
            <span
              className={`font-[family-name:var(--font-technical)] text-[0.625rem] tracking-[0.14em] ${
                isActive ? "text-[var(--accent)]" : "opacity-60"
              }`}
            >
              {item.kicker}
            </span>
            <span className="font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
              {item.name}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
