import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import path from 'path';
import CONSTS from './src/utils/CONSTS';
import { svgBuilder } from './src/components/use-svg/loader';

export default defineConfig({
  base: `/${CONSTS.PREFIX_URL}/`,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将micro-app-前缀的标签名都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('micro-app'),
        },
      },
    }),
    react(),
    /** svg处理 */
    svgBuilder('./src/assets/svg/'),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        /** 覆盖掉element-plus原来的变量, 用命名空间解决覆盖子应用样式问题 */
        additionalData: `@use "@/style/element-plus.cover.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      /** cdn位置 或 相对当前文件的位置 （本地运行时生效，打包external时不会替换关键词！！！） */
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: CONSTS.PORT,
    host: '0.0.0.0',
    cors: true,
  },
  build: {
    outDir: 'build',
    /** 配置资源打包目录 */
    assetsDir: './js',
    /** 分包后警告大小（未压缩大小） */
    chunkSizeWarningLimit: 300,
    /**
     * 启用/禁用 CSS 代码拆分
     * 除去element.css，其它所有css加起来gzip后大约是30kb（工作台加载20个css大小约是20kb）
     * 不拆分css能加快首次渲染速度，但css变化会导致hash变化，但是从缓存中读取多个css文件也比较耗时（可以改为强缓存！）
     */
    cssCodeSplit: true,
    rollupOptions: {
      plugins: [],
      /** 打包排除这些依赖，保持import { xxx } from 'vue';这种导入 */
      external: ['vue', 'vue-router', '@micro-zoe/micro-app'],
      output: {
        format: 'esm', // 打包模式
        /**
         * 从对应网络路径中加载依赖
         * 对于external排除的依赖，直接从'vue'导入是无效的路径，所以需要配置对应资源路径
         */
        paths: {
          vue: `/${CONSTS.PREFIX_URL}/js/vue.cd730000_h.js`,
          'vue-router': `/${CONSTS.PREFIX_URL}/js/vue-router.4bcc0000_h.js`,
          '@micro-zoe/micro-app': `/${CONSTS.PREFIX_URL}/js/micro-app.4e9a0000_h.js`,
        },
        /** 分包 */
        manualChunks: {
          // 'micro-app': ['@micro-zoe/micro-app'],
        },
        /** 入口文件输出格式 */
        entryFileNames: 'js/[name].[hash]_h.js',
        /** js文件输出格式 */
        chunkFileNames: 'js/[name].[hash]_h.js',
        /** 资源文件输出格式 */
        assetFileNames: (assetInfo) => {
          /** 默认输出格式 */
          const defaultFormat = '[ext]/[name].[hash]_h.[ext]';
          /** 图片后缀 */
          const imageExts = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico'];
          /** 字体后缀 */
          const fontExts = ['ttf', 'woff', 'woff2'];
          /** 当前文件后缀 */
          const fileExt = assetInfo.name?.split('.').slice(-1)[0];
          /** 提取文件后缀异常处理 */
          if (!fileExt) {
            console.warn('>>> 文件后缀异常: ', assetInfo);
            return defaultFormat;
          }
          /** 图片资源 */
          if (imageExts.includes(fileExt)) {
            return 'img/[name].[hash]_h.[ext]';
          } else if (fontExts.includes(fileExt)) {
            return 'font/[name].[hash]_h.[ext]';
          }
          /** 其它资源 */
          return defaultFormat;
        },
      },
    },
  },
});
