const metrics = [
  { label: "Domain reputation", value: "Healthy", good: true },
  { label: "Spam risk", value: "Low", good: true },
  { label: "Safe to send today", value: "1,200", good: false },
  { label: "Recommended volume", value: "850", good: false },
];

export default function Preview() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            One thing, done right
          </h2>
          <span className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
            example
          </span>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-[var(--text-tertiary)]">
              sendguard.check("yourdomain.com")
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 rounded-xl bg-[var(--bg-secondary)] p-5 sm:grid-cols-2">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4"
              >
                <p className="mb-1 text-xs text-[var(--text-tertiary)]">
                  {m.label}
                </p>
                <p
                  className={`text-2xl font-semibold ${
                    m.good ? "text-[var(--success)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-[var(--text-secondary)]">
          One API call. Warmup, dashboards, and alerts come later — right now
          we&apos;re solving this one thing.
        </p>
      </div>
    </section>
  );
}
