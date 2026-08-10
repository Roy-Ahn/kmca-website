import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

const devices = [
  {
    name: "울쎄라피 프라임",
    image: "/images/device-ulthera.png",
    features: ["프리미엄 리프팅 라인", "1:1 커스텀 리프팅", "턱선 및 이중턱/윤곽정리/광대"],
    tags: ["#올인원시술", "#정확한타겟팅"],
  },
  {
    name: "리팟레이저",
    image: "/images/device-repot.png",
    features: ["1회만에 흑자 검버섯 제거!", "신개념 ai 흑자치료 레이저", "기미/잡티/흑자/색소침착"],
    tags: ["#빠른색소파괴", "#통증부담완화"],
  },
  {
    name: "버츄 RF 리프팅",
    image: "/images/device-virtue.png",
    features: ["피부 속 깊이 섬세한 고주파 전달", "차세대 마이크로니들 RF", "모공 축소/흉터 케어/잔주름 개선"],
    tags: ["#통증감소쿨링", "#맞춤미세침케어"],
  },
  {
    name: "슈링크 유니버스",
    image: "/images/device-shrink.png",
    features: ["기존 슈링크 리프팅의 버전", "고강도 집속초음파", "페이스라인/처진눈가/잔주름"],
    tags: ["#통증최소화", "#빠른일상복귀"],
  },
];

export function MedTech() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="MedTech Marketing"
          title={
            <>
              국내 <span className="text-navy-600">의료기기</span> 마케팅
            </>
          }
          description="최고의 의료기기를 만드는 것은 제조사의 기술력이지만, 그 가치를 병의원 현장에 완벽히 각인시키는 것은 마케팅 전문가의 역할입니다."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {devices.map((device, index) => (
            <Reveal
              as="li"
              key={device.name}
              delay={(index % 2) * 90}
              className="flex flex-col gap-5 rounded-2xl border border-navy-950/8 bg-ice-50 p-5 transition duration-300 hover:border-brand-400/40 hover:shadow-card sm:flex-row sm:items-center"
            >
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-white sm:w-40">
                <Image
                  src={device.image}
                  alt={`${device.name} 장비`}
                  fill
                  sizes="(min-width: 640px) 160px, 90vw"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold text-navy-600">{device.name}</h3>
                <ul className="mt-4 space-y-1 border-t border-navy-950/10 pt-4 text-sm text-navy-950/75">
                  {device.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap gap-2 border-t border-navy-950/10 pt-4 text-xs font-semibold text-brand-500">
                  {device.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-500/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
