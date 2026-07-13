"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";

// SendGuard API의 셀프서브 무료 티어 가입 엔드포인트 (별도 리포 sendguard-ai).
const SIGNUP_ENDPOINT =
  (process.env.NEXT_PUBLIC_SENDGUARD_API_URL || "https://send-guard-ai.vercel.app") +
  "/api/signup";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Please enter a valid email address.",
  email_already_registered:
    "That email already has a key. Check your inbox, or use a different address.",
};

export default function WaitlistForm({
  buttonLabel = "Get an API key",
  variant = "light",
}: {
  buttonLabel?: string;
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.apiKey) {
        setApiKey(data.apiKey);
        setEmailed(Boolean(data.emailed));
      } else {
        setError(
          (data?.error && ERROR_MESSAGES[data.error]) ||
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = variant === "dark";

  if (apiKey) {
    return (
      <div
        className={`rounded-lg border px-5 py-4 text-left ${
          isDark
            ? "border-[rgba(134,239,172,0.3)] bg-[rgba(34,197,94,0.12)]"
            : "border-[rgba(22,163,74,0.25)] bg-[rgba(22,163,74,0.08)]"
        }`}
      >
        <div
          className={`mb-2 flex items-center gap-2 text-sm font-medium ${
            isDark ? "text-[#86efac]" : "text-[var(--success)]"
          }`}
        >
          <Check className="h-4 w-4 shrink-0" />
          <span>
            {emailed
              ? "Your API key is ready — also sent to your inbox."
              : "Your API key is ready — save it now, it won't be shown again."}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <code
            className={`flex-1 overflow-x-auto whitespace-nowrap rounded px-3 py-2 font-mono text-xs ${
              isDark
                ? "bg-[var(--code-bg)] text-[var(--code-text)]"
                : "bg-[var(--bg-muted)] text-[var(--text-primary)]"
            }`}
          >
            {apiKey}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded px-3 py-2 text-xs font-medium transition-colors duration-200 ${
              isDark
                ? "bg-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.14)]"
                : "bg-white text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
            }`}
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
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
          {loading ? "Creating key..." : buttonLabel}
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
