import { AxiosTransform } from "./axiosTransform";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { Result, RequestOptions, CreateAxiosOptions } from "./types";
import { errorResult } from "./const";
import {
  ResultEnum,
  RequestEnum,
  ContentTypeEnum
} from "../../../enums/httpEnums";
import { useMessage } from "@/hooks/web/useMessage";
import { isString } from "@/utils/is";
import { formatRequestDate } from "@/utils/dateUtil";
import { setObjToUrlParams, deepMerge } from "@/utils";
import { getToken } from "@/utils/auth";
import { checkStatus } from "./checkStatus";
import VAxios from "./Axios";
import { useGlobSetting } from "@/hooks/setting";
import { useI18n } from "@/hooks/web/useI18n";
const { createMessage, createErrorModal } = useMessage();
const { urlPrefix } = useGlobSetting();
/**
 * 请求处理
 */
const transform: AxiosTransform = {
  /**
   * 处理请求数据
   */
  transformRequestData: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { t } = useI18n();
    const { isTransformRequestResult } = options;
    if (!isTransformRequestResult) return res.data;
    const { data } = res;
    if (!data) return errorResult;
    const { code, result, message } = data;
    const hasSuccess =
      data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;
    if (!hasSuccess) {
      if (message) {
        if (options.errorMessageMode === "modal") {
          createErrorModal({ title: t("sys.api.errorTip"), content: message });
        } else {
          createMessage.error(message);
        }
      }
      Promise.reject(new Error(message));
      return errorResult;
    }
    if (code === ResultEnum.SUCCESS) return result;
    if (code === ResultEnum.ERROR) {
      if (message) {
        createMessage.error(message);
        Promise.reject(new Error(message));
      } else {
        const msg = t('sys.api.errorMessage');
        createMessage.error(msg);
        Promise.reject(new Error(msg));
      }
      return errorResult;
    }
    if (code === ResultEnum.TIMEOUT) {
      const timeoutMsg = t('sys.api.timeoutMessage');
      createErrorModal({ title: t('sys.api.operationFailed'), content: timeoutMsg });
      Promise.reject(new Error(timeoutMsg));
      return errorResult;
    }
    return errorResult;
  },
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    if (config.method === RequestEnum.GET) {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.params = Object.assign(config.params || {}, { _t: now });
      } else {
        config.url = config.url + "?" + config.params + "&_t=" + now;
        config.params = undefined;
      }
    } else {
      if (!isString(config.params)) {
        formatDate && formatRequestDate(config.params);
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.params);
        } else {
          config.data = config.params;
        }
        config.params = undefined;
      } else {
        config.url = config.url + "?" + config.params;
        config.params = undefined;
      }
    }
    return config;
  },
  requestInterceptors: config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  responseInterceptorsCatch: (error: any) => {
    //todo
    const { t } = useI18n();
    const { response, code, message } = error || {};
    const msg: string =
      response && response.data && response.data.error
        ? response.data.error.message
        : "";
    const err: string = error.toString();
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        createMessage.error(t('sys.api.apiTimeoutMessage'));
      }
      if (err && err.includes("Network Error")) {
        createErrorModal({
          title: t('sys.api.networkException'),
          content: t('sys.api.networkExceptionMsg')
        });
      }
    } catch (error) {
      throw new Error(error);
    }
    checkStatus(error.response && error.response.status, msg);
    return Promise.reject(error);
  }
};
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        prefixUrl: urlPrefix,
        headers: { "Content-type": ContentTypeEnum.JSON },
        transform,
        requestOptions: {
          joinPrefix: true, //是否将VUE_APP_API_PREFIX_URL加到url中
          isTransformRequestResult: true, //是否转换结果
          joinParamsToUrl: false, //是否将参数添加到url
          formatDate: true, //是否格式化时间参数
          errorMessageMode: "none", //错误消息的提示模式
          apiUrl: process.env.VUE_APP_API_URL //api前缀
        }
      },
      opt || {}
    )
  );
}
export const http = createAxios();
