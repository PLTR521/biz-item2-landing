import { NextResponse, type NextRequest } from "next/server";
import { PAYMENTS_ENABLED } from "@/lib/pricing";

// 결제 미연동 동안 가격·업그레이드 페이지를 홈으로 보낸다.
// 페이지 파일은 그대로 남겨두므로 lib/pricing.ts의 PAYMENTS_ENABLED만 true로
// 바꾸면 두 라우트가 다시 열린다.
// permanent(308)가 아닌 307 — 브라우저·CDN이 영구 캐시하지 않아 복구가 즉시 반영된다.
export function middleware(request: NextRequest) {
  if (PAYMENTS_ENABLED) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url), 307);
}

export const config = { matcher: ["/pricing", "/upgrade"] };
