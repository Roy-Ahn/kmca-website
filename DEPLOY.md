# 배포 가이드 (kmcaedu.co.kr)

이 문서는 새로 만든 홈페이지를 `kmcaedu.co.kr` 주소로 띄우는 방법을 정리한 것입니다.
터미널 사용이 처음이어도 순서대로 따라 하면 됩니다.

---

## 0. 먼저 알아야 할 현재 상태

`kmcaedu.co.kr` 도메인을 조회해 보면 지금은 이렇게 되어 있습니다.

| 항목 | 현재 값 | 의미 |
| --- | --- | --- |
| 네임서버 | `ns12.wixdns.net`, `ns13.wixdns.net` | 도메인은 Cafe24에 등록돼 있지만, **DNS 관리 권한은 Wix로 넘어가 있는 상태** |
| 웹사이트 | Wix "ConnectYourDomain Error" 404 페이지 | Wix 쪽에 연결된 사이트가 없어 접속이 안 됨 |
| 메일 | `MX 10 e.kmcaedu.co.kr` → `222.122.39.84` | **메일 계정이 살아 있습니다** |

여기서 중요한 점 두 가지입니다.

1. 지금은 Cafe24 관리자에서 DNS 레코드를 바꿔도 적용되지 않습니다. Wix 네임서버가 우선하기 때문입니다.
   그래서 **어떤 방법으로 배포하든 네임서버를 Cafe24로 되돌리는 작업이 먼저**입니다.
2. 네임서버를 옮기면 기존 DNS 설정이 전부 초기화됩니다.
   `@kmcaedu.co.kr` 메일을 쓰고 계시다면 **아래 메일 레코드를 반드시 다시 입력**해야 메일이 끊기지 않습니다.

### 네임서버 변경 전 반드시 백업해 둘 메일 레코드

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| MX | `@` (비움) | `e.kmcaedu.co.kr` (우선순위 10) |
| A | `e` | `222.122.39.84` |
| CNAME | `mail` | `e.kmcaedu.co.kr` |
| CNAME | `smtp` | `e.kmcaedu.co.kr` |
| CNAME | `pop` | `e.kmcaedu.co.kr` |
| CNAME | `imap` | `e.kmcaedu.co.kr` |
| CNAME | `blog` | `e.kmcaedu.co.kr` |

> 메일을 쓰지 않는다면 이 표는 건너뛰어도 됩니다.
> 확실하지 않다면 메일 서비스 제공사(현재 IP `222.122.39.84`)에 먼저 확인하세요.

---

## 1. 두 가지 배포 방법 중 선택하기

|  | **방법 A. Vercel (권장)** | **방법 B. Cafe24 웹호스팅** |
| --- | --- | --- |
| 비용 | 무료 (개인/소규모 기준) | Cafe24 웹호스팅 상품 요금 |
| 수정 후 반영 | GitHub에 올리면 자동 배포 | 매번 빌드 후 FTP 재업로드 |
| 이미지 최적화 | 자동 (AVIF/WebP, 화면 크기별) | 빌드 시 미리 생성 (WebP) |
| SSL(https) | 자동 발급·자동 갱신 | Cafe24에서 무료 SSL 신청 |
| 속도 | 전 세계 CDN | 국내 서버 1대 |
| 필요한 기술 | GitHub 계정 | FTP 프로그램 사용 |

**Vercel(방법 A)을 권장합니다.** 이 사이트는 Next.js로 만들어졌고 Vercel이 Next.js를 만든 회사라
설정 없이 그대로 동작하며, 수정할 때마다 FTP로 다시 올리는 수고가 없습니다.
Cafe24 웹호스팅은 PHP용 서버라 Next.js를 그대로 실행할 수 없기 때문에,
방법 B에서는 **정적 파일로 변환해서** 올리는 방식을 씁니다. (이미 준비되어 있습니다.)

---

## 방법 A. Vercel에 올리고 Cafe24 도메인 연결하기

### A-1. Vercel에 사이트 올리기

