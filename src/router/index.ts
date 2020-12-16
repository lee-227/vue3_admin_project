import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";
import { basicRoutes } from "./routes";

// 创建路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true
  // scrollBehavior: scrollBehavior
});

// 重置路由
export function resetRouter() {
  const resetWhiteNameList = ["Login"];
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
// 配置路由
export function setupRouter(app: App<Element>) {
  app.use(router);
  // createGuard(router);
}
export default router;
