# SendGuard AI — Landing Page

> **Deliverability API for AI agents** — 수요검증용 fake-door 랜딩페이지
> 배포: https://biz-item2-landing.vercel.app/ (main push 시 Vercel 자동 배포)

AI 에이전트 발신자를 위한 이메일 딜리버러빌리티 API라는 가설을 검증하는 waitlist 랜딩입니다.
실제 API/제품은 아직 없으며, "Get an API key" CTA는 이메일 waitlist 폼으로 연결됩니다 (fake-door 테스트).

## 스택

- **Next.js 14.2.5** (App Router) + TypeScript
- **Tailwind CSS 3.4** — 라이트 테마 + 다크 코드카드 (Resend/Evil Martians devtool 스타일)
- **폰트:** Inter (본문) + JetBrains Mono (코드)
- **이메일 수집:** Formspree (`components/WaitlistForm.tsx`)
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
| `npm test` | vitest 테스트 1회 실행 (9개) |
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
  WhyWarmup.tsx     # 문제 정의 단락 + 포지셔닝 라인
  Features.tsx      # Chess 레이아웃 3개 (reputation/volume/per-tenant)
  HowItWorks.tsx    # 3스텝
  BuiltFor.tsx      # 프레임워크 텍스트 목록
  Example.tsx       # 주석 달린 응답 예시 (#example)
  FinalCTA.tsx      # edge-to-edge 다크 CTA (#waitlist)
  WaitlistForm.tsx  # Formspree 폼 (variant: light/dark)
  CodeCard.tsx      # 공용 다크 코드카드 + 하이라이팅 토큰
__tests__/          # 페이지 스모크 + WaitlistForm 테스트
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
- fake-door 카피("private beta", "Get an API key")는 승인된 범위 내에서만 사용
- 시드 섞인 대기자 카운터 재도입 금지
- Formspree endpoint(`f/mzdqnklk`) 변경 금지 (기존 신청자 데이터 연속성)
