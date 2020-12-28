import { isFunction } from "@/utils/is";

export interface DebounceAndThrottleOptions {
  // 立即执行
  immediate?: boolean;

  // 是否为debounce
  debounce?: boolean;
  // 只执行一次
  once?: boolean;
}
export type CancelFn = () => void;

export type DebounceAndThrottleProcedure<T extends unknown[]> = (
  ...args: T
) => unknown;

export type DebounceAndThrottleProcedureResult<T extends unknown[]> = [
  DebounceAndThrottleProcedure<T>,
  CancelFn
];

export function throttle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T> {
  if (!isFunction(handle)) {
    throw new Error("handle is not function");
  }
  let { immediate = false } = options;
  const { once = false, debounce = false } = options;
  let timeoutId: Nullable<TimeoutHandle>;
  let cancelled: boolean | null = false;
  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  function cancel() {
    clearTimer();
    cancelled = true;
  }
  function cancelExec() {
    once && cancel();
  }
  function fn(this: unknown, ...args: T) {
    if (cancelled) return;
    const exec = () => {
      !debounce && clearTimer();
      handle.apply(this, args);
      cancelExec();
    };
    if (immediate) {
      immediate = false;
      const callNow = !timeoutId;
      if (callNow) {
        exec();
        timeoutId = null;
      }
    } else {
      debounce && clearTimer();
      if (!timeoutId || debounce) {
        timeoutId = setTimeout(exec, wait);
      }
    }
  }
  return [fn, cancel];
}
export function useThrottle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T> {
  return throttle(handle, wait, options);
}
