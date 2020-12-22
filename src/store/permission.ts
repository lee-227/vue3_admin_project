import { useMessage } from "@/hooks/web/useMessage";
import { hotModuleUnregisterModule } from "@/utils/helper/vuexHelper";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from ".";
import { Menu, AppRouteRecordRaw } from "@/router/types";
import { userStore } from "./user";
import { toRaw } from "vue";
import { appStore } from "./app";
import { PermissionModeEnum } from "@/enums/appEnums";
import { asyncRoutes } from "@/router/routes";
import { filter } from "@/utils/helper/treeHeleper";
import { getMenuListById } from "@/api/sys/menu";
import { transformObjToRoute } from "@/router/helper/routeHelper";
import { transformRouteToMenu } from "@/router/helper/menuHelper";
import { useI18n } from "@/hooks/web/useI18n";

const { createMessage } = useMessage();
const NAME = "permission";
hotModuleUnregisterModule(NAME);

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Permission extends VuexModule {
  private permCodeListState: string[] = [];
  private isDynamicAddedRouteState = false;
  private lastBuildMenuTimeState = 0;
  private backMenuListState: Menu[] = [];

  get getPermCodeListState() {
    return this.permCodeListState;
  }
  get getBackMenuListState() {
    return this.backMenuListState;
  }
  get getLastBuildMenuTimeState() {
    return this.lastBuildMenuTimeState;
  }
  get getIsDynamicAddedRouteState() {
    return this.isDynamicAddedRouteState;
  }

  @Mutation
  commitPermCodeListState(codeList: string[]) {
    this.permCodeListState = codeList;
  }
  @Mutation
  commitBackMenuListState(list: Menu[]): void {
    this.backMenuListState = list;
  }
  @Mutation
  commitLastBuildMenuTimeState(): void {
    this.lastBuildMenuTimeState = new Date().getTime();
  }
  @Mutation
  commitDynamicAddedRouteState(added: boolean): void {
    this.isDynamicAddedRouteState = added;
  }
  @Mutation
  commitResetState(): void {
    this.isDynamicAddedRouteState = false;
    this.permCodeListState = [];
    this.backMenuListState = [];
    this.lastBuildMenuTimeState = 0;
  }

  @Action
  async buildRoutesAction(id?: number | string): Promise<AppRouteRecordRaw[]> {
    const { t } = useI18n();
    let routes: AppRouteRecordRaw[] = [];
    const roleList = toRaw(userStore.getRoleListState);
    const { permissionMode } = appStore.getProjectConfig;
    if (permissionMode === PermissionModeEnum.ROLE) {
      routes = filter(asyncRoutes, (route: AppRouteRecordRaw) => {
        const { meta } = route as AppRouteRecordRaw;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some(role => roles.includes(role));
      });
    } else if (permissionMode === PermissionModeEnum.BACK) {
      createMessage.loading({
        content: t('sys.app.menuLoading'),
        duration: 1
      });
      const paramId = id || userStore.getUserInfoState.userId;
      if (!paramId) {
        throw new Error("paramId is undefined!");
      }
      let routeList: any[] = await getMenuListById({ id: paramId });
      routeList = transformObjToRoute(routeList);
      const backMenuList = transformRouteToMenu(routeList);
      this.commitBackMenuListState(backMenuList);
      routes = routeList;
    }
    return routes;
  }
}
export const permissionStore = getModule<Permission>(Permission);
