"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// 기존 Decision AI 랜딩페이지와 동일한 Formspree endpoint를 그대로 유지한다.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdqnklk";

export default function WaitlistForm({
  buttonLabel = "Get an API key",
  variant = "light",
}: {
  buttonLabel?: string;
  variant?: "light" | "dark";
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

  const isDark = variant === "dark";

  if (submitted) {
    return (
      <div
        className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-medium ${
          isDark
            ? "border border-[rgba(134,239,172,0.3)] bg-[rgba(34,197,94,0.12)] text-[#86efac]"
            : "border border-[rgba(22,163,74,0.25)] bg-[rgba(22,163,74,0.08)] text-[var(--success)]"
        }`}
      >
        <Check className="h-4 w-4 shrink-0" />
        <span>
          You&apos;re on the list. We&apos;ll email you as we open up the
          private beta.
        </span>
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
          className={`flex-1 rounded-lg px-5 py-3.5 transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
            isDark
              ? "border border-[var(--code-border)] bg-[rgba(255,255,255,0.06)] text-white placeholder:text-[#64748b] focus:border-[var(--accent-hover)]"
              : "border border-[var(--border-strong)] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)]"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[var(--accent)] px-6 py-3.5 font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : buttonLabel}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
      {error && (
        <p
          className={`mt-3 text-sm ${isDark ? "text-red-300" : "text-red-500"}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
