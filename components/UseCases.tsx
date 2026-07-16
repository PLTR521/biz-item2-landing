import type { ReactNode } from "react";
import CodeCard, { K, S, N, C } from "./CodeCard";

function UseCaseRow({
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

export default function UseCases() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-[2rem] md:leading-[1.15]">
            When to check
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            One HTTP call, right before an autonomous or on-behalf-of send.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          <UseCaseRow
            visual={
              <CodeCard label="agent.ts">
                <C>// Before the agent triggers a send</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">const</span> ok ={" "}
                <span className="text-[var(--code-cmd)]">await</span> sendguard.
                <span className="text-[var(--code-flag)]">check</span>(domain);
                {"\n"}
                <span className="text-[var(--code-flag)]">if</span> (ok.
                <K>spam_risk</K> === <S>&quot;low&quot;</S>) esp.send(...);
              </CodeCard>
            }
            title="Before your AI agent sends"
            body="LLM-driven agents send in bursts, at odd hours, on unpredictable triggers. Check the domain once per send so a runaway loop doesn't burn your reputation overnight."
          />

          <UseCaseRow
            flip
            title="Before your SaaS sends for a customer"
            body="If you're a platform sending on behalf of many customers, every tenant domain gets its own reputation score. One bad-actor tenant doesn't taint the rest of your platform."
            visual={
              <CodeCard label="per-tenant">
                <C>// Each customer&apos;s domain scored on its own</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">GET</span>{" "}
                /v1/check?domain=tenant-a.com
                {"\n"}
                <span className="text-[var(--code-flag)]">GET</span>{" "}
                /v1/check?domain=tenant-b.com
                {"\n"}
                <C>// No cross-contamination</C>
              </CodeCard>
            }
          />

          <UseCaseRow
            visual={
              <CodeCard label="worker">
                <K>safe_volume_24h</K>: <N>1200</N>
                {"\n"}
                <K>recommended_volume_24h</K>: <N>850</N>
                {"\n"}
                <C>// Use these as the ceiling for the next cron tick</C>
              </CodeCard>
            }
            title="Before an automation workflow fires"
            body="Cron jobs, webhook handlers, drip queues — anywhere email leaves without a human in the loop. Get a safe ceiling for the next 24 hours instead of guessing."
          />
        </div>
      </div>
    </section>
  );
}
