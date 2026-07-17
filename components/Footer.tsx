const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#example", label: "Example response" },
  { href: "#faq", label: "FAQ" },
  { href: "https://send-guard-ai.vercel.app/health", label: "API health", external: true },
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
            The deliverability check that runs before your ESP. No dashboard,
            no warmup — one endpoint.
          </p>
        </div>

        <nav className="flex flex-col gap-2.5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sm text-[#a3a39a] transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-xs text-[#7a7a70]">
          © 2026 Email Deliverability
        </p>
      </div>
    </footer>
  );
}
