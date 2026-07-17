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
            <K>&quot;service&quot;</K>: <S>&quot;sendguard&quot;</S>
            {" }"}
          </CodeCard>
          <p className="mt-3 text-sm text-[var(--text-tertiary)]">
            Public health endpoint. Run it before you sign up.
          </p>
        </div>
      </div>
    </section>
  );
}
