import { MailX, Clock, LayoutDashboard } from "lucide-react";

const items = [
  {
    icon: MailX,
    text: "Reply rates on agent-sent emails drop, with no easy way to tell why.",
  },
  {
    icon: Clock,
    text: "By the time you notice a reputation drop, days of sends are already in spam.",
  },
  {
    icon: LayoutDashboard,
    text: "No dashboard built to catch it before it hurts you.",
  },
];

export default function Problem() {
  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
          Sound familiar?
        </h2>
        <div className="grid gap-4">
          {items.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
              <p className="leading-relaxed text-[var(--text-secondary)]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
