import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

const steps = [
  {
    title: "메디컬 전담팀",
    titleRest: "의 1:1 밀착 솔루션",
    description: "전문가가 광고의 효율과 문제점을 데이터 기반으로 정밀 분석",
  },
  {
    title: "브랜딩부터 내원까지",
    titleRest: ", 올인원 플랜",
    description: "지역 타깃에 최적화된 맞춤형 리포트와 실행 플랜을 제공합니다.",
  },
  {
    title: "국경을 넘어서는",
    titleRest: " 글로벌 브랜딩",
    description: "해외 환자 유치 플랫폼을 활용해 병원의 영향력을 세계로 넓힙니다.",
  },
];

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 text-white">
      {/* A single soft brand glow instead of competing radial gradients. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-56 h-[45rem] w-[45rem] rounded-full bg-brand-600/25 blur-[140px]"
      />

      {/* The photograph bleeds off the right edge on large screens. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Image
          src="/images/hero-seminar.jpg"
          alt=""
          fill
          priority
          sizes="46vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/45"
        />
        {/* Keeps the numbered steps readable where they cross the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent"
        />
      </div>

      <div className="container-page relative pb-16 pt-32 lg:pb-24 lg:pt-44">
        <div className="max-w-2xl lg:max-w-[34rem]">
          <Reveal>
            <Eyebrow tone="dark">{site.nameEn}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-display mt-7 text-white">
              The
              <br />
              KMCA<span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lede mt-8 max-w-md text-ink-300">
              국내를 넘어 해외까지, 메디컬 전문 마케팅.
              <br className="hidden sm:block" /> 브랜딩부터 환자유입까지 확실한 성과를
              만듭니다.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/business" tone="dark" arrow>
              주요 사업분야 보기
            </ButtonLink>
            <ButtonLink href={site.phoneHref} tone="dark" variant="outline">
              상담 문의 {site.phone}
            </ButtonLink>
          </Reveal>
        </div>

        {/* Mobile gets the photo inline, since there is no room to bleed it. */}
        <Reveal delay={140} className="mt-12 lg:hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/15">
            <Image
              src="/images/hero-seminar.jpg"
              alt="한국메디코스아카데미가 주최한 미용 의료 세미나 현장"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden border-t border-[var(--hairline-invert)] sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {steps.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 80}
              className="relative pt-6 sm:pr-8"
            >
              {/* The list is ordered, so the numeral is a visual cue only. */}
              <span aria-hidden="true" className="text-index block text-white/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-title-3 mt-4 text-white">
                <span className="text-accent">{item.title}</span>
                {item.titleRest}
              </p>
              <p className="mt-2 text-sm text-ink-400">{item.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
