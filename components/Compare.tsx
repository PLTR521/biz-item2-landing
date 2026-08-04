const worksWith = ["Resend", "SendGrid", "Postmark", "Amazon SES"];

const pipeline = [
  { label: "Your app", sub: "queues an email", guard: false },
  {
    label: "Email Deliverability",
    sub: "/api/check · auth + blocklists",
    guard: true,
  },
  { label: "Your ESP", sub: "Resend · SendGrid · Postmark", guard: false },
  { label: "Inbox", sub: "where it should land", guard: false },
];

export default function Compare() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">02 — Where it sits</p>
        <h2 className="mb-4 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.1rem]">
          Why not just use SendGrid or Resend?
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          Because an ESP&apos;s job starts the moment you hand it the message.
          It accepts the send, delivers what it can, and reports bounces
          afterward. This answers a different question, one step earlier: is
          this domain authenticated and in the clear right now?
        </p>

        {/* Pipeline: where the check sits in the send path */}
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
          {pipeline.map((node, i) => (
            <div
              key={node.label}
              className="flex flex-col items-stretch gap-2 md:flex-1 md:flex-row md:items-center md:gap-3"
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="self-center font-mono text-[var(--text-tertiary)] md:rotate-0 rotate-90"
                >
                  →
                </span>
              )}
              <div
                className={`flex-1 rounded-md border px-4 py-3.5 ${
                  node.guard
                    ? "border-[var(--ok)] bg-[var(--ok-soft)]"
                    : "border-[var(--border)] bg-[var(--bg)]"
                }`}
              >
                <p
                  className={`text-[15px] font-semibold tracking-tight ${
                    node.guard ? "text-[var(--ok)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {node.label}
                </p>
                <p className="mt-0.5 font-mono text-xs text-[var(--text-tertiary)]">
                  {node.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs leading-relaxed text-[var(--text-tertiary)]">
          Runs before your ESP, not instead of it. No SMTP, no message content,
          no queue to manage.
        </p>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-[var(--border)] pt-6">
          <p className="eyebrow">Works with</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {worksWith.map((esp) => (
              <li
                key={esp}
                className="font-mono text-sm text-[var(--text-secondary)]"
              >
                {esp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
