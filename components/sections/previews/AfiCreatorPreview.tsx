import { Micro, PreviewShell } from "./PreviewShell";

const HOOKS = [
  { platform: "TikTok", text: "POV: kulit kusam kamu hilang dalam 7 hari" },
  { platform: "TikTok", text: "3 kesalahan pakai serum vitamin C" },
  { platform: "Instagram", text: "Sebelum / sesudah 14 hari — tanpa filter" },
];

/** Panel generate brief konten untuk ratusan afiliator. */
export function AfiCreatorPreview() {
  return (
    <PreviewShell app="AfiCreator · Brief Generator" status="Generating">
      <div className="flex h-full flex-col gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-2">
          <Micro>Input produk</Micro>
          <p className="mt-1 text-[0.75rem] leading-snug text-[var(--text)]">
            Serum Vitamin C 20ml — USP: cerahkan dalam 7 hari, BPOM, non-sticky
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {HOOKS.map((h, i) => (
            <div
              key={h.text}
              // Baris terakhir masih "diproses" — shimmer menandai prosesnya
              className={`relative overflow-hidden rounded-lg border border-[var(--border)] px-2.5 py-2 ${
                i === HOOKS.length - 1 ? "anim-shimmer" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Micro className="shrink-0">{h.platform}</Micro>
                <span className="h-px flex-1 bg-[var(--border)]" />
                <Micro className="shrink-0">Hook {i + 1}</Micro>
              </div>
              <p className="mt-1 text-[0.75rem] leading-snug">{h.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between rounded-lg bg-[var(--surface-soft)] px-2.5 py-2">
          <Micro>248 afiliator</Micro>
          <Micro>1.240 aset dibuat</Micro>
        </div>
      </div>
    </PreviewShell>
  );
}
