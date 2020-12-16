import { RoleEnum } from "@/enums/roleEnum";
import { RouteRecordRaw } from "vue-router";
import Component from "@/components/types";

export interface RouteMeta {
  // 标题
  title: string;
  // 是否忽略权限
  ignoreAuth?: boolean;
  // 角色详情
  roles?: RoleEnum[];
  // 是否忽略缓存
  ignoreKeepAlive?: boolean;
  // 是否固定到tab
  affix?: boolean;
  // 图表
  icon?: boolean;
  // 跳转地址
  frameSrc?: boolean;
  // 外链
  externalLink?: boolean;
  //
  transitionName?: string;
  // 隐藏面包屑
  hideBreadcrumb?: boolean;
  //
  carryParam?: boolean;
  //
  single?: boolean;
}
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
}
export interface MenuTag {
  type?: "primary" | "error" | "warn" | "success";
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;
  icon?: string;
  path: string;
  disabled?: boolean;
  children?: Menu[];
  orderNo?: number;
  roles?: RoleEnum[];
  meta?: Partial<RouteMeta>;
  tag?: MenuTag;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

export type AppRouteModule = AppRouteRecordRaw;
