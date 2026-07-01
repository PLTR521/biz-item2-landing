import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Want in before launch?
        </h2>
        <p className="mb-10 leading-relaxed text-[var(--text-secondary)]">
          We&apos;ll reach out to beta testers first.
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
