import {
  BuildingIcon,
  ChartIcon,
  CheckIcon,
  HandshakeIcon,
  MegaphoneIcon,
  MonitorIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

const channels = [
  { label: "플랫폼광고", Icon: ChartIcon },
  { label: "브랜드광고", Icon: BuildingIcon },
  { label: "오프라인광고", Icon: HandshakeIcon },
  { label: "바이럴광고", Icon: MegaphoneIcon },
  { label: "미디어광고", Icon: MonitorIcon },
];

// Pentagon layout, starting at 12 o'clock and stepping 72°.
const nodePositions = [
  { left: "50%", top: "8%" },
  { left: "90%", top: "38%" },
  { left: "73%", top: "86%" },
  { left: "27%", top: "86%" },
  { left: "10%", top: "38%" },
];

const benefits = [
  "불필요한 마케팅 지출 최소화",
  "정확한 맞춤 타겟팅",
  "데이터 기반 솔루션 제공",
  "합리적인 비용으로 최대 매출달성",
];

export function MasterPlan() {
  return (
    <>
      <section className="bg-ink-50 py-20 lg:py-32">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>A to Z Master Plan</Eyebrow>
              <p className="mt-5 font-medium text-ink-500">병원 마케팅, A to Z 마스터 플랜</p>
              <h2 className="text-title-2 mt-3 text-ink-950">
                브랜딩부터 환자유입까지
                <br />
                <span className="text-brand-500">메디컬 전문 마케팅</span>
                <br />
                토탈 솔루션
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-9 space-y-4 border-t border-[var(--hairline)] pt-8">
                <li className="flex gap-3.5 text-ink-700">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-brand-500"
                  />
                  <span>
                    실제 내원 유입으로 직결되는{" "}
                    <strong className="font-bold text-ink-950">메디컬 핵심 항목</strong>만
                    정밀하게 구성
                  </span>
                </li>
                <li className="flex gap-3.5 text-ink-700">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-brand-500"
                  />
                  <span>
                    오랜 마케팅 노하우를 갖춘{" "}
                    <strong className="font-bold text-ink-950">전담팀</strong>이 맞춤 플랜을
                    수립
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={100}>
            {/* Radial diagram on large screens, simple list on small ones. */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[26rem] sm:block">
              <div
                aria-hidden="true"
                className="absolute inset-[16%] rounded-full border border-dashed border-ink-300"
              />
              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink-950 text-center">
                <span className="text-sm font-bold text-white">광고</span>
                <span className="text-sm font-bold text-white">솔루션</span>
              </div>
              {channels.map((channel, index) => (
                <div
                  key={channel.label}
                  style={nodePositions[index]}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-500 shadow-raise ring-1 ring-[var(--hairline)]">
                    <channel.Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-bold text-ink-800">
                    {channel.label}
                  </span>
                </div>
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-2.5 sm:hidden">
              {channels.map((channel) => (
                <li
                  key={channel.label}
                  className="flex items-center gap-3 rounded-card border border-[var(--hairline)] bg-white p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                    <channel.Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold text-ink-900">{channel.label}</span>
                </li>
              ))}
              <li className="col-span-2 rounded-card bg-ink-950 p-4 text-center text-sm font-bold text-white">
                광고 솔루션
              </li>
            </ul>
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
