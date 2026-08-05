/**
 * 페이지에 인쇄되는 유일한 도메인.
 *
 * ⚠️ 이 파일에 두 번째 호스트를 추가하지 말 것.
 *
 * 랜딩(이 리포)은 emaildeliverability.vercel.app 에 배포되지만 그 주소는 API가
 * 아니다 — 2026-08-05 실측: /health, /api/check, /api/signup 전부 404다.
 * 예전에는 카피에 랜딩 주소가, curl 예제에는 API 주소가 섞여 들어가
 * 한 페이지에 두 도메인이 21회(9 + 12) 인쇄됐고, 방문자는 어디로 요청을
 * 보내야 하는지 알 수 없었다. 그래서 랜딩 주소는 화면에서 완전히 제거했다.
 * 자기 도메인 검사 블록도 API 호스트를 대상으로 한다.
 *
 * 문서·코드카드·푸터·가입폼은 반드시 아래 상수만 참조할 것.
 * 바꾸기 전에 반드시 `curl https://<새 주소>/health` 로 실호출 확인.
 */

/**
 * API 배포 주소 (별도 리포 PLTR521/email-deliverability).
 * 2026-08-04: 구 호스트 send-guard-ai.vercel.app → email-deliverability-app.vercel.app.
 * 2026-08-05 실측: /health 200, /api/check 401(missing_api_key), /api/signup 400.
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
