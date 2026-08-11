import type { Metadata } from "next";
import { PinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Card, Eyebrow, PageHero, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CONTACT US",
  description:
    "서울 송파구에 위치한 한국메디코스아카데미 연락처와 오시는 길 안내. 365일 상담 가능, 언제든 문의하세요.",
  alternates: { canonical: "/contact" },
};

const details = [
  { label: "도로명 주소", value: `${site.address.road} ${site.address.detail}` },
  { label: "지번 주소", value: site.address.lot },
  { label: "대표자", value: site.ceo },
  { label: "상담 시간", value: site.hours },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&hl=ko&z=17&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="한국 메디코스 아카데미 오시는 길"
        description={
          <p>
            <span className="font-semibold text-white">
              &ldquo;언제나 고객 입장에서 최선을 다합니다&rdquo;
            </span>{" "}
            <span className="text-ink-400">({site.hours})</span>
          </p>
        }
      />

      <Section className="bg-ink-50">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-4">
            <Reveal>
              <a
                href={site.phoneHref}
                className="group flex items-center justify-between gap-4 rounded-card bg-ink-950 p-7 text-white transition-colors duration-200 hover:bg-brand-600"
              >
                <span>
                  <Eyebrow tone="dark">Call</Eyebrow>
                  <span className="mt-3 block text-title-2">{site.phone}</span>
                </span>
                <span className="shrink-0 text-sm text-white/60 transition-colors group-hover:text-white">
                  전화하기
                </span>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <Card className="p-7">
                <dl className="divide-y divide-[var(--hairline)]">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                      <dt className="w-24 shrink-0 text-sm font-semibold text-ink-400">
                        {detail.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink-900">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>

            <Reveal delay={140}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-[var(--hairline)] bg-white px-6 py-3.5 text-sm font-bold text-ink-900 transition-colors duration-200 hover:border-ink-300 hover:bg-white"
              >
                <PinIcon aria-hidden="true" className="h-4 w-4 text-brand-500" />
                지도 앱에서 열기
              </a>
            </Reveal>
          </div>

          <Reveal
            delay={60}
            className="overflow-hidden rounded-card border border-[var(--hairline)]"
          >
            <iframe
              src={mapSrc}
              title={`${site.name} 위치 지도`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[32rem]"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
