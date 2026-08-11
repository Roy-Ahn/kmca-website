import type { NextConfig } from "next";

import { IMAGE_WIDTHS } from "./image-widths.mjs";

/**
 * Cafe24 웹호스팅처럼 Node.js를 실행할 수 없는 정적 호스팅에 올릴 때는
 * `npm run build:static`으로 빌드해 `out/` 폴더를 업로드합니다.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

// 이전 Canva 사이트 주소를 새 경로로 연결합니다.
// 정적 빌드에서는 Next.js가 리다이렉트를 처리할 수 없으므로 deploy/htaccess가 대신합니다.
const legacyRedirects = [
  { source: "/page-2", destination: "/business", permanent: true },
  { source: "/page-3", destination: "/consulting", permanent: true },
  { source: "/-", destination: "/global", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: "export",
        // Apache가 /business/index.html을 바로 찾을 수 있도록 디렉터리 형태로 출력합니다.
        trailingSlash: true,
        images: {
          // 정적 호스팅에는 이미지 변환 서버가 없으므로 빌드 때 만들어 둔 WebP를 씁니다.
          loader: "custom",
          loaderFile: "./image-loader.ts",
          deviceSizes: IMAGE_WIDTHS.filter((width) => width >= 640),
          imageSizes: IMAGE_WIDTHS.filter((width) => width < 640),
        },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async redirects() {
          return legacyRedirects;
        },
      }),
};

export default nextConfig;
