import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

const photos = [
  {
    src: "/images/congress-1.jpg",
    alt: "해외 현지 학회 세션에 참석한 관객들",
  },
  {
    src: "/images/congress-2.jpg",
    alt: "해외 박람회 부스에서 상담 중인 참관객",
  },
];

export function GlobalCongress() {
  return (
    <section className="relative overflow-hidden bg-brand-500 py-20 lg:py-28">
      <Image
        src="/images/pattern-chart.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20 mix-blend-luminosity"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-600/85 to-navy-900/90"
      />

      <div className="container-page relative">
        <SectionHeading
          tone="light"
          eyebrow="Global Congress"
          title="글로벌 마케팅 & 학회"
          description={
            <p>
              한국메디코스아카데미는{" "}
              <strong className="font-semibold text-accent-cyan">
                중국을 비롯한 해외 현지 주요 학회 및 심포지엄
              </strong>
              을 직접 주관·기획하는 전문 역량을 보유하고 있습니다. 국내 병의원의{" "}
              <strong className="font-semibold text-accent-cyan">성공적인 글로벌 진출</strong>
              을 선도합니다.
            </p>
          }
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {photos.map((photo, index) => (
            <Reveal
              as="li"
              key={photo.src}
              delay={index * 100}
              className="overflow-hidden rounded-2xl ring-1 ring-white/20"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12">
          <Link
            href="/global"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
          >
            글로벌 현지 진출 살펴보기
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
