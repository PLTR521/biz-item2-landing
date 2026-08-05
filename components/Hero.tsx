import CodeCard, { K, S, Cmd, Flag } from "./CodeCard";
import { API_HOST } from "@/lib/site";

/*
  ── 헤드라인 근거 ──────────────────────────────────────────────────────────
  r/emaildeliverability 심층 사례 12건 중 SPF/DKIM/DMARC 미설정이 실제 주원인이었던
  건 단 1건이다. 나머지 11건은 전부 "인증 전부 pass인데 스팸"이었다.
  그래서 예전 헤드라인("Broken SPF never throws an error.")은 이미 해결된 문제를
  팔고 있었다. 아래 3안은 전부 수집된 고객 원문에서 나왔다 — 지어낸 문장이 아니다.

    A (적용 중) Everything says pass. The email still didn't arrive.
                ← "our domains looked perfectly healthy on every tool but were
                   dead in the inbox" / "it's not an authentication problem."
    B           Your emails randomly started failing and you can't figure out why.
                ← "Emails randomly started failing to Yahoo" +
                   "7 failed emails in 30 days, can't figure out why"
    C           10/10 on mail-tester. Still in spam.
                ← "Its a 10/10 on mail-tester. However, a plain email to a fresh
                   Outlook account still went to Junk."

  A/B/C를 교체할 때 서브헤드는 건드리지 말 것 — 서브헤드는 "인증 통과 ≠ 배달"과
  "우리가 실제로 읽는 것" 두 가지만 말하며 헤드라인과 독립적이다.
  ────────────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: copy */}
        <div className="min-w-0">
          <p className="eyebrow mb-6 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ok)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--ok)]" />
            </span>
            Free tier available now
          </p>
          <h1 className="mb-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[3.25rem] lg:text-[3.6rem]">
            Everything says pass. The email still didn&apos;t arrive.
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Authentication passing is not the same as a domain that can deliver
            — and the sending IP that gets you filtered is usually one nobody on
            the team has ever looked at. One request reads SPF, DKIM, and DMARC
            live from DNS, then puts the sending IPs behind your domain through
            Spamhaus ZEN, Barracuda, and SpamCop.
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-md bg-[var(--btn)] px-6 py-3 font-medium text-white transition-colors duration-150 hover:bg-[var(--btn-hover)]"
            >
              Get a free API key
            </a>
            <a
              href="#example"
              className="inline-flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-6 py-3 font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-muted)]"
            >
              See a real response
            </a>
          </div>
          <p className="mt-5 font-mono text-xs leading-[1.9] text-[var(--text-tertiary)]">
            50 requests/day free · no credit card · key issued instantly
            <br />
            REST + JSON · one request · no SDK · no background agents
          </p>
        </div>

        {/* Right: terminal.
            블록리스트 시그널을 먼저 보여준다 — 이 제품이 실제로 잡는 것 중
            사례 수가 가장 많은 쪽이 IP다. 값은 예시이며 meta에도 그렇게 적는다. */}
        <div className="min-w-0 lg:pl-2">
          <CodeCard label="POST /api/check" meta="example response">
            <Cmd>curl</Cmd> https://{API_HOST}/api/check{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-H</Flag> <S>&quot;Authorization: Bearer sg_live_...&quot;</S>{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-d</Flag>{" "}
            <S>
              &apos;&#123;&quot;domain&quot;: &quot;acme.com&quot;,
              &quot;dkimSelector&quot;: &quot;resend&quot;&#125;&apos;
            </S>
            {"\n\n"}
            {"{\n  "}
            <K>&quot;reputation&quot;</K>: <S>&quot;bad&quot;</S>,{"\n  "}
            <K>&quot;spamRisk&quot;</K>: <S>&quot;high&quot;</S>,{"\n  "}
            <K>&quot;resolvedIps&quot;</K>: {"[ "}
            <S>&quot;198.51.100.24&quot;</S>, <S>&quot;203.0.113.9&quot;</S>
            {" ],\n  "}
            <K>&quot;signals&quot;</K>: {"[\n    { "}
            <K>&quot;code&quot;</K>: <S>&quot;DNSBL_SPAMHAUS_ZEN&quot;</S>,{" "}
            <K>&quot;severity&quot;</K>: <S>&quot;critical&quot;</S>
            {" },\n    { "}
            <K>&quot;code&quot;</K>: <S>&quot;DMARC_POLICY_NONE&quot;</S>,{" "}
            <K>&quot;severity&quot;</K>: <S>&quot;info&quot;</S>
            {" }\n  ]\n}"}
          </CodeCard>
        </div>
      </div>
    </section>
  );
}
