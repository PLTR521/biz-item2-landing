# PROJECT_STATUS.md

> 최종 업데이트: 2026-07-17 (제품명 **Email Deliverability**로 리브랜딩 + Vercel 프로젝트 리네이밍)
> ⚠️ **도메인 주의(2026-07-17 RDAP 확정): sendguard.io와 sendguard.ai는 둘 다 제3자 소유다.** 랜딩 예제가
> api.sendguard.ai(남의 서버)를 가리키던 버그는 0b542c0에서 수정 완료(실제 주소 + 실제 응답 스키마).
> ✅ **리브랜딩(2026-07-17, 커밋 9b86a4e):** SendGuard 이름 충돌을 피해 제품명·URL을 **Email Deliverability**로
> 변경. Vercel 프로젝트 biz-item2-landing → email-deliverability 리네이밍(사용자 지시, Claude in Chrome으로 수행).
> 구 URL(biz-item2-landing.vercel.app)도 계속 서빙됨. API CORS는 신·구 origin 둘 다 허용(SendGuard-AI 208dfa1).
> GitHub 리포 이름은 그대로 biz-item2-landing.
> 프로젝트: **Email Deliverability 랜딩페이지** (실제 무료 티어 셀프서브 가입 — 더 이상 fake-door 아님)
> 배포: https://email-deliverability.vercel.app/ (main push 시 Vercel 자동 배포; 구 URL biz-item2-landing.vercel.app도 유효)
> 리포: https://github.com/PLTR521/biz-item2-landing
> ✅ **셀프서브 가입 완료(2026-07-13)**: 랜딩 폼이 sendguard-ai `POST /api/signup`(새 라우트, 커밋 629b92c)을 호출해
> free 티어 계정 생성 + 실제 API 키를 화면에 즉시 표시(+ best-effort 이메일). fake-door → 실제 작동 흐름으로 전환.
> ✅ **프로덕션 E2E 검증 통과(2026-07-13)**: 랜딩 방문 → CTA → 이메일 제출 → 실제 키 발급 → 그 키로 `/api/check` 200
> (gmail.com → healthy/low, IP 5개 resolve, SPF/DMARC 실측 일치). 중복 가입 409, 무효 키 401 모두 정상. 콘솔 에러 0.
> ✅ **테스트 데이터 정리 완료**: 프로덕션 Supabase `accounts` 테이블 비움(검증 계정 전부 삭제).
> ✅ **Vercel Analytics 추가(커밋 f542a99)**: `@vercel/analytics` — **단, Vercel 대시보드 Analytics 탭에서 켜야 집계 시작.**
> ✅ **Signup rate limit 완료(2026-07-13, sendguard-ai 커밋 6a908a8)**: `/api/signup`에 IP당 10분 5회 고정
> 윈도 rate limit(Supabase RPC 원자적 증가). 로컬+프로덕션 모두 검증: 정상 429/Retry-After, 병렬 15개 요청에서
> 정확히 5개만 허용(레이스 없음), 정상 사용자 무영향. **Vercel이 client-supplied x-forwarded-for를 무시하고
> 실제 접속 IP로 덮어쓰는 것도 확인 — IP 스푸핑으로 우회 불가.** 마이그레이션은 사용자가 Supabase SQL Editor에서 직접 실행함.
> ⚠️ **T16(Show HN) 전 남은 게이트**: ① Vercel 대시보드에서 Analytics **ON** ② (권장) Resend 도메인 인증 — 안 하면
> 가입 확인 메일이 계정 소유자 외 주소로 안 감(키는 화면 표시로 전달되니 하드 블로커는 아님) ③ Show HN 본문 URL 확정.
> ℹ️ sendguard-ai 리포: GitHub 자동배포가 한동안 안 걸려(웹훅 이슈) 사용자가 GitHub 연동 재설정 후 629b92c 배포 반영됨.

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
