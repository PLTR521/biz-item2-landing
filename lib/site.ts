/**
 * 페이지 전체에서 쓰는 단일 도메인 상수.
 *
 * 이 리포(랜딩)와 API는 서로 다른 배포다. 예전에 카피에는 랜딩 주소가,
 * curl 예제에는 API 주소가 섞여 들어가 방문자가 어디로 요청을 보내야 하는지
 * 알 수 없었다. 그래서 하드코딩을 전부 여기로 모은다 —
 * 문서·코드카드·푸터·가입폼은 반드시 이 상수만 참조할 것.
 *
 * 바꾸기 전에 반드시 `curl https://<새 주소>/health` 로 실호출 확인.
 */

/** 랜딩페이지가 서비스되는 주소 (이 리포). */
export const SITE_HOST = "emaildeliverability.vercel.app";

/**
 * API 배포 주소 (별도 리포 PLTR521/email-deliverability).
 * 2026-08-04: 구 호스트 send-guard-ai.vercel.app → email-deliverability-app.vercel.app.
 */
export const API_ORIGIN =
  process.env.NEXT_PUBLIC_SENDGUARD_API_URL ||
  "https://email-deliverability-app.vercel.app";

/** 프로토콜 없는 호스트명 — 코드카드에서 `curl https://{API_HOST}/...` 로 쓴다. */
export const API_HOST = API_ORIGIN.replace(/^https?:\/\//, "");

export const API_CHECK_URL = `${API_ORIGIN}/api/check`;
export const API_HEALTH_URL = `${API_ORIGIN}/health`;
export const API_SIGNUP_URL = `${API_ORIGIN}/api/signup`;
export const API_LOGIN_URL = `${API_ORIGIN}/login`;
