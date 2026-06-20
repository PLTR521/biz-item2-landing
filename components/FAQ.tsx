"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "지금 바로 쓸 수 있나요?",
    a: "현재 얼리 액세스 신청을 받고 있습니다. 이메일을 등록해 두시면 베타 오픈 시 가장 먼저 알려드립니다.",
  },
  {
    q: "가격이 어떻게 되나요?",
    a: "하루 3회 무료로 쓸 수 있고, Pro 구독(월 9,900원)을 출시 예정입니다. 얼리 액세스 신청자에게는 출시 초기 특별 혜택을 제공할 계획입니다.",
  },
  {
    q: "ChatGPT나 다나와랑 뭐가 다른가요?",
    a: "ChatGPT는 질문에 답변을 드리지만, Decision AI는 비교표·추천 이유·체크리스트·PDF까지 결정을 완결합니다. 다나와는 가격 중심인 반면, Decision AI는 내 예산·용도에 맞는 맥락 기반 추천을 드립니다.",
  },
  {
    q: "내 정보는 어떻게 관리되나요?",
    a: "입력한 정보와 Decision Memory는 계정에 귀속되어 보관됩니다. 제3자와 공유되지 않으며, 자세한 개인정보처리방침은 출시 시 명시합니다.",
  },
  {
    q: "어떤 카테고리를 지원하나요?",
    a: "초기 베타에서는 전자기기, 운동용품, 생활용품 등 5만~50만원대 비교 구매가 많은 카테고리를 우선 지원합니다. 이후 순차적으로 확장할 예정입니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--text-tertiary)] text-center mb-4">
          FAQ
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16">
          자주 묻는 질문
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-[var(--border)] rounded-2xl overflow-hidden transition-colors duration-200 hover:border-[rgba(99,102,241,0.3)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
              >
                <span className="font-medium text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--text-tertiary)] shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
