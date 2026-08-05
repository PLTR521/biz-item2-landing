"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
// 도메인 하드코딩 금지 — 주소는 전부 lib/site.ts 한 곳에서만 온다.
import { API_SIGNUP_URL, API_LOGIN_URL } from "@/lib/site";

// 셀프서브 무료 티어 가입 엔드포인트
const SIGNUP_ENDPOINT = API_SIGNUP_URL;

// 키를 잃어버린 사람이 갈 곳. 로그인(매직링크) 후 대시보드에서 재발급한다.
const RECOVER_URL = API_LOGIN_URL;

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Please enter a valid email address.",
  email_already_registered:
    "That email already has a key. Check your inbox — or sign in to regenerate it if you lost it.",
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
        className={`rounded-md border px-5 py-4 text-left ${
          isDark
            ? "border-[rgba(142,201,154,0.3)] bg-[rgba(26,127,55,0.14)]"
            : "border-[rgba(26,127,55,0.3)] bg-[var(--ok-soft)]"
        }`}
      >
        <div
          className={`mb-2 flex items-center gap-2 text-sm font-medium ${
            isDark ? "text-[#8ec99a]" : "text-[var(--ok)]"
          }`}
        >
          <Check className="h-4 w-4 shrink-0" />
          <span>
            {/*
              메일이 나갔든 안 나갔든 키 자체는 서버에 해시로만 남아 재표시가
              불가능하다. 발송 여부는 부가 정보일 뿐이라 경고를 대체할 수 없다.
            */}
            {emailed
              ? "Your API key is ready — save it now, it won't be shown again. We also sent a copy to your inbox."
              : "Your API key is ready — save it now, it won't be shown again."}
          </span>
        </div>
        {/*
          키는 화면에 1회만 뜨고 서버는 해시만 갖는다. 이메일이 안 나간 경우
          (도메인 인증 전) 이 안내가 유일한 복구 경로이므로 키 바로 옆에 둔다.
        */}
        <div className="flex items-center gap-2">
          <code
            className={`flex-1 overflow-x-auto whitespace-nowrap rounded px-3 py-2 font-mono text-xs ${
              isDark
                ? "bg-[var(--code-bg-2)] text-[var(--code-text)]"
                : "bg-[var(--bg-muted)] text-[var(--text-primary)]"
            }`}
          >
            {apiKey}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded px-3 py-2 text-xs font-medium transition-colors duration-150 ${
              isDark
                ? "bg-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.14)]"
                : "bg-white text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
            }`}
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p
          className={`mt-3 text-xs leading-relaxed ${
            isDark ? "text-[#a8a89e]" : "text-[var(--text-tertiary)]"
          }`}
        >
          Lose it and we can&apos;t show it again — we only store a hash. You
          can{" "}
          <a
            href={RECOVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-2 ${
              isDark ? "text-white" : "text-[var(--text-primary)]"
            }`}
          >
            sign in with this email
          </a>{" "}
          to issue a replacement key at any time.
        </p>
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
          className={`flex-1 rounded-md px-5 py-3.5 transition-colors duration-150 focus:outline-none disabled:opacity-50 ${
            isDark
              ? "border border-[var(--code-border)] bg-[rgba(255,255,255,0.06)] text-white placeholder:text-[#6f6f66] focus:border-[rgba(255,255,255,0.4)]"
              : "border border-[var(--border-strong)] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--text-primary)]"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-3.5 font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${
            isDark
              ? "bg-white text-[var(--text-primary)] hover:bg-[#e8e8e2]"
              : "bg-[var(--btn)] text-white hover:bg-[var(--btn-hover)]"
          }`}
        >
          {loading ? "Creating key..." : buttonLabel}
        </button>
      </form>
      {error && (
        <p
          className={`mt-3 text-sm ${
            isDark ? "text-[#f0a3a8]" : "text-[var(--danger)]"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
