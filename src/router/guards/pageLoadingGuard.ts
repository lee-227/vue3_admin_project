import { Router } from "vue-router";
import { userStore } from "@/store/user";
import { appStore } from "@/store/app";

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(async to => {
    if (!userStore.getTokenState) return true;
    if (to.meta.loaded) return true;
    appStore.setPageLoadingAction(true);
    return true;
  });
  router.afterEach(async () => {
    setTimeout(() => {
      appStore.commitPageLoadingState(false);
    }, 300);
    return true;
  });
}
