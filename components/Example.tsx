import CodeCard, { K, S, N, C, Cmd, Flag } from "./CodeCard";

const specs = [
  "DNSBL lookup",
  "SPF / DKIM / DMARC validation",
  "JSON API",
  "No dashboard",
  "No warmup",
  "Stateless",
];

export default function Example() {
  return (
    <section
      id="example"
      className="scroll-mt-20 border-t border-[var(--border)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-4">04 — The API surface</p>
        <h2 className="mb-6 text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
          One thing, done right
        </h2>

        <CodeCard
          label="POST /api/check &#123;&quot;domain&quot;: &quot;acme.com&quot;&#125;"
          meta="example response"
        >
          {"{\n  "}
          <K>&quot;reputation&quot;</K>: <S>&quot;healthy&quot;</S>,{"      "}
          <C>// healthy | warning | bad</C>
          {"\n  "}
          <K>&quot;spamRisk&quot;</K>: <S>&quot;low&quot;</S>,{"           "}
          <C>// low | medium | high</C>
          {"\n  "}
          <K>&quot;safeToSendToday&quot;</K>: <N>1000</N>,{"     "}
          <C>// hard ceiling for today</C>
          {"\n  "}
          <K>&quot;recommendedVolume&quot;</K>: <N>1000</N>,{"   "}
          <C>// rule-based, conservative</C>
          {"\n  "}
          <K>&quot;signals&quot;</K>: {"[ "}
          {"{ "}
          <K>&quot;code&quot;</K>: <S>&quot;SPF_PRESENT&quot;</S>, ...{" }"}
          {" ]"}{"  "}
          <C>// DNSBL + SPF/DKIM/DMARC detail</C>
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

        <div className="mt-14 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-5 md:p-6">
          <p className="eyebrow mb-4 flex items-center gap-2 !text-[var(--ok)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" />
            Live — verify it yourself
          </p>
          <CodeCard label="$ curl">
            <Cmd>curl</Cmd> https://send-guard-ai.vercel.app/health
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
        </div>
      </div>
    </section>
  );
}
