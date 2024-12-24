import useGlobalStore from '@/store';
import { MenuItemType, MenuOriginType } from '@/types/common';
import { modifyData } from '@/utils';
import Config from '@/utils/Config';
import { isTopApp, subAppLocation } from 'micro-app-tools';
import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationRaw,
} from 'vue-router';
import { routerTo } from '.';
import Cookies from 'js-cookie';
import CONSTS from '@/utils/CONSTS';
import { defineComponent, h } from 'vue';

/**
 * 跳转到PC官网
 */
export function handleNavigate2PC() {
  if (Config.env === 'localhost') {
    // 本地环境跳转到开发环境
    subAppLocation.href = Config.originMap['test'];
  } else {
    subAppLocation.href = '/';
  }
}

/**
 * 从后台拿到的menus数据，要处理一下
 * - hidden的菜单直接过滤掉了，不会存到sessionStorage
 */
export function parseMenus(
  originMenuList?: Array<MenuOriginType>,
  _keyPrefix?: string
): Array<MenuItemType> | undefined {
  if (!originMenuList || !originMenuList.length) return; // 假值或[]直接返回undefined
  const keyPrefix = _keyPrefix ? `${_keyPrefix}-` : '';
  return (
    originMenuList
      // 菜单为hidden的照样注册，hidden是为了不让用户直接点击菜单(比如工单详情)
      // .filter((item) => !item.hidden)
      .map((originMenuItem, index) => {
        const key = `${keyPrefix}${index}`;
        const result: MenuItemType = {
          ...originMenuItem,

          path: (originMenuItem as any).path,
          component: (originMenuItem as any).componentStr as any,
          children: parseMenus(originMenuItem.children, key),

          // link: isExternal(originMenuItem.path) ? originMenuItem.path : '',
          _key_: key,
          redirect: '',
        };
        return result;
      })
  );
}

/**
 * 路由验重
 * - name重复
 * - path重复
 */
export function validateRoutes(menus: MenuOriginType[]) {
  const [nameCounter, pathCounter] = getMenusNamePathCounter(menus);
  for (const name in nameCounter) {
    if (nameCounter[name] > 1)
      console.warn(`路由名称“${name}”出现${nameCounter[name]}次`);
  }
  for (const path in pathCounter) {
    if (pathCounter[path] > 1) console.warn(`路由：${path}出现${pathCounter[path]}次`);
  }
}

/**
 * 获取菜单有效的name、path集合
 */
function getMenusNamePathCounter(menus: MenuOriginType[]) {
  return menus.reduce(
    (result, menuItem) => {
      if (menuItem.children?.length) {
        // 父节点不校验path
        const [nameCounter, pathCounter] = getMenusNamePathCounter(menuItem.children);
        for (const name in nameCounter) {
          result[0][name] = (result[0][name] || 0) + nameCounter[name];
        }
        for (const path in pathCounter) {
          result[1][path] = (result[1][path] || 0) + pathCounter[path];
        }
      } else {
        result[0][menuItem.name] = (result[0][menuItem.name] || 0) + 1;
        if (
          menuItem.targetType === 0 ||
          menuItem.targetType === 1 ||
          menuItem.targetType === 2
        ) {
          result[1][menuItem.path!] = (result[1][menuItem.path!] || 0) + 1;
        }
      }
      return result;
    },
    /**
     * result[0] = { '菜单管理': 2 }
     * result[1] = { '/menu-manage': 1 }
     */
    [{}, {}] as [BaseObj<number>, BaseObj<number>]
  );
}

/**
 * 从path中提取子应用名称
 */
export function getSubAppNameFromRouteUrl(url: string) {
  return url?.match?.(/(?<=^\/).*?(?=\/)/)?.[0];
}

/**
 * 找到第一个有效路由
 * 不是外链、没有隐藏、没有children、配置了对应子应用
 */
export function findFirstEffectRoute(
  menus: Array<MenuItemType>
): MenuItemType | undefined {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.children) {
      const result = findFirstEffectRoute(menu.children);
      if (result) return result;
    } else if (menu.targetType === 1 && !menu.hidden) {
      const subAppName = getSubAppNameFromRouteUrl(menu.path);
      if (
        subAppName &&
        window._subAppSettingList_?.find((item) => item.name === subAppName)
      ) {
        return menu;
      }
    }
  }
}

/**
 * 重定向到第一个有效路由，如果没有重新向到无菜单页
 */