1. [vercel.com](https://vercel.com) 에 GitHub 계정으로 가입/로그인합니다.
2. **Add New… → Project** 를 누르고 이 저장소를 선택한 뒤 **Import** 합니다.
3. 빌드 설정은 건드리지 않아도 됩니다. (Next.js가 자동 인식됩니다.)
4. **Deploy** 를 누르면 몇 분 뒤 `프로젝트이름.vercel.app` 주소로 사이트가 열립니다.
   여기서 먼저 내용을 확인하세요. 이 단계까지는 도메인과 무관합니다.

> 환경 변수는 설정하지 않아도 됩니다. 기본 도메인이 `https://kmcaedu.co.kr` 로 지정돼 있습니다.
> `www` 주소를 대표로 쓰려는 경우에만 **Settings → Environment Variables** 에
> `NEXT_PUBLIC_SITE_URL` = `https://www.kmcaedu.co.kr` 을 추가하세요.

### A-2. 도메인 연결하기

1. Vercel 프로젝트에서 **Settings → Domains** 로 들어갑니다.
2. `kmcaedu.co.kr` 을 입력해 추가하고, 이어서 `www.kmcaedu.co.kr` 도 추가합니다.
3. 화면에 **입력해야 할 DNS 레코드 값**이 표시됩니다. 이 값을 그대로 적어 둡니다.
   보통 아래 형태입니다. (숫자와 주소는 프로젝트마다 다를 수 있으니 **화면에 나온 값**을 쓰세요.)

   | 타입 | 호스트 | 값 |
   | --- | --- | --- |
   | A | `@` | 화면에 표시된 IP (예: `76.76.21.21`) |
   | CNAME | `www` | 화면에 표시된 주소 (예: `cname.vercel-dns.com`) |

### A-3. Cafe24에서 네임서버 되돌리고 DNS 입력하기

1. [hosting.cafe24.com](https://hosting.cafe24.com) 로그인 → **나의 서비스 관리 → 도메인 관리** 로 이동합니다.
2. `kmcaedu.co.kr` 의 **네임서버 변경**에서 Wix 네임서버를 지우고 Cafe24 네임서버를 입력합니다.

   | 구분 | 주소 |
   | --- | --- |
   | 1차 | `ns1.cafe24.co.kr` |
   | 2차 | `ns2.cafe24.co.kr` |

3. **DNS 관리(DNS 레코드 설정)** 에 들어가 아래 레코드를 입력합니다.
   - A-2에서 적어 둔 **A 레코드와 www CNAME**
   - 0단계에서 백업해 둔 **메일 레코드 전부**
4. 저장합니다.

### A-4. 확인

네임서버 변경은 보통 10분~수 시간(최대 48시간) 걸립니다. 반영되면

- Vercel의 Domains 화면에 **Valid Configuration** 으로 바뀌고,
- SSL 인증서가 자동 발급되어 `https://kmcaedu.co.kr` 로 접속됩니다.

터미널에서 직접 확인하려면:

```bash
dig NS kmcaedu.co.kr +short     # cafe24 네임서버가 나와야 정상
dig A kmcaedu.co.kr +short      # Vercel IP가 나와야 정상
dig MX kmcaedu.co.kr +short     # 메일 레코드가 그대로 남아 있는지 확인
```

### A-5. 이후 수정하는 방법

코드를 고쳐 GitHub `main` 브랜치에 올리면 Vercel이 자동으로 다시 배포합니다. 따로 할 일이 없습니다.

---

## 방법 B. Cafe24 웹호스팅에 직접 올리기

Cafe24 웹호스팅에는 Node.js가 없으므로, 사이트를 **HTML/CSS/이미지 파일 묶음으로 변환**해서 올립니다.
이 저장소에는 그 변환 명령이 이미 준비되어 있습니다.

### B-1. Cafe24 웹호스팅 준비

1. Cafe24에서 **웹호스팅 상품**을 신청합니다. (도메인만 있으면 웹 공간이 없습니다.)
2. 신청한 웹호스팅에 `kmcaedu.co.kr` 도메인을 연결합니다.
3. **FTP 접속 정보**(주소·아이디·비밀번호)를 확인해 둡니다.
4. 0단계 안내대로 네임서버를 Cafe24(`ns1.cafe24.co.kr`, `ns2.cafe24.co.kr`)로 되돌리고,
   메일 레코드를 다시 입력합니다.

### B-2. 내 컴퓨터에서 파일 만들기

[Node.js LTS](https://nodejs.org) 를 설치한 뒤, 프로젝트 폴더에서 아래를 실행합니다.

```bash
npm ci            # 처음 한 번만
npm run build:static
```

끝나면 프로젝트 안에 **`out/` 폴더**가 생깁니다. 이 폴더 안에 있는 것이 실제로 올릴 파일 전부입니다.
(HTML, `_next` 폴더, `images` 폴더, 그리고 서버 설정 파일인 `.htaccess`)

### B-3. FTP로 업로드

1. [FileZilla](https://filezilla-project.org) 같은 FTP 프로그램으로 Cafe24 FTP에 접속합니다.
2. **숨김 파일이 보이도록 설정합니다.**
   FileZilla 기준: 메뉴 **서버 → 강제로 숨김 파일 표시**.
   이 설정을 하지 않으면 `.htaccess` 파일이 빠져서 주소 이동과 캐시 설정이 동작하지 않습니다.
3. 웹 루트 폴더(보통 `/www` 또는 `/public_html`)로 이동합니다.
4. `out/` 폴더 **안의 내용물 전체**를 웹 루트에 올립니다.
   (`out` 폴더 자체가 아니라 그 안의 파일들입니다. `index.html` 이 웹 루트 바로 아래에 있어야 합니다.)

업로드 후 웹 루트 구조는 이런 모습이어야 합니다.

```
/www
├── .htaccess
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── _next/
├── images/
├── business/
├── consulting/
├── contact/
├── global/
└── history/
```

### B-4. SSL(https) 신청

1. Cafe24 관리자에서 **무료 SSL 보안 인증서(Let's Encrypt)** 를 신청합니다.
2. 발급이 끝나면 `https://kmcaedu.co.kr` 로 접속됩니다.
   `.htaccess` 에 http → https 자동 전환 설정이 들어 있습니다.

> **주의:** SSL 발급이 끝나기 전에는 http로 접속해야 합니다.
> 만약 SSL 신청 전에 올려서 접속이 무한 반복되면, `.htaccess` 에서
> `# HTTPS 강제` 아래 세 줄(`RewriteCond` 2줄 + `RewriteRule` 1줄)을 잠시 `#` 로 주석 처리하세요.

### B-5. 이후 수정하는 방법

내용을 고칠 때마다 `npm run build:static` 을 다시 실행하고 `out/` 폴더를 다시 업로드해야 합니다.

---

## 2. 배포 후 마무리 작업

1. **검색엔진 등록**
   - [Google Search Console](https://search.google.com/search-console) 에 `https://kmcaedu.co.kr` 등록 후
     `https://kmcaedu.co.kr/sitemap.xml` 제출
   - [네이버 서치어드바이저](https://searchadvisor.naver.com) 에도 동일하게 등록
2. **기존 Canva 사이트 정리** — 방문자가 새 주소로 오도록 안내 문구나 링크를 남깁니다.
   예전 주소(`/page-2`, `/page-3`, `/-`, `/contact-us`)는 새 페이지로 자동 연결되도록 이미 설정돼 있습니다.
3. **명함·블로그·SNS**에 적힌 주소를 `kmcaedu.co.kr` 로 통일합니다.

---

## 3. 문제가 생겼을 때

| 증상 | 원인과 해결 |
| --- | --- |
| 아직 Wix 오류 페이지가 뜬다 | 네임서버 변경이 반영되지 않은 상태. `dig NS kmcaedu.co.kr +short` 로 확인하고 최대 48시간 기다립니다. |
| 메일이 안 온다 | 네임서버 변경 후 MX 레코드가 빠진 경우. 0단계 표의 메일 레코드를 다시 입력하세요. |
| 첫 화면은 나오는데 다른 메뉴가 404 | (방법 B) `business` 등 하위 폴더가 업로드되지 않았거나, 웹 루트 위치가 다릅니다. |
| 500 Internal Server Error | (방법 B) `.htaccess` 문제입니다. 파일을 잠시 지워 접속되는지 확인한 뒤, Cafe24에 `mod_rewrite` 사용 가능 여부를 문의하세요. |
| https 접속이 무한 반복된다 | (방법 B) SSL 발급 전입니다. B-4의 주의 사항대로 HTTPS 강제 규칙을 잠시 꺼 두세요. |
| 이미지가 안 나온다 | (방법 B) `images` 폴더, 특히 `images/opt` 안의 WebP 파일이 전부 업로드됐는지 확인하세요. |
| 글씨가 깨져 보인다 | 브라우저 캐시 문제일 수 있습니다. 새로고침(Ctrl/Cmd + Shift + R) 후 확인하세요. |

---

## 4. www 주소를 대표로 쓰고 싶다면

기본 설정은 `kmcaedu.co.kr`(www 없는 주소)이 대표입니다. `www.kmcaedu.co.kr` 을 대표로 쓰려면:

1. `.env` 파일에 `NEXT_PUBLIC_SITE_URL=https://www.kmcaedu.co.kr` 로 지정
   (Vercel은 Environment Variables 값을 수정)
2. 방법 B라면 `deploy/htaccess` 안의 `# 주소를 kmcaedu.co.kr 하나로 통일합니다` 아래에서
   위 두 줄을 주석 처리하고 아래 두 줄의 주석을 해제한 뒤 다시 빌드
