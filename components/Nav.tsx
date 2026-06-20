import { ArrowRight } from "lucide-react";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[rgba(10,10,10,0.75)] backdrop-blur-[12px] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-[var(--text-primary)] tracking-tight">
          Decision AI
        </span>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-[1.02]"
        >
          얼리 액세스 신청
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