export function handleRedirectFromRoot(
  next: NavigationGuardNext | ((route?: RouteLocationRaw) => void)
) {
  const globalStore = useGlobalStore();
  /** 第一个有效路由 */
  const firstRoute = findFirstEffectRoute(globalStore.menus);
  /** 该账户没有一个有效路由 */
  if (!firstRoute) return next({ path: '/noMenu' });
  /** 子应用前缀 */
  const subAppName = getSubAppNameFromRouteUrl(firstRoute.path)!;
  return next({
    path: `/${subAppName}`,
    query: {
      [subAppName]: encodeURIComponent(firstRoute.path),
    },
  });
}

/**
 * 根据指定值查找menu
 */
export function findMenuBy(
  key: keyof MenuItemType,
  value: string,
  _menus?: Array<MenuItemType>
): MenuItemType | undefined {
  const globalStore = useGlobalStore();
  const menus = _menus ? _menus : globalStore.menus;
  const children: Array<MenuItemType> = [];
  let menu: MenuItemType | undefined;
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    if (item[key] === value) {
      return item;
    }
    children.push(...(item.children || []));
  }
  if (children.length) {
    menu = findMenuBy(key, value, children);
  }
  return menu;
}

/** 初始化用户信息 */
export async function initUserInfo(to?: RouteLocationNormalizedGeneric) {
  const globalStore = useGlobalStore();

  if (!globalStore.userInfoInited && !globalStore.userInfoLoading) {
    /** 如果存在token, 则获取用户信息 */
    if (Cookies.get(Config.tokenKey)) {
      const code = await globalStore.loadUserInfo();
      if (code === 0) {
        /** 登录过期 */
        modifyData(routerTo, to!);
        return false;
      } else if (code !== 1) {
        modifyData(routerTo, to!);
        return false; // 网络错误，获取不到用户登录信息
      }
    } else {
      // globalStore.$reset();
      modifyData(routerTo, to!);
      return false;
    }
  }
  return true;
}

/**
 * 加载菜单
 */
export async function initMenus() {
  const globalStore = useGlobalStore();

  if (!globalStore.menusInited && !globalStore.menusLoading) {
    await globalStore.loadMenu();
    /**
     * 账号未配置菜单
     */
    if (globalStore.menus.length == 0) {
      return false;
    }
  }
  return true;
}

/**
 * 跳转登录页，处理参数，backUrl
 */
export function toLoginPage(
  next: NavigationGuardNext | ((route?: RouteLocationRaw) => void)
) {
  return next({ path: '/login' });
}

const vueFiles = import.meta.glob<typeof import('*.vue')>('../pages/**/*.vue');
/**
 * 获取动态目录文件
 */
function getViewComponent(path: string) {
  return (
    vueFiles[`../pages${path}`] ??
    defineComponent({
      setup() {
        return () => {
          console.warn(`组件不存在: @/pages${path}.vue`);
          return h('div', '页面不存在，请联系管理员');
        };
      },
    })
  );
}

/**
 * 处理全局数据里面的菜单路由，过滤出本应用的菜单
 */
export function generateRoutes(
  routes: Array<MenuItemType>,
  isTopApp: boolean = false
): Array<any> {
  return routes.reduce((result, item) => {
    if (item.children?.length) {
      result.push(...generateRoutes(item.children, isTopApp));
    } else {
      /** 只考虑targetType为主应用页面或子应用页面的情况 */
      if ((isTopApp && item.targetType === 0) || (!isTopApp && item.targetType === 1)) {
        const pathWithoutPrefix = isTopApp
          ? item.path
          : item.path.replace(`/${CONSTS.PREFIX_URL}/#/`, '/');
        result.push({
          ...item,
          /** 中文name很有可能重复，所以用id代替中文name */
          name: '' + item.id,
          /** 从item.url里面提取path */
          path: pathWithoutPrefix,
          component: getViewComponent(item.componentStr || ''),
          meta: {
            title: item.name,
          },
        } as MenuItemType);
      }
    }
    return result;
  }, [] as Array<any>);
}

/**
 * 处理路由meta的parentComponent
 * 如果路由meta存在parentComponent，在本地环境 + 主应用环境下打开，路由会包上一层Layout
 */
export function parseRoutesMetaParentComponent(
  /** 路由 */
  routes: Array<MenuItemType>,
  /** 是否强制添加Layout(条件匹配下) */
  forceAdd: boolean = false
) {
  if (Config.isLocalhost || isTopApp) {
    return routes.map((item) => {
      if (forceAdd || item.meta?.parentComponent) {
        return {
          path: '/',
          name: 'Layout_AutoAdd_' + Date.now() + Math.random().toString(36).substring(2),
          component: forceAdd
            ? () => import('@/layouts/index.vue')
            : item.meta?.parentComponent!,
          children: [item],
        };
      }
      return item;
    });
  } else {
    return routes;
  }
}
