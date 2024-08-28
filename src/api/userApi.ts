import { MenuOriginType } from '@/types/common';

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
  const menus: Array<MenuOriginType> = [
    {
      id: '444',
      parentId: '0',
      children: [
        {
          id: '555',
          parentId: '111',
          prefixName: '/主应用页面调试',
          name: '登录页',
          componentStr: '/login.vue',
          sort: 0,
          hidden: false,
          path: '/login',
          targetType: 0,
        },
        {
          id: '666',
          parentId: '111',
          prefixName: '/主应用页面调试',
          name: '无菜单页面',
          componentStr: '/noMenu.vue',
          sort: 0,
          hidden: false,
          path: '/noMenu',
          targetType: 0,
        },
        {
          id: '667',
          parentId: '111',
          prefixName: '/主应用页面调试',
          name: '404页面',
          componentStr: '/404.vue',
          sort: 0,
          hidden: false,
          path: '/404',
          targetType: 0,
        },
      ],
      prefixName: '/',
      name: '主应用页面调试',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/react子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/react子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/react18子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/404',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'react子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/404',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'vue3子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/404',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'vue2子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
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
