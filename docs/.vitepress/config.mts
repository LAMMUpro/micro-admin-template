import { defineConfig } from 'vitepress';
import themeConfig from './themeConfig.mjs';

/** [docs](https://vitepress.dev/reference/site-config) */
export default defineConfig({
  title: "微前端后台模板",
  description: "微前端后台模板",
  srcDir: './src',
  outDir: './build',
  cacheDir: './.vite',
  /** 网页favicon */
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  // 路由前缀
  base: '/docs/',
  /** vite相关配置 */
  vite: {
    server: {
      port: 5151,
    },
  },
  /** 路由配置 / 主题配置 */
  themeConfig: themeConfig,
})
