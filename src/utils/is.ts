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
