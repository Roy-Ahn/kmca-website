import type { Metadata } from "next";
import { CapIcon, ClipboardIcon, PinIcon, SparkIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ContactCta, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "신규 개원 토탈 솔루션",
  description:
    "입지 분석부터 브랜딩, 교육까지 신규 개원에 필요한 토탈 솔루션을 제공합니다. 한국메디코스아카데미의 최적의 입지선정과 전문적 지원으로 성공을 돕습니다.",
  alternates: { canonical: "/consulting" },
};

const pillars = [
  {
    title: "입지 컨설팅",
    Icon: PinIcon,
    items: ["상권 및 동선 분석", "공간 배치 기획"],
  },
  {
    title: "서비스 교육",
    Icon: CapIcon,
    items: ["직원 CS 상담 교육", "시술 응대 메뉴얼"],
  },
  {
    title: "운영 인프라",
    Icon: ClipboardIcon,
    items: ["의료기관 개설 인허가", "장비 및 소모품 세팅"],
  },
  {
    title: "브랜딩 기획",
    Icon: SparkIcon,
    items: ["메디컬 콘텐츠 제작", "ai모델 및 컨텐츠 개발"],
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Opening Consulting"
        title="신규 개원 토탈 솔루션"
        description="최적의 입지선정과 전문적인 브랜딩까지! 지역 상권 분석과 주요 타깃 파악 단계부터 개원 초기 인프라를 완벽히 구축하고 실질적인 성장을 이끌어 드립니다."
      />

      <Section className="bg-ice-50">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={index * 90}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <span className="absolute right-5 top-4 text-4xl font-extrabold text-navy-950/5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-white transition duration-300 group-hover:bg-brand-500">
                <pillar.Icon className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-lg font-bold text-navy-950">{pillar.title}</h2>
              <ul className="mt-3 space-y-1 text-sm text-navy-950/60">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-12 rounded-2xl bg-navy-900 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-cyan">
            Total Solution
          </p>
          <p className="mt-4 max-w-3xl text-lg text-white sm:text-xl">
            지역 상권 분석과 주요 타깃 파악 단계부터 개원 초기 인프라를 완벽히 구축하고
            실질적인 성장을 이끌어 드립니다.
          </p>
        </Reveal>
      </Section>

      <ContactCta />
    </>
  );
}
