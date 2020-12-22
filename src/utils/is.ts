export const is = (val: unknown, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isString = (val: unknown): val is string => {
  return is(val, "String");
};
export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};
export const isUrl = (path: string): boolean => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};
export const isNull = (val: unknown): val is null => {
  return val === null;
};
export const isUndefined = <T = unknown>(val?: T): val is T => {
  return typeof val === "undefined";
};
export const isDefined = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};
