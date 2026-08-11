import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// 정적 내보내기(output: export)에서도 robots.txt 파일을 생성하도록 고정합니다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
