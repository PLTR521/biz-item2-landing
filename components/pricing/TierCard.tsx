import { Check } from "lucide-react";
import type { Tier } from "@/lib/pricing";
import PlaceholderText from "./PlaceholderText";

export default function TierCard({ tier }: { tier: Tier }) {
  const recommended = tier.badge === "Recommended";
  const pricePlaceholder = /^\{\{[^}]*\}\}$/.test(tier.price);

  return (
    <div
      className={`relative flex flex-col rounded-md border bg-white p-6 ${
        recommended ? "border-[var(--ok)]" : "border-[var(--border)]"
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-5 rounded-full border border-[var(--ok)] bg-[var(--ok-soft)] px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--ok)]">
          {tier.badge}
        </span>
      )}

      <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
        {tier.blurb}
      </p>

      <p className="mt-5 flex items-baseline gap-1.5">
        {pricePlaceholder ? (
          <span className="font-mono text-lg text-[var(--warn)]">
            {tier.price}
          </span>
        ) : (
          <span className="text-3xl font-semibold tracking-tight">
            {tier.price}
          </span>
        )}
        {tier.priceNote && (
          <span className="text-sm text-[var(--text-tertiary)]">
            {tier.priceNote}
          </span>
        )}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5 text-sm">
        {tier.highlights.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5">
            <Check
              aria-hidden="true"
              className="h-4 w-4 shrink-0 self-center text-[var(--ok)]"
            />
            <span className="text-[var(--text-secondary)]">
              <PlaceholderText text={item} />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={tier.cta.href}
          className={`inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${
            recommended
              ? "bg-[var(--btn)] text-white hover:bg-[var(--btn-hover)]"
              : "border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
          }`}
        >
          {tier.cta.label}
        </a>
      </div>
    </div>
  );
}
