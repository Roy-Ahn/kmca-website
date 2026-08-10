import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      <Image
        src="/images/earth-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"
      />

      <div className="container-page relative text-center">
        <Reveal>
          <p className="text-2xl font-bold text-white sm:text-4xl">
            국내를 넘어 해외까지!
            <br />
            <span className="text-brand-400">메디컬 전문 NO.1 마케팅</span>
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8 text-lg text-white/90 sm:text-2xl">
            최적화된 맞춤 전략으로
            <br />
            <span className="font-bold text-accent-coral">
              &lsquo;브랜딩부터 환자유입&rsquo;
            </span>
            까지
            <br />
            확실한 성과를 만듭니다
          </p>
        </Reveal>
        <Reveal delay={180} className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-950 transition hover:bg-navy-50"
          >
            상담 문의하기
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
          >
            {site.phone}
          </a>
        </Reveal>
        <Reveal delay={240} className="mt-14 flex justify-center">
          <Logo className="scale-125 text-white" />
        </Reveal>
      </div>
    </section>
  );
}
