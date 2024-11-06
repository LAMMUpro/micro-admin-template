import { NavigationGuardNext, RouteLocationRaw, Router } from 'vue-router';
import { addAsyncRoute, currentRouteInfo, isAddedAsyncRoutes, routerTo } from '.';
// import { menuActiveIndex } from '@/layouts/components/Menu.vue';
import { subAppPath } from '@/pages/SubMicroApp.vue';
import useGlobalStore from '@/store';
import { subAppScrollRef } from '@/layouts/index.vue';
import CONSTS from '@/utils/CONSTS';
import {
  activeRoute,
  findMenuBy,
  handleRedirectFromRoot,
  setCurrentRouteUnActive,
  initUserInfo,
  initMenus,
  toLoginPage,
} from './helper';
import { updateSubAppMenuInfo } from 'micro-app-tools';
import Cookies from 'js-cookie';
import Config from '@/utils/Config';
import { modifyData } from '@/utils';

/** 是否首次跳转, 用于首次重定向跳转菜单配置了firstRedirect的路由 */
let isFirstJump = true;

/**
 * 初始化路由拦截器
 */
export function initRouteInterceptor(router: Router) {
  const globalStore = useGlobalStore();
  router.beforeEach(async (to, from, _next) => {
    /** 使用过next，isFirstJump就是false */
    const next = isFirstJump
      ? (route?: RouteLocationRaw) => {
          isFirstJump = false;
          return _next(route as NavigationGuardNext);
        }
      : _next;

    /**
     * 调试代码
     */
    if (isFirstJump) {
      await initUserInfo(to);
      await initMenus();
    }

    /**
     * 如果token不存在，Global重置、记录路由、跳到/login
     */
    if (!Cookies.get(Config.tokenKey) && to.path !== '/login') {
      // resetAllInfo();
      modifyData(routerTo, to);
      return toLoginPage(next);
    }

    /**
     * 是否是不知名路由（同时也意味未添加动态路由，如果添加过了，有兜底路由to.name肯定不为空）
     * true - 未添加动态路由
     * false - 不一定添加了动态路由，有可能匹配了baseRoutes
     * ps：由于route的父节点也是有效路由，所以这里单独处理path=/的情况
     */
    const isUnknownRoute = to.name === undefined || to.path === '/';

    /**
     * 未添加动态路由  => 初始化用户信息/菜单
     */
    if (isUnknownRoute) {
      /**
       * 尝试获取用户信息
       */
      if (!(await initUserInfo(to))) return toLoginPage(next);
      /**
       * 尝试加载菜单
       */
      if (!(await initMenus())) return next({ path: '/noMenu', replace: true });

      /**
       * 如果未添加动态路由 => 暂存路由
       * (走到这里除了匹配上不带firstRedirect的路由，都是已经【尝试】初始化过用户信息/菜单的了)
       */
      if (!isAddedAsyncRoutes) {
        modifyData(routerTo, to);
      }
    } else if (isFirstJump) {
      /**
       * 匹配上路由 && 是第一次跳转 && meta配置了firstRedirect => 跳到第一个有效菜单
       */
      /** 首次进入且路由匹配上（baseRoutes内） */
      if (to.meta.firstRedirect) {
        handleRedirectFromRoot(next);
      }
    }

    /**
     * 如果用户信息已获取 && 未添加动态路由 => 动态添加路由、【跳转】目标页或当前页(添加完后需要重新跳)
     */
    if (!isAddedAsyncRoutes && globalStore.userInfo.id) {
      addAsyncRoute();
      return next(routerTo.path ? routerTo : { path: to.path, query: to.query });
    }

    /**
     * 如果是子应用路由 且 链接未处于编码状态（处于编码状态是以%2F开头的） => 取消之前菜单的激活状态/记录/激活目标菜单
     */
    if (
      (<string>to.name)?.startsWith('subApp_') &&
      (<string>to.query[to.path.slice(1)])?.startsWith?.('/')
    ) {
      const subAppName = to.path.slice(1);
      /** 子应用path, 例：/admin/#/activity/activityList/index */
      const _subAppPath = to.query[subAppName] as string;
      /**
       * 记录当前页面的菜单路由
       * ps：这里from.fullPath !== to.fullPath去重同页面跳转
       */
      if (_subAppPath && from.fullPath !== to.fullPath) {
        /**
         * 取消之前的路由
         */
        setCurrentRouteUnActive(currentRouteInfo.value);
        /**
         * 激活目标路由
         */
        const tempRoute = findMenuBy('path', _subAppPath.split('?')[0]);

        if (tempRoute?.path) {
          currentRouteInfo.value = tempRoute!;
          /** 激活目标页面 */
          activeRoute(currentRouteInfo.value!);
          /** 更新子应用菜单信息，//TODO，只在子应用首次加载的时候更新 */
          updateSubAppMenuInfo(subAppName, currentRouteInfo.value!);
          if (to.path !== from.path) {
            /** // TODO 不延迟会导致跳转其它子应用404 */
            setTimeout(() => {
              /** 设置子应用path，不然可能会跳不到目标页面 */
              subAppPath.value = _subAppPath;
            });
          }
        }
      }
    }

    /**
     * 如果path是/ => 【跳转】第一个有效路由或/noMenu
     */
    if (to.path === '/') {
      handleRedirectFromRoot(next);
    }

    next();
  });

  router.afterEach((to) => {
    /**
     * 根据路由名动态设置文档的标题
     * 主应用和子应用的设置逻辑不一样
     */
    if (to.meta.title) {
      document.title = `${CONSTS.PREFIX_DOCUMENT_TITLE} - ${
        (to.meta.title as string) || 'MicroAdmin'
      }`;
    }

    /**
     * 滚动到顶部，目前有些小瑕疵: 会先滚动原有页面(不管新页面有没有加载)
     */
    subAppScrollRef.value?.scrollTo(0, 0);
  });
}
