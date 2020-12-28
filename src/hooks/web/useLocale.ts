import { useLocaleSetting } from "../setting/useLocaleSetting";
import { LocaleType } from "@/locales/types";
import { getI18n } from "@/setup/i18n";
import { ref, unref } from "vue";

import moment from "moment";
moment.locale("zh-cn");

const antConfigLocaleRef = ref<any>(null);

export function useLocale() {
  const { getLang, getLocale, setLocale: setLocalSetting } = useLocaleSetting();
  function changeLocale(lang: LocaleType): void {
    (getI18n().global.locale as any).value = lang;
    setLocalSetting({ lang });
    switch (lang) {
      // Simplified Chinese
      case "zh_CN":
        import("ant-design-vue/es/locale/zh_CN").then(locale => {
          antConfigLocaleRef.value = locale.default;
        });

        moment.locale("cn");
        break;
      // English
      case "en":
        import("ant-design-vue/es/locale/en_US").then(locale => {
          antConfigLocaleRef.value = locale.default;
        });
        moment.locale("en-us");
        break;

      // other
      default:
        break;
    }
  }
  function setupLocale() {
    const lang = unref(getLang);
    lang && changeLocale(lang);
  }
  return {
    setupLocale,
    getLocale,
    getLang,
    changeLocale,
    antConfigLocale: antConfigLocaleRef
  };
}
