import { isUndefined, isNull } from "@/utils/is";
import { App } from "vue";
import { ProjectConfig } from "@/types/config";
import { getLocal } from "@/utils/helper/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnums";
import { deepMerge } from "@/utils";
import projectSetting from "@/setting/projectSetting";
import { appStore } from "@/store/app";
let app: App;
export function setApp(_app: App): void {
  app = _app;
}
export function getApp(): App {
  return app;
}

export function getConfigProvider() {
  function transformCellText({ text }: { text: string }) {
    if (isNull(text) || isUndefined(text)) {
      return " - ";
    }
    return text;
  }
  return {
    transformCellText
  };
}
export function initAppConfigStore() {
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  //todo
  appStore.commitProjectConfigState(projCfg);
}
