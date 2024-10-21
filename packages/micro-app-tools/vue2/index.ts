/**
 * vue2独立的数据/方法(因为使用到了特有的api)
 */

import {
  MicroAppComponentProps,
  BaseObj,
  GlobalListenerCallbacks,
  ListenerCallbacks,
} from '../types';

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
export const microAppComponentProps = {
  value: getDefaultMicroAppComponentProps(),
};

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
export const microAppComponentPath = {
  value: '',
};

/**
 * 生成微前端/iframe专用组件，在本组件的基础上包装一层, 处理参数传递
 */
export function generateExportComponent() {
  // TODO
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
