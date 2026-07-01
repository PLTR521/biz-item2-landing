const tools = ["LangChain", "CrewAI", "OpenAI Agents SDK", "n8n", "Zapier AI"];

export default function BuiltFor() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-sm text-[var(--text-tertiary)]">
          Designed for teams building with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
