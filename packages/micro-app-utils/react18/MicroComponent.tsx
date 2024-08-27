import React, { useEffect, useMemo } from 'react';
import { isSubApp, sendGlobalData } from '../index';
import { MicroComponentSlotMap } from '../data';
import { BaseObj } from '../types';

interface MicroComponentProps {
  /** 派发组件名称，注册了才能用 */
  _is: string;
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 插槽统一通过属性传，不要通过children传
 */
const MicroComponent: React.FC<MicroComponentProps> = (props: BaseObj<any>) => {
  const { _is, ...otherProps } = props;

  /** 插槽，从props过滤得到 */
  const slotNameList = Object.keys(props).filter((propKey) =>
    React.isValidElement(props[propKey])
  );

  // 生成唯一的 DOM ID
  const elementId = useMemo(() => {
    return `micro_component_${('' + Date.now()).slice(5)}_${Math.random()
      .toString(36)
      .substring(2)}`;
  }, []);

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
              subAppName: window.__MICRO_APP_NAME__,
              componentName: _is,
              elementId,
              props: otherProps,
              slotNameList,
            },
          ],
        });
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [_is, otherProps]);

  /** 销毁钩子 */
  useEffect(() => {
    // 清除插槽缓存
    if (isSubApp && MicroComponentSlotMap[elementId]) {
      delete MicroComponentSlotMap[elementId];
    }
    setTimeout(() => {
      sendGlobalData({
        emitName: 'micro_component_destroy',
        parameters: [elementId],
      });
    });
  }, []);

  return (
    <div
      className="MicroComponent"
      id={elementId}
    >
      {props.children}
    </div>
  );
};

export default MicroComponent;
