import Global from '@/Global';
import { Router } from 'vue-router';
import { addAsyncRoute, isAddedAsyncRoutes } from '.';

/**
 * 初始化路由拦截器
 */
export function initRouteInterceptor(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // TODO: 完善登录逻辑
    if (!Global.user.inited.value) Global.user.initData();
    if (!Global.menu.inited.value) Global.menu.initData();
    if (!isAddedAsyncRoutes) addAsyncRoute();
    next();
  });
}
