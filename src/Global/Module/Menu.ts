import { reactive } from 'vue';
import { GlobalModule, GlobalModuleImplements } from '../GlobalModule';
import { safeJsonParse, modifyData } from '@/utils';
import { getUserMenus } from '@/api/userApi';
import { MenuItemType } from '@/types/common';
import { parseMenus, validateRoutes } from '@/router/helper';

/** 类型 */
type MenuInfoType = {
  menus: Array<MenuItemType>;
  permissions: Array<string>;
};

/**
 * 权限状态信息
 */
function getDefaultMenuInfo(): MenuInfoType {
  return {
    menus: [],
    permissions: [],
  };
}

/**
 * 菜单权限状态模块
 */
export default class ModuleMenu
  extends GlobalModule
  implements GlobalModuleImplements<MenuInfoType>
{
  cacheName = '_GlobalMenu_';

  constructor() {
    super();
    this.loadDataFromLocal();
  }

  /** 权限信息 */
  readonly info = reactive(getDefaultMenuInfo());

  updateInfo(value: Partial<MenuInfoType>) {
    modifyData(this.info, value);
    localStorage.setItem(this.cacheName, JSON.stringify(this.info));
    if (this.info.menus.length) this.inited.value = true;
  }

  /** 重置菜单权限信息 */
  resetInfo() {
    modifyData(this.info, getDefaultMenuInfo());
    localStorage.removeItem(this.cacheName);
    this.inited.value = false;
  }

  /**
   * 从接口初始化数据
   * 更新动态路由menuRoutes
   */
  async initData() {
    this.loading.value = true;
    const res = await getUserMenus();
    this.loading.value = false;
    if (res.code == 1 && res.data) {
      const _menus = res.data.menus || [];
      const permissions = res.data.permissions || [];
      const menus = parseMenus(_menus);
      this.updateInfo({
        menus,
        permissions,
      });
      setTimeout(() => {
        validateRoutes(menus || []);
      }, 2000);
    }
    return res.code;
  }

  /**
   * 从本地加载数据
   */
  loadDataFromLocal() {
    const info: MenuInfoType = safeJsonParse(
      localStorage.getItem(this.cacheName),
      getDefaultMenuInfo()
    );
    this.updateInfo(info);
  }
}
