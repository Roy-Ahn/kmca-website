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
  { left: "50%", top: "10%" },
  { left: "88%", top: "38%" },
  { left: "73%", top: "83%" },
  { left: "27%", top: "83%" },
  { left: "12%", top: "38%" },
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
      <section className="bg-ice-50 py-20 lg:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>A to Z Master Plan</Eyebrow>
              <p className="mt-5 text-lg font-medium text-navy-950/70">
                병원 마케팅, A to Z 마스터 플랜
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl lg:text-[2.75rem]">
                브랜딩부터 환자유입까지
                <br />
                <span className="text-navy-600">메디컬 전문 마케팅</span>
                <br />
                토탈 솔루션
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-8 space-y-3 text-base text-navy-950/80">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    실제 내원 유입으로 직결되는{" "}
                    <strong className="font-bold text-accent-coral">메디컬 핵심 항목</strong>
                    만 정밀하게 구성
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    오랜 마케팅 노하우를 갖춘{" "}
                    <strong className="font-bold text-accent-coral">전담팀</strong>이 맞춤
                    플랜을 수립
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {/* Radial diagram on large screens, simple grid on small ones. */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block lg:max-w-lg">
              <div
                aria-hidden="true"
                className="absolute inset-[14%] rounded-full border border-dashed border-navy-300/70"
              />
              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-card ring-1 ring-navy-200">
                <span className="text-base font-bold text-navy-950/70">광고</span>
                <span className="text-base font-bold text-navy-950/70">솔루션</span>
              </div>
              {channels.map((channel, index) => (
                <div
                  key={channel.label}
                  style={nodePositions[index]}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-card lg:h-20 lg:w-20">
                    <channel.Icon className="h-7 w-7 lg:h-8 lg:w-8" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-semibold text-navy-950">
                    {channel.label}
                  </span>
                </div>
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:hidden">
              {channels.map((channel) => (
                <li
                  key={channel.label}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <channel.Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy-950">
                    {channel.label}
                  </span>
                </li>
              ))}
              <li className="col-span-2 rounded-xl bg-navy-900 p-4 text-center text-sm font-bold text-white">
                광고 솔루션
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-900 py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(27,71,207,0.6),transparent_55%)]"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span aria-hidden="true" className="block h-1 w-14 rounded bg-white" />
            <p className="mt-6 text-3xl font-bold leading-snug text-white sm:text-4xl">
              광고비는 쓰는데
              <br />
              <span className="text-accent-cyan">효과는 없다?</span>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <svg
              viewBox="0 0 48 32"
              aria-hidden="true"
              className="h-8 w-12 fill-white/35"
            >
              <path d="M0 32V17.6C0 7.9 5.9 1.6 17 0l1.9 5.4C13 7.2 10 10.6 9.6 15.2H18V32H0Zm30 0V17.6C30 7.9 35.9 1.6 47 0l1.9 5.4C43 7.2 40 10.6 39.6 15.2H48V32H30Z" />
            </svg>
            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-lg text-white">
                  <CheckIcon className="h-5 w-5 shrink-0 text-accent-cyan" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
