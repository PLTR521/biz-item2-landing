import type { ReactNode } from "react";

/**
 * 다크 코드 카드. 라이트 배경의 히어로/Feature/Example 섹션에서 공통으로 쓴다.
 * 모바일에서는 가로 스크롤을 허용한다 (계획서 요구사항).
 */
export default function CodeCard({
  label,
  meta,
  children,
  className = "",
}: {
  label: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-lg border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_16px_40px_-20px_rgba(20,20,18,0.5)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--code-border)] bg-[var(--code-bg-2)] px-4 py-2.5">
        <span className="truncate font-mono text-xs text-[var(--code-comment)]">
          {label}
        </span>
        {meta && (
          <span className="shrink-0 font-mono text-xs text-[var(--code-comment)]">
            {meta}
          </span>
        )}
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
