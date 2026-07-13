import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-16 bg-[var(--cta-bg)] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-[2.75rem] md:leading-[1.1]">
          Start checking domains today.
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-[#94a3b8]">
          Get a free API key instantly — no credit card, 100 checks/day.
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm variant="dark" buttonLabel="Get an API key" />
        </div>
      </div>
    </section>
  );
}
