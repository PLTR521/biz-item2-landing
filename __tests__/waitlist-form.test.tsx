import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaitlistForm from "@/components/WaitlistForm";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdqnklk";

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("제출 성공 시 Formspree로 이메일을 POST하고 성공 메시지를 보여준다", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button", { name: /Get an API key/ }));

    expect(fetch).toHaveBeenCalledWith(
      FORMSPREE_ENDPOINT,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "dev@example.com" }),
      })
    );
    expect(
      await screen.findByText(/You're on the list/)
    ).toBeInTheDocument();
    // 폼은 사라진다
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("서버 에러 시 에러 메시지를 보여주고 폼을 유지한다", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ errors: [{ message: "Invalid email address" }] }),
    } as Response);

    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "dev@example.com"
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText("Invalid email address")
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
