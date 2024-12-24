/**
 * 动态变量统一不要和函数混在一起，否则会报错：Cannot access 'globalStore' before initialization
 */

import { MenuItemType } from '@/types/common';
import { ref } from 'vue';

// TODO类型
export const currentRouteInfo = ref<MenuItemType>();

/** 路由初始化时信息对象 */
export const routerTo = {
  path: '',
  query: {},
};

/** 是否已添加动态路由 */
export let isAddedAsyncRoutes = false;
export function updateIsAddedAsyncRoutes(value: boolean) {
  isAddedAsyncRoutes = value;
}

/** 动态路由暂存 */
export let asyncRoutes: Array<any> = []; // TODO类型
export function updateAsyncRoutes(value: Array<any>) {
  asyncRoutes = value;
}
