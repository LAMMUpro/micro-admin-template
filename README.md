# 微后台主应用模版

[在线预览](https://micro-admin-template.lammu.cn/micromain/) | [使用文档](https://micro-admin-template.lammu.cn/docs/) | [加入社区](https://micro-admin-template.lammu.cn/docs/About/discussion.html)

## 相关仓库

- [vue3 子应用模板](https://github.com/LAMMUpro/subapp-vue3-template.git)
- [vue2+webpack 子应用模板](https://github.com/LAMMUpro/subapp-vue2-webpack-template.git)
- [vue2+vite 子应用模板](https://github.com/LAMMUpro/subapp-vue2-vite-template.git)
- [react18 子应用模板](https://github.com/LAMMUpro/subapp-react18-template.git)

- [nest 后端](https://gitee.com/LAMMUpro/ali-lowcode-nest.git)
- [低代码](https://gitee.com/LAMMUpro/ali-lowcode-designer.git)

## 下载项目模板

```sh
# 主应用
git clone https://github.com/LAMMUpro/micro-admin-template.git
# 子应用需要放在主应用的/apps/目录下
cd ./micro-admin-template/apps
# react18子应用
git clone https://github.com/LAMMUpro/subapp-react18-template.git
# vue3子应用
git clone https://github.com/LAMMUpro/subapp-vue3-template.git
# vue2+webpack子应用
git clone https://github.com/LAMMUpro/subapp-vue2-webpack-template.git
# vue2+vite子应用
git clone https://github.com/LAMMUpro/subapp-vue2-vite-template.git
```

## 运行步骤

```sh
# node版本建议16.18.0
# 如果没有安装yarn先全局安装
npm i yarn -g
# 安装依赖（忽略版本冲突）主目录下运行, 会安装packages/*下项目的所有依赖
yarn install --ignore-engines
# 手动tsc编译micro-app-tools库（后续会优化此步骤）
cd ./micro-admin-template/packages/micro-app-tools
npm run build # 如果提示tsc不存在则运行npm install -g typescript
# 运行各个项目
yarn dev
```

## 运行依赖

- yarn
- node > 16.18.0

## 已集成

- vitest 测试框架 ✔
- monorepo 共享 microapp 工具 / shared ... ✔
- micro-app-tools 基于 micro-app 的二次封装 ✔
- shared 常用模块共享 ✔
- sass ✔
- router ✔
- 公共组件 ✔
  - UseSvg ✔
- Prettier 文件格式化(需要 vscode 安装 Prettier) ✔
- eslint 代码规范(需要 vscode 安装 ESLint 2.4.4) ✔
- (暂时禁用)husky / commitlint git 提交校验 ✔
- element-plus (组件及样式按需引入) ✔
- react18 子应用 ✔
- vue3 子应用 ✔
- vue2 子应用 ✔
- MicroApp 封装 ✔
  - init 显式初始化 ✔
- UnoCSS ✔

## micro-app-tools 发包

```sh
npm config set registry https://registry.npmjs.com
npm login
npm publish --access=public
npm config set registry https://registry.npmmirror.com
```

## /public/js/micro-app.xxx_h.js 改造规则

1. 复制 node_modules\@micro-zoe\micro-app\lib\index.esm.js
2. 全局替换`process.env.NODE_ENV !== 'production'`为`true`
3. 代码混淆/压缩
4. [文件内容取 hash](https://www.lddgo.net/encrypt/hash)后四位作为文件部分
