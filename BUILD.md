# BUILD.md — SendGuard AI 랜딩 빌드 플랜 & 진행 로그

> 이 파일이 계획의 SSOT. 구현과의 차이는 GAP_REPORT.md 참고.
> 최종 업데이트: 2026-07-12 (T14 부분 진행 세션)
> ⚠️ T14(노션 BUILD.md 기준) 재개 시도 — **sendguard-ai 쪽 코드 준비 완료, 랜딩 CTA 교체는 Stripe Payment Link URL 확보 대기.**
> Resend 키는 "설정됨"으로 알려졌으나 `sendguard-ai/.env.local` 실측 결과 **빈 값** — 키 입력이 선행 조건.

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
| 2026-07-12 | T14 부분 진행: sendguard-ai에 이메일 테스트 하네스 + `/checkout/success` 페이지 + EMAIL_FROM 폴백 수정 (sendguard-ai 커밋 155f9b9). Resend 키 미입력 확인 → 실발송·CTA 교체 대기. launch.json에 `sendguard-api-dev` 추가 | (이 커밋) |
