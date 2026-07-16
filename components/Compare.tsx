export default function Compare() {
  const rows = [
    {
      need: "Send email",
      solution: "Resend · SendGrid · Postmark",
      accent: false,
    },
    {
      need: "Check deliverability before sending",
      solution: "SendGuard",
      accent: true,
    },
  ];

  return (
    <section className="border-t border-[var(--border)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-[2rem] md:leading-[1.15]">
          Why not just Resend or SendGrid?
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          SendGuard doesn&apos;t replace your ESP. It runs before it — a safety
          layer between your app and the send.
        </p>

        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="grid grid-cols-[1fr_1fr] border-b border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            <div>Need</div>
            <div>Solution</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.need}
              className={`grid grid-cols-[1fr_1fr] items-center px-5 py-4 text-[15px] md:text-base ${
                i > 0 ? "border-t border-[var(--border)]" : ""
              }`}
            >
              <div className="pr-4 text-[var(--text-secondary)]">
                {row.need}
              </div>
              <div
                className={
                  row.accent
                    ? "font-semibold text-[var(--text-primary)]"
                    : "text-[var(--text-primary)]"
                }
              >
                {row.solution}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[var(--text-tertiary)]">
          Think of it as <span className="text-[var(--text-secondary)]">Resend + SendGuard</span>,
          not <span className="text-[var(--text-secondary)]">Resend or SendGuard</span>.
        </p>
      </div>
    </section>
  );
}
