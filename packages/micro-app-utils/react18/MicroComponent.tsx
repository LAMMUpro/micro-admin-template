import React, { useEffect, useMemo } from 'react';
import { isSubApp, sendGlobalData } from '../index';
import { MicroComponentSlotMap, ReactMicroComponentSlotInfoMap } from '../data';
import { BaseObj } from '../types';

interface MicroComponentProps {
  /** 派发组件名称，注册了才能用 */
  _is: string;
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 存储历史组件参数JSON.stringify结果，用于判断组件props是否发生变化(插槽不算props)
 */
let oldVue3PropsStringMap: BaseObj<string> = {};

/**
 * 插槽统一通过属性传，不要通过children传
 */
const MicroComponent: React.FC<MicroComponentProps> = (props: BaseObj<any>) => {
  const { _is, ...otherPropsWithSlot } = props;

  // 生成唯一的 DOM ID
  const elementId = useMemo(() => {
    return `micro_component_${('' + Date.now()).slice(5)}_${Math.random()
      .toString(36)
      .substring(2)}`;
  }, []);

  /** 插槽，从props过滤得到 */
  const slotNameList = Object.keys(props).filter((propKey) =>
    React.isValidElement(props[propKey])
  );

  /**
   * vue3组件格式的组件参数
   * 不包括插槽
   */
  const vue3Props = Object.keys(otherPropsWithSlot).reduce((result, key) => {
    if (!React.isValidElement(otherPropsWithSlot[key]))
      result[key] = otherPropsWithSlot[key];
    return result;
  }, {} as BaseObj<any>);

  /** 存储当前组件参数JSON.stringify结果 */
  const vue3PropsString = JSON.stringify(vue3Props);

  if (vue3PropsString !== oldVue3PropsStringMap[elementId]) {
    /**
     * 插槽不需要更新，仅派发组件更新
     */
    oldVue3PropsStringMap[elementId] = vue3PropsString;
    console.log(`插槽${elementId}不需要更新`);
  } else {
    // TODO 点击一次+1会触发两次
    console.log(`更新插槽${elementId}`);
    /**
     * 插槽需要更新，派发组件不需要更新
     * // TODO具体哪个插槽需要更新需要进一步判断
     */
    if (ReactMicroComponentSlotInfoMap[elementId])
      slotNameList.forEach((slotName) => {
        /** 当前插槽信息 */
        const slotInfo = ReactMicroComponentSlotInfoMap[elementId][slotName];
        /** 当前插槽对应的dom节点 */
        const Element = document.body.querySelector(`#${slotInfo.elementId}`);
        /** 插槽对应虚拟dom */
        const component = otherPropsWithSlot[slotName];
        /** 插槽对应渲染器 */
        const root = slotInfo.root;

        if (root && Element && component) {
          /** 插槽重新渲染 */
          root.render(component);
        }
      });
  }

  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    // 子应用使用时必须传 _is，主应用使用(插槽情况)不需要传 _id
    if (isSubApp && !_is) return;

    // 必须延迟，否则并列组件渲染只会发送的事件会被覆盖
    timeoutId = setTimeout(() => {
      if (isSubApp) {
        MicroComponentSlotMap[elementId] = slotNameList.reduce((result, slotName) => {
          result[slotName] = props[slotName];
          return result;
        }, {} as BaseObj<any>);

        sendGlobalData({
          emitName: 'micro_component',
          parameters: [
            {
              subAppName: window.__MICRO_APP_NAME__!,
              componentName: _is,
              elementId,
              props: vue3Props,
              slotNameList,
            },
          ],
        });
      }
    });

    return () => {
      clearTimeout(timeoutId);
      // 清除插槽缓存
      if (isSubApp && MicroComponentSlotMap[elementId]) {
        delete MicroComponentSlotMap[elementId];
      }
      // TODO 销毁时机
      // setTimeout(() => {
      //   sendGlobalData({
      //     emitName: 'micro_component_destroy',
      //     parameters: [elementId],
      //   });
      // });
    };
  }, [_is, vue3Props]);

  return (
    <div
      className="MicroComponent"
      style={{ display: 'contents' }}
      id={elementId}
    ></div>
  );
};

export default MicroComponent;
