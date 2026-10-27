import { Micro, PreviewShell } from "./PreviewShell";

const SOURCES = ["Shopee", "TikTok Shop", "Website", "Spreadsheet"];
const BARS = [42, 51, 47, 63, 58, 72, 81, 76, 88, 94];

const ACTIONS = [
  { tone: "high", text: "Naikkan komisi 3 creator top — ROI tertinggi minggu ini" },
  { tone: "mid", text: "18 afiliator belum posting 14 hari, kirim reminder" },
];

/** Dashboard yang menarik data multi-platform lalu memberi action item. */
export function AfiInsightPreview() {
  return (
    <PreviewShell app="AfiInsight · Weekly Actions" status="Live" statusTone="live">
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {SOURCES.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2 py-1"
            >
              <span className="size-1 rounded-full bg-[var(--accent)]" />
              <Micro>{s}</Micro>
            </span>
          ))}
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Micro>GMV afiliasi — 10 minggu</Micro>
            <span className="font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
              +34%
            </span>
          </div>
          <div className="mt-2 flex h-20 items-end gap-1">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="anim-bar flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i >= BARS.length - 3 ? "var(--accent)" : "var(--accent-soft)",
                  // Batang tumbuh bergiliran dari kiri ke kanan
                  ["--reveal-offset" as string]: `${i * 2}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-1.5">
          <Micro>Action items</Micro>
          {ACTIONS.map((a) => (
            <div
              key={a.text}
              className="flex items-start gap-2 rounded-lg border border-[var(--border)] px-2.5 py-2"
            >
              <span
                className={`mt-1 size-1.5 shrink-0 rounded-full ${
                  a.tone === "high" ? "bg-[var(--accent)]" : "bg-[var(--muted)]"
                }`}
              />
              <p className="text-[0.75rem] leading-snug">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}
