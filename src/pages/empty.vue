<template>
  <div v-show="false">Blank intermediate route</div>
</template>

<script lang="ts" setup>
/**
 * 新增一个空白路由做中转路由，解决路由不变查询参数改变 router.push不刷新的问题
 * @example 用法如下
 * import microApp from '@micro-zoe/micro-app';
 * microApp.router.push({
 *   name: `workbench_serviceAdmin`,
 *   path: '/#/empty',
 * })
 */
</script>

<style lang="scss" scoped>
/** */
</style>
