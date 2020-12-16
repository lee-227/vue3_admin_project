import { message as Message, notification, Modal } from "ant-design-vue";
import { ArgsProps, ConfigProps } from "ant-design-vue/lib/notification";
import { ModalFunc, ModalFuncProps } from "ant-design-vue/lib/modal/Modal";
import {
  InfoCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled
} from "@ant-design/icons-vue";
export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;
}
export declare type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";
export declare type IconType = "success" | "info" | "error" | "warning";
export interface ModalOptionsEx extends Omit<ModalFuncProps, "iconType"> {
  iconType: "success" | "info" | "error" | "warning";
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> &
  Pick<ModalOptionsEx, "content">;
interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}
function getIcon(iconType: string) {
  if (iconType === "warning") {
    return <InfoCircleFilled class="modal-icon-warning" />;
  } else if (iconType === "success") {
    return <CheckCircleFilled class="modal-icon-success" />;
  } else if (iconType === "info") {
    return <InfoCircleFilled class="modal-icon-info" />;
  } else {
    return <CloseCircleFilled class="modal-icon-error" />;
  }
}
function renderContent({ content }: Pick<ModalOptionsEx, "content">) {
  return <div innerHTML={`<div>${content as string}</div>`}></div>;
}
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || "warning";
  Reflect.deleteProperty(options, "icontype");
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options
  };
  return Modal.confirm(opt) as any;
}
const baseOptions = {
  okText: "确定",
  centered: true
};
function createModalOptions(
  options: ModalOptionsPartial,
  icon: string
): ModalOptionsPartial {
  return {
    ...baseOptions,
    ...options,
    content: renderContent(options),
    icon: getIcon(icon)
  };
}
function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, "success"));
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, "close"));
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, "info"));
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, "warning"));
}
notification.config({
  placment: "topRight",
  dutation: 3
});
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
    createConfirm,
    createSuccessModal,
    createErrorModal: createErrorModal,
    createInfoModal,
    createWarningModal
  };
}
