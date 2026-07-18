import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { PRO_PAYMENT_LINK, TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Upgrade to Pro — Email Deliverability API",
  description:
    "Pro: $19/month for 3,000 checks, higher rate limits, and usage-based overage ($5 per 1,000 checks) so your agents never hit a wall.",
};

// 사용량 100% 도달 시 카드 미등록 고객이 도착하는 업그레이드 페이지.
// 결제는 Stripe Payment Link(sendguard-ai T14 설계) — 링크가 env에 없으면
// 정직한 준비-중 안내 + 무료 플랜 폴백을 보여준다.
export default function UpgradePage() {
  const pro = TIERS.find((t) => t.id === "pro")!;

  return (
    <main>
      <Nav />

      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          aria-hidden="true"
          className="bg-blueprint pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-6">Upgrade</p>
            <h1 className="mb-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[3.25rem]">
              Upgrade to Pro
            </h1>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              3,000 checks a month, a higher rate limit, and usage-based
              overage — so a busy agent never gets cut off mid-send.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl items-start gap-8 md:grid-cols-2">
            {/* What you get */}
            <div className="rounded-md border border-[var(--ok)] bg-white p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-tight">Pro</h2>
                <p className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight">
                    {pro.price}
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)]">
                    {pro.priceNote}
                  </span>
                </p>
              </div>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm">
                {pro.highlights.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 self-center text-[var(--ok)]"
                    />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                {PRO_PAYMENT_LINK ? (
                  <a
                    href={PRO_PAYMENT_LINK}
                    className="inline-flex w-full items-center justify-center rounded-md bg-[var(--btn)] px-6 py-3 font-medium text-white transition-colors duration-150 hover:bg-[var(--btn-hover)]"
                  >
                    Continue to checkout — $19/month
                  </a>
                ) : (
                  <div className="rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-3.5">
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      Card checkout isn&apos;t live yet — we&apos;re finishing
                      our Stripe setup. The Free plan works today: 25 checks a
                      month with an instant API key.
                    </p>
                    <a
                      href="#waitlist"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-muted)]"
                    >
                      Get a free API key
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* How it works */}
            <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-6">
              <h2 className="text-lg font-semibold tracking-tight">
                How upgrading works
              </h2>
              <ol className="mt-5 flex flex-col gap-4 text-sm">
                {[
                  "Pay by card through Stripe checkout.",
                  "Your Pro API key arrives by email within minutes.",
                  "Drop it into your existing Authorization header — nothing else changes.",
                ].map((step, i) => (
                  <li key={step} className="flex items-baseline gap-3">
                    <span className="shrink-0 font-mono text-xs text-[var(--text-tertiary)]">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed text-[var(--text-secondary)]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                Past 3,000 checks, overage bills automatically at{" "}
                <span className="font-medium text-[var(--text-primary)]">
                  $5 per 1,000 checks
                </span>{" "}
                — the API never stops mid-send. We email you a heads-up at 80%
                of your quota.
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[var(--text-secondary)]">
            Need 50,000+ checks, an SLA, or a custom contract?{" "}
            <Link
              href="/pricing"
              className="font-medium text-[var(--text-primary)] underline underline-offset-4 hover:no-underline"
            >
              Compare all plans
            </Link>
          </p>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
