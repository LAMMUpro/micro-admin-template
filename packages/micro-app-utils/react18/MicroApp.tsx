import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
// @ts-ignore
import React, { useEffect, useMemo, useRef, useState } from 'react';
// @ts-ignore
import type { MutableRefObject } from 'react';
import microApp from '@micro-zoe/micro-app';

import { MicroAppConfig, dataListener } from '../data';
import { getSubAppPrefixFromRouteUrl, isSubApp, sendDataDown } from '../index';
import { SubAppSetting } from '../types';

interface MicroAppProps {
  /** 指定应用环境 */
  _env?: string;
  /** 子应用名称前缀, name不能重复，所以需要加前缀，可根据根据业务名称区分 */
  _prefix?: string;
  /** 子应用名称 */
  _name?: string;
  /**
   * 要跳转的路径, 一般不要带查询参数
   * @example /#/ExportComponent/contract/ContractDetailByUUID
   */
  _path?: string;
  /** 默认路由，一般用`前缀/#/empty`做中转路由（hash模式），对应子应用需要添加这个路由 */
  _defaultPage: string;
  /** 是否keep-alive，需要对应子应用也开启keep-alive，一般不用 */
  _keepAlive?: boolean;
  /** 卸载时是否强制删除缓存资源 */
  _destroy?: boolean;
  /** 卸载时清空数据通讯中的缓存数据, 默认false */
  _clearData?: boolean;
  /** 虚拟路由系统分为四种模式search、native、native-scope、pure (顶级应用默认search，子应用默认pure) */
  _routerMode?: string;
  /** 是否关闭样式隔离，在某些极端情况下会使用，例如子应用独立运行时，主应用跨应用渲染需要关闭样式隔离确保样式导入生效 */
  _disableScopecss?: boolean;
  /** 应用加载成功回调 */
  _mounted?: () => void;
  /** 应用卸载回调 */
  _unmount?: () => void;
  /** 应用加载失败回调 */
  _error?: () => void;
  /** 自定义错误样式 */
  error?: React.FC;
  /** 自定义加载样式 */
  loading?: React.FC;
  /** 自定义无配置样式 */
  config?: React.FC;
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
    _mounted = () => {},
    _unmount = () => {},
    _error = () => {},
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

  /** nameWithPrefixOld */
  const nameWithPrefixOld: MutableRefObject<string> = useRef('');
  /** 实际的path */
  const activePath: MutableRefObject<string> = useRef(defaultPage);
  /** 记录应用开始加载时间点 */
  const appStartTimeStamp: MutableRefObject<number> = useRef(Date.now());

  /** 子应用状态 */
  const [subAppStatus, setSubAppStatus] = useState(_name ? 'loading' : 'unMounted');

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
     * 当主应用子应用切换时，路由结束后(即nameWithPrefix.value变化了)子应用的卸载钩子还没有执行，此时subAppStatus状态还没有得到更新，所以需要setTimeout一下
     */
    setTimeout(() => {
      if (subAppSettting && _path && subAppStatus === 'mounted') {
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
        const durationMS = Date.now() - appStartTimeStamp.current;
        function callback() {
          setSubAppStatus('mounted');
          /** 这里需要手动跳转一次，watch时的跳转可能不会生效，因为应用还没挂载完成 */
          toSubAppPathSafe();
          _mounted();
        }
        if (durationMS < 300) {
          setTimeout(() => callback(), 300 - durationMS);
        } else {
          callback();
        }
      } else {
        setSubAppStatus('error');
        _error();
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
    setSubAppStatus(_name ? 'loading' : 'unMounted');
    appStartTimeStamp.current = Date.now();
    /** 需要子应用每次window.mount的时候重建router 或 window.unmount的时候重定向路由至默认路由 */
    activePath.current = defaultPage;
    microApp.clearData(nameWithPrefix);
    _unmount();
  };

  /**
   * 子应用渲染报错
   */
  const microAppError = (): void => {
    setSubAppStatus('error');
    _error();
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
    <div className="__micro-app-container __content">
      {/* micro-app子应用 */}
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
          onError: microAppError,
        })}
      {/* 子应用环境下使用才显示状态，顶层应用有额外的状态UI */}
      <MicroAppStatus
        subAppStatus={subAppStatus}
        subAppSettting={subAppSettting}
        configSlot={props.config}
        errorSlot={props.error}
        loadingSlot={props.loading}
      ></MicroAppStatus>
      {/* @ts-ignore */}
    </div>
  );
};

const MicroAppStatus: React.FC<never> = (props: {
  subAppStatus: 'unMounted' | 'loading' | 'mounted' | 'error';
  subAppSettting: Object;
  error?: React.FC;
  loading?: React.FC;
  config?: React.FC;
}) => {
  if (isSubApp) {
    if (!props.subAppSettting) {
      return (
        // 应用未配置样式
        // @ts-ignore
        <div className="__content">
          {props.config ? (
            <props.config></props.config>
          ) : (
            // @ts-ignore
            <div className="__tip-msg __config">未配置模块</div>
          )}
          {/* @ts-ignore */}
        </div>
      );
    } else if (props.subAppStatus === 'error') {
      return (
        // 加载失败样式
        // @ts-ignore
        <div className="__content">
          {props.error ? (
            <props.error></props.error>
          ) : (
            // @ts-ignore
            <div className="__tip-msg __error">模块加载失败</div>
          )}
          {/* @ts-ignore */}
        </div>
      );
    } else if (props.subAppStatus === 'loading') {
      return (
        // 加载中样式
        // @ts-ignore
        <div className="__content">
          {props.loading ? (
            <props.loading></props.loading>
          ) : (
            // @ts-ignore
            <div className="__tip-msg __loading">模块加载中...</div>
          )}
          {/* @ts-ignore */}
        </div>
      );
    }
  }
  return null;
};

export default MicroApp;
