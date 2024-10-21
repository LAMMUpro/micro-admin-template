/**
 * vue3独立的数据/方法(因为使用到了特有的api)
 */

import { SubMicroAppInit, isTopApp } from '../index';
import { MicroAppComponentProps, MicroComponentType } from 'types';
import { defineAsyncComponent, defineComponent, h, ref } from 'vue';
import { BaseObj, GlobalListenerCallbacks, ListenerCallbacks } from '../types';
import { MicroComponentMap, setElConfigProvider } from 'data';

/**
 * 主应用传递过来的组件参数，可当作props用（包括事件）
 * 【数据暂存(应用以公共组件模式打开)】
 */
function getDefaultMicroAppComponentProps(): MicroAppComponentProps {
  return {
    subAppPath: '',
    eventType: '',
    props: {},
  };
}
export const microAppComponentProps = ref<MicroAppComponentProps>(
  getDefaultMicroAppComponentProps()
);

/**
 * 清除数据缓存
 */
export function resetMicroAppData() {
  microAppComponentProps.value = getDefaultMicroAppComponentProps();
  microAppComponentPath.value = '';
}

/**
 * 组件对应的path
 * 【数据暂存(应用以公共组件模式打开)】
 */
export const microAppComponentPath = ref('');

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
 * 生成数据监听函数
 */
export function generateDataListener(callBacks?: Partial<ListenerCallbacks>) {
  return function dataListener(data: BaseObj<any>) {
    if (data.emitName) {
      /** 参数列表 */
      const parameters = data.parameters || [];
      (<any>callBacks)?.[data.emitName]?.(...parameters);
    } else if (data.eventType === 'component') {
      microAppComponentProps.value = data.props;
      microAppComponentPath.value = data.subAppPath;
    }
  };
}

/**
 * 生成全局数据监听函数
 */
export function generateGlobalDataListener(callBacks?: Partial<GlobalListenerCallbacks>) {
  return function globalDataListener(data: BaseObj<any>) {
    if (data.emitName) {
      /** 参数列表 */
      const parameters = data.parameters || [];
      (<any>callBacks)?.[data.emitName]?.(...parameters);
    } else if (data.eventType === 'component') {
      microAppComponentProps.value = data.props;
      microAppComponentPath.value = data.subAppPath;
    }
  };
}

/**
 * 顶层应用微前端初始化（vue3版）
 * // TODO：TS类型待优化
 */
export function TopMicroAppInit(
  /** merge SubMicroAppInit函数的类型 */
  options: Parameters<typeof SubMicroAppInit>['0'] & {
    /**
     * 派发组件注册（主应用需要传）
     * @example { UseSvg: UseSvg }
     * @example { UseSvg: () => import('@/components/use-svg/index.vue') }
     */
    MicroComponentMap?: {
      [key: string]: MicroComponentType;
    };
    /** 需要把element-plus ElConfigProvider组件传过来用（主应用需要传） */
    ElConfigProvider?: any;
  }
) {
  SubMicroAppInit(options);
  setElConfigProvider(options.ElConfigProvider);
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
        Object.prototype.toString.call((<any>MicroComponent)?.setup) ===
        '[object Function]'
      ) {
        MicroComponentMap[componentName] = MicroComponent;
      } else if (Object.prototype.toString.call(MicroComponent) === '[object Function]') {
        /**
         * MicroComponent是导入函数, 需要使用defineAsyncComponent转一下 // TODO判断逻辑
         */
        MicroComponentMap[componentName] = defineAsyncComponent(
          MicroComponent as () => Promise<any>
        );
      } else {
        console.warn(`派发组件${componentName}的注册类型无法识别`);
      }
    });
  }
}
