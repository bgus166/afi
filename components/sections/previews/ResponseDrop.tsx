import { Micro } from "./PreviewShell";

/**
 * Perbandingan sebelum/sesudah — dua batang dengan panjang berbeda.
 * Panjang batang sengaja dihitung dari nilai sebenarnya (4 jam vs 90 detik),
 * bukan angka dekoratif, supaya proporsinya jujur.
 */
export function ResponseDrop({
  before,
  after,
  beforeLabel,
  afterLabel,
  badge,
}: {
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
  badge: string;
}) {
  const afterWidth = Math.max((after / before) * 100, 3);

  return (
    <div className="flex flex-col gap-4">
      <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-2.5 py-1 font-[family-name:var(--font-technical)] text-[0.5625rem] uppercase tracking-[0.14em] text-[var(--accent)]">
        {badge}
      </span>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-baseline justify-between">
            <Micro>Sebelum</Micro>
            <span className="text-[0.8125rem] text-[var(--muted)]">
              {beforeLabel}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 w-full rounded-full bg-[var(--surface-soft)]">
            <div className="h-full w-full rounded-full bg-[var(--muted)] opacity-40" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Micro>Sesudah</Micro>
            <span className="font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
              {afterLabel}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 w-full rounded-full bg-[var(--surface-soft)]">
            <div
              className="anim-drop h-full rounded-full bg-[var(--accent)]"
              style={{ width: `${afterWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
