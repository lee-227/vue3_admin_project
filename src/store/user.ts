import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from ".";
import {
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
  LoginParams
} from "@/api/sys/model/userModel";
import { RoleEnum } from "@/enums/roleEnum";
import { TOKEN_KEY, USER_INFO_KEY, ROLES_KEY } from "@/enums/cacheEnums";
import { getUserInfoById, login } from "@/api/sys/user";
import router from "@/router";
import { PageEnum } from "@/enums/pageEnums";
import { useMessage } from "@/hooks/web/useMessage";
import { getLocal, setLocal } from "@/utils/helper/persistent";
import { hotModuleUnregisterModule } from "@/utils/helper/vuexHelper";
import { useI18n } from "@/hooks/web/useI18n";

const NAME = "user";
hotModuleUnregisterModule(NAME);
export type UserInfo = Omit<GetUserInfoByUserIdModel, "roles">;

function getCache<T>(key: string) {
  const fn = getLocal;
  return fn(key) as T;
}
function setCache(key: string, info: any) {
  if (!info) return;
  setLocal(USER_INFO_KEY, info, true);
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  private userInfoState: UserInfo | null = null;
  private tokenState = "";
  private roleListState: RoleEnum[] = [];

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }
  get getTokenState(): string {
    return this.tokenState || getCache<string>(TOKEN_KEY);
  }
  get getRoleListState(): RoleEnum[] {
    return this.roleListState.length > 0
      ? this.roleListState
      : getCache<RoleEnum[]>(ROLES_KEY);
  }
  @Mutation
  commitResetState(): void {
    this.userInfoState = null;
    setCache(USER_INFO_KEY, null);
    this.roleListState = [];
    setCache(ROLES_KEY, []);
    this.tokenState = "";
    setCache(TOKEN_KEY, "");
  }
  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }
  @Mutation
  commitRoleListState(roleList: RoleEnum[]): void {
    this.roleListState = roleList;
    setCache(ROLES_KEY, roleList);
  }

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info;
    setCache(TOKEN_KEY, info);
  }

  @Action
  async login(
    params: LoginParams,
    goHome = true
  ): Promise<GetUserInfoByUserIdModel | null> {
    try {
      const data = await login(params);
      const { token, userId } = data;
      const userInfo = await this.getUserInfoAction({ userId });
      this.commitTokenState(token);
      goHome && router.push(PageEnum.BASE_HOME)
      return userInfo
    } catch (error) {
      return null
    }
  }
  @Action
  async getUserInfoAction({ userId }: GetUserInfoByUserIdParams) {
    const userInfo = await getUserInfoById({ userId });
    const { role } = userInfo;
    const roleList = [role.value] as RoleEnum[];
    this.commitRoleListState(roleList);
    this.commitUserInfoState(userInfo);
    return userInfo;
  }
  @Action
  async LoginOut(goLogin = false) {
    goLogin && router.push(PageEnum.BASE_LOGIN);
    this.commitResetState();
  }
  @Action
  async confirmLoginOut() {
    const { t } = useI18n();
    const { createConfirm } = useMessage();
    createConfirm({
      iconType: "warning",
      title: t("sys.app.loginOutTip"),
      content: t("sys.app.loginOutMessage"),
      onOk: async () => {
        await this.LoginOut(true);
      }
    });
  }
}
export const userStore = getModule<User>(User);
