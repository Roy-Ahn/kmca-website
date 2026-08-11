import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// 정적 내보내기(output: export)에서도 sitemap.xml 파일을 생성하도록 고정합니다.
export const dynamic = "force-static";

// 사이트는 한 페이지이므로 색인 대상도 하나입니다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", site.url).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
