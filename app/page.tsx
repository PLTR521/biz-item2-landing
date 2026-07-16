import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Compare from "@/components/Compare";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import BuiltFor from "@/components/BuiltFor";
import Example from "@/components/Example";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Compare />
      <UseCases />
      <HowItWorks />
      <Example />
      <BuiltFor />
      <FinalCTA />
    </main>
  );
}
