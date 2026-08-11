import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

const details = [
  { label: "도로명 주소", value: `${site.address.road} ${site.address.detail}` },
  { label: "지번 주소", value: site.address.lot },
  { label: "대표자", value: site.ceo },
  { label: "문의", value: site.phone },
  { label: "상담 시간", value: site.hours },
];

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&hl=ko&z=17&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export function Contact() {
  return (
    <section id="contact" className="on-dark relative isolate overflow-hidden bg-ink-950">
      <Image
        src="/images/earth-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-70"
      />
      {/* The photograph is only atmosphere; the copy on top has to stay legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/80 to-ink-950"
      />

      <div className="container-page py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark">Contact Us</Eyebrow>
          <h2 className="text-title-1 mt-6 text-white">
            국내를 넘어 해외까지
            <br />
            <span className="text-brand-300">메디컬 전문 NO.1 마케팅</span>
          </h2>
          <p className="text-lede mt-6 max-w-xl text-ink-300">
            최적화된 맞춤 전략으로{" "}
            <span className="font-bold text-white">브랜딩부터 환자유입</span>까지 확실한
            성과를 만듭니다. 병의원 상황에 맞는 플랜을 제안해 드립니다.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={site.phoneHref} tone="dark">
            {site.phone} 상담하기
          </ButtonLink>
          <ButtonLink
            href={mapLink}
            tone="dark"
            variant="outline"
            target="_blank"
            rel="noreferrer"
            arrow
          >
            지도 앱에서 열기
          </ButtonLink>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            {/* The rows spread to the map's height so the two columns end level. */}
            <dl className="flex h-full flex-col justify-between rounded-card border border-[var(--hairline-invert)] bg-white/5 p-7 backdrop-blur-sm">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-1 border-b border-[var(--hairline-invert)] py-4 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:gap-5"
                >
                  <dt className="w-24 shrink-0 text-sm font-semibold text-ink-300">
                    {detail.label}
                  </dt>
                  <dd className="text-sm font-medium text-white">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={60}
            className="overflow-hidden rounded-card border border-[var(--hairline-invert)]"
          >
            <iframe
              src={mapEmbed}
              title={`${site.name} 위치 지도`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0 lg:h-full lg:min-h-[24rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
