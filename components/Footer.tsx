import Link from "next/link";
import { PAYMENTS_ENABLED } from "@/lib/pricing";

// 홈·/pricing 공용 — 섹션 링크는 '/#...'로 두 페이지 어디서든 동작한다.
// PAYMENTS_ENABLED를 켜고 끌 때 배열 요소 타입이 흔들리지 않도록 명시적으로 고정.
type FooterLink = { href: string; label: string; external?: boolean };

const links: FooterLink[] = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#example", label: "Example response" },
  { href: "/#faq", label: "FAQ" },
  // 결제 미연동 — PAYMENTS_ENABLED가 true가 될 때까지 Pricing 링크 미노출.
  ...(PAYMENTS_ENABLED ? [{ href: "/pricing", label: "Pricing" }] : []),
  {
    href: "https://email-deliverability-app.vercel.app/health",
    label: "API health",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--code-border)] bg-[var(--cta-bg)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-baseline gap-2 font-semibold tracking-tight text-white">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 self-center rounded-[3px] bg-[var(--ok)]"
            />
            Email Deliverability{" "}
            <span className="font-mono text-xs font-normal text-[#7a7a70]">
              API
            </span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#7a7a70]">
            The pre-send deliverability check. SPF, DKIM, DMARC, and blocklists
            — one endpoint, before your ESP.
          </p>
        </div>

        <nav className="flex flex-col gap-2.5">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a3a39a] transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#a3a39a] transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <p className="font-mono text-xs text-[#7a7a70]">
          © 2026 Email Deliverability
        </p>
      </div>
    </footer>
  );
}
