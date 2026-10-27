"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChartNoAxesCombined, ChevronDown, GitBranch, Menu, MessageSquare, Sparkles, X } from "lucide-react";
import { nav, navigationGroups } from "@/lib/site";
import styles from "./Header.module.css";

type GroupId = typeof navigationGroups[number]["id"];
const serviceIcons = [MessageSquare, Sparkles, ChartNoAxesCombined, GitBranch];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusSubmenu = useRef(false);
  const openedViaHover = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeAll = () => {
    cancelClose(); openedViaHover.current = false; setOpenGroup(null); setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    const onResize = () => {
      if (window.innerWidth > 1120) setMobileOpen(false);
      setOpenGroup(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openGroup || !focusSubmenu.current) return;
    header.current?.querySelector<HTMLAnchorElement>(`#nav-panel-${openGroup} a`)?.focus();
    focusSubmenu.current = false;
  }, [openGroup]);

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (mobileOpen) {
        closeAll(); menuToggle.current?.focus();
      } else if (openGroup) {
        const trigger = header.current?.querySelector<HTMLButtonElement>(`#nav-trigger-${openGroup}`);
        setOpenGroup(null); trigger?.focus();
      }
    }
    if (mobileOpen && event.key === "Tab") {
      const navElement = header.current?.querySelector<HTMLElement>("#primary-navigation");
      const focusable = [...(navElement?.querySelectorAll<HTMLElement>("a, button") ?? [])]
        .filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      const first = focusable[0];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); menuToggle.current?.focus();
      } else if (!event.shiftKey && document.activeElement === menuToggle.current) {
        event.preventDefault(); first?.focus();
      }
    }
  }

  return (
    <header
      ref={header}
      className={`${styles.header} ${scrolled || openGroup || mobileOpen ? styles.solid : ""}`}
      onKeyDown={handleKeys}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenGroup(null); setMobileOpen(false);
        }
      }}
    >
      <div className={styles.bar}>
        <Link href="/" aria-label="Afilabs — beranda" className={styles.brand} onClick={closeAll}>
          <svg width="24" height="28" viewBox="0 0 116 140" fill="none" aria-hidden="true"><path d="M58 16 116 132H88L58 62.4 28 132H0L58 16Z" fill="currentColor" /></svg>
          <span>Afilabs</span>
        </Link>
        <nav id="primary-navigation" aria-label="Utama" className={styles.navigation} data-mobile-open={mobileOpen}>
          <ul className={styles.navList}>
            {navigationGroups.map((group) => {
              const isOpen = openGroup === group.id;
              return <li key={group.id} className={styles.group}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && window.innerWidth > 1120) {
                    cancelClose();
                    if (openGroup !== group.id) { openedViaHover.current = true; setOpenGroup(group.id); }
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" && window.innerWidth > 1120) {
                    cancelClose(); closeTimer.current = setTimeout(() => { setOpenGroup(null); openedViaHover.current = false; }, 150);
                  }
                }}
              >
                <button type="button" id={`nav-trigger-${group.id}`} className={styles.navTrigger} aria-expanded={isOpen} aria-controls={`nav-panel-${group.id}`}
                  onClick={() => {
                    cancelClose(); setOpenGroup(isOpen && !openedViaHover.current ? null : group.id); openedViaHover.current = false;
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault(); cancelClose(); openedViaHover.current = false;
                      if (isOpen) header.current?.querySelector<HTMLAnchorElement>(`#nav-panel-${group.id} a`)?.focus();
                      else { focusSubmenu.current = true; setOpenGroup(group.id); }
                    }
                  }}
                >{group.label}<ChevronDown size={12} aria-hidden="true" /></button>
                <div id={`nav-panel-${group.id}`} className={`${styles.dropdown} ${group.id === "services" ? styles.services : styles.solutions}`} data-open={isOpen}>
                  <ul>{group.items.map((item, index) => {
                    const Icon = serviceIcons[index];
                    return <li key={item.href}><Link href={item.href} prefetch={false} aria-current={pathname === item.href ? "page" : undefined} onClick={closeAll}>
                      {group.id === "services" && <span className={styles.serviceIcon}><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>}
                      <span className={styles.menuCopy}><strong>{item.label}</strong><span>{item.description}</span></span>
                    </Link></li>;
                  })}</ul>
                </div>
              </li>;
            })}
            {nav.map((item) => <li key={item.href}><Link href={item.href} className={styles.navLink} prefetch={false} aria-current={pathname === item.href ? "page" : undefined} onClick={closeAll}
              onPointerEnter={() => { if (window.innerWidth > 1120) { cancelClose(); setOpenGroup(null); } }}
            >{item.label}</Link></li>)}
          </ul>
          <Link href="/contact" prefetch={false} className={`${styles.audit} ${styles.mobileAudit}`} onClick={closeAll}>Book Free Audit <ArrowRight size={17} aria-hidden="true" /></Link>
        </nav>
        <Link href="/contact" prefetch={false} className={`${styles.audit} ${styles.desktopAudit}`} onClick={closeAll}>Book Free Audit <ArrowRight size={17} aria-hidden="true" /></Link>
        <button ref={menuToggle} type="button" className={styles.mobileToggle} aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"} aria-expanded={mobileOpen} aria-controls="primary-navigation"
          onClick={() => { cancelClose(); setMobileOpen(!mobileOpen); setOpenGroup(null); }}
        >{mobileOpen ? <X size={27} strokeWidth={1.5} /> : <Menu size={27} strokeWidth={1.5} />}</button>
      </div>
      {mobileOpen && <button type="button" className={styles.backdrop} aria-label="Tutup menu navigasi" tabIndex={-1} onClick={() => { closeAll(); menuToggle.current?.focus(); }} />}
    </header>
  );
}
