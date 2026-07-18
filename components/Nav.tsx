import Link from "next/link";

// 홈·/pricing 공용 — 섹션 링크는 '/#...'로 두 페이지 어디서든 동작한다.
const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#example", label: "Example" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(252,252,250,0.85)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-semibold tracking-tight text-[var(--text-primary)]"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 self-center rounded-[3px] bg-[var(--ok)]"
          />
          Email Deliverability{" "}
          <span className="font-mono text-xs font-normal text-[var(--text-tertiary)]">
            API
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 홈·/pricing 모두 FinalCTA(id="waitlist")를 렌더하므로 페이지 내 앵커로 동작 */}
        <a
          href="#waitlist"
          className="inline-flex items-center rounded-md bg-[var(--btn)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--btn-hover)]"
        >
          Get an API key
        </a>
      </div>
    </header>
  );
}
