import { TestimonialCards } from "./TestimonialCards";
import styles from "./Testimonials.module.css";

const QUOTES = [
  {
    quote:
      "Sebelum Afilabs, kami kelola 150 afiliator pakai WhatsApp dan Excel. Sekarang semua otomatis. Tim kami bisa fokus ke strategi.",
    role: "Founder",
    company: "Brand Skincare D2C",
  },
  {
    quote:
      "AfiAssist handle pertanyaan CS dalam bahasa Indonesia yang natural. Customer tidak terasa ngobrol dengan bot.",
    role: "Head of Operations",
    company: "Brand Suplemen",
  },
  {
    quote:
      "Dari audit sampai sistem live cuma 3 minggu. Vendor lain butuh 3 bulan untuk hal yang sama.",
    role: "CEO",
    company: "Brand F&B D2C",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className={styles.section}>
      <div className={styles.scene}>
        <p className={styles.label}>05 / What Clients Say</p>
        <h2 id="testimonials-title" className={styles.headline}>
          Dipercaya brand<br />yang serius<br />bertumbuh.
        </h2>
        <div className={styles.intro}>
          <span className={styles.crosses} aria-hidden="true">× × ×</span>
          <p>Di balik setiap sistem, ada tim yang kini punya lebih banyak ruang untuk <span>bertumbuh.</span></p>
          <span className={styles.annotation}>[ Cerita klien ]</span>
        </div>
        <TestimonialCards className={styles.cards}>
          {QUOTES.map((q, i) => (
            <figure key={q.quote} className={styles.card} data-testimonial-card>
              <blockquote className={styles.quote}>“{q.quote}”</blockquote>
              <figcaption className={styles.caption}>
                <span className={styles.number} aria-hidden="true">[ 0{i + 1} ]</span>
                <span className={styles.person}>
                  <span className={styles.role}>{q.role}</span>
                  <span className={styles.company}>{q.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </TestimonialCards>
        <div className={styles.outro}>
          <span className={styles.crosses} aria-hidden="true">× × ×</span>
          <p>Lebih sedikit pekerjaan manual.<br /><span>Lebih banyak dampak nyata.</span></p>
          <span className={styles.annotation}>[ Afilabs / Client stories ]</span>
        </div>
      </div>
    </section>
  );
}
