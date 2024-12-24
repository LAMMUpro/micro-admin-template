import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * 存储react root对象
 */
const rootMap = new Map();

/**
 * 渲染react组件到dom节点
 * @return 获取上下文方法
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
): () => any {
  const root = createRoot(dom);

  /** root存起来 */
  rootMap.set(key, root);

  /** 上下文缓存 */
  let ctxCache: { current: any } = { current: undefined };
  /** 在组件挂载完成后设置上下文 */
  function setReactCtxOnMounted(ctx?: any) {
    if (ctx) ctxCache = ctx;
    return ctxCache;
  }

  /** 此函数必须在单独的tsx文件中运行!!! */
  root.render(<ReactComp setReactCtxOnMounted={setReactCtxOnMounted} {...options.props}></ReactComp>);

  /** 返回获取上下文函数 */
  return function getCtx() {
    return ctxCache;
  }
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
  if (rootMap.has(key)) {
    const root = rootMap.get(key);
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
  if (rootMap.has(key)) {
    rootMap.delete(key);
  }
}

export {
  reactComponentMountCallback,
  reactComponentUnMountCallback,
  reactComponentUpdateCallback,
};
