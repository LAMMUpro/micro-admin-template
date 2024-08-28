import { ref } from 'vue';
import {
  BaseObj,
  MicroAppComponentProps,
  MicroComponentType,
  SubAppSetting,
} from './types';

/**
 * 主应用派发组件暂存
 * @example { SvgIcon: SvgIcon }
 * @example { SvgIcon: () => import('@/components/svg-icon/index.vue') }
 */
export const MicroComponentMap: { [key: string]: MicroComponentType } = {};

/**
 * 微前端，在MicroAppInit函数内赋值
 */
export const MicroAppConfig: {
  tagName: string;
  subAppSettingList: Array<SubAppSetting>;
  /** 当前环境 */
  env: string;
} = {
  tagName: '',
  subAppSettingList: [],
  env: '',
};

/**
 * 派发组件插槽暂存（子应用使用）
 */
export const MicroComponentSlotMap: BaseObj<any> = {};

/**
 * 派发组件所有props数据暂存（主应用使用）
 */
export const MicroComponentPropsMap: BaseObj<any> = {};

/**
 * 主应用传递过来的组件参数，可当作props用（包括事件）
 * 【数据暂存(应用以公共组件模式打开)】
 */
function getDefaultMicroAppComponentProps(): MicroAppComponentProps {
  return {
    subAppPath: '',
    eventType: '',
    props: {},
  };
}
export const microAppComponentProps = ref<MicroAppComponentProps>(
  getDefaultMicroAppComponentProps()
);

/**
 * 组件对应的path
 * 【数据暂存(应用以公共组件模式打开)】
 */
export const microAppComponentPath = ref('');

/**
 * 清除数据缓存
 */
export function resetMicroAppData() {
  microAppComponentProps.value = getDefaultMicroAppComponentProps();
  microAppComponentPath.value = '';
}
