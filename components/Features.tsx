import { Table2, Lightbulb, FileDown } from "lucide-react";

const features = [
  {
    icon: Table2,
    title: "AI 비교표 자동 생성",
    description:
      "후보 상품들의 스펙·가격·장단점을 한 화면에 정리합니다. 직접 탭을 오가며 메모할 필요 없어요.",
  },
  {
    icon: Lightbulb,
    title: "내 상황 기준 추천",
    description:
      "예산과 용도를 입력하면 \"당신 기준에서 이 제품이 더 나은 이유\"를 구체적으로 설명합니다.",
  },
  {
    icon: FileDown,
    title: "체크리스트 + PDF 저장",
    description:
      "결정 내용을 체크리스트와 PDF로 정리합니다. 나중에 \"왜 샀지?\"가 생기면 꺼내보세요.",
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-tertiary)] text-center mb-4">
          기능
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
          결정을 완결하는 3가지
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 transition-all duration-200 hover:border-[rgba(99,102,241,0.3)] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
