import { isSubApp } from '..';
import { MicroComponentPropsMap } from '../data';
import { BaseObj } from '../types';
import MicroComponent from './MicroComponent.vue';
import { Component, VNode, createApp, defineComponent, h } from 'vue';

/**
 * 去除slot不合法的参数，如id
 */
function banSlotPropKey(slotProps: BaseObj<any>) {
  const forbidKeyList = ['id']; // TODO：后续需要维护这个列表，暂时只发现传了id异常
  forbidKeyList.forEach((key) => {
    if (slotProps[key]) delete slotProps[key];
  });
  return slotProps;
}

/**
 * 渲染/注入组件到其它项目（主应用使用）
 * 需要在对应的应用预留<div/>节点
 */
export async function renderComponent(options: {
  /** Vue组件 */
  component: Component;
  /** div dom节点id */
  elementId: string;
  /** 插槽名称列表 */
  slotNameList: Array<string>;
  /** 子应用name */
  subAppName: string;
}) {
  if (!isSubApp) {
    /** 被注入的应用要预留一个<div/>节点 */
    const elementDom = window.document?.body.querySelector(`#${options.elementId}`);
    if (elementDom) {
      /**
       * 处理插槽
       */
      const slotMap = options.slotNameList.reduce((result, slotName) => {
        result[slotName] = (slotProps) =>
          h(MicroComponent, {
            _is: '' as any, // 渲染插槽不需要传_is参数
            ...banSlotPropKey({ ...slotProps }),
            _subAppName: options.subAppName,
            _slotName: slotName,
            _parentElementId: options.elementId,
          });
        return result;
      }, {} as BaseObj<(props: BaseObj<any>) => VNode>);
      /**
       * 节点注入
       */
      const component = defineComponent({
        setup() {
          /** 如果是微前端，通过内部传递参数 */
          return () => {
            return h(
              options.component,
              MicroComponentPropsMap[options.elementId].value,
              slotMap
            );
          };
        },
      });
      createApp(component).mount(elementDom);
    } else {
      console.warn('未预留div节点');
    }
  } else {
    console.warn('暂不兼容子应用独立运行时派发组件，//TODO');
  }
}
