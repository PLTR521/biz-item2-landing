import type { ReactNode } from "react";

/**
 * 다크 코드 카드. 라이트 배경의 히어로/Feature/Example 섹션에서 공통으로 쓴다.
 * 모바일에서는 가로 스크롤을 허용한다 (계획서 요구사항).
 */
export default function CodeCard({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--code-border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-[var(--code-comment)]">
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.7] text-[var(--code-text)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── JSON / shell 문법 하이라이팅용 토큰 ── */
export const K = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-key)]">{children}</span>
);
export const S = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-string)]">{children}</span>
);
export const N = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-number)]">{children}</span>
);
export const C = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-comment)]">{children}</span>
);
export const Cmd = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-cmd)]">{children}</span>
);
export const Flag = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--code-flag)]">{children}</span>
);
