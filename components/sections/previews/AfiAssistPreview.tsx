import { Micro, PreviewShell } from "./PreviewShell";

/** Konsol percakapan WhatsApp — memperlihatkan AI membalas lalu eskalasi. */
export function AfiAssistPreview() {
  return (
    <PreviewShell app="AfiAssist · WhatsApp Business" status="Online 24/7" statusTone="live">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex flex-col gap-2">
          <Bubble side="in">Halo, serum vitamin C 20ml ready?</Bubble>
          <Bubble side="out">
            Ready, Kak. Stok 20ml tersedia. Saya kirimkan link checkout-nya ya.
          </Bubble>
          <Bubble side="in">Bisa COD ke Bandung?</Bubble>

          {/* Indikator AI sedang menyusun balasan */}
          <div className="flex w-fit items-center gap-1 rounded-lg rounded-tr-sm bg-[var(--accent-soft)] px-2.5 py-2 ml-auto">
            <span className="anim-typing flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            </span>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]">
          <Metric label="Respons" value="1m 42s" />
          <Metric label="Ditangani AI" value="80%" />
          <Metric label="Eskalasi" value="2" />
        </div>
      </div>
    </PreviewShell>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const isOut = side === "out";
  return (
    <div
      className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[0.75rem] leading-[1.45] ${
        isOut
          ? "ml-auto rounded-tr-sm bg-[var(--accent-soft)] text-[var(--text)]"
          : "rounded-tl-sm bg-[var(--surface-soft)] text-[var(--text)]"
      }`}
    >
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--surface-strong)] px-2.5 py-2">
      <Micro>{label}</Micro>
      <p className="mt-0.5 font-[family-name:var(--font-heading)] text-[0.9375rem] tracking-[-0.02em]">
        {value}
      </p>
    </div>
  );
}
