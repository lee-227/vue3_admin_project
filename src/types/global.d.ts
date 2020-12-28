declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare type DeepPartical<T> = {
  [P in keyof T]?: DeepPartical<T[P]>;
};
declare type Nullable<T> = T | null;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}
declare type ComponentRef<
  T extends HTMLElement = HTMLDivElement
> = ComponentElRef<T> | null;
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type TargetContext = '_self' | '_blank';
declare type Dictionary<T> = Record<string, T>;