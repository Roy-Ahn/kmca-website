import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

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

const gallery = [
  { src: "/images/congress-1.jpg", alt: "해외 현지 학회 세션에 참석한 관객들" },
  { src: "/images/congress-2.jpg", alt: "해외 박람회 부스에서 상담 중인 참관객" },
  { src: "/images/global-1.jpg", alt: "해외 국제 컨벤션 센터 전경" },
  { src: "/images/global-2.jpg", alt: "해외 현지 학회 만찬 및 심포지엄 현장" },
  { src: "/images/global-3.jpg", alt: "관람객으로 가득 찬 해외 메디컬 박람회 전시장" },
  { src: "/images/history-5.jpg", alt: "라이브 시술 시연을 진행하는 학회 세션" },
];

export function Global() {
  return (
    <section id="global" className="on-dark bg-ink-950 py-20 text-white lg:py-32">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Global & Congress"
          title="글로벌 마케팅 & 학회"
          description={
            <p>
              한국메디코스아카데미는{" "}
              <strong className="font-semibold text-white">
                중국을 비롯한 해외 현지 주요 학회 및 심포지엄
              </strong>
              을 직접 주관·기획합니다. 기획부터 마케팅, 운영까지 전 과정을 전담해 국내
              병의원의{" "}
              <strong className="font-semibold text-white">성공적인 글로벌 진출</strong>을
              선도합니다.
            </p>
          }
        />

        <ol className="mt-14 border-t border-[var(--hairline-invert)] lg:mt-20">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 70}
              className="grid gap-x-8 gap-y-2 border-b border-[var(--hairline-invert)] py-7 sm:grid-cols-[6rem_minmax(0,18rem)_1fr] sm:items-baseline"
            >
              <span className="text-eyebrow text-accent">STEP {index + 1}</span>
              <h3 className="text-title-3 text-white">{step.title}</h3>
              <p className="text-ink-300">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
