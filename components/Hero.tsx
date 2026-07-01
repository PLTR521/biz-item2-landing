import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pb-16 md:pt-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="mb-8 inline-block rounded-full bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
          For AI agent-native teams
        </span>
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          Your AI agent&apos;s emails are landing in spam.
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
          Deliverability infrastructure built for autonomous senders — not humans
          with a send button.
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
