# 한국메디코스아카데미 (KMCA) 공식 웹사이트

메디컬 마케팅·교육 브랜드 **한국메디코스아카데미**의 공식 웹사이트입니다.
기존 Canva 사이트(`kmca.my.canva.site`)의 내용을 그대로 옮기되, 반응형·접근성·SEO를
갖춘 Next.js 사이트로 새로 디자인했습니다.

## 기술 스택

| 항목 | 사용 기술 |
| --- | --- |
| 프레임워크 | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| 언어 | TypeScript, React 19 |
| 스타일 | Tailwind CSS v4 (`app/globals.css`의 `@theme`에 디자인 토큰 정의) |
| 폰트 | `next/font` – Inter (라틴) + Noto Sans KR (한글) 자체 호스팅 |
| 이미지 | `next/image` (AVIF/WebP 자동 변환) |

## 실행 방법

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # 프로덕션 빌드 (Node.js 서버 / Vercel용)
npm start             # 빌드 결과 실행
npm run build:static  # 정적 파일 빌드 (Cafe24 웹호스팅용) → out/
npm run lint          # 린트
```

Node.js 20 이상을 권장합니다.

## 배포

**Vercel에 배포되어 있습니다.** `main` 브랜치에 push하면 자동으로 재배포됩니다.
현재 주소는 [kmca-website.vercel.app](https://kmca-website.vercel.app) 이며,
`www.kmcaedu.co.kr` 연결은 DNS 설정만 남아 있습니다.
단계별 안내는 **[DEPLOY.md](./DEPLOY.md)** 를 참고하세요.

| 방법 | 명령 | 특징 |
| --- | --- | --- |
| Vercel (사용 중) | `npm run build` (자동) | push하면 자동 배포, 이미지 실시간 최적화, SSL 자동 |
| Cafe24 웹호스팅 | `npm run build:static` | `out/` 폴더를 FTP 업로드. Node.js가 없는 환경용 대안 |

정적 빌드는 `output: "export"` 모드로 동작하며 다음이 함께 처리됩니다.

- `scripts/optimize-images.mjs` 가 `public/images` 사진을 너비별 WebP로 미리 생성 (`image-loader.ts` 가 선택)
- `deploy/htaccess` 를 `out/.htaccess` 로 복사 — Apache에서 301 리다이렉트·HTTPS 전환·캐시 설정을 담당

## 페이지 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 히어로, Since 2015 소개, 주요 사업분야, A to Z 마스터 플랜, 의료기기 마케팅, 글로벌 학회, AI 이미지·영상 제작, 상담 CTA |
| `/business` | 분야별 주요사업 소개 (국내마케팅 / 글로벌 비즈니스 / ETC) |
| `/consulting` | 신규 개원 토탈 솔루션 (입지·교육·인프라·브랜딩) |
| `/global` | 글로벌 현지 진출 및 단계별 프로세스 |
| `/history` | KMCA 히스토리 갤러리, 병의원 채널 운영 사례 |
| `/contact` | 연락처, 주소, 지도 |

이전 Canva 사이트의 주소는 새 경로로 301 리다이렉트됩니다.
서버 모드에서는 `next.config.ts`의 `redirects()`가, 정적 빌드에서는 `deploy/htaccess`가 처리합니다.

```
/page-2      → /business
/page-3      → /consulting
/-           → /global
/contact-us  → /contact
```

## 디렉터리 구조

```
app/                라우트, 레이아웃, 메타데이터, sitemap/robots
components/         공용 UI 컴포넌트
components/home/    홈 화면 섹션 컴포넌트
content/site.ts     회사 정보·연락처·내비게이션 등 사이트 상수
lib/                유틸리티
public/images/      사진 및 그래픽 에셋
scripts/            정적 빌드·이미지 최적화 스크립트
deploy/htaccess     정적 호스팅(Apache)용 서버 설정
```

## 콘텐츠 수정 가이드

- 회사명, 주소, 전화번호, 대표자, 내비게이션 메뉴는 `content/site.ts` 한 곳에서 관리합니다.
- 각 섹션의 문구와 카드 목록은 해당 컴포넌트 상단의 배열 상수(`areas`, `devices`, `pillars` 등)에
  정리되어 있어 마크업을 건드리지 않고 수정할 수 있습니다.
- 이미지 교체 시 `public/images/`에 같은 이름으로 덮어쓰거나, 새 파일을 추가한 뒤
  컴포넌트의 `src` 값을 변경하면 됩니다.

## 접근성·SEO 참고사항

- 모든 이미지에 설명형 `alt`를 제공하고, 장식용 이미지는 빈 `alt`로 처리했습니다.
- 스크롤 애니메이션은 `prefers-reduced-motion` 설정을 존중합니다.
- 키보드 사용자를 위한 "본문 바로가기" 링크와 포커스 스타일을 제공합니다.
- 페이지별 메타데이터, Open Graph 이미지(`app/opengraph-image.jpg`), `sitemap.xml`, `robots.txt`,
  조직 정보 JSON-LD를 포함합니다.

## 환경 변수

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트의 정식 도메인. canonical URL, Open Graph, `sitemap.xml`에 사용됩니다. |

설정하지 않으면 `https://www.kmcaedu.co.kr` 을 사용합니다(대표 주소는 www이고,
`kmcaedu.co.kr` 은 www로 리다이렉트됩니다). 임시 도메인에서 확인하거나 대표 주소를
바꿀 때만 값을 지정하세요. 예시는 `.env.example`을 참고하세요.
