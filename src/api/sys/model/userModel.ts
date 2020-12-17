export interface LoginParams {
  username: string;
  password: string;
}
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}
export interface RoleInfo {
  roleName: string;
  value: string;
}
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}
export interface GetUserInfoByUserIdModel {
  role: RoleInfo;
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 介绍
  desc?: string;
}
