# BUILD.md — Email Deliverability 랜딩 빌드 플랜 & 진행 로그

> 이 파일이 계획의 SSOT. 구현과의 차이는 GAP_REPORT.md 참고.
> 최종 업데이트: 2026-07-31 (실사용 후기 반영 — 카피 정직성 정리)
> **불변 규칙(2026-07-31 추가): 카피는 제품보다 앞서지 않는다.** 새 문장을 쓸 때 그 문장을
> 뒷받침하는 코드가 어디 있는지 말할 수 없으면 쓰지 않는다. `Example.tsx`의 `127.0.0.2`
> 블록은 프로덕션 실응답이므로 판정값을 손으로 고치지 말 것 (고치면 증거가 아니라 광고).
> ✅ CTA는 fake-door가 아니다: "Get an API key" → API 리포 `POST /api/signup` → 실제 무료 키 즉시 발급.
> ✅ API 배포: https://email-deliverability-app.vercel.app (GitHub `PLTR521/email-deliverability` 연동,
> Spamhaus DQS 실측 완료). **2026-08-04: 구 호스트 `send-guard-ai.vercel.app`에서 이 주소로 교체.**
> 랜딩의 코드 예제·Footer 링크·`WaitlistForm`의 `API_BASE` 폴백까지 전부 새 주소를 가리킨다
> (`/health` 실호출로 `{"status":"ok","service":"email-deliverability"}` 확인 후 교체).
> ⚠️ 결제 UI는 `PAYMENTS_ENABLED=false`로 전체 숨김 상태(2026-07-27, Paddle 미연동). 플래그 한 줄로 복구.
> ⚠️ Resend 도메인 인증 전까지 가입 메일은 계정 소유자 주소로만 발송됨(`emailed: false`) —
> 2026-07-31부터 키를 잃어도 `/login`에서 재발급 가능하므로 하드 블로커는 아니다.

---

## Phase 0 — Decision AI 랜딩 (피벗 전, 종료)

- [x] Decision AI 랜딩 제작 + Formspree waitlist (커밋 e2a0088)
- [x] Upstash Redis 공유 대기자 카운터 (커밋 e760bf5) — *이후 e34c3dc에서 완전 삭제*
- [x] ~~Decision AI 수요검증~~ → **피벗 결정, 종료**

## Phase 1 — SendGuard AI 피벗 (완료)

- [x] 콘텐츠 전면 교체: Decision AI → SendGuard AI (커밋 f0bf748)
- [x] 허위 카운터 화면 제거 (과장금지 규칙)
- [x] 검증된 사실(KnownFacts) / 가설(Hypothesis) 카피 분리

## Phase 1.5 — 라이트 테마 devtool 리디자인 (완료, 커밋 aeca598)

계획 원문: 2026-07-12 세션 첫 프롬프트의 리디자인 계획서 (Evil Martians/Resend 기반)

- [x] Eyebrow 추가 ("Currently in private beta")
- [x] 히어로 헤드라인 교체 → "Deliverability API for AI agents"
- [x] 서브헤드라인 교체 → "Check any domain's reputation... one API call... bursty, event-driven"
- [x] CTA 교체 → Primary "Get an API key" / Secondary "View example response" (docs 부재 fallback)
- [x] 히어로 비주얼 → curl + JSON 응답 다크 코드카드 (JetBrains Mono, 문법 하이라이팅)
- [x] "Sound familiar?" 삭제 → "Why warmup tools don't work for agent-sent email" 단락
- [x] "Why now" 삭제 → 한 줄 포지셔닝 라인으로 대체 (WhyWarmup 내 인용 스타일)
- [x] "Our hypothesis" 섹션 삭제
- [x] StatCallout / KnownFacts / Problem / WhyNow / Hypothesis / Preview 컴포넌트 삭제
- [x] Feature 섹션 Chess 레이아웃 3개 (reputation / safe volume / per-tenant)
- [x] "What we know about spam filters" 축약 → "How it works" 3스텝
- [x] 로고 섹션 → 텍스트 ("Built for teams shipping with · LangChain · CrewAI · Vercel AI SDK · n8n · OpenAI Agents SDK")
- [x] 코드 예시 섹션 스타일 통일 (공용 CodeCard)
- [x] 최종 CTA edge-to-edge 다크 블록 ("Start checking domains today.")
- [x] 스타일 가이드 적용: 라이트 테마, 블루 #2563eb, Inter + JetBrains Mono
- [x] 폰트/색상 검증 (computed CSS)
- [x] 모바일 반응형 (375px: 페이지 가로 오버플로 0, 코드블록 내부 스크롤)
- [x] 프로덕션 빌드 통과 + 커밋 + push

