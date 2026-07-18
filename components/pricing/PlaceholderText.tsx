import { Fragment } from "react";

const PLACEHOLDER = /(\{\{[^}]*\}\})/g;

// '{{...}}' 플레이스홀더를 warn 컬러 모노로 눈에 띄게 렌더 —
// 실값이 주입되지 않은 곳이 UI에서 바로 보이게 하기 위한 장치.
export default function PlaceholderText({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("{{") && part.endsWith("}}") ? (
          <span
            key={i}
            className="whitespace-nowrap font-mono text-[0.9em] text-[var(--warn)]"
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
