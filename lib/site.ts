/**
 * Satu sumber kebenaran untuk metadata situs.
 * Dipakai oleh layout, sitemap, robots, dan JSON-LD supaya tidak ada yang melenceng.
 */
export const site = {
  name: "Afilabs",
  // Dipakai untuk canonical & OG. Ganti ke domain produksi saat cutover.
  url: "https://afilabs.id",
  locale: "id_ID",
  lang: "id",
  title: "Afilabs — AI Growth Partner untuk Brand D2C Indonesia",
  description:
    "Afilabs membangun sistem AI yang mengotomatisin operasional, menumbuhkan afiliasi, dan memberi visibilitas penuh ke bisnis kamu. Bukan hanya teknologi — hasil yang terukur.",
  tagline: "AI Growth Partner untuk Brand D2C Indonesia",
} as const;

export const nav = [
  { label: "How We Work", href: "/how-it-works" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const navigationGroups = [
  {
    id: "services", label: "Services",
    items: [
      { label: "AfiAssist", description: "AI Customer Service 24/7", href: "/services/afiassist" },
      { label: "AfiCreator", description: "AI Content Engine & Briefs", href: "/services/aficreator" },
      { label: "AfiInsight", description: "AI Business Intelligence", href: "/services/afiinsight" },
      { label: "AfiFlow", description: "AI Workflow Automation", href: "/services/afiflow" },
    ],
  },
  {
    id: "solutions", label: "Solutions",
    items: [
      { label: "For D2C Brands", description: "Build high-margin direct channels", href: "/solutions/for-d2c-brands" },
      { label: "For Marketplace Sellers", description: "Diversify from Shopee/TikTok", href: "/solutions/for-marketplace-sellers" },
      { label: "For Affiliate-led Brands", description: "Scale creators without chaos", href: "/solutions/for-affiliate-brands" },
    ],
  },
] as const;