## Phase 1.6 — 리팩토링 + 테스트 (완료, 커밋 e34c3dc)

- [x] 미사용 `app/api/waitlist/route.ts`(시드 카운터) 삭제 + `@upstash/redis` 의존성 제거
- [x] 잔재 네이밍 정리: package `decision-ai-landing`→`sendguard-landing`, launch `decision-ai-dev`→`sendguard-dev`
- [x] 테스트 인프라: vitest 4 + @testing-library/react + jsdom (`npm test`)
- [x] 페이지 스모크 테스트 5개 (헤드라인/섹션/CTA 앵커/폼/프레임워크 목록)
- [x] WaitlistForm 테스트 4개 (성공 POST/서버 에러/네트워크 에러/buttonLabel)
- [x] 전체 통과: 테스트 9/9 + 프로덕션 빌드 + dev 서버 콘솔 에러 0
- [x] README.md 신규 + 문서 4종 최신화

## Phase 2 — 측정 인프라 (⏸️ **보류** — 외부 서비스 계정 생성 불가)

- [ ] 프로덕션 배포 육안 확인 (데스크톱/모바일) — *계정 불필요, 진행 가능*
- [ ] favicon + OG 이미지 — *계정 불필요, 진행 가능*
- [ ] ⏸️ Vercel Analytics 추가 — *외부 계정 필요, 보류*
- [ ] ⏸️ CTA 클릭 + 폼 제출 이벤트 추적 (fake-door 전환율) — *보류*

## Phase 2.5 — 카피 정직성 (완료, 2026-07-31)

2026-07-30 실사용 후기(API 리포 `SESSION_LOG_2026-07-30.md`)가 지적한 것들.
계획서에 없던 Phase — "구현 대비 계획"만 보고 "카피 대비 제품"은 아무도 안 보고 있었다.

- [x] "recent reputation history" 삭제 (`FAQ.tsx`, `HowItWorks.tsx`) — 하지 않는 일을 적고 있었음
- [x] 실제 시그널로 교체: DNSBL 3종(Spamhaus ZEN·Barracuda·SpamCop) + SPF/DKIM/DMARC, 라이브 조회
- [x] `127.0.0.2` **프로덕션 실응답**을 Example 섹션에 증거로 게시 (판정값 무수정)
- [x] 키 분실 시 복구 경로(`/login` → 재발급) 안내 — 키 표시 화면과 중복가입 에러 메시지 양쪽
- [x] `.claude/launch.json`의 죽은 API dev 경로 수정 (조용히 랜딩을 대신 띄우고 있었음)
- [x] 검증: tsc / vitest 11개 / build / 브라우저(문구 0건·증거 렌더·콘솔 0·모바일 스크롤 없음)

## Phase 3 — 수요검증 운영 (미착수, Phase 2 완료가 선행 조건)

- [ ] Reddit / X / Discord 유입 시작 (전용 스킬 활용) — **측정 인프라 없이 시작 금지**
- [ ] ICP 인터뷰 20명 모집
- [ ] 전환율 + 인터뷰 결과 → **Go/No-Go 결정**

---

## 진행 로그

