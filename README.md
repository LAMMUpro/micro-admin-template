# 后台模版

## 运行步骤

```sh
# node版本要求大于18
# 如果没有安装pnpm先全局安装
npm i pnpm -g
# 安装依赖
pnpm i
# 运行
pnpm dev
```

## 技术栈

- pnpm
- node > 18

## 已集成

- vitest 测试框架 ✔
- monorepo 共享 microapp 工具 / shared ... ✔
- micro-app-utils 基于 micro-app 的二次封装 ✔
- shared 常用模块共享 ✔
- sass ✔
- router ✔
- 公共组件 ✔
  - svg-icon ✔
- Prettier 文件格式化(需要 vscode 安装 Prettier) ✔
- eslint 代码规范(需要 vscode 安装 ESLint 2.4.4) ✔
- (暂时禁用)husky / commitlint git 提交校验 ✔
- element-plus (组件及样式按需引入) ✔
- react18 子应用 ✔
- vue3 子应用
- vue2 子应用
- MicroApp 封装
  - init 显式初始化 ✔

## 开发须知

- 子应用容器不滚动最大高度为 var(--sub-app-container-height)
