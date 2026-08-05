import type { ReactNode } from "react";
import CodeCard, { K, S, C } from "./CodeCard";

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
          <p className="eyebrow mb-4">07 — Use cases</p>
          <h2 className="mb-3 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
            Call it while the problem is still cheap
          </h2>
          {/* 순서 근거: 수집 사례에서 가장 반복된 통증은 "내가 통제하지 않는
              도메인·IP"였다. 그래서 멀티테넌트를 a로 올렸다. */}
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Before you send for a domain you don&apos;t control, before an
            autonomous send, before a bulk run — the three moments where the
            answer still changes what happens next.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          <UseCaseRow
            index="a"
            tag="Multi-tenant"
            title="Before your SaaS sends for a customer domain"
            body="A tenant domain doesn't stay the way you onboarded it. Customers wire the same domain into another platform, edit DNS, drop a record, move mail hosts and inherit whatever IPs come with it. Run each domain on its own right before you send for it and you get its records and its sending IPs as they are at that moment — so one customer's setup stays their problem instead of your platform's."
            visual={
              <CodeCard label="per-tenant">
                <C>// Each customer&apos;s domain scored on its own</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">POST</span> /api/check{" "}
                <S>
                  &#123;&quot;domain&quot;: &quot;tenant-a.com&quot;,
                  &quot;dkimSelector&quot;: &quot;hs1&quot;&#125;
                </S>
                {"\n"}
                <span className="text-[var(--code-flag)]">POST</span> /api/check{" "}
                <S>&#123;&quot;domain&quot;: &quot;tenant-b.com&quot;&#125;</S>
                {"\n"}
                <C>// resolvedIps differ per tenant — read them</C>
              </CodeCard>
            }
          />

          <UseCaseRow
            index="b"
            tag="AI agents"
            flip
            visual={
              <CodeCard label="agent.ts">
                <C>// Before the agent triggers a send</C>
                {"\n"}
                <span className="text-[var(--code-flag)]">const</span> risk ={" "}
                <span className="text-[var(--code-cmd)]">await</span> deliverability.
                <span className="text-[var(--code-flag)]">check</span>(domain);
                {"\n"}
                <span className="text-[var(--code-flag)]">if</span> (risk.
                <K>spamRisk</K> === <S>&quot;low&quot;</S>) esp.send(...);
                {"\n"}
                <C>// else: log risk.signals and hold</C>
              </CodeCard>
            }
            title="Before your AI agent sends"
            body="Agents send in bursts, at odd hours, on triggers nobody reviews. One call per send means a freshly listed IP or a dropped DMARC record is caught by your code — not discovered days later when the replies dry up."
          />

          <UseCaseRow
            index="c"
            tag="Automation"
            visual={
              <CodeCard label="worker">
                <K>reputation</K>: <S>&quot;bad&quot;</S>
                {"\n"}
                <K>spamRisk</K>: <S>&quot;high&quot;</S>
                {"\n"}
                <K>signals</K>: [&#123; <K>code</K>:{" "}
                <S>&quot;DNSBL_SPAMHAUS_ZEN&quot;</S> &#125;]
                {"\n"}
                <C>// Fail the job here, not 40k sends later</C>
              </CodeCard>
            }
            title="Before a bulk run or a scheduled send"
            body="Cron jobs, webhook handlers, drip queues — anywhere email leaves without a human in the loop. A blocklisted sending IP costs you the whole batch, and you find out from the bounce rate. One call at the top of the worker turns that into a failed job."
          />
        </div>
      </div>
    </section>
  );
}
