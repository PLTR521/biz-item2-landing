import { Check } from "lucide-react";
import { FEATURE_GROUPS, TIERS, type Cell } from "@/lib/pricing";
import PlaceholderText from "./PlaceholderText";

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check
          aria-hidden="true"
          className="inline-block h-4 w-4 text-[var(--ok)]"
        />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-[var(--text-tertiary)]">
          —
        </span>
        <span className="sr-only">No</span>
      </>
    );
  }
  return <PlaceholderText text={value} />;
}

export default function FeatureComparison() {
  return (
    <section
      id="compare-plans"
      className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <p className="eyebrow mb-4">01 — Plan details</p>
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] md:text-[2.1rem]">
            Compare plans
          </h2>
        </div>

        {/* Desktop: table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border-strong)]">
                <th scope="col" className="w-2/5 py-3 pr-4 text-left">
                  <span className="sr-only">Feature</span>
                </th>
                {TIERS.map((tier) => (
                  <th
                    scope="col"
                    key={tier.id}
                    className="px-3 py-3 text-center font-semibold tracking-tight"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            {FEATURE_GROUPS.map((group) => (
              <tbody key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={TIERS.length + 1}
                    className="pb-2 pt-8 text-left"
                  >
                    <span className="eyebrow">{group.title}</span>
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[var(--border)]"
                  >
                    <th
                      scope="row"
                      className="py-3 pr-4 text-left font-normal text-[var(--text-secondary)]"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className="px-3 py-3 text-center">
                        <CellValue value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        {/* Mobile: per-tier accordion */}
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] md:hidden">
          {TIERS.map((tier, tierIndex) => (
            <details key={tier.id} className="group py-4">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-medium tracking-[-0.01em] text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                {tier.name}
                <span className="flex items-baseline gap-3">
                  <span className="text-sm text-[var(--text-secondary)]">
                    <PlaceholderText
                      text={
                        tier.priceNote
                          ? `${tier.price} ${tier.priceNote}`
                          : tier.price
                      }
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:hidden"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 font-mono text-sm text-[var(--text-tertiary)] group-open:inline"
                  >
                    −
                  </span>
                </span>
              </summary>
              <div className="mt-4 flex flex-col gap-6">
                {FEATURE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow mb-2">{group.title}</p>
                    <ul className="flex flex-col">
                      {group.rows.map((row) => (
                        <li
                          key={row.label}
                          className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-2 text-sm last:border-b-0"
                        >
                          <span className="text-[var(--text-secondary)]">
                            {row.label}
                          </span>
                          <span className="text-right">
                            <CellValue value={row.values[tierIndex]} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
