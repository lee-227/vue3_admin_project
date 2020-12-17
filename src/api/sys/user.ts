import { http } from "@/utils/http/axios";
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams
} from "./model/userModel";

enum API {
  Login = "/login",
  GetUserInfoById = "/getUserInfoById",
  GetPermCodeByUserId = "/getPermCodeByUserId"
}

export function login(params: LoginParams) {
  return http.request<LoginResultModel>(
    {
      url: API.Login,
      method: "post",
      params
    },
    {
      errorMessageMode: "modal"
    }
  );
}
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return http.request<GetUserInfoByUserIdModel>({
    url: API.GetUserInfoById,
    method: "get",
    params
  });
}
export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return http.request<string[]>({
    url: API.GetPermCodeByUserId,
    method: "get",
    params
  });
}
