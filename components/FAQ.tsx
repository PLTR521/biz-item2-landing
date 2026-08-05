import { PAYMENTS_ENABLED } from "@/lib/pricing";

const faqs = [
  {
    // 수집 사례에서 가장 많이 나온 반론이자 가장 먼저 답해야 하는 질문.
    q: "I already have 10/10 on mail-tester. Why would I need this?",
    a: "Because that score is about one message you sent by hand, down one path, at one moment. It says the message you mailed the tester authenticated correctly. It doesn't enumerate which IPs your domain resolves to today, it doesn't run them against blocklists on every send, and it can't be called from your code before a batch goes out. Plenty of the people who end up debugging deliverability are sitting on a perfect tester score — that's the situation this is built for, not the exception to it.",
  },
  {
    q: "Is this the same as Google Postmaster Tools or SNDS?",
    a: "No, and it doesn't replace either. Those are the provider's view of what already happened: aggregated over days, after you've sent, and often greyed out entirely if your volume is below their reporting threshold. This is the configuration state before you send — records and IPs, read live, returned in one request you can call from a worker. You want both. They answer \"how did it go\", this answers \"is anything obviously broken right now\".",
  },
  {
    q: "My emails work manually but fail in automation. Will this help?",
    // 팔지 않는 답. 사례 5 — 이 사람에게 이 제품은 필요 없다.
    a: "Probably not. When mail sends fine by hand and only breaks inside a workflow tool or a cron job, the cause is usually the recipient address, not the domain — a template variable rendering empty or with quotes still attached, producing bounces like \"Address not found\". Log the actual To value right before the send and read it. Don't touch your DNS. That case is covered in what this does not do, above.",
  },
  {
    q: "Does this replace SendGrid or Resend?",
    a: "No, and it can't — it has no SMTP layer and never touches a message. Your ESP takes the email and delivers it. This runs one step earlier and answers a question your ESP doesn't: is the domain authenticated and off the blocklists right now? Keep the ESP; put this in front of it.",
  },
  {
    q: "Does it measure whether my email reaches the inbox?",
    // "Deliverability API"라는 이름 때문에 가장 오해받기 쉬운 지점 — 정면으로 부정한다.
    a: "No, and nothing that runs before the send can. Placement is decided inside the receiver's system after the message arrives; measuring it means seed-list testing, which is a different product. What this reads is the layer placement depends on — whether the domain still authenticates, and whether its sending IPs are listed. Authentication is one of the strongest inputs into deliverability, and unlike placement it's something you can check and fix in advance.",
  },
  {
    q: "Why do I need this if SPF and DKIM are already set up?",
    a: "Because \"set up\" is a state, not a guarantee. Records get edited during an unrelated DNS change, a team connects HubSpot or Mailchimp and rewrites the SPF line, a selector rotates, an ESP moves you to a different IP pool — and an IP can get listed weeks after you configured everything correctly. Reading the records at send time is the only way to know they still say what you think they say.",
  },
  {
    q: "Who is it built for?",
    a: "Multi-tenant SaaS platforms sending on behalf of customers, AI agents that send autonomously, and teams running customer email infrastructure.",
  },
  {
    q: "What exactly do you inspect?",
    // 과장 금지: 저장된 이력이 아니라 매 요청 시점의 라이브 DNS 조회가 전부다.
    a: "Sending IPs first — the A records of the domain's MX hosts, or the domain's own A records when there's no MX, up to five per request, each against Spamhaus ZEN, Barracuda, and SpamCop. Then authentication: the SPF and DMARC records, the DMARC policy value, and DKIM when you pass a selector. All of it read live from DNS on each request and rolled up into one reputation level, one risk level, and the signals behind them. We store no history, so every answer is what DNS says at the moment you ask.",
  },
  {
    q: "Does it keep watching my domain after the response?",
    // 정직성 핵심 문항 — 백그라운드 작업·알림 기능은 없다. 있는 척하지 않는다.
    a: "No. There's no background job, no alerting, and nothing running between your requests. It answers when you call it — which is why the moments worth calling are the cheap ones: before an autonomous send, before you onboard a customer domain, before a bulk run. Every response carries a checkedAt timestamp so you know exactly how fresh the answer is.",
  },
  {
    q: "Is the score AI-generated?",
    // lib/risk.ts — LLM 호출 없음, 순수 룰. 이 답이 바뀌면 코드가 먼저 바뀐 것이다.
    a: "No. The verdict is a small set of rules over the DNS signals — count the criticals, count the warns, return a level. No model, no scoring service, nothing probabilistic. The same domain with the same DNS returns the same answer, and every signal behind it is in the response so you can check the work.",
  },
  {
    q: "Do you see my email content?",
    a: "Never. The API takes a domain — or an IP — and returns a verdict. It's stateless: no warmup period, no list upload, nothing to configure.",
  },
  {
    q: "What does the free tier include?",
    // 결제 미연동 — PAYMENTS_ENABLED가 true가 될 때까지 Pro 가격 문장 미노출.
    a: `50 requests per day with an API key issued instantly, no credit card required. The daily limit resets at midnight UTC.${
      PAYMENTS_ENABLED ? " Pro adds 3,000 requests a month for $19." : ""
    }`,
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow mb-4">08 — Questions</p>
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            FAQ
          </h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-medium tracking-[-0.01em] text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:inline"
                >
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
