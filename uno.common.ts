import { Preset } from 'unocss';

export const common: Preset = {
  name: 'common',
  /** 自定义预设 */
  rules: [
    [
      'ellipsis',
      { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' },
    ],
    /** 动态化 */
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
  /** 缩写,  */
  shortcuts: [{ fcc: 'flex justify-center items-center' }],
};
