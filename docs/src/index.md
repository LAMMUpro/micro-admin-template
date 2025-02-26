---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "micro-admin docs"
  text: "微前端后台模板"
  tagline: 基于京东micro-app微前端框架的后台模板，让你更快上手微前端，支持vue3/vue2/react子应用
  image:
    src: /images/1-1.png
    alt: x
  actions:
    - theme: alt
      text: ⚡快速开始
      link: /Docs/1.指南/微前端介绍
    - theme: brand
      text: 🐛常见问题总结
      link: /Docs/常见问题总结/常见问题
    - theme: alt
      text: 🚧历史更新
      link: /About/history
    - theme: brand
      text: 🔗在线预览
      link: https://micro-admin-template.lammu.cn/micromain/introduce

features:
  - icon:
      src: /favicon.ico
    title: MicroApp
    details: 使用京东微前端框架，更稳定，支持特性更多
  - icon:
      src: /svgs/RouterComponent.svg
    title: 组件共享1-路由组件
    details: 利用微前端支持应用嵌套的特性，将组件注册成路由供其它应用使用（跨框架组件）
  - icon:
      src: /svgs/DispatchComponent.svg
    title: 组件共享2-派发组件
    details: 利用微前端支持应用嵌套的特性，将组件注册成路由供其它应用使用（跨框架组件）
  - icon:
      src: /svgs/frame-less-ui.svg
    title: 组件共享3-跨框架组件库
    details: frame-less-ui组件库使用vue3开发web componenet，产物可在vue3/vue2/react/原生环境下使用
  - icon:
      src: /svgs/UnoCSS.svg
    title: UnoCSS
    details: 样式兼容移动端
  - icon:
      src: /svgs/Vue.svg
    title: Vue3
    details: 优先支持Vue3 / Vue2 / React18, 主应用使用的是Vue3
  - icon:
      src: /svgs/Vite.svg
    title: Vite
    details: 优先支持Vite / webpack, 主应用使用的是Vite
  - icon:
      src: /svgs/React.svg
    title: React组件渲染器
    details: vue环境下可直接渲染react组件
  
  - icon:
      src: /svgs/JS.svg
    title: 项目拆分
    details: 单一项目可拆分成多个子应用，减少单模块代码体积，子应用可使用不同技术栈，方便集成其它技术栈应用
  - icon:
      src: /svgs/TS.svg
    title: 低代码与源代码混合开发
    details: 支持使用低代码或源代码进行混合开发，相互通信
---


### iframe在线预览

> <small>也点击右上角「在线预览↗」进行全屏预览</small>

<iframe height="700" width="100%" src="https://micro-admin-template.lammu.cn/micromain/introduce" style="border: 1px solid #dfdfdf;"/>