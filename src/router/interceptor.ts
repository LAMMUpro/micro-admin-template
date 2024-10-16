import { Router } from 'vue-router';
import { addAsyncRoute, isAddedAsyncRoutes } from '.';
// import { menuActiveIndex } from '@/layouts/components/Menu.vue';
import { subAppPath } from '@/pages/SubMicroApp.vue';
import useGlobalStore from '@/store';
import { subAppScrollRef } from '@/layouts/index.vue';

/**
 * 初始化路由拦截器
 */
export function initRouteInterceptor(router: Router) {
  const globalStore = useGlobalStore();
  router.beforeEach(async (to, from, next) => {
    // TODO: 完善登录逻辑
    if (!globalStore.userInfo.id) globalStore.loadUserInfo();
    if (!globalStore.menus.length) globalStore.loadMenu();
    if (!isAddedAsyncRoutes) {
      addAsyncRoute();
      return next({ path: to.path, query: to.query });
    }

    /**
     * 如果是子应用路由 => 取消之前菜单的激活状态/记录/激活目标菜单
     */
    if (
      (<string>to.name)?.startsWith('subApp_') &&
      (<string>to.query[to.path.slice(1)])?.startsWith?.('/')
    ) {
      const subAppName = to.path.slice(1);
      /** 子应用path, 例：/vue3/#/activity/list */
      const _subAppPath = to.query[subAppName] as string;

      if (_subAppPath && from.fullPath !== to.fullPath) {
        if (to.path !== from.path) {
          /** // TODO 不延迟会导致跳转其它子应用404 */
          setTimeout(() => {
            /** 设置子应用path，不然可能会跳不到目标页面!!! */
            subAppPath.value = _subAppPath;
          });
        }
      }
    }
    next();
  });

  router.afterEach((to) => {
    // TODO回显激活菜单
    // menuActiveIndex.value = '0-0';

    /**
     * 滚动到顶部，目前有些小瑕疵: 会先滚动原有页面(不管新页面有没有加载)
     */
    subAppScrollRef.value?.scrollTo(0, 0);
  });
}
