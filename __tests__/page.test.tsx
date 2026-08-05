import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { PAYMENTS_ENABLED } from "@/lib/pricing";

describe("랜딩 페이지 스모크", () => {
  it("히어로 헤드라인과 Eyebrow를 렌더링한다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Everything says pass. The email still didn't arrive.",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Free tier available now")).toBeInTheDocument();
  });

  it("모든 섹션 헤딩을 렌더링한다", () => {
    render(<Home />);
    const headings = [
      "The check that isn't in your stack",
      "What this does not do",
      "Authentication isn't reputation.",
      "Why not just use SendGrid or Resend?",
      "Call it while the problem is still cheap",
      "Before your SaaS sends for a customer domain",
      "Before your AI agent sends",
      "Before a bulk run or a scheduled send",
      "How it works",
      "One endpoint, and the reason behind every verdict",
      "FAQ",
      "Run it on your own domain.",
    ];
    for (const name of headings) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("CTA 앵커가 올바른 타겟을 가리킨다", () => {
    render(<Home />);
    // Nav("Get an API key") + Hero("Get a free API key") 링크 → #waitlist
    const apiKeyLinks = screen.getAllByRole("link", {
      name: /Get a(n| free) API key/,
    });
    expect(apiKeyLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of apiKeyLinks) {
      expect(link).toHaveAttribute("href", "#waitlist");
    }
    // Secondary CTA → #example
    expect(
      screen.getByRole("link", { name: "See a real response" })
    ).toHaveAttribute("href", "#example");
    // 앵커 타겟 섹션 존재
    expect(document.getElementById("waitlist")).not.toBeNull();
    expect(document.getElementById("example")).not.toBeNull();
  });

  it("waitlist 폼(이메일 입력 + 제출 버튼)을 렌더링한다", () => {
    render(<Home />);
    expect(
      screen.getByPlaceholderText("you@company.com")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get a free API key/ })
    ).toBeInTheDocument();
  });

  it("PAYMENTS_ENABLED에 따라 Pricing 링크 노출이 결정된다", () => {
    render(<Home />);
    // 결제 미연동 동안은 Nav·Footer 어디에도 노출되지 않아야 한다.
    expect(screen.queryAllByRole("link", { name: "Pricing" })).toHaveLength(
      PAYMENTS_ENABLED ? 2 : 0
    );
  });

  it("FAQ 항목을 렌더링한다", () => {
    render(<Home />);
    for (const question of [
      "I already have 10/10 on mail-tester. Why would I need this?",
      "Is this the same as Google Postmaster Tools or SNDS?",
      "My emails work manually but fail in automation. Will this help?",
      "Does this replace SendGrid or Resend?",
      "Does it measure whether my email reaches the inbox?",
      "Why do I need this if SPF and DKIM are already set up?",
      "Who is it built for?",
      "What exactly do you inspect?",
      "Does it keep watching my domain after the response?",
      "Is the score AI-generated?",
      "Do you see my email content?",
      "What does the free tier include?",
    ]) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
    // 핵심 타겟 3종이 FAQ 답변에 남아 있어야 한다
    expect(
      screen.getByText(/Multi-tenant SaaS platforms sending on behalf/)
    ).toBeInTheDocument();
  });
});
