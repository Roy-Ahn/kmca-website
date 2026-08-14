import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Vercel Domains 에서 apex → www 리다이렉트가 꺼져 있어도
 * 대표 주소(www.kmcaedu.co.kr)로 통일합니다.
 * vercel.app / localhost 등 다른 호스트는 그대로 둡니다.
 */
const APEX_HOST = "kmcaedu.co.kr";
const CANONICAL_HOST = "www.kmcaedu.co.kr";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // 정적 파일까지 포함해 호스트를 통일합니다.
  matcher: "/:path*",
};
