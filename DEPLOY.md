# 배포 가이드 (kmcaedu.co.kr)

이 문서는 홈페이지를 `kmcaedu.co.kr` / `www.kmcaedu.co.kr` 로 띄우는 방법과
현재 DNS 상태를 정리한 것입니다.

## 지금 어디까지 되어 있나

| 항목 | 상태 |
| --- | --- |
| Vercel 프로젝트 `kmca-website` | 완료 (Next.js) |
| GitHub `main` 자동 배포 | 완료 |
| 프로덕션 URL | https://kmca-website.vercel.app |
| 커스텀 도메인 웹 | **완료** — `https://kmcaedu.co.kr` · `https://www.kmcaedu.co.kr` 모두 Vercel 사이트를 반환 |
| 네임서버 | **Vercel DNS** (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) |
| apex → www 리다이렉트 | 코드(`proxy.ts`)로 처리 — 배포 후 `kmcaedu.co.kr` 가 `www` 로 308 이동 |
| `@kmcaedu.co.kr` 메일 | **위험** — MX 레코드가 비어 있음. 아래 1단계 필요 |

대표 주소는 **`www.kmcaedu.co.kr`** 입니다.

> 2026-08-14 기준 `.kr` 등록소·Google·Cloudflare·KT DNS 모두 Vercel 네임서버를
> 가리키고, SSL도 Let's Encrypt로 발급되어 있습니다. Cafe24에 A/CNAME을 넣는
> 예전 절차는 **더 이상 웹 연결에 필요하지 않습니다.** (네임서버가 Cafe24가 아님)

---

## 0. 왜 "리다이렉트가 안 된다"고 느껴졌나

이전에는 네임서버가 Cafe24였고, apex A 레코드가 Cafe24 IP(`222.122.39.84`)를
가리켜 사이트가 열리지 않았습니다. 그 뒤 **네임서버를 Vercel DNS로 바꾸는**
방식으로 웹은 연결됐지만:

1. **apex → www** Vercel Domains 리다이렉트가 켜져 있지 않아, apex와 www가
   둘 다 200으로 같은 페이지를 각각 서빙했습니다. (대표 주소 통일이 안 됨)
2. Cafe24 존에 있던 **MX/메일 레코드가 통째로 사라졌습니다.** Vercel DNS에는
   메일 레코드가 기본으로 없습니다.

웹이 "안 열린다"와 "www로 안 넘어간다"는 증상이 달립니다. 지금은 웹은 열리고,
www 통일은 `proxy.ts` 배포로 맞춥니다.

터미널에서 현재 상태를 확인하려면:

```bash
dig NS kmcaedu.co.kr +short        # ns1/ns2.vercel-dns.com
dig A kmcaedu.co.kr +short         # 216.198.79.1 / 216.198.79.65 등 Vercel IP
curl -sI https://kmcaedu.co.kr/ | head -5
curl -sI https://www.kmcaedu.co.kr/ | head -5
dig MX kmcaedu.co.kr +short        # (비어 있으면 메일 설정 필요)
```

배포 후 apex는 아래처럼 **308 → www** 가 나와야 정상입니다.

```bash
curl -sI https://kmcaedu.co.kr/ | grep -iE 'HTTP/|location'
# HTTP/2 308
# location: https://www.kmcaedu.co.kr/
```

---

## 1. 메일 살리기 (지금 남은 필수 작업)

네임서버가 Vercel이라 **메일 레코드도 Vercel DNS에** 넣어야 합니다.
Cafe24 DNS 관리 화면에 넣어도 네임서버가 Cafe24가 아니라 **적용되지 않습니다.**

Cafe24 메일 서버 IP는 이전과 같이 `222.122.39.84` 입니다. (993/25 포트 확인됨)

