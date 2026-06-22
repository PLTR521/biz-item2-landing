const steps = [
  {
    number: "01",
    title: "조건 입력하기",
    description:
      "예산, 용도, 중요하게 생각하는 조건을 입력하세요. 1분이면 됩니다.",
  },
  {
    number: "02",
    title: "비교표 받기",
    description:
      "AI가 후보 상품들을 분석해 비교표, 장단점, 추천 이유를 정리합니다.",
  },
  {
    number: "03",
    title: "결정하고 저장하기",
    description:
      "결론을 선택하면 체크리스트와 PDF로 저장됩니다.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-tertiary)] text-center mb-4">
          사용법
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
          3단계로 끝납니다
        </h2>
        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-px bg-[var(--border)]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
