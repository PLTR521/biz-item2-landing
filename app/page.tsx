import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
