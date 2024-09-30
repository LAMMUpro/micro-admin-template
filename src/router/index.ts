import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import CONSTS from '@/utils/CONSTS';
import { MicroAppConfig } from 'micro-app-utils/data';

/** 工作台路由(默认路由) */
export const adminWorkbenchRoute = {
  path: '/vue3',
  query: {
    admin: '/#/xxx',
  },
};

/** 基础路由 */
export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout_40x',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/404',
        name: 'Page404',
        component: () => import('@/pages/404.vue'),
        meta: { title: '页面不存在', firstRedirect: adminWorkbenchRoute },
      },
      {
        path: '/403',
        name: 'Page403',
        component: () => import('@/pages/403.vue'),
        meta: { title: '无权限', firstRedirect: adminWorkbenchRoute },
      },
      {
        path: '/onlinePreview',
        name: 'onlinePreview',
        component: () => import('@/pages/onlinePreview.vue'),
        meta: { title: '在线预览网站' },
      },
      {
        path: '/demo/micromainComponent',
        name: 'micromainComponent',
        component: () => import('@/pages/demo/micromainComponent.vue'),
        meta: { title: '派发组件源测试' },
      },
      {
        path: '/demo/lottie',
        name: 'lottie',
        component: () => import('@/pages/demo/lottie.vue'),
        meta: { title: 'lottie源测试' },
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
    name: 'PageEmpty',
    component: () => import('@/pages/empty.vue'),
    meta: { hidden: true },
  },
  {
    path: '/login',
    name: 'PageLogin',
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
            name: `${CONSTS.subAppRouteNamePrefix}${item.name}`,
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
