/**
 * Cafe24 웹호스팅 같은 정적 호스팅용 빌드 스크립트.
 *
 * `next build` 를 정적 내보내기 모드로 실행한 뒤, Apache 설정 파일을
 * out/.htaccess 로 복사합니다. out/ 폴더 전체를 FTP로 올리면 배포가 끝납니다.
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const optimize = spawnSync(process.execPath, [path.join(root, "scripts", "optimize-images.mjs")], {
  cwd: root,
  stdio: "inherit",
});

if (optimize.status !== 0) {
  process.exit(optimize.status ?? 1);
}

const build = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NEXT_OUTPUT: "export" },
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const outDir = path.join(root, "out");
if (!existsSync(outDir)) {
  console.error("빌드 결과 폴더(out/)를 찾을 수 없습니다.");
  process.exit(1);
}

copyFileSync(path.join(root, "deploy", "htaccess"), path.join(outDir, ".htaccess"));

console.log("\n정적 빌드 완료: out/ 폴더의 모든 파일(.htaccess 포함)을 FTP로 업로드하세요.");
