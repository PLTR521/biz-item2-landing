import { Search, MessageSquare, Clock, RotateCcw } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "탭이 10개, 결론이 없다",
    description:
      "유튜브 리뷰, 네이버 블로그, 다나와, ChatGPT까지 돌아다녔는데 결국 뭘 사야 할지 모르겠다.",
  },
  {
    icon: MessageSquare,
    title: "GPT가 비교는 해줬는데, 그래서 나는?",
    description:
      "ChatGPT가 옵션들을 나열해줬지만 \"내 상황에서 뭐가 더 나은지\"는 여전히 내가 판단해야 한다.",
  },
  {
    icon: Clock,
    title: "5만원 살 때도, 30만원 살 때도 1시간",
    description:
      "금액과 상관없이 비교 검색에 쓰는 시간이 아깝다. 비교하다 지쳐서 그냥 사는 경우도 많다.",
  },
  {
    icon: RotateCcw,
    title: "같은 카테고리를 또 처음부터 비교",
    description:
      "지난번에 왜 그 제품을 골랐는지 기억이 안 나서, 같은 고민을 처음부터 다시 반복한다.",
  },
];

export default function Problem() {
  return (
    <section className="py-20 md:py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-tertiary)] text-center mb-4">
          문제
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
          이런 경험, 익숙하지 않나요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 transition-all duration-200 hover:border-[rgba(99,102,241,0.3)] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
