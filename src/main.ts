import { createApp, App, ref } from 'vue';
import AppVue from './App.vue';
import router from './router';
import microApp from '@micro-zoe/micro-app';
import { isTopApp } from 'micro-app-tools';
import UseSvg from '@/components/use-svg/index.vue';
import CONSTS from './utils/CONSTS';
/** 样式 */
import '@/style/index.scss';
import {
  ElConfigProvider,
  ElScrollbar,
  ElTree,
  ElTreeV2,
  ElTreeSelect,
  ElMessageBox,
  ElMessage,
} from 'element-plus';
/**
 * 用到的element组件在这里手动导入css样式
 */
import 'element-plus/es/components/message/style/index';
import 'element-plus/es/components/message-box/style/index';
import 'element-plus/es/components/scrollbar/style/index';
import 'element-plus/es/components/tree/style/index';
import 'element-plus/es/components/tree-v2/style/index';
import 'element-plus/es/components/tree-select/style/index';

import { MicroAppInit } from 'micro-app-tools';
import {
  generateDataListener,
  generateGlobalDataListener,
} from 'micro-app-tools/listener';
import {
  MicroComponentInstanceMap,
  MicroComponentMap,
  MicroComponentSlotMap,
} from 'micro-app-tools/data';
import { MicroComponentPropsMap } from 'micro-app-tools/data';
import { renderComponent } from 'micro-app-tools/vue3/renderComponent';
import { initRouteInterceptor } from './router/interceptor';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { Vue3Lottie } from 'vue3-lottie';
import ElDialog from '@/components/el-dialog/index.vue';
import Config from './utils/Config';

/**
 * 启动共享Worker来检测版本更新
 */
function startSharedWorkerForVersionUpdateCheck() {
  const sharedWorker = new SharedWorker(
    new URL('./versionUpdateCheck.js', import.meta.url),
    {
      type: 'module',
    }
  );
  const port = sharedWorker.port;

  /** 接收SharedWorker事件 */
  port.onmessage = function (event) {
    const eventType: 'version-change' = event.data.type;
    if (eventType === 'version-change') {
      ElMessageBox.confirm('版本有更新，是否立即刷新页面?', '更新提示', {
        confirmButtonText: '立即刷新',
        cancelButtonText: '稍后手动刷新',
        type: 'warning',
        closeOnClickModal: false,
      })
        .then(() => {
          location.reload();
        })
        .catch(() => {
          ElMessage.info('您已取消更新, 之后请手动刷新该页面');
        });
      document.removeEventListener('visibilitychange', visibilitychangeCallback);
    } else if (eventType === 'console') {
      console.log(event.data.msg);
    }
  };

  /** 当前页面刷新不会触发page-visible事件，需要手动调一次 */
  port.postMessage({ type: 'page-visible' });

  /**
   * 页面显示、隐藏事件回调函数
   */
  function visibilitychangeCallback() {
    if (document.visibilityState === 'hidden') {
      port.postMessage({ type: 'page-hidden' });
    } else if (document.visibilityState === 'visible') {
      port.postMessage({ type: 'page-visible' });
    }
  }

  /** 监听页面显示/隐藏 */
  document.addEventListener('visibilitychange', visibilitychangeCallback);

  /** 监听页面显示/隐藏 */
  window.addEventListener('beforeunload', () => {
    port.postMessage({ type: 'page-unload' });
    port.close();
  });
}

/**
 * 线上环境启动版本更新检测
 */
if (!Config.isLocalhost) {
  startSharedWorkerForVersionUpdateCheck();
}

/** microApp数据监听回调 */
const dataListener = generateDataListener({
  micro_component_request: ({
    subAppNameList,
    componentName,
    elementId,
    props,
    slotNameList,
  }) => {
    /** 主应用派发组件(有可能是组件或导入函数) */
    const MicroComponent = MicroComponentMap[componentName];

    if (!MicroComponent) return console.error(`派发失败: 没有注册组件<${componentName}>`);

    /** 首次渲染 */
    if (!MicroComponentPropsMap[elementId]) {
      MicroComponentPropsMap[elementId] = ref({ ...props! });
      renderComponent({
        subAppNameList,
        component: MicroComponent,
        elementId,
        slotNameList,
      });
    } else {
      /** 再次更新 */
      MicroComponentPropsMap[elementId].value = { ...props };
    }
  },
  micro_component_destroy: (elementId: string) => {
    if (MicroComponentPropsMap[elementId]) delete MicroComponentPropsMap[elementId];
  },
  micro_component_clear_props_slots: (elementId: string) => {
    MicroComponentInstanceMap[elementId]?.unmount();
    delete MicroComponentPropsMap[elementId];
    delete MicroComponentSlotMap[elementId];
  },
});

window._subAppSettingList_ = [
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
  {
    name: 'vue2v',
    prefix: 'vue2v',
    routerMode: 'hash',
    urlMap: {
      localhost: '//127.0.0.1:1350/vue2v/',
      test: 'https://micro-admin-template.lammu.cn/vue2v/',
      pre: 'https://micro-admin-template.lammu.cn/vue2v/',
      master: 'https://micro-admin-template.lammu.cn/vue2v/',
    },
    builder: 'vite',
    iframe: true,
    framework: 'vue2',
  },
];

/** 初始化微前端配置 */
MicroAppInit<'localhost' | 'test' | 'pre' | 'master'>({
  env: process.env.NODE_ENV === 'development' ? 'localhost' : 'master',
  tagName: CONSTS.microAppTagName,
  ElConfigProvider,
  dataListener,
  subAppSettingList: window._subAppSettingList_,
  MicroComponentMap: {
    /**
     * 主应用组件
     */
    Lottie: Vue3Lottie,
    UseSchemaRender: () => import('@/components/use-schema-render/index.vue'),
    UseSvg: UseSvg,
    UseTinymce: () => import('@/components/use-tinymce/index.vue'),
    /**
     * 一些基础页面
     */
    Page404: () => import('@/pages/404.vue'),
    Page403: () => import('@/pages/403.vue'),
    PageEmpty: () => import('@/pages/empty.vue'),
    PageLogin: () => import('@/pages/login.vue'),
    /**
     * ElementPlus二开组件
     */
    ElDialog: ElDialog,
    /**
     * ElementPlus组件
     */
    ElScrollbar: ElScrollbar,
    ElTree: ElTree,
    ElTreeV2: ElTreeV2,
    ElTreeSelect: ElTreeSelect,
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
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

/** 初始化路由拦截器 */
initRouteInterceptor(router);

// 注册全局组件: `use-svg`
app.component('use-svg', UseSvg);
app.mount('#__micro-app-main');

/** microApp全局数据监听回调 */
let globalDataListener: (data: BaseObj<any>) => void;

globalDataListener = generateGlobalDataListener({
  /** 暂无 */
});

/** 当作主应用运行时 */
if (isTopApp) {
  microApp.addGlobalDataListener(globalDataListener);

  /**
   * 共享主应用的router对象，用于子应用控制主应用跳转到其它子应用
   * 子应用可以通过window.microApp.router.getBaseAppRouter()获取
   */
  microApp.router.setBaseAppRouter(router);

  /**
   * 预加载子应用所需资源
   */
  // microApp.preFetch(
  //   [
  //     {
  //       name: 'element-plus.css',
  //       url: `/${CONSTS.PREFIX_URL}/element-plus.2.2.36.full.min.css`,
  //       level: 1,
  //     }, // 加载资源并解析
  //   ],
  //   2000
  // );
}
