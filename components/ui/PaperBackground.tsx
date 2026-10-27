/**
 * Background "paper" — empat layer CSS bertumpuk, nol file gambar.
 *
 *  1. Dasar putih
 *  2. Glow biru radial, di-mask jadi garis hairline vertikal
 *  3. Scrim putih (radial + linear) untuk memudarkan tepi atas & bawah
 *  4. Noise feTurbulence inline-SVG dengan mix-blend-mode multiply
 *
 * Server component — tidak mengirim JS sama sekali ke browser.
 */

// Noise di-inline sebagai data URI supaya tidak ada request jaringan tambahan
// yang bisa menunda paint pertama.
const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E\")";

// Garis 1.92px, diulang tiap 14.4px.
const HAIRLINE_MASK =
  "repeating-linear-gradient(90deg, #000 0, #000 1.92px, transparent 1.92px, transparent 14.4px)";

export function PaperBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 opacity-[0.64] ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden bg-white"
      >
        {/* 2 — glow biru, dipotong jadi garis vertikal */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: HAIRLINE_MASK,
            WebkitMaskImage: HAIRLINE_MASK,
          }}
        >
          <div className="absolute inset-[-10%]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 55% at 50% 70%, rgba(82,122,218,0.133), transparent 72%)",
              }}
            />
          </div>
        </div>

        {/* 3 — scrim putih: bikin garis memudar ke arah tepi, bukan berhenti mendadak */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(68% 48% at 50% 24%, #fff 0%, rgba(255,255,255,0.9) 28%, rgba(255,255,255,0.4) 48%, transparent 70%), linear-gradient(#fff 0%, rgba(255,255,255,0.88) 44%, rgba(255,255,255,0.28) 78%, transparent 96%)",
          }}
        />

        {/* 4 — noise halus, menghilangkan banding pada gradien */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundSize: "cover",
            opacity: 0.073,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </div>
  );
}
