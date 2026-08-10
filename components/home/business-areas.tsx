import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

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
    <section className="relative overflow-hidden bg-brand-500 py-20 lg:py-28">
      <Image
        src="/images/pattern-chart.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25 mix-blend-luminosity"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-brand-600/70 via-brand-500/85 to-navy-900/95"
      />

      <div className="container-page relative">
        <SectionHeading
          tone="light"
          eyebrow="Business Areas"
          title="주요 사업분야"
          description="키워드광고, 해외 마케팅, 홍보영상, SNS 등 스토리텔링을 바탕으로 전략적인 마케팅을 운영하며 마케팅을 교육하는 메디컬 마케팅 컨설팅 브랜드입니다."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => (
            <Reveal
              as="li"
              key={area.en}
              delay={index * 90}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-bold text-brand-500">{area.ko}</p>
                <p className="mt-1 text-xl font-extrabold leading-tight text-navy-950">
                  {area.en}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-navy-950/10 pt-4 text-sm text-navy-950/65">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand-400">
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12">
          <Link
            href="/business"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
          >
            분야별 주요사업 자세히 보기
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
