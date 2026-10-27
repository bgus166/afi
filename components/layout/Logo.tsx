export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M9 1.5 16.5 16.5H12.6L9 8.7 5.4 16.5H1.5L9 1.5Z"
          fill="currentColor"
        />
      </svg>
      <span
        className="font-[family-name:var(--font-technical)] text-[0.6875rem] font-medium uppercase tracking-[0.16em]"
        style={{ letterSpacing: "0.16em" }}
      >
        Afilabs
      </span>
    </span>
  );
}
