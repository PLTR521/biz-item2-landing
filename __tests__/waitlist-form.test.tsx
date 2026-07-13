import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaitlistForm from "@/components/WaitlistForm";

const SIGNUP_ENDPOINT = "https://send-guard-ai.vercel.app/api/signup";

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("제출 성공 시 signup API를 호출하고 발급된 키를 보여준다", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apiKey: "sg_live_abc123", tier: "free", emailed: false }),
    } as Response);

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button", { name: /Get an API key/ }));

    expect(fetch).toHaveBeenCalledWith(
      SIGNUP_ENDPOINT,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "dev@example.com" }),
      })
    );
    expect(await screen.findByText("sg_live_abc123")).toBeInTheDocument();
    expect(screen.getByText(/save it now/i)).toBeInTheDocument();
  });

  it("이메일 발송이 성공한 경우 발송 안내 문구를 보여준다", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apiKey: "sg_live_abc123", tier: "free", emailed: true }),
    } as Response);

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button", { name: /Get an API key/ }));

    expect(await screen.findByText(/also sent to your inbox/i)).toBeInTheDocument();
  });

  it("서버 에러 시 에러 메시지를 보여주고 폼을 유지한다", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "email_already_registered" }),
    } as Response);

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText(/That email already has a key/)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("네트워크 실패 시 네트워크 에러 메시지를 보여준다", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText("Network error. Please try again.")
    ).toBeInTheDocument();
  });

  it("buttonLabel prop이 버튼 텍스트를 바꾼다", () => {
    render(<WaitlistForm buttonLabel="Request access" />);
    expect(
      screen.getByRole("button", { name: /Request access/ })
    ).toBeInTheDocument();
  });
});
