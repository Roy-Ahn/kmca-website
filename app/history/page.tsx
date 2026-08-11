import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Card, ContactCta, PageHero, Section, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "KMCA HISTORY",
  description:
    "한국메디코스아카데미는 우수 인재 양성과 혁신적 교육 콘텐츠로 성장해왔습니다. KMCA의 발전 역사를 사진과 함께 만나보세요.",
  alternates: { canonical: "/history" },
};

const gallery = [
  { src: "/images/history-2.jpg", alt: "학술 세미나에서 발표 중인 연자" },
  { src: "/images/history-3.jpg", alt: "국제 학회 부스에서 제품을 소개하는 모습" },
  { src: "/images/history-4.jpg", alt: "만찬장을 가득 채운 학회 참가자들" },
  { src: "/images/history-5.jpg", alt: "라이브 시술 시연을 진행하는 학회 세션" },
  { src: "/images/history-6.jpg", alt: "온라인으로 중계되는 대규모 학술 강연장" },
  { src: "/images/history-7.jpg", alt: "추계 학술대회에서 기념 촬영 중인 의료진" },
];

const channels = [
  {
    src: "/images/history-sns-youtube.jpg",
    alt: "병원 유튜브 채널 운영 화면",
    label: "YouTube 채널 운영",
    description: "브랜드 스토리텔링 기반의 시술 콘텐츠 기획과 채널 운영",
  },
  {
    src: "/images/history-sns-instagram.jpg",
    alt: "병원 인스타그램 프로필 운영 화면",
    label: "Instagram 채널 운영",
    description: "프로필 설계부터 게시물·상담 유입 동선까지 통합 관리",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="사진으로 보는 KMCA의 역사"
        title="KMCA HISTORY"
        description={`${site.legalName}는 우수한 인력과 교육 인프라를 바탕으로 최고의 인재를 양성하고 있으며 언제나 새롭고 발전적인 통합 교육 컨텐츠를 생산, 제공 하고 있습니다.`}
      />

      <Section className="on-dark bg-ink-950">
        <Reveal className="overflow-hidden rounded-card">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/history-1.jpg"
              alt="국제 학술대회가 열린 컨벤션 센터 외부 전경"
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((photo, index) => (
            <Reveal
              as="li"
              key={photo.src}
              delay={(index % 3) * 70}
              className="group overflow-hidden rounded-card bg-ink-900"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Channel Operation"
          title="병의원 채널 운영 사례"
          description="학회와 교육을 넘어, 병의원의 자체 미디어 채널을 직접 기획하고 운영합니다."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {channels.map((channel, index) => (
            <Reveal as="li" key={channel.src} delay={index * 80}>
              <Card interactive className="h-full overflow-hidden">
                <div className="relative aspect-[6/5] bg-ink-50">
                  <Image
                    src={channel.src}
                    alt={channel.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <div className="border-t border-[var(--hairline)] p-6">
                  <h3 className="text-title-3 text-ink-950">{channel.label}</h3>
                  <p className="mt-1.5 text-sm text-ink-600">{channel.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
