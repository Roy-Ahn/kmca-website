import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

export function GlobalCongress() {
  return (
    <section className="bg-ink-950 py-20 text-white lg:py-32">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Global Congress"
          title="글로벌 마케팅 & 학회"
          description={
            <p>
              한국메디코스아카데미는{" "}
              <strong className="font-semibold text-white">
                중국을 비롯한 해외 현지 주요 학회 및 심포지엄
              </strong>
              을 직접 주관·기획하는 전문 역량을 보유하고 있습니다. 국내 병의원의{" "}
              <strong className="font-semibold text-white">성공적인 글로벌 진출</strong>을
              선도합니다.
            </p>
          }
        />

        {/* Staggered pair — the offset keeps the band from reading as a grid. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-12 lg:mt-20 lg:gap-6">
          <Reveal className="sm:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src="/images/congress-1.jpg"
                alt="해외 현지 학회 세션에 참석한 관객들"
                fill
                sizes="(min-width: 640px) 55vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={90} className="sm:col-span-5 sm:pt-12 lg:pt-20">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-card sm:aspect-[4/5]">
              <Image
                src="/images/congress-2.jpg"
                alt="해외 박람회 부스에서 상담 중인 참관객"
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <ButtonLink href="/global" tone="dark" variant="outline" arrow>
            글로벌 현지 진출 살펴보기
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
