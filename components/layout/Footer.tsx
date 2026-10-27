import Link from "next/link";
import { Logo } from "./Logo";
import TechText from "@/components/vendor/reactbits/TechText";
import styles from "./Footer.module.css";

/** Kolom menu — seluruhnya rute yang benar-benar ada di afilabs.id. */
const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "AfiAssist", href: "/services/afiassist" },
      { label: "AfiCreator", href: "/services/aficreator" },
      { label: "AfiInsight", href: "/services/afiinsight" },
      { label: "AfiFlow", href: "/services/afiflow" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For D2C Brands", href: "/solutions/for-d2c-brands" },
      {
        label: "For Marketplace Sellers",
        href: "/solutions/for-marketplace-sellers",
      },
      {
        label: "For Affiliate-led Brands",
        href: "/solutions/for-affiliate-brands",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/**
 * TODO: ganti dengan URL profil asli. Situs afilabs.id yang sekarang pun
 * masih menunjuk ke beranda masing-masing platform, jadi nilainya dibawa
 * apa adanya — tapi ini tautan mati sampai diisi.
 */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M4.98 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1 6.5h4V16H1V6.5Zm6 0h3.8v1.3a4.2 4.2 0 0 1 3.7-1.5c2.6 0 4.5 1.6 4.5 5V16h-4v-4.2c0-1.4-.5-2.3-1.8-2.3-1 0-1.6.7-1.8 1.4-.1.3-.1.6-.1 1V16H7V6.5Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M9.5 2c-2 0-2.3 0-3.1.05-.8.03-1.3.16-1.8.35a3.6 3.6 0 0 0-1.3.85c-.4.4-.65.8-.85 1.3-.19.5-.32 1-.35 1.8C2 7.2 2 7.5 2 9.5s0 2.3.05 3.1c.3.8.16 1.3.35 1.8.2.5.45.9.85 1.3.4.4.8.65 1.3.85.5.19 1 .32 1.8.35.8.05 1.1.05 3.1.05s2.3 0 3.1-.05c.8-.03 1.3-.16 1.8-.35.5-.2.9-.45 1.3-.85.4-.4.65-.8.85-1.3.19-.5.32-1 .35-1.8.05-.8.05-1.1.05-3.1s0-2.3-.05-3.1c-.03-.8-.16-1.3-.35-1.8a3.6 3.6 0 0 0-.85-1.3c-.4-.4-.8-.65-1.3-.85-.5-.19-1-.32-1.8-.35C11.8 2 11.5 2 9.5 2Zm0 1.6c2 0 2.2 0 3 .05.7.03 1.1.15 1.4.25.35.14.6.3.85.55.25.25.41.5.55.85.1.3.22.7.25 1.4.05.8.05 1 .05 3s0 2.2-.05 3c-.3.7-.15 1.1-.25 1.4a2.3 2.3 0 0 1-.55.85c-.25.25-.5.41-.85.55-.3.1-.7.22-1.4.25-.8.05-1 .05-3 .05s-2.2 0-3-.05c-.7-.03-1.1-.15-1.4-.25a2.3 2.3 0 0 1-.85-.55 2.3 2.3 0 0 1-.55-.85c-.1-.3-.22-.7-.25-1.4-.05-.8-.05-1-.05-3s0-2.2.05-3c.03-.7.15-1.1.25-1.4.14-.35.3-.6.55-.85.25-.25.5-.41.85-.55.3-.1.7-.22 1.4-.25.8-.05 1-.05 3-.05Zm0 2.7a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm0 5.28a2.08 2.08 0 1 1 0-4.16 2.08 2.08 0 0 1 0 4.16Zm4.08-5.4a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
  },
  {
    label: "X",
    href: "https://twitter.com",
    path: "M13.2 2.5h2.4l-5.3 6 6.2 8.2h-4.9l-3.8-5-4.4 5H1l5.6-6.4L.7 2.5h5l3.5 4.6 4-4.6Zm-.85 12.8h1.33L5.3 3.85H3.87l8.48 11.45Z",
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Afilabs — beranda">
              <Logo />
            </Link>

            <p className={styles.tagline}>Scale smarter. Grow faster.</p>

            <p className={styles.address}>
              Plaza Mutiara, 8th floor, 1&amp;2
              <br />
              Jl. DR. Ide Anak Agung Gde Agung Kav. E.1.2, RT.5/RW.2
              <br />
              Kuningan Timur, Setiabudi, Jakarta Selatan 12950
            </p>

            <div className={styles.contact}>
              <a href="mailto:hello@afilabs.id">hello@afilabs.id</a>
              <a
                href="https://wa.me/6281295429576"
                target="_blank"
                rel="noopener noreferrer"
              >
                +62 812-9542-9576
              </a>
            </div>

            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 19 19" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.title} className={styles.col}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Wordmark lebar dengan bagian bawah terpotong seperti referensi Figma. */}
      <div className={styles.wordmark}>
        <div className={styles.art}>
          <TechText
            text="Afilabs"
            fontWeight={700}
            fontSize={1000}
            letterSpacing={-0.055}
            color="#515767"
            accentColor="#e9edff"
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
          />
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Afilabs. All rights reserved.</span>
          <span>AI Growth &amp; Operations Engineering</span>
        </div>
      </div>
    </footer>
  );
}
