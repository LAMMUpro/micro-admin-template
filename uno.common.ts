import { Preset } from 'unocss';

export const common: Preset = {
  name: 'common',
  /** 自定义预设 */
  rules: [
    /* 溢出...显示 当前节点生效 */
    [
      'ellipsis',
      { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' },
    ],
    [
      'ellipsis-1',
      {
        '-webkit-line-clamp': '1',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },
    ],
    [
      'ellipsis-2',
      {
        '-webkit-line-clamp': '2',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },
    ],
    [
      'ellipsis-3',
      {
        '-webkit-line-clamp': '3',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },
    ],
    [
      /** 动态化 */
      /^m-([\.\d]+)$/,
      ([_, num]) => ({ margin: `${num}px` }),
    ],
  ],
  /** 缩写,  */
  shortcuts: [{ fcc: 'flex justify-center items-center' }],
};
