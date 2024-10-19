# 微后台主应用模版

[在线预览](https://micro-admin-template.lammu.cn/micromain/) | [使用文档](https://micro-admin-docs.lammu.cn) | [加入社区](https://micro-admin-docs.lammu.cn/About/discussion.html)

## 相关仓库

- [vue3 子应用模板](https://github.com/LAMMUpro/subapp-vue3-template.git)
- [vue2 子应用模板](https://github.com/LAMMUpro/subapp-vue2-template.git)
- [react18 子应用模板](https://github.com/LAMMUpro/subapp-react18-template.git)

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
# vue2子应用
git clone https://github.com/LAMMUpro/subapp-vue2-template.git
```

## 运行步骤

```sh
# node版本要求大于18
# 如果没有安装pnpm先全局安装
npm i pnpm -g
# 安装依赖
pnpm i
# 手动tsc编译micro-app-tools库（后续会优化此步骤）
cd ./micro-admin-template/packages/micro-app-tools
npm run build # 如果提示tsc不存在则运行npm install -g typescript
# 运行各个项目
pnpm dev
```

## 技术栈

- pnpm
- node > 18

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
- vue3 子应用
- vue2 子应用
- MicroApp 封装
  - init 显式初始化 ✔
