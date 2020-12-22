import { LocaleType } from "@/locales/types";
import { PermissionModeEnum } from "@/enums/appEnums";

export interface GlobConfig {
  title: string;
  apiUrl: string;
  urlPrefix?: string;
  shortName: string;
}
export interface GlobEnvConfig {
  VUE_APP_TITLE: string;
  VUE_APP_API_URL: string;
  VUE_APP_API_PREFIX_URL?: string;
  VUE_APP_SHORT_NAME: string;
}
export interface ProjectConfig {
  closeMessageOnSwitch: boolean;
  removeAllHttpPending: boolean;
  locale: LocaleSetting;
  permissionMode: PermissionModeEnum;
}
export interface LocaleSetting {
  show: boolean;
  // Current language
  lang: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}
