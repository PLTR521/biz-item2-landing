import { FlaskConical } from "lucide-react";

// 아직 검증 안 된 가설. 단정형으로 바꾸지 말 것. 위 KnownFacts(검증된 사실)와 구분 유지.
// 점선 테두리 + accent 톤으로 "테스트 중"임을 시각적으로 신호한다.
export default function Hypothesis() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-dashed border-[rgba(99,102,241,0.4)] bg-[var(--accent-soft)] p-6 md:p-8">
          <div className="mb-3 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Our hypothesis{" "}
              <span className="font-normal text-[var(--text-tertiary)]">
                (this is what we&apos;re testing)
              </span>
            </h2>
          </div>
          <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">
            Most warmup tools are tuned for people sending a few dozen emails a day
            by hand. We think agent traffic — bursty, automated, event-triggered —
            doesn&apos;t fit that model well. We&apos;re talking to AI teams to find
            out if that&apos;s true.
          </p>
          <p className="font-medium leading-relaxed text-[var(--text-primary)]">
            If you&apos;ve hit this, we want to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}
