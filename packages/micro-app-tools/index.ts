/**
 * 微前端相关变量
 */
import microApp from '@micro-zoe/micro-app';
import { MicroAppConfig, setDataListener } from './data';
import {
  BaseObj,
  MicroAppComponentEmit,
  MicroAppComponentProps,
  MicroAppGlobalEmit,
  SubAppSetting,
} from './types';

/**
 * 子应用微前端初始化
 */
export function SubMicroAppInit<Envs extends string>(options: {
  /** 标签名称, 必须以micro-app-开头，不允许大写字母 */
  tagName: string;
  env: Envs;
  subAppSettingList: Array<SubAppSetting<Envs>>;

  /** 应用数据监听函数, 用于中间应用传递事件 */
  dataListener?: (data: BaseObj<any>) => void;
}) {
  const { tagName, env, subAppSettingList, dataListener } = {
    ...options,
  };

  MicroAppConfig.env = env;
  MicroAppConfig.tagName = tagName;
  MicroAppConfig.subAppSettingList = subAppSettingList;
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
}

/**
 * 当前app的name是否在微前端配置当中，用于判断是否前两层应用
 */
export const getAppIsInConfig = () => {
  return (
    isTopApp ||
    !!MicroAppConfig.subAppSettingList.find(
      (item) => item.name === window.__MICRO_APP_NAME__
    )
  );
};

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
