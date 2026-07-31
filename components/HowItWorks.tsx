const steps = [
  {
    title: "POST a domain",
    body: "One HTTP call, right before your ESP would send. No SDK required.",
  },
  {
    title: "We inspect the signals",
    // 실제로 하는 일만 적는다: 요청 시점의 라이브 DNS 조회.
    // 이력 데이터는 저장도 조회도 하지 않으므로 "reputation history"라고 쓰면 거짓말이 된다.
    body: "Live DNS at request time: DNSBL listings for every IP behind that domain's MX, plus its SPF, DKIM, and DMARC records.",
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
