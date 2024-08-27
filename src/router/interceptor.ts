import Global from '@/Global';
import { Router } from 'vue-router';
import { addAsyncRoute, isAddedAsyncRoutes } from '.';
// import { menuActiveIndex } from '@/layouts/components/Menu.vue';
import { subAppPath } from '@/pages/SubMicroApp.vue';

/**
 * 初始化路由拦截器
 */
export function initRouteInterceptor(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // TODO: 完善登录逻辑
    if (!Global.user.inited.value) Global.user.initData();
    if (!Global.menu.inited.value) Global.menu.initData();
    if (!isAddedAsyncRoutes) addAsyncRoute();

    /**
     * 如果是子应用路由 => 取消之前菜单的激活状态/记录/激活目标菜单
     */
    if ((<string>to.name)?.startsWith('subApp_')) {
      const subAppName = to.path.slice(1);
      /** 子应用path, 例：/vue3/#/activity/list */
      const _subAppPath = to.query[subAppName] as string;
      if (to.path !== from.path) {
        /** // TODO 不延迟会导致跳转其它子应用404 */
        setTimeout(() => {
          /** 设置子应用path，不然可能会跳不到目标页面!!! */
          subAppPath.value = _subAppPath;
        });
      }
    }
    next();
  });

  router.afterEach((to) => {
    // TODO回显激活菜单
    // menuActiveIndex.value = '0-0';
  });
}
