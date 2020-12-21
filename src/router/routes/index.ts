import { AppRouteRecordRaw } from "../types";
import { t } from "@/hooks/web/useI18n";
export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: t("routes.basic.login")
  }
};

export const asyncRoutes = [LoginRoute];
export const basicRoutes = [LoginRoute];
