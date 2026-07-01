import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatCallout from "@/components/StatCallout";
import Problem from "@/components/Problem";
import WhyNow from "@/components/WhyNow";
import KnownFacts from "@/components/KnownFacts";
import Hypothesis from "@/components/Hypothesis";
import BuiltFor from "@/components/BuiltFor";
import Preview from "@/components/Preview";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatCallout />
      <Problem />
      <WhyNow />
      <KnownFacts />
      <Hypothesis />
      <BuiltFor />
      <Preview />
      <FinalCTA />
    </main>
  );
}
