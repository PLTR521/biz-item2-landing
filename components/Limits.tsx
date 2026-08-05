/*
  ── 이 섹션이 FAQ에서 올라온 이유 ──────────────────────────────────────────
  수집 사례의 공통 정서는 "도구가 clean이라고 해놓고 배신했다"이다:
  warmup 대시보드 100%, mail-tester 10/10, 70개 블랙리스트 0건 — 그리고도 스팸.
  그런 사람들에게 한계 목록은 약점이 아니라 유일하게 검증 가능한 신호다.
  그래서 방어적으로 쓰지 않는다. 조건·완충 표현("but we do…")을 붙이지 말 것.

  특히 마지막 블록(자동화 To 렌더링)은 "당신에게 이 제품은 필요 없다"고 말하는
  문단이다. 지우지 말 것 — 그 한 문단이 나머지 전부의 신뢰를 산다.
  ────────────────────────────────────────────────────────────────────────── */

const limits = [
  {
    title: "It does not measure inbox placement",
    body: "Placement is decided inside the receiver's system after the message arrives. Nothing that runs before the send can observe it — not this, not anything else. Measuring placement means seed testing, which is a different product with different tradeoffs.",
  },
  {
    title: "It does not measure domain or sender reputation",
    body: "That is what Google Postmaster Tools and Microsoft SNDS are for, and they report from the provider's side after you have already sent. This runs before the send and reads configuration, which is a different question with a different answer.",
  },
  {
    title: "It does not look at content or engagement",
    body: "No subject lines, no copy, no open rates, no complaint rates, no unsubscribes. The API never receives a message — it takes a domain or an IP and returns a verdict about DNS.",
  },
  {
    title: "It does not watch anything between requests",
    body: "No background job, no monitoring, no alerts. It answers when you call it, and every response carries a checkedAt timestamp so you know how old the answer is the moment you store it.",
  },
];

export default function Limits() {
  return (
    <section
      id="limits"
      className="scroll-mt-16 border-t border-[var(--border)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">02 — Limits</p>
        <h2 className="mb-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
          What this does not do
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          Read this before the feature list, not after it. Every tool in this
          category has told somebody &quot;clean&quot; and been wrong, and a
          green answer is only worth something if you know what it was looking
          at.
        </p>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {limits.map((limit) => (
            <div key={limit.title}>
              <h3 className="mb-2 flex items-baseline gap-2.5 text-[15px] font-semibold tracking-[-0.01em]">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-[var(--danger)]"
                >
                  ×
                </span>
                {limit.title}
              </h3>
              <p className="pl-[1.4rem] leading-relaxed text-[var(--text-secondary)]">
                {limit.body}
              </p>
            </div>
          ))}
        </div>

        {/* 사례 5 — 전달률 문제로 오인된 자동화 버그. 이 사람에게는 팔지 않는다. */}
        <div className="mt-12 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] p-5 md:p-6">
          <p className="eyebrow mb-3">And one case where you should not buy it</p>
          <p className="max-w-3xl leading-relaxed text-[var(--text-primary)]">
            If your mail sends fine by hand and only fails inside an automation
            — a workflow tool, a cron job, a webhook handler — and the bounces
            say things like{" "}
            <code className="font-mono text-sm text-[var(--text-primary)]">
              Address not found
            </code>
            , this is not a deliverability problem and this API will not help
            you. That is a recipient error, and it usually means a template
            variable rendered empty or with quotes still in it. Log the actual{" "}
            <code className="font-mono text-sm text-[var(--text-primary)]">
              To
            </code>{" "}
            value immediately before the send and read it. Leave your DNS
            records alone.
          </p>
        </div>
      </div>
    </section>
  );
}
