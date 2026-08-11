import type { MetadataRoute } from "next";
import { navigation, site } from "@/content/site";

// 정적 내보내기(output: export)에서도 sitemap.xml 파일을 생성하도록 고정합니다.
export const dynamic = "force-static";

// 정적 빌드는 trailingSlash 를 쓰므로 sitemap 주소도 같은 형태로 맞춥니다.
const trailingSlash = process.env.NEXT_OUTPUT === "export";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return navigation.map((item) => ({
    url: new URL(
      trailingSlash && !item.href.endsWith("/") ? `${item.href}/` : item.href,
      site.url,
    ).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
