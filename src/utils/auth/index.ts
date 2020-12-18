import { userStore } from "@/store/user";

export function getToken(): string {
  return userStore.getTokenState;
}
