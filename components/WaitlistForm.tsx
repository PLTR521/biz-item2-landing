"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// 기존 Decision AI 랜딩페이지와 동일한 Formspree endpoint를 그대로 유지한다.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdqnklk";

export default function WaitlistForm({
  buttonLabel = "Get early access",
}: {
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(
          data?.errors?.[0]?.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-full border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.08)] px-5 py-3.5 font-medium text-[var(--success)]">
        <Check className="h-4 w-4 shrink-0" />
        <span>You&apos;re on the list. We&apos;ll reach out to beta testers first.</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={loading}
          className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3.5 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors duration-200 focus:border-[var(--accent)] focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] px-6 py-3.5 font-medium text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : buttonLabel}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
