import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

const areas = [
  {
    ko: "토탈 마케팅",
    en: "MEDICAL ALL",
    items: [
      {
        name: "통합 메디컬 마케팅",
        description: "브랜딩부터 환자 유입까지, 성과 중심의 맞춤 솔루션 제공",
      },
      { name: "개원 컨설팅", description: "입지 분석부터 마케팅 인프라 세팅 프로세스 완비" },
      {
        name: "의료기기 B2B/B2C",
        description: "기술력을 시장 내 실제 매출 및 타깃 브랜딩으로 연결",
      },
    ],
  },
  {
    ko: "해외 네트워크",
    en: "GLOBAL MARKETING",
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
    ko: "브랜드 커머스",
    en: "MEDIA COMMERCE",
    items: [
      { name: "제품 마케팅", description: "제조사의 기술력을 병의원 현장의 선택으로 연결" },
      { name: "제품 해외 유통", description: "해외 파트너 발굴부터 현지 유통망 구축까지" },
      { name: "해외 플랫폼 광고", description: "국가별 주요 플랫폼에 맞춘 광고 운영" },
    ],
  },
  {
    ko: "비주얼 마케팅",
    en: "BEAUTY VISUALS",
    items: [
      { name: "메디컬 미디어 제작", description: "홍보 영상부터 시술 전후사진 제작까지 서포트" },
      {
        name: "병의원 전용 스톡 이미지",
        description: "초상권 문제 없는 맞춤형 콘텐츠 기획·제작·판매",
      },
      { name: "메디컬 얼라이언스", description: "병의원에 필요한 모든 솔루션을 원스톱 지원" },
    ],
  },
];

export function Business() {
  return (
    <section id="business" className="on-dark relative overflow-hidden bg-ink-950 py-20 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="grad-drift pointer-events-none absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-brand-500/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="grad-drift-reverse pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-accent/18 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-700/50 to-transparent"
      />

      <div className="container-page relative">
        <SectionHeading
          tone="dark"
          eyebrow="Business Areas"
          title="주요 사업분야"
          description="키워드광고, 해외 마케팅, 홍보영상, SNS 등 스토리텔링을 바탕으로 전략적인 마케팅을 운영하며 마케팅을 교육하는 메디컬 마케팅 컨설팅 브랜드입니다."
        />

        {/* An editorial row list rather than four cramped cards: each area gets
            room for its English name to carry the hierarchy. */}
        <ul className="mt-14 border-t border-[var(--hairline-invert)] lg:mt-20">
          {areas.map((area, index) => (
            <Reveal
              as="li"
              key={area.en}
              delay={index * 60}
              className="group border-b border-[var(--hairline-invert)] py-9 lg:py-12"
            >
              <div className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="text-index shrink-0 text-white/35 transition-colors duration-300 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-accent">{area.ko}</p>
                  <h3 className="text-title-2 mt-1 text-white">{area.en}</h3>
                </div>
              </div>

              <dl className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8 lg:pl-[calc(2.5rem+1.25rem)]">
                {area.items.map((item) => (
                  <div
                    key={item.name}
                    className="border-t border-[var(--hairline-invert)] pt-4"
                  >
                    <dt className="font-bold text-white">{item.name}</dt>
                    <dd className="mt-1.5 text-sm text-ink-400">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
