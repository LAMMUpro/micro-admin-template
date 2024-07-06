import { reactive } from 'vue';
import Cookies from 'js-cookie';
import { GlobalModule, GlobalModuleImplements } from '../GlobalModule';
import Global from '..';
import { safeJsonParse, modifyData } from '@/utils';
import { getUserInfo } from '@/api/userApi';

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

function getDefaultUserInfo(): UserInfoType {
  return {
    avatar: '',
    email: '',
    id: '',
    name: '',
    phone: '',
  };
}

export default class ModuleUser extends GlobalModule implements GlobalModuleImplements {
  cacheName = '_GlobalUser_';

  constructor() {
    super();
    this.loadDataFromLocal();
  }

  /** 登录后设置 */
  readonly info = reactive(getDefaultUserInfo());

  updateInfo(info: { [key: string]: any }) {
    modifyData(this.info, info);
    localStorage.setItem(this.cacheName, JSON.stringify(this.info));
    if (this.info.id) this.inited.value = true;
  }

  resetInfo() {
    modifyData(this.info, getDefaultUserInfo());
    localStorage.removeItem(this.cacheName);
    this.inited.value = false;
  }

  async initData() {
    // TODO: 登录逻辑完善
    if (Cookies.get(Global.config.tokenKey) || true) {
      /** token存在 */
      this.loading.value = true;
      const res = await getUserInfo();
      this.loading.value = false;
      if (res.code == 1 && res.data) {
        /** 登录成功, 更新Global.user.info */
        this.updateInfo(res.data);
      }
      return res.code;
    }
  }

  /**
   * 从本地加载数据
   */
  loadDataFromLocal() {
    const info = safeJsonParse(
      localStorage.getItem(this.cacheName),
      getDefaultUserInfo()
    );
    this.updateInfo(info);
  }
}
