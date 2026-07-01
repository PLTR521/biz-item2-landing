export default function StatCallout() {
  return (
    <section className="px-6 pb-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-7 text-center md:py-8">
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            Send{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              10,000 emails a day?
            </span>
            <br />
            One bad reputation drop can send all of them to spam.
          </p>
        </div>
      </div>
    </section>
  );
}
