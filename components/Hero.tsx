import CodeCard, { K, S, N, Cmd, Flag } from "./CodeCard";

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
            The deliverability check API for multi-tenant SaaS platforms.
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Catch reputation problems before your platform sends email. One
            HTTP call before your ESP — DNSBL, SPF, DKIM, DMARC, and a safe
            volume ceiling for the next 24 hours.
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-md bg-[var(--btn)] px-6 py-3 font-medium text-white transition-colors duration-150 hover:bg-[var(--btn-hover)]"
            >
              Get an API key
            </a>
            <a
              href="#example"
              className="inline-flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-6 py-3 font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-muted)]"
            >
              View example response
            </a>
          </div>
          <p className="mt-5 font-mono text-xs text-[var(--text-tertiary)]">
            25 checks/month free · no credit card · no SDK required
          </p>
        </div>

        {/* Right: terminal */}
        <div className="min-w-0 lg:pl-2">
          <CodeCard label="POST /api/check" meta="200 OK">
            <Cmd>curl</Cmd> https://send-guard-ai.vercel.app/api/check{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-H</Flag> <S>&quot;Authorization: Bearer sg_live_...&quot;</S>{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-d</Flag>{" "}
            <S>
              &apos;&#123;&quot;domain&quot;: &quot;acme.com&quot;&#125;&apos;
            </S>
            {"\n\n"}
            {"{\n  "}
            <K>&quot;reputation&quot;</K>: <S>&quot;healthy&quot;</S>,{"\n  "}
            <K>&quot;spamRisk&quot;</K>: <S>&quot;low&quot;</S>,{"\n  "}
            <K>&quot;safeToSendToday&quot;</K>: <N>1000</N>
            {"\n}"}
          </CodeCard>
        </div>
      </div>
    </section>
  );
}
