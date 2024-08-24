import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import PageEmpty from '@/pages/empty.vue';
import CONSTS from '@/utils/CONSTS';
import { isSubApp } from 'micro-app-utils';
import { MicroAppConfig } from 'micro-app-utils/data';

/** 工作台路由(默认路由) */
export const adminWorkbenchRoute = {
  path: '/vue3',
  query: {
    admin: '/#/xxx',
  },
};

/** 基础路由 */
export const baseRoutes: Array<RouteRecordRaw> = isSubApp
  ? [
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/layouts/components/Menu.vue'),
        meta: { title: '账号未配置菜单' },
      },
    ]
  : [
      {
        path: '/',
        name: 'Layout_404',
        component: () => import('@/layouts/index.vue'),
        children: [
          {
            path: '/404',
            name: 'page_404',
            component: () => import('@/pages/404.vue'),
            meta: { title: '页面不存在', firstRedirect: adminWorkbenchRoute },
          },
        ],
      },
      {
        path: '/',
        name: 'HeadLayout',
        component: () => import('@/layouts/HeadLayout.vue'),
        children: [
          {
            path: '/noMenu',
            name: 'no_menu',
            component: () => import('@/pages/noMenu.vue'),
            meta: {
              title: '账号未配置菜单',
              firstRedirect: adminWorkbenchRoute,
            },
          },
        ],
      },
      {
        path: '/empty',
        name: 'empty',
        component: PageEmpty,
        meta: { hidden: true },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: { title: '登录页', firstRedirect: adminWorkbenchRoute },
      },
      {
        path: '/',
        name: 'Layout_menu',
        component: () => import('@/layouts/index.vue'),
        children: [
          {
            path: '/:catchAll(.*)',
            name: '_noMatch_',
            component: () => import('@/pages/404.vue'),
            meta: { title: '页面不存在' },
          },
        ],
      },
    ];

/**
 * 生成用户路由(登录成功后才动态添加)
 */
function generateUserRoutes(): Array<RouteRecordRaw> {
  return [
    {
      path: '/',
      name: 'LayoutAsync',
      component: () => import('@/layouts/index.vue'),
      children: [
        /** 各子应用的路由 */
        ...MicroAppConfig.subAppSettingList
          .filter((item) => item.name !== 'micromain')
          .map((item) => ({
            path: `/${item.name}`,
            name: `subApp_${item.name}`,
            component: () => import('@/pages/SubMicroApp.vue'),
            meta: { hidden: true },
          })),
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: '_noMatch_',
      component: () => import('@/pages/404.vue'),
      meta: { title: '页面不存在' },
    },
  ];
}

const router = createRouter({
  history: createWebHistory(`/${CONSTS.PREFIX_URL}/`),
  routes: baseRoutes,
});

export default router;

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MenuItemType = any;

/** 当前路由信息 */
export const currentRouteInfo = ref<MenuItemType>();

/** 路由初始化时信息对象 */
export const routerTo = {
  path: '',
  query: {},
};

/** 是否已添加动态路由 */
export let isAddedAsyncRoutes = false;

/**
 * 添加动态路由，最后添加通配指向404，并跳转到暂存页（如果存在）
 */
export function addAsyncRoute() {
  generateUserRoutes().forEach((item) => {
    if (!router.hasRoute(item.name!)) {
      router.addRoute(item);
    }
  });
  isAddedAsyncRoutes = true;
}
