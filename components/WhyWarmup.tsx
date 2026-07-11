export default function WhyWarmup() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-[2rem] md:leading-[1.15]">
          Why warmup tools don&apos;t work for agent-sent email
        </h2>
        <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
          Traditional warmup assumes a person slowly ramps up one inbox over
          weeks. Agents don&apos;t send like people. They go quiet for hours,
          then fire off dozens of emails when a workflow triggers. Mailbox
          providers read that as suspicious — even at low total volume.
        </p>
        <p className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-lg font-medium leading-relaxed text-[var(--text-primary)]">
          We&apos;re building a different kind of API for a different kind of
          sender.
        </p>
      </div>
    </section>
  );
}
