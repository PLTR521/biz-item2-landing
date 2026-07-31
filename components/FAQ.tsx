import { PAYMENTS_ENABLED } from "@/lib/pricing";

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
    // 과장 금지: 저장된 이력이 아니라 매 요청 시점의 라이브 DNS 조회가 전부다.
    a: "Three DNSBLs — Spamhaus ZEN, Barracuda, SpamCop — for every IP behind the domain's MX, plus its SPF / DKIM / DMARC records. All of it is read live from DNS at request time and rolled up into one score, one risk level, and a safe volume ceiling. We keep no reputation history, so every answer is what DNS says at the moment you ask.",
  },
  {
    q: "Do you see my email content?",
    a: "Never. The API takes a domain and returns a verdict. It's stateless — there's no dashboard, no warmup period, and nothing to configure.",
  },
  {
    q: "What does the free tier include?",
    // 결제 미연동 — PAYMENTS_ENABLED가 true가 될 때까지 Pro 가격 문장 미노출.
    a: `50 checks per day with an API key issued instantly, no credit card required. The daily limit resets at midnight UTC.${
      PAYMENTS_ENABLED ? " Pro adds 3,000 checks a month for $19." : ""
    }`,
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
