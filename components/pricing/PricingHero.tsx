export default function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-32 md:pb-16 md:pt-40">
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-6">Pricing</p>
        <h1 className="mb-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[3.25rem]">
          Simple pricing for AI email agents
        </h1>
        <p className="mb-9 text-lg leading-relaxed text-[var(--text-secondary)]">
          Check domain reputation, spam risk, and safe sending volume from a
          single API call — before your agents hit send. The free tier is live
          today; paid plans are being finalized.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-md bg-[var(--btn)] px-6 py-3 font-medium text-white transition-colors duration-150 hover:bg-[var(--btn-hover)]"
          >
            Get an API key
          </a>
          <p className="font-mono text-xs text-[var(--text-tertiary)]">
            100 checks/day free · no credit card · no SDK required
          </p>
        </div>
      </div>
    </section>
  );
}
