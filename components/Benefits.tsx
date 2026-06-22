import { X, Check } from "lucide-react";

const before = [
  "유튜브, 블로그, 가격비교 사이트를 번갈아 보다 결국 혼란스럽다",
  "GPT가 비교는 해줬지만 최종 결정은 내가 내린다",
  "왜 그 제품을 샀는지 나중에 기억이 안 난다",
];

const after = [
  "조건 입력 → 비교표 + 추천 이유 + 체크리스트가 한 화면에",
  "내 예산·용도 기준으로 어떤 게 나은지 이유까지 확인한다",
  "구매 이유가 자동 기록되어 나중에 꺼내볼 수 있다",
];

export default function Benefits() {
  return (
    <section className="py-20 md:py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-tertiary)] text-center mb-4">
          달라지는 것
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
          비교 전 vs 비교 후
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
            <p className="text-sm font-medium text-[var(--text-tertiary)] mb-6 uppercase tracking-wide">
              지금까지
            </p>
            <ul className="space-y-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--bg-card)] border border-[rgba(99,102,241,0.2)] rounded-2xl p-6 md:p-8">
            <p className="text-sm font-medium text-[var(--accent)] mb-6 uppercase tracking-wide">
              Decision AI로
            </p>
            <ul className="space-y-4">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[var(--success)] mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
