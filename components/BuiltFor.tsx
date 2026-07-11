const tools = [
  "LangChain",
  "CrewAI",
  "Vercel AI SDK",
  "n8n",
  "OpenAI Agents SDK",
];

export default function BuiltFor() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
          Built for teams shipping with
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg font-medium text-[var(--text-secondary)]">
          {tools.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-[var(--text-tertiary)]">·</span>
              )}
              {t}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
