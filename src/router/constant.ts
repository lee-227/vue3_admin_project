import { AppRouteRecordRaw } from './types';

export const LAYOUT = () => import("@/layouts/default/index.tsx");
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = { name: "" };
export const REDIRECT_NAME = 'Redirect';

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    // {
    //   path: '/redirect/:path(.*)',
    //   name: REDIRECT_NAME,
    //   component: () => import('/@/views/sys/redirect/index.vue'),
    //   meta: {
    //     title: REDIRECT_NAME,
    //     hideBreadcrumb: true,
    //   },
    // },
  ],
};