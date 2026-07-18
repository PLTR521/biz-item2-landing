// /pricing 페이지 데이터 — 티어 카드 · 기능 비교표 · FAQ를 한 곳에서 관리.
// 원칙(노션 "랜딩·가격 페이지 구조 개편 계획"):
//   - 실재하는 사실만 쓴다. 미확정 가격·쿼터는 '{{...}}' 플레이스홀더 문자열로 두고
//     UI에 그대로 노출한다(미완성 가시화). 실값 확정 시 이 파일만 고치면 된다.
//   - 확정된 사실: 무료 티어는 가동 중 — 즉시 키 발급, 100 checks/day, 카드 불필요.

export type Cell = boolean | string; // true → Yes, false → "—", 문자열은 그대로 표시

export interface Tier {
  id: "hobby" | "startup" | "scale" | "enterprise";
  name: string;
  blurb: string;
  price: string; // '{{STARTUP_PRICE}}' 등 플레이스홀더는 실값 주입 전까지 그대로 노출
  cta: { label: string; href: string };
  badge?: "Recommended"; // 'Most popular' 금지 — Recommended만 허용
  highlights: string[];
}

export interface FeatureRow {
  label: string;
  values: [Cell, Cell, Cell, Cell]; // Hobby / Startup / Scale / Enterprise 순
}

export interface FeatureGroup {
  title: string;
  rows: FeatureRow[];
}

export interface Faq {
  q: string;
  a: string;
}

// 연간 요금제 운영 여부 미정 — true로 바꾸고 연간 가격을 채우기 전까지
// BillingToggle은 어디에도 렌더되지 않는다.
export const ANNUAL_BILLING_OFFERED = false;

export const TIERS: Tier[] = [
  {
    id: "hobby",
    name: "Hobby",
    blurb: "For side projects and testing a single agent.",
    price: "Free", // 실제 가동 중인 무료 티어 (즉시 키 발급)
    cta: { label: "Get an API key", href: "#waitlist" },
    highlights: [
      "100 checks / day",
      "{{r_hobby}} req/s",
      "1 domain",
      "Community support",
    ],
  },
  {
    id: "startup",
    name: "Startup",
    blurb: "For indie hackers running agents in production.",
    price: "{{STARTUP_PRICE}}",
    cta: { label: "Get an API key", href: "#waitlist" },
    badge: "Recommended",
    highlights: [
      "{{q_startup}} checks / month",
      "{{r_startup}} req/s",
      "{{d_startup}} domains",
      "Email support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "For multi-tenant SaaS sending on behalf of many customers.",
    price: "{{SCALE_PRICE}}",
    cta: { label: "Get an API key", href: "#waitlist" },
    highlights: [
      "{{q_scale}} checks / month",
      "{{r_scale}} req/s",
      "{{d_scale}} domains",
      "Multi-tenant API keys",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For high-volume platforms with custom needs.",
    price: "Custom",
    // 전용 문의 이메일({{EMAIL}}) 확정 시 `mailto:`로 교체 — 그 전까지는 waitlist로.
    cta: { label: "Contact", href: "#waitlist" },
    highlights: ["Custom volume & rate limits", "Dedicated support"],
  },
];

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Core",
    rows: [
      { label: "POST /api/check API access", values: [true, true, true, true] },
      { label: "Domain reputation score", values: [true, true, true, true] },
      { label: "Spam risk score", values: [true, true, true, true] },
      {
        label: "Recommended safe sending volume",
        values: [true, true, true, true],
      },
      {
        label: "Deterministic scoring (no LLM)",
        values: [true, true, true, true],
      },
      {
        label: "DNS / blocklist (DNSBL) checks",
        values: [true, true, true, true],
      },
    ],
  },
  {
    title: "Limits",
    rows: [
      {
        label: "API checks",
        values: ["100 / day", "{{q_startup}} / mo", "{{q_scale}} / mo", "Custom"],
      },
      {
        label: "Rate limit (req/s)",
        values: ["{{r_hobby}}", "{{r_startup}}", "{{r_scale}}", "Custom"],
      },
      {
        label: "Domains monitored",
        values: ["1", "{{d_startup}}", "{{d_scale}}", "Custom"],
      },
      {
        // 하위 티어 제공 여부 미확정 — 정책 확정 전까지 플레이스홀더 유지
        label: "Multi-tenant API keys",
        values: ["{{No}}", "{{No}}", true, true],
      },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Community support", values: [true, true, true, true] },
      { label: "Email support", values: [false, true, true, true] },
      { label: "Priority support", values: [false, false, true, true] },
      { label: "Dedicated support", values: [false, false, false, true] },
      { label: "SLA", values: [false, false, false, "{{Custom}}"] },
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
    a: "One POST /api/check call = one check. {{상우 확인}}",
  },
  {
    q: "When can I start?",
    a: "Right now — the free tier is live. You get an API key instantly, no credit card required. {{결제 가동 시 문구 갱신}}",
  },
  {
    q: "Can I use it across multiple tenants/customers?",
    a: "{{상우 확인 — multi-tenant 키 모델 설명}}",
  },
  // Refunds / trial: 실제 정책이 생기기 전까지 항목 자체를 넣지 않는다.
];
