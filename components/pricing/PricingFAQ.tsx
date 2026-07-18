import { FAQS } from "@/lib/pricing";
import PlaceholderText from "./PlaceholderText";

export default function PricingFAQ() {
  return (
    <section
      id="pricing-faq"
      className="scroll-mt-16 border-t border-[var(--border)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow mb-4">02 — Questions</p>
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            Pricing FAQ
          </h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQS.map((item) => (
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
                <PlaceholderText text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
