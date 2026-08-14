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
프로덕션 주소는 [www.kmcaedu.co.kr](https://www.kmcaedu.co.kr) 이며,
백업 URL은 [kmca-website.vercel.app](https://kmca-website.vercel.app) 입니다.
네임서버는 Vercel DNS입니다. 메일(MX) 복구와 apex→www 안내는
**[DEPLOY.md](./DEPLOY.md)** 를 참고하세요.

| 방법 | 명령 | 특징 |
| --- | --- | --- |
| Vercel (사용 중) | `npm run build` (자동) | push하면 자동 배포, 이미지 실시간 최적화, SSL 자동 |
| Cafe24 웹호스팅 | `npm run build:static` | `out/` 폴더를 FTP 업로드. Node.js가 없는 환경용 대안 |

정적 빌드는 `output: "export"` 모드로 동작하며 다음이 함께 처리됩니다.

- `scripts/optimize-images.mjs` 가 `public/images` 사진을 너비별 WebP로 미리 생성 (`image-loader.ts` 가 선택)
- `deploy/htaccess` 를 `out/.htaccess` 로 복사 — Apache에서 301 리다이렉트·HTTPS 전환·캐시 설정을 담당

## 페이지 구성

사이트는 **한 페이지**입니다. 모든 내용이 `/` 하나에 담기고, 메뉴는 페이지 안의
섹션으로 스크롤합니다. 각 섹션은 `components/sections/` 의 컴포넌트 하나에 대응합니다.

| 앵커 | 섹션 | 내용 |
| --- | --- | --- |
| `#top` | Hero | 브랜드 소개와 상담 CTA |
| `#about` | About | Since 2015 회사 소개 |
| `#business` | Business | 주요 사업분야 4개와 세부 서비스, 의료기기 마케팅 |
| `#solutions` | Solutions | 신규 개원 토탈 솔루션, 광고 채널 통합 운영 |
| `#global` | Global | 글로벌 진출 단계, 해외 학회·박람회 갤러리 |
| `#media` | Media | AI 이미지 컨설팅, 영상 제작, 채널 운영 |
| `#contact` | Contact | 연락처, 주소, 지도 |

이전 Canva 사이트 주소와 예전 하위 페이지 주소는 모두 해당 섹션으로 301
리다이렉트됩니다. 서버 모드에서는 `next.config.ts`의 `redirects()`가, 정적
빌드에서는 `deploy/htaccess`가 처리합니다.

```
/page-2, /business    → /#business
/page-3, /consulting  → /#solutions
/-, /global, /history → /#global
/contact-us, /contact → /#contact
```

## 디렉터리 구조

```
app/                단일 페이지, 레이아웃, 메타데이터, sitemap/robots
components/         헤더·푸터 등 공용 UI 컴포넌트
components/sections/ 페이지를 이루는 섹션 컴포넌트
content/site.ts     회사 정보·연락처·섹션 메뉴 등 사이트 상수
lib/                유틸리티
public/images/      사진 및 그래픽 에셋
scripts/            정적 빌드·이미지 최적화 스크립트
deploy/htaccess     정적 호스팅(Apache)용 서버 설정
```

## 콘텐츠 수정 가이드

- 회사명, 주소, 전화번호, 대표자, 섹션 메뉴는 `content/site.ts` 한 곳에서 관리합니다.
  메뉴 항목의 `id` 는 섹션의 앵커(`<section id="...">`)와 같아야 합니다.
- 각 섹션의 문구와 카드 목록은 해당 컴포넌트 상단의 배열 상수(`areas`, `devices`, `pillars` 등)에
  정리되어 있어 마크업을 건드리지 않고 수정할 수 있습니다.
- 이미지 교체 시 `public/images/`에 같은 이름으로 덮어쓰거나, 새 파일을 추가한 뒤
  컴포넌트의 `src` 값을 변경하면 됩니다.

## 접근성·SEO 참고사항

- 모든 이미지에 설명형 `alt`를 제공하고, 장식용 이미지는 빈 `alt`로 처리했습니다.
- 스크롤 애니메이션은 `prefers-reduced-motion` 설정을 존중합니다.
- 키보드 사용자를 위한 "본문 바로가기" 링크와 포커스 스타일을 제공합니다.
- 메타데이터, Open Graph 이미지(`app/opengraph-image.jpg`), `sitemap.xml`, `robots.txt`,
  조직 정보 JSON-LD를 포함합니다.

## 환경 변수

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트의 정식 도메인. canonical URL, Open Graph, `sitemap.xml`에 사용됩니다. |

설정하지 않으면 `https://www.kmcaedu.co.kr` 을 사용합니다(대표 주소는 www이고,
`kmcaedu.co.kr` 은 www로 리다이렉트됩니다). 임시 도메인에서 확인하거나 대표 주소를
바꿀 때만 값을 지정하세요. 예시는 `.env.example`을 참고하세요.
