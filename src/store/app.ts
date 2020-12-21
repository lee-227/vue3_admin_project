import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from ".";
import { hotModuleUnregisterModule } from "@/utils/helper/vuexHelper";
import { ProjectConfig } from "@/types/config";
import { getLocal, setLocal } from "@/utils/helper/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnums";
import { deepMerge } from "@/utils";
const NAME = "app";
hotModuleUnregisterModule(NAME);
let timeId: any;
@Module({ namespaced: true, name: NAME, dynamic: true, store: store })
class App extends VuexModule {
  private pageLoadingState = false;
  private projectConfigState: ProjectConfig | null = getLocal(PROJ_CFG_KEY);

  get getPageLoading() {
    return this.pageLoadingState;
  }
  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig);
  }

  @Mutation
  commitPageLoadingState(loading: boolean): void {
    this.pageLoadingState = loading;
  }
  @Mutation
  commitProjectConfigState(proCfg: DeepPartical<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
    setLocal(PROJ_CFG_KEY, this.projectConfigState);
  }

  @Action
  async resumeAllState() {
    //todo
    console.log("清空状态");
  }
  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        this.commitPageLoadingState(loading);
      }, 50);
    } else {
      this.commitPageLoadingState(loading);
      clearTimeout(timeId);
    }
  }
}
export const appStore = getModule<App>(App);
