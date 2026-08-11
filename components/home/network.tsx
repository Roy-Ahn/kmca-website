import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

const facts = [
  { label: "메디컬 마케팅", value: "각 분야 최고 전문가 구성" },
  { label: "병의원 지원", value: "제품 홍보 · 마케팅 · 교육" },
  { label: "학회 · 박람회", value: "국내외 매년 개최" },
];

export function Network() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src="/images/network-building.jpg"
              alt="유리 외관의 현대적인 오피스 빌딩"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <Eyebrow>Our Network</Eyebrow>
            <h2 className="text-title-1 mt-5 text-ink-950">
              Since <span className="text-brand-500">2015</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lede mt-6 max-w-xl text-ink-600">
              각 분야의 최고 전문가들로 구성돼 최신의 트렌드에 맞게 제품을 홍보하고,
              병의원 마케팅을 지원하며 그에 걸맞는 교육 프로그램을 제공합니다. 또한 국내외
              여러 학회들의 이사진으로 구성된 인프라를 바탕으로 국내외 학회와 박람회를 매년
              개최합니다.
            </p>
          </Reveal>

          <dl className="mt-12 border-t border-[var(--hairline)]">
            {facts.map((fact, index) => (
              <Reveal
                key={fact.label}
                delay={index * 70}
                className="flex flex-col gap-1 border-b border-[var(--hairline)] py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="text-eyebrow shrink-0 pt-1 text-brand-500 sm:w-44">
                  {fact.label}
                </dt>
                <dd className="text-title-3 text-ink-900">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
