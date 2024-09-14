import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
// @ts-ignore
import React, { useEffect, useMemo, useRef } from 'react';
// @ts-ignore
import type { MutableRefObject } from 'react';
import microApp from '@micro-zoe/micro-app';

import { MicroAppConfig, dataListener } from '../data';
import { getSubAppPrefixFromRouteUrl, isSubApp, sendDataDown } from '../index';
import { SubAppSetting } from '../types';

interface MicroAppProps {
  _name?: string;
  _prefix?: string;
  _path?: string;
  _defaultPage: string;
  _keepAlive?: boolean;
  _env?: string;
  _destroy?: boolean;
  _clearData?: boolean;
  _routerMode?: string;
  _disableScopecss?: boolean;
  onMounted?: () => void;
  onUnmount?: () => void;
}

const MicroApp: React.FC<never> = (props: MicroAppProps) => {
  const {
    _name = '',
    _prefix = '',
    _destroy,
    _disableScopecss,
    _clearData,
    _routerMode = isSubApp ? 'pure' : 'search',
    _defaultPage,
    _path = '',
    _keepAlive,
    _env,
    onMounted = () => {},
    onUnmount = () => {},
    ...otherProps
  } = props;

  /** 定时器 */
  let timer: NodeJS.Timeout;

  /** 子应用真实name（连前缀） */
  const nameWithPrefix: string = useMemo(() => {
    return _prefix + _name;
  }, [_name, _prefix]);

  /** 子应用配置 */
  const subAppSettting: SubAppSetting | undefined = useMemo(() => {
    return MicroAppConfig.subAppSettingList.find((item) => item.name === _name);
  }, [_name]);

  const oldValueList: MutableRefObject<string[]> = useRef([
    _path,
    nameWithPrefix,
    JSON.stringify(otherProps),
  ]);

  /** 默认页面（中转页） */
  const defaultPage: string = useMemo(() => {
    return (
      _defaultPage ||
      (subAppSettting?.prefix ? `/${subAppSettting?.prefix}/#/empty` : '/#/empty')
    );
  }, [_path]);

  const nameWithPrefixOld: MutableRefObject<string> = useRef(''); // 子应用真实name（旧的），用于判断当前跳转是否跨子应用跳转
  const isMicroAppMounted: MutableRefObject<boolean> = useRef(false); // 子应用是否渲染完成
  const activePath: MutableRefObject<string> = useRef(defaultPage); // 实际的path

  useEffect(() => {
    return () => {
      /** 不清除，会导致子应用重新挂载时监听到2次数值变化 */
      microApp.clearData(nameWithPrefix);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    nameWithPrefixOld.current = oldValueList?.current[1] || '';
    /**
     * 当主应用子应用切换时，路由结束后(即nameWithPrefix.value变化了)子应用的卸载钩子还没有执行，此时isMicroAppMounted状态还没有得到更新，所以需要setTimeout一下
     */
    setTimeout(() => {
      if (subAppSettting && _path && isMicroAppMounted.current) {
        toSubAppPathSafe();
      }
    });
  }, [_path, _prefix, _name, JSON.stringify(otherProps)]);

  /** 子应用配置是否存在*/
  const isSubAppSetting: boolean = useMemo((): boolean => {
    return !!subAppSettting;
  }, [subAppSettting]);

  /**
   * 子应用渲染完成钩子（需要延迟执行！）
   * 1. 更新渲染完成标识
   * 2. 跳到目标页
   * 3. 抛出事件
   * ps: 如果是非pure模式，会导致子应用的url发生改变，会导致路由重新跳转(例如应用未加载前路由还没加载，应用加载完成前动态路由加载了，search模式会自动刷新页面，但pure模式不会，所以要以兼容pure模式为准：跳转到不存在页面先暂存，动态添加路由后跳转到暂存页面)
   */
  const microAppMounted = (): void => {
    if (dataListener) microApp.addDataListener(nameWithPrefix, dataListener);
    timer = setTimeout(() => {
      const subAppName = `${props._prefix}${props._name}`;
      /** 确保子应用真的渲染成功了 */
      if (microApp.getAllApps().includes(subAppName)) {
        isMicroAppMounted.current = true;
        /** 这里需要手动跳转一次，watch时的跳转可能不会生效，因为应用还没挂载完成 */
        toSubAppPathSafe();
        onMounted();
      } else {
        console.warn(`子应用${subAppName}渲染异常`);
      }
    }, 4);
  };

  /**
   * 子应用卸载钩子
   * 1. 更新渲染完成标识
   * 2. 清空数据
   */
  const microAppUnmount = (): void => {
    if (dataListener) microApp.removeDataListener(nameWithPrefix, dataListener);
    microApp.clearDataListener(nameWithPrefix);
    isMicroAppMounted.current = false;
    /** 需要子应用每次window.mount的时候重建router 或 window.unmount的时候重定向路由至默认路由 */
    activePath.current = defaultPage;
    microApp.clearData(nameWithPrefix);
    onUnmount();
  };

  /**
   * 跳转到目标页面
   * 会处理是否在目标页的情况
   */
  const toSubAppPathSafe = (): void => {
    /**
     * _name为空时不允许跳转
     * 前缀不匹配时时不允许跳转
     */
    if (!_name || subAppSettting?.prefix !== getSubAppPrefixFromRouteUrl(_path)) return;
    if (activePath.current === defaultPage) {
      /** 如果当前是中转路由，直接替换 */
      timer = setTimeout(() => {
        toSubAppPath({ mode: 'replace' });
      }, 4);
    } else if (activePath.current !== _path) {
      /** 如果当前其它路由，直接跳转，如果是同一应用页面跳转用push，如果是跨应用跳转，用replace */
      timer = setTimeout(() => {
        toSubAppPath({
          mode: nameWithPrefixOld.current === nameWithPrefix ? 'push' : 'replace',
        });
      }, 4);
    } else {
      /**
       * 目标路径和当前路径一致，先跳中转再跳目标
       * 可能的场景：子应用嵌套，路径不变，参数变化
       */
      timer = setTimeout(() => {
        toDefaultPage();
        toSubAppPath({ mode: 'replace' });
      }, 4);
    }
  };

  /**
   * 跳转到目标页，该方法不会校验是否在当前页
   * 1. 清除传递的参数
   * 2. 传递组件参数
   * 3. 控制子应用路由跳转
   */
  const toSubAppPath = (options: { mode: 'replace' | 'push' }): void => {
    const { mode } = {
      ...options,
    };

    microApp.router[mode]({
      name: nameWithPrefix,
      /**
       * 不要对props._path进行处理（比如添加参数），原样跳转就行
       * ps：props._path有可能是编码 或 半编码的，解析很可能报错
       */
      path: _path,
    });

    sendDataDown(nameWithPrefix, {
      eventType: 'component',
      props: otherProps,
      subAppPath: _path,
    });

    activePath.current = _path;
  };

  /** 跳到默认页面 */
  const toDefaultPage = (): void => {
    microApp.router.push({
      name: nameWithPrefix,
      path: defaultPage,
    });
    activePath.current = defaultPage;
  };

  return (
    // @ts-ignore
    <>
      {isSubAppSetting &&
        // 处理react自定义事件
        jsxCustomEvent(MicroAppConfig.tagName, {
          iframe: true,
          class: '__micro-app',
          'default-page': defaultPage,
          'keep-alive': _keepAlive,
          name: nameWithPrefix,
          url: subAppSettting?.urlMap[_env || MicroAppConfig.env],
          inline: MicroAppConfig.env === 'localhost',
          destroy: _destroy,
          clearData: _clearData,
          'router-mode': _routerMode,
          'disable-scopecss': _disableScopecss,
          onMounted: microAppMounted,
          onUnmount: microAppUnmount,
        })}
    </>
  );
};

export default MicroApp;
