"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: 실제 백엔드 연동 전이므로 제출을 시뮬레이션합니다.
    // 실제 배포 시 Resend, Formspree, Supabase 등으로 교체하세요.
    console.log("waitlist signup:", email);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-20 md:py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          결정이 어렵다면
          <br />
          먼저 신청해 두세요
        </h2>
        <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
          스팸 없이 베타 오픈 소식만 보내드립니다.
        </p>

        {submitted ? (
          <div className="text-[var(--accent)] font-medium text-lg">
            신청됐습니다. 베타 오픈 시 가장 먼저 알려드릴게요.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-5 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
            >
              얼리 액세스 신청
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[var(--text-tertiary)] text-xs mt-6">
          현재 개발 중입니다. 베타 출시까지 기다려 주셔서 감사합니다.
        </p>
      </div>
    </section>
  );
}
