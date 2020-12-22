export function resultSuccess<T = unknown>(result: T, { message = "ok" } = {}) {
  return {
    code: 1,
    result,
    message,
    type: "success"
  };
}
export function resultError(
  message = "Request failed",
  { code = 0, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: "failed"
  };
}
export function getParams<T extends Record<string, string>>(url): T {
  const params = {};
  url
    .split("?")[1]
    .split("&")
    .forEach(item => {
      const [key, val] = item.split("=");
      params[key] = val;
    });
  return params as T;
}
