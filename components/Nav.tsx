import { Shield, ArrowRight } from "lucide-react";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(10,10,10,0.75)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <span className="flex items-center gap-2 font-semibold tracking-tight text-[var(--text-primary)]">
          <Shield className="h-5 w-5 text-[var(--accent)]" />
          SendGuard <span className="font-normal text-[var(--text-tertiary)]">AI</span>
        </span>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:scale-[1.02]"
        >
          Get early access
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
