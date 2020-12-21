import { GlobConfig, GlobEnvConfig, ProjectConfig } from "@/types/config";
import getProjectSetting from "@/setting/projectSetting";
const ENV = process.env as GlobEnvConfig;
const {
  VUE_APP_TITLE,
  VUE_APP_API_URL,
  VUE_APP_API_PREFIX_URL,
  VUE_APP_SHORT_NAME
} = ENV;

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const glob: Readonly<GlobConfig> = {
    title: VUE_APP_TITLE,
    apiUrl: VUE_APP_API_URL,
    shortName: VUE_APP_SHORT_NAME,
    urlPrefix: VUE_APP_API_PREFIX_URL
  };
  return glob as Readonly<GlobConfig>;
};
export const useProjectSetting = (): ProjectConfig => {
  return getProjectSetting;
};
