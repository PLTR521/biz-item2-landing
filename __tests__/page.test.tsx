import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("랜딩 페이지 스모크", () => {
  it("히어로 헤드라인과 Eyebrow를 렌더링한다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Deliverability API for AI agents",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Currently in private beta")).toBeInTheDocument();
  });

  it("모든 섹션 헤딩을 렌더링한다", () => {
    render(<Home />);
    const headings = [
      "Why warmup tools don't work for agent-sent email",
      "Reputation, in one call",
      "Safe volume, not warmup schedules",
      "Per-tenant, not per-app",
      "How it works",
      "One thing, done right",
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

  it("프레임워크 텍스트 목록을 렌더링한다", () => {
    render(<Home />);
    for (const tool of [
      "LangChain",
      "CrewAI",
      "Vercel AI SDK",
      "n8n",
      "OpenAI Agents SDK",
    ]) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
  });
});
