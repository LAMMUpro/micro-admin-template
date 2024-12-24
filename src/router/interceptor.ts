import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationRaw,
  Router,
} from 'vue-router';
import { addAsyncRoute, currentRouteInfo, routerTo } from '.';
// import { menuActiveIndex } from '@/layouts/components/Menu.vue';
import { subAppPath } from '@/pages/SubMicroApp.vue';
import useGlobalStore from '@/store';
import { subAppScrollRef } from '@/layouts/index.vue';
import CONSTS from '@/utils/CONSTS';
import {
  findMenuBy,
  handleRedirectFromRoot,
  initUserInfo,
  initMenus,
  toLoginPage,
} from './helper';
import { updateSubAppMenuInfo } from 'micro-app-tools';
import Cookies from 'js-cookie';
import Config from '@/utils/Config';
import { modifyData } from '@/utils';
import { menuActiveIndex } from '@/layouts/components/Menu.vue';
import { isAddedAsyncRoutes } from '@/hooks/router';

/** 是否首次跳转, 用于首次重定向跳转菜单配置了firstRedirect的路由 */
let isFirstJump = true;

/**
 * 尝试通过token初始化全局状态
 */
async function tryInitGlobalStoreByToken(
  to: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext | ((route?: RouteLocationRaw) => void)
) {
  if (!Cookies.get(Config.tokenKey)) return;
  /**
   * 尝试获取用户信息，获取失败，跳到登录页
   */
  if (!(await initUserInfo(to))) return toLoginPage(next);
  /**
   * 尝试加载菜单，获取失败，跳到无菜单页
   */
  if (!(await initMenus())) return next({ path: '/noMenu', replace: true });
}

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
     * 调试代码, 首次进入先调一次用户/菜单接口
     */
    if (isFirstJump) {
      await tryInitGlobalStoreByToken(to, next);
    }

    /**
     * 如果token不存在，全局状态重置、记录路由、跳到/login
     */
    if (!Cookies.get(Config.tokenKey) && to.path !== '/login') {
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
      await tryInitGlobalStoreByToken(to, next);
      /**
       * 如果未添加动态路由 => 暂存路由
       * (走到这里除了匹配上不带firstRedirect的路由，都是已经【尝试】初始化过用户信息/菜单的了)
       */
      if (!isAddedAsyncRoutes) {
        modifyData(routerTo, to);
      }
    }

    /**
     * 是第一次跳转 && meta配置了firstRedirect => 尝试获取用户信息、跳到第一个有效菜单（如果没有有效菜单，就跳到无菜单页）
     * 首次进入且路由匹配上（baseRoutes内）
     */
    if (isFirstJump && to.meta.firstRedirect) {
      await tryInitGlobalStoreByToken(to, next);
      handleRedirectFromRoot(next);
    }

    /**
     * 如果用户菜单已获取 && 未添加动态路由 => 动态添加路由、【跳转】目标页或当前页(添加完后需要重新跳)
     */
    if (globalStore.menusInited && !isAddedAsyncRoutes) {
      addAsyncRoute();
      return next(routerTo.path ? routerTo : { path: to.path, query: to.query });
    }

    /**
     * 如果path是/ => 【跳转】第一个有效路由或/noMenu
     */
    if (to.path === '/') {
      handleRedirectFromRoot(next);
    }

    /**
     * 如果是主应用菜单路由(主应用路由的name统一用topApp_为前缀) => 记录/激活目标菜单
     */
    if ((<string>to.name)?.startsWith('topApp_')) {
      /** 激活目标路由 */
      const targetRoute = findMenuBy('path', to.path);

      if (targetRoute?.path) {
        currentRouteInfo.value = targetRoute!;
        /** 激活目标页面对应的菜单 */
        menuActiveIndex.value = currentRouteInfo.value._key_;
      }
    }

    /**
     * 如果是子应用路由(子应用路由的name统一用subApp_为前缀) 且 链接未处于编码状态（处于编码状态是以%2F开头的） => 记录/激活目标菜单
     * ps: 处于编码状态to.fullPath => /vue3?vue3=%2F%23%2FmenuManage
     *   处于半编码状态to.fullPath => /vue3?vue3=/%23/menuManage
     */
    const subAppName = to.path.slice(1); // 例: `vue3`
    if (
      (<string>to.name)?.startsWith('subApp_') &&
      to.fullPath.split(`/${subAppName}?${subAppName}=`)?.[1].startsWith('%2F')
    ) {
      /** 子应用目标页path, 例: `/vue3/#/menu/list?a=1` */
      const _subAppPath = to.query[subAppName] as string;
      /**
       * 记录当前页面的菜单路由
       * ps：这里from.fullPath !== to.fullPath用于去重同页面跳转
       */
      if (_subAppPath && from.fullPath !== to.fullPath) {
        /** 子应用path（不带query查询参数的） */
        const subAppPathWithoutQuery = _subAppPath.split('?')[0];
        /** 激活目标路由 */
        const targetRoute = findMenuBy('path', subAppPathWithoutQuery);

        if (targetRoute?.path) {
          currentRouteInfo.value = targetRoute!;
          /** 激活目标页面对应的菜单 */
          menuActiveIndex.value = currentRouteInfo.value._key_;
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

    next();
  });

  router.afterEach((to) => {
    /**
     * 动态设置文档的标题
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
