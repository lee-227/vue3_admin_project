import { createStorage as create } from "./storageCache";
import { enableStorageEncryption } from "@/setting/encryptionSetting";
const createOptions = (storage = sessionStorage) => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: ""
  };
};
export const WebStorage = create(createOptions());
export const createStorage = (storage: Storage = sessionStorage) => {
  return create(createOptions(storage));
};
export default WebStorage;
  