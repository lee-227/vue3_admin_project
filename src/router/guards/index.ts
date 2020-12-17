import { Router, RouteLocationNormalized } from "vue-router";
import { AxiosCanceler } from "@/utils/http/axios/axiosCancel";
import { setTitle } from "@/utils/browser";
import { createPageLoadingGuard } from './pageLoadingGuard';
import { createProgressGuard } from './progressGuard';

function isHash(href: string) {
  return /^#/.test(href);
}
export function createGuard(router: Router) {
  let axiosCanceler: AxiosCanceler;
  axiosCanceler = new AxiosCanceler();
  const loadedPageMap = new Map<string, boolean>();
  router.beforeEach(async to => {
    to.meta.loaded == !!loadedPageMap.get(to.path);
    try {
      axiosCanceler.removeAllPending();
    } catch (error) {
      console.log("error basic guard");
    }
    return true;
  });
  router.afterEach(to => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      document.body.scrollTo(0, 0);
    loadedPageMap.set(to.path, true);
    setTitle(to.meta.title);
  });
  createPageLoadingGuard(router);
  createProgressGuard(router)
}
