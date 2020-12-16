import { http } from "@/utils/http/axios";
import { dateUtil } from "@/utils/dateUtil";

enum API {
  Login = "/get"
}

export function login(params: any = { name: "123", data: dateUtil() }) {
  return http.request(
    {
      url: API.Login,
      method: "post",
      params
    },
    {
      joinParamsToUrl: true,
      joinPrefix: false,
      formatDate: true
    }
  );
}
