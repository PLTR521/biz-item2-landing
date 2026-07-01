import { CircleCheck } from "lucide-react";

// 검증된 사실 (단정형). 아래 Hypothesis 섹션(가설형)과 시각적으로 의도적으로 구분한다.
export default function KnownFacts() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8">
          <div className="mb-3 flex items-center gap-2">
            <CircleCheck className="h-5 w-5 shrink-0 text-[var(--success)]" />
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              What we know about spam filters
            </h2>
          </div>
          <p className="leading-relaxed text-[var(--text-secondary)]">
            Mailbox providers trust senders who ramp up gradually and predictably.
            Sudden volume spikes are one of the most common triggers for spam
            filtering — this is standard, documented practice across every major
            deliverability guide.
          </p>
        </div>
      </div>
    </section>
  );
}
