import { Router, RouteLocationNormalized } from "vue-router";
import { AxiosCanceler } from "@/utils/http/axios/axiosCancel";
import { setTitle } from "@/utils/browser";
import { createPageLoadingGuard } from "./pageLoadingGuard";
import { createProgressGuard } from "./progressGuard";
import { useGlobSetting, useProjectSetting } from "@/hooks/setting";
import { Modal, notification } from "ant-design-vue";
import { useI18n } from "@/hooks/web/useI18n";
import { createPermissionGuard } from "./permissionGuard";

const globSetting = useGlobSetting();
const { removeAllHttpPending, closeMessageOnSwitch } = useProjectSetting();

function isHash(href: string) {
  return /^#/.test(href);
}
export function createGuard(router: Router) {
  let axiosCanceler: AxiosCanceler | null;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  const loadedPageMap = new Map<string, boolean>();
  router.beforeEach(async to => {
    to.meta.loaded == !!loadedPageMap.get(to.path);
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll();
        notification.destroy();
      }
      removeAllHttpPending && axiosCanceler!.removeAllPending();
    } catch (error) {
      console.log("error basic guard");
    }
    return true;
  });
  router.afterEach(to => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      document.body.scrollTo(0, 0);
    loadedPageMap.set(to.path, true);
    const { t } = useI18n();
    setTitle(t(to.meta.title), globSetting.title);
  });
  createPageLoadingGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}
