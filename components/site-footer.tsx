import Link from "next/link";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20 lg:py-20">
        <div className="max-w-md">
          <Logo className="text-ink-950" />
          <p className="mt-5 text-sm leading-relaxed text-ink-600">
            {site.legalName}는 국내외 메디컬 마케팅과 교육, 개원 컨설팅, 미디어 제작까지
            성과 중심의 솔루션을 제공합니다.
          </p>

          <dl className="mt-8 space-y-2.5 text-sm">
            <div className="flex gap-4">
              <dt className="w-14 shrink-0 font-semibold text-ink-400">주소</dt>
              <dd className="text-ink-700">
                {site.address.road} {site.address.detail}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-14 shrink-0 font-semibold text-ink-400">대표자</dt>
              <dd className="text-ink-700">{site.ceo}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-14 shrink-0 font-semibold text-ink-400">문의</dt>
              <dd className="text-ink-700">
                <a href={site.phoneHref} className="font-semibold hover:text-brand-600">
                  {site.phone}
                </a>
                <span className="ml-2 text-ink-400">({site.hours})</span>
              </dd>
            </div>
          </dl>
        </div>

        <nav aria-label="푸터 메뉴">
          <h2 className="text-eyebrow text-ink-400">Sitemap</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium text-ink-700 md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-[var(--hairline)]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.address.lot}</p>
          <p>Copyright © {site.shortName}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
