import { Micro, PreviewShell } from "./PreviewShell";

const STEPS = [
  { name: "Rekap order", state: "done" },
  { name: "Follow-up payment", state: "done" },
  { name: "Hitung komisi", state: "running" },
  { name: "Laporan mingguan", state: "queued" },
];

/** Kanvas alur kerja — node terhubung garis putus-putus yang berjalan. */
export function AfiFlowPreview() {
  return (
    <PreviewShell app="AfiFlow · Workflow" status="4 alur aktif">
      <div className="flex h-full flex-col gap-3">
        <div className="relative flex flex-col gap-2">
          {STEPS.map((s, i) => (
            <div key={s.name} className="relative">
              <div className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-2">
                <StateDot state={s.state} />
                <span className="text-[0.75rem]">{s.name}</span>
                <Micro className="ml-auto">
                  {s.state === "done"
                    ? "selesai"
                    : s.state === "running"
                      ? "berjalan"
                      : "antre"}
                </Micro>
              </div>

              {/* Konektor putus-putus antar node */}
              {i < STEPS.length - 1 && (
                <svg
                  width="2"
                  height="10"
                  viewBox="0 0 2 10"
                  className="ml-[1.0625rem] block"
                  aria-hidden="true"
                >
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="10"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    className="anim-dash"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]">
          <div className="bg-[var(--surface-strong)] px-2.5 py-2">
            <Micro>Dihemat</Micro>
            <p className="mt-0.5 font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
              10,5 jam/mgg
            </p>
          </div>
          <div className="bg-[var(--surface-strong)] px-2.5 py-2">
            <Micro>Jalan otomatis</Micro>
            <p className="mt-0.5 font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
              312 task
            </p>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function StateDot({ state }: { state: string }) {
  if (state === "done") {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[var(--accent)]">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path
            d="M1.5 4.2 3.2 6 6.5 2.5"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "running") {
    return (
      <span className="anim-pulse size-4 shrink-0 rounded-full border-2 border-[var(--accent)]" />
    );
  }
  return (
    <span className="size-4 shrink-0 rounded-full border border-dashed border-[var(--muted)]" />
  );
}
