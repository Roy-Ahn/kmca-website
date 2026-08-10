import type { Metadata } from "next";
import { GearIcon, GlobeIcon, SearchIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ContactCta, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "주요사업분야",
  description:
    "한국메디코스아카데미의 국내외 맞춤형 메디컬 마케팅과 브랜딩, 개원 컨설팅, 미디어 제작까지 성과 중심 솔루션을 제공합니다. 자세히 알아보세요.",
  alternates: { canonical: "/business" },
};

const groups = [
  {
    title: "국내마케팅",
    Icon: SearchIcon,
    items: [
      {
        name: "통합 메디컬 마케팅",
        description: "브랜딩부터 환자 유입까지, 성과 중심의 맞춤 솔루션 제공",
      },
      {
        name: "개원 컨설팅",
        description: "입지 분석부터 마케팅 인프라 세팅 프로세스 완비",
      },
      {
        name: "의료기기 B2B/B2C",
        description: "기술력을 시장 내 실제 매출 및 타깃 브랜딩으로 연결",
      },
    ],
  },
  {
    title: "글로벌 비즈니스",
    Icon: GlobeIcon,
    items: [
      {
        name: "글로벌 맞춤형 마케팅",
        description: "국가별 문화와 타깃 소비 트렌드를 분석하여 브랜딩",
      },
      {
        name: "현지 브랜딩 캠페인",
        description: "현지 타깃 고객 대상으로 K-메디컬의 인지도 확보",
      },
      {
        name: "글로벌 현지 진출",
        description: "국내 우수 브랜드를 글로벌 시장에 안착시킨 후 구축",
      },
    ],
  },
  {
    title: "ETC",
    Icon: GearIcon,
    items: [
      {
        name: "메디컬 미디어 제작",
        description: "홍보 영상부터 시술 전후사진 제작까지 서포트",
      },
      {
        name: "병의원 전용 스톡 이미지",
        description: "초상권 문제 없는 맞춤형 콘텐츠 기획·제작·판매",
      },
      {
        name: "메디컬 얼라이언스",
        description: "병의원에 필요한 모든 솔루션을 원스톱 지원",
      },
    ],
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Areas"
        title="분야별 주요사업 소개"
        description="국내 마케팅부터 글로벌 비즈니스, 메디컬 미디어 제작까지. 병의원이 필요로 하는 모든 단계를 하나의 팀이 책임집니다."
      />

      <Section className="bg-ice-50">
        <ul className="grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal
              as="li"
              key={group.title}
              delay={index * 100}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-navy-800">{group.title}</h2>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                  <group.Icon className="h-6 w-6" />
                </span>
              </div>

              <dl className="mt-8 space-y-6">
                {group.items.map((item) => (
                  <div key={item.name} className="border-l-2 border-brand-500/25 pl-4">
                    <dt className="text-base font-bold text-navy-950">{item.name}</dt>
                    <dd className="mt-1 text-sm text-navy-950/65">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
