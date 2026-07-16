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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-[2rem]">
            One thing, done right
          </h2>
          <span className="rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
            example response
          </span>
        </div>

        <CodeCard label="sendguard.check(&quot;acme.com&quot;)">
          {"{\n  "}
          <K>&quot;reputation&quot;</K>: <S>&quot;healthy&quot;</S>,{"        "}
          <C>// single rolled-up score</C>
          {"\n  "}
          <K>&quot;spam_risk&quot;</K>: <S>&quot;low&quot;</S>,{"          "}
          <C>// low | elevated | high</C>
          {"\n  "}
          <K>&quot;safe_volume_24h&quot;</K>: <N>1200</N>,{"     "}
          <C>// hard ceiling for today</C>
          {"\n  "}
          <K>&quot;recommended_volume_24h&quot;</K>: <N>850</N>,{" "}
          <C>// comfortable target</C>
          {"\n  "}
          <K>&quot;signals&quot;</K>: {"{ "}
          <K>&quot;spf&quot;</K>: <S>&quot;pass&quot;</S>,{" "}
          <K>&quot;dkim&quot;</K>: <S>&quot;pass&quot;</S>,{" "}
          <K>&quot;dmarc&quot;</K>: <S>&quot;pass&quot;</S>{" }"}
          {"\n}"}
        </CodeCard>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3">
          {specs.map((spec) => (
            <li
              key={spec}
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--text-tertiary)]" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            Verify it&apos;s live
          </p>
          <CodeCard label="$ curl">
            <Cmd>curl</Cmd> https://api.sendguard.ai/health
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
