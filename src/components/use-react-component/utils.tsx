import { createRoot } from 'react-dom/client';

/**
 * 存储react root对象
 */
const weakMap = new WeakMap();

/**
 * 渲染react组件到dom节点
 */
function reactComponentMountCallback(
  /** dom节点 */
  dom: Element,
  /** 组件唯一key */
  key: Symbol,
  /** react组件 */
  ReactComp: any,
  options: {
    props: any;
  }
) {
  const root = createRoot(dom);
  weakMap.set(key, root);
  /** 此函数必须在单独的tsx文件中运行!!! */
  root.render(<ReactComp {...options.props}></ReactComp>);
}

/**
 * react组件更新时, 重新渲染
 */
function reactComponentUpdateCallback(
  /** 组件唯一key */
  key: Symbol,
  /** react组件 */
  ReactComp: any,
  options: {
    props: any;
  }
) {
  if (weakMap.has(key)) {
    const root = weakMap.get(key);
    root.render(<ReactComp {...options.props}></ReactComp>);
  }
}

/**
 * 销毁react组件时, 删除缓存
 */
function reactComponentUnMountCallback(
  /** 组件唯一key */
  key: Symbol
) {
  if (weakMap.has(key)) {
    weakMap.delete(key);
  }
}

export {
  reactComponentMountCallback,
  reactComponentUnMountCallback,
  reactComponentUpdateCallback,
};