| 날짜 | 내용 | 커밋 |
|------|------|------|
| (초기) | Decision AI 랜딩 초기 커밋 | e2a0088 |
| (초기) | Decision Memory 제거 (MVP 스코프 축소) | c0bbc5c |
| (초기) | Upstash 공유 대기자 카운터 | e760bf5 |
| 2026-07-01 | SendGuard AI로 피벗, 콘텐츠 교체 | f0bf748 |
| 2026-07-11 | 라이트 테마 devtool 스타일 전면 리디자인 | aeca598 |
| 2026-07-12 | 종료 문서 작성 (STATUS / NEXT_TASK / BUILD / GAP_REPORT) | 61423cf |
| 2026-07-12 | 리팩토링(카운터 API 삭제, 네이밍) + 테스트 9개 추가 | e34c3dc |
| 2026-07-12 | README 신규 + 문서 최신화, T14 이후 보류 반영 | fab6ae6 |
| 2026-07-12 | T14 부분 진행: sendguard-ai에 이메일 테스트 하네스 + `/checkout/success` 페이지 + EMAIL_FROM 폴백 수정 (sendguard-ai 커밋 155f9b9). Resend 키 미입력 확인 → 실발송·CTA 교체 대기. launch.json에 `sendguard-api-dev` 추가 | 1b4a29f |
| 2026-07-12 | T14 이메일 레그 검증 완료: Resend 키 입력 → 실발송 성공(exit 0, sendguard-ai 커밋 01ca06d). 테스트 모드 제약(도메인 인증 전 계정 소유자 주소만) 기록 | 06b2504 |
| 2026-07-12 | sendguard-ai T15: GitHub(`PLTR521/SendGuard-AI`) 연결 + Vercel 배포(당시 호스트 send-guard-ai.vercel.app → 현 email-deliverability-app.vercel.app), 프로덕션 401/503/404 실측 통과 (sendguard-ai 커밋 37bcc32) | 3fe5078 |
| 2026-07-13 | sendguard-ai T15 프로덕션 검증 완료: 200 경로 + Barracuda/SpamCop 리스팅 검출 + checks 로깅. Spamhaus는 정책 차단 확정 → DQS 키 필요 (sendguard-ai 커밋 89cab14) | (이 커밋) |
| 2026-07-16 | 포지셔닝 리팩토링(멀티테넌트 SaaS 안전장치 프레이밍) + UI 리디자인("AI 티" 제거: 잉크 버튼·블루프린트 그리드·파이프라인 다이어그램·FAQ·푸터) | 71dc934, d5aefa5 |
| 2026-07-17 | ⚠️ **도메인 사실 확정(RDAP 실측): sendguard.io(2025-08-29 등록)·sendguard.ai(2026-04-30 등록) 모두 제3자 소유.** 랜딩 예제 전체가 남의 서버(api.sendguard.ai)를 가리키던 버그 발견. 사용자 결정: 도메인 때문에 출시를 미루지 않는다 — 검증 먼저, 리브랜딩·도메인 구매는 지불의향 확인 후 | — |
| 2026-07-17 | 위 버그 수정: sendguard-ai에 공개 `/health` 신설(sendguard-ai 커밋 e04fec1) + 랜딩 예제 전부 실제 배포 주소·실제 응답 스키마로 교체(`POST /api/check`, `spamRisk`, `safeToSendToday`, `recommendedVolume`, `signals[]`) + 모바일 min-w-0 레이아웃 수정. 프로덕션 실측: `/health` 200, 옛 문자열 0건, 가입→키 발급→check 200 E2E 재통과, `127.0.0.2` → bad/high/0 (Spamhaus DQS+Barracuda+SpamCop 검출) | 0b542c0 |
| 2026-07-17 | **리브랜딩: 제품명·URL을 Email Deliverability로 변경**(사용자 지시). Vercel 프로젝트 biz-item2-landing → email-deliverability 리네이밍(Claude in Chrome). ⚠️ **하이픈 서브도메인 email-deliverability.vercel.app은 제3자 프로젝트가 선점**("Deliverability Help" 사이트) → 도메인으로 **emaildeliverability.vercel.app**(하이픈 없음)을 프로젝트에 추가해 새 프로덕션 URL로 사용, 구 URL(biz-item2-landing.vercel.app)도 계속 서빙. 랜딩 표기 전면 교체(타이틀/OG/Nav/Footer/파이프라인/FAQ). API CORS를 신·구 origin allowlist로 확장(SendGuard-AI 커밋 208dfa1 + 하이픈 origin 제거 93f5c20, `LANDING_ORIGIN` env 콤마 구분 지원). GitHub 리포명은 유지 | 9b86a4e |
| 2026-07-18 | `/pricing` 신설(4티어 → 3티어 정리) + `/upgrade` 페이지, 실제 3티어 가격 반영 | 62e0dd7, f3f984f |
| 2026-07-27 | 결제 미연동 상태를 숨김: `lib/pricing.ts`의 `PAYMENTS_ENABLED=false` 한 줄 + `middleware.ts`가 `/pricing`·`/upgrade` → 홈 307. 페이지 파일은 보존(복구는 플래그 true). 무료 티어 표기 25/월 → **50/일**, 결제 플랫폼 Paddle 확정, SendGuard 잔재 네이밍 제거 | 3269243, 0d8cefa |
| 2026-07-30 | (API 리포) 실제 방문자 시점 검증에서 **이 랜딩의 가입 폼이 CORS로 몇 주간 죽어 있던 것** 발견 — `emaildeliverabilityapi.vercel.app` origin이 API 허용 목록에 없었음. 화면엔 "Network error"만, 서버 로그엔 흔적 없음 (SendGuard-AI 커밋 9f62232로 해결) | — |
| 2026-07-31 | **Phase 2.5 카피 정직성:** "recent reputation history" 삭제(하지 않는 일이었음), `127.0.0.2` 프로덕션 실응답을 증거로 게시(판정값 무수정), 키 분실 복구 경로(`/login` 재발급) 안내 추가, launch.json 죽은 API dev 경로 수정. API 리포에는 같은 날 잔량 헤더·키 재발급 라우트·스키마 검증 스크립트가 들어감 | (이 커밋) |
