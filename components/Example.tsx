import CodeCard, { K, S, N, C, Cmd, Flag } from "./CodeCard";
import { API_HOST } from "@/lib/site";

const specs = [
  "Spamhaus · Barracuda · SpamCop",
  "SPF · DKIM · DMARC",
  "Live DNS per request",
  "REST · JSON · no SDK",
  "Deterministic scoring",
  "No dashboard, no agents",
];

/*
  코드 → 의미 → 조치. API 응답에는 code/severity/detail만 들어간다 —
  아래 "무엇을 의미하고 무엇을 하면 되는가"는 이 페이지의 설명이지 응답 필드가 아니다.
  그 사실을 화면에도 명시한다(아래 안내 문단). 없는 필드를 있는 것처럼 보이면 안 된다.
  코드값은 lib/dns/auth-records.ts · lib/dns/dnsbl.ts의 실제 코드와 일치해야 한다.

  순서는 페이지 포지셔닝과 같다: 블록리스트 먼저, 인증 나중.
*/
const signalGuide = [
  {
    code: "DNSBL_SPAMHAUS_ZEN",
    means:
      "A sending IP is on the blocklist most receivers actually act on. This is the only severity:critical signal in the set.",
    action: "Stop sending from that IP and request delisting at Spamhaus.",
  },
  {
    code: "DNSBL_BARRACUDA · DNSBL_SPAMCOP",
    means:
      "A sending IP is listed somewhere narrower. Two of these together are enough to move the verdict to warning on their own.",
    action:
      "Check which IP in resolvedIps it is before you assume it's your ESP's.",
  },
  {
    code: "DNSBL_QUERY_BLOCKED_*",
    means:
      "A list refused the lookup. The result is unknown, and unknown is reported as unknown — never rounded up to clean.",
    action: "Re-run it, or treat that one list as unchecked for this send.",
  },
  {
    code: "DOMAIN_UNRESOLVED",
    means: "No MX or A records resolved, so there are no sending IPs to score.",
    action: "Confirm the domain is spelled right and its DNS is live.",
  },
  {
    code: "SPF_MISSING",
    means:
      "No v=spf1 record on the domain, so receivers can't confirm which servers may send as you.",
    action: "Publish an SPF record that covers your ESP before the next send.",
  },
  {
    code: "DKIM_SELECTOR_NOT_FOUND",
    means:
      "The selector you passed has no key published, so signatures from it won't verify.",
    action:
      "Re-copy the DKIM record from your ESP, or pass the selector it actually signs with.",
  },
  {
    code: "DMARC_MISSING",
    means:
      "No DMARC policy. Google and Yahoo both require one from bulk senders.",
    action: "Publish a DMARC record — p=none is a valid first step.",
  },
  {
    code: "DMARC_POLICY_NONE",
    means: "DMARC is published, but p=none means nothing is enforced yet.",
    action:
      "Move to p=quarantine once every sending source authenticates cleanly.",
  },
];

