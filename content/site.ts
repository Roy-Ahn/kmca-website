/**
 * Canonical origin used for metadata, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL once the production domain is decided; on Vercel the
 * production hostname is picked up automatically.
 */
export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
})();

export const site = {
  name: "한국메디코스아카데미",
  shortName: "KMCA",
  nameEn: "Korea Medicos Academy",
  legalName: "(주)한국메디코스아카데미",
  tagline: "메디컬 전문 NO.1 마케팅",
  description:
    "한국메디코스아카데미는 메디컬 마케팅과 교육을 제공하며 국내외 학회와 박람회를 주최합니다. 전략적 마케팅으로 병원 성과를 극대화하세요.",
  url: siteUrl,
  since: 2015,
  ceo: "김윤정",
  phone: "010-9113-9786",
  phoneHref: "tel:+82-10-9113-9786",
  hours: "365일 상담 문의 가능",
  address: {
    road: "서울특별시 송파구 위례성대로 6",
    detail: "현대토픽스 3층",
    lot: "서울시 송파구 방이동 44-3 현대토픽스 3층",
  },
  mapQuery: "서울특별시 송파구 위례성대로 6 현대토픽스 3층",
} as const;

export const navigation = [
  { href: "/", label: "Home", labelKo: "홈" },
  { href: "/business", label: "Business Areas", labelKo: "주요사업분야" },
  { href: "/consulting", label: "Opening Consulting", labelKo: "토탈솔루션" },
  { href: "/global", label: "Global Expansion", labelKo: "글로벌 마케팅" },
  { href: "/history", label: "KMCA History", labelKo: "히스토리" },
  { href: "/contact", label: "Contact Us", labelKo: "오시는 길" },
] as const;
