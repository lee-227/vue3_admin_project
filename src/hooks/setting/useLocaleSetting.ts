import { appStore } from "@/store/app";

import getProjectSetting from "@/setting/projectSetting";
import { computed, unref } from "vue";
import { LocaleSetting } from "@/types/config";
import { localeList } from "@/locales";
const getLocale = computed(
  () => appStore.getProjectConfig.locale || getProjectSetting.locale
);
const getLang = computed(() => unref(getLocale).lang);
const getAvailableLocales = computed(
  (): string[] => unref(getLocale).availableLocales
);
const getFallbackLocale = computed((): string => unref(getLocale).fallback);
const getShowLocale = computed(() => unref(getLocale).show);
function setLocale(locale: Partial<LocaleSetting>): void {
  appStore.commitProjectConfigState({ locale });
}
export function useLocaleSetting() {
  return {
    getLocale,
    getLang,
    localeList,
    setLocale,
    getShowLocale,
    getAvailableLocales,
    getFallbackLocale
  };
}
