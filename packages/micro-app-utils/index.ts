/**
 * 微前端相关变量
 */
import { defineAsyncComponent, defineComponent, h } from 'vue';
import microApp from '@micro-zoe/micro-app';
import {
  microAppComponentPath,
  microAppComponentProps,
  MicroAppConfig,
  MicroComponentMap,
  setDataListener,
  setElConfigProvider,
} from './data';
import {
  BaseObj,
  MicroAppComponentEmit,
  MicroAppComponentProps,
  MicroAppGlobalEmit,
  MicroComponentType,
  SubAppSetting,
} from './types';

/**
 * 微前端初始化
 */
export function MicroAppInit<Envs extends string>(options: {
  /** 标签名称, 必须以micro-app-开头，不允许大写字母 */
  tagName: string;
  env: Envs;
  subAppSettingList: Array<SubAppSetting<Envs>>;
  /**
   * 派发组件注册（主应用需要传）
   * @example { SvgIcon: SvgIcon }
   * @example { SvgIcon: () => import('@/components/svg-icon/index.vue') }
   */
  MicroComponentMap?: {
    [key: string]: MicroComponentType;
  };
  /** 需要把element-plus ElConfigProvider组件传过来用（主应用需要传） */
  ElConfigProvider?: any;
  /** 应用数据监听函数, 用于中间应用传递事件 */
  dataListener?: (data: BaseObj<any>) => void;
}) {
  const { tagName, env, subAppSettingList, ElConfigProvider, dataListener } = {
    ...options,
  };

  MicroAppConfig.env = env;
  MicroAppConfig.tagName = tagName;
  MicroAppConfig.subAppSettingList = subAppSettingList;
  setElConfigProvider(ElConfigProvider);
  setDataListener(dataListener);

  /**
   * 检查subAppSettingList是否存在name冲突
   */
  (function checkSubAppNameIsRight() {
    const subAppNameList = subAppSettingList.map((item) => item.name);
    const nameCountMap = subAppNameList.reduce((map, name) => {
      map[name] = (map[name] || 0) + 1;
      return map;
    }, {} as { [key: string]: number });
    const resultKeys = Object.keys(nameCountMap).filter((key) => nameCountMap[key] > 1);
    if (resultKeys.length) console.error(`以下子应用name存在冲突:${resultKeys}`);
  })();

  if (options.MicroComponentMap) {
    /**
     * 存的时候就转好，之后可以直接使用h函数渲染
     */
    Object.keys(options.MicroComponentMap).forEach((componentName) => {
      const MicroComponent = options.MicroComponentMap![componentName];
      /**
       * MicroComponent是组件
       */
      if (
        Object.prototype.toString.call(MicroComponent.name) === '[object String]' &&
        Object.prototype.toString.call((<any>MicroComponent)?.setup) ===
          '[object Function]'
      ) {
        MicroComponentMap[componentName] = MicroComponent;
      } else {
        /**
         * MicroComponent是导入函数, 需要使用defineAsyncComponent转一下 // TODO判断逻辑
         */
        MicroComponentMap[componentName] = defineAsyncComponent(
          MicroComponent as () => Promise<any>
        );
      }
    });
  }
}

/** 是否是顶级应用 */
export const isTopApp = !window.__MICRO_APP_ENVIRONMENT__;

/** 是否子应用(应用是否在微前端环境下, isSubApp为true时是无法判断处于第几层嵌套的) */
export const isSubApp = window.__MICRO_APP_ENVIRONMENT__ || false;

/**
 * 主应用路由前缀(微前端环境下) || 当前应用的路由前缀(非微前端环境下)
 */
export const parentAppName = (
  isSubApp ? window.rawWindow : window
)?.location.pathname?.match?.(/(?<=^\/).*?(?=\/)/)?.[0];

/**
 * 子应用本身的location
 * 微前端环境下取子应用的location
 * 非微前端环境取本身的location
 */
export const subAppLocation = (
  {
    with: window,
    iframe: window.microApp,
  }[window.__MICRO_APP_SANDBOX_TYPE__!] || window
).location;

/**
 * 微前端往上发送数据 / 事件 (会先清空在发送)
 * 只有处于微前端环境才有效
 * @example sendDataUp({ emitName: 'update_global_user' });
 */
export function sendDataUp(data: MicroAppComponentProps | MicroAppComponentEmit) {
  if (isSubApp) {
    window.microApp?.clearData();
    window.microApp?.dispatch(data);
  }
}

/**
 * 微前端往下发送数据 / 事件 (会先清空在发送)
 * @example sendDataDown({ emitName: 'update_global_user' });
 */
export function sendDataDown(
  subAppName: string,
  data: MicroAppComponentProps | MicroAppComponentEmit
) {
  microApp.clearData(subAppName);
  microApp.setData(subAppName, data as any);
}

/**
 * 微前端发送全局数据 / 事件 (会先清空在发送)
 * 如果是主应用则microApp.setGlobalData，如果是子应用则window.microApp?.setGlobalData
 * @example sendGlobalData({ emitName: 'update_global_user' });
 */
export function sendGlobalData(data: MicroAppComponentProps | MicroAppGlobalEmit) {
  if (isSubApp) {
    window.microApp?.clearGlobalData();
    window.microApp?.setGlobalData(data);
  } else {
    microApp.clearGlobalData();
    microApp.setGlobalData(data as any);
  }
}

/**
 * 生成微前端/iframe专用组件，在本组件的基础上包装一层, 处理参数传递
 * @component defineAsyncComponent(() => import('@/views/contract/components/ContractDetailByUUID.vue'))
 */
export function generateExportComponent(component: any) {
  return defineComponent({
    setup() {
      if (isTopApp) return () => h('div', null, '导出组件暂不支持单独打开');
      /** 如果是微前端，通过内部传递参数 */
      return () => {
        if (microAppComponentPath.value) {
          // 组件挂载的时候，有可能setData还没监听到
          return h(component, microAppComponentProps.value);
        } else {
          return h('div', null, 'loading...');
        }
      };
    },
  });
}

/**
 * 更新子应用菜单信息（主应用调用，在路由拦截 / 侧边菜单点击时触发调用）
 * ps：路由拦截触发是处理第一次进入；菜单点击是处理是处理应用内页面跳转的情况
 */
export function updateSubAppMenuInfo(subAppName: string, menuInfo: { id: string }) {
  microApp.clearData(subAppName);
  microApp.setData(subAppName, {
    emitName: 'menu_active',
    parameters: [menuInfo],
  });
}

/**
 * 生成派发组件id
 */
export function generateMicroComponentDomId() {
  return `micro_component_${('' + Date.now()).slice(5)}_${Math.random()
    .toString(36)
    .substring(2)}`;
}

/**
 * 从path中提取子应用前缀
 */
export function getSubAppPrefixFromRouteUrl(url: string) {
  return url?.match?.(/(?<=^\/).*?(?=\/)/)?.[0];
}
