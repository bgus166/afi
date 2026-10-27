/**
 * Gauge cincin — mengadaptasi kartu "AI visibility systems" di referensi:
 * satu cincin besar berisi angka utama, dikelilingi badge satelit.
 *
 * Murni SVG. Cincinnya terisi seiring scroll lewat stroke-dashoffset yang
 * dianimasikan `animation-timeline: view()`.
 */
const SIZE = 168;
const STROKE = 9;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ResultRing({
  percent,
  value,
  caption,
  satellites,
}: {
  percent: number;
  value: string;
  caption: string;
  satellites: { value: string; label: string }[];
}) {
  const filled = CIRCUMFERENCE * (percent / 100);

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
          className="-rotate-90"
        >
          {/* Lintasan cincin */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--accent-soft)"
            strokeWidth={STROKE}
          />
          {/* Bagian terisi */}
          <circle
            className="anim-ring"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
            style={{ ["--ring-dash" as string]: `${filled}` }}
          />
        </svg>

        {/* Angka di tengah cincin */}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p
              className="font-[family-name:var(--font-heading)] leading-none tracking-[-0.04em]"
              style={{ fontSize: "1.75rem" }}
            >
              {value}
            </p>
            <p className="mt-1 font-[family-name:var(--font-technical)] text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              {caption}
            </p>
          </div>
        </div>
      </div>

      {/* Badge satelit */}
      <ul className="flex flex-col gap-2">
        {satellites.map((s) => (
          <li
            key={s.label}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2"
          >
            <p className="font-[family-name:var(--font-heading)] text-[1.0625rem] leading-none tracking-[-0.02em]">
              {s.value}
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-technical)] text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
