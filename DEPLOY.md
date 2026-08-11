# 배포 가이드 (kmcaedu.co.kr)

이 문서는 새로 만든 홈페이지를 `kmcaedu.co.kr` 주소로 띄우는 방법을 정리한 것입니다.
터미널 사용이 처음이어도 순서대로 따라 하면 됩니다.

## 지금 어디까지 되어 있나

Vercel 배포는 **이미 완료**되었고, 지금 아래 주소에서 새 사이트를 볼 수 있습니다.

> **https://kmca-website.vercel.app**

| 항목 | 상태 |
| --- | --- |
| Vercel 프로젝트 `kmca-website` | 완료 (프레임워크 Next.js) |
| GitHub 저장소 연결 (`main` 브랜치) | 완료 — `main` 에 push하면 자동 재배포 |
| 프로덕션 배포 | 완료 |
| 도메인 `kmcaedu.co.kr`, `www.kmcaedu.co.kr` 등록 | 완료 (Vercel에 추가·인증됨) |
| **DNS 연결** | **미완료 — 아래 1단계 필요** |

즉 **남은 작업은 DNS 하나**입니다. 도메인의 네임서버가 아직 Wix를 가리키고 있어
`kmcaedu.co.kr` 로 접속하면 Wix 오류 페이지가 나옵니다. 아래 0~1단계를 진행하면 연결됩니다.

대표 주소는 **`www.kmcaedu.co.kr`** 입니다. (`kmcaedu.co.kr` 로 들어오면 www로 자동 이동)

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

## 1. 도메인 연결하기 (남은 작업)

Vercel 쪽 설정은 끝났으므로, Cafe24에서 네임서버와 DNS만 정리하면 됩니다.

### 1-1. Cafe24에서 네임서버 되돌리기

