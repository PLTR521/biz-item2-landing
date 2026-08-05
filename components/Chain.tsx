import { Check } from "lucide-react";

/*
  ── 이 섹션은 2순위다 ──────────────────────────────────────────────────────
  예전에는 이 내용이 1순위였다. 수집 사례상 인증 미설정이 실제 주원인이었던 건
  심층 12건 중 1건뿐이라, 지금은 IP 섹션(01) 뒤로 내렸다.
  다만 삭제하지는 않는다 — 인증은 전제조건이고, 발송 전에 고칠 수 있는 몇 안 되는
  층이다. 도입 문장 "Authentication isn't reputation."은 커뮤니티가 반복해서 하는
  교정이고 이 섹션의 존재 이유이므로 빼지 말 것.

  이 섹션의 목적은 "Deliverability API"라는 이름 때문에 inbox placement를 직접
  측정한다고 오해받는 걸 막는 것이기도 하다. 체인의 1·2단계만 우리가 읽는다.
*/
const chain = [
  {
    label: "Authentication",
    body: "SPF, DKIM, and DMARC are how a mailbox provider confirms a message really came from your domain.",
    reads: "we read this",
  },
  {
    label: "Sender reputation",
    body: "Trust accumulated on your domain and its IPs over time. Blocklist listings are one visible slice of it — the rest lives inside each provider.",
    reads: "blocklists only",
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
        <p className="eyebrow mb-4">03 — Authentication</p>
        <h2 className="mb-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
          Authentication isn&apos;t reputation.
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          It is a precondition. Passing SPF, DKIM, and DMARC does not earn you
          the inbox, and most of the people who end up debugging deliverability
          are already passing all three. But failing them reliably costs you the
          inbox, and unlike reputation this layer is readable and fixable before
          the send — usually with one DNS edit.
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
              <p className="eyebrow mb-5">Configuration issues it detects</p>
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
              That last line is the whole posture of this section. A record that
              is missing is a fact. A list that would not answer is not a clean
              result, and the response says so instead of rounding it up. The
              full boundary is in{" "}
              <a
                href="#limits"
                className="underline underline-offset-2 hover:text-[var(--text-primary)]"
              >
                what this does not do
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
