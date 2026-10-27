"use client";

import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { HeroWorkspace } from "./HeroWorkspace";
import { HeroServiceCard } from "./HeroServiceCard";
import { heroServices, type WorkspacePeriod, type WorkspaceView } from "./workspaceData";
import styles from "./hero-split.module.css";

export type HeroSplitHandle = { update: (progress: number) => void };
type Props = { titleRef: RefObject<HTMLDivElement | null>; stageRef: RefObject<HTMLDivElement | null>; trackRef: RefObject<HTMLDivElement | null> };
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px), (min-width: 720px) and (min-height: 900px)";
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const mix = (start: number, end: number, progress: number) => start + (end - start) * progress;
const ease = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };

export const HeroSplitScene = forwardRef<HeroSplitHandle, Props>(function HeroSplitScene({ titleRef, stageRef, trackRef }, ref) {
  const root = useRef<HTMLDivElement>(null);
  const source = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const shards = useRef<(HTMLDivElement | null)[]>([]);
  const turns = useRef<(HTMLDivElement | null)[]>([]);
  const crops = useRef<(HTMLDivElement | null)[]>([]);
  const backs = useRef<(HTMLDivElement | null)[]>([]);
  const geometry = useRef({ animated: false, width: 1000, height: 900, startY: 620, boardWidth: 1000, boardHeight: 540, focusY: 120, columns: 4, cardWidth: 235, cardHeight: 400, cardY: 225, gap: 18 });
  const [view, setView] = useState<WorkspaceView>("overview");
  const [period, setPeriod] = useState<WorkspacePeriod>(7);

  const update = useCallback((value: number) => {
    const p = clamp(value);
    const g = geometry.current;
    const title = titleRef.current;
    if (!g.animated) return;
    const focus = ease((p - .02) / .31);
    const split = ease((p - .42) / .37);
    const piece = g.boardWidth / 4;
    const startX = (g.width - g.boardWidth) / 2;
    const boardY = mix(g.startY, g.focusY, focus);
    if (title) {
      title.style.transform = `translate3d(0,${-45 * focus}px,0)`;
      title.style.opacity = String(1 - ease((p - .1) / .17));
      const hidden = p >= .29;
      title.style.visibility = hidden ? "hidden" : "visible";
      if (title.inert !== hidden) title.inert = hidden;
    }
    if (source.current) {
      Object.assign(source.current.style, { left: `${startX}px`, top: `${boardY}px`, width: `${g.boardWidth}px`, height: `${g.boardHeight}px`, opacity: String(1 - ease((p - .385) / .025)), visibility: p < .415 ? "visible" : "hidden" });
      if (source.current.inert !== (p >= .4)) source.current.inert = p >= .4;
    }
    if (heading.current) {
      heading.current.style.opacity = String(ease((p - .66) / .2));
      heading.current.style.visibility = p >= .66 ? "visible" : "hidden";
      heading.current.style.transform = `translate3d(0,${12 * (1 - split)}px,0)`;
    }
    shards.current.forEach((shard, index) => {
      if (!shard) return;
      const column = index % g.columns;
      const row = Math.floor(index / g.columns);
      const flip = ease((p - .585 - index * .018) / .235);
      const rotation = g.columns === 4 ? [-3, -1, 1, 3][index] * split : 0;
      const endX = column * (g.cardWidth + g.gap);
      const endY = g.cardY + row * (g.cardHeight + g.gap) + (g.columns === 4 && (index === 0 || index === 3) ? 8 : 0);
      Object.assign(shard.style, {
        left: `${mix(startX + piece * index, endX, split)}px`, top: `${mix(boardY, endY, split)}px`,
        width: `${mix(piece, g.cardWidth, split)}px`, height: `${mix(g.boardHeight, g.cardHeight, split)}px`,
        transform: `rotate(${rotation}deg)`, borderRadius: `${mix(0, 12, split)}px`, visibility: "visible",
      });
      if (turns.current[index]) turns.current[index]!.style.transform = `rotateY(${flip * 180}deg)`;
      const crop = crops.current[index];
      if (crop) Object.assign(crop.style, { width: `${g.boardWidth}px`, height: `${g.boardHeight}px`, left: `${-piece * index}px` });
      const back = backs.current[index];
      if (back) {
        const hidden = flip < .985;
        // The painted back is decorative during its turn; links enter the
        // keyboard and accessibility order once the card is facing forward.
        back.style.visibility = flip > .5 ? "visible" : "hidden";
        if (back.inert !== hidden) back.inert = hidden;
        back.setAttribute("aria-hidden", String(hidden));
      }
    });
  }, [titleRef]);
  useImperativeHandle(ref, () => ({ update }), [update]);

  useLayoutEffect(() => {
    const media = window.matchMedia(PIN_QUERY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let resizeFrame = 0;
    const measure = () => {
      resizeFrame = 0;
      if (!root.current || !stageRef.current || !trackRef.current) return;
      const animated = media.matches && !reduced.matches;
      trackRef.current.dataset.motion = animated ? "pinned" : "static";
      root.current.dataset.motion = animated ? "pinned" : "static";
      const width = root.current.clientWidth;
      const height = stageRef.current.clientHeight;
      const columns = window.innerWidth >= 1024 ? 4 : 2;
      const gap = columns === 4 ? 18 : 16;
      const cardY = columns === 4 ? 225 : 235;
      geometry.current = { animated, width, height, columns, gap,
        startY: (titleRef.current?.offsetTop ?? 0) + (titleRef.current?.offsetHeight ?? 500) + 52,
        boardWidth: Math.min(1050, width * .96), boardHeight: Math.min(540, height - 220),
        focusY: Math.max(104, (height - Math.min(540, height - 220) - 110) / 2),
        cardWidth: (width - gap * (columns - 1)) / columns,
        cardHeight: columns === 4 ? Math.min(400, height - cardY - 118) : Math.min(250, (height - cardY - 118 - gap) / 2), cardY,
      };
      if (animated) {
        const rect = trackRef.current.getBoundingClientRect();
        update(-rect.top / Math.max(1, rect.height - window.innerHeight));
      } else {
        [source.current, heading.current, titleRef.current, ...shards.current, ...turns.current, ...crops.current, ...backs.current].forEach((element) => {
          if (!element) return;
          element.removeAttribute("style");
          element.inert = false;
          element.removeAttribute("aria-hidden");
        });
      }
    };
    const schedule = () => { if (!resizeFrame) resizeFrame = requestAnimationFrame(measure); };
    measure();
    const observer = new ResizeObserver(schedule);
    if (titleRef.current) observer.observe(titleRef.current);
    if (root.current) observer.observe(root.current);
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(resizeFrame); observer.disconnect(); window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule); reduced.removeEventListener("change", schedule); };
  }, [stageRef, titleRef, trackRef, update]);

  return <div ref={root} className={styles.scene} data-hero-split-scene>
    <div ref={source} className={styles.liveWorkspace} aria-label="Afilabs workspace, demo interaktif"><HeroWorkspace view={view} period={period} onView={setView} onPeriod={setPeriod} /></div>
    <div ref={heading} className={styles.splitHeading} id="hero-services"><span className="section-label">The Afilabs ecosystem</span><h2>Empat layanan.<br /><span>Satu arah pertumbuhan.</span></h2><p>Contoh antarmuka untuk mengenali layanan Afilabs.</p></div>
    <div className={styles.shards} aria-labelledby="hero-services">
      {heroServices.map((service, index) => <div key={service.key} className={styles.shard} ref={(node) => { shards.current[index] = node; }}>
        <div className={styles.turn} ref={(node) => { turns.current[index] = node; }}>
          <div className={styles.front} aria-hidden="true" inert><div className={styles.crop} ref={(node) => { crops.current[index] = node; }}><HeroWorkspace view={view} period={period} decorative /></div></div>
          <div className={styles.back} ref={(node) => { backs.current[index] = node; }}><HeroServiceCard index={index} /></div>
        </div>
      </div>)}
    </div>
  </div>;
});
