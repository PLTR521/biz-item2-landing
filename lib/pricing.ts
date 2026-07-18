// /pricing · /upgrade 페이지 데이터 — 티어 카드 · 기능 비교표 · FAQ를 한 곳에서 관리.
// 2026-07-18 확정된 MVP 가격 모델(사용자 결정):
//   Free $0 / 25 checks·월  ·  Pro $19/월 / 3,000 checks + 초과 $5/1,000  ·  Enterprise Custom / 50,000+
// 결제는 Stripe Payment Link(sendguard-ai T14 설계) — 링크 생성 후
// NEXT_PUBLIC_PRO_PAYMENT_LINK 환경변수에 넣으면 /upgrade의 체크아웃 버튼이 활성화된다.
// ⚠️ 백엔드(sendguard-ai)는 아직 free 100/day를 적용 중 — 25/월 쿼터·80% 알림·초과 과금은 백엔드 반영 필요.

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

// Stripe Payment Link 생성 후 Vercel env에 등록하면 /upgrade 체크아웃이 활성화된다.
export const PRO_PAYMENT_LINK = process.env.NEXT_PUBLIC_PRO_PAYMENT_LINK ?? "";

export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    blurb: "For trying the product and testing.",
    price: "$0",
    cta: { label: "Get Started", href: "#waitlist" },
    highlights: [
      "25 checks / month",
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
      { label: "API checks / month", values: ["25", "3,000", "50,000+"] },
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
    q: "What happens when I hit my monthly limit?",
    a: "We email you a heads-up at 80% of your quota. On Pro, usage beyond 3,000 checks is billed automatically at $5 per 1,000 checks, so the API never cuts you off mid-send. On Free, checks pause until you upgrade.",
  },
  {
    q: "Can I use it across multiple tenants/customers?",
    a: "Yes. One API key can check any domain — each tenant domain is scored independently, and every call counts toward your monthly quota.",
  },
  {
    q: "When can I start?",
    a: "Right now. The Free plan issues an API key instantly — no credit card required.",
  },
  // Refunds / trial: 실제 정책이 생기기 전까지 항목 자체를 넣지 않는다.
];
