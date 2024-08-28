import { Component } from 'vue';
import MicroApp from '../vue3/MicroApp.vue';

/**
 * 基础对象类型
 */
export type BaseObj<T = any> = { [key: string]: T };

/**
 * 派发组件列表
 */
export type MicroComponents = 'SvgIcon' | 'BaseDialog';

/**
 * 派发组件类型（注册时支持的类型）
 */
export type MicroComponentType = Component | (() => Promise<any>);

/**
 * 子应用配置
 */
export interface SubAppSetting<Envs extends string = string> {
  /** 唯一应用名 */
  name: string;
  /** url前缀, 可以和name不一样 */
  prefix: string;
  /** 路由模式 */
  routerMode: 'hash' | 'history';
  /**
   * 各环境url配置，一般有localhost(本地) / test(测试) / pre(预发) / master(正式)
   */
  urlMap: { [key in Envs]: string };
  /** 打包工具 */
  builder: 'vite' | 'webpack';
  /** 框架及版本 */
  framework: 'vue3' | 'vue2' | 'react18';
  /** 是否iframe沙箱 */
  iframe: boolean;
}

/**
 * 数据监听回调类型(需时常更新)
 *
 */
export interface ListenerCallbacks {
  /** 主应用派发组件回传渲染slot(子应用监听) */
  micro_component: (params: {
    /** 插槽名称 */
    slotName: string;
    /** dom节点id */
    elementId: string;
    /** 原组件dom节点id */
    parentElementId: string;
    /** 组件属性（包括事件） */
    props: BaseObj<any>;
  }) => void;
}

/**
 * 数据监听回调类型(需时常更新)
 */
export interface GlobalListenerCallbacks {
  /** 请求主应用派发组件(主应用监听) */
  micro_component: (params: {
    /** 子应用名称 */
    subAppName: string;
    /** 组件名称 */
    componentName: MicroComponents;
    /** dom节点id */
    elementId: string;
    /** 组件属性（包括事件） */
    props: BaseObj<any>;
    /** 插槽名称列表 */
    slotNameList: Array<string>;
  }) => void;
  /** 派发组件销毁事件(主应用监听) */
  micro_component_destroy: (elementId: string) => void;
}

/** 由数据监听回调类型映射的类型 */
type GenerateEmitType<T extends BaseObj<any>> = {
  [K in keyof T]: T[K] extends () => void
    ? { emitName: K; subAppPath?: string } /** 无参数 */
    : T[K] extends (...args: infer Args) => void
    ? { emitName: K; parameters: Args; subAppPath?: string } /** 有参数 */
    : never;
}[keyof T];

/** 全局事件emit事件类型 */
export type MicroAppGlobalEmit = GenerateEmitType<GlobalListenerCallbacks>;

/** 把子应用当作组件使用时，给组件传递的事件数据 */
export type MicroAppComponentEmit = GenerateEmitType<ListenerCallbacks>;

/** 把子应用当作组件使用时，给组件传递的事件数据 */
export interface MicroAppComponentProps {
  /** 组件路由path */
  subAppPath?: string;
  /** 事件名称 */
  eventType: string;
  /** 参数 */
  props?: BaseObj<any>;
}

/** <MicroApp>所需参数 */
export type MicroAppProps = InstanceType<typeof MicroApp>['$props'];

/** 微前端额外挂载到window的属性 */
export interface MicroAppWindow {
  /** 是否主应用（在执行microApp.start()后此值才会生效） */
  __MICRO_APP_BASE_APPLICATION__: boolean;
  /** 子应用是否处于微前端环境 */
  __MICRO_APP_ENVIRONMENT__: boolean;
  /** 子应用名称（即<micro-app>标签的name值） */
  __MICRO_APP_NAME__: string;
  /** 子应用url */
  __MICRO_APP_URL__: string;
  /** 子应用的静态资源前缀 */
  __MICRO_APP_PUBLIC_PATH__: string;
  /** 子应用的基础路由 */
  __MICRO_APP_BASE_ROUTE__: string;

  /** 是否预渲染 */
  __MICRO_APP_PRE_RENDER__: boolean;
  /** 是否是umd模式 */
  __MICRO_APP_UMD_MODE__: boolean;
  /** 沙箱类型 */
  __MICRO_APP_SANDBOX_TYPE__: 'with' | 'iframe';
  /** 沙箱对象 */
  __MICRO_APP_SANDBOX__: any;
  /** window代理 */
  __MICRO_APP_PROXY_WINDOW__: any;
  /** 父应用window对象 */
  rawWindow: Window;
  /** 父应用document对象 */
  rawDocument: Document;
}

/** window.microApp */
export interface Window_microApp {
  appName: string;
  location: Location;
  pureCreateElement: Function;
  removeDomScope: Function;
  router: any;
  getData: Function;
  /** 监听数据变化 / 事件 */
  addDataListener: (
    callback: (data: MicroAppComponentProps | MicroAppComponentEmit) => void,
    immedite?: boolean
  ) => void;
  /** 监听全局数据变化 / 事件 */
  addGlobalDataListener: (
    callback: (data: MicroAppComponentProps | MicroAppGlobalEmit) => void,
    immedite?: boolean
  ) => void;
  /** 解绑监听函数 */
  removeDataListener: (callback: Function) => void;
  /** 解绑全局监听函数 */
  removeGlobalDataListener: (callback: Function) => void;
  /** 清空当前子应用的所有绑定函数(全局数据函数除外) */
  clearDataListener: () => void;

  /** 向主应用发送数据 / 事件 */
  dispatch: (data: MicroAppComponentProps | MicroAppComponentEmit) => void;
  /** 清空当前子应用发送给主应用的数据 */
  clearData: () => void;

  /** 向子应用 / 主应用发送数据 / 事件 */
  setGlobalData: (data: MicroAppComponentProps | MicroAppGlobalEmit) => void;
  /** 清空当前子应用发送给其它应用的数据 */
  clearGlobalData: () => void;
}
