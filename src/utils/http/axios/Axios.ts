import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CreateAxiosOptions,
  UploadFileParams,
  RequestOptions,
  Result
} from "./types";
import { isFunction } from "@/utils/is";
import { ContentTypeEnum } from "../../../enums/httpEnums";
import { cloneDeep } from "lodash-es";
import { errorResult } from "./const";
import { AxiosCanceler } from "./axiosCancel";
export default class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  //重新配置axios
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) return;
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }
  /**
   * 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    //请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const {
          headers: { ignoreCancelToken } = { ignoreCancelToken: false }
        } = config;
        !ignoreCancelToken && axiosCanceler.addPending(config);
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config);
        }
        return config;
      },
      undefined
    );
    //请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );
    //响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);
    //响应拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }
  //文件上传
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    if (params.data) {
      Object.keys(params.data).forEach(key => {
        if (!params.data) return;
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data[key]);
      });
    }
    formData.append(params.name || "file", params.file, params.filename);
    return this.axiosInstance.request<T>({
      ...config,
      method: "POST",
      data: formData,
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true
      }
    });
  }
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    const { beforeRequestHook, requestCatch, transformRequestData } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestData && isFunction(transformRequestData)) {
            const ret = transformRequestData(res, opt);
            ret !== errorResult ? resolve(ret) : reject(new Error(ret));
            return;
          }
          resolve((res as unknown) as Promise<T>);
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e));
            return;
          }
          reject(e);
        });
    });
  }
}
