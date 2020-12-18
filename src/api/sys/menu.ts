import { getMenuListByIdParams, getMenuListByIdParamsResultModel } from "./model/menuModel";
import { http } from '@/utils/http/axios';

enum Api {
  GetMenuListById = "/getMenuListById"
}
export function getMenuListById(params: getMenuListByIdParams) {
  return http.request<getMenuListByIdParamsResultModel>({
    url: Api.GetMenuListById,
    method: "get",
    params
  });
}
