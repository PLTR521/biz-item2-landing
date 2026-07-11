# GAP_REPORT.md — 계획(BUILD.md/리디자인 계획서) vs 실제 구현

> 작성일: 2026-07-12 | 기준 커밋: aeca598
> 결론: **계획서 체크리스트 13항목 전부 구현됨.** 아래는 의도적 편차(승인됨)와 사소한 수치 차이만 정리.

---

## 1. 의도적 편차 (세션 중 사용자 결정으로 확정)

| 항목 | 계획서 | 실제 구현 | 사유 |
|------|--------|-----------|------|
| 액센트 컬러 | `#0f7938` 초록 또는 `#0066ff` 파랑 중 선택 | **`#2563eb`** (Tailwind blue-600 계열) | 사용자가 블루 선택. #0066ff 대신 채도 낮은 #2563eb로 devtool 관례(Stripe/Resend)에 맞춤 |
| Secondary CTA | "Read the docs" (docs 없으면 "View example response") | **"View example response"** (→ #example 앵커) | docs 페이지 부재. 계획서가 명시한 fallback 그대로 |
| 성공 메시지 | (계획서에 명시 없음) | "You're on the list. We'll email you as we open up the private beta." | fake-door이되 확인 메시지는 정직하게 — 과장금지 규칙과의 절충 |
| 폼 동작 | "Get an API key" → 기존 form | 모든 CTA가 #waitlist 앵커 → FinalCTA 내 WaitlistForm | 계획서 "이미 존재하는 form으로 향하도록" 충족 |

## 2. 사소한 수치/레이아웃 차이 (기능 영향 없음)

| 항목 | 계획서 | 실제 구현 | 비고 |
|------|--------|-----------|------|
| 컨테이너 max-width | 1200px 또는 1280px | `max-w-6xl`(1152px, Hero/Features/HowItWorks), 텍스트 섹션 `max-w-3xl` | 가독성 위해 텍스트 섹션은 좁게. 필요 시 `max-w-6xl`→`max-w-screen-xl`(1280) 일괄 치환 가능 |
| Chess 비율 | 52% text / 48% visual, gap 32px | 50/50 (`md:grid-cols-2`), gap 48px(`md:gap-12`) | 시각 차이 미미 |
| 섹션 padding | 64px (모바일 32px) | `py-20`(80px)~`py-28`(112px), 모바일 `py-16`~`py-20` | 계획보다 여백 넉넉 — devtool 레퍼런스에 더 근접 |
| h1 크기 | 2.5rem~3.5rem | 최대 3.4rem (`lg:text-[3.4rem]`) | 범위 내 |
| 코드 폰트 크기 | 0.875rem (14px) | 13px (`text-[13px]`) | 히어로 코드카드가 한 화면에 들어가도록 1px 축소 |
| 히어로 레이아웃 | (명시 없음, 코드블록 예시만 제공) | 2컬럼 (좌: 카피, 우: 코드카드), lg 미만 스택 | Resend 스타일 해석. 계획서와 충돌 없음 |
| Final CTA 배경 | `#0f172a` | `#0f172a` (`--cta-bg`) | 일치 |

## 3. 계획서 밖에서 추가/변경된 것

- `components/CodeCard.tsx` 신규 — 코드카드 3곳(Hero/Features/Example) 스타일 통일용 공용 컴포넌트 + 하이라이팅 토큰(K/S/N/C/Cmd/Flag)
- `app/layout.tsx` 메타데이터(title/description/OG)를 새 헤드라인에 맞춰 갱신 — 계획서엔 없었으나 필수
- `WaitlistForm`에 `variant("light"|"dark")` prop 추가 — 다크 FinalCTA 위에서 폼이 보이도록
- Tailwind `darkMode: "class"` 설정 제거, `<html className="dark">` 제거 — 라이트 단일 테마로 단순화

## 4. 계획서에 있었지만 하지 않은 것

**없음.** 13개 체크리스트 항목 전부 반영.

## 5. 미해결 갭 (다음 세션 대상 — PROJECT_STATUS.md §5·§6와 동일)

1. 프로덕션 픽셀 육안 확인 미완 (로컬은 accessibility tree + computed CSS로만 검증)
2. 분석/이벤트 추적 전무 → fake-door 전환율 측정 불가
3. favicon / OG 이미지 없음
4. `package.json` name(`decision-ai-landing`), `launch.json` 서버명(`decision-ai-dev`) 잔재
5. 미사용 `app/api/waitlist/route.ts` 존치 여부 미결정
