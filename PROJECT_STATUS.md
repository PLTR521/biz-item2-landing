# PROJECT_STATUS.md

> 최종 업데이트: 2026-07-12 (T14 부분 진행 세션)
> 프로젝트: **SendGuard AI 랜딩페이지** (수요검증용 fake-door waitlist)
> 배포: https://biz-item2-landing.vercel.app/ (main push 시 Vercel 자동 배포)
> 리포: https://github.com/PLTR521/biz-item2-landing
> ⚠️ **T14(랜딩 결제 CTA)**: sendguard-ai 쪽 준비 완료(155f9b9 — 이메일 하네스 + success 페이지).
> 랜딩 CTA 교체는 **Stripe Payment Link URL + Resend 키 입력 후** 진행. `sendguard-ai/.env.local`은
> 2026-07-12 실측 결과 전부 빈 값(Resend 키 미입력) — 사용자 키 입력이 선행 조건.

---

## 1. 현재 완료된 TASK

| # | TASK | 상태 |
|---|------|------|
| 1 | Decision AI 랜딩 제작 (구 아이템, 피벗 전) | ✅ 완료 (폐기됨) |
| 2 | SendGuard AI로 콘텐츠 피벗 (커밋 f0bf748) | ✅ 완료 |
| 3 | 라이트 테마 devtool 스타일 전면 리디자인 (커밋 aeca598) | ✅ 완료 |
| 4 | 종료 문서 4종 작성 (커밋 61423cf) | ✅ 완료 |
| 5 | 리팩토링: 미사용 waitlist 카운터 API + @upstash/redis 제거 (커밋 e34c3dc) | ✅ 완료 |
| 6 | 잔재 네이밍 정리: package `sendguard-landing`, launch `sendguard-dev` (커밋 e34c3dc) | ✅ 완료 |
| 7 | 테스트 스위트 추가: vitest + Testing Library, 9개 테스트 통과 (커밋 e34c3dc) | ✅ 완료 |
| 8 | README.md 신규 + 문서 최신화 | ✅ 완료 (이 커밋) |
| — | T14 이후: 분석/외부 서비스 연동 | ⏸️ **보류** (외부 계정 생성 불가) |

## 2. 현재 구현 상태

- **단계:** 코드 이전 수요검증 (fake-door). 실제 API/제품 없음.
- **깔때기:** 랜딩(Waitlist) → ICP 인터뷰 20명 → Go/No-Go
- **스택:** Next.js 14.2.5 (App Router) + TypeScript + Tailwind 3.4 + lucide-react
- **테스트:** vitest 4 + @testing-library/react — `npm test` (9개 통과: 페이지 스모크 5 + WaitlistForm 4)
- **테마:** 라이트(#fff) + 다크 코드카드(#0f172a), 액센트 블루 #2563eb, Inter + JetBrains Mono
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
- **API 라우트:** 없음 (구 Upstash 카운터 라우트는 e34c3dc에서 삭제 — 허위 카운터 재도입 금지 원칙에 부합)

## 3. 마지막 커밋

```
e34c3dc  2026-07-12
"Remove dead waitlist counter API and add test suite"
```
- 직전: 61423cf(종료 문서), aeca598(리디자인)
- 워킹트리: 문서 갱신분 외 클린 (untracked `.claude/settings.json`은 커밋 제외 대상)

## 4. 주요 변경 파일 (커밋 e34c3dc 기준)

**삭제:** `app/api/waitlist/route.ts` (미사용 시드 카운터)
**신규:** `vitest.config.ts`, `vitest.setup.ts`, `__tests__/page.test.tsx`, `__tests__/waitlist-form.test.tsx`
**수정:** `package.json` (이름 변경, @upstash/redis 제거, test 스크립트 추가), `package-lock.json`, `.claude/launch.json` (서버명 `sendguard-dev`)

## 5. 알려진 이슈

1. **배포 페이지 육안 확인 미완** — 로컬 검증(테스트 9개 + 콘솔 에러 0 + accessibility tree)은 완료. 프로덕션 URL 픽셀 확인은 사람 눈으로 아직 안 함.
2. **분석 도구 없음 (⏸️ 보류)** — 방문/CTA/전환 측정 수단 없음. Vercel Analytics 등은 외부 서비스 계정 이슈로 T14 이후 보류. **유입 시작 전 반드시 해제 필요.**
3. **favicon / OG 이미지 없음** — 외부 계정 불필요(정적 파일)라 다음 세션에서 가능.
4. **fake-door 카피 경계선** — "hit our beta endpoint", "Free while we're in private beta"는 러닝 중인 베타를 암시. 사용자 명시 승인 범위. 제품 방향 확정 시 재검토.
5. **docs 페이지 없음** — Secondary CTA는 "View example response"로 대체 운영 중.
6. ~~잔재 네이밍~~ → e34c3dc에서 해결.
7. ~~미사용 waitlist API route~~ → e34c3dc에서 삭제로 해결.

## 6. 다음 작업 (우선순위순)

1. 프로덕션 배포 육안 확인 (데스크톱/모바일) — 계정 불필요
2. favicon + OG 이미지 추가 — 계정 불필요, 정적 파일
3. ⏸️ **(보류 해제 시)** Vercel Analytics + CTA/폼 이벤트 추적 → fake-door 전환율 측정
4. ⏸️ **(3 완료 후)** 트래픽 유입 — Reddit / X / Discord 포스팅, ICP 인터뷰 모집
5. (선택) 카피 검토 — fake-door 수위 재점검
