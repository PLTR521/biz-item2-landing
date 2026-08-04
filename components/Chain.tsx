import { Check } from "lucide-react";

/*
  이 섹션의 목적은 단 하나 — "Deliverability API"라는 이름 때문에
  "inbox placement를 직접 측정하는 서비스"로 오해받는 걸 막는 것이다.
  체인의 1·2단계(인증 · 블록리스트)만 우리가 읽는다고 명시하고,
  3·4단계는 결과이지 우리가 재는 값이 아니라고 화면에서 못 박는다.
*/
const chain = [
  {
    label: "Authentication",
    body: "SPF, DKIM, and DMARC are how a mailbox provider confirms a message really came from your domain.",
    reads: "we read this",
  },
  {
    label: "Sender reputation",
    body: "Failed authentication and careless sending erode the trust receivers assign your domain and its IPs.",
    reads: "blocklists, too",
  },
  {
    label: "Inbox placement",
    body: "Low trust means the spam folder — or a rejection before anyone sees the message.",
  },
  {
    label: "Your customer reads it",
    body: "Everything above only matters if the message actually lands.",
  },
];

/*
  실제로 탐지 가능한 것만. 코드 근거:
  lib/dns/auth-records.ts — SPF_MISSING / DMARC_MISSING / DMARC_POLICY_NONE / DKIM_SELECTOR_NOT_FOUND
  lib/dns/dnsbl.ts        — DNSBL_SPAMHAUS_ZEN / DNSBL_BARRACUDA / DNSBL_SPAMCOP
  lib/check.ts            — DOMAIN_UNRESOLVED
  이 목록에 항목을 추가하려면 먼저 그 시그널을 내보내는 코드가 있어야 한다.
*/
const detected = [
  "No SPF record on the domain",
  "No DMARC record",
  "DMARC published, but p=none — a policy that enforces nothing",
  "A DKIM selector with no key published behind it",
  "A sending IP listed on Spamhaus ZEN, Barracuda, or SpamCop",
  "No MX or A record resolving — nothing to send from at all",
];

export default function Chain() {
  return (
    <section
      id="chain"
      className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">01 — What deliverability rests on</p>
        <h2 className="mb-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
          Authentication is the input. Inbox placement is the outcome.
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          Most deliverability investigations start in the same place:
          authentication and domain configuration. That&apos;s the layer this
          API reads — the one you can still fix before the send, and the one
          everything downstream is built on.
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: the causal chain, top to bottom */}
          <ol className="flex flex-col">
            {chain.map((step, i) => (
              <li key={step.label}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="block py-2 pl-4 font-mono text-[var(--text-tertiary)]"
                  >
                    ↓
                  </span>
                )}
                <div
                  className={`rounded-md border px-4 py-3.5 ${
                    step.reads
                      ? "border-[var(--ok)] bg-[var(--ok-soft)]"
                      : "border-[var(--border)] bg-[var(--bg)]"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p
                      className={`text-[15px] font-semibold tracking-tight ${
                        step.reads
                          ? "text-[var(--ok)]"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.reads && (
                      <p className="eyebrow !text-[var(--ok)]">
                        ← {step.reads}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: exactly what the API can surface */}
          <div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5 md:p-6">
              <p className="eyebrow mb-5">
                Authentication issues it detects
              </p>
              <ul className="flex flex-col gap-3.5">
                {detected.map((issue) => (
                  <li key={issue} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ok)]"
                    />
                    <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {issue}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[var(--border)] pt-4 font-mono text-xs leading-relaxed text-[var(--text-tertiary)]">
                DKIM needs a selector to look up — pass one and it&apos;s read
                with the rest. When a blocklist refuses the query, you get
                &quot;unknown&quot;, never &quot;clean&quot;.
              </p>
            </div>

            <p className="mt-6 leading-relaxed text-[var(--text-secondary)]">
              What it doesn&apos;t do is measure inbox placement or delivery
              itself. Those are outcomes decided after the message leaves, and
              nothing running before the send can observe them. This reads the
              inputs they depend on — so a problem becomes something you fix in
              DNS, not something you infer from a bounce rate weeks later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
