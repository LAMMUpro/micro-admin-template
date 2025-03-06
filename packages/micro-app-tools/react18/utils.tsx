import React, { useRef, ForwardRefExoticComponent } from 'react';

/**
 * 对于forwardRef组件再包装一层供其它框架获取实例
 */
export function forwardRefWrap(ForwardRefComponent: ForwardRefExoticComponent<any>) {
  return function (props: any) {
    const ref = useRef(null);
    props.setReactCtxOnMounted?.(ref);
    return (
      <ForwardRefComponent
        {...props}
        ref={ref}
      ></ForwardRefComponent>
    );
  };
}
