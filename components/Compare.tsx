import { Check } from "lucide-react";

const worksWith = ["Resend", "SendGrid", "Postmark", "Amazon SES"];

export default function Compare() {
  const rows = [
    {
      need: "Send email",
      solution: "Resend · SendGrid · Postmark",
      accent: false,
    },
    {
      need: "Check deliverability before sending",
      solution: "SendGuard",
      accent: true,
    },
  ];

  return (
    <section className="border-t border-[var(--border)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-[2rem] md:leading-[1.15]">
          Using Resend or SendGrid? Add a safety check before sending.
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          SendGuard runs before your ESP, not instead of it.
        </p>

        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="grid grid-cols-[1fr_1fr] border-b border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            <div>Need</div>
            <div>Solution</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.need}
              className={`grid grid-cols-[1fr_1fr] items-center px-5 py-4 text-[15px] md:text-base ${
                i > 0 ? "border-t border-[var(--border)]" : ""
              }`}
            >
              <div className="pr-4 text-[var(--text-secondary)]">
                {row.need}
              </div>
              <div
                className={
                  row.accent
                    ? "font-semibold text-[var(--text-primary)]"
                    : "text-[var(--text-primary)]"
                }
              >
                {row.solution}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            Works with
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {worksWith.map((esp) => (
              <li
                key={esp}
                className="flex items-center gap-2 text-[15px] text-[var(--text-primary)]"
              >
                <Check
                  className="h-4 w-4 text-[var(--success)]"
                  aria-hidden="true"
                  strokeWidth={2.5}
                />
                {esp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
