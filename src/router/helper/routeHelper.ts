import { AppRouteRecordRaw, AppRouteModule } from "../types";
import { cloneDeep } from "lodash-es";
import { LAYOUT } from "../constant";
import { RouteRecordNormalized, RouteLocationNormalized } from 'vue-router';

// 动态引入
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  if (!routes) return;
  routes.forEach(item => {
    const { component, name } = item;
    const { children } = item;
    if (component) {
      item.component = component;
    } else if (name) {
      item.component = name;
    }
    children && asyncImportRoute(children);
  });
}

function getLayoutComp(comp: string) {
  return comp === "LAYOUT" ? LAYOUT : "";
}

// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(
  routeList: AppRouteModule[]
): T[] {
  routeList.forEach(route => {
    if (route.component) {
      if ((route.component as string).toUpperCase() === "LAYOUT") {
        route.component = getLayoutComp(route.component);
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = "";
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    }
    route.children && asyncImportRoute(route.children);
  });
  return (routeList as unknown) as T[];
}
// Return to the new routing structure, not affected by the original example
export function getRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
