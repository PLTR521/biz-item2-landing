import { ArrowRight } from "lucide-react";
import CodeCard, { K, S, N, Cmd, Flag } from "./CodeCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[130px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Free tier available now
          </span>
          <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.2rem]">
            The deliverability check API for multi-tenant SaaS platforms.
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] lg:mx-0">
            Catch reputation problems before your platform sends email.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <a
              href="#waitlist"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hover)] sm:w-auto"
            >
              Get an API key
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#example"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border-strong)] bg-white px-6 py-3 font-medium text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-muted)] sm:w-auto"
            >
              View example response
            </a>
          </div>
        </div>

        {/* Right: code visual */}
        <div className="lg:pl-4">
          <CodeCard label="$ curl">
            <Cmd>curl</Cmd> https://api.sendguard.ai/v1/check{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-H</Flag> <S>&quot;Authorization: Bearer sg_...&quot;</S>{" "}
            <span className="text-[var(--code-comment)]">\</span>
            {"\n  "}
            <Flag>-d</Flag>{" "}
            <S>
              &apos;&#123;&quot;domain&quot;: &quot;acme.com&quot;&#125;&apos;
            </S>
            {"\n\n"}
            {"{\n  "}
            <K>&quot;reputation&quot;</K>: <S>&quot;healthy&quot;</S>,{"\n  "}
            <K>&quot;spam_risk&quot;</K>: <S>&quot;low&quot;</S>,{"\n  "}
            <K>&quot;safe_volume_24h&quot;</K>: <N>1200</N>
            {"\n}"}
          </CodeCard>
        </div>
      </div>
    </section>
  );
}
