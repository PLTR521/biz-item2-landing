const audiences = [
  "Multi-tenant SaaS",
  "AI Agents",
  "Outbound automation",
];

export default function BuiltFor() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
          Built for
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg font-medium text-[var(--text-secondary)]">
          {audiences.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-[var(--text-tertiary)]">·</span>
              )}
              {label}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
