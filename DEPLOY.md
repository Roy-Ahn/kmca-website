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
| 네임서버를 Cafe24로 되돌리기 | **완료** — 아래 0단계 참고 |
| **DNS 레코드 입력** | **미완료 — 아래 1단계 필요** |

즉 **남은 작업은 DNS 레코드 입력 하나**입니다. 네임서버는 Cafe24로 넘어왔지만
레코드가 아직 Vercel이 아닌 Cafe24 기본값을 가리키고 있어, 지금 `kmcaedu.co.kr` 로
접속하면 연결이 끊깁니다(응답 없음). 아래 1단계를 진행하면 연결됩니다.

> **먼저 읽어 주세요.** 지금 `@kmcaedu.co.kr` 메일이 살아 있는데, 레코드를 입력하는
> **순서를 지키지 않으면 메일이 끊깁니다.** 이유와 순서는 0단계와 1단계에 있습니다.

대표 주소는 **`www.kmcaedu.co.kr`** 입니다. (`kmcaedu.co.kr` 로 들어오면 www로 자동 이동)

---

## 0. 먼저 알아야 할 현재 상태

네임서버 변경은 **정상적으로 끝났습니다.** 더 이상 Wix를 가리키지 않습니다.

| 항목 | 현재 값 | 의미 |
| --- | --- | --- |
| 네임서버 | `ns1.cafe24dns.co.kr`, `ns3.cafe24dns.co.kr` | **DNS 관리 권한이 Cafe24로 돌아왔습니다.** 이제 Cafe24 관리자에서 바꾼 레코드가 실제로 적용됩니다 |
| 웹사이트 | 접속 시 연결 끊김 (응답 없음) | 도메인이 Cafe24 IP(`222.122.39.84`)를 가리키는데 그 자리에 웹사이트가 없습니다 |
| 메일 | `MX 10 kmcaedu.co.kr` → `222.122.39.84` | **메일은 살아 있습니다** (POP3/IMAP 포트가 열려 있는 것을 확인) |

> **Cafe24 화면에 나온 네임서버 4개와 달라 보여도 정상입니다.**
> Cafe24는 안내 화면에서 웹호스팅용 네임서버 4개(`ns1.cafe24.com`, `ns1.cafe24.co.kr`,
> `ns2.cafe24.com`, `ns2.cafe24.co.kr`)를 보여 주지만, 실제 `.kr` 등록소에 올라가 있는 값은
> 도메인 관리용인 `ns1.cafe24dns.co.kr`, `ns3.cafe24dns.co.kr` 입니다.
> 확인해 보면 **양쪽 모두 완전히 같은 DNS 정보를 돌려줍니다**(SOA 일련번호 `20181207` 동일).
> 둘 다 Cafe24가 운영하고 Cafe24 관리자 화면에서 함께 관리되므로, **네임서버는 지금 그대로
> 두시면 됩니다.** 다시 바꾸면 아래 레코드가 또 초기화될 수 있습니다.

네임서버가 바뀌면서 DNS 레코드는 예상대로 **Cafe24 기본값으로 초기화**되었습니다.
지금 등록되어 있는 내용은 아래와 같습니다.

| 타입 | 호스트 | 현재 값 |
| --- | --- | --- |
| A | `@` | `222.122.39.84` |
| CNAME | `*` (와일드카드) | `kmcaedu.co.kr` |
| MX | `@` | `kmcaedu.co.kr` (우선순위 10) |
| TXT | `@` | `v=spf1 ip4:222.122.39.84 ~all` |

### ⚠ 이 구조에서 A 레코드만 바꾸면 메일이 끊깁니다

위 표에서 중요한 것은 **와일드카드 CNAME** 입니다. `www`, `mail`, `smtp`, `pop`, `imap`,
`e` … 어떤 주소를 조회해도 전부 `kmcaedu.co.kr` 로 넘어가고, 결국 **맨 위의 A 레코드
하나**(`222.122.39.84`)로 모입니다. 메일도 마찬가지로 `MX → kmcaedu.co.kr → A 레코드`
순서로 따라갑니다.

즉 지금 상태에서 A 레코드를 Vercel 주소로 바꾸면, **메일까지 Vercel로 배달을 시도하게
되어 메일이 전부 끊깁니다.** Vercel에는 메일 서버가 없습니다.

그래서 1단계는 **메일이 A 레코드를 따라가지 않도록 먼저 떼어낸 뒤**, 그다음에 A 레코드를
Vercel로 바꾸는 순서로 진행합니다.

---

## 1. 도메인 연결하기 (남은 작업)

Vercel 쪽 설정과 네임서버 변경은 끝났으므로, **Cafe24의 DNS 레코드만** 정리하면 됩니다.

