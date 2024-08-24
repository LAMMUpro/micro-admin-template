import { MenuItemType } from '@/types/common';

/**
 * // TODO: 获取用户信息
 */
export async function getUserInfo() {
  return {
    code: 1,
    data: {
      avatar: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      email: 'ccc.126.com',
      id: '10086',
      name: '张小凡',
      phone: '11111111111',
    },
  };
}

/**
 * // TODO: 获取用户菜单
 */
export async function getUserMenus() {
  const menus: Array<MenuItemType> = [
    {
      id: '444',
      parentId: '0',
      children: [
        {
          id: '555',
          parentId: '111',
          resourceType: 1,
          prefixName: '/主应用页面调试',
          name: '登录页',
          icon: '',
          componentStr: '/login.vue',
          sort: 0,
          hidden: false,
          path: '/login',
        },
        {
          id: '666',
          parentId: '111',
          resourceType: 1,
          prefixName: '/主应用页面调试',
          name: '无菜单页面',
          icon: '',
          componentStr: '/noMenu.vue',
          sort: 0,
          hidden: false,
          path: '/noMenu',
        },
        {
          id: '666',
          parentId: '111',
          resourceType: 1,
          prefixName: '/主应用页面调试',
          name: '404页面',
          icon: '',
          componentStr: '/404.vue',
          sort: 0,
          hidden: false,
          path: '/404',
        },
      ] as MenuItemType[],
      resourceType: 1,
      prefixName: '/',
      name: '主应用页面调试',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      componentStr: '',
      sort: 0,
      hidden: false,
      path: '',
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          resourceType: 1,
          prefixName: '/react子应用',
          name: '首页',
          icon: '',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/',
        },
      ] as MenuItemType[],
      resourceType: 1,
      prefixName: '/',
      name: 'react子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      componentStr: '',
      sort: 0,
      hidden: false,
      path: '',
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          resourceType: 1,
          prefixName: '/vue3子应用',
          name: '404',
          icon: '',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/404',
        },
        {
          id: '222',
          parentId: '111',
          resourceType: 1,
          prefixName: '/vue3子应用',
          name: '403',
          icon: '',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/403',
        },
        {
          id: '222',
          parentId: '111',
          resourceType: 1,
          prefixName: '/vue3子应用',
          name: 'empty',
          icon: '',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/empty',
        },
      ] as MenuItemType[],
      resourceType: 1,
      prefixName: '/',
      name: 'vue3子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      componentStr: '',
      sort: 0,
      hidden: false,
      path: '',
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          resourceType: 1,
          prefixName: '/vue2子应用',
          name: '首页',
          icon: '',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/',
        },
      ] as MenuItemType[],
      resourceType: 1,
      prefixName: '/',
      name: 'vue2子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      componentStr: '',
      sort: 0,
      hidden: false,
      path: '',
    },
  ];
  return {
    code: 1,
    data: {
      menus,
      permissions: [],
    },
  };
}
