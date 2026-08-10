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
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과 실행
npx eslint .     # 린트
```

Node.js 20 이상을 권장합니다.

## 페이지 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 히어로, Since 2015 소개, 주요 사업분야, A to Z 마스터 플랜, 의료기기 마케팅, 글로벌 학회, AI 이미지·영상 제작, 상담 CTA |
| `/business` | 분야별 주요사업 소개 (국내마케팅 / 글로벌 비즈니스 / ETC) |
| `/consulting` | 신규 개원 토탈 솔루션 (입지·교육·인프라·브랜딩) |
| `/global` | 글로벌 현지 진출 및 단계별 프로세스 |
| `/history` | KMCA 히스토리 갤러리, 병의원 채널 운영 사례 |
| `/contact` | 연락처, 주소, 지도 |

이전 Canva 사이트의 주소는 `next.config.ts`의 `redirects()`에서 새 경로로 301 리다이렉트됩니다.

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
- 페이지별 메타데이터, Open Graph, `sitemap.xml`, `robots.txt`, 조직 정보 JSON-LD를 포함합니다.
- 배포 도메인이 확정되면 `content/site.ts`의 `url` 값을 실제 주소로 변경하세요.
