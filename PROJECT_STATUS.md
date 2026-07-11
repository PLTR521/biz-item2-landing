# PROJECT_STATUS.md

> 최종 업데이트: 2026-07-12
> 프로젝트: **SendGuard AI 랜딩페이지** (수요검증용 fake-door waitlist)
> 배포: https://biz-item2-landing.vercel.app/ (main push 시 Vercel 자동 배포)
> 리포: https://github.com/PLTR521/biz-item2-landing

---

## 1. 현재 완료된 TASK

| # | TASK | 상태 |
|---|------|------|
| 1 | Decision AI 랜딩 제작 (구 아이템, 피벗 전) | ✅ 완료 (폐기됨) |
| 2 | SendGuard AI로 콘텐츠 피벗 (커밋 f0bf748) | ✅ 완료 |
| 3 | 라이트 테마 devtool 스타일 전면 리디자인 (커밋 aeca598) | ✅ 완료 |
| 3-1 | 디자인 시스템 전환 (라이트 테마, 블루 #2563eb, JetBrains Mono) | ✅ |
| 3-2 | 공용 CodeCard 컴포넌트 (다크 코드카드 + 문법 하이라이팅 토큰) | ✅ |
| 3-3 | Hero + Nav 재작성 (Eyebrow, 새 헤드라인, 이중 CTA, curl/JSON 비주얼) | ✅ |
| 3-4 | 본문 재구성 (WhyWarmup / Features Chess / HowItWorks / BuiltFor / Example) | ✅ |
| 3-5 | FinalCTA(edge-to-edge 다크) + WaitlistForm(variant 지원) + page.tsx 조립 | ✅ |
| 3-6 | 검증: 프로덕션 빌드 통과, 콘솔 에러 0, 모바일 375px 반응형 확인 | ✅ |

## 2. 현재 구현 상태

- **단계:** 코드 이전 수요검증 (fake-door). 실제 API/제품 없음.
- **깔때기:** 랜딩(Waitlist) → ICP 인터뷰 20명 → Go/No-Go
- **스택:** Next.js 14.2.5 (App Router) + TypeScript + Tailwind 3.4 + lucide-react
- **테마:** 라이트(#fff) 바탕 + 다크 코드카드(#0f172a), 액센트 블루 #2563eb, Inter + JetBrains Mono
- **페이지 구조 (app/page.tsx 순서):**
  1. `Nav` — 로고 + "Get an API key" (→ #waitlist)
  2. `Hero` — Eyebrow "Currently in private beta" / h1 "Deliverability API for AI agents" / 이중 CTA / curl+JSON 코드카드
  3. `WhyWarmup` — "Why warmup tools don't work for agent-sent email" + 포지셔닝 라인
  4. `Features` — Chess 레이아웃 3개 (reputation / safe volume / per-tenant)
  5. `HowItWorks` — 3스텝
  6. `BuiltFor` — 텍스트 로고 나열 "Built for teams shipping with"
  7. `Example` — id=`example`, 주석 달린 응답 예시
  8. `FinalCTA` — id=`waitlist`, edge-to-edge 다크 블록 + WaitlistForm
- **이메일 수집:** Formspree `https://formspree.io/f/mzdqnklk` (`components/WaitlistForm.tsx`, variant light/dark)
- **미사용 코드:** `app/api/waitlist/route.ts` (Upstash 카운터) — 파일만 존재, 화면에서 호출/표시 안 함 (의도적)

## 3. 마지막 커밋

```
aeca598d1b00bd031b2cbb606d5eb6f93aa90705
2026-07-11 21:27 KST
"Redesign SendGuard landing as developer API page (light theme)"
```
- 워킹트리: 클린 (untracked `.claude/settings.json`만 있음 — 커밋 제외 대상)

## 4. 주요 변경 파일 (커밋 aeca598 기준)

**신규:** `components/CodeCard.tsx`, `Example.tsx`, `Features.tsx`, `HowItWorks.tsx`, `WhyWarmup.tsx`
**수정:** `app/globals.css`(라이트 팔레트), `app/layout.tsx`(JetBrains Mono, 메타데이터), `app/page.tsx`, `components/Nav.tsx`, `Hero.tsx`, `BuiltFor.tsx`, `FinalCTA.tsx`, `WaitlistForm.tsx`, `tailwind.config.ts`
**삭제:** `components/StatCallout.tsx`, `Problem.tsx`, `WhyNow.tsx`, `KnownFacts.tsx`, `Hypothesis.tsx`, `Preview.tsx`

## 5. 알려진 이슈

1. **배포 페이지 육안 확인 미완** — 로컬 검증은 텍스트/CSS 기반으로 완료했으나(스크린샷 도구가 Browser pane 행업으로 타임아웃), 프로덕션 URL 픽셀 확인은 사람 눈으로 아직 안 함.
2. **분석 도구 없음** — 방문/CTA 클릭/전환 측정 수단이 전혀 없음. fake-door 테스트인데 전환율을 못 잼 (다음 작업 1순위).
3. **favicon / OG 이미지 없음** — 링크 공유 시 미리보기 이미지·아이콘 없음.
4. **fake-door 카피 경계선** — "hit our beta endpoint", "Free while we're in private beta"는 러닝 중인 베타를 암시. 사용자가 fake-door 테스트로 명시 승인했으나, 과장금지 규칙과 경계선. 제품 방향 확정 시 재검토.
5. **잔재 네이밍** — `package.json` name이 `decision-ai-landing`, `.claude/launch.json` 서버명이 `decision-ai-dev` (동작엔 무관, 코스메틱).
6. **docs 페이지 없음** — 계획서상 Secondary CTA "Read the docs"는 docs 부재로 "View example response"로 대체됨 (계획서가 허용한 fallback).

## 6. 다음 작업 (우선순위순)

1. 프로덕션 배포 육안 확인 (데스크톱/모바일)
2. **분석 추가** — Vercel Analytics(무료) + CTA 클릭 이벤트 → fake-door 전환율 측정 가능하게
3. favicon + OG 이미지 추가 (SNS/커뮤니티 공유 대비)
4. 트래픽 유입 시작 — Reddit / X / Discord 포스팅 (전용 스킬 활용), ICP 인터뷰 모집
5. (선택) 잔재 네이밍 정리, 미사용 waitlist API route 삭제 여부 결정
