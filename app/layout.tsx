import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-kr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 메디컬 마케팅 · 교육 · 국내외 학회`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "한국메디코스아카데미",
    "KMCA",
    "메디컬 마케팅",
    "병원 마케팅",
    "개원 컨설팅",
    "의료기기 마케팅",
    "해외 환자 유치",
    "글로벌 학회",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: [site.shortName, site.nameEn],
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  foundingDate: String(site.since),
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.road} ${site.address.detail}`,
    addressLocality: "송파구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    contactType: "customer service",
    areaServed: ["KR", "CN"],
    availableLanguage: ["ko", "en"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className="bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          본문 바로가기
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
