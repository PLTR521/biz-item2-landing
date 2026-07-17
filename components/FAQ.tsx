const faqs = [
  {
    q: "Is this an ESP?",
    a: "No. It never sends email. It runs one check before your ESP — Resend, SendGrid, Postmark, Amazon SES — and returns a decision. Your ESP still does the sending.",
  },
  {
    q: "Who is it built for?",
    a: "Multi-tenant SaaS platforms sending on behalf of customers, AI agents that send autonomously, and teams running customer email infrastructure.",
  },
  {
    q: "What signals do you inspect?",
    a: "DNSBL listings, SPF / DKIM / DMARC validation, and recent reputation history — per domain, rolled up into one score, one risk level, and a safe volume ceiling.",
  },
  {
    q: "Do you see my email content?",
    a: "Never. The API takes a domain and returns a verdict. It's stateless — there's no dashboard, no warmup period, and nothing to configure.",
  },
  {
    q: "What does the free tier include?",
    a: "100 checks per day with an API key issued instantly. No credit card required.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow mb-4">05 — Questions</p>
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            FAQ
          </h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-medium tracking-[-0.01em] text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:inline"
                >
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
