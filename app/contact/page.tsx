import type { Metadata } from "next";
import { PinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { PageHero, Section } from "@/components/ui";
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
          <p className="text-lg font-semibold text-[#ffec87]">
            &ldquo;언제나 고객 입장에서 최선을 다합니다&rdquo;{" "}
            <span className="font-normal text-navy-100/80">( {site.hours} )</span>
          </p>
        }
      />

      <Section className="bg-ice-50">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <Reveal>
              <a
                href={site.phoneHref}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-navy-900 p-7 text-white transition hover:bg-navy-950"
              >
                <span>
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent-cyan">
                    Call
                  </span>
                  <span className="mt-2 block text-2xl font-extrabold sm:text-3xl">
                    {site.phone}
                  </span>
                </span>
                <span className="text-sm text-white/60 transition group-hover:text-white">
                  전화하기
                </span>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-6 divide-y divide-navy-950/8 rounded-2xl bg-white p-7 shadow-card">
                {details.map((detail) => (
                  <div key={detail.label} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                    <dt className="w-24 shrink-0 text-sm font-bold text-navy-950/45">
                      {detail.label}
                    </dt>
                    <dd className="text-sm font-medium text-navy-950">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy-950 shadow-card transition hover:shadow-card-hover"
              >
                <PinIcon className="h-4 w-4 text-brand-500" />
                지도 앱에서 열기
              </a>
            </Reveal>
          </div>

          <Reveal delay={80} className="overflow-hidden rounded-2xl shadow-card">
            <iframe
              src={mapSrc}
              title={`${site.name} 위치 지도`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full lg:min-h-[520px]"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
