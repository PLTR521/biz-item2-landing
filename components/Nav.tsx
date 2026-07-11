import { Shield } from "lucide-react";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(255,255,255,0.8)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="flex items-center gap-2 font-semibold tracking-tight text-[var(--text-primary)]">
          <Shield className="h-5 w-5 text-[var(--accent)]" />
          SendGuard{" "}
          <span className="font-normal text-[var(--text-tertiary)]">AI</span>
        </span>
        <a
          href="#waitlist"
          className="inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hover)]"
        >
          Get an API key
        </a>
      </div>
    </header>
  );
}
