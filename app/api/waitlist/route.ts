import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// 모든 방문자에게 공유되는 실시간 대기자 카운터.
// 표시 숫자 = BASE_COUNT(기존 신청분 + 사회적 증거 시드) + Redis에 누적된 신규 신청 수.
// 기존 Formspree 신청 5건 + 시드 23 = 28을 기준값으로 둔다.
const BASE_COUNT = 28;
const COUNT_KEY = "waitlist:count";

function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// 현재 대기자 수 조회 (페이지 로드 시 호출)
export async function GET() {
  const redis = getRedis();
  if (!redis) {
    // 환경변수 미설정 시에도 페이지가 깨지지 않도록 기준값만 반환
    return NextResponse.json({ count: BASE_COUNT });
  }
  const added = (await redis.get<number>(COUNT_KEY)) ?? 0;
  return NextResponse.json({ count: BASE_COUNT + added });
}

// 신규 신청 +1 (이메일 제출 성공 후 호출)
export async function POST() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ count: BASE_COUNT });
  }
  const added = await redis.incr(COUNT_KEY);
  return NextResponse.json({ count: BASE_COUNT + added });
}
