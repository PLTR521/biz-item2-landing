import type { ReactNode } from "react";
import CodeCard, { K, S, N, C } from "./CodeCard";

function UseCaseRow({
  index,
  tag,
  visual,
  title,
  body,
  flip = false,
}: {
  index: string;
  tag: string;
  visual: ReactNode;
  title: string;
  body: ReactNode;
  flip?: boolean;
}) {
  const text = (
    <div className="flex flex-col justify-center">
      <p className="eyebrow mb-3">
        {index} — {tag}
      </p>
      <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">
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
          <div className="min-w-0 md:order-last">{visual}</div>
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
          <p className="eyebrow mb-4">02 — Use cases</p>
          <h2 className="mb-3 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
            When to check
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            One HTTP call, right before an autonomous or on-behalf-of send.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          <UseCaseRow
            index="a"
            tag="AI agents"
            visual={
              <CodeCard label="agent.ts">
                <C>// Before the agent triggers a send</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">const</span> ok ={" "}
                <span className="text-[var(--code-cmd)]">await</span> sendguard.
                <span className="text-[var(--code-flag)]">check</span>(domain);
                {"\n"}
                <span className="text-[var(--code-flag)]">if</span> (ok.
                <K>spamRisk</K> === <S>&quot;low&quot;</S>) esp.send(...);
              </CodeCard>
            }
            title="Before your AI agent sends"
            body="LLM-driven agents send in bursts, at odd hours, on unpredictable triggers. Check the domain once per send so a runaway loop doesn't burn your reputation overnight."
          />

          <UseCaseRow
            index="b"
            tag="Multi-tenant"
            flip
            title="Before your SaaS sends for a customer"
            body="If you're a platform sending on behalf of many customers, every tenant domain gets its own reputation score. One bad-actor tenant doesn't taint the rest of your platform."
            visual={
              <CodeCard label="per-tenant">
                <C>// Each customer&apos;s domain scored on its own</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">POST</span> /api/check{" "}
                <S>&#123;&quot;domain&quot;: &quot;tenant-a.com&quot;&#125;</S>
                {"\n"}
                <span className="text-[var(--code-flag)]">POST</span> /api/check{" "}
                <S>&#123;&quot;domain&quot;: &quot;tenant-b.com&quot;&#125;</S>
                {"\n"}
                <C>// No cross-contamination</C>
              </CodeCard>
            }
          />

          <UseCaseRow
            index="c"
            tag="Automation"
            visual={
              <CodeCard label="worker">
                <K>safeToSendToday</K>: <N>1000</N>
                {"\n"}
                <K>recommendedVolume</K>: <N>850</N>
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
