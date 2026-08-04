import CodeCard, { K, S, Cmd, Flag } from "./CodeCard";

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
            Broken SPF never throws an error. Your email just stops arriving.
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Authentication breaks, deliverability drops, and your customers
            never see the email — no bounce, no exception, nothing in the logs.
            One request before the send reads SPF, DKIM, and DMARC live and puts
            every sending IP behind your MX through three blocklists.
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

        {/* Right: terminal */}
        <div className="min-w-0 lg:pl-2">
          <CodeCard label="POST /api/check" meta="200 OK">
            <Cmd>curl</Cmd> https://email-deliverability-app.vercel.app/api/check{" "}
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
            <K>&quot;reputation&quot;</K>: <S>&quot;warning&quot;</S>,{"\n  "}
            <K>&quot;spamRisk&quot;</K>: <S>&quot;medium&quot;</S>,{"\n  "}
            <K>&quot;signals&quot;</K>: {"[\n    { "}
            <K>&quot;code&quot;</K>: <S>&quot;SPF_MISSING&quot;</S>,{" "}
            <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>
            {" },\n    { "}
            <K>&quot;code&quot;</K>: <S>&quot;DMARC_MISSING&quot;</S>,{" "}
            <K>&quot;severity&quot;</K>: <S>&quot;warn&quot;</S>
            {" }\n  ]\n}"}
          </CodeCard>
        </div>
      </div>
    </section>
  );
}
