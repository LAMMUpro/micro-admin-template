import useGlobalStore from '@/store';
import { MenuItemType, MenuOriginType } from '@/types/common';
import { modifyData } from '@/utils';
import Config from '@/utils/Config';
import { sendGlobalData, subAppLocation } from 'micro-app-tools';
import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationRaw,
} from 'vue-router';
import { routerTo } from '.';
import Cookies from 'js-cookie';

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

          path: originMenuItem.path,
          component: originMenuItem.componentStr as any,
          children: parseMenus(originMenuItem.children, key),

          // link: isExternal(originMenuItem.path) ? originMenuItem.path : '',
          // key: key,
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
      console.warn(`路由名称：${name}出现${nameCounter[name]}次`);
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
        result[1][menuItem.path] = (result[1][menuItem.path] || 0) + 1;
      }
      return result;
    },
    [{}, {}] as [BaseObj<number>, BaseObj<number>]
  );
}

/**
 * 从path中提取子应用前缀
 */
export function getSubAppPrefixFromRouteUrl(url: string) {
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
      const subAppPrefix = getSubAppPrefixFromRouteUrl(menu.path);
      if (
        subAppPrefix &&
        window._subAppSettingList_?.find((item) => item.prefix === subAppPrefix)
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
  console.log('menus', globalStore.menus);
  console.log('firstRoute', firstRoute);
  /** 该账户没有一个有效路由 */
  if (!firstRoute) return next({ path: '/noMenu' });
  /** 子应用前缀 */
  const subAppPrefix = getSubAppPrefixFromRouteUrl(firstRoute.path)!;
  return next({
    path: `/${subAppPrefix}`,
    query: {
      [subAppPrefix]: encodeURIComponent(firstRoute.path.replace(`/${subAppPrefix}`, '')),
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

/**
 * 激活路由
 */
export function activeRoute(currentRouteInfo: MenuItemType) {
  currentRouteInfo._isActive_ = true;
  const globalStore = useGlobalStore();

  const menuIndexList = currentRouteInfo.key?.split('-').map((iStr) => +iStr);
  let menuItem: MenuItemType | undefined = {
    children: globalStore.menus,
  } as any;
  menuIndexList?.slice(0, -1).forEach((i) => {
    menuItem = menuItem?.children?.[i];
    menuItem!._hasActive_ = true;
    menuItem!._isOpen_ = true;
  });
}

/**
 * 取消当前路由激活状态
 */
export function setCurrentRouteUnActive(currentRouteInfo?: MenuItemType) {
  if (currentRouteInfo?._isActive_) {
    const globalStore = useGlobalStore();

    currentRouteInfo._isActive_ = false; // 之前菜单的active取消
    const menuIndexList = currentRouteInfo.key?.split('-').map((iStr) => +iStr);
    let menuItem: MenuItemType | undefined = {
      children: globalStore.menus,
    } as any;
    menuIndexList?.slice(0, -1).forEach((i) => {
      menuItem = menuItem?.children?.[i];
      if (menuItem) menuItem._hasActive_ = false;
    });
  }
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
      /** 不存在token，弹出登录弹窗 */
      // globalStore.$reset();
      modifyData(routerTo, to!);
      return false;
    }
  }
  !globalStore.userInfoInited &&
    sendGlobalData({
      emitName: 'reload_global_user',
      parameters: [globalStore.userInfo],
    });
  return true;
}

/**
 * 加载菜单
 */
export async function initMenus() {
  const globalStore = useGlobalStore();

  if (!globalStore.menusInited && !globalStore.menusLoading) {
    await globalStore.loadMenu(); /** 更新Global.menu.info */
    /**
     * 账号未配置菜单, 跳到对应提示页
     */
    if (globalStore.menus.length == 0) {
      return false;
    }
  }
  !globalStore.menusInited &&
    sendGlobalData({
      emitName: 'reload_global_menu',
      parameters: [globalStore.menus],
    });
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
