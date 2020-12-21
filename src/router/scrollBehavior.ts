import { RouteLocationNormalized } from "vue-router";
// 路由切换时处理滚动行为
export async function scrollBehavior(to: any, from: any, savedPosition: any) {
  const behavior = "smooth";
  if (savedPosition) return { ...savedPosition, behavior };
  if (to.hash) return { el: decodeURI(to.hash), behavior };
  if (
    to.matched.some((m: RouteLocationNormalized) => m.meta.scrollTop === false)
  )
    return false;
  return { left: 0, top: 0, behavior };
}
