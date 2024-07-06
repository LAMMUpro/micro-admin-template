import { RouteRecordRaw } from 'vue-router';

/** 后端菜单配置 */
export type MenuOriginType = {
  /** 菜单id */
  id: string;
  /** 父级菜单id */
  parentId: string;
  /** 菜单子路由 */
  children?: Array<MenuItemType>;
  /** 资源类型：1-菜单，2-按钮 */
  resourceType: 1 | 2;
  /** 菜单名称(中文) */
  name: string;
  /**
   * 路径(不包含name)
   * @example /业务中心后台管理/流程管理
   */
  prefixName: string;
  /** 未激活图标(http url) */
  icon: string;
  /**
   * 路径(不一定对应vue文件路径)
   * @example /admin/#/xxx
   * @example 外链：http://xxx.xxx.com/xxx
   */
  path: string;
  /**
   * vue文件相对路径
   * @example Layout
   * @example /clock/xxx/report
   */
  componentStr: string;
  /** 排序, 越小越靠前 */
  sort: number;
  /** 是否显示在菜单 */
  hidden: boolean;
};

/** 菜单列表数据类型 */
export type MenuItemType = MenuOriginType & {
  /** 子菜单 */
  children?: Array<MenuItemType>;
  // /** 外链地址，优先级会比`path`高(由url解析来的) */
  // link: string;
  /**
   * 唯一索引`key`， 层数用`-`隔开
   * @example 0
   * @example 0-0
   * @example 1-0-1
   */
  // key: string;
  /**
   * 额外状态值(不会保存到localStorage)
   */
  /** 当前下级菜单是否展开 */
  _isOpen_?: boolean;
  /** 当前菜单是否处于激活状态 */
  _isActive_?: boolean;
  /** 当前有子菜单路由的同时，是否有子菜单的某个处于激活状态 */
  _hasActive_?: boolean;
  /** 菜单名称（关键词高亮） */
  _nameHTML_?: string;
} & RouteRecordRaw;
