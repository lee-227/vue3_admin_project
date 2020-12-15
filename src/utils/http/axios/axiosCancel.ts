import axios, { Canceler, AxiosRequestConfig } from "axios";
import { isFunction } from "@/utils/is";

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export class AxiosCanceler {

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancle => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancle);
        }
      });
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancle = pendingMap.get(url);
      cancle && cancle(url);
      pendingMap.delete(url);
    }
  }

  removeAllPending() {
    pendingMap.forEach(cancle => {
      cancle && isFunction(cancle) && cancle();
    });
    pendingMap.clear();
  }
  
  reset() {
    pendingMap = new Map<string, Canceler>();
  }
}
