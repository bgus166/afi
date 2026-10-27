import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PaperBackground } from "@/components/ui/PaperBackground";
import { site } from "@/lib/site";
import styles from "./ServicePage.module.css";

export const serviceContact = "https://afilabs.id/contact";

export function ServiceHero({ name, category, title, lead, action, demo, children }: {
  name: string; category: string; title: ReactNode; lead: string; action: string; demo: string; children: ReactNode;
}) {
  return <section className={styles.hero} aria-labelledby={`${name.toLowerCase()}-title`}>
    <PaperBackground />
    <div className={`${styles.container} ${styles.heroGrid}`}>
      <div className={styles.heroCopy}>
        <Link href="/#solutions" className={styles.breadcrumb}>Services <span>/ {name}</span></Link>
        <p className={styles.eyebrow}><span className={styles.dot} />{category}</p>
        <h1 id={`${name.toLowerCase()}-title`}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        <div className={styles.actions}><a href={serviceContact} className={styles.primary}>{action}<ArrowUpRight size={15} aria-hidden="true" /></a><a href={`#${demo}`} className={styles.textLink}>Coba demo <ArrowDown size={14} aria-hidden="true" /></a></div>
      </div>
      <div className={styles.heroScene}>{children}</div>
    </div>
    <div className={`${styles.container} ${styles.heroRail}`}><span className={styles.eyebrow}>{name} / Built around your business</span><a href={`#${demo}`} aria-label={`Jelajahi demo ${name}`}><ArrowDown size={16} aria-hidden="true" /></a><span className={styles.eyebrow}>Less manual. More momentum.</span></div>
  </section>;
}

export function SectionHeading({ id, label, title, aside }: { id: string; label: string; title: ReactNode; aside?: string }) {
  return <div className={`${styles.sectionHeading} ${styles.reveal}`}><div><h2 id={id} className="section-label">{label}</h2><p className={styles.title}>{title}</p></div>{aside && <p className={styles.aside}>{aside}</p>}</div>;
}

export function ProblemCards({ items }: { items: { title: string; body: string; tag: string }[] }) {
  return <ol className={styles.problemGrid}>{items.map((item, i) => <li key={item.title} className={styles.reveal} style={{ ["--offset" as string]: `${i * 7}%` }}><span className={styles.eyebrow}>0{i + 1} / {item.tag}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight size={17} aria-hidden="true" /></li>)}</ol>;
}

export function ServiceCTA({ id, label, title, body, action }: { id: string; label: string; title: ReactNode; body: string; action: string }) {
  return <section className={styles.cta} aria-labelledby={id}><PaperBackground /><div className={`${styles.container} ${styles.ctaInner}`}><span className={styles.ctaMark} aria-hidden="true">✳</span><p className="section-label">{label}</p><h2 id={id} className={styles.reveal}>{title}</h2><p>{body}</p><div className={styles.actions}><a href={serviceContact} className={styles.primary}>{action}<ArrowUpRight size={15} aria-hidden="true" /></a><a href={serviceContact} className={styles.textLink}>Talk to our team <ArrowUpRight size={14} aria-hidden="true" /></a></div></div></section>;
}

export function ServiceSchema({ name, slug, description, type }: { name: string; slug: string; description: string; type: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${site.url}/services/${slug}#service`, name, description, serviceType: type, url: `${site.url}/services/${slug}`, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "Indonesia" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Beranda", item: site.url }, { "@type": "ListItem", position: 2, name, item: `${site.url}/services/${slug}` }] },
  ] }) }} />;
}
