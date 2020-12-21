import { ProjectConfig } from "@/types/config";

const setting: ProjectConfig = {
  closeMessageOnSwitch: true,
  removeAllHttpPending: true,
  locale: {
    show: true,
    lang: "zh_CN",
    fallback: "zh_CN",
    availableLocales: ["zh_CN", "en"]
  }
};
export default setting;
