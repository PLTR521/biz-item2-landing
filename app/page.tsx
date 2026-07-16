import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Compare from "@/components/Compare";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import Example from "@/components/Example";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Compare />
      <UseCases />
      <HowItWorks />
      <Example />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