[hosting.cafe24.com](https://hosting.cafe24.com) 로그인 →
**나의 서비스 관리 → 도메인 관리 → DNS 관리(DNS 레코드 설정)** 으로 이동합니다.

> 아래 1-1 → 1-2 **순서를 반드시 지켜 주세요.** 1-2를 먼저 하면 메일이 끊깁니다.
> 1-1과 1-2를 한 화면에서 함께 저장할 수 있다면 한 번에 저장해도 됩니다.

### 1-1. 먼저 메일을 안전한 곳으로 옮기기

메일이 A 레코드를 따라가지 않도록, 메일 전용 주소(`e.kmcaedu.co.kr`)에 IP를 직접 박아 둡니다.

| 타입 | 호스트 | 값 | 비고 |
| --- | --- | --- | --- |
| A | `e` | `222.122.39.84` | **CNAME이 아니라 A로** 등록 (핵심) |
| MX | `@` (비움) | `e.kmcaedu.co.kr` (우선순위 10) | 기존 `kmcaedu.co.kr` 에서 변경 |
| CNAME | `mail` | `e.kmcaedu.co.kr` | 메일 프로그램 접속용 |
| CNAME | `smtp` | `e.kmcaedu.co.kr` | 보내기 |
| CNAME | `pop` | `e.kmcaedu.co.kr` | 받기 |
| CNAME | `imap` | `e.kmcaedu.co.kr` | 받기 |
| TXT | `@` (비움) | `v=spf1 ip4:222.122.39.84 ~all` | 이미 있으면 **그대로 두기** |

`blog` 등 다른 주소를 쓰고 계시다면 같은 방식(`CNAME → e.kmcaedu.co.kr`)으로 추가하세요.

> **왜 `e` 를 A 레코드로 만드나요?**
> 지금은 `e` 도 와일드카드를 타고 맨 위 A 레코드로 갑니다. `e` 에 IP를 직접 지정해 두면
> 1-2에서 맨 위 A 레코드를 Vercel로 바꿔도 메일은 계속 `222.122.39.84` 로 갑니다.

저장한 뒤 **10~30분 정도 기다렸다가** 아래로 확인하고 1-2로 넘어가세요.

```bash
dig MX kmcaedu.co.kr +short   # e.kmcaedu.co.kr 이 나와야 정상
dig A e.kmcaedu.co.kr +short  # 222.122.39.84 가 나와야 정상 (CNAME 줄이 없어야 함)
```

### 1-2. 웹사이트를 Vercel로 돌리기

메일이 분리된 것을 확인한 다음, 아래 두 줄을 바꿉니다.

| 타입 | 호스트 | 값 | 비고 |
| --- | --- | --- | --- |
| A | `@` (비움) | `216.198.79.1` | 기존 `222.122.39.84` 를 **수정** |
| A | `@` (비움) | `64.29.17.1` | 가능하면 함께 추가 |
| CNAME | `www` | `5ed37328932f9b75.vercel-dns-017.com` | 기존 `kmcaedu.co.kr` 에서 변경 |

> A 레코드 두 개는 한 쌍입니다. Cafe24에서 A 레코드를 하나만 등록할 수 있다면
> `216.198.79.1` 만 넣어도 접속은 됩니다.
>
> 와일드카드 CNAME(`*`)이 남아 있어도 위 레코드가 우선하므로 그대로 두어도 됩니다.
>
> 위 값들은 이 Vercel 프로젝트에 배정된 값입니다. 혹시 Vercel의
> **Settings → Domains** 화면에 다른 값이 표시된다면 화면에 나온 값을 우선하세요.

### 1-3. 확인

레코드 변경은 보통 10분~수 시간(최대 48시간) 걸립니다. 반영되면

- Vercel의 Domains 화면이 **Valid Configuration** 으로 바뀌고,
- SSL 인증서가 자동 발급되어 `https://www.kmcaedu.co.kr` 로 접속됩니다.
- `kmcaedu.co.kr` 로 들어와도 www 주소로 자동 이동합니다.

터미널에서 직접 확인하려면:

```bash
dig NS kmcaedu.co.kr +short        # cafe24dns 네임서버가 나와야 정상 (이미 완료)
dig A kmcaedu.co.kr +short         # 216.198.79.1 이 나와야 정상
dig CNAME www.kmcaedu.co.kr +short # vercel-dns 주소가 나와야 정상
dig MX kmcaedu.co.kr +short        # e.kmcaedu.co.kr 이 나와야 정상
dig A e.kmcaedu.co.kr +short       # 222.122.39.84 가 나와야 정상 (메일 살아 있음)
```

마지막 두 줄이 가장 중요합니다. **메일이 계속 `222.122.39.84` 를 가리키는지** 꼭 확인하세요.
바꾼 뒤에는 실제로 `@kmcaedu.co.kr` 주소로 메일을 한 통 보내 받아 보는 것이 가장 확실합니다.

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
4. 네임서버는 이미 Cafe24로 되어 있으므로 그대로 두고, DNS 관리에서 `@` 와 `www` 가
   웹호스팅 서버를 가리키도록 Cafe24 안내대로 맞춥니다. 이 경우 1-2(Vercel 주소)는
   진행하지 않습니다. 메일은 1-1 그대로 두면 영향받지 않습니다.

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
| 사이트가 아예 안 열린다 (응답 없음) | A 레코드가 아직 Cafe24 IP(`222.122.39.84`)를 가리키는 상태. 1-2를 진행하고 `dig A kmcaedu.co.kr +short` 로 확인하며 최대 48시간 기다립니다. |
| 메일이 안 온다 | 1-1을 건너뛰고 1-2를 먼저 한 경우가 가장 흔합니다. `dig MX kmcaedu.co.kr +short` 가 `e.kmcaedu.co.kr` 이 아니거나 `dig A e.kmcaedu.co.kr +short` 가 `222.122.39.84` 가 아니면, 1-1의 메일 레코드를 입력하세요. |
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
