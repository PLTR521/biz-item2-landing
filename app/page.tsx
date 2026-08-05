import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import NotInYourStack from "@/components/NotInYourStack";
import Limits from "@/components/Limits";
import Chain from "@/components/Chain";
import Compare from "@/components/Compare";
import HowItWorks from "@/components/HowItWorks";
import Example from "@/components/Example";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/*
  ── 섹션 순서 근거 ─────────────────────────────────────────────────────────
  01 NotInYourStack  발송 IP 먼저. 수집 사례에서 IP 계열이 인증 계열보다 많았다.
  02 Limits          못 하는 것을 FAQ에서 최상단 근처로 승격. 이 시장 손님들은
                     "clean"이라고 해놓고 배신한 도구에 이미 데였다.
  03 Chain           인증. 예전 1순위였으나 2순위로 강등.
  04 Compare         ESP와의 관계.
  05 HowItWorks      메커니즘.
  06 Example         API 표면 + 실호출 증거.
  07 UseCases        멀티테넌트(a) → 에이전트(b) → 자동화(c).
  08 FAQ

  섹션 번호(eyebrow)는 각 컴포넌트에 하드코딩되어 있다 — 순서를 바꾸면 거기도 같이 고칠 것.
  ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <NotInYourStack />
      <Limits />
      <Chain />
      <Compare />
      <HowItWorks />
      <Example />
      <UseCases />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
