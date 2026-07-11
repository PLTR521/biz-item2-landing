import type { ReactNode } from "react";
import CodeCard, { K, S, N, C } from "./CodeCard";

function FeatureRow({
  visual,
  title,
  body,
  flip = false,
}: {
  visual: ReactNode;
  title: string;
  body: ReactNode;
  flip?: boolean;
}) {
  const text = (
    <div className="flex flex-col justify-center">
      <h3 className="mb-3 text-xl font-semibold tracking-tight md:text-2xl">
        {title}
      </h3>
      <p className="max-w-md leading-relaxed text-[var(--text-secondary)]">
        {body}
      </p>
    </div>
  );

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      {flip ? (
        <>
          {text}
          <div className="md:order-last">{visual}</div>
        </>
      ) : (
        <>
          {visual}
          {text}
        </>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-24">
        <FeatureRow
          visual={
            <CodeCard label="reputation">
              <span className="text-[var(--code-cmd)]">sendguard</span>.
              <span className="text-[var(--code-flag)]">check</span>(
              <S>&quot;yourdomain.com&quot;</S>)
            </CodeCard>
          }
          title="Reputation, in one call"
          body="Get a live health signal for any sending domain — SPF, DKIM, DMARC, DNSBL, historical bounce patterns — combined into a single score."
        />

        <FeatureRow
          flip
          title="Safe volume, not warmup schedules"
          body="Instead of ramping over weeks, we tell you how much you can send right now without tanking reputation. Recompute as often as you want."
          visual={
            <CodeCard label="volume">
              <K>safe_volume_24h</K>: <N>1200</N>
              {"\n"}
              <K>recommended_volume_24h</K>: <N>850</N>
            </CodeCard>
          }
        />

        <FeatureRow
          visual={
            <CodeCard label="per-tenant">
              <C>// Each customer&apos;s domain = separate reputation</C>
              {"\n"}
              <span className="text-[var(--code-flag)]">GET</span>{" "}
              /v1/reputation?domain=customer1.com
              {"\n"}
              <span className="text-[var(--code-flag)]">GET</span>{" "}
              /v1/reputation?domain=customer2.com
              {"\n"}
              <C>// No cross-contamination</C>
            </CodeCard>
          }
          title="Per-tenant, not per-app"
          body="If you're a platform sending on behalf of many customers, every domain gets its own reputation score. One bad actor doesn't poison the rest."
        />
      </div>
    </section>
  );
}
