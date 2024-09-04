import { createApp, App, ref, defineAsyncComponent } from 'vue';
import AppVue from './App.vue';
import router from './router';
import microApp from '@micro-zoe/micro-app';
import { isSubApp } from 'micro-app-utils';
import SvgIcon from '@/components/svg-icon/index.vue';
import CONSTS from './utils/CONSTS';
/** 样式 */
import '@/style/index.scss';
/**
 * 用到的element组件在这里手动导入css样式
 */
import 'element-plus/es/components/message/style/index';
import 'element-plus/es/components/scrollbar/style/index';
import { MicroAppInit } from 'micro-app-utils';
import { generateGlobalDataListener } from 'micro-app-utils/listener';
import { MicroComponentMap } from 'micro-app-utils/data';
import { MicroComponentPropsMap } from 'micro-app-utils/data';
import { renderComponent } from 'micro-app-utils/vue3/renderComponent';
import { initGlobalStore } from './Global';
import { initRouteInterceptor } from './router/interceptor';
import { Component } from 'vue';
import { ElConfigProvider } from 'element-plus';

/** 初始化全局数据 */
initGlobalStore();

/** 初始化路由拦截器 */
initRouteInterceptor(router);

/** 初始化微前端配置 */
MicroAppInit<'localhost' | 'test' | 'pre' | 'master'>({
  env: process.env.NODE_ENV === 'development' ? 'localhost' : 'master',
  tagName: CONSTS.microAppTagName,
  ElConfigProvider,
  subAppSettingList: [
    {
      name: 'micromain',
      prefix: 'micromain',
      routerMode: 'history',
      urlMap: {
        localhost: '//127.0.0.1:1314/micromain/',
        test: 'https://micro-admin-template.lammu.cn/micromain/',
        pre: 'https://micro-admin-template.lammu.cn/micromain/',
        master: 'https://micro-admin-template.lammu.cn/micromain/',
      },
      builder: 'vite',
      iframe: true,
      framework: 'vue3',
    },
    {
      name: 'vue3',
      prefix: 'vue3',
      routerMode: 'hash',
      urlMap: {
        localhost: '//127.0.0.1:1320/vue3/',
        test: 'https://micro-admin-template.lammu.cn/vue3/',
        pre: 'https://micro-admin-template.lammu.cn/vue3/',
        master: 'https://micro-admin-template.lammu.cn/vue3/',
      },
      builder: 'vite',
      iframe: true,
      framework: 'vue3',
    },
    {
      name: 'vue2',
      prefix: 'vue2',
      routerMode: 'hash',
      urlMap: {
        localhost: '//127.0.0.1:1330/vue2/',
        test: 'https://micro-admin-template.lammu.cn/vue2/',
        pre: 'https://micro-admin-template.lammu.cn/vue2/',
        master: 'https://micro-admin-template.lammu.cn/vue2/',
      },
      builder: 'webpack',
      iframe: false,
      framework: 'vue2',
    },
    {
      name: 'react18',
      prefix: 'react18',
      routerMode: 'hash',
      urlMap: {
        localhost: '//127.0.0.1:1340/react18/',
        test: 'https://micro-admin-template.lammu.cn/react18/',
        pre: 'https://micro-admin-template.lammu.cn/react18/',
        master: 'https://micro-admin-template.lammu.cn/react18/',
      },
      builder: 'vite',
      iframe: true,
      framework: 'react18',
    },
  ],
  MicroComponentMap: {
    SvgIcon: SvgIcon,
    BaseDialog: () => import('@/components/base-dialog/index.vue'),
    /**
     * 一些基础页面
     */
    Page404: () => import('@/pages/404.vue'),
    Page403: () => import('@/pages/403.vue'),
    PageEmpty: () => import('@/pages/empty.vue'),
    PageLogin: () => import('@/pages/login.vue'),
  },
});

/** 启动微前端 */
microApp.start({
  tagName: CONSTS.microAppTagName,
  /** 防止子应用请求父应用资源（部署时需要配置这个url指向这个文件） */
  iframeSrc: `/${CONSTS.PREFIX_URL}/empty.html`,
  'keep-router-state': true,
  globalAssets: {
    js: [],
    css: [],
  },
  /** 不处理指定的css / js文件 */
  excludeAssetFilter(assetUrl) {
    if (assetUrl === 'xxxx.js') {
      return true; // 返回true则micro-app不会劫持处理当前文件
    }
    return false;
  },
});

const app: App<Element> = createApp(AppVue);
app.use(router);
// 注册全局组件: `svg-icon`
app.component('svg-icon', SvgIcon);
app.mount('#__micro-app-main');

/** microApp全局数据监听回调 */
let globalDataListener: (data: BaseObj<any>) => void;

globalDataListener = generateGlobalDataListener({
  micro_component: ({ subAppName, componentName, elementId, props, slotNameList }) => {
    /** 主应用派发组件(有可能是组件或导入函数) */
    const MicroComponent = MicroComponentMap[componentName];

    if (!MicroComponent) return console.error(`派发失败: 没有配置组件<${componentName}>`);

    if (!MicroComponentPropsMap[elementId]) {
      MicroComponentPropsMap[elementId] = ref({ ...props! });
      let component: Component;
      /**
       * MicroComponent是组件
       */
      if (
        Object.prototype.toString.call(MicroComponent.name) === '[object String]' &&
        Object.prototype.toString.call((<any>MicroComponent)?.setup) ===
          '[object Function]'
      ) {
        component = MicroComponent;
      } else {
        /**
         * MicroComponent是导入函数, 需要使用defineAsyncComponent转一下 // TODO判断逻辑
         */
        component = defineAsyncComponent(MicroComponent as () => Promise<any>);
      }
      renderComponent({
        component,
        elementId,
        slotNameList,
        subAppName,
      });
    } else {
      MicroComponentPropsMap[elementId].value = { ...props };
    }
  },
  micro_component_destroy: (elementId: string) => {
    if (MicroComponentPropsMap[elementId]) delete MicroComponentPropsMap[elementId];
  },
});

/** 当作主应用运行时 */
if (!isSubApp) {
  microApp.addGlobalDataListener(globalDataListener);

  /**
   * 共享主应用的router对象，用于子应用控制主应用跳转到其它子应用
   * 子应用可以通过window.microApp.router.getBaseAppRouter()获取
   */
  microApp.router.setBaseAppRouter(router);

  /**
   * 预加载子应用所需资源
   */
  // microApp.preFetch([
  //   { name: 'element-plus.css', url: '/kchadmin/element-plus.2.2.20.full.min.css', level: 1 }, // 加载资源并解析
  // ], 2000);
}
