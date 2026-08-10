import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContactCta, PageHero, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "글로벌 현지 진출",
  description:
    "국가별 맞춤 현지화 전략으로 의료기관의 해외 진출과 안정적 정착을 지원합니다. 한국메디코스아카데미의 글로벌 시장 진출을 위한 전문 솔루션을 확인하세요.",
  alternates: { canonical: "/global" },
};

const photos = [
  { src: "/images/global-1.jpg", alt: "해외 국제 컨벤션 센터 전경" },
  { src: "/images/global-2.jpg", alt: "해외 현지 학회 만찬 및 심포지엄 현장" },
  { src: "/images/global-3.jpg", alt: "관람객으로 가득 찬 해외 메디컬 박람회 전시장" },
];

const steps = [
  {
    title: "글로벌 맞춤형 마케팅",
    description: "국가별 문화와 타깃 소비 트렌드를 분석하여 브랜딩",
  },
  {
    title: "현지 브랜딩 캠페인",
    description: "현지 타깃 고객 대상으로 K-메디컬의 인지도 확보",
  },
  {
    title: "글로벌 현지 진출",
    description: "국내 우수 브랜드를 글로벌 시장에 안착시킨 후 구축",
  },
];

export default function GlobalPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Expansion"
        title="글로벌 현지 진출"
        description="국가별 맞춤 현지화 전략으로 기획, 마케팅, 운영의 전 과정을 전담합니다. 단순 홍보를 넘어 의료기관의 해외 시장 진입부터 안정적인 정착까지 책임지는 글로벌 진출 솔루션을 제시합니다."
      />

      <Section className="bg-white">
        <ul className="grid gap-5 md:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal
              as="li"
              key={photo.src}
              delay={index * 90}
              className="overflow-hidden rounded-2xl shadow-card"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="bg-ice-50">
        <SectionHeading
          eyebrow="Process"
          title="해외 시장 진입부터 안정적 정착까지"
          description="현지 학회와 심포지엄을 직접 주관·기획해 온 네트워크를 바탕으로 단계별 진출 전략을 설계합니다."
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 90}
              className="rounded-2xl border border-navy-950/8 bg-white p-8 transition duration-300 hover:border-brand-400/40 hover:shadow-card"
            >
              <span className="text-sm font-bold tracking-[0.2em] text-brand-500">
                STEP {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-sm text-navy-950/65">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <ContactCta />
    </>
  );
}
