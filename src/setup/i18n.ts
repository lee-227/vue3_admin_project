import { createI18n, I18nOptions, I18n } from "vue-i18n";
import projectSetting from "@/setting/projectSetting";
import { App } from "vue";
import { useLocale } from "@/hooks/web/useLocale";
import localMessage from "@/locales/index";
const { setupLocale } = useLocale();
const { lang, availableLocales, fallback } = projectSetting.locale;

const localeData: I18nOptions = {
  legacy: false,
  locale: lang,
  fallbackLocale: fallback,
  messages: localMessage,
  availableLocales: availableLocales,
  sync: true,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true
};
let i18n: I18n;
export function setupI18n(app: App<Element>) {
  i18n = createI18n(localeData) as I18n;
  setupLocale();
  app.use(i18n);
}
export function getI18n(): I18n {
  return i18n;
}
