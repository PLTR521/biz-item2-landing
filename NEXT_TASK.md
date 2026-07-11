# NEXT_TASK.md

> 다음 세션 시작용. 작성일: 2026-07-12

---

## 다음 세션 첫 프롬프트 (그대로 붙여넣기)

```
PROJECT_STATUS.md와 NEXT_TASK.md를 읽고 이어서 작업해.

오늘 목표:
1. https://biz-item2-landing.vercel.app/ 프로덕션 배포가 리디자인(커밋 aeca598)대로
   잘 나오는지 브라우저로 확인해줘 (데스크톱 + 모바일 뷰포트).
2. Vercel Analytics를 붙여서 방문 수를 측정할 수 있게 해줘.
3. "Get an API key" CTA 클릭과 waitlist 폼 제출을 이벤트로 추적해서
   fake-door 전환율(방문 → CTA 클릭 → 이메일 제출)을 잴 수 있게 해줘.
4. favicon과 OG 이미지를 추가해줘 (SNS/커뮤니티 공유 대비).

완료되면 커밋+push까지 알아서 해줘.
```

## 다음 작업 목표

**핵심: 랜딩은 완성됐고, 이제 "측정 가능 상태"로 만든 뒤 트래픽을 붓는다.**

- 측정 인프라(analytics + 이벤트) 없이는 fake-door 테스트가 무의미 — 유입 시작 전 필수
- 그 다음 단계가 Reddit/X/Discord 유입 (전용 스킬: reddit-marketing-expert, x-growth-expert, discord-community-expert) + ICP 인터뷰 20명 모집 → Go/No-Go

## 주의사항

1. **과장 금지 규칙 유지** — 허위 후기/고객 수/파트너십/"파일럿 중" 문구 금지. 현재 fake-door 카피("Get an API key", "private beta")는 사용자 명시 승인 범위. 이 이상으로 단정 수위를 올리지 말 것.
2. **Formspree endpoint 유지** — `https://formspree.io/f/mzdqnklk` 변경 금지 (기존 신청자 데이터와 연속성).
3. **허위 카운터 재도입 금지** — `app/api/waitlist/route.ts`(시드 섞인 대기자 수)는 화면에 다시 연결하지 말 것.
4. **자율 push 승인 있음** — 완결 단위마다 커밋+push 알아서 진행 (biz-item2-landing 한정).
5. **dev 서버는 launch.json으로** — `.claude/launch.json`의 `decision-ai-dev` (이름만 옛것, 동작 정상). Bash로 직접 `next dev` 돌리지 말 것.
6. Browser pane 스크린샷이 타임아웃될 수 있음(전 세션에서 발생) — 그 경우 read_page/computed CSS로 대체 검증.
