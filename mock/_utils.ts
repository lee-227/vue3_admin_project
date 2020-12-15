export function resultSuccess<T = unknown>(result: T, { message = "ok" } = {}) {
  return {
    code: 0,
    result,
    message,
    type: "success"
  };
}
export function resultError(
  message = "Request failed",
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: "failed"
  };
}
