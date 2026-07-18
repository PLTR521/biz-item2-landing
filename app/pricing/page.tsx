import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTiers from "@/components/pricing/PricingTiers";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing — Email Deliverability API",
  description:
    "Simple pricing for AI email agents. Free: 25 checks/month. Pro: $19/month for 3,000 checks with usage-based overage. Enterprise: custom.",
};

export default function PricingPage() {
  return (
    <main>
      <Nav />
      <PricingHero />
      <PricingTiers />
      <FeatureComparison />
      <PricingFAQ />
      {/* 홈과 동일한 폼/엔드포인트 재사용 — 카드 CTA(#waitlist)의 착지점 */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
