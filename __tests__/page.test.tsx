import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("랜딩 페이지 스모크", () => {
  it("히어로 헤드라인과 Eyebrow를 렌더링한다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "The deliverability check API for multi-tenant SaaS platforms.",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Free tier available now")).toBeInTheDocument();
  });

  it("모든 섹션 헤딩을 렌더링한다", () => {
    render(<Home />);
    const headings = [
      "Using Resend or SendGrid? Add a safety check before sending.",
      "When to check",
      "Before your AI agent sends",
      "Before your SaaS sends for a customer",
      "Before an automation workflow fires",
      "How it works",
      "One thing, done right",
      "FAQ",
      "Start checking domains today.",
    ];
    for (const name of headings) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("CTA 앵커가 올바른 타겟을 가리킨다", () => {
    render(<Home />);
    // Nav + Hero의 "Get an API key" 링크 → #waitlist
    const apiKeyLinks = screen.getAllByRole("link", { name: /Get an API key/ });
    expect(apiKeyLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of apiKeyLinks) {
      expect(link).toHaveAttribute("href", "#waitlist");
    }
    // Secondary CTA → #example
    expect(
      screen.getByRole("link", { name: "View example response" })
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
      screen.getByRole("button", { name: /Get an API key/ })
    ).toBeInTheDocument();
  });

  it("FAQ 항목을 렌더링한다", () => {
    render(<Home />);
    for (const question of [
      "Is this an ESP?",
      "Who is it built for?",
      "What signals do you inspect?",
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