[Vercel Dashboard](https://vercel.com) → 프로젝트 `kmca-website` →
**Settings → Domains → kmcaedu.co.kr → DNS Records** (또는 팀 Domains의 DNS)에서:

| 타입 | 이름 | 값 | 비고 |
| --- | --- | --- | --- |
| A | `e` | `222.122.39.84` | 메일 전용 호스트 |
| MX | `@` | `e.kmcaedu.co.kr` (priority 10) | |
| CNAME | `mail` | `e.kmcaedu.co.kr` | 메일 클라이언트 |
| CNAME | `smtp` | `e.kmcaedu.co.kr` | 보내기 |
| CNAME | `pop` | `e.kmcaedu.co.kr` | 받기 |
| CNAME | `imap` | `e.kmcaedu.co.kr` | 받기 |
| TXT | `@` | `v=spf1 ip4:222.122.39.84 ~all` | SPF |

확인:

```bash
dig MX kmcaedu.co.kr +short        # e.kmcaedu.co.kr
dig A e.kmcaedu.co.kr +short       # 222.122.39.84  (CNAME 줄이 없어야 함)
```

그다음 `@kmcaedu.co.kr` 으로 시험 메일을 한 통 보내 받아 보세요.

> Vercel Domains UI에서 `www` 를 Primary로 두고 apex를 Redirect로 설정하면
> 플랫폼 단 리다이렉트도 켤 수 있습니다. `proxy.ts`와 중복되어도 동작은 같습니다.

---

## 2. 코드 수정 후 재배포

GitHub `main` 에 push하면 Vercel이 자동 재배포합니다.

---

## 3. (참고) Cafe24 웹호스팅에 직접 올리는 방법

Vercel 대신 Cafe24 웹호스팅을 쓰고 싶을 때의 대안입니다. **지금은 필요하지 않습니다.**
이 경로를 쓰려면 네임서버를 다시 Cafe24로 돌리고 DNS를 Cafe24에서 관리해야 합니다.
메일·웹 레코드를 함께 옮겨야 하므로 신중히 진행하세요.

|  | **Vercel (현재 사용 중)** | **Cafe24 웹호스팅** |
| --- | --- | --- |
| 비용 | 무료 (개인/소규모 기준) | Cafe24 웹호스팅 상품 요금 |
| 수정 후 반영 | GitHub에 올리면 자동 배포 | 매번 빌드 후 FTP 재업로드 |
| 이미지 최적화 | 자동 (AVIF/WebP) | 빌드 시 미리 생성 (WebP) |
| SSL | 자동 | Cafe24 무료 SSL 신청 |
| 네임서버 | `ns1/ns2.vercel-dns.com` | Cafe24 DNS |

### 3-1. 정적 빌드

```bash
npm ci
npm run build:static
```

`out/` 전체를 FTP로 웹 루트에 올립니다. `.htaccess` 가 포함되어야
apex→www·구주소 리다이렉트가 동작합니다. (숨김 파일 표시 필요)

### 3-2. SSL

Cafe24에서 Let's Encrypt 신청 후 https로 접속합니다.

---

## 4. 배포 후 마무리

1. Google Search Console / 네이버 서치어드바이저에 `https://www.kmcaedu.co.kr` 등록
2. 기존 Canva·명함·SNS 주소를 `www.kmcaedu.co.kr` 로 통일
3. 예전 경로(`/page-2`, `/business` 등)는 홈 섹션으로 301 됩니다

---

## 5. 문제가 생겼을 때

| 증상 | 원인과 해결 |
| --- | --- |
| 사이트가 Cafe24/Wix/빈 응답 | 로컬 DNS 캐시일 수 있음. `dig NS` 가 vercel-dns인지 확인하고 브라우저 캐시·다른 네트워크에서 재시도 |
| apex가 www로 안 넘어감 | 이 브랜치의 `proxy.ts` 가 프로덕션에 배포됐는지 확인. Vercel Domains에서 www Primary + apex Redirect도 가능 |
| 메일이 안 온다 | Vercel DNS에 MX/`e` A 레코드가 없음. 1단계 진행 |
| vercel.app 만 되고 커스텀 도메인이 안 됨 | Domains에 도메인이 프로젝트에 연결·Valid 인지 확인 |

---

## 6. www 없는 주소를 대표로 쓰고 싶다면

1. Vercel **Settings → Domains** 에서 apex를 Primary, www를 Redirect로
2. `NEXT_PUBLIC_SITE_URL` 을 `https://kmcaedu.co.kr` 로 바꾸고 재배포
3. `proxy.ts` 의 `APEX_HOST` / `CANONICAL_HOST` 를 서로 바꿈
4. Cafe24 정적 배포를 쓸 경우 `deploy/htaccess` 의 www 규칙도 반대로
