import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import CONSTS from '@/utils/CONSTS';
import { MicroAppConfig } from 'micro-app-tools/data';

/** 基础路由 */
export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // 访问根路径，重定向到/introduce（必须配在第一个）
    redirect: '/introduce',
    name: 'Layout_common',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/introduce',
        name: 'topApp_introduce',
        component: () => import('@/pages/introduce.vue'),
        meta: { title: '介绍页' },
      },
      {
        path: '/404',
        name: 'Page404',
        component: () => import('@/pages/404.vue'),
        meta: { title: '页面不存在', firstRedirect: true },
      },
      {
        path: '/403',
        name: 'Page403',
        component: () => import('@/pages/403.vue'),
        meta: { title: '无权限', firstRedirect: true },
      },
      {
        path: '/onlinePreview',
        name: 'topApp_onlinePreview',
        component: () => import('@/pages/onlinePreview.vue'),
        meta: { title: '在线预览网站' },
      },
      {
        path: '/demo/micromainComponent',
        name: 'topApp_micromainComponent',
        component: () => import('@/pages/demo/micromainComponent.vue'),
        meta: { title: '派发组件源测试' },
      },
      {
        path: '/demo/lottie',
        name: 'topApp_lottie',
        component: () => import('@/pages/demo/lottie.vue'),
        meta: { title: 'lottie源测试' },
      },
      {
        path: '/demo/reactComponent',
        name: 'topApp_reactComponent',
        component: () => import('@/pages/demo/reactComponent.vue'),
        meta: { title: 'reactComponent测试' },
      },
      {
        path: '/demo/lowcodeEngine',
        name: 'topApp_lowcodeEngine',
        component: () => import('@/pages/demo/lowcodeEngine.vue'),
        meta: { title: '低代码渲染器测试' },
      },
      {
        path: '/demo/vueFlow',
        name: 'topApp_vueFlow',
        component: () => import('@/pages/demo/vueFlow/index.vue'),
        meta: { title: 'vueFlow测试' },
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
          firstRedirect: true,
        },
      },
    ],
  },
  {
    path: '/empty',
    name: 'PageEmpty',
    component: () => import('@/pages/empty.vue'),
    meta: { hidden: true, firstRedirect: true },
  },
  {
    path: '/login',
    name: 'PageLogin',
    component: () => import('@/pages/login.vue'),
    meta: { title: '登录页', firstRedirect: true },
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
