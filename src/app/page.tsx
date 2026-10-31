import { Banner } from "@/components/Homepage/banner";
import { CtaSection } from "@/components/Homepage/cta-section";
import Featured from "@/components/Homepage/Featured";
import { Testimonials } from "@/components/Homepage/testimonials";
import { WhyChoose } from "@/components/Homepage/why-choose";

export default function Home() {
  return (
    <main className="flex-1">
      <Banner />
      <Featured></Featured>
      <WhyChoose />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
