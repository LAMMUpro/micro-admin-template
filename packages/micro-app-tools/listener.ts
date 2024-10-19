import { microAppComponentPath, microAppComponentProps } from './data';
import { BaseObj, GlobalListenerCallbacks, ListenerCallbacks } from './types';

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
