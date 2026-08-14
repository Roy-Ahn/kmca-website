import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Vercel Domains 에서 apex → www 리다이렉트가 꺼져 있어도
 * 대표 주소(www.kmcaedu.co.kr)로 통일합니다.
 *
 * next.config redirects() 와 같이 두면 legacy 경로가 호스트 통일보다
 * 먼저 처리되어 apex 에 머무를 수 있어, 둘 다 여기서 처리합니다.
 *
 * NextResponse.redirect() 는 `#해시` 목적지 Location 에서 호스트를 빼 버리므로,
 * Location 헤더를 직접 넣습니다. Location 은 반드시 절대 URL 이어야 합니다.
 */
const APEX_HOST = "kmcaedu.co.kr";
const CANONICAL_HOST = "www.kmcaedu.co.kr";

const legacyPathRedirects: Record<string, string> = {
  "/page-2": "/#business",
  "/page-3": "/#solutions",
  "/-": "/#global",
  "/contact-us": "/#contact",
  "/business": "/#business",
  "/consulting": "/#solutions",
  "/global": "/#global",
  "/history": "/#global",
  "/contact": "/#contact",
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function redirectTo(location: string) {
  return new NextResponse(null, {
    status: 308,
    headers: {
      Location: location,
    },
  });
}

function originFor(request: NextRequest, host: string) {
  if (host === APEX_HOST || host === CANONICAL_HOST) {
    return `https://${CANONICAL_HOST}`;
  }

  const proto = (
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "") ??
    "https"
  ).split(",")[0]?.trim() || "https";

  return `${proto}://${host}`;
}

export function proxy(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const host = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  const pathname = normalizePathname(request.nextUrl.pathname);
  const legacyDestination = legacyPathRedirects[pathname];
  const isApex = host === APEX_HOST;

  if (legacyDestination) {
    const originHost =
      host === APEX_HOST || host === CANONICAL_HOST ? host : hostHeader;
    return redirectTo(`${originFor(request, originHost)}${legacyDestination}`);
  }

  if (isApex) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return redirectTo(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
