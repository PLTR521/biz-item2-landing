# Email Deliverability — Landing Page

> **The pre-send check API for multi-tenant SaaS** — 수요검증용 랜딩페이지 (구명: SendGuard AI)
> 배포: https://emaildeliverability.vercel.app/ (main push 시 Vercel 자동 배포; 구 URL biz-item2-landing.vercel.app도 유효)

발송 전 도메인 평판 체크 API라는 가설을 검증하는 랜딩입니다. "Get an API key" CTA는 실제
셀프서브 가입(`POST /api/signup`, 별도 리포 sendguard-ai)으로 연결되어 무료 티어 키를 즉시 발급합니다
(2026-07-13부터 fake-door 아님). 2026-07-17 SendGuard 이름 충돌(sendguard.io/.ai 제3자 소유) 회피를 위해
제품명·URL을 Email Deliverability로 변경.

## 스택

- **Next.js 14.2.5** (App Router) + TypeScript
- **Tailwind CSS 3.4** — 라이트 테마 + 다크 코드카드 (Resend/Evil Martians devtool 스타일)
- **폰트:** Inter (본문) + JetBrains Mono (코드)
- **가입:** `components/WaitlistForm.tsx` → API 리포의 `POST /api/signup` (실제 키 발급, Formspree 아님)
- **테스트:** vitest 4 + @testing-library/react

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (타입체크 포함) |
| `npm start` | 프로덕션 서버 |
| `npm test` | vitest 테스트 1회 실행 (11개) |
| `npm run test:watch` | vitest watch 모드 |

## 프로젝트 구조

```
app/
  layout.tsx        # 폰트(Inter, JetBrains Mono) + 메타데이터
  page.tsx          # 섹션 조립 (아래 순서)
  globals.css       # 라이트 테마 CSS 변수 팔레트
components/
  Nav.tsx           # 고정 헤더 + CTA
  Hero.tsx          # 헤드라인 + 이중 CTA + curl/JSON 코드카드
  Compare.tsx       # ESP 앞단 포지셔닝 (파이프라인 다이어그램)
  UseCases.tsx      # AI 에이전트 / 멀티테넌트 / 자동화 3케이스
  HowItWorks.tsx    # 3스텝 (실제로 조회하는 시그널만 적을 것)
  Example.tsx       # 응답 예시 + /health + 127.0.0.2 실응답 증거 (#example)
  FAQ.tsx           # 5문답
  FinalCTA.tsx      # edge-to-edge 다크 CTA (#waitlist)
  WaitlistForm.tsx  # 가입 폼 → POST /api/signup (variant: light/dark)
  CodeCard.tsx      # 공용 다크 코드카드 + 하이라이팅 토큰
  Footer.tsx
  pricing/          # /pricing·/upgrade 전용 (PAYMENTS_ENABLED=false면 미노출)
lib/pricing.ts      # 가격·플래그 (PAYMENTS_ENABLED)
middleware.ts       # 결제 숨김 시 /pricing·/upgrade → 홈 307
__tests__/          # 페이지 스모크 + WaitlistForm 테스트 (11개)
```

## 프로젝트 문서

| 문서 | 내용 |
|------|------|
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | 완료 TASK, 구현 상태, 알려진 이슈, 다음 작업 |
| [BUILD.md](BUILD.md) | Phase별 빌드 플랜(SSOT) + 진행 로그 |
| [NEXT_TASK.md](NEXT_TASK.md) | 다음 세션 첫 프롬프트 + 주의사항 |
| [GAP_REPORT.md](GAP_REPORT.md) | 계획 vs 구현 차이 |

## 카피 규칙 (중요)

- **과장 금지:** 허위 후기/고객 수/파트너십/"파일럿 중" 문구 금지
- **제품이 실제로 하는 일만 적는다.** 2026-07-31에 "recent reputation history"를 삭제했다 —
  이 API는 평판 이력을 저장하지도 조회하지도 않고, 요청 시점의 라이브 DNS만 본다.
  기능을 추가하기 전에 카피부터 추가하지 말 것.
- **`Example.tsx`의 `127.0.0.2` 블록은 실제 프로덕션 응답이다.** 판정값
  (reputation/spamRisk/safeToSendToday/severity)을 손으로 고치면 증거가 아니라 광고가 된다.
  숫자를 바꿔야 할 일이 생기면 프로덕션에 다시 호출해서 받아온 값으로 교체할 것.
- 시드 섞인 대기자 카운터 재도입 금지
- 가격·쿼터 수치의 단일 소스는 **API 리포의 `lib/usage/quota.ts`** — 랜딩 표기가 그 값과
  달라지면 랜딩이 틀린 것이다 (현재: free 50/일, pro 3,000/월 + 1,000회당 $5)
