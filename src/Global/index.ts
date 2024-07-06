import ModuleConfig from './Module/Config';
import ModuleMenu from './Module/Menu';
import ModuleUser from './Module/User';

/**
 * 全局状态管理
 */
class GlobalClass {
  /** 全局配置 */
  readonly config = new ModuleConfig();
  /** 用户信息 */
  readonly user = new ModuleUser();
  /** 菜单/权限信息 */
  readonly menu = new ModuleMenu();

  /** 退出登录时，清除/重置信息 */
  resetAllInfo() {
    this.user.resetInfo();
    this.menu.resetInfo();
  }
}

const Global = new GlobalClass();

export default Global;

/** 在main.ts的显式调用一下, 初始化数据 */
export function initGlobalStore() {
  return Global;
}
