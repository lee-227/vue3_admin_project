import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from ".";

let timeId: any;
@Module({ namespaced: true, name: "app", dynamic: true, store: store })
class App extends VuexModule {
  private pageLoadingState = false;

  get getPageLoading() {
    return this.pageLoadingState;
  }
  @Mutation
  commitPageLoadingState(loading: boolean): void {
    this.pageLoadingState = loading;
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
