import type { Router } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    NProgress.start();
    return true;
  });

  router.afterEach(async (to) => {
    if (to.meta.loaded) return true;
    NProgress.done();
    return true;
  });
}
