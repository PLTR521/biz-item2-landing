import CodeCard, { K, S, N, C } from "./CodeCard";

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

        <p className="mt-6 leading-relaxed text-[var(--text-secondary)]">
          One API call. Warmup, dashboards, and alerts come later — right now
          we&apos;re solving this one thing.
        </p>
      </div>
    </section>
  );
}
