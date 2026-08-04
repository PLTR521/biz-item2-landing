# PROJECT_STATUS.md

> 최종 업데이트: 2026-08-04 (랜딩 카피 전면 개편 — 포지셔닝·CVR·오해 차단 3라운드)
>
> ### ✅ 2026-08-04 — 랜딩 카피/포지셔닝 개편 (Reddit 고객 조사 반영, UI 무변경)
> 사용자가 r/emaildeliverability 등에서 조사한 실제 고객 언어를 반영해 카피만 3라운드로 고쳤다.
> **레이아웃·색상·타이포그래피·여백은 한 줄도 안 건드렸다.** 새로 만든 `Chain.tsx`도 기존 토큰
> (`.eyebrow` / 파이프라인 카드 / `--ok`·`--ok-soft` / lucide `Check`)만 재사용했다.
>
> **① 포지셔닝** — "도메인 한 번 검사하는 API" → "보내기 전에 인증·평판 문제를 잡는 사전 점검 API".
> h1을 `Broken SPF never throws an error. Your email just stops arriving.`로 교체(문제 우선).
> Safe Send Volume 비중을 낮추고 SPF/DKIM/DMARC/DNSBL을 전면에 올렸다.
>
> **② CVR** — Compare h2를 반론 그대로(`Why not just use SendGrid or Resend?`)로 바꾸고,
> Example에 **시그널 → 의미 → 조치** 블록 6행 추가(응답 필드가 아니라 페이지 설명임을 화면에 명시).
> `lib/risk.ts`가 순수 룰이라 **채점 규칙을 공개**했다(warn 2 → warning, critical 1 → bad + ceiling 0).
> CTA: `Get an API key` → `Get a free API key`, 최종 CTA h2 → `Run it on your own domain.`
>
> **③ 오해 차단(신규 섹션 `Chain.tsx`, Hero 바로 아래 `01`)** — "Deliverability API"라는 이름 때문에
> **inbox placement를 직접 측정한다고 오해받는 것**을 막는 게 목적. Authentication → Sender reputation
> → Inbox placement → Customer 체인을 세로로 보여주고 **우리가 읽는 1·2단계만 ok 색으로 표시**
> (2단계는 "blocklists, too" — DNSBL이 실제로 reputation 레이어라 1단계만 표시하면 오히려 과소설명).
> 3·4단계는 "측정하지 않는다"고 섹션 본문 + FAQ 양쪽에 명시. 섹션 번호 01~06으로 재정렬.
>
> **⚠️ 카피가 코드를 앞서지 않도록 실제로 잘라낸 것들** (BUILD.md 불변 규칙 준수):
> - `DMARC alignment 검사` ✂️ — `auth-records.ts`는 레코드 존재 + `p=` 값만 본다. alignment 검증 없음.
> - `SPF 설정 오류 검출` ✂️ — `v=spf1` 존재 여부만 확인. 10-lookup 초과 등은 못 잡는다.
> - `Gmail 평판 하락 감지` ✂️ — Postmaster 데이터를 안 본다.
> - `Missing DKIM` ✂️ → `A DKIM selector with no key published behind it` — 셀렉터 없으면
>   `DKIM_NOT_CHECKED`(실패 아님)라서 "누락"이라고 쓸 수 없다.
> - `Suspicious DNS configuration` ✂️ — 그런 판정을 하는 코드가 없다. 실재하는 `DOMAIN_UNRESOLVED`로 대체.
> - 파이프라인 마지막 노드 `not the spam folder` → `where it should land` (유일하게 결과를 약속하는 문장이었음).
> - 금지 표현(Continuous Monitoring / Automatic Alerts / Background Scanning / Real-time / AI Detection /
>   Inbox Guarantee) 0건. FAQ의 "no background job, no alerting", "not a guarantee"는 전부 부정문.
> - 반대로 `dnsbl.ts`에서 **없던 근거를 발견해 노출**: 블록리스트가 조회를 거부하면 `"unknown", never "clean"`.
>
> **🔗 API 호스트 교체:** `send-guard-ai.vercel.app` → **`email-deliverability-app.vercel.app`**.
> Hero curl / Example curl / Footer "API health" 링크 + **`WaitlistForm.tsx`의 `API_BASE` 폴백**까지 전부.
> 마지막 건은 실제 가입 요청 경로라 바꾸기 전에 `/health` 실호출로
> `{"status":"ok","service":"email-deliverability"}` 확인함. 코드 경로에 구 도메인 잔존 0건
> (문서의 "당시 호스트 → 현 주소" 주석만 남김 — 날짜별 로그를 소급 조작하지 않기 위해).
>
> **🐞 곁다리로 고친 기존 버그 2건:**
> - `__tests__/waitlist-form.test.tsx`의 `/also sent to your inbox/i`가 컴포넌트 실제 문구
>   (`also sent **a copy** to your inbox`)와 안 맞아 **이번 세션 이전부터 실패 중**이었다. 정규식 수정.
> - `.claude/launch.json`의 `sendguard-dev`가 없어진 폴더(`biz-item2-landing`)를 가리켜 실행 불가 →
>   `email-deliverability-landing-dev`(포트 3000)로 교체. 2026-07-31에도 같은 유형의 사고가 있었다.
>
> 검증: `tsc --noEmit` / `vitest` 11개 / `next build` 통과. 브라우저 실측 — 콘솔 에러 0건,
> 375px·데스크톱 가로 스크롤 없음, Hero CTA가 720px 뷰포트에서도 폴드 위(649~697px).
>
> ### ✅ 2026-08-02 — 리포/프로젝트 이름 정합성 정리
> Vercel 프로젝트 이름과 GitHub 리포 이름이 서로 어긋나 있던 걸(2026-07-17 리네이밍 때 Vercel
> 프로젝트명만 바꾸고 GitHub 리포명은 그대로 뒀던 것) 이번에 GitHub 쪽도 맞춰서 정리했다.
> - GitHub 리포 `PLTR521/biz-item2-landing` → **`PLTR521/email-deliverabilityapi`**로 리네임
>   (Vercel 프로젝트 `email-deliverabilityapi`와 이름 일치. 이 리포가 실제 랜딩/가입폼 소스임 — 이름에
>   "api"가 들어가지만 랜딩 리포가 맞다, 혼동 주의)
> - GitHub 리포 `PLTR521/SendGuard-AI` → **`PLTR521/email-deliverability`**로 리네임
>   (Vercel 프로젝트 `email-deliverability`와 이름 일치. 이 리포는 API 서버 리포)
> - 로컬 폴더 `C:\온라인 사업\biz-item2-landing`도 사용자가 직접 `email-deliverabilityapi`로 리네임함
>   (로컬 폴더 `C:\온라인 사업\email-deliverability`는 API 서버 리포 그대로 유지)
> - `6251604`("Always warn the key won't be shown again, even when emailed", `WaitlistForm.tsx`)는
>   이미 main에 push되어 있었음을 재확인 (기존에 이미 반영 완료, 별도 push 불필요했음)
> - Vercel Git 연결은 리포 ID 기준이라 리네임 후에도 끊기지 않고 유지됨 확인
>
> ### ✅ 2026-07-31 — 카피 정직성 정리 (API 리포 `SESSION_LOG_2026-07-30.md` 후속)
> 2026-07-30 실사용 후기가 남긴 "다음 우선순위 ③"을 처리했다.
> 1. **"recent reputation history" 삭제** (`FAQ.tsx`, `HowItWorks.tsx`) — 이 API는 평판 이력을
>    저장하지도 조회하지도 않는다. 실제로 하는 일(요청 시점 라이브 DNS: DNSBL 3종 +
>    SPF/DKIM/DMARC)로 교체. **기능보다 카피가 앞서 있던 유일한 자리였다.**
> 2. **`127.0.0.2` 실응답을 Example 섹션에 증거로 게시** — 2026-07-30 23:55 UTC 프로덕션
>    실호출 결과. bad/high/0 + ZEN critical(SBL·PBL·XBL) + Barracuda·SpamCop warn.
>    판정값 무수정, 폭 때문에 detail의 링크 URL만 축약했고 그 사실도 화면에 명시.
> 3. **키 분실 복구 경로 안내 추가** (`WaitlistForm.tsx`) — API 리포에 07-31 신설된
>    `POST /api/keys/rotate` + `/login` 대시보드 재발급. 키는 화면에 1회만 뜨고 서버는
>    해시만 갖는데 지금까지 복구 방법 안내가 아예 없었다.
> 4. `.claude/launch.json`의 `sendguard-api-dev`가 죽은 경로(`C:\온라인 사업\sendguard-ai`)를
>    가리켜 **조용히 랜딩을 대신 띄우고 있었다** → `email-deliverability-api-dev`로 교체(포트 3210).
>
> 검증: `tsc --noEmit` / `vitest` 11개 / `next build` 통과, 브라우저 실측(문구 0건, 증거 블록
> 렌더 정상, 콘솔 에러 0, 모바일 375px 가로 스크롤 없음).
>
> ---
>
> 이전 업데이트: 2026-07-17 (제품명 **Email Deliverability**로 리브랜딩 + Vercel 프로젝트 리네이밍)
> ⚠️ **도메인 주의(2026-07-17 RDAP 확정): sendguard.io와 sendguard.ai는 둘 다 제3자 소유다.** 랜딩 예제가
> api.sendguard.ai(남의 서버)를 가리키던 버그는 0b542c0에서 수정 완료(실제 주소 + 실제 응답 스키마).
> ✅ **리브랜딩(2026-07-17, 커밋 9b86a4e):** SendGuard 이름 충돌을 피해 제품명·URL을 **Email Deliverability**로
> 변경. Vercel 프로젝트 biz-item2-landing → email-deliverability 리네이밍(사용자 지시, Claude in Chrome으로 수행).
> ⚠️ 하이픈 서브도메인 email-deliverability.vercel.app은 **제3자 프로젝트가 선점**해서 우리에게 안 붙음 —
> 실제 새 URL은 **emaildeliverability.vercel.app**(하이픈 없음, Domains에 수동 추가). 구 URL도 계속 서빙됨.
> API CORS는 신·구 origin 둘 다 허용(SendGuard-AI 208dfa1 + 93f5c20). GitHub 리포 이름은 그대로 biz-item2-landing.
> 프로젝트: **Email Deliverability 랜딩페이지** (실제 무료 티어 셀프서브 가입 — 더 이상 fake-door 아님)
> 배포: https://emaildeliverability.vercel.app/ (main push 시 Vercel 자동 배포; 구 URL biz-item2-landing.vercel.app도 유효)
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
