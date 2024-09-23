import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from '.';
import CONSTS from '@/utils/CONSTS';
// import { initRouteInterceptor } from './interceptor';
// import { createPinia } from 'pinia';
// import { createApp } from 'vue';
// import App from '../App.vue';

describe('测试路由拦截', () => {
  const router = createRouter({
    history: createWebHistory(`/${CONSTS.PREFIX_URL}/`),
    routes: baseRoutes,
  });

  // const pinia = createPinia();
  // const app = createApp(App);
  // app.use(pinia);

  // initRouteInterceptor(router);

  test('路由拦截', async () => {
    expect(router.currentRoute.value.fullPath).toBe('/');
    await router.push({ path: '/empty' });
    console.log('fullPath: ', router.currentRoute.value.fullPath);
    expect(router.currentRoute.value.fullPath).toBe('/empty');
    expect(false).toBe(false);
  });
});
