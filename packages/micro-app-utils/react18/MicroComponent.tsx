// @ts-ignore
import React, { useEffect, useMemo, useRef } from 'react';
import { generateMicroComponentDomId, isSubApp, sendDataUp } from '../index';
import {
  MicroComponentPropsMap,
  MicroComponentSlotMap,
  ReactMicroComponentSlotInfoMap,
} from '../data';
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

  /** 存储旧的_is */
  const _is_old = useRef(undefined);

  // 生成唯一的 DOM ID
  const elementId = useMemo(() => {
    return generateMicroComponentDomId();
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
    if (!React.isValidElement(otherPropsWithSlot[key])) {
      /** 属性名转换 */
      const vue3PropsKey =
        {
          className: 'class',
        }[key] || key;
      result[vue3PropsKey] = otherPropsWithSlot[key];
    }
    return result;
  }, {} as BaseObj<any>);

  /** 存储当前组件参数JSON.stringify结果 */
  const vue3PropsString = JSON.stringify(vue3Props);

  useEffect(() => {
    /**
     * 更新props
     */
    if (vue3PropsString !== oldVue3PropsStringMap[elementId]) {
      /**
       * 插槽不需要更新，仅派发组件更新
       */
      oldVue3PropsStringMap[elementId] = vue3PropsString;
      console.log(`插槽${elementId}不需要更新`);
    } else if (slotNameList.length) {
      /**
       * 更新插槽
       */
      console.log(`更新插槽${elementId}`, slotNameList);
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
    /**
     * 解决root.render 问题
     * 原因：
     *  渲染过程中应该值纯函数，根据props返回视图，不应该有副作用，，而root.render是一种副作用，会导致对外部状态照成影响。
     *
     * 解决：
     *  将副作用移到useEffect中，useEffect会在渲染之后执行
     * */
  }, [vue3PropsString, elementId, slotNameList, otherPropsWithSlot]);

  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    // 子应用使用时必须传 _is，主应用使用(插槽情况)不需要传 _id
    if (isSubApp && !_is) return;

    /** 如果_is变化了，清空props/slot缓存，之后会重新渲染组件 */
    if (props._is !== _is_old.current && MicroComponentPropsMap[elementId]) {
      delete MicroComponentPropsMap[elementId];
      delete MicroComponentSlotMap[elementId];
    }

    // 必须延迟，否则并列组件渲染只会发送的事件会被覆盖
    timeoutId = setTimeout(() => {
      /**
       * 如果是子应用，则向主应用发送派发组件请求
       */
      if (isSubApp) {
        /** 更新props时不用重新保存slots */
        if (!MicroComponentSlotMap[elementId])
          MicroComponentSlotMap[elementId] = slotNameList.reduce((result, slotName) => {
            result[slotName] = props[slotName];
            return result;
          }, {} as BaseObj<any>);
        /**
         * 如果是子应用，则向主应用发送派发组件请求
         */
        sendDataUp({
          emitName: 'micro_component_request',
          parameters: [
            {
              subAppNameList: [window.__MICRO_APP_NAME__!],
              componentName: _is,
              elementId,
              props: vue3Props,
              slotNameList,
            },
          ],
        });
      }
    });
    /** 维护旧的_is值 */
    _is_old.current = props._is;
  }, [_is, vue3Props]);

  /** 组件销毁钩子 */
  useEffect(() => {
    return () => {
      /** react不清除定时器会报错 */
      clearTimeout(timeoutId);
      /** 清除插槽缓存 */
      if (isSubApp && MicroComponentSlotMap[elementId]) {
        delete MicroComponentSlotMap[elementId];
      }

      setTimeout(() => {
        sendDataUp({
          emitName: 'micro_component_destroy',
          parameters: [elementId],
        });
      });
    };
  }, []);

  return (
    // @ts-ignore
    <div
      className="MicroComponent"
      style={{ display: 'contents' }}
      id={elementId}
      // @ts-ignore
    ></div>
  );
};

export default MicroComponent;
