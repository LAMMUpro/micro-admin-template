import { MenuItemType, MenuOriginType } from '@/types/common';
import Config from '@/utils/Config';
import { subAppLocation } from 'micro-app-utils';

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
