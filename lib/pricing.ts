// /pricing · /upgrade 페이지 데이터 — 티어 카드 · 기능 비교표 · FAQ를 한 곳에서 관리.
// MVP 가격 모델:
//   Free $0 / **50 checks·일**(2026-07-27 MVP 홍보용으로 25/월 → 50/일 상향)
//   Pro $19/월 / 3,000 checks + 초과 $5/1,000  ·  Enterprise Custom / 50,000+
// 결제 플랫폼은 **Paddle Billing v2**(2026-07-18 백엔드 전환). 결제 UI 전체는
// PAYMENTS_ENABLED=false로 숨겨져 있어 지금은 렌더되지 않는다.
// ⚠️ Free 일일 쿼터는 백엔드의 FREE_DAILY_LIMIT(lib/usage/quota.ts)과 반드시 일치시킬 것.
// ⚠️ Pro 초과 종량·80% 사용량 알림은 백엔드 미구현 — 결제 UI 되살리기 전 확인 필요.

export type Cell = boolean | string; // true → Yes, false → "—", 문자열은 그대로 표시

export interface Tier {
  id: "free" | "pro" | "enterprise";
  name: string;
  blurb: string;
  price: string;
  priceNote?: string; // 가격 옆 작은 표기 (예: "/ month")
  cta: { label: string; href: string };
  badge?: "Recommended"; // 'Most popular' 금지 — Recommended만 허용
  highlights: string[];
}

export interface FeatureRow {
  label: string;
  values: [Cell, Cell, Cell]; // Free / Pro / Enterprise 순
}

export interface FeatureGroup {
  title: string;
  rows: FeatureRow[];
}

export interface Faq {
  q: string;
  a: string;
}

// 연간 요금제 미운영 — true로 바꾸고 연간 가격을 채우기 전까지 BillingToggle 미렌더.
export const ANNUAL_BILLING_OFFERED = false;

// 결제(Stripe) 미연동 — 결제 관련 UI 전체를 한시적으로 감춘다.
// true로 바꾸면 /pricing·/upgrade 라우트와 Nav·Footer의 Pricing 링크,
// 홈 FAQ의 Pro 가격 문장이 한 번에 되살아난다 (middleware.ts 참고).
export const PAYMENTS_ENABLED = false;

// Paddle 체크아웃 URL을 Vercel env에 등록하면 /upgrade 체크아웃이 활성화된다.
// (PAYMENTS_ENABLED가 false인 동안엔 /upgrade 자체가 홈으로 리다이렉트되므로 무효)
export const PRO_PAYMENT_LINK = process.env.NEXT_PUBLIC_PRO_PAYMENT_LINK ?? "";

export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    blurb: "For trying the product and testing.",
    price: "$0",
    cta: { label: "Get Started", href: "#waitlist" },
    highlights: [
      "50 checks / day",
      "Full API access — every feature included",
      "Instant API key, no credit card",
      "Standard rate limit",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For indie developers and small SaaS.",
    price: "$19",
    priceNote: "/ month",
    cta: { label: "Upgrade", href: "/upgrade" },
    badge: "Recommended",
    highlights: [
      "3,000 checks / month",
      "Overage: $5 per 1,000 extra checks",
      "Higher rate limit",
      "Email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For mid-size and large SaaS platforms.",
    price: "Custom",
    // 전용 세일즈 이메일 확정 시 `mailto:`로 교체 — 그 전까지는 폼으로 폴백.
    cta: { label: "Contact Sales", href: "#waitlist" },
    highlights: [
      "50,000+ checks / month",
      "Custom rate limit",
      "SLA",
      "Priority support",
      "Custom contract",
    ],
  },
];

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Core",
    rows: [
      { label: "POST /api/check API access", values: [true, true, true] },
      { label: "Domain reputation score", values: [true, true, true] },
      { label: "Spam risk score", values: [true, true, true] },
      { label: "Recommended safe sending volume", values: [true, true, true] },
      { label: "Deterministic scoring (no LLM)", values: [true, true, true] },
      { label: "DNS / blocklist (DNSBL) checks", values: [true, true, true] },
    ],
  },
  {
    title: "Limits",
    rows: [
      {
        label: "API checks",
        values: ["50 / day", "3,000 / month", "50,000+ / month"],
      },
      {
        label: "Overage billing",
        values: [false, "$5 / 1,000 checks", "Custom"],
      },
      { label: "Rate limit", values: ["Standard", "Higher", "Custom"] },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Email support", values: [false, true, true] },
      { label: "Priority support", values: [false, false, true] },
      { label: "SLA", values: [false, false, true] },
      { label: "Custom contract", values: [false, false, true] },
    ],
  },
];

export const FAQS: Faq[] = [
  {
    q: "What does the API actually check?",
    a: "It returns a domain reputation score, a spam-risk score, and a recommended safe sending volume, using deterministic DNS and blocklist (DNSBL) checks. No LLM, no dashboard.",
  },
  {
    q: "Do I need to switch email providers to use it?",
    a: "No. It's a check layer you call before sending, alongside your existing setup.",
  },
  {
    q: "Is there a dashboard?",
    a: "No — it's API-only by design. You get a JSON response to log or act on.",
  },
  {
    q: 'How is a "check" counted?',
    a: "One POST /api/check call = one check.",
  },
  {
    q: "What happens when I hit my limit?",
    a: "On Free, checks pause until your daily limit resets at midnight UTC — the response is a 429 with a Retry-After header. On Pro, usage beyond 3,000 checks a month is billed automatically at $5 per 1,000 checks, so the API never cuts you off mid-send.",
  },
  {
    q: "Can I use it across multiple tenants/customers?",
    a: "Yes. One API key can check any domain — each tenant domain is scored independently, and every call counts toward your quota.",
  },
  {
    q: "When can I start?",
    a: "Right now. The Free plan issues an API key instantly — no credit card required.",
  },
  // Refunds / trial: 실제 정책이 생기기 전까지 항목 자체를 넣지 않는다.
];
