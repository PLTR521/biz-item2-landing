const steps = [
  {
    title: "POST a domain",
    body: "One HTTP call, right before your ESP would send. No SDK required.",
  },
  {
    title: "We inspect the signals",
    body: "DNSBL, SPF, DKIM, DMARC, and recent reputation history for that specific domain.",
  },
  {
    title: "You get a decision",
    body: "A reputation score, a spam risk level, and a safe send volume for the next 24 hours.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 border-t border-[var(--border)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">03 — Mechanics</p>
        <h2 className="mb-12 text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
          How it works
        </h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--border)]">
          {steps.map((step, i) => (
            <div key={step.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="mb-4 font-mono text-sm text-[var(--text-tertiary)]">
                0{i + 1}
              </p>
              <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em]">
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
