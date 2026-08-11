import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Card, Eyebrow, SectionHeading } from "@/components/ui";

const capabilities = ["시술 전후 이미지", "초상권 걱정 없는 콘텐츠", "병의원 전용 스톡"];

const videos = [
  { src: "/images/video-1.jpg", alt: "피부 고민을 소개하는 병원 유튜브 콘텐츠 썸네일" },
  { src: "/images/video-2.jpg", alt: "제품 정품 개봉을 보여주는 바이럴 영상 썸네일" },
  { src: "/images/video-3.jpg", alt: "시술 과정을 설명하는 숏폼 콘텐츠 썸네일" },
  { src: "/images/video-4.jpg", alt: "시술 전후를 비교하는 바이럴 영상 썸네일" },
  { src: "/images/video-5.jpg", alt: "원장 인터뷰 형식의 유튜브 콘텐츠 썸네일" },
  { src: "/images/video-6.jpg", alt: "시술 현장을 담은 병원 홍보 영상 썸네일" },
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

export function Media() {
  return (
    <section id="media" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="grad-drift-reverse pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-brand-50 blur-3xl"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Media & Visual"
          title={
            <>
              트렌드와 기술을 접목한
              <br />
              <span className="text-brand-500">메디컬 비주얼</span> 제작
            </>
          }
          description="병원 마케팅에 최적화된 고퀄리티 AI 이미지와 영상으로 환자의 시선을 사로잡고 마케팅 효율을 극대화합니다."
        />

        <Reveal delay={80} className="mt-14 lg:mt-20">
          <div className="grid items-center gap-12 rounded-card bg-ink-50 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>AI Visual Consulting</Eyebrow>
              <h3 className="text-title-2 mt-5 text-ink-950">AI 이미지 컨설팅</h3>
              <p className="mt-4 max-w-lg text-ink-600">
                병원 브랜딩을 더해주는 맞춤제작. 시술 카테고리별로 필요한 비주얼을 직접
                기획하고 제작합니다.
              </p>
              <ul className="mt-8 border-t border-[var(--hairline)]">
                {capabilities.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[var(--hairline)] py-3.5 text-sm font-bold text-ink-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto flex max-w-lg items-end gap-4">
              <Image
                src="/images/ai-phone.png"
                alt="병의원 시술 카테고리별 AI 이미지가 정리된 모바일 화면"
                width={524}
                height={801}
                sizes="(min-width: 1024px) 320px, 55vw"
                className="w-3/5 drop-shadow-2xl"
              />
              <Image
                src="/images/ai-portraits.png"
                alt="AI로 제작한 뷰티 모델 포트레이트 모음"
                width={326}
                height={659}
                sizes="(min-width: 1024px) 220px, 40vw"
                className="mb-6 w-2/5 rounded-[0.5rem] shadow-lift"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <h3 className="text-title-2 text-ink-950">Video Production</h3>
          <p className="mt-4 max-w-2xl text-ink-600">
            브랜드 스토리텔링을 바탕으로 유튜브 콘텐츠, 바이럴 영상, 숏폼 등 맞춤형 미디어
            솔루션을 제공하고 병의원의 자체 채널을 직접 운영합니다.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal
              as="li"
              key={video.src}
              delay={(index % 3) * 70}
              className="group relative overflow-hidden rounded-card bg-ink-100"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.src}
                  alt={video.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-ink-950/10"
              />
            </Reveal>
          ))}
        </ul>

        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {channels.map((channel, index) => (
            <Reveal as="li" key={channel.src} delay={index * 80}>
              <Card interactive className="flex h-full items-center gap-5 p-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[0.5rem] bg-ink-50 sm:w-28">
                  <Image
                    src={channel.src}
                    alt={channel.alt}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-title-3 text-ink-950">{channel.label}</h4>
                  <p className="mt-1.5 text-sm text-ink-600">{channel.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
