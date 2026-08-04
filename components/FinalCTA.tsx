import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-16 bg-[var(--cta-bg)] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5 !text-[#7a7a70]">One endpoint away</p>
        <h2 className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-[2.6rem] md:leading-[1.1]">
          Run it on your own domain.
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-[#a3a39a]">
          The key is issued on this page — paste it into curl and you have a
          verdict on your first request. No credit card, 50 requests/day free.
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm variant="dark" buttonLabel="Get a free API key" />
        </div>
        <p className="mt-6 font-mono text-xs text-[#7a7a70]">
          One request · REST + JSON · no SDK · no background agents
        </p>
      </div>
    </section>
  );
}
