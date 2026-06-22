"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Users } from "lucide-react";

const BASE_COUNT = 28;

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    // 모든 방문자에게 공유되는 실제 카운터를 서버에서 가져온다.
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/mzdqnklk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // 제출 성공 시 서버 카운터를 +1 하고 공유 값을 받아온다.
        try {
          const countRes = await fetch("/api/waitlist", { method: "POST" });
          const countData = await countRes.json();
          if (typeof countData?.count === "number") setCount(countData.count);
        } catch {
          setCount((c) => c + 1);
        }
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || "오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 md:py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border)] px-4 py-2 rounded-full mb-8">
          <Users className="w-4 h-4 text-[var(--accent)]" />
          <span>현재 <span className="text-[var(--text-primary)] font-semibold">{count}명</span> 신청 완료</span>
        </div>
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
              disabled={loading}
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-5 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "신청 중..." : "얼리 액세스 신청"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
        {error && (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        )}

        <p className="text-[var(--text-tertiary)] text-xs mt-6">
          현재 개발 중입니다. 베타 출시까지 기다려 주셔서 감사합니다.
        </p>
      </div>
    </section>
  );
}
