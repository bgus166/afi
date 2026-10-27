/**
 * Band "dipercaya oleh" — deretan logo brand yang bergulir.
 *
 * Server component tanpa JavaScript sama sekali: gulirannya memakai CSS
 * animation (lihat .marquee di globals.css), bukan rAF atau library.
 */

type Brand = { name: string; glyph: "peak" | "orbit" | "grid" | "bean" | "wave" };

// Placeholder — diganti dengan SVG logo asli saat asetnya tersedia.
const BRANDS: Brand[] = [
  { name: "SkinGlow", glyph: "orbit" },
  { name: "VitaFit", glyph: "peak" },
  { name: "NutraBest", glyph: "bean" },
  { name: "KopiKita", glyph: "grid" },
  { name: "FashionLab", glyph: "wave" },
];

const GLYPHS: Record<Brand["glyph"], React.ReactNode> = {
  peak: <path d="M8 2.5 14 13.5H2L8 2.5Z" />,
  orbit: <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2.4A3.6 3.6 0 1 1 8 11.6 3.6 3.6 0 0 1 8 4.4Z" />,
  grid: <path d="M2.5 2.5h5v5h-5v-5Zm6 0h5v5h-5v-5Zm-6 6h5v5h-5v-5Zm6 0h5v5h-5v-5Z" />,
  bean: <path d="M11 2a5 5 0 0 0-5 5 3 3 0 0 1-3 3v2a5 5 0 0 0 5-5 3 3 0 0 1 3-3h2V2h-2Z" />,
  wave: <path d="M1.5 9.5c1.6-3 3.2-3 4.9 0 1.6 3 3.2 3 4.9 0 .8-1.5 1.6-2.2 2.4-2.2v2.4c-.8 0-1.6.7-2.4 2.2-1.7 3-3.3 3-4.9 0-1.7-3-3.3-3-4.9 0V9.5Z" />,
};

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 px-7 text-[var(--muted)]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0 opacity-70"
      >
        {GLYPHS[brand.glyph]}
      </svg>
      <span className="font-[family-name:var(--font-heading)] text-[1.0625rem] tracking-[-0.02em] whitespace-nowrap">
        {brand.name}
      </span>
    </li>
  );
}

/**
 * Banyaknya salinan daftar di dalam track.
 *
 * Syarat agar tidak pernah ada celah kosong:
 *   (COPIES - 1) x lebar_satu_grup  >=  lebar_viewport
 *
 * Satu grup terukur ~741px, jadi 6 salinan aman sampai viewport ~3700px.
 * Animasinya menggeser tepat selebar SATU salinan, yaitu -100%/COPIES dari
 * lebar track — sehingga titik sambungnya jatuh sempurna.
 */
const COPIES = 6;

export function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-title"
      className="relative z-10 scroll-mt-24 bg-[#fafafa] py-12 md:py-16"
    >
      <h2 id="trusted-title" className="section-label px-6 text-center">
        Dipercaya oleh brand D2C terkemuka Indonesia
      </h2>

      <div className="marquee mt-8">
        <div
          className="marquee__inner"
          style={{ "--marquee-copies": COPIES } as React.CSSProperties}
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            // Hanya salinan pertama yang dibaca screen reader; sisanya
            // murni pengulangan visual agar guliran tak terputus.
            <ul
              key={copy}
              className={`flex items-center ${copy > 0 ? "marquee__dup" : ""}`}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {BRANDS.map((b) => (
                <BrandItem key={`${b.name}-${copy}`} brand={b} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
