# NEXT_TASK.md

> 다음 세션 시작용. 작성일: 2026-07-12 (sendguard-ai T15 Vercel 배포 완료 시점)
> ✅ **T14 현황(2026-07-12):** 이메일 레그 실발송 검증 완료 — `npx tsx scripts/send-test-email.ts` 성공(exit 0).
> success_url 페이지(`/checkout/success`)도 완료. **랜딩 CTA 교체만 남음 — Stripe Payment Link URL 대기.**
> ⚠️ Resend 테스트 모드: 도메인 인증 전엔 계정 소유자 이메일로만 발송 가능(타 수신자 403 실측).
> 실제 고객 키 발송 전 resend.com/domains 도메인 인증 + `EMAIL_FROM` 교체 필수.
> ✅ **T15 현황(2026-07-12):** sendguard-ai API가 https://send-guard-ai.vercel.app 에 배포됨.
> 프로덕션에서 `/api/check` 401/401, `/api/stripe/webhook` 503, 미존재 라우트 404 — 로컬과 동일 실측.
> ⚠️ 남은 것: Vercel에 Supabase/Stripe/Resend 환경변수 등록(사용자가 직접, 대시보드에서) → 그래야 200 경로 + Spamhaus 실측(`127.0.0.2`) 가능.

---

## 다음 세션 첫 프롬프트 (그대로 붙여넣기)

```
PROJECT_STATUS.md와 NEXT_TASK.md를 읽고 이어서 작업해.

오늘 목표 (외부 서비스 계정 불필요한 작업만):
1. https://biz-item2-landing.vercel.app/ 프로덕션 배포가 최신 커밋대로
   잘 나오는지 브라우저로 확인해줘 (데스크톱 + 모바일 뷰포트).
2. favicon과 OG 이미지를 추가해줘 (정적 파일, SNS/커뮤니티 공유 대비).
3. npm test로 테스트가 여전히 통과하는지 확인하고 커밋+push까지 알아서 해줘.
```

## 외부 계정 이슈 해제 후 프롬프트 (보류분 재개용)

```
외부 서비스 계정 문제가 해결됐어. PROJECT_STATUS.md의 보류 작업을 재개해.
1. Vercel Analytics를 붙여서 방문 수를 측정할 수 있게 해줘.
2. "Get an API key" CTA 클릭과 waitlist 폼 제출을 이벤트로 추적해서
   fake-door 전환율(방문 → CTA 클릭 → 이메일 제출)을 잴 수 있게 해줘.
```

## T14 재개 프롬프트 (Stripe Payment Link 준비 후)

```
Stripe Payment Link를 만들었어: <URL 붙여넣기>
1. 랜딩 CTA("Get an API key")를 이 Payment Link로 교체해줘.
2. fake-door 카피("private beta" 등)를 실제 제품 존재에 맞게 재검토해줘 (과장금지 규칙).
3. 테스트 + 빌드 통과 확인 후 커밋+push까지 알아서 해줘.
```

## 다음 작업 목표

**핵심: 계정 없이 가능한 마무리(육안 확인, favicon/OG)를 끝내고, 계정 이슈가 풀리는 즉시 측정 인프라 → 트래픽 유입 순서로 간다.**

- 측정 인프라(analytics + 이벤트) 없이 유입을 시작하면 fake-door 테스트가 무의미 — **유입은 반드시 측정 이후**
- 유입 채널: Reddit / X / Discord (전용 스킬: reddit-marketing-expert, x-growth-expert, discord-community-expert) + ICP 인터뷰 20명 → Go/No-Go

## 주의사항

1. **과장 금지 규칙 유지** — 허위 후기/고객 수/파트너십/"파일럿 중" 문구 금지. 현재 fake-door 카피("Get an API key", "private beta")는 사용자 명시 승인 범위. 이 이상으로 단정 수위를 올리지 말 것.
2. **Formspree endpoint 유지** — `https://formspree.io/f/mzdqnklk` 변경 금지 (기존 신청자 데이터와 연속성).
3. **허위 카운터 재도입 금지** — 시드 섞인 대기자 카운터(구 `app/api/waitlist/route.ts`, e34c3dc에서 삭제됨)를 부활시키지 말 것.
4. **자율 push 승인 있음** — 완결 단위마다 커밋+push 알아서 진행 (biz-item2-landing 한정).
5. **dev 서버는 launch.json으로** — 서버명 **`sendguard-dev`** (e34c3dc에서 개명됨). Bash로 직접 `next dev` 돌리지 말 것.
6. **테스트 먼저** — 코드 수정 후 `npm test` (vitest 9개) + `npm run build` 통과 확인 후 커밋.
7. Browser pane 스크린샷이 타임아웃될 수 있음 — 그 경우 read_page/computed CSS로 대체 검증.
