/**
 * 정적 호스팅용 반응형 이미지 생성기.
 *
 * Vercel 등에서는 Next.js가 요청 시점에 이미지를 변환하지만, Cafe24 웹호스팅처럼
 * 정적 파일만 서빙하는 환경에서는 변환기가 없습니다. 그래서 빌드 시점에
 * public/images 의 사진들을 너비별 WebP로 미리 만들어 두고,
 * image-loader.ts 가 화면 크기에 맞는 파일을 골라 쓰도록 합니다.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { IMAGE_WIDTHS } from "../image-widths.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "public", "images");
const outputDir = path.join(sourceDir, "opt");

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const entries = await readdir(sourceDir, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

await mkdir(outputDir, { recursive: true });

let written = 0;
let bytes = 0;

for (const file of files) {
  const base = path.basename(file, path.extname(file));
  const input = sharp(path.join(sourceDir, file));

  for (const width of IMAGE_WIDTHS) {
    // withoutEnlargement 덕분에 원본보다 큰 너비를 요청해도 확대되지 않습니다.
    // 파일 자체는 항상 만들어 두어야 로더가 만든 주소가 404 나지 않습니다.
    const info = await input
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(outputDir, `${base}-${width}.webp`));

    written += 1;
    bytes += info.size;
  }
}

// 업로드 대상에서 원본이 빠지지 않도록 생성 목록을 남깁니다.
await writeFile(
  path.join(outputDir, "manifest.json"),
  `${JSON.stringify({ widths: IMAGE_WIDTHS, sources: files.sort() }, null, 2)}\n`,
);

console.log(
  `이미지 ${files.length}장 → WebP ${written}개 생성 (${(bytes / 1024 / 1024).toFixed(1)}MB)`,
);
