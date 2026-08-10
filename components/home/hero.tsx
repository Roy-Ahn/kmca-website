import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

const steps = [
  {
    step: "STEP.1",
    title: "메디컬 전담팀",
    titleRest: "의 1:1 밀착 솔루션",
    description: "전문가가 광고의 효율과 문제점을 데이터 기반으로 정밀 분석",
  },
  {
    step: "STEP.2",
    title: "브랜딩부터 내원까지",
    titleRest: ", 올인원 플랜",
    description: "지역 타깃에 최적화된 맞춤형 리포트와 실행 플랜을 제공합니다.",
  },
  {
    step: "STEP.3",
    title: "국경을 넘어서는",
    titleRest: " 글로벌 브랜딩",
    description: "해외 환자 유치 플랫폼을 활용해 병원의 영향력을 세계로 넓힙니다.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,#1140d8_0%,transparent_48%),radial-gradient(circle_at_78%_8%,rgba(255,150,160,0.45)_0%,transparent_42%),radial-gradient(circle_at_60%_85%,rgba(9,26,74,0.9)_0%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-950"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                {site.nameEn}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 border-l-4 border-white/70 pl-6 text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                The
                <br />
                KMCA.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-base text-navy-100/85 sm:text-lg">
                국내를 넘어 해외까지, 메디컬 전문 마케팅.
                <br className="hidden sm:block" /> 브랜딩부터 환자유입까지 확실한 성과를
                만듭니다.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/business"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-navy-950 transition hover:bg-navy-50"
              >
                주요 사업분야 보기
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/10"
              >
                상담 문의 {site.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
              <Image
                src="/images/hero-seminar.jpg"
                alt="한국메디코스아카데미가 주최한 미용 의료 세미나 현장"
                width={1211}
                height={864}
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {steps.map((item, index) => (
            <Reveal
              as="li"
              key={item.step}
              delay={index * 100}
              className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/15 backdrop-blur-sm transition duration-300 hover:bg-white/12"
            >
              <span className="inline-flex rounded-full bg-brand-400/90 px-3 py-1 text-[0.65rem] font-bold tracking-widest text-white">
                {item.step}
              </span>
              <p className="mt-4 text-lg font-bold text-white">
                <span className="text-accent-cyan">{item.title}</span>
                {item.titleRest}
              </p>
              <p className="mt-2 text-sm text-navy-100/75">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
