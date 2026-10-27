import { Micro } from "./PreviewShell";

/** Dua angka berdampingan — visual ringkas untuk kartu case study. */
export function MetricPair({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]">
      {items.map((m) => (
        <li key={m.label} className="bg-[var(--surface-strong)] px-4 py-4">
          <p
            className="font-[family-name:var(--font-heading)] leading-none tracking-[-0.03em] text-[var(--accent)]"
            style={{ fontSize: "1.75rem" }}
          >
            {m.value}
          </p>
          <p className="mt-2">
            <Micro>{m.label}</Micro>
          </p>
        </li>
      ))}
    </ul>
  );
}
