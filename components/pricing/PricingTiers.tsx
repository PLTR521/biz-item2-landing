import { ANNUAL_BILLING_OFFERED, TIERS } from "@/lib/pricing";
import BillingToggle from "./BillingToggle";
import TierCard from "./TierCard";

export default function PricingTiers() {
  return (
    <section className="px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        {ANNUAL_BILLING_OFFERED && (
          <div className="mb-10 flex justify-center">
            <BillingToggle />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 pt-3 md:grid-cols-3">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
