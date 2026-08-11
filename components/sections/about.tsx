import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

const facts = [
  { label: "메디컬 마케팅", value: "각 분야 최고 전문가 구성" },
  { label: "병의원 지원", value: "제품 홍보 · 마케팅 · 교육" },
  { label: "학회 · 박람회", value: "국내외 매년 개최" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50/80 via-brand-50/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="grad-drift pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl"
      />

      <div className="container-page relative max-w-3xl">
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
    </section>
  );
}
