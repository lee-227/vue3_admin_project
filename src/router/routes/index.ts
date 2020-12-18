import { AppRouteRecordRaw } from "../types";

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "登录"
  }
};

export const asyncRoutes = [LoginRoute];
export const basicRoutes = [LoginRoute];