export default function Example() {
  return (
    <section
      id="example"
      className="scroll-mt-20 border-t border-[var(--border)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-4">06 — The API surface</p>
        <h2 className="mb-6 text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
          One endpoint, and the reason behind every verdict
        </h2>

        <CodeCard
          label="POST /api/check &#123;&quot;domain&quot;: &quot;acme.com&quot;&#125;"
          meta="example response"
        >
          {"{\n  "}
          <K>&quot;reputation&quot;</K>: <S>&quot;warning&quot;</S>,{"    "}
          <C>// healthy | warning | bad</C>
          {"\n  "}
          <K>&quot;spamRisk&quot;</K>: <S>&quot;medium&quot;</S>,{"      "}
          <C>// low | medium | high</C>
          {"\n  "}
          <K>&quot;resolvedIps&quot;</K>: {"[ "}
          <S>&quot;198.51.100.24&quot;</S>, ...{" ],  "}
          <C>// the IPs it actually checked</C>
          {"\n  "}
          <K>&quot;signals&quot;</K>: {"[            "}
          <C>// every verdict comes with its evidence</C>
          {"\n    { "}
          <K>&quot;code&quot;</K>: <S>&quot;DNSBL_SPAMCOP&quot;</S>,{" "}
          <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>,
          {"\n      "}
          <K>&quot;detail&quot;</K>:{" "}
          <S>&quot;198.51.100.24 is listed on SpamCop&quot;</S>
          {" },\n    { "}
          <K>&quot;code&quot;</K>: <S>&quot;SPF_MISSING&quot;</S>,{" "}
          <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>,
          {"\n      "}
          <K>&quot;detail&quot;</K>:{" "}
          <S>&quot;No v=spf1 TXT record found on acme.com&quot;</S>
          {" },\n    { "}
          <K>&quot;code&quot;</K>: <S>&quot;DMARC_POLICY_NONE&quot;</S>,{" "}
          <K>&quot;severity&quot;</K>: <S>&quot;info&quot;</S>
          {" }\n  ],\n  "}
          <K>&quot;safeToSendToday&quot;</K>: <N>500</N>,{"       "}
          <C>// conservative, rule-based</C>
          {"\n  "}
          <K>&quot;checkedAt&quot;</K>: <S>&quot;2026-08-04T09:12:44Z&quot;</S>
          {"\n}"}
        </CodeCard>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border)] pt-5">
          {specs.map((spec) => (
            <li
              key={spec}
              className="font-mono text-xs text-[var(--text-secondary)]"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <p className="eyebrow mb-4">Every signal maps to one fix</p>
          <p className="mb-7 leading-relaxed text-[var(--text-secondary)]">
            The response carries{" "}
            <code className="font-mono text-[var(--text-secondary)]">code</code>
            ,{" "}
            <code className="font-mono text-[var(--text-secondary)]">
              severity
            </code>
            , and a one-line{" "}
            <code className="font-mono text-[var(--text-secondary)]">
              detail
            </code>
            . Here&apos;s what each one means and what to do about it. The
            scoring is a handful of rules, not a model: two{" "}
            <code className="font-mono text-[var(--text-secondary)]">warn</code>{" "}
            signals make the reputation{" "}
            <code className="font-mono text-[var(--text-secondary)]">
              warning
            </code>
            , and a single{" "}
            <code className="font-mono text-[var(--text-secondary)]">
              critical
            </code>{" "}
            makes it{" "}
            <code className="font-mono text-[var(--text-secondary)]">bad</code>{" "}
            with a ceiling of zero. That matters for one reason only — you can
            reproduce it. Same domain, same DNS, same answer.
          </p>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {signalGuide.map((signal) => (
              <div
                key={signal.code}
                className="grid gap-2 py-4 md:grid-cols-[minmax(0,13.5rem)_1fr] md:gap-6"
              >
                <code className="font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                  {signal.code}
                </code>
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {signal.means}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-tertiary)]">
                    <span aria-hidden="true" className="font-mono">
                      →{" "}
                    </span>
                    {signal.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-5 md:p-6">
          <p className="eyebrow mb-4 flex items-center gap-2 !text-[var(--ok)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" />
            Live — verify it yourself
          </p>
          <CodeCard label="$ curl">
            <Cmd>curl</Cmd> https://{API_HOST}/health
            {"\n\n"}
            {"{ "}
            <K>&quot;status&quot;</K>: <S>&quot;ok&quot;</S>,{" "}
            <K>&quot;service&quot;</K>: <S>&quot;email-deliverability&quot;</S>
            {" }"}
          </CodeCard>
          <p className="mt-3 text-sm text-[var(--text-tertiary)]">
            Public health endpoint. Run it before you sign up.
          </p>

          {/*
            127.0.0.2는 DNSBL 업계 표준 테스트 주소 — 모든 블랙리스트가 "리스팅됨"으로
            응답하도록 약속된 IP다. 아래는 그 주소로 프로덕션 API를 실제 호출해 받은
            응답이다 (2026-07-30 23:55 UTC 실호출). 폭 때문에 detail의 링크 URL과
            중복 필드만 덜어냈고 판정값(reputation/spamRisk/safeToSendToday/severity)은
            한 글자도 바꾸지 않았다. 값을 손으로 고치지 말 것 —
            고치는 순간 이 블록은 증거가 아니라 광고가 된다.
          */}
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <CodeCard
              label="POST /api/check &#123;&quot;ip&quot;: &quot;127.0.0.2&quot;&#125;"
              meta="real response"
            >
              {"{\n  "}
              <K>&quot;reputation&quot;</K>: <S>&quot;bad&quot;</S>,
              {"\n  "}
              <K>&quot;spamRisk&quot;</K>: <S>&quot;high&quot;</S>,
              {"\n  "}
              <K>&quot;safeToSendToday&quot;</K>: <N>0</N>,
              {"\n  "}
              <K>&quot;signals&quot;</K>: {"[\n    { "}
              <K>&quot;code&quot;</K>: <S>&quot;DNSBL_SPAMHAUS_ZEN&quot;</S>,{" "}
              <K>&quot;severity&quot;</K>: <S>&quot;critical&quot;</S>,
              {"\n      "}
              <K>&quot;detail&quot;</K>:{" "}
              <S>
                &quot;127.0.0.2 is listed on Spamhaus ZEN — Listed by PBL |
                Listed by XBL | Listed by SBL&quot;
              </S>
              {" },\n    { "}
              <K>&quot;code&quot;</K>: <S>&quot;DNSBL_BARRACUDA&quot;</S>,{" "}
              <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>
              {" },\n    { "}
              <K>&quot;code&quot;</K>: <S>&quot;DNSBL_SPAMCOP&quot;</S>,{" "}
              <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>
              {" }\n  ]\n}"}
            </CodeCard>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-tertiary)]">
              <code className="font-mono text-[var(--text-secondary)]">
                127.0.0.2
              </code>{" "}
              is the standard DNSBL test address — every list is supposed to
              answer &quot;listed&quot; for it. That&apos;s a real production
              response, not a mockup: three lists hit, Spamhaus resolved down to
              the individual SBL / PBL / XBL entries, and the volume ceiling
              drops to zero. Only the lookup URLs inside{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                detail
              </code>{" "}
              were trimmed to fit. Sign up and run the same call.
            </p>
          </div>

          {/*
            ── 자기 도메인 공개 ────────────────────────────────────────────────
            딜리버러빌리티 도구가 자기 도메인 결과를 숨기면 그 순간 신뢰를 잃는다.
            대상은 이 API가 응답하는 호스트다 — 랜딩 주소가 아니다.
            페이지에 도메인은 하나만 인쇄한다(lib/site.ts 주석 참조).

            아래 값은 2026-08-05에 8.8.8.8로 실제 조회한 결과다.
            결과가 좋지 않다 — 이 호스트에는 MX도 SPF도 DMARC도 없다. 그대로 노출한다.
            A 레코드는 회전할 수 있으므로 날짜를 카드에 박아둔다.

            ⚠️ 이 블록에는 캡처된 /api/check 응답이 아직 들어 있지 않다.
               넣으려면 실제 키로 아래 curl을 돌려 응답을 그대로 붙일 것.
               직접 타이핑해서 채우지 말 것 — 그러면 증거가 아니라 광고가 된다.
            ──────────────────────────────────────────────────────────────── */}
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <CodeCard
              label={`$ nslookup ${API_HOST}`}
              meta="2026-08-05 · resolver 8.8.8.8"
            >
              <Cmd>nslookup</Cmd> <Flag>-type=MX</Flag> {API_HOST} 8.8.8.8
              {"\n"}
              <C>→ no MX records</C>
              {"\n\n"}
              <Cmd>nslookup</Cmd> <Flag>-type=TXT</Flag> {API_HOST} 8.8.8.8
              {"\n"}
              <C>→ no TXT records — no v=spf1</C>
              {"\n\n"}
              <Cmd>nslookup</Cmd> <Flag>-type=TXT</Flag> _dmarc.{API_HOST}{" "}
              8.8.8.8
              {"\n"}
              <C>→ no TXT records — no v=DMARC1</C>
              {"\n\n"}
              <Cmd>nslookup</Cmd> <Flag>-type=A</Flag> {API_HOST} 8.8.8.8
              {"\n"}
              <C>→</C> 64.29.17.3, 216.198.79.3
            </CodeCard>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-tertiary)]">
              That is the host answering every call on this page, looked up on
              the date shown and summarised — the arrows are the answers, not
              the raw transcript. It has no MX record, no SPF record, and no
              DMARC record, so pointing{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                /api/check
              </code>{" "}
              at it returns{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                SPF_MISSING
              </code>{" "}
              and{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                DMARC_MISSING
              </code>{" "}
              — two{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                warn
              </code>{" "}
              signals, which the rules above turn into{" "}
              <code className="font-mono text-[var(--text-secondary)]">
                reputation: &quot;warning&quot;
              </code>
              . No mail is sent as this hostname — it is an API deployment on a
              platform subdomain whose DNS we don&apos;t control. That is the
              reason and not an excuse: the check reports us exactly the way it
              would report you. We would rather print our own bad result than
              let you find it. Run it yourself:
            </p>
            <div className="mt-4">
              <CodeCard label="$ curl">
                <Cmd>curl</Cmd> <Flag>-X</Flag> POST https://{API_HOST}/api/check{" "}
                <span className="text-[var(--code-comment)]">\</span>
                {"\n  "}
                <Flag>-H</Flag>{" "}
                <S>&quot;Authorization: Bearer YOUR_KEY&quot;</S>{" "}
                <span className="text-[var(--code-comment)]">\</span>
                {"\n  "}
                <Flag>-H</Flag>{" "}
                <S>&quot;Content-Type: application/json&quot;</S>{" "}
                <span className="text-[var(--code-comment)]">\</span>
                {"\n  "}
                <Flag>-d</Flag>{" "}
                <S>
                  &apos;&#123;&quot;domain&quot;: &quot;{API_HOST}
                  &quot;&#125;&apos;
                </S>
              </CodeCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
