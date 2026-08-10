import Link from "next/link";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[minmax(0,1fr)_auto] lg:py-20">
        <div className="max-w-md">
          <Logo className="text-white" />
          <p className="mt-5 text-sm leading-relaxed">
            {site.legalName}는 국내외 메디컬 마케팅과 교육, 개원 컨설팅, 미디어 제작까지
            성과 중심의 솔루션을 제공합니다.
          </p>

          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-semibold text-white/45">주소</dt>
              <dd className="text-white/80">
                {site.address.road} {site.address.detail}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-semibold text-white/45">대표자</dt>
              <dd className="text-white/80">{site.ceo}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-semibold text-white/45">문의</dt>
              <dd>
                <a href={site.phoneHref} className="text-white/80 hover:text-white">
                  {site.phone}
                </a>
                <span className="ml-2 text-white/45">({site.hours})</span>
              </dd>
            </div>
          </dl>
        </div>

        <nav aria-label="푸터 메뉴">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Sitemap
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3 text-sm md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.address.lot}</p>
          <p>Copyright © {site.shortName}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
