import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Business } from "@/components/sections/business";
import { Contact } from "@/components/sections/contact";
import { Global } from "@/components/sections/global";
import { Hero } from "@/components/sections/hero";
import { Media } from "@/components/sections/media";
import { MedTech } from "@/components/sections/medtech";
import { Solutions } from "@/components/sections/solutions";
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
      <About />
      <Business />
      <MedTech />
      <Solutions />
      <Global />
      <Media />
      <Contact />
    </>
  );
}
