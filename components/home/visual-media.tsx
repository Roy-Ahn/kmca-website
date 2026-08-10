import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";

const videos = [
  { src: "/images/video-1.jpg", alt: "피부 고민을 소개하는 병원 유튜브 콘텐츠 썸네일" },
  { src: "/images/video-2.jpg", alt: "제품 정품 개봉을 보여주는 바이럴 영상 썸네일" },
  { src: "/images/video-3.jpg", alt: "시술 과정을 설명하는 숏폼 콘텐츠 썸네일" },
  { src: "/images/video-4.jpg", alt: "시술 전후를 비교하는 바이럴 영상 썸네일" },
  { src: "/images/video-5.jpg", alt: "원장 인터뷰 형식의 유튜브 콘텐츠 썸네일" },
  { src: "/images/video-6.jpg", alt: "시술 현장을 담은 병원 홍보 영상 썸네일" },
];

export function VisualMedia() {
  return (
    <>
      <section className="bg-ice-100 py-20 lg:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>AI Visual Consulting</Eyebrow>
              <p className="mt-5 text-lg font-medium text-navy-950/70">
                병원 브랜딩을 더해주는 맞춤제작
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl lg:text-[2.75rem]">
                트렌드와 기술을 접목한
                <br />
                차별화된 비주얼 기술
                <br />
                <span className="text-navy-600">AI 이미지 컨설팅</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-lg text-base text-navy-950/70">
                병원 마케팅에 최적화된 고퀄리티 AI 이미지를 통해 환자의 시선을 사로잡고
                마케팅 효율을 극대화합니다.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <ul className="mt-8 flex flex-wrap gap-2 text-sm font-semibold text-brand-500">
                {["시술 전후 이미지", "초상권 걱정 없는 콘텐츠", "병의원 전용 스톡"].map(
                  (tag) => (
                    <li key={tag} className="rounded-full bg-white px-4 py-2 shadow-card">
                      {tag}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative mx-auto flex max-w-lg items-end gap-4">
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
              className="mb-6 w-2/5 rounded-lg shadow-card"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Performance Media"
            title="Video Production"
            description="브랜드 스토리텔링을 바탕으로 유튜브 콘텐츠, 바이럴 영상, 숏폼 등 맞춤형 미디어 솔루션을 제공합니다."
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <Reveal
                as="li"
                key={video.src}
                delay={(index % 3) * 90}
                className="group relative overflow-hidden rounded-xl bg-navy-950"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.src}
                    alt={video.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-navy-950/10"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
