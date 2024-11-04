import { defineConfig, presetAttributify, presetUno } from 'unocss';
import { common } from './uno.common';
import { transformerDirectives } from 'unocss';
import { transformerVariantGroup } from 'unocss';

export default defineConfig({
  /** 启用这个配置会覆盖掉默认配置, 需要把官方的默认加回来 */
  presets: [
    /** 默认预设 */
    presetUno(),
    /** 自定义预设 */
    common,
  ],
  transformers: [
    /** 指令转换器 .css内 @screen lt-md { html { --uno: font-size-12px; } } */
    transformerDirectives(),
    /** 变体组 @example className='md:(font-size-90px c-#34579a)' */
    transformerVariantGroup(),
  ],
  theme: {
    /** 
     * 断点, 只能设置min-width, 但可以用 at-, lt-
     * @example className='font-size-16px lt-xs:font-size-12px md:font-size-12px'
     */
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
  },
})