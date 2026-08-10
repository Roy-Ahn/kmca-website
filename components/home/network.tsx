import Image from "next/image";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

const facts = [
  { label: "메디컬 마케팅", value: "각 분야 최고 전문가 구성" },
  { label: "병의원 지원", value: "제품 홍보 · 마케팅 · 교육" },
  { label: "학회 · 박람회", value: "국내외 매년 개최" },
];

export function Network() {
  return (
    <section className="relative overflow-hidden bg-ice-100">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Image
          src="/images/network-building.jpg"
          alt="유리 외관의 현대적인 오피스 빌딩"
          fill
          sizes="46vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ice-100 via-ice-100/40 to-transparent" />
      </div>

      <div className="container-page relative py-20 lg:py-28">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Our Network</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold text-navy-950 sm:text-5xl">
              Since <span className="text-brand-500">2015</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-base text-navy-950/70">
              각 분야의 최고 전문가들로 구성돼 최신의 트렌드에 맞게 제품을 홍보하고,
              병의원 마케팅을 지원하며 그에 걸맞는 교육 프로그램을 제공합니다. 또한 국내외
              여러 학회들의 이사진으로 구성된 인프라를 바탕으로 국내외 학회와 박람회를 매년
              개최합니다.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-navy-950/10 sm:grid-cols-3">
            {facts.map((fact, index) => (
              <Reveal
                key={fact.label}
                delay={index * 90}
                className="bg-white/80 p-5 backdrop-blur"
              >
                <dt className="text-xs font-bold uppercase tracking-widest text-brand-500">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-navy-950">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative h-64 lg:hidden">
        <Image
          src="/images/network-building.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
