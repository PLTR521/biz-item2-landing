const steps = [
  {
    title: "POST a domain",
    body: "Send us a domain via the check endpoint.",
  },
  {
    title: "We inspect the signals",
    body: "DNS records, blacklists, reputation history, recent send patterns.",
  },
  {
    title: "You get a decision",
    body: "A score, a spam risk level, and a safe send volume for the next 24 hours.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-2xl font-bold tracking-tight md:text-[2rem]">
          How it works
        </h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <div key={step.title}>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] font-mono text-sm font-semibold text-[var(--accent)]">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
