import Image from "next/image";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";
import { site } from "@/content/site";

export function Closing() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink-950 py-24 lg:py-36">
      <Image
        src="/images/earth-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-ink-950/40 to-ink-950"
      />

      <div className="container-page relative flex flex-col items-center text-center">
        <Reveal>
          <p className="text-title-1 text-white">
            국내를 넘어 해외까지
            <br />
            <span className="text-brand-300">메디컬 전문 NO.1 마케팅</span>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-lede mt-7 max-w-xl text-ink-300">
            최적화된 맞춤 전략으로 <span className="font-bold text-white">브랜딩부터
            환자유입</span>까지 확실한 성과를 만듭니다.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-11 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact" tone="dark" arrow>
            상담 문의하기
          </ButtonLink>
          <ButtonLink href={site.phoneHref} tone="dark" variant="outline">
            {site.phone}
          </ButtonLink>
        </Reveal>
        <Reveal delay={200} className="mt-16">
          <Logo className="text-white/70" />
        </Reveal>
      </div>
    </section>
  );
}
