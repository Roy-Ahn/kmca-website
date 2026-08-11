import { IMAGE_WIDTHS } from "./image-widths.mjs";

/**
 * 정적 빌드(output: export) 전용 이미지 로더.
 *
 * scripts/optimize-images.mjs 가 미리 만들어 둔 WebP 중에서 요청한 너비 이상인
 * 가장 작은 파일을 고릅니다. 변환 서버가 없는 Cafe24 웹호스팅에서도 화면 크기에
 * 맞는 이미지를 내려받게 됩니다.
 */
export default function staticImageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/") || src.startsWith("/images/opt/") || src.endsWith(".svg")) {
    return src;
  }

  const target = IMAGE_WIDTHS.find((candidate) => candidate >= width) ?? IMAGE_WIDTHS.at(-1);
  const name = src.slice("/images/".length).replace(/\.[^.]+$/, "");

  return `/images/opt/${name}-${target}.webp`;
}
