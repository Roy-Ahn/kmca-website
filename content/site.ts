/**
 * Canonical origin used for metadata, sitemap and JSON-LD.
 * www 주소가 대표입니다 (kmcaedu.co.kr 은 www 로 리다이렉트).
 * 다른 호스트에서 확인할 때는 NEXT_PUBLIC_SITE_URL 로 덮어씁니다.
 */
export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  return "https://www.kmcaedu.co.kr";
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

/**
 * 사이트는 한 페이지입니다. 메뉴는 페이지 안의 섹션으로 이동합니다.
 * `id` 는 각 섹션의 앵커이며 헤더의 현재 위치 표시에도 그대로 쓰입니다.
 */
export const navigation = [
  { id: "about", label: "About", labelKo: "소개" },
  { id: "business", label: "Business", labelKo: "사업분야" },
  { id: "solutions", label: "Solutions", labelKo: "개원 솔루션" },
  { id: "global", label: "Global", labelKo: "글로벌·학회" },
  { id: "media", label: "Media", labelKo: "미디어" },
  { id: "contact", label: "Contact", labelKo: "오시는 길" },
] as const;
