import { RouteRecordRaw } from 'vue-router';

/** 后端菜单配置 */
export type MenuOriginType = {
  /** 父级菜单id */
  parentId: string;
  /** 菜单子路由 */
  children?: Array<MenuOriginType>;
  /** 菜单名称(中文) */
  name: string;

  /** 排序, 越小越靠前 */
  sort: number;
  /** 是否显示菜单 */
  hidden: boolean;

  /** 菜单id */
  id: string;
  /**
   * 路径(不包含name)(后端添加的字段)
   * @example /业务中心后台管理/流程管理
   */
  prefixName: string;

  // /** 目标类型：0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 */
  // targetType: 0 | 1 | 2 | 3;
  // /** 外链打开方式: 0-本窗口打开, 1-新建窗口打开 */
  // openMode?: 0 | 1;
  // /** 未激活图标链接, 一般只设置在父节点 */
  // icon?: string;
  // /**
  //  * 路径(不一定对应vue文件路径)
  //  * @example 主应用：/usercenter
  //  * @example 子应用：/admin/#/activity/list
  //  * @example 外链：http://xxx.xxx.com/xxx
  //  */
  // path?: string;
  // /**
  //  * vue文件相对路径
  //  * @example Layout
  //  * @example /activity/list.vue
  //  */
  // componentStr?: string;
  // /** 权限值, 多个逗号分隔 */
  // authStr?: string;
} & (
  | {
      /** 目标类型：0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 */
      targetType: 0 | 1;
      /**
       * 路径(不一定对应vue文件路径)
       * @example 主应用：/usercenter
       * @example 子应用：/admin/#/activity/list
       * @example 外链：http://xxx.xxx.com/xxx
       */
      path?: string;
      /**
       * vue文件相对路径
       * @example Layout
       * @example /activity/list.vue
       */
      componentStr?: string;
    }
  | {
      /** 目标类型：0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 */
      targetType: 2;
      /** 外链打开方式: 0-本窗口打开, 1-新建窗口打开 */
      openMode?: 0 | 1;
      /**
       * 路径(不一定对应vue文件路径)
       * @example 主应用：/usercenter
       * @example 子应用：/admin/#/activity/list
       * @example 外链：http://xxx.xxx.com/xxx
       */
      path?: string;
    }
  | {
      /** 目标类型：0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 */
      targetType: 3;
      /** 未激活图标链接, 一般只设置在父节点 */
      icon?: string;
    }
  | {
      /** 目标类型：0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 */
      targetType: 4;
      /** 权限值, 多个逗号分隔 */
      authStr?: string;
    }
);

/** 菜单列表数据类型 */
export type MenuItemType = MenuOriginType & {
  /** 子菜单 */
  children?: Array<MenuItemType>;
  /**
   * 唯一索引`key`， 层数用`-`隔开
   * @example 0
   * @example 0-0
   * @example 1-0-1
   */
  key?: string;
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

/** 用户信息 */
export interface UserInfoType {
  /** 用户头像url */
  avatar: string;
  /** 邮箱 */
  email: string;
  /** 用户记录id */
  id: string;
  /** 用户名称 */
  name: string;
  /** 用户手机号 */
  phone: string;
}
