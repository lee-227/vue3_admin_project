import { AppRouteRecordRaw } from "../types";
import { t } from "@/hooks/web/useI18n";
const ctx = require.context("./modules", true, /\.ts$/);
const routes: AppRouteRecordRaw[] = [];
ctx.keys().forEach(key => {
  routes.push(ctx(key).default);
});
export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: t("routes.basic.login")
  }
};

export const asyncRoutes = [...routes];
export const basicRoutes = [LoginRoute];
