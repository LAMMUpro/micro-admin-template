import { ref } from 'vue';

/**
 * 其它模块要继承这个模块
 */
export class GlobalModule {
  /** 用户信息加载中标识 */
  loading = ref(false);
  /** 是否已经成功初始化 */
  inited = ref(false);
}

export interface GlobalModuleImplements<T = any> {
  /** 主要信息 */
  info: T;

  /** 缓存到localStorage的键名 */
  cacheName: string;

  /** 更新info */
  updateInfo: (info: Partial<T>) => void;

  /** 重置Info */
  resetInfo: () => void;

  /** 从本地加载数据, 要注意inited判断条件 */
  loadDataFromLocal: () => void;

  /** 从接口初始化数据 */
  initData: () => void;
}
