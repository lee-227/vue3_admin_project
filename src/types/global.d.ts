declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare type DeepPartical<T> = {
  [P in keyof T]?: DeepPartical<T[P]>;
};