1. [hosting.cafe24.com](https://hosting.cafe24.com) 에 **도메인을 구입한 아이디로** 로그인 →
   **나의 서비스 관리 → 도메인 관리 → 네임서버 변경** 으로 이동합니다.
2. **본인인증**(휴대폰·이메일·아이핀 중 택1)을 완료합니다. 인증 없이는 네임서버를 바꿀 수 없습니다.
3. `kmcaedu.co.kr` 의 네임서버에서 Wix 주소를 지우고 아래 Cafe24 주소를 입력합니다.

   **Cafe24 네임서버 (호스팅용, 4개 모두 입력)**

   | 구분 | 주소 |
   | --- | --- |
   | 1차 | `ns1.cafe24.com` |
   | 2차 | `ns1.cafe24.co.kr` |
   | 3차 | `ns2.cafe24.com` |
   | 4차 | `ns2.cafe24.co.kr` |

   > `.com` 과 `.co.kr` 이 번갈아 들어갑니다. 순서까지 위 표 그대로 입력하세요.
   > 입력 후 **IP 확인** 버튼을 누른 다음 저장해야 합니다.
   >
   > 이 네 개는 Cafe24 **웹호스팅용** 주소입니다. 서버호스팅(VPS)이나 도메인 포워딩은
   > 주소가 다르니, 화면에 다른 안내가 뜨면 그쪽을 따르세요.

### 1-2. DNS 레코드 입력하기

**DNS 관리(DNS 레코드 설정)** 에서 아래 레코드를 입력합니다.

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| A | `@` (비움) | `216.198.79.1` |
| A | `@` (비움) | `64.29.17.1` |
| CNAME | `www` | `5ed37328932f9b75.vercel-dns-017.com` |

여기에 더해 **0단계에서 백업해 둔 메일 레코드 전부**를 함께 입력한 뒤 저장합니다.

> A 레코드 두 개는 한 쌍입니다. Cafe24에서 A 레코드를 하나만 등록할 수 있다면
> `216.198.79.1` 만 넣어도 접속은 됩니다.
>
> 위 값들은 이 Vercel 프로젝트에 배정된 값입니다. 혹시 Vercel의
> **Settings → Domains** 화면에 다른 값이 표시된다면 화면에 나온 값을 우선하세요.

### 1-3. 확인

네임서버 변경은 보통 10분~수 시간(최대 48시간) 걸립니다. 반영되면

- Vercel의 Domains 화면이 **Valid Configuration** 으로 바뀌고,
- SSL 인증서가 자동 발급되어 `https://www.kmcaedu.co.kr` 로 접속됩니다.
- `kmcaedu.co.kr` 로 들어와도 www 주소로 자동 이동합니다.

터미널에서 직접 확인하려면:

```bash
dig NS kmcaedu.co.kr +short        # cafe24 네임서버가 나와야 정상
dig A kmcaedu.co.kr +short         # 216.198.79.1 이 나와야 정상
dig CNAME www.kmcaedu.co.kr +short # vercel-dns 주소가 나와야 정상
dig MX kmcaedu.co.kr +short        # 메일 레코드가 그대로 남아 있는지 확인
```

### 1-4. 이후 수정하는 방법

코드를 고쳐 GitHub `main` 브랜치에 올리면 Vercel이 자동으로 다시 배포합니다. 따로 할 일이 없습니다.

---

## 2. (참고) Cafe24 웹호스팅에 직접 올리는 방법

Vercel 대신 Cafe24 웹호스팅을 쓰고 싶을 때를 위한 대안입니다. **지금은 필요하지 않습니다.**

|  | **Vercel (현재 사용 중)** | **Cafe24 웹호스팅** |
| --- | --- | --- |
| 비용 | 무료 (개인/소규모 기준) | Cafe24 웹호스팅 상품 요금 |
| 수정 후 반영 | GitHub에 올리면 자동 배포 | 매번 빌드 후 FTP 재업로드 |
| 이미지 최적화 | 자동 (AVIF/WebP, 화면 크기별) | 빌드 시 미리 생성 (WebP) |
| SSL(https) | 자동 발급·자동 갱신 | Cafe24에서 무료 SSL 신청 |
| 속도 | 전 세계 CDN | 국내 서버 1대 |
| 필요한 기술 | GitHub 계정 | FTP 프로그램 사용 |

Cafe24 웹호스팅은 PHP용 서버라 Next.js를 그대로 실행할 수 없기 때문에,
**정적 파일로 변환해서** 올리는 방식을 씁니다.

### 2-1. Cafe24 웹호스팅 준비

1. Cafe24에서 **웹호스팅 상품**을 신청합니다. (도메인만 있으면 웹 공간이 없습니다.)
2. 신청한 웹호스팅에 `kmcaedu.co.kr` 도메인을 연결합니다.
3. **FTP 접속 정보**(주소·아이디·비밀번호)를 확인해 둡니다.
4. 1-1 안내대로 네임서버를 Cafe24 네임서버 4개로 되돌리고, 메일 레코드를 다시 입력합니다.

### 2-2. 내 컴퓨터에서 파일 만들기

[Node.js LTS](https://nodejs.org) 를 설치한 뒤, 프로젝트 폴더에서 아래를 실행합니다.

```bash
npm ci            # 처음 한 번만
npm run build:static
```

끝나면 프로젝트 안에 **`out/` 폴더**가 생깁니다. 이 폴더 안에 있는 것이 실제로 올릴 파일 전부입니다.
(HTML, `_next` 폴더, `images` 폴더, 그리고 서버 설정 파일인 `.htaccess`)

### 2-3. FTP로 업로드

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
└── images/
```

> 사이트는 한 페이지라 하위 폴더가 없습니다. `index.html` 하나에 모든 내용이 들어 있고,
> 메뉴는 그 안의 섹션(`#business`, `#contact` …)으로 이동합니다.

### 2-4. SSL(https) 신청

1. Cafe24 관리자에서 **무료 SSL 보안 인증서(Let's Encrypt)** 를 신청합니다.
2. 발급이 끝나면 `https://www.kmcaedu.co.kr` 로 접속됩니다.
   `.htaccess` 에 http → https 자동 전환 설정이 들어 있습니다.

> **주의:** SSL 발급이 끝나기 전에는 http로 접속해야 합니다.
> 만약 SSL 신청 전에 올려서 접속이 무한 반복되면, `.htaccess` 에서
> `# HTTPS 강제` 아래 세 줄(`RewriteCond` 2줄 + `RewriteRule` 1줄)을 잠시 `#` 로 주석 처리하세요.

### 2-5. 이후 수정하는 방법

내용을 고칠 때마다 `npm run build:static` 을 다시 실행하고 `out/` 폴더를 다시 업로드해야 합니다.

---

## 3. 배포 후 마무리 작업

1. **검색엔진 등록**
   - [Google Search Console](https://search.google.com/search-console) 에 `https://www.kmcaedu.co.kr` 등록 후
     `https://www.kmcaedu.co.kr/sitemap.xml` 제출
   - [네이버 서치어드바이저](https://searchadvisor.naver.com) 에도 동일하게 등록
2. **기존 Canva 사이트 정리** — 방문자가 새 주소로 오도록 안내 문구나 링크를 남깁니다.
   예전 주소(`/page-2`, `/page-3`, `/-`, `/contact-us`)는 새 사이트의 해당 섹션으로
   자동 연결되도록 이미 설정돼 있습니다.
3. **명함·블로그·SNS**에 적힌 주소를 `www.kmcaedu.co.kr` 로 통일합니다.

---

## 4. 문제가 생겼을 때

| 증상 | 원인과 해결 |
| --- | --- |
| 아직 Wix 오류 페이지가 뜬다 | 네임서버 변경이 반영되지 않은 상태. `dig NS kmcaedu.co.kr +short` 로 확인하고 최대 48시간 기다립니다. |
| 메일이 안 온다 | 네임서버 변경 후 MX 레코드가 빠진 경우. 0단계 표의 메일 레코드를 다시 입력하세요. |
| 메뉴를 눌러도 이동하지 않는다 | `index.html` 이 일부만 업로드된 경우입니다. `out/` 폴더 전체를 다시 올려 주세요. |
| 500 Internal Server Error | (Cafe24 웹호스팅) `.htaccess` 문제입니다. 파일을 잠시 지워 접속되는지 확인한 뒤, Cafe24에 `mod_rewrite` 사용 가능 여부를 문의하세요. |
| https 접속이 무한 반복된다 | (Cafe24 웹호스팅) SSL 발급 전입니다. 2-4의 주의 사항대로 HTTPS 강제 규칙을 잠시 꺼 두세요. |
| 이미지가 안 나온다 | (Cafe24 웹호스팅) `images` 폴더, 특히 `images/opt` 안의 WebP 파일이 전부 업로드됐는지 확인하세요. |
| 글씨가 깨져 보인다 | 브라우저 캐시 문제일 수 있습니다. 새로고침(Ctrl/Cmd + Shift + R) 후 확인하세요. |

---

## 5. www 없는 주소를 대표로 쓰고 싶다면

현재는 `www.kmcaedu.co.kr` 이 대표이고 `kmcaedu.co.kr` 은 www로 이동합니다.
반대로 바꾸려면:

1. Vercel **Settings → Domains** 에서 `www.kmcaedu.co.kr` 이 `kmcaedu.co.kr` 로
   리다이렉트되도록 변경
2. Vercel **Settings → Environment Variables** 의 `NEXT_PUBLIC_SITE_URL` 을
   `https://kmcaedu.co.kr` 로 수정한 뒤 재배포
3. Cafe24 웹호스팅을 쓰는 경우에는 `deploy/htaccess` 안의
   `# 주소를 www.kmcaedu.co.kr 하나로 통일합니다` 아래에서
   위 두 줄을 주석 처리하고 아래 두 줄의 주석을 해제한 뒤 다시 빌드
