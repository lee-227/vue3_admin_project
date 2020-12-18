import Encryption, { EncryptionParams } from "../encryption/aes";
import { cacheCipher, DEFAULT_CACHE_TIME } from "@/setting/encryptionSetting";

export interface CreateStorageParams extends EncryptionParams {
  storage: Storage;
  hasEncrypt: boolean;
}
export const createStorage = ({
  prefixKey = "",
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  hasEncrypt = true
} = {}) => {
  if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
    throw new Error("When hasEncrypt is true, the key or iv must be 16 bits!");
  }
  const encryption = new Encryption({ key, iv });
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: Encryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }
    get(key: string, def: any = null) {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const decItem = this.hasEncrypt
            ? this.encryption.decryptByAES(item)
            : item;
          const data = JSON.parse(decItem);
          const { value, expire } = data;
          if (expire === null || expire >= new Date().getTime()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (error) {
          return def;
        }
      }
      return def;
    }
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }
    clear() {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
