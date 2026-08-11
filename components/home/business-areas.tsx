import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

const areas = [
  {
    ko: "토탈 마케팅",
    en: "MEDICAL ALL",
    image: "/images/area-total.jpg",
    alt: "태블릿에서 마케팅 데이터를 확인하는 모습",
    items: ["병원 마케팅", "개원 All in One", "Consulting"],
  },
  {
    ko: "해외 네트워크",
    en: "GLOBAL MARKETING",
    image: "/images/area-global.jpg",
    alt: "전 세계를 연결하는 네트워크 이미지",
    items: ["해외 환자 유치", "해외 광고", "After Service"],
  },
  {
    ko: "브랜드 커머스",
    en: "MEDIA COMMERCE",
    image: "/images/area-media.jpg",
    alt: "비즈니스 미팅에서 계약을 진행하는 모습",
    items: ["제품 마케팅", "제품 해외 유통", "해외 플랫폼 광고"],
  },
  {
    ko: "비주얼 마케팅",
    en: "BEAUTY VISUALS",
    image: "/images/area-visual.jpg",
    alt: "뷰티 콘텐츠 모델 이미지",
    items: ["뷰티 이미지 제작", "인플루언서 셀카", "영상제작"],
  },
];

export function BusinessAreas() {
  return (
    <section className="on-dark bg-ink-950 py-20 text-white lg:py-32">
      <div className="container-page">
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
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-b border-[var(--hairline-invert)] py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 lg:py-9"
            >
              <span
                aria-hidden="true"
                className="text-index text-white/35 transition-colors duration-300 group-hover:text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-accent">{area.ko}</p>
                <p className="text-title-2 mt-1 text-white">{area.en}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-400">
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="relative h-24 w-full overflow-hidden rounded-card sm:h-20 sm:w-36 lg:h-24 lg:w-48">
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100} className="mt-12">
          <ButtonLink href="/business" tone="dark" variant="outline" arrow>
            분야별 주요사업 자세히 보기
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
