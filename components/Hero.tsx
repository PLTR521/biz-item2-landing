import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block text-sm font-medium text-[var(--accent)] bg-[var(--accent-soft)] px-4 py-1.5 rounded-full mb-8">
          얼리 액세스 모집 중
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          탭 10개 열었는데
          <br />
          결론이 없다면
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
          예산, 용도, 조건을 입력하면 Decision AI가 비교표·추천 이유·체크리스트·PDF까지
          만들어드립니다. GPT는 답변을, Decision AI는 결정을 완결합니다.
        </p>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]"
        >
          얼리 액세스 신청하기
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="relative max-w-3xl mx-auto mt-16 md:mt-24">
        <ProductMockup />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-[var(--accent)] opacity-10 blur-2xl rounded-full" />
      </div>
    </section>
  );
}

function ProductMockup() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-[var(--text-tertiary)] font-medium">Decision AI</span>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-4 py-3 mb-4">
          <span className="text-sm text-[var(--text-secondary)] flex-1">
            이어폰 추천해줘, 예산 15만원, 운동용
          </span>
          <span className="text-xs text-[var(--accent)] font-medium shrink-0 bg-[var(--accent-soft)] px-2 py-0.5 rounded-full">
            분석 완료
          </span>
        </div>
        <ComparisonTable />
        <RecommendationBox />
        <div className="flex gap-2 mt-3">
          <div className="flex-1 border border-[var(--border)] rounded-lg py-2 text-center text-xs text-[var(--text-secondary)]">
            체크리스트 보기
          </div>
          <div className="flex-1 bg-[var(--accent-soft)] border border-[rgba(99,102,241,0.2)] rounded-lg py-2 text-center text-xs text-[var(--accent)] font-medium">
            PDF 저장
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const rows: [string, string, string][] = [
    ["방수", "IPX7", "IPX4"],
    ["배터리", "6시간", "10시간"],
    ["가격", "149,000원", "79,000원"],
  ];

  return (
    <div className="mb-4 rounded-xl border border-[var(--border)] overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left px-3 py-2 text-[var(--text-tertiary)] font-normal w-1/3" />
            <th className="text-center px-3 py-2 text-[var(--text-primary)] font-semibold w-1/3">
              Galaxy Buds3 Pro
            </th>
            <th className="text-center px-3 py-2 text-[var(--accent)] font-semibold w-1/3">
              WF-C700N
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, a, b]) => (
            <tr key={label} className="border-b border-[var(--border)] last:border-0">
              <td className="px-3 py-2 text-[var(--text-tertiary)]">{label}</td>
              <td className="px-3 py-2 text-center text-[var(--text-secondary)]">{a}</td>
              <td className="px-3 py-2 text-center text-[var(--text-secondary)]">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecommendationBox() {
  return (
    <div className="bg-[var(--accent-soft)] border border-[rgba(99,102,241,0.2)] rounded-xl p-3">
      <div className="text-xs font-semibold text-[var(--accent)] mb-1">운동 목적 기준 추천</div>
      <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
        Galaxy Buds3 Pro — IPX7 방수등급이 높고 귀에서 빠지지 않는 구조. 예산(15만원) 내 최선.
      </div>
    </div>
  );
}
