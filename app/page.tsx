import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyWarmup from "@/components/WhyWarmup";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import BuiltFor from "@/components/BuiltFor";
import Example from "@/components/Example";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhyWarmup />
      <Features />
      <HowItWorks />
      <BuiltFor />
      <Example />
      <FinalCTA />
    </main>
  );
}
