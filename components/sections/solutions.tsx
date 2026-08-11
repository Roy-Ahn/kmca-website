import {
  BuildingIcon,
  CapIcon,
  ChartIcon,
  CheckIcon,
  ClipboardIcon,
  HandshakeIcon,
  MegaphoneIcon,
  MonitorIcon,
  PinIcon,
  SparkIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Card, Eyebrow, SectionHeading } from "@/components/ui";

const pillars = [
  {
    title: "입지 컨설팅",
    Icon: PinIcon,
    items: ["상권 및 동선 분석", "공간 배치 기획"],
  },
  {
    title: "서비스 교육",
    Icon: CapIcon,
    items: ["직원 CS 상담 교육", "시술 응대 메뉴얼"],
  },
  {
    title: "운영 인프라",
    Icon: ClipboardIcon,
    items: ["의료기관 개설 인허가", "장비 및 소모품 세팅"],
  },
  {
    title: "브랜딩 기획",
    Icon: SparkIcon,
    items: ["메디컬 콘텐츠 제작", "ai모델 및 컨텐츠 개발"],
  },
];

const channels = [
  { label: "플랫폼광고", Icon: ChartIcon },
  { label: "브랜드광고", Icon: BuildingIcon },
  { label: "오프라인광고", Icon: HandshakeIcon },
  { label: "바이럴광고", Icon: MegaphoneIcon },
  { label: "미디어광고", Icon: MonitorIcon },
];

const benefits = [
  "불필요한 마케팅 지출 최소화",
  "정확한 맞춤 타겟팅",
  "데이터 기반 솔루션 제공",
  "합리적인 비용으로 최대 매출달성",
];

export function Solutions() {
  return (
    <>
      <section id="solutions" className="bg-ink-50 py-20 lg:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Opening Consulting"
            title="신규 개원 토탈 솔루션"
            description="지역 상권 분석과 주요 타깃 파악 단계부터 개원 초기 인프라를 완벽히 구축하고 실질적인 성장을 이끌어 드립니다."
          />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={index * 70}>
                <Card interactive className="group h-full p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-card bg-ink-950 text-white transition-colors duration-300 group-hover:bg-brand-500">
                      <pillar.Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span aria-hidden="true" className="text-index text-ink-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-title-3 mt-7 text-ink-950">{pillar.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-ink-600">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={100} className="mt-4">
            <Card className="p-8 sm:p-10">
              <Eyebrow>A to Z Master Plan</Eyebrow>
              <h3 className="text-title-3 mt-5 max-w-xl text-ink-950">
                흩어져 있던 광고 채널을{" "}
                <span className="text-brand-500">하나의 솔루션</span>으로 통합 운영합니다.
              </h3>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {channels.map((channel) => (
                  <li
                    key={channel.label}
                    className="flex items-center gap-2.5 rounded-pill bg-ink-50 py-2.5 pl-3 pr-5"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-500 ring-1 ring-[var(--hairline)]">
                      <channel.Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-bold text-ink-900">{channel.label}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* The one saturated band on the page — it earns the emphasis. */}
      <section className="on-dark bg-brand-600 py-16 text-white lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-title-1">
              광고비는 쓰는데
              <br />
              <span className="text-brand-200">효과는 없다?</span>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-white" />
                  <span className="font-semibold">{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
