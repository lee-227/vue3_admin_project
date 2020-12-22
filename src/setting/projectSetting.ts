import { ProjectConfig } from "@/types/config";
import { PermissionModeEnum } from "@/enums/appEnums";

const setting: ProjectConfig = {
  closeMessageOnSwitch: true,
  removeAllHttpPending: true,
  locale: {
    show: true,
    lang: "zh_CN",
    fallback: "zh_CN",
    availableLocales: ["zh_CN", "en"]
  },
  permissionMode: PermissionModeEnum.ROLE
};
export default setting;
