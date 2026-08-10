import type { Metadata } from "next";
import { BusinessAreas } from "@/components/home/business-areas";
import { Closing } from "@/components/home/closing";
import { GlobalCongress } from "@/components/home/global-congress";
import { Hero } from "@/components/home/hero";
import { MasterPlan } from "@/components/home/master-plan";
import { MedTech } from "@/components/home/medtech";
import { Network } from "@/components/home/network";
import { VisualMedia } from "@/components/home/visual-media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} | 메디컬 마케팅 · 교육 · 국내외 학회`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Network />
      <BusinessAreas />
      <MasterPlan />
      <MedTech />
      <GlobalCongress />
      <VisualMedia />
      <Closing />
    </>
  );
}
