/*
  ── 이 섹션이 1순위인 이유 ─────────────────────────────────────────────────
  수집된 심층 사례 12건에서 IP 계열(공유 풀 평판 / 재활용 전용 IP / 모르고 있던
  발송 호스트)이 인증 계열보다 많았다. 예전 페이지는 블록리스트 조회를 SPF·DKIM·
  DMARC 뒤 부록으로 붙여놨는데, 그건 사례 비율과 정반대 순서였다.

  ⚠️ 아래 세 카드는 공개된 딜리버러빌리티 논의에서 반복 관찰되는 '패턴'이다.
  고객 후기가 아니고, 후기처럼 보이게 써서도 안 된다. 사람·회사·커뮤니티 이름을
  넣지 말 것. 이 제품에는 아직 사용 사례가 없다 — 섹션 하단 각주가 그 사실을 밝힌다.
  ────────────────────────────────────────────────────────────────────────── */

type Pattern = {
  title: string;
  body: string;
  pull: string;
  codes: string[];
  /* 이 API가 그 상황에서 실제로 해주는 일. 과장 금지 — 못 하는 건 못 한다고 쓴다. */
  role: string;
};

const patterns: Pattern[] = [
  {
    title: "The sending IP you didn't know you had",
    body: "A server bought for a website and an ERP still had Postfix installed and listening on port 25. A nightly backup script had been mailing its own report out of it, unauthenticated, for months — long enough to land the box on a blocklist. Everything the business actually sent went out through a proper relay, with SPF, DKIM, DMARC and compauth all passing.",
    pull: "Normal outbound never used that server. The junk folder didn't care.",
    codes: ["resolvedIps", "DNSBL_SPAMHAUS_ZEN"],
    role: "Nobody had ever written down which machines can send as that domain. This API answers that first — it enumerates the IPs before it judges any of them.",
  },
  {
    title: "A dedicated IP that arrived already burned",
    body: "A newly issued dedicated IP showed red in the provider's reputation dashboard before a single message went out. The replacement did too. Authentication was never in question: SPF and DKIM passing, DMARC at p=reject, a perfect score from the usual message tester.",
    pull: "Dedicated doesn't mean clean. Not blocklisted doesn't mean neutral either.",
    codes: ["resolvedIps", "DNSBL_BARRACUDA", "DNSBL_SPAMCOP"],
    role: "This reads blocklists, not provider dashboards. What it gives you on day one is whether the IP you were just handed is already listed — before you build a schedule on top of it.",
  },
  {
    title: "A shared pool someone else ruined",
    body: "A four-year-old business sending a handful of quotes a day started getting 421 4.7.0 [TSS04] deferrals — unexpected volume or user complaints — from one provider. SPF, DKIM and DMARC all passed. Seventy blocklists came back clean. The outbound IP belonged to a cheap shared mail host, and the volume and complaints on it were somebody else's.",
    pull: "Nothing about that setup had changed. The IP underneath it had.",
    codes: ["resolvedIps"],
    role: "Here a clean answer is the answer. Three lists checked and nothing listed rules out the listing theory in one call, and resolvedIps shows you how many other things you're sharing an address with.",
  },
];

export default function NotInYourStack() {
  return (
    <section
      id="patterns"
      className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">01 — Sending IPs</p>
        <h2 className="mb-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
          The check that isn&apos;t in your stack
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          A pattern we keep seeing in public deliverability threads: the
          authentication is fine, every checker says so, and the problem is an
          IP. Not the domain, not the copy, not the DMARC policy — an address
          the sender had never enumerated, or one handed to them with a history
          attached.
        </p>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {patterns.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5 md:p-6"
            >
              <h3 className="mb-3 text-lg font-semibold leading-snug tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {p.body}
              </p>
              <p className="mb-5 border-l-2 border-[var(--border-strong)] pl-3 text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                {p.pull}
              </p>

              <div className="mt-auto border-t border-[var(--border)] pt-4">
                <p className="eyebrow mb-2.5">What the response gives you</p>
                <ul className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5">
                  {p.codes.map((code) => (
                    <li
                      key={code}
                      className="font-mono text-xs text-[var(--text-primary)]"
                    >
                      {code}
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">
                  {p.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/*
          여기서 과장하면 이 섹션 전체가 무효가 된다.
          lib/dns/resolve.ts: MX 호스트들의 A 레코드 → 없으면 도메인 자체 A 레코드.
          lib/check.ts: MAX_IPS_TO_CHECK = 5. 이 두 사실을 화면에 그대로 적는다.
        */}
        <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5 md:p-6">
          <p className="eyebrow mb-3">Exactly what gets enumerated</p>
          <p className="max-w-3xl leading-relaxed text-[var(--text-secondary)]">
            The A records of every MX host on the domain — or the domain&apos;s
            own A records when there is no MX — up to five IPs per request, each
            one queried against all three lists. It reads DNS, so it sees the
            paths DNS knows about. A relay nobody ever published a record for is
            outside what any DNS-based check can reach. What you get is the list
            of addresses your domain actually points at, checked rather than
            assumed, with{" "}
            <code className="font-mono text-[var(--text-primary)]">
              resolvedIps
            </code>{" "}
            in the response so you can read the list yourself.
          </p>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--text-tertiary)]">
          These are patterns from public discussion of deliverability failures,
          written up without names. They are not customer testimonials — this
          product has none yet, and anything on this page claiming otherwise
          would be made up.
        </p>
      </div>
    </section>
  );
}
