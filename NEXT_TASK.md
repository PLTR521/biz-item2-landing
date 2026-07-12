# NEXT_TASK.md

> 다음 세션 시작용. 작성일: 2026-07-12 (T14 부분 진행 세션 종료 시점)
> ⚠️ **T14 현황:** sendguard-ai 쪽 코드 준비 완료 — ① 이메일 발송 경로(`lib/billing/email.ts`,
> `process.env.RESEND_API_KEY` 사용) ② 테스트 하네스(`npx tsx scripts/send-test-email.ts <이메일>`)
> ③ success_url 페이지(`/checkout/success`). **단, `sendguard-ai/.env.local`은 실측 결과 전부 빈 값**
> (Resend 키 미입력). 랜딩 CTA 교체는 Resend 키 + Stripe Payment Link URL 확보 후 진행.

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

## T14 재개 프롬프트 (Resend 키 입력 후)

```
sendguard-ai/.env.local에 RESEND_API_KEY를 입력하고 저장했어.
1. npx tsx scripts/send-test-email.ts <내 이메일>로 실발송 검증해줘.
2. (Stripe Payment Link URL도 준비된 경우) 랜딩 CTA를 Payment Link로 교체하고
   fake-door 카피를 실제 제품 존재에 맞게 재검토해줘.
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
